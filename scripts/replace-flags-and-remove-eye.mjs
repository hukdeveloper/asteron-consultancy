import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk(path.resolve('site-live'));

const eyeRegex = /<button type="button" data-open-eye-analytics[^>]*>[\s\S]*?<\/button>/gi;

let count = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (eyeRegex.test(html)) {
    html = html.replace(eyeRegex, '');
    changed = true;
  }

  // Study in Italy guide icon
  if (html.includes('<span class="text-xl">🇮🇹</span>')) {
    html = html.replace(/<span class="text-xl">🇮🇹<\/span>/g, '<img src="/img/flags/it.svg" alt="Italy flag" class="h-5 w-7 rounded-xs object-cover shadow-2xs inline-block" />');
    changed = true;
  }
  if (html.includes('🇮🇹 Free Study in Italy')) {
    html = html.replace('🇮🇹 Free Study in Italy', '<img src="/img/flags/it.svg" alt="Italy flag" class="h-6 w-9 rounded-xs object-cover shadow-xs inline-block mr-2" />Free Study in Italy');
    changed = true;
  }

  // Country subpages big flags
  if (html.includes('<div class="text-4xl">🇵🇹</div>')) {
    html = html.replace('<div class="text-4xl">🇵🇹</div>', '<div class="flex justify-center"><img src="/img/flags/pt.svg" alt="Portugal flag" class="h-10 w-16 rounded shadow-xs object-cover" /></div>');
    changed = true;
  }
  if (html.includes('<div class="text-4xl">🇩🇪</div>')) {
    html = html.replace('<div class="text-4xl">🇩🇪</div>', '<div class="flex justify-center"><img src="/img/flags/de.svg" alt="Germany flag" class="h-10 w-16 rounded shadow-xs object-cover" /></div>');
    changed = true;
  }
  if (html.includes('<div class="text-4xl">🇫🇷</div>')) {
    html = html.replace('<div class="text-4xl">🇫🇷</div>', '<div class="flex justify-center"><img src="/img/flags/fr.svg" alt="France flag" class="h-10 w-16 rounded shadow-xs object-cover" /></div>');
    changed = true;
  }
  if (html.includes('<div class="text-4xl">🇨🇳</div>')) {
    html = html.replace('<div class="text-4xl">🇨🇳</div>', '<div class="flex justify-center"><img src="/img/flags/cn.svg" alt="China flag" class="h-10 w-16 rounded shadow-xs object-cover" /></div>');
    changed = true;
  }
  if (html.includes('<div class="text-4xl">🇷🇺</div>')) {
    html = html.replace('<div class="text-4xl">🇷🇺</div>', '<div class="flex justify-center"><img src="/img/flags/ru.svg" alt="Russia flag" class="h-10 w-16 rounded shadow-xs object-cover" /></div>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
}

console.log(`Updated ${count} HTML files (removed Eye button and updated flags).`);
