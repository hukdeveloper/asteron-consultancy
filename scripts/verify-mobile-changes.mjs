import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('public-test-screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();
  
  // 1. Mobile Viewport (iPhone 14 standard: 390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();

  console.log('Testing Mobile Homepage...');
  await mobilePage.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-1-home-hero-slider.png') });

  console.log('Testing Mobile Hamburger Menu Dropdown...');
  const menuBtn = mobilePage.locator('#janan-mobile-menu-btn');
  await menuBtn.click();
  await mobilePage.waitForTimeout(400); // allow slide down animation
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-2-hamburger-dropdown-open.png') });

  console.log('Testing Mobile About Us Page (Hero & Impact Cards)...');
  await mobilePage.goto('http://127.0.0.1:3000/about', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-3-about-hero.png') });
  // Scroll down slightly to capture the 4 impact metric boxes
  await mobilePage.evaluate(() => window.scrollBy(0, 320));
  await mobilePage.waitForTimeout(200);
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-3b-about-impact-boxes.png') });

  console.log('Testing Mobile Scholarships Page...');
  await mobilePage.goto('http://127.0.0.1:3000/scholarships', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-4-scholarships-hero.png') });
  await mobilePage.evaluate(() => window.scrollBy(0, 480));
  await mobilePage.waitForTimeout(200);
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-4b-scholarships-cards.png') });

  console.log('Testing Mobile Universities Page...');
  await mobilePage.goto('http://127.0.0.1:3000/universities', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-5-universities-hero.png') });

  console.log('Testing Mobile Contact Page...');
  await mobilePage.goto('http://127.0.0.1:3000/contact', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'mob-6-contact-hero.png') });

  // 2. Desktop Viewport (1280x800) Regression Check
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const desktopPage = await desktopContext.newPage();

  console.log('Testing Desktop Homepage Regression...');
  await desktopPage.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desk-1-home-hero-slider.png') });

  console.log('Testing Desktop About Regression...');
  await desktopPage.goto('http://127.0.0.1:3000/about', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desk-2-about-hero.png') });

  console.log('Testing Desktop Scholarships Page...');
  await desktopPage.goto('http://127.0.0.1:3000/scholarships', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desk-3-scholarships.png') });
  await desktopPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await desktopPage.waitForTimeout(300);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desk-4-scholarships-footer.png') });

  console.log('Testing Desktop About Footer...');
  await desktopPage.goto('http://127.0.0.1:3000/about', { waitUntil: 'networkidle' });
  await desktopPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await desktopPage.waitForTimeout(300);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desk-5-about-footer.png') });

  await browser.close();
  console.log('All mobile & desktop verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
