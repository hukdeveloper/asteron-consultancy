import fs from 'fs';
import path from 'path';

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

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.html')) {
      let c = fs.readFileSync(full, 'utf8');
      if (!c.includes('jananMarquee') && c.includes('</header>')) {
        c = c.replace('</header>', '</header>' + marqueeBarHtml);
        fs.writeFileSync(full, c, 'utf8');
      }
    }
  }
}

walk('site-live');
console.log('Marquee bar verified and added sitewide!');
