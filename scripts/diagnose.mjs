import { chromium } from 'playwright';

async function diagnose() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });

  const pages = [
    { name: 'Home', url: 'http://127.0.0.1:3000/' },
    { name: 'About', url: 'http://127.0.0.1:3000/about' },
    { name: 'Universities', url: 'http://127.0.0.1:3000/universities' },
    { name: 'Scholarships', url: 'http://127.0.0.1:3000/scholarships' },
    { name: 'Contact', url: 'http://127.0.0.1:3000/contact' }
  ];

  for (const p of pages) {
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle' });

    const report = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;

      const over = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1 || r.width > docW + 1) {
          over.push({
            tag: el.tagName,
            id: el.id,
            cls: (el.className || '').toString().slice(0, 50),
            w: Math.round(r.width),
            r: Math.round(r.right),
            outer: el.outerHTML.slice(0, 120),
            docW
          });
        }
      });

      const footer = document.querySelector('footer');
      const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const footerBottom = footer ? (window.scrollY + footer.getBoundingClientRect().bottom) : 0;

      return {
        docW,
        scrollW,
        bodyW,
        hasOverflow: scrollW > docW || bodyW > docW,
        overCount: over.length,
        topOver: over.slice(0, 6),
        spaceBelowFooter: Math.round(docH - footerBottom)
      };
    });

    console.log(p.name, JSON.stringify(report, null, 2));

    const modalCheck = await page.evaluate(() => {
      const uni = document.getElementById('janan-uni-modal');
      const paid = document.getElementById('janan-paid-modal');
      const dest = document.getElementById('janan-dest-modal');
      return {
        uniDisplay: uni ? getComputedStyle(uni).display : 'none',
        paidDisplay: paid ? getComputedStyle(paid).display : 'none',
        destDisplay: dest ? getComputedStyle(dest).display : 'none'
      };
    });
    console.log(p.name, 'Modals display:', modalCheck);

    const btn = page.locator('#janan-mobile-menu-btn');
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(300);
      const dd = await page.evaluate(() => {
        const d = document.getElementById('janan-mobile-menu-dropdown');
        return d ? { isOpen: d.classList.contains('is-open'), display: getComputedStyle(d).display, h: d.offsetHeight } : 'none';
      });
      console.log(p.name, 'dropdown after click:', dd);
    }

    await page.close();
  }
  await browser.close();
}

diagnose().catch(console.error);
