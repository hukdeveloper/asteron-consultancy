import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/Javaid/.gemini/antigravity/brain/dbd3127a-1f91-4f53-a4e6-4d3d6c05fcd5';

async function verifyAll() {
  const browser = await chromium.launch();

  // 1. Mobile verification (iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });

  const mobPage = await mobileContext.newPage();

  // Test Mobile Home
  await mobPage.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-fixed-1-home.png'), fullPage: false });

  // Test Mobile Dropdown Open
  const btn = mobPage.locator('#janan-mobile-menu-btn');
  await btn.click();
  await mobPage.waitForTimeout(300);
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-fixed-2-nav-open.png'), fullPage: false });

  // Test Mobile Footer (scroll to bottom)
  await mobPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobPage.waitForTimeout(300);
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-fixed-3-footer.png'), fullPage: false });

  // Test Mobile Scholarships
  await mobPage.goto('http://127.0.0.1:3000/scholarships', { waitUntil: 'networkidle' });
  await mobPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-fixed-4-scholarships.png'), fullPage: false });

  await mobPage.close();
  await mobileContext.close();

  // 2. Desktop verification (1280x800)
  const deskContext = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const deskPage = await deskContext.newPage();

  // Test Desktop Home
  await deskPage.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-fixed-1-home.png'), fullPage: false });

  // Test Desktop Scholarships
  await deskPage.goto('http://127.0.0.1:3000/scholarships', { waitUntil: 'networkidle' });
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-fixed-2-scholarships.png'), fullPage: false });

  // Test Desktop Footer
  await deskPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await deskPage.waitForTimeout(300);
  await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'desk-fixed-3-footer.png'), fullPage: false });

  await deskPage.close();
  await deskContext.close();

  await browser.close();
  console.log('Verification screenshots saved successfully!');
}

verifyAll().catch(console.error);
