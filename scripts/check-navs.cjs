const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://jananconsultants.com/', { waitUntil: 'networkidle' });
  const navs = await page.$$('nav');
  console.log('Nav count:', navs.length);
  for (let i = 0; i < navs.length; i++) {
    console.log(`Nav ${i}:`, await navs[i].innerHTML());
  }
  const headers = await page.$$('header');
  console.log('Header count:', headers.length);
  for (let i = 0; i < headers.length; i++) {
    console.log(`Header ${i}:`, await headers[i].innerHTML());
  }
  await browser.close();
})();
