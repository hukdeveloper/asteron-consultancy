const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testLocalSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 850 }
  });
  const page = await context.newPage();

  const screenshotDir = path.resolve('public-test-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Testing http://127.0.0.1:3000 ...');

  // 1. Home Page - Slide 1
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, '1-home-hero-slide1.png') });
  console.log('Captured 1-home-hero-slide1.png');

  // Next slide (Slide 2: ER.GO)
  await page.click('#hero-slider-next');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '2-home-hero-slide2.png') });
  console.log('Captured 2-home-hero-slide2.png');

  // Scroll down on home page to show destination grid immediately follows hero
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '3-home-destinations-after-hero.png') });
  console.log('Captured 3-home-destinations-after-hero.png');

  // 2. About Page
  await page.goto('http://127.0.0.1:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '4-about-dark-hero.png') });
  console.log('Captured 4-about-dark-hero.png');

  // Scroll to bottom of About Page to verify space before footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '5-about-footer-spacing.png') });
  console.log('Captured 5-about-footer-spacing.png');

  // 3. Universities Directory
  await page.goto('http://127.0.0.1:3000/universities', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '6-universities-dark-hero.png') });
  console.log('Captured 6-universities-dark-hero.png');

  // 4. Contact Page
  await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '7-contact-dark-hero.png') });
  console.log('Captured 7-contact-dark-hero.png');

  // 5. Destination Page (/study/italy)
  await page.goto('http://127.0.0.1:3000/study/italy', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotDir, '8-study-italy-dark-hero.png') });
  console.log('Captured 8-study-italy-dark-hero.png');

  await browser.close();
  console.log('All local tests and screenshots completed successfully!');
}

testLocalSite().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
