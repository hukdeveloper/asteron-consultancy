const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log('1. Loading Local Home page: http://localhost:3000...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    console.log('Title:', await page.title());

    console.log('2. Clicking Study in Italy...');
    await page.click('a[href="/study/italy"]');
    await page.waitForTimeout(1000);
    console.log('URL:', page.url());

    console.log('3. Clicking Admissions...');
    await page.click('a[href="/study/italy/admissions"]');
    await page.waitForTimeout(1000);
    console.log('URL:', page.url());

    console.log('4. Clicking Bachelors Program...');
    await page.click('a[href="/study/italy/admissions/bachelors-programs"]');
    await page.waitForTimeout(1000);
    console.log('URL:', page.url());

    const bodyText = await page.innerText('body');
    console.log('Something went wrong on page?:', bodyText.includes('Something went wrong'));
    console.log('Error 321 on page?:', bodyText.includes('321'));

    // Check first university card
    const card = await page.$('.grid .border-2.bg-white');
    if (card) {
      console.log('First university card content:\n' + (await card.innerText()));
    }

    await browser.close();
  } catch (e) {
    console.error('Test error:', e.message);
  }
})();
