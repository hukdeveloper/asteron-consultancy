const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  console.log('Navigating directly to /about...');
  await page.goto('https://jananconsultants.com/about');
  console.log('Immediately after goto:');
  let text = await page.innerText('body');
  console.log('Immediately Contains "Guiding Your Global":', text.includes('Guiding Your Global'));
  console.log('Immediately Contains "Learn more about who we are":', text.includes('Learn more about who we are'));

  await page.waitForTimeout(3000);
  console.log('After 3 seconds:');
  text = await page.innerText('body');
  console.log('After 3s Contains "Guiding Your Global":', text.includes('Guiding Your Global'));
  console.log('After 3s Contains "Learn more about who we are":', text.includes('Learn more about who we are'));

  await browser.close();
})();
