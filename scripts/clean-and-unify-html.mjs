import fs from 'fs';
import path from 'path';

const marqueeHtml = `
<!-- Continuous Moving Message (right to left) -->
<div class="overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2 text-white shadow-xs whitespace-nowrap">
  <div style="display:inline-block;padding-left:100%;animation:jananMarquee 25s linear infinite;" class="font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap">
    &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
</style>`;

const footerHtml = `<footer class="mt-16 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-10 text-center text-white"><p class="text-sm uppercase tracking-[0.3em] text-white/70">Together, we rise — for a brighter future.</p><p class="mt-3 text-lg font-semibold">Your trust &amp; satisfaction, our aim.</p><p class="mt-6 text-sm text-white/80">Regards,</p><p class="text-base font-bold">Janan Consultancy</p><div class="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm"><a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition whitespace-nowrap">WhatsApp +92 370 017 1997</a><a href="mailto:jananconsultants.services@gmail.com" class="rounded-full bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition whitespace-nowrap">jananconsultants.services@gmail.com</a></div><div class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold"><a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">WhatsApp Channel</a><a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">WhatsApp Group</a><a href="https://www.facebook.com/share/18Z3uypvtM/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">Facebook</a><a href="https://www.facebook.com/share/1BapuxdF7Y/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">Facebook (50k)</a><a href="https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg==" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">Instagram</a><a href="https://www.tiktok.com/@jananconsultancy" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">TikTok</a><a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition whitespace-nowrap">LinkedIn</a></div></footer>`;

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove ?v=... from all bundle imports so ES Module identity is 100% consistent across React
  content = content.replace(/\/assets\/index-CrB-hXUe\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/index-CrB-hXUe.js');
  content = content.replace(/\/assets\/index-SMyjTGuD\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/index-SMyjTGuD.js');
  content = content.replace(/\/assets\/PageParts-CMaAiNyH\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/PageParts-CMaAiNyH.js');
  content = content.replace(/\/assets\/DegreeProgramPage-DjAe-WzV\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/DegreeProgramPage-DjAe-WzV.js');
  content = content.replace(/\/assets\/bachelors-programs-C5E80vrw\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/bachelors-programs-C5E80vrw.js');
  content = content.replace(/\/assets\/masters-programs-CDnVxMK0\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/masters-programs-CDnVxMK0.js');
  content = content.replace(/\/assets\/phd-programs-Bo1QKEtP\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/phd-programs-Bo1QKEtP.js');
  content = content.replace(/\/assets\/single-degree-BitsxJhl\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/single-degree-BitsxJhl.js');
  content = content.replace(/\/assets\/index-Cmku6p7J\.css\?v=[a-zA-Z0-9_-]+/g, '/assets/index-Cmku6p7J.css');
  content = content.replace(/\/assets\/janan-features\.js\?v=[a-zA-Z0-9_-]+/g, '/assets/janan-features.js');

  // 2. Normalize Marquee Bar below </header>
  if (content.includes('</header>')) {
    content = content.replace(/<!-- Moving text bar below header -->[\s\S]*?<\/style>/g, '');
    content = content.replace(/<!-- Continuous Moving Message[\s\S]*?<\/style>/g, '');
    content = content.replace(/<div class="[^"]*jananMarquee[^"]*"[\s\S]*?<\/style>/g, '');
    content = content.replace('</header>', '</header>' + marqueeHtml);
  }

  // 3. Normalize Footer
  if (content.includes('<footer')) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, footerHtml);
  }

  // 4. Remove ugly <!-- --> comment breaks inside text
  content = content.replace(/<!-- -->/g, ' ');

  // 5. Fix UI breaks in university cards
  // Ensure "Apply Portal ↗" has whitespace-nowrap and clean button style
  content = content.replace(/class="inline-flex items-center justify-center rounded-full bg-\[#123a70\] px-4 py-2 text-xs font-bold text-white hover:bg-\[#0e2c56\] transition shadow-xs"/g, 'class="inline-flex items-center justify-center rounded-full bg-[#123a70] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e2c56] transition shadow-xs whitespace-nowrap"');

  // 6. Ensure home page flags have whitespace-nowrap on country names
  content = content.replace(/<span class="text-lg font-bold text-\[#123a70\]">Study in/g, '<span class="text-lg font-bold text-[#123a70] whitespace-nowrap">Study in');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      cleanFile(full);
    }
  }
}

walk('site-live');
console.log('Cleaned and unified all HTML files!');
