import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/Javaid/.gemini/antigravity/brain/dbd3127a-1f91-4f53-a4e6-4d3d6c05fcd5';
const PORT = 3456;

// Minimal static HTTP server
function createServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl.endsWith('/')) cleanUrl += 'index.html';
    let filePath = path.join(path.resolve('site-live'), cleanUrl);

    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`Test server running at http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function verify() {
  const server = await createServer();
  const browser = await chromium.launch();

  // Test 1: Desktop (1280x800)
  const deskCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const deskPage = await deskCtx.newPage();

  console.log('\n--- 1. VERIFYING HOME PAGE SECTIONS, SPACING & "VIEW ALL" BUTTONS ---');
  await deskPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });

  // Check buttons text
  const buttonInfo = await deskPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.janan-sec-btn')).map(b => b.innerText.trim());
    return btns;
  });
  console.log('Home Featured Section Buttons:', buttonInfo);

  // Check Marquee text
  const marqueeInfo = await deskPage.evaluate(() => {
    const m = document.querySelector('.janan-marquee-bar, [style*="jananMarquee"]');
    return m ? m.innerText.trim() : null;
  });
  console.log('Marquee announcement snippet:', marqueeInfo ? marqueeInfo.substring(0, 120) + '...' : 'None');

  // Check spacing between Italy and Portugal sections
  const spacingInfo = await deskPage.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('.janan-home-section'));
    if (sections.length < 2) return null;
    const r1 = sections[0].getBoundingClientRect();
    const r2 = sections[1].getBoundingClientRect();
    return {
      section1Bottom: r1.bottom,
      section2Top: r2.top,
      distanceBetween: r2.top - r1.bottom
    };
  });
  console.log('Spacing between Italy & Portugal sections:', spacingInfo);

  // Scroll to sections and take screenshot
  await deskPage.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 1800);
  });
  await deskPage.waitForTimeout(400);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-home-spaced-sections.png'), fullPage: false });

  // Test 2: Instant Client-Side SPA Navigation (Next.js Link Behavior)
  console.log('\n--- 2. VERIFYING INSTANT SPA CLIENT-SIDE NAVIGATION ---');
  let fullReloadCount = 0;
  deskPage.on('framenavigated', (frame) => {
    if (frame === deskPage.mainFrame()) {
      fullReloadCount++;
    }
  });

  // Reset counter after initial load
  fullReloadCount = 0;

  // Click on "Universities" in desktop nav
  console.log('Clicking Universities nav link...');
  await deskPage.click('nav.janan-desktop-nav a[href="/universities"]');
  await deskPage.waitForTimeout(300);

  const afterNav1 = await deskPage.evaluate(() => ({
    pathname: window.location.pathname,
    title: document.title,
    cardCount: document.querySelectorAll('[data-uni-card]').length,
    hasSearch: !!document.getElementById('uni-search')
  }));
  console.log('After SPA Nav to /universities:', afterNav1, `(Full browser reloads: ${fullReloadCount})`);

  // Test search filter on newly navigated page
  await deskPage.fill('#uni-search', 'Bologna');
  await deskPage.waitForTimeout(200);
  const filteredCount = await deskPage.$$eval('[data-uni-card]:visible', cards => cards.length);
  console.log(`Universities filter after SPA nav: ${filteredCount} visible for "Bologna"`);

  // Click on "Portugal" in desktop nav
  console.log('Clicking Portugal nav link...');
  await deskPage.click('nav.janan-desktop-nav a[href="/study/portugal"]');
  await deskPage.waitForTimeout(300);

  const afterNav2 = await deskPage.evaluate(() => ({
    pathname: window.location.pathname,
    title: document.title,
    ptCount: document.querySelectorAll('[data-pt-card]').length
  }));
  console.log('After SPA Nav to /study/portugal:', afterNav2, `(Full browser reloads: ${fullReloadCount})`);

  // Click browser Back button
  console.log('Testing browser Back button...');
  await deskPage.goBack();
  await deskPage.waitForTimeout(300);
  const afterBack = await deskPage.evaluate(() => ({
    pathname: window.location.pathname,
    title: document.title,
    cardCount: document.querySelectorAll('[data-uni-card]').length
  }));
  console.log('After Browser Back button:', afterBack, `(Full browser reloads: ${fullReloadCount})`);

  // Test 3: Mobile (390x844 iPhone 14)
  console.log('\n--- 3. VERIFYING MOBILE VIEWPORT & ZERO OVERFLOW ---');
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobPage = await mobCtx.newPage();

  await mobPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  const homeOv = await mobPage.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }));
  console.log('Mobile Home overflow check:', homeOv);

  // Scroll to featured sections on mobile
  await mobPage.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 2300);
  });
  await mobPage.waitForTimeout(400);
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-home-spaced-sections.png'), fullPage: false });

  await deskPage.close();
  await deskCtx.close();
  await mobPage.close();
  await mobCtx.close();
  await browser.close();

  server.close();
  console.log('\nAll checks completed successfully!');
}

verify().catch(console.error);
