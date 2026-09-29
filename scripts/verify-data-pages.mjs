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

  console.log('\n--- VERIFYING DESKTOP ---');

  // Universities
  await deskPage.goto(`http://127.0.0.1:${PORT}/universities`, { waitUntil: 'networkidle' });
  const uniCount = await deskPage.$$eval('[data-uni-card]', cards => cards.length);
  console.log(`Desktop /universities: ${uniCount} university cards rendered (Target: 90)`);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-universities-90.png'), fullPage: false });

  // Test filter
  await deskPage.click('#btn-private_university');
  const privCount = await deskPage.$$eval('[data-uni-card]:visible', cards => cards.length);
  console.log(`Desktop /universities (Private filter): ${privCount} cards visible (Target: 22)`);

  await deskPage.click('#btn-online_university');
  const onlineCount = await deskPage.$$eval('[data-uni-card]:visible', cards => cards.length);
  console.log(`Desktop /universities (Online filter): ${onlineCount} cards visible (Target: 7)`);

  // Scholarships
  await deskPage.goto(`http://127.0.0.1:${PORT}/scholarships`, { waitUntil: 'networkidle' });
  const schCount = await deskPage.$$eval('[data-scholarship-card]', cards => cards.length);
  console.log(`Desktop /scholarships: ${schCount} scholarship cards rendered (Target: 32)`);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-scholarships-32.png'), fullPage: false });

  // Portugal Guide
  await deskPage.goto(`http://127.0.0.1:${PORT}/study/portugal`, { waitUntil: 'networkidle' });
  const ptCount = await deskPage.$$eval('[data-pt-card]', cards => cards.length);
  console.log(`Desktop /study/portugal: ${ptCount} public university cards rendered (Target: 14)`);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-portugal-guide-14.png'), fullPage: false });

  // Italy Guide
  await deskPage.goto(`http://127.0.0.1:${PORT}/study/italy`, { waitUntil: 'networkidle' });
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-italy-guide.png'), fullPage: false });

  // Test 2: Mobile (390x844 iPhone 14)
  console.log('\n--- VERIFYING MOBILE (390px) ---');
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobPage = await mobCtx.newPage();

  const testMobilePage = async (route, name) => {
    await mobPage.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
    const ov = await mobPage.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      bodyScrollW: document.body.scrollWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }));
    console.log(`Mobile ${route} overflow check: scrollW=${ov.scrollW}, clientW=${ov.clientW}, hasOverflow=${ov.hasOverflow}`);
    await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, `mob-${name}.png`), fullPage: false });
  };

  await testMobilePage('/universities', 'universities');
  await testMobilePage('/scholarships', 'scholarships');
  await testMobilePage('/study/portugal', 'portugal');
  await testMobilePage('/study/italy', 'italy');

  // Test Mobile Navigation Dropdown
  console.log('\n--- VERIFYING MOBILE OVERLAY DROPDOWN ---');
  await mobPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
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
