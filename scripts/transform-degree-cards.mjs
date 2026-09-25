import fs from 'fs';

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

function transformHtml(html) {
  // Update grid
  html = html.replace(
    'class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"',
    'class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"'
  );

  // Match each card:
  // <div class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-white p-3"><a href="URL" target="_blank" rel="noreferrer" class="shrink-0 rounded-full bg-[#123a70] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#123a70]/90">LABEL<!-- --> ↗</a><div class="min-w-0"><p class="truncate font-semibold text-[#123a70]">NAME</p><p class="text-xs text-slate-500">CITY<!-- -->, Italy</p></div></div>
  const regex = /<div class="flex items-center gap-3 rounded-xl border-2 border-\[#123a70\]\/15 bg-white p-3"><a href="([^"]+)" target="_blank" rel="noreferrer" class="shrink-0 rounded-full bg-\[#123a70\] px-3 py-1\.5 text-xs font-bold text-white hover:bg-\[#123a70\]\/90">([\s\S]*?)<\/a><div class="min-w-0"><p class="truncate font-semibold text-\[#123a70\]">([\s\S]*?)<\/p><p class="text-xs text-slate-500">([\s\S]*?)<\/p><\/div><\/div>/g;

  let count = 0;
  html = html.replace(regex, (match, url, label, name, city) => {
    count++;
    return `<div class="flex flex-col items-center justify-center text-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-5 shadow-sm transition hover:border-[#123a70] hover:shadow-md"><a href="${url}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full bg-[#123a70] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e2c56] transition shadow-xs">${label}</a><p class="font-bold text-[#123a70] text-base leading-snug mt-1">${name}</p><p class="text-xs text-slate-500">${city}</p></div>`;
  });

  return { html, count };
}

for (const p of degreePages) {
  if (fs.existsSync(p)) {
    const orig = fs.readFileSync(p, 'utf8');
    const { html, count } = transformHtml(orig);
    fs.writeFileSync(p, html, 'utf8');
    console.log(p, 'Transformed cards count:', count);
  }
}
