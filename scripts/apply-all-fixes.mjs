import fs from 'fs';
import path from 'path';

const VERSION = '20260925v6';

// 1. Marquee HTML with deep navy blue background (previous section design)
const marqueeBarHtml = `
<!-- Continuous Moving Message (right to left) -->
<div class="overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2 text-white shadow-xs">
  <div style="display:inline-block;padding-left:100%;animation:jananMarquee 25s linear infinite;" class="font-semibold text-xs sm:text-sm tracking-wide">
    &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
</style>`;

// 2. Clean, simple, neutral footer with all 7 official social links
const footerHtml = `<footer class="mt-16 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-10 text-center text-white"><p class="text-sm uppercase tracking-[0.3em] text-white/70">Together, we rise — for a brighter future.</p><p class="mt-3 text-lg font-semibold">Your trust &amp; satisfaction, our aim.</p><p class="mt-6 text-sm text-white/80">Regards,</p><p class="text-base font-bold">Janan Consultancy</p><div class="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm"><a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition">WhatsApp +92 370 017 1997</a><a href="mailto:jananconsultants.services@gmail.com" class="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition">jananconsultants.services@gmail.com</a></div><div class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold"><a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">WhatsApp Channel</a><a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">WhatsApp Group</a><a href="https://www.facebook.com/share/18Z3uypvtM/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Facebook</a><a href="https://www.facebook.com/share/1BapuxdF7Y/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Facebook (50k)</a><a href="https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg==" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Instagram</a><a href="https://www.tiktok.com/@jananconsultancy" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">TikTok</a><a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">LinkedIn</a></div></footer>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace or add Marquee Bar below </header>
  if (content.includes('</header>')) {
    // Remove existing marquee blocks if present
    content = content.replace(/<!-- Moving text bar below header -->[\s\S]*?<\/style>/g, '');
    content = content.replace(/<!-- Continuous Moving Message[\s\S]*?<\/style>/g, '');
    content = content.replace(/<div class="[^"]*jananMarquee[^"]*"[\s\S]*?<\/style>/g, '');
    
    // Add updated marquee bar
    content = content.replace('</header>', '</header>' + marqueeBarHtml);
  }

  // 2. Replace Footer
  if (content.includes('<footer')) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, footerHtml);
  }

  // 3. Cache-bust scripts & link tags
  // Replace references like "/assets/janan-features.js..." with "/assets/janan-features.js?v=20260925v6"
  content = content.replace(/\/assets\/janan-features\.js(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/janan-features.js?v=${VERSION}`);
  content = content.replace(/\/assets\/PageParts-CMaAiNyH\.js(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/PageParts-CMaAiNyH.js?v=${VERSION}`);
  content = content.replace(/\/assets\/DegreeProgramPage-DjAe-WzV\.js(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/DegreeProgramPage-DjAe-WzV.js?v=${VERSION}`);
  content = content.replace(/\/assets\/index-CrB-hXUe\.js(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/index-CrB-hXUe.js?v=${VERSION}`);
  content = content.replace(/\/assets\/index-SMyjTGuD\.js(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/index-SMyjTGuD.js?v=${VERSION}`);
  content = content.replace(/\/assets\/index-Cmku6p7J\.css(\?v=[a-zA-Z0-9_-]+)?/g, `/assets/index-Cmku6p7J.css?v=${VERSION}`);

  // 4. Ensure home page has vector SVG flags
  if (filePath.endsWith('index.html') && !filePath.includes('study')) {
    content = content.replace(/<span>🇮🇹<\/span>\s*Study in Italy/g, '<img src="/img/flags/it.svg" alt="Study in Italy" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in Italy</span>');
    content = content.replace(/<span>🇵🇹<\/span>\s*Study in Portugal/g, '<img src="/img/flags/pt.svg" alt="Study in Portugal" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in Portugal</span>');
    content = content.replace(/<span>🇩🇪<\/span>\s*Study in Germany/g, '<img src="/img/flags/de.svg" alt="Study in Germany" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in Germany</span>');
    content = content.replace(/<span>🇫🇷<\/span>\s*Study in France/g, '<img src="/img/flags/fr.svg" alt="Study in France" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in France</span>');
    content = content.replace(/<span>🇨🇳<\/span>\s*Study in China/g, '<img src="/img/flags/cn.svg" alt="Study in China" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in China</span>');
    content = content.replace(/<span>🇷🇺<\/span>\s*Study in Russia/g, '<img src="/img/flags/ru.svg" alt="Study in Russia" class="h-8 w-12 rounded-sm shadow-xs object-cover mb-1" /><span class="text-lg font-bold text-[#123a70]">Study in Russia</span>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      processFile(full);
    }
  }
}

walk('site-live');
console.log('Processed all HTML files successfully!');
