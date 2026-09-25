const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  let hasError = false;
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
    hasError = true;
  });

  console.log('1. Testing /about ...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'about-preview.png', fullPage: true });
  console.log('Saved about-preview.png');

  console.log('2. Testing /contact ...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'contact-preview.png', fullPage: true });
  console.log('Saved contact-preview.png');

  console.log('3. Testing /universities ...');
  await page.goto('http://localhost:3000/universities', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'universities-preview.png', fullPage: true });
  console.log('Saved universities-preview.png');

  console.log('4. Testing live search filter on /universities ...');
  await page.fill('#uni-search', 'Milan');
  await page.waitForTimeout(300);
  const countText = await page.innerText('#uni-count');
  console.log('Filter result count text:', countText);
  await page.screenshot({ path: 'universities-search-milan.png' });
  console.log('Saved universities-search-milan.png');

  console.log('5. Testing header navigation links ...');
  await page.click('nav a[href="/about"]');
  await page.waitForTimeout(500);
  console.log('Navigated to:', page.url());

  await page.click('nav a[href="/universities"]');
  await page.waitForTimeout(500);
  console.log('Navigated to:', page.url());

  await page.click('nav a[href="/contact"]');
  await page.waitForTimeout(500);
  console.log('Navigated to:', page.url());

  const bodyText = await page.innerText('body');
  console.log('Has "Something went wrong":', bodyText.includes('Something went wrong'));
  console.log('Has Error 321:', bodyText.includes('321'));
  console.log('Any page errors:', hasError);

  await browser.close();
})();
