const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });

  let hasError = false;
  page.on('console', msg => console.log('LIVE CONSOLE:', msg.text()));
  page.on('pageerror', err => {
    console.error('LIVE ERROR:', err.message);
    hasError = true;
  });

  console.log('1. Loading live Home page (https://jananconsultants.com/) ...');
  await page.goto('https://jananconsultants.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const navHtml = await page.innerHTML('nav');
  console.log('Live Nav HTML:', navHtml);

  const flags = await page.$$('img[src*="flags"]');
  console.log('Live Flag count:', flags.length);

  const bodyText = await page.innerText('body');
  console.log('Live Has Marquee Text:', bodyText.includes('Kindness is not an act'));
  console.log('Live Has Error 418 / Error 321 / Something went wrong:', bodyText.includes('Something went wrong') || bodyText.includes('321') || bodyText.includes('418'));

  await page.screenshot({ path: 'live-final-home.png', fullPage: true });
  console.log('Saved live-final-home.png');

  console.log('2. Clicking About ...');
  await page.click('nav a[href="/about"]');
  await page.waitForTimeout(1500);
  console.log('URL:', page.url());
  const aboutText = await page.innerText('body');
  console.log('About Has "Guiding Your Global Education":', aboutText.includes('Guiding Your Global Education'));
  console.log('About Has "Engr. Janan":', aboutText.includes('Engr. Janan'));
  console.log('About Has Old Text "Learn more about who we are":', aboutText.includes('Learn more about who we are'));
  await page.screenshot({ path: 'live-final-about.png', fullPage: true });

  console.log('3. Clicking Universities ...');
  await page.click('nav a[href="/universities"]');
  await page.waitForTimeout(1500);
  console.log('URL:', page.url());
  const uniText = await page.innerText('body');
  console.log('Universities Has "Italian Public Universities Directory":', uniText.includes('Italian Public Universities Directory'));
  const uniCards = await page.$$('[data-uni-card]');
  console.log('University Cards Count:', uniCards.length);
  await page.screenshot({ path: 'live-final-universities.png', fullPage: true });

  console.log('4. Clicking Contact ...');
  await page.click('nav a[href="/contact"]');
  await page.waitForTimeout(1500);
  console.log('URL:', page.url());
  const contactText = await page.innerText('body');
  console.log('Contact Has "Quick Consultation Request":', contactText.includes('Quick Consultation Request'));
  console.log('Contact Has "Frequently Asked Questions":', contactText.includes('Frequently Asked Questions'));
  await page.screenshot({ path: 'live-final-contact.png', fullPage: true });

  console.log('Any live page errors:', hasError);

  await browser.close();
})();
