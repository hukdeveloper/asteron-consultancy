const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  let hasError = false;
  page.on('pageerror', err => { console.error('PAGE ERROR:', err.message); hasError = true; });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'local-footer.png' });
    console.log('Saved local-footer.png');
  }

  await page.screenshot({ path: 'local-home.png' });
  console.log('Saved local-home.png');

  await page.goto('http://localhost:3000/study/italy/admissions/bachelors-programs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'local-bachelors.png' });
  console.log('Saved local-bachelors.png');

  const bodyText = await page.innerText('body');
  console.log('Has "Something went wrong":', bodyText.includes('Something went wrong'));
  console.log('Has error 321:', bodyText.includes('321'));
  console.log('Page error occurred:', hasError);

  await browser.close();
})();
