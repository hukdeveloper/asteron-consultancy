import fs from 'fs';
import path from 'path';

const newFooterHtml = `<footer class="mt-16 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-10 text-center text-white"><p class="text-sm uppercase tracking-[0.3em] text-white/70">Together, we rise — for a brighter future.</p><p class="mt-3 text-lg font-semibold">Your trust &amp; satisfaction, our aim.</p><p class="mt-6 text-sm text-white/80">Regards,</p><p class="text-base font-bold">Janan Consultancy</p><div class="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm"><a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20 transition">WhatsApp +92 370 017 1997</a><a href="mailto:jananconsultants.services@gmail.com" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20 transition">jananconsultants.services@gmail.com</a></div><div class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold"><a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">WhatsApp Channel</a><a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">WhatsApp Group</a><a href="https://www.facebook.com/share/18Z3uypvtM/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Facebook</a><a href="https://www.facebook.com/share/1BapuxdF7Y/" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Facebook (50k)</a><a href="https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg==" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">Instagram</a><a href="https://www.tiktok.com/@jananconsultancy" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">TikTok</a><a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-3.5 py-1.5 hover:bg-white/20 transition">LinkedIn</a></div></footer>`;

function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Replace footer
  if (content.includes('<footer')) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooterHtml);
    updated = true;
  }

  // Update contact pages
  if (filePath.endsWith('contact.html') || filePath.endsWith(path.join('contact', 'index.html'))) {
    const socialBlock = `
    <div class="mt-8 w-full max-w-sm rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 shadow-sm text-left">
      <h2 class="text-base font-bold text-[#123a70] text-center mb-4">Official Social Profiles</h2>
      <div class="space-y-2.5 text-sm">
        <a href="https://www.facebook.com/share/18Z3uypvtM/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>Facebook Page 1</span>
          <span class="text-xs text-slate-500">Official ↗</span>
        </a>
        <a href="https://www.facebook.com/share/1BapuxdF7Y/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>Facebook Page 2</span>
          <span class="text-xs text-slate-500">50k+ Followers ↗</span>
        </a>
        <a href="https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg==" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>Instagram</span>
          <span class="text-xs text-slate-500">@janan_khanx ↗</span>
        </a>
        <a href="https://www.tiktok.com/@jananconsultancy" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>TikTok</span>
          <span class="text-xs text-slate-500">@jananconsultancy ↗</span>
        </a>
        <a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>LinkedIn</span>
          <span class="text-xs text-slate-500">Engr. Janan ↗</span>
        </a>
        <a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>WhatsApp Channel</span>
          <span class="text-xs text-slate-500">Join ↗</span>
        </a>
        <a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 font-semibold text-[#123a70] hover:bg-[#123a70]/5 transition">
          <span>WhatsApp Group</span>
          <span class="text-xs text-slate-500">Join Community ↗</span>
        </a>
      </div>
    </div>`;

    if (!content.includes('Official Social Profiles')) {
      content = content.replace(/(jananconsultants\.services@gmail\.com<\/a>\s*<\/div>)/, `$1\n${socialBlock}`);
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      updateHtmlFile(full);
    }
  }
}

walk('site-live');
console.log('Updated all HTML footers and contact pages with social media links!');
