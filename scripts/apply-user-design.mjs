import fs from 'fs';
import path from 'path';

// 1. Update PageParts-CMaAiNyH.js with flag images inside NavCard
let pageParts = fs.readFileSync('site-live/assets/PageParts-CMaAiNyH.js', 'utf8');
const flagObjStr = 'const _fl={"🇮🇹":"/img/flags/it.svg","🇵🇹":"/img/flags/pt.svg","🇩🇪":"/img/flags/de.svg","🇫🇷":"/img/flags/fr.svg","🇨🇳":"/img/flags/cn.svg","🇷🇺":"/img/flags/ru.svg"};';
pageParts = pageParts.replace(
  'function x({to:e,emoji:s,label:t,params:r}){return a.jsxs(n,{to:e,params:r,className:"flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[110px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md",children:[s?a.jsx("span",{className:"text-3xl",children:s}):null,a.jsx("span",{className:"text-lg font-bold text-[#123a70]",children:t})]})}',
  `${flagObjStr}function x({to:e,emoji:s,label:t,params:r}){const _f=s&&_fl[s];return a.jsxs(n,{to:e,params:r,className:"flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[110px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md",children:[_f?a.jsx("img",{src:_f,alt:t,className:"h-8 w-12 rounded-sm shadow-xs object-cover mb-1"}):s?a.jsx("span",{className:"text-3xl",children:s}):null,a.jsx("span",{className:"text-lg font-bold text-[#123a70]",children:t})]})}`
);
fs.writeFileSync('site-live/assets/PageParts-CMaAiNyH.js', pageParts, 'utf8');
console.log('Updated PageParts-CMaAiNyH.js with SVG flag rendering');

// 2. Update DegreeProgramPage-DjAe-WzV.js with the new column-centered layout
let degPage = fs.readFileSync('site-live/assets/DegreeProgramPage-DjAe-WzV.js', 'utf8');
const oldGridStr = 'e.jsx("div",{className:"mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:o.map(t=>e.jsxs("div",{className:"flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-white p-3",children:[e.jsxs("a",{href:t.portalUrl,target:"_blank",rel:"noreferrer",className:"shrink-0 rounded-full bg-[#123a70] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#123a70]/90",children:[t.portalLabel," ↗"]}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"truncate font-semibold text-[#123a70]",children:t.name}),e.jsxs("p",{className:"text-xs text-slate-500",children:[t.city,", Italy"]})]})]},t.slug))})';
const newGridStr = 'e.jsx("div",{className:"mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",children:o.map(t=>e.jsxs("div",{className:"flex flex-col items-center justify-center text-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-5 shadow-sm transition hover:border-[#123a70] hover:shadow-md",children:[e.jsxs("a",{href:t.portalUrl,target:"_blank",rel:"noreferrer",className:"inline-flex items-center justify-center rounded-full bg-[#123a70] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e2c56] transition shadow-xs",children:[t.portalLabel," ↗"]}),e.jsx("p",{className:"font-bold text-[#123a70] text-base leading-snug mt-1",children:t.name}),e.jsxs("p",{className:"text-xs text-slate-500",children:[t.city,", Italy"]})]},t.slug))})';

if (degPage.includes(oldGridStr)) {
  degPage = degPage.replace(oldGridStr, newGridStr);
  fs.writeFileSync('site-live/assets/DegreeProgramPage-DjAe-WzV.js', degPage, 'utf8');
  console.log('Updated DegreeProgramPage-DjAe-WzV.js with column-centered university cards');
} else {
  console.warn('Could not find oldGridStr in DegreeProgramPage-DjAe-WzV.js');
}

// 3. Marquee bar HTML to inject below </header>
const marqueeBarHtml = `
<!-- Moving text bar below header -->
<div class="border-b border-[#123a70]/10 bg-[#123a70]/5 py-2.5 overflow-hidden whitespace-nowrap text-xs font-semibold text-[#123a70]">
  <div style="display:inline-block;padding-left:100%;animation:jananMarquee 25s linear infinite;">
    &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
</style>`;

