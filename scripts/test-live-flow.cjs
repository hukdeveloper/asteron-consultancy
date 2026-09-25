const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log('1. Loading Home page...');
    await page.goto('https://jananconsultants.com/', { waitUntil: 'networkidle' });
    console.log('Home title:', await page.title());

    console.log('2. Clicking Study in Italy...');
    await page.click('a[href="/study/italy"]');
    await page.waitForTimeout(1500);
    console.log('Current URL:', page.url());

    console.log('3. Clicking Admissions...');
    await page.click('a[href="/study/italy/admissions"]');
    await page.waitForTimeout(1500);
    console.log('Current URL:', page.url());

    console.log('4. Clicking Bachelors Program...');
    await page.click('a[href="/study/italy/admissions/bachelors-programs"]');
    await page.waitForTimeout(1500);
    console.log('Current URL:', page.url());

    const bodyText = await page.innerText('body');
    if (bodyText.includes('Something went wrong')) {
      console.log('ERROR DETECTED on page!');
      const errBox = await page.$('.border-red-500, [class*="error"], h1, h2');
      if (errBox) {
        console.log('Error text:', await errBox.innerText());
      }
    } else {
      console.log('SUCCESS: No "Something went wrong" found!');
      // Check the first university card
      const uniCard = await page.$('.grid .border-2.bg-white');
      if (uniCard) {
        console.log('First card text:', (await uniCard.innerText()).replace(/\n/g, ' | '));
      }
    }

    await browser.close();
  } catch (e) {
    console.error('Test execution error:', e.message);
  }
})();
