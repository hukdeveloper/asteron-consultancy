const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('request', req => {
    if (req.url().endsWith('.js') || req.url().endsWith('.css')) console.log('REQ:', req.url());
  });
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.message));
  await page.goto('https://jananconsultants.com/');
  console.log('HTML loaded, waiting 200ms...');
  await page.waitForTimeout(200);
  console.log('Nav HTML:', await page.innerHTML('nav'));
  console.log('Waiting 2000ms for hydration...');
  await page.waitForTimeout(2000);
  console.log('Nav HTML after hydration:', await page.innerHTML('nav'));
  const flags = await page.$$('img[src*="flags"]');
  console.log('Flag img count after hydration:', flags.length);
  const marquee = await page.$('.overflow-hidden');
  console.log('Marquee exists after hydration:', marquee !== null);
  await browser.close();
})();