// 4. Update index.html (and other pages if needed) with the marquee bar and flags
let indexHtml = fs.readFileSync('site-live/index.html', 'utf8');
if (!indexHtml.includes('jananMarquee')) {
  indexHtml = indexHtml.replace('</header>', '</header>' + marqueeBarHtml);
}

// Replace emoji spans with svg img tags in index.html to match React component
indexHtml = indexHtml
  .replace('<span class="text-3xl">🇮🇹</span>', '<img src="/img/flags/it.svg" alt="Study in Italy" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />')
  .replace('<span class="text-3xl">🇵🇹</span>', '<img src="/img/flags/pt.svg" alt="Study in Portugal" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />')
  .replace('<span class="text-3xl">🇩🇪</span>', '<img src="/img/flags/de.svg" alt="Study in Germany" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />')
  .replace('<span class="text-3xl">🇫🇷</span>', '<img src="/img/flags/fr.svg" alt="Study in France" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />')
  .replace('<span class="text-3xl">🇨🇳</span>', '<img src="/img/flags/cn.svg" alt="Study in China" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />')
  .replace('<span class="text-3xl">🇷🇺</span>', '<img src="/img/flags/ru.svg" alt="Study in Russia" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" />');

fs.writeFileSync('site-live/index.html', indexHtml, 'utf8');
console.log('Updated site-live/index.html with marquee and flags');

// 5. Update the 4 degree program HTML pages so their SSR matches the new column-centered cards
const degreePages = [
  'site-live/study/italy/admissions/bachelors-programs/index.html',
  'site-live/study/italy/admissions/bachelors-programs.html',
  'site-live/study/italy/admissions/masters-programs/index.html',
  'site-live/study/italy/admissions/masters-programs.html',
  'site-live/study/italy/admissions/phd-programs/index.html',
  'site-live/study/italy/admissions/phd-programs.html',
  'site-live/study/italy/admissions/single-degree/index.html',
  'site-live/study/italy/admissions/single-degree.html'
];

function transformDegreeHtml(html) {
  // Replace the old grid items with the column-centered layout
  // Old: <div class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-white p-3"><a href="(url)" ... class="...">(label) ↗</a><div class="min-w-0"><p class="truncate font-semibold text-[#123a70]">(name)</p><p class="text-xs text-slate-500">(city), Italy</p></div></div>
  html = html.replace(/<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">/g, '<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">');

  const oldCardRegex = /<div class="flex items-center gap-3 rounded-xl border-2 border-\[#123a70\]\/15 bg-white p-3"><a href="([^"]+)" target="_blank" rel="noreferrer" class="shrink-0 rounded-full bg-\[#123a70\] px-3 py-1\.5 text-xs font-bold text-white hover:bg-\[#123a70\]\/90">([^<]+)<\/a><div class="min-w-0"><p class="truncate font-semibold text-\[#123a70\]">([^<]+)<\/p><p class="text-xs text-slate-500">([^<]+)<\/p><\/div><\/div>/g;

  html = html.replace(oldCardRegex, (match, url, label, name, cityCountry) => {
    return `<div class="flex flex-col items-center justify-center text-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-5 shadow-sm transition hover:border-[#123a70] hover:shadow-md"><a href="${url}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full bg-[#123a70] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e2c56] transition shadow-xs">${label}</a><p class="font-bold text-[#123a70] text-base leading-snug mt-1">${name}</p><p class="text-xs text-slate-500">${cityCountry}</p></div>`;
  });

  return html;
}

for (const p of degreePages) {
  if (fs.existsSync(p)) {
    const orig = fs.readFileSync(p, 'utf8');
    const updated = transformDegreeHtml(orig);
    fs.writeFileSync(p, updated, 'utf8');
    console.log('Transformed:', p);
  }
}

console.log('All user design updates completed successfully!');
