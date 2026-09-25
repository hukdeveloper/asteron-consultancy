const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('response', async res => {
    if (res.url().includes('index-CrB')) {
      console.log('index-CrB URL:', res.url());
      console.log('Status:', res.status());
      console.log('Headers:', res.headers());
      const body = await res.text();
      console.log('Body length:', body.length);
      console.log('Body has universities in nav:', body.includes('/universities'));
    }
  });

  await page.goto('https://jananconsultants.com/', { waitUntil: 'networkidle' });
  await browser.close();
})();
