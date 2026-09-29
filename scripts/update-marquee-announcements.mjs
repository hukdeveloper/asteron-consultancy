import fs from 'fs';
import path from 'path';

const realMarqueeHtml = `<!-- Continuous Moving Announcement Bar (Real & Verified Admissions Data) -->
<div style="overflow:hidden;max-width:100vw;width:100%;box-sizing:border-box;" class="border-b border-[#123a70]/20 bg-[#123a70] py-2.5 text-white shadow-xs whitespace-nowrap">
  <div style="display:flex;width:max-content;animation:jananMarquee 28s linear infinite;" class="font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap">
    <span style="padding:0 2.5rem;">📢 2027/28 Admissions &amp; Regional Scholarship Pre-Registration Open • 100% Free Tuition + Up to €8,500/Year Cash Stipend (DSU, ER.GO, Lazio DiSCo, EDiSU)</span>
    <span style="padding:0 2.5rem;">🇵🇹 Portugal Public Universities: 14 DGES Institutions Open for International Contests • Low EU Tuition Fees</span>
    <span style="padding:0 2.5rem;">📄 Legal Italian Translation (Consulate &amp; Embassy Verified) &amp; Schengen Visa Health Insurance Support</span>
    <span style="padding:0 2.5rem;">💬 WhatsApp Consultation Available: +92 370 017 1997 • Janan Consultancy</span>
    <span style="padding:0 2.5rem;">📢 2027/28 Admissions &amp; Regional Scholarship Pre-Registration Open • 100% Free Tuition + Up to €8,500/Year Cash Stipend (DSU, ER.GO, Lazio DiSCo, EDiSU)</span>
    <span style="padding:0 2.5rem;">🇵🇹 Portugal Public Universities: 14 DGES Institutions Open for International Contests • Low EU Tuition Fees</span>
    <span style="padding:0 2.5rem;">📄 Legal Italian Translation (Consulate &amp; Embassy Verified) &amp; Schengen Visa Health Insurance Support</span>
    <span style="padding:0 2.5rem;">💬 WhatsApp Consultation Available: +92 370 017 1997 • Janan Consultancy</span>
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace existing marquee
  const oldMarqueeRegex = /<!-- Continuous Moving Message[\s\S]*?<\/style>/i;
  const genericMarqueeRegex = /<div style="overflow:hidden;max-width:100vw;width:100%;box-sizing:border-box;" class="border-b border-\[#123a70\]\/20 bg-\[#123a70\][\s\S]*?<\/style>/i;
  const legacyMarqueeRegex = /<!-- Moving text bar below header -->[\s\S]*?<\/style>/i;

  if (oldMarqueeRegex.test(content)) {
    content = content.replace(oldMarqueeRegex, realMarqueeHtml);
  } else if (genericMarqueeRegex.test(content)) {
    content = content.replace(genericMarqueeRegex, realMarqueeHtml);
  } else if (legacyMarqueeRegex.test(content)) {
    content = content.replace(legacyMarqueeRegex, realMarqueeHtml);
  } else if (content.includes('</header>')) {
    content = content.replace('</header>', '</header>\n' + realMarqueeHtml);
  }

  // Also replace any remaining "Kindness is not an act" quotes
  content = content.replace(/&quot;\s*Kindness is not an act[\s\S]*?reflection of your soul\.\s*&quot;/g, '📢 2027/28 Admissions & Regional Scholarships Active');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walk(full);
    } else if (entry.name.endsWith('.html')) {
      processFile(full);
      count++;
    }
  }
  return count;
}

const total = walk('site-live');
console.log(`Updated real announcements in marquee across ${total} HTML files in site-live!`);
