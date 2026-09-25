const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message, err.stack));

  await page.goto('https://jananconsultants.com/', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  const result = await page.evaluate(() => {
    return {
      bodyChildren: Array.from(document.body.children).map(c => ({
        tag: c.tagName,
        className: c.className,
        id: c.id
      }))
    };
  });

  console.log('Result:', JSON.stringify(result, null, 2));
  await browser.close();
})();
