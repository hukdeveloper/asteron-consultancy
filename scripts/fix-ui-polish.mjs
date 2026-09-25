import fs from 'fs';
import path from 'path';

// 1. Update PageParts-CMaAiNyH.js with inline width/height on flag img
const pagePartsPath = path.resolve('site-live/assets/PageParts-CMaAiNyH.js');
let pageParts = fs.readFileSync(pagePartsPath, 'utf8');

// Replace className:"h-8 w-12 rounded-sm shadow-xs object-cover mb-1" with inline styles
pageParts = pageParts.replace(
  /className:"h-8 w-12 rounded-sm shadow-xs object-cover mb-1"/g,
  'style:{width:"48px",height:"32px",objectFit:"cover",borderRadius:"4px",marginBottom:"8px"},className:"shadow-xs"'
);
fs.writeFileSync(pagePartsPath, pageParts, 'utf8');
console.log('Fixed PageParts flag styling!');

// 2. Update index-CrB-hXUe.js MQ component to have smooth infinite marquee with translateX(0) to translateX(-50%)
const rootBundlePath = path.resolve('site-live/assets/index-CrB-hXUe.js');
let rootBundle = fs.readFileSync(rootBundlePath, 'utf8');

const oldMqSnippet = 'function MQ(){return X.jsxs("div",{className:"overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2 text-white shadow-xs whitespace-nowrap",children:[X.jsx("div",{style:{display:"inline-block",paddingLeft:"100%",animation:"jananMarquee 25s linear infinite"},className:"font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap",children:"\\" Kindness is not an act, It\'s a reflection of your soul. \\"            \\" Kindness is not an act, It\'s a reflection of your soul. \\"            \\" Kindness is not an act, It\'s a reflection of your soul. \\""}),X.jsx("style",{children:"@keyframes jananMarquee{0%{transform:translate(0,0)}100%{transform:translate(-100%,0)}}"})]})}';

const newMqSnippet = 'function MQ(){return X.jsxs("div",{className:"overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2.5 text-white shadow-xs whitespace-nowrap",children:[X.jsxs("div",{style:{display:"flex",width:"max-content",animation:"jananMarquee 22s linear infinite"},className:"font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap",children:[X.jsx("span",{style:{padding:"0 2.5rem"},children:"\\" Kindness is not an act, It\'s a reflection of your soul. \\""}),X.jsx("span",{style:{padding:"0 2.5rem"},children:"\\" Kindness is not an act, It\'s a reflection of your soul. \\""}),X.jsx("span",{style:{padding:"0 2.5rem"},children:"\\" Kindness is not an act, It\'s a reflection of your soul. \\""}),X.jsx("span",{style:{padding:"0 2.5rem"},children:"\\" Kindness is not an act, It\'s a reflection of your soul. \\""})]}),X.jsx("style",{children:"@keyframes jananMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}"})]})}';

if (rootBundle.includes(oldMqSnippet)) {
  rootBundle = rootBundle.replace(oldMqSnippet, newMqSnippet);
  fs.writeFileSync(rootBundlePath, rootBundle, 'utf8');
  console.log('Fixed MQ in index-CrB-hXUe.js!');
} else {
  console.log('MQ snippet not matched exactly, searching by pattern...');
  rootBundle = rootBundle.replace(/function MQ\(\)\{[\s\S]*?@keyframes jananMarquee[\s\S]*?\}\)\}\)\}\)/, newMqSnippet);
  fs.writeFileSync(rootBundlePath, rootBundle, 'utf8');
}

// 3. HTML Marquee template
const marqueeHtml = `
<!-- Continuous Moving Message (right to left) -->
<div class="overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2.5 text-white shadow-xs whitespace-nowrap">
  <div style="display:flex;width:max-content;animation:jananMarquee 22s linear infinite;" class="font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap">
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>`;

// 4. Update all HTML files
function cleanHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace marquee
  if (content.includes('</header>')) {
    content = content.replace(/<!-- Continuous Moving Message[\s\S]*?<\/style>/g, '');
    content = content.replace(/<!-- Moving text bar[\s\S]*?<\/style>/g, '');
    content = content.replace(/<div class="[^"]*jananMarquee[^"]*"[\s\S]*?<\/style>/g, '');
    content = content.replace('</header>', '</header>' + marqueeHtml);
  }

  // Fix flags inline style
  content = content.replace(/<img src="\/img\/flags\/([a-z]+)\.svg" alt="([^"]+)" class="[^"]*" \/>/g, '<img src="/img/flags/$1.svg" alt="$2" style="width:48px;height:32px;object-fit:cover;border-radius:4px;margin-bottom:8px;" class="shadow-xs" />');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      cleanHtml(full);
    }
  }
}

walk('site-live');
console.log('UI Polish complete across all files!');
