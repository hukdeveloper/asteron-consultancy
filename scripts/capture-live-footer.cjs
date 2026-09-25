const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  
  // Disable cache on CDP session
  const client = await page.context().newCDPSession(page);
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });

  await page.goto('https://jananconsultants.com/?t=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'live-footer.png' });
    console.log('Saved live-footer.png');
  }
  await browser.close();
})();
