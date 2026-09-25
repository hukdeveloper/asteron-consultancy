const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://jananconsultants.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'live-footer.png' });
    console.log('Saved live-footer.png');
  }
  await browser.close();
})();
