import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/Javaid/.gemini/antigravity/brain/dbd3127a-1f91-4f53-a4e6-4d3d6c05fcd5';

async function testOverlay() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // 1. Position of Hero before opening dropdown
  const heroBefore = await page.evaluate(() => {
    const el = document.getElementById('janan-hero-slider-section');
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  });

  // 2. Click mobile menu toggle
  const btn = page.locator('#janan-mobile-menu-btn');
  await btn.click();
  await page.waitForTimeout(350);

  // 3. Position of Hero after opening dropdown
  const heroAfter = await page.evaluate(() => {
    const el = document.getElementById('janan-hero-slider-section');
    const dd = document.getElementById('janan-mobile-menu-dropdown');
    return {
      heroTop: el ? Math.round(el.getBoundingClientRect().top) : null,
      dropdownPos: dd ? getComputedStyle(dd).position : null,
      dropdownTop: dd ? dd.getBoundingClientRect().top : null,
      dropdownH: dd ? dd.offsetHeight : null
    };
  });

  console.log('Hero top before open:', heroBefore);
  console.log('Hero and Dropdown status after open:', heroAfter);
  console.log('Did Hero push down?', heroBefore !== heroAfter.heroTop ? 'YES (BAD)' : 'NO (PERFECT OVERLAY!)');

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'mob-overlay-dropdown-open.png'), fullPage: false });

  await page.close();
  await context.close();
  await browser.close();
}

testOverlay().catch(console.error);
