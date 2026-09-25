const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  let hasError = false;
  page.on('pageerror', err => {
    console.error('LIVE PAGE ERROR:', err.message);
    hasError = true;
  });

  console.log('1. Testing Live /about ...');
  await page.goto('https://jananconsultants.com/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'live-about-verified.png', fullPage: true });
  console.log('Saved live-about-verified.png');

  console.log('2. Testing Live /contact ...');
  await page.goto('https://jananconsultants.com/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'live-contact-verified.png', fullPage: true });
  console.log('Saved live-contact-verified.png');

  console.log('3. Testing Live /universities ...');
  await page.goto('https://jananconsultants.com/universities', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'live-universities-verified.png', fullPage: true });
  console.log('Saved live-universities-verified.png');

  console.log('4. Testing Live Search on /universities ...');
  await page.fill('#uni-search', 'Rome');
  await page.waitForTimeout(500);
  const countText = await page.innerText('#uni-count');
  console.log('Live Filter result count text for Rome:', countText);
  await page.screenshot({ path: 'live-universities-search-rome.png' });
  console.log('Saved live-universities-search-rome.png');

  console.log('5. Testing Live Navigation back to Home ...');
  await page.click('nav a[href="/"]');
  await page.waitForTimeout(1000);
  console.log('Live URL:', page.url());

  const bodyText = await page.innerText('body');
  console.log('Live Has "Something went wrong":', bodyText.includes('Something went wrong'));
  console.log('Live Has Error 321:', bodyText.includes('321'));
  console.log('Live Any page errors:', hasError);

  await browser.close();
})();
