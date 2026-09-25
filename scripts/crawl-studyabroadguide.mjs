import fs from 'fs';
import path from 'path';

async function crawl() {
  const visited = new Set();
  const queue = [
    '/',
    '/contact',
    '/about',
    '/about/company',
    '/about/why-choose-us',
    '/study/italy',
    '/study/portugal',
    '/study/germany',
    '/study/france',
    '/study/china',
    '/study/russia',
    '/study/italy/admissions',
    '/study/italy/admissions/bachelors-programs',
    '/study/italy/admissions/masters-programs',
    '/study/italy/admissions/phd-programs',
    '/study/italy/admissions/single-degree',
    '/study/italy/scholarships',
    '/study/italy/insurance',
    '/study/italy/insurance/contact',
    '/study/italy/translation',
    '/study/italy/translation/karachi-consulate',
    '/study/italy/translation/islamabad-embassy'
  ];
  const allRoutes = [];

  while (queue.length > 0) {
    const route = queue.shift();
    if (visited.has(route)) continue;
    visited.add(route);
    allRoutes.push(route);

    try {
      const res = await fetch('https://jananconsultancy-studyabroadguide.netlify.app' + route);
      if (!res.ok) continue;
      const html = await res.text();
      const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map(m => m[1]);
      for (const h of hrefs) {
        const clean = h.split('#')[0].split('?')[0].replace(/\/$/, '');
        const r = clean === '' ? '/' : clean;
        if (r.startsWith('/') && !r.startsWith('//') && !r.startsWith('/img') && !r.startsWith('/assets') && !r.startsWith('/.netlify') && !r.includes('.')) {
          if (!visited.has(r) && !queue.includes(r)) {
            queue.push(r);
          }
        }
      }
    } catch (e) {
      console.error('Error fetching', route, e.message);
    }
  }

  console.log('Total routes found:', allRoutes.length);
  fs.writeFileSync('scripts/routes-studyabroadguide.json', JSON.stringify(allRoutes.sort(), null, 2));
  console.log('Saved routes to scripts/routes-studyabroadguide.json');
}

crawl();
