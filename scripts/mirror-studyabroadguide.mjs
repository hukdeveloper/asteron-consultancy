import fs from 'fs';
import path from 'path';

const routes = JSON.parse(fs.readFileSync('scripts/routes-studyabroadguide.json', 'utf8'));

// Common assets
const navPaidBtn = `
      <button type="button" data-open-paid-consultation class="rounded-full bg-[#123a70] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0e2c56] transition shadow-xs">
        Paid consultation
      </button>`;

const footerHtml = `<footer class="mt-16 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-10 text-center text-white"><p class="text-sm uppercase tracking-[0.3em] text-white/70">Together, we rise — for a brighter future.</p><p class="mt-3 text-lg font-semibold">Your trust &amp; satisfaction, our aim.</p><p class="mt-6 text-sm text-white/80">Regards,</p><p class="text-base font-bold">Janan Consultancy</p><div class="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"><a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">WhatsApp +92 370 017 1997</a><a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">WhatsApp Channel</a><a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">WhatsApp Group</a><a href="mailto:jananconsultants.services@gmail.com" class="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">jananconsultants.services@gmail.com</a></div></footer>`;

// Flag mapping for SVGs
function replaceFlags(html) {
  return html
    .replace(/<span class="text-3xl">🇮🇹<\/span>/g, '<img src="/img/flags/it.svg" alt="Italy flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/<span class="text-3xl">🇵🇹<\/span>/g, '<img src="/img/flags/pt.svg" alt="Portugal flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/<span class="text-3xl">🇩🇪<\/span>/g, '<img src="/img/flags/de.svg" alt="Germany flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/<span class="text-3xl">🇫🇷<\/span>/g, '<img src="/img/flags/fr.svg" alt="France flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/<span class="text-3xl">🇨🇳<\/span>/g, '<img src="/img/flags/cn.svg" alt="China flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/<span class="text-3xl">🇷🇺<\/span>/g, '<img src="/img/flags/ru.svg" alt="Russia flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />')
    .replace(/🇮🇹/g, '<img src="/img/flags/it.svg" alt="Italy flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />')
    .replace(/🇵🇹/g, '<img src="/img/flags/pt.svg" alt="Portugal flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />')
    .replace(/🇩🇪/g, '<img src="/img/flags/de.svg" alt="Germany flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />')
    .replace(/🇫🇷/g, '<img src="/img/flags/fr.svg" alt="France flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />')
    .replace(/🇨🇳/g, '<img src="/img/flags/cn.svg" alt="China flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />')
    .replace(/🇷🇺/g, '<img src="/img/flags/ru.svg" alt="Russia flag" class="inline-block h-4 w-6 rounded-xs shadow-xs object-cover align-middle mx-1" />');
}

async function mirror() {
  console.log(`Mirroring ${routes.length} routes from reference site...`);

  for (const r of routes) {
    try {
      const res = await fetch('https://jananconsultancy-studyabroadguide.netlify.app' + r);
      if (!res.ok) {
        console.error('Fetch failed for', r, res.status);
        continue;
      }
      let html = await res.text();

      // Clean Netlify injected scripts
      html = html.replace(/<script async src="\/\.netlify\/scripts\/ar"[^>]*><\/script>/g, '');

      // Replace Flags with SVGs
      html = replaceFlags(html);

      // Add Paid consultation button in nav if not already there
      if (!html.includes('data-open-paid-consultation')) {
        html = html.replace('</nav>', `${navPaidBtn}\n    </nav>`);
      }

      // Standardize footer
      html = html.replace(/<footer[\s\S]*?<\/footer>/, footerHtml);

      // Inject janan-features.js before </body>
      if (!html.includes('/assets/janan-features.js')) {
        html = html.replace('</body>', '<script src="/assets/janan-features.js" defer></script>\n</body>');
      }

      // Specific home page enhancements
      if (r === '/') {
        // 1. CEO section & Marquee banner after header / before main content
        const marqueeHtml = `
  <!-- CEO JANAN KHAN & Reflection Banner -->
  <div class="border-b border-[#123a70]/10 bg-gradient-to-r from-[#123a70]/5 via-[#123a70]/10 to-[#123a70]/5 py-3">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4">
      <div class="flex items-center gap-2.5">
        <img src="/img/janan-logo.jpg" alt="Janan Logo" class="h-9 w-9 rounded-full border-2 border-[#123a70] object-cover shadow-xs" />
        <div class="leading-tight">
          <span class="block text-xs font-extrabold uppercase tracking-wider text-[#123a70]">CEO : JANAN KHAN</span>
          <span class="block text-[11px] text-slate-500 font-medium">Janan Consultancy · Guidance</span>
        </div>
      </div>
      <div class="overflow-hidden whitespace-nowrap text-xs font-semibold text-[#123a70] flex-1 max-w-xl mx-auto py-1">
        <div class="inline-block animate-marquee pl-[100%]">
          &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;
        </div>
      </div>
    </div>
  </div>
  <style>
    @keyframes marquee {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
    .animate-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 25s linear infinite;
    }
  </style>`;

        if (!html.includes('CEO : JANAN KHAN')) {
          html = html.replace('</header>', '</header>\n' + marqueeHtml);
        }

        // 2. Enhance Destination cards for non-Italy countries
        const destGridRegex = /<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">[\s\S]*?<\/div>/;
        const newDestGrid = `<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <a href="/study/italy" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md">
        <img src="/img/flags/it.svg" alt="Italy flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in Italy
      </a>
      <button type="button" onclick="window.openDestinationOptions('Portugal', 'pt')" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md cursor-pointer">
        <img src="/img/flags/pt.svg" alt="Portugal flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in Portugal
        <span class="text-xs font-semibold text-slate-400">Contact us for Info</span>
      </button>
      <button type="button" onclick="window.openDestinationOptions('Germany', 'de')" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md cursor-pointer">
        <img src="/img/flags/de.svg" alt="Germany flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in Germany
        <span class="text-xs font-semibold text-slate-400">Contact us for Info</span>
      </button>
      <button type="button" onclick="window.openDestinationOptions('France', 'fr')" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md cursor-pointer">
        <img src="/img/flags/fr.svg" alt="France flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in France
        <span class="text-xs font-semibold text-slate-400">Contact us for Info</span>
      </button>
      <button type="button" onclick="window.openDestinationOptions('China', 'cn')" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md cursor-pointer">
        <img src="/img/flags/cn.svg" alt="China flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in China
        <span class="text-xs font-semibold text-slate-400">Contact us for Info</span>
      </button>
      <button type="button" onclick="window.openDestinationOptions('Russia', 'ru')" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 text-center font-bold text-[#123a70] transition hover:border-[#123a70] hover:shadow-md cursor-pointer">
        <img src="/img/flags/ru.svg" alt="Russia flag" class="h-8 w-12 rounded-sm shadow-xs object-cover" />
        Study in Russia
        <span class="text-xs font-semibold text-slate-400">Contact us for Info</span>
      </button>
    </div>`;
        html = html.replace(destGridRegex, newDestGrid);

        // 3. User requested: "At the bottom at home home page. the colors button of three colors is look professional make it simple like like the other."
        // We make the community section buttons clean, professional, matching the brand theme:
        const cleanCommunityBox = `
    <div class="mt-16 rounded-2xl border-2 border-[#123a70]/15 bg-white p-8 text-center">
      <h2 class="text-2xl font-bold text-[#123a70]">Free Guidance &amp; Consultation</h2>
      <p class="mx-auto mt-2 max-w-xl text-slate-600">Join our WhatsApp community for free study-in-Italy updates, deadlines and one-on-one consultation.</p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full bg-[#123a70] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0e2c56] hover:-translate-y-0.5 hover:shadow-md">
          WhatsApp Channel
        </a>
        <a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full border-2 border-[#123a70] px-6 py-2.5 text-sm font-bold text-[#123a70] shadow-sm transition hover:bg-[#123a70]/5 hover:-translate-y-0.5">
          WhatsApp Group
        </a>
        <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full border-2 border-[#123a70] px-6 py-2.5 text-sm font-bold text-[#123a70] shadow-sm transition hover:bg-[#123a70]/5 hover:-translate-y-0.5">
          WhatsApp Us
        </a>
        <button type="button" data-open-paid-consultation class="inline-flex items-center justify-center rounded-full border-2 border-[#123a70] bg-[#123a70]/5 px-6 py-2.5 text-sm font-bold text-[#123a70] shadow-sm transition hover:bg-[#123a70] hover:text-white cursor-pointer">
          Paid Consultation
        </button>
      </div>
    </div>`;

        html = html.replace(/<div class="mt-16 rounded-2xl border-2 border-\[#123a70\]\/15 bg-white p-8 text-center">[\s\S]*?<\/div>\s*<\/div>/, cleanCommunityBox);
      }

      // Determine file destination
      let relPath = r === '/' ? 'index.html' : r.replace(/^\//, '') + '/index.html';
      const destPath = path.join('site-live', relPath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, html, 'utf8');

      // Also write flat html e.g. /study/italy/admissions.html
      if (r !== '/') {
        const flatPath = path.join('site-live', r.replace(/^\//, '') + '.html');
        fs.mkdirSync(path.dirname(flatPath), { recursive: true });
        fs.writeFileSync(flatPath, html, 'utf8');
      }

      console.log('Saved:', r, '->', destPath);
    } catch (e) {
      console.error('Error on route', r, e.message);
    }
  }
  console.log('Mirror complete!');
}

mirror();
