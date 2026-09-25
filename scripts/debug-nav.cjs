const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('https://jananconsultants.com/');
  await page.waitForTimeout(1000);
  console.log('Clicking About nav link...');
  await page.click('nav a[href="/about"]');
  await page.waitForTimeout(2000);
  console.log('Current URL:', page.url());
  const text = await page.innerText('body');
  console.log('Contains "Guiding Your Global":', text.includes('Guiding Your Global'));
  console.log('Contains "Learn more about who we are":', text.includes('Learn more about who we are'));
  await page.screenshot({ path: 'test-nav-about.png' });
  await browser.close();
})();
