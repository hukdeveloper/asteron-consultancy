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

  console.log('\n--- 1. VERIFYING HOME PAGE FEATURED SECTIONS & HEADER LOGO ---');
  await deskPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });

  // Header Logo Check
  const headerLogoInfo = await deskPage.evaluate(() => {
    const header = document.querySelector('header');
    const logoLink = header ? header.querySelector('a[href="/"]') : null;
    const logoImg = logoLink ? logoLink.querySelector('img') : null;
    const logoText = logoLink ? logoLink.innerText.trim() : null;
    return {
      src: logoImg ? logoImg.getAttribute('src') : null,
      alt: logoImg ? logoImg.getAttribute('alt') : null,
      text: logoText,
      hasText: !!logoText && logoText.length > 0
    };
  });
  console.log('Header Logo Info:', headerLogoInfo);

  // Home Featured Universities Sections Check
  const homeSections = await deskPage.evaluate(() => {
    const itSection = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('Featured Universities in Italy'));
    const ptSection = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('Featured Public Universities in Portugal'));

    const itCards = itSection ? Array.from(itSection.querySelectorAll('.grid > div')).map(d => d.querySelector('h3') ? d.querySelector('h3').innerText.trim() : '') : [];
    const ptCards = ptSection ? Array.from(ptSection.querySelectorAll('.grid > div')).map(d => d.querySelector('h3') ? d.querySelector('h3').innerText.trim() : '') : [];

    const itLink = itSection ? itSection.querySelector('a[href="/universities"]') ? itSection.querySelector('a[href="/universities"]').getAttribute('href') : null : null;
    const ptLink = ptSection ? ptSection.querySelector('a[href="/study/portugal"]') ? ptSection.querySelector('a[href="/study/portugal"]').getAttribute('href') : null : null;

    return {
      itSectionFound: !!itSection,
      itCards,
      itLink,
      ptSectionFound: !!ptSection,
      ptCards,
      ptLink
    };
  });
  console.log('Home Page Sections Info:', homeSections);

  // Scroll to featured sections and screenshot
  await deskPage.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 1600);
  });
  await deskPage.waitForTimeout(400);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-home-featured-unis.png'), fullPage: false });

  console.log('\n--- 2. VERIFYING STUDY IN ITALY HUB TEXT ---');
  await deskPage.goto(`http://127.0.0.1:${PORT}/study/italy`, { waitUntil: 'networkidle' });
  const italyHubText = await deskPage.evaluate(() => {
    const uniLink = document.querySelector('a[href="/universities"]');
    return {
      linkText: uniLink ? uniLink.innerText.trim() : null
    };
  });
  console.log('Study in Italy Hub link text:', italyHubText);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-italy-guide.png'), fullPage: false });

  // Test 2: Mobile (390x844 iPhone 14)
  console.log('\n--- 3. VERIFYING MOBILE VIEWPORT (390px) ---');
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobPage = await mobCtx.newPage();

  // Test home page overflow
  await mobPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  const homeOv = await mobPage.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }));
  console.log('Mobile Home overflow check:', homeOv);

  // Scroll to featured sections on mobile
  await mobPage.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 2200);
  });
  await mobPage.waitForTimeout(400);
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-home-featured-unis.png'), fullPage: false });

  // Test Mobile Navigation Dropdown
  console.log('\n--- 4. VERIFYING MOBILE OVERLAY DROPDOWN ---');
  await mobPage.evaluate(() => window.scrollTo(0, 0));
  await mobPage.waitForTimeout(200);
  const toggleBtn = mobPage.locator('#janan-mobile-menu-btn');
  await toggleBtn.click();
  await mobPage.waitForTimeout(300);

  const dropdownStatus = await mobPage.evaluate(() => {
    const dd = document.getElementById('janan-mobile-menu-dropdown');
    return {
      isOpen: dd ? dd.classList.contains('is-open') : false,
      position: dd ? getComputedStyle(dd).position : null,
      top: dd ? dd.getBoundingClientRect().top : null
    };
  });
  console.log('Mobile dropdown state:', dropdownStatus);
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-dropdown-open-verified.png'), fullPage: false });

  await deskPage.close();
  await deskCtx.close();
  await mobPage.close();
  await mobCtx.close();
  await browser.close();

  server.close();
  console.log('\nAll checks completed successfully!');
}

verify().catch(console.error);
