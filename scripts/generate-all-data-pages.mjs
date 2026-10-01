import fs from 'fs';
import path from 'path';

// 1. Load Data
const italyItems = JSON.parse(fs.readFileSync('data/italy-directory.json', 'utf8'));
const portugalUnis = JSON.parse(fs.readFileSync('data/portugal-directory.json', 'utf8'));
const unifiedUnis = JSON.parse(fs.readFileSync('data/unified-universities.json', 'utf8'));

// Filter Italian institutions using unified data (Netlify structure)
const italianUnis = unifiedUnis;
const italianScholarships = italyItems.filter(i => i.category === 'regional_scholarship');

const publicUnis = italianUnis.filter(i => i.category === 'public_university');
const privateUnis = italianUnis.filter(i => i.category === 'private_university');
const onlineUnis = italianUnis.filter(i => i.category === 'online_university');

console.log(`Loaded ${italianUnis.length} Italian Unis with Netlify admission structure (Public: ${publicUnis.length}, Private: ${privateUnis.length}, Online: ${onlineUnis.length})`);
console.log(`Loaded ${italianScholarships.length} Italian Regional Scholarships`);
console.log(`Loaded ${portugalUnis.length} Portuguese Public Universities`);

const MARQUEE_HTML = `<!-- Continuous Moving Message (right to left) -->
<div style="overflow:hidden;max-width:100vw;width:100%;box-sizing:border-box;" class="border-b border-[#123a70]/20 bg-[#123a70] py-2.5 text-white shadow-xs whitespace-nowrap">
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

function getHeader(activePage = '') {
  const isHome = activePage === 'home';
  const isAbout = activePage === 'about';
  const isUniversities = activePage === 'universities';
  const isScholarships = activePage === 'scholarships';
  const isPortugal = activePage === 'portugal';
  const isItaly = activePage === 'italy';
  const isContact = activePage === 'contact';

  return `<header class="sticky top-0 z-50 border-b border-[#123a70]/10 bg-white/95 backdrop-blur" style="position:sticky;top:0;z-index:9999;">
  <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
    <a class="flex items-center shrink-0 ${isHome ? 'active' : ''}" href="/" ${isHome ? 'data-status="active" aria-current="page"' : ''} style="display:flex;align-items:center;text-decoration:none;background:transparent;">
      <img src="/img/janan-logo.png" alt="Janan Consultancy" class="h-10 sm:h-12 w-auto object-contain" style="height:46px;max-height:48px;width:auto;display:block;background:transparent;border:none;box-shadow:none;"/>
    </a>

    <!-- Desktop Navigation -->
    <nav class="janan-desktop-nav" style="display:flex;align-items:center;gap:20px;">
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isHome ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/" ${isHome ? 'data-status="active" aria-current="page"' : ''}>Home</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isAbout ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/about" ${isAbout ? 'data-status="active" aria-current="page"' : ''}>About</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isUniversities ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/universities" ${isUniversities ? 'data-status="active" aria-current="page"' : ''}>Universities</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isScholarships ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/scholarships" ${isScholarships ? 'data-status="active" aria-current="page"' : ''}>Scholarships</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isPortugal ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/study/portugal" ${isPortugal ? 'data-status="active" aria-current="page"' : ''}>Portugal</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isContact ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/contact" ${isContact ? 'data-status="active" aria-current="page"' : ''}>Contact</a>
      <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20an%20inquiry." target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:6px;border-radius:9999px;background:#123a70;padding:6px 16px;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;box-shadow:0 2px 6px rgba(18,58,112,0.25);transition:all 0.2s;">
        <span>WhatsApp</span> ↗
      </a>
    </nav>

    <!-- Mobile Hamburger Toggle Button -->
    <button id="janan-mobile-menu-btn" type="button" aria-label="Toggle Navigation Menu" aria-expanded="false" onclick="window.toggleJananMobileMenu(event)" class="janan-mobile-toggle items-center justify-center w-10 h-10 rounded-xl bg-slate-100/90 border border-slate-200 text-[#123a70] transition hover:bg-slate-200/90 focus:outline-none" style="cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;">
      <svg id="hamburger-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;display:block;">
        <line x1="3" x2="21" y1="6" y2="6" style="pointer-events:none;"></line>
        <line x1="3" x2="21" y1="12" y2="12" style="pointer-events:none;"></line>
        <line x1="3" x2="21" y1="18" y2="18" style="pointer-events:none;"></line>
      </svg>
      <svg id="hamburger-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;display:none;">
        <line x1="18" x2="6" y1="6" y2="18" style="pointer-events:none;"></line>
        <line x1="6" x2="18" y1="6" y2="18" style="pointer-events:none;"></line>
      </svg>
    </button>
  </div>

  <!-- Mobile Dropdown Menu Panel (Absolute Overlay - DOES NOT PUSH DOWN HERO) -->
  <div id="janan-mobile-menu-dropdown" class="janan-mobile-dropdown border-t border-[#123a70]/10 shadow-2xl" style="background:#ffffff !important;position:absolute;top:100%;left:0;right:0;width:100%;z-index:99999;box-sizing:border-box;box-shadow:0 20px 35px rgba(0,0,0,0.22);border-bottom:2px solid rgba(18,58,112,0.1);">
    <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px;max-width:480px;margin:0 auto;background:#ffffff;">
      <!-- Item 1: Home -->
      <a href="/" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isHome ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;">Home</div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">Scholarships &amp; Destinations</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 2: About Us -->
      <a href="/about" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isAbout ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;">About Us</div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">Mission, Founder &amp; Services</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 3: Universities Directory -->
      <a href="/universities" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isUniversities ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;display:flex;align-items:center;gap:6px;">
              <span>Universities</span>
              <span style="background:#fef3c7;color:#92400e;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">90 Listed</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">61 Public, 22 Private &amp; Online</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 4: Scholarships -->
      <a href="/scholarships" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isScholarships ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;display:flex;align-items:center;gap:6px;">
              <span>Scholarships</span>
              <span style="background:#ecfdf5;color:#047857;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">32 Portals</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">DSU, ER.GO, Lazio &amp; Regional</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 5: Portugal Guide -->
      <a href="/study/portugal" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isPortugal ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <span style="font-size:16px;">🇵🇹</span>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;display:flex;align-items:center;gap:6px;">
              <span>Study in Portugal</span>
              <span style="background:#ecfdf5;color:#047857;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">14 Unis</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">2027/28 Public Universities Guide</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 6: Contact Us -->
      <a href="/contact" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isContact ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;">Contact Us</div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">Counseling, WhatsApp &amp; FAQs</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Quick Action: Chat on WhatsApp -->
      <div style="margin-top:8px;padding-top:10px;border-top:1px solid #f1f5f9;">
        <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20consult%20regarding%20study%20abroad." target="_blank" rel="noreferrer" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 16px;border-radius:12px;background:#25D366;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;box-shadow:0 2px 8px rgba(37,211,102,0.3);box-sizing:border-box;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
          <span>Chat on WhatsApp (+92 370 017 1997)</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Mobile Backdrop Overlay to dim content underneath and allow tap-to-close -->
  <div id="janan-mobile-backdrop" onclick="window.toggleJananMobileMenu()" style="display:none;position:fixed;top:58px;left:0;right:0;bottom:0;background:rgba(7,25,51,0.55);z-index:9998;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);"></div>
</header>
${MARQUEE_HTML}`;
}

const GLOBAL_ENHANCEMENT_STYLES = `
<style>
  .janan-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #123a70;
    color: #ffffff !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 12px 24px;
    border-radius: 9999px;
    text-decoration: none;
    box-shadow: 0 2px 6px rgba(18, 58, 112, 0.18);
    transition: all 0.2s ease;
    border: none;
  }
  .janan-btn-primary:hover {
    background-color: #0e2c56;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(18, 58, 112, 0.28);
  }
  .janan-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #ffffff;
    color: #123a70 !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 11px 22px;
    border-radius: 9999px;
    border: 2px solid #123a70;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .janan-btn-secondary:hover {
    background-color: rgba(18, 58, 112, 0.05);
    transform: translateY(-2px);
  }
  .janan-btn-white {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #ffffff;
    color: #123a70 !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 12px 26px;
    border-radius: 9999px;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: all 0.2s ease;
  }
  .janan-btn-white:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
  }
  .janan-btn-trans {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 11px 24px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .janan-btn-trans:hover {
    background-color: rgba(255, 255, 255, 0.22);
    transform: translateY(-2px);
  }
  .janan-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .janan-grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  .janan-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  .janan-card {
    background-color: #ffffff;
    border: 2px solid rgba(18, 58, 112, 0.14);
    border-radius: 1.25rem;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
  }
  .janan-card:hover {
    border-color: #123a70;
    box-shadow: 0 6px 18px rgba(18, 58, 112, 0.10);
    transform: translateY(-2px);
  }
  .janan-dark-hero {
    padding: 56px 20px !important;
  }

  /* Responsive Header & Mobile Dropdown Navigation */
  .janan-desktop-nav {
    display: flex !important;
  }
  .janan-mobile-toggle {
    display: none !important;
  }
  .janan-mobile-dropdown {
    display: none;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
  }
  .janan-mobile-dropdown.is-open {
    display: block !important;
    max-height: 600px !important;
    opacity: 1 !important;
    animation: jananSlideDown 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .janan-menu-link:hover {
    background: rgba(18, 58, 112, 0.05) !important;
    transform: translateX(3px);
  }

  @keyframes jananSlideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Desktop 4-grid for Impact boxes */
  .janan-about-impact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  /* Shape other than rectangle, square, and circle: Organic Leaf / Faceted Shield Geometry */
  .janan-impact-card {
    background: linear-gradient(135deg, #ffffff 0%, #f0f5fc 100%) !important;
    border: 2px solid rgba(18, 58, 112, 0.18) !important;
    box-shadow: 0 4px 14px rgba(18, 58, 112, 0.06) !important;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }
  .janan-impact-card:hover {
    transform: translateY(-3px);
    border-color: #123a70;
    box-shadow: 0 8px 20px rgba(18, 58, 112, 0.14);
  }
  .janan-shape-a {
    border-radius: 36px 4px 36px 4px !important;
  }
  .janan-shape-b {
    border-radius: 4px 36px 4px 36px !important;
  }
  .janan-impact-section {
    padding: 48px 0 40px 0 !important;
  }
  #scholarships-grid {
    padding-top: 52px !important;
    padding-bottom: 60px !important;
  }
  .scholarships-heading-block {
    margin-bottom: 40px !important;
  }

  /* Mobile Media Queries */
  @media (max-width: 768px) {
    .janan-impact-section {
      padding: 34px 0 30px 0 !important;
    }
    #scholarships-grid {
      padding-top: 36px !important;
      padding-bottom: 44px !important;
    }
    .scholarships-heading-block {
      margin-bottom: 30px !important;
    }
    .janan-desktop-nav {
      display: none !important;
    }
    .janan-mobile-toggle {
      display: flex !important;
    }
    .janan-dark-hero {
      padding: 34px 16px !important;
    }
    .janan-dark-hero h1 {
      font-size: 1.45rem !important;
      line-height: 1.25 !important;
      margin-top: 6px !important;
    }
    .janan-dark-hero nav[aria-label="Breadcrumb"] {
      font-size: 10.5px !important;
      padding: 3px 10px !important;
      margin-bottom: 6px !important;
    }
    .janan-hero-btn-group {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
      width: 100% !important;
      max-width: 320px !important;
      margin: 14px auto 0 auto !important;
    }
    .janan-hero-btn-group .desktop-text {
      display: none !important;
    }
    .janan-hero-btn-group .mobile-text {
      display: inline !important;
    }
    .janan-hero-btn-group .janan-btn-white,
    .janan-hero-btn-group .janan-btn-trans {
      padding: 9px 4px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      width: 100% !important;
      text-align: center !important;
      justify-content: center !important;
      box-sizing: border-box !important;
    }

    .janan-about-impact-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }
    .janan-impact-card {
      padding: 16px 10px !important;
      min-height: 94px !important;
    }
    .janan-impact-card .impact-num {
      font-size: 1.35rem !important;
      line-height: 1.15 !important;
    }
    .janan-impact-card .impact-label {
      font-size: 10.5px !important;
      line-height: 1.25 !important;
      margin-top: 4px !important;
    }
  }

  @media (min-width: 769px) {
    .janan-hero-btn-group .mobile-text {
      display: none !important;
    }
    .janan-hero-btn-group .desktop-text {
      display: inline !important;
    }
  }
</style>
`;

const PERFECT_FOOTER_HTML = `<footer class="mt-20 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-12 text-center text-white" style="margin-top:80px;background:#123a70;padding:48px 16px;text-align:center;color:#ffffff;border-top:1px solid rgba(18,58,112,0.1);">
  <div class="mx-auto max-w-5xl" style="max-width:1024px;margin:0 auto;">
    <p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70" style="font-size:12px;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Together, we rise — for a brighter future.</p>
    <p class="mt-2 text-xl font-bold tracking-tight" style="margin-top:8px;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Your trust &amp; satisfaction, our aim.</p>
    <div class="mt-4 flex items-center justify-center gap-2" style="margin-top:16px;display:flex;align-items:center;justify-content:center;gap:8px;">
      <span class="h-px w-8 bg-white/20" style="height:1px;width:32px;background:rgba(255,255,255,0.2);"></span>
      <p class="text-sm font-semibold text-white/90" style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.9);">Janan Consultancy</p>
      <span class="h-px w-8 bg-white/20" style="height:1px;width:32px;background:rgba(255,255,255,0.2);"></span>
    </div>

    <!-- Main Contact Badges -->
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;margin-top:32px;margin-bottom:8px;">
      <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:9999px;padding:9px 18px;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" style="width:16px;height:16px;min-width:16px;min-height:16px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
        <span>WhatsApp +92 370 017 1997</span>
      </a>
      <a href="mailto:jananconsultants.services@gmail.com" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:9999px;padding:9px 18px;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" style="width:16px;height:16px;min-width:16px;min-height:16px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
        <span>jananconsultants.services@gmail.com</span>
      </a>
    </div>

    <!-- Social Community Badges -->
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-top:20px;">
      <a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
        <span>WhatsApp Channel</span>
      </a>
      <a href="https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
        <span>WhatsApp Group</span>
      </a>
      <a href="https://www.facebook.com/share/18Z3uypvtM/" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        <span>Facebook</span>
      </a>
      <a href="https://www.facebook.com/share/1BapuxdF7Y/" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        <span>Facebook (50k)</span>
      </a>
      <a href="https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg==" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        <span>Instagram</span>
      </a>
      <a href="https://www.tiktok.com/@jananconsultancy" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        <span>TikTok</span>
      </a>
      <a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;color:rgba(255,255,255,0.92);text-decoration:none;font-weight:600;font-size:12px;line-height:1;white-space:nowrap;margin:4px;transition:all 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="width:14px;height:14px;min-width:14px;min-height:14px;flex-shrink:0;display:inline-block;vertical-align:middle;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        <span>LinkedIn</span>
      </a>
    </div>
  </div>
</footer>`;

function buildFullHtml(title, description, contentHtml, activeNav) {
  return `<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="image" href="/img/janan-logo.jpg"/><link rel="stylesheet" href="/assets/index-Cmku6p7J.css" type="text/css" data-precedence="default"/><title>${title}</title><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/>${GLOBAL_ENHANCEMENT_STYLES}
<script src="/assets/janan-router.js"></script>
</head><body>
${getHeader(activeNav)}
${contentHtml}
${PERFECT_FOOTER_HTML}
<script src="/assets/janan-features.js" defer></script>
</body></html>`;
}

// ==========================================
// 1. BUILD UNIVERSITIES PAGE (All 90 Italian Unis with Netlify Card Design)
// ==========================================
function buildUniversitiesHtml() {
  const cardsHtml = italianUnis.map(u => {
    let catBadge = '';
    let feeBadgeStyle = '';

    if (u.category === 'public_university') {
      catBadge = '🏛️ Public University';
      feeBadgeStyle = 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;';
    } else if (u.category === 'private_university') {
      catBadge = '⭐ Private University';
      feeBadgeStyle = 'background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;';
    } else {
      catBadge = '🌐 Online Telematic';
      feeBadgeStyle = 'background:#faf5ff;color:#7e22ce;border:1px solid #e9d5ff;';
    }

    const searchTokens = `${u.name.toLowerCase()} ${u.city ? u.city.toLowerCase() : ''} ${u.region ? u.region.toLowerCase() : ''} ${u.category} ${u.id}`;

    return `
      <div data-uni-card data-category="${u.category}" data-search="${searchTokens}" class="rounded-2xl border border-[#123a70]/10 bg-white p-5 shadow-sm transition hover:border-[#123a70] hover:shadow-md flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;border-radius:1rem;border:1px solid rgba(18,58,112,0.12);background:#fff;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
            <span style="display:inline-flex;align-items:center;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;${feeBadgeStyle}">
              ${catBadge}
            </span>
            <span style="font-size:11px;color:#64748b;font-weight:500;">
              📍 ${u.city || u.region}
            </span>
          </div>

          <div class="font-bold text-[#123a70]" style="font-size:16px;line-height:1.35;min-height:44px;color:#123a70;font-weight:700;">${u.name}</div>

          <div class="mt-3 space-y-1 text-sm" style="margin-top:12px;font-size:13px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">Admission opens</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;">${u.admissionOpens || 'Nov 2026 – Feb 2027'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">Deadline</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;">${u.deadline || 'May 2027'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">Admission fee</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;">${u.admissionFee || '€30 – €50'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">CGPA</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;font-size:11.5px;">${u.cgpa || 'NO CGPA REQUIREMENT'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">English</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;font-size:11.5px;">${u.english || 'English Proficiency'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:8px;">
              <span class="text-slate-400" style="color:#94a3b8;">Degrees</span>
              <span class="font-medium text-[#123a70]" style="font-weight:600;color:#123a70;text-align:right;font-size:11.5px;">${u.degrees || "Bachelor's, Master's, PhD"}</span>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:8px;">
          <a href="${u.applyUrl}" target="_blank" rel="noreferrer" class="inline-block rounded-full bg-[#123a70] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e2c56]" style="text-align:center;text-decoration:none;border-radius:9999px;background:#123a70;color:#fff;padding:8px 16px;font-size:13px;font-weight:700;transition:all 0.2s;">
            ${u.applyText || 'Apply / Watch Tutorial →'}
          </a>
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20guidance%20for%20admission%20at%20${encodeURIComponent(u.name)}." target="_blank" rel="noreferrer" style="text-align:center;text-decoration:none;border-radius:9999px;background:rgba(18,58,112,0.06);color:#123a70;border:1px solid rgba(18,58,112,0.15);padding:6px 14px;font-size:11.5px;font-weight:600;transition:all 0.2s;">
            Ask Counselor on WhatsApp ↗
          </a>
        </div>
      </div>
    `;
  }).join('\n');

  return `<main class="min-h-screen bg-[#f7f9fc]">
    <!-- Hero Section -->
    <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
      <div class="mx-auto max-w-5xl px-4 text-center">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
          <a href="/" class="hover:text-white transition">Home</a>
          <span class="text-white/40">/</span>
          <span class="text-[#fbb040] font-bold">Universities Directory</span>
        </nav>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Italian Universities Official Directory</h1>
        <p class="mt-3 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
          Complete verified list of 61 Public Universities, 22 Private Universities, and 7 Online Universities with official web portals and DSU scholarship eligibility.
        </p>

        <!-- Search & Filter Controls -->
        <div class="mt-6 flex flex-col items-center justify-center gap-4">
          <div class="relative w-full max-w-md">
            <input 
              id="uni-search" 
              type="text" 
              placeholder="Search by university name, city or region..." 
              style="width:100%;border-radius:9999px;border:2px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.95);padding:13px 22px;font-size:14px;color:#123a70;outline:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);"
              oninput="filterUniversities()"
            />
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;">
            <button onclick="setFilter('all')" id="btn-all" class="filter-btn" style="border-radius:9999px;background:#fbb040;color:#123a70;padding:7px 18px;font-size:12px;font-weight:700;border:none;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.2);">All (${italianUnis.length})</button>
            <button onclick="setFilter('public_university')" id="btn-public_university" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Public Universities (61)</button>
            <button onclick="setFilter('private_university')" id="btn-private_university" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Private Universities (22)</button>
            <button onclick="setFilter('online_university')" id="btn-online_university" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Online / Distance (7)</button>
          </div>

          <div id="uni-count" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);">
            Showing ${italianUnis.length} of ${italianUnis.length} universities
          </div>
        </div>
      </div>
    </section>

    <!-- Cards Grid -->
    <section class="py-12 mb-20 sm:mb-28">
      <div class="mx-auto max-w-6xl px-4">
        <div id="uni-grid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 janan-grid-3" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(290px, 1fr));gap:20px;">
          ${cardsHtml}
        </div>
        <div id="no-results" class="hidden rounded-2xl border-2 border-dashed border-[#123a70]/20 bg-white p-12 text-center" style="margin-top:24px;">
          <p class="text-lg font-bold text-[#123a70]">No universities match your search</p>
          <p class="mt-1 text-sm text-slate-500">Try searching for a different university name, city, or reset the filter.</p>
          <button onclick="resetSearch()" class="janan-btn-primary" style="margin-top:16px;padding:8px 20px;font-size:12px;cursor:pointer;">Reset Search</button>
        </div>
      </div>
    </section>

    <script>
      var currentCategory = 'all';

      function filterUniversities() {
        var query = (document.getElementById('uni-search').value || '').trim().toLowerCase();
        var cards = document.querySelectorAll('[data-uni-card]');
        var visibleCount = 0;

        cards.forEach(function(card) {
          var haystack = card.getAttribute('data-search') || '';
          var cardCategory = card.getAttribute('data-category') || '';
          var matchesQuery = !query || haystack.indexOf(query) !== -1;
          var matchesCategory = (currentCategory === 'all') || (cardCategory === currentCategory);

          if (matchesQuery && matchesCategory) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        document.getElementById('uni-count').innerText = 'Showing ' + visibleCount + ' of ' + cards.length + ' universities';
        var noResults = document.getElementById('no-results');
        if (noResults) {
          if (visibleCount > 0) {
            noResults.classList.add('hidden');
          } else {
            noResults.classList.remove('hidden');
          }
        }
      }

      function setFilter(cat) {
        currentCategory = cat;
        var buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(function(b) {
          b.style.background = 'rgba(255,255,255,0.15)';
          b.style.color = '#ffffff';
          b.style.border = '1px solid rgba(255,255,255,0.3)';
          b.style.fontWeight = '600';
          b.style.boxShadow = 'none';
        });
        var activeBtn = document.getElementById('btn-' + cat);
        if (activeBtn) {
          activeBtn.style.background = '#fbb040';
          activeBtn.style.color = '#123a70';
          activeBtn.style.border = 'none';
          activeBtn.style.fontWeight = '700';
          activeBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        }
        filterUniversities();
      }

      function resetSearch() {
        document.getElementById('uni-search').value = '';
        setFilter('all');
      }
    </script>
  </main>`;
}

// ==========================================
// 2. BUILD SCHOLARSHIPS PAGE (32 Regional Italian Scholarships & Portals)
// ==========================================
function buildScholarshipsHtml() {
  const scholarshipCardsHtml = italianScholarships.map(s => {
    const searchTokens = `${s.name.toLowerCase()} ${s.city.toLowerCase()} ${s.region.toLowerCase()} ${s.id}`;
    const cleanDomain = s.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return `
      <div data-scholarship-card data-search="${searchTokens}" class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">
              100% Regional Grant
            </span>
            <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">
              📍 ${s.region}
            </span>
          </div>

          <div style="margin-top:12px;font-size:11px;font-weight:800;color:#fbb040;letter-spacing:0.04em;">#${s.id} OFFICIAL PORTAL</div>
          <h3 class="mt-1 text-lg font-bold text-[#123a70]" style="line-height:1.35;min-height:48px;">${s.name}</h3>

          <div class="mt-2 text-xl font-black text-[#fbb040]">€7,500 – €8,500 <span class="text-xs font-semibold text-slate-500">/ Year</span></div>

          <div style="margin-top:14px;border-top:1px solid #f1f5f9;padding-top:12px;font-size:12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#64748b;">Tuition Fee:</span>
              <span style="font-weight:700;color:#047857;">100% Free Waiver</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#64748b;">Mensa Dining:</span>
              <span style="font-weight:600;color:#334155;">Free Daily Meals</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#64748b;">Housing:</span>
              <span style="font-weight:600;color:#334155;">Free Student Residence</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#64748b;">Coverage:</span>
              <span style="font-weight:600;color:#123a70;">${s.city}</span>
            </div>
          </div>
        </div>

        <div style="margin-top:18px;display:flex;flex-direction:column;gap:8px;padding-top:8px;">
          <a href="${s.url}" target="_blank" rel="noreferrer" class="janan-btn-primary" style="padding:9px 14px;font-size:12px;border-radius:10px;width:100%;">
            Official Scholarship Portal ↗
          </a>
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20need%20eligibility%20guidance%20for%20${encodeURIComponent(s.name)}." target="_blank" rel="noreferrer" class="janan-btn-secondary" style="padding:8px 14px;font-size:12px;border-radius:10px;width:100%;border-width:1px;">
            Evaluate Eligibility on WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('\n');

  return `<main class="min-h-screen bg-[#f7f9fc]">
    <!-- Hero Section -->
    <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
      <div class="mx-auto max-w-5xl px-4 text-center">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
          <a href="/" class="hover:text-white transition">Home</a>
          <span class="text-white/40">/</span>
          <span class="text-[#fbb040] font-bold">Scholarships</span>
        </nav>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Italian Regional Scholarships &amp; Right to Study</h1>
        <p class="mt-3 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
          Need-based Italian government funding (DSU, ER.GO, Lazio DiSCo, EDISU, ALiSEO) providing 100% free tuition, €8,500/yr living stipends, free housing, and canteen meals.
        </p>

        <!-- Search input for scholarships -->
        <div class="mt-6 flex flex-col items-center justify-center gap-4">
          <div class="relative w-full max-w-md">
            <input 
              id="scholarship-search" 
              type="text" 
              placeholder="Search by region or agency (e.g. DSU, ER.GO, Lazio, Piedmont)..." 
              style="width:100%;border-radius:9999px;border:2px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.95);padding:13px 22px;font-size:14px;color:#123a70;outline:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);"
              oninput="filterScholarships()"
            />
          </div>

          <div id="scholarship-count" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);">
            Showing all 32 Italian Regional Right to Study Agencies &amp; Portals
          </div>
        </div>

        <div class="janan-hero-btn-group mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20evaluate%20my%20eligibility%20for%20Italian%20regional%20scholarships." target="_blank" rel="noreferrer" class="janan-btn-white">
            <span class="desktop-text">Evaluate My Eligibility on WhatsApp ↗</span>
            <span class="mobile-text">Check Eligibility ↗</span>
          </a>
          <a href="#scholarships-grid" class="janan-btn-trans">
            <span class="desktop-text">Browse All 32 Portals ↓</span>
            <span class="mobile-text">Browse Portals ↓</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Scholarships Cards Directory -->
    <section id="scholarships-grid" style="padding-top: 52px; padding-bottom: 60px;">
      <div class="mx-auto max-w-6xl px-4">
        <div class="scholarships-heading-block text-center" style="margin-bottom: 40px;">
          <h2 class="text-2xl sm:text-3xl font-black text-[#123a70]">Active Italian Regional Grants &amp; Portals (100% Coverage)</h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto" style="margin-top: 10px; margin-bottom: 0;">
            Every public university in Italy is covered by an official regional Right to Study body. Find your regional portal below and apply with Janan Consultancy.
          </p>
        </div>

        <div id="scholarship-grid" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 janan-grid-3" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(290px, 1fr));gap:20px;">
          ${scholarshipCardsHtml}
        </div>

        <div id="no-scholarship-results" class="hidden rounded-2xl border-2 border-dashed border-[#123a70]/20 bg-white p-12 text-center" style="margin-top:24px;">
          <p class="text-lg font-bold text-[#123a70]">No scholarship portal matches your search</p>
          <p class="mt-1 text-sm text-slate-500">Try searching for region names like Lombardia, Tuscany, Lazio, Emilia-Romagna, or Piedmont.</p>
          <button onclick="document.getElementById('scholarship-search').value='';filterScholarships();" class="janan-btn-primary" style="margin-top:16px;padding:8px 20px;font-size:12px;cursor:pointer;">Reset Search</button>
        </div>
      </div>
    </section>

    <!-- 4-Step Process Section -->
    <section style="padding: 50px 0; background: #ffffff; border-top: 1px solid rgba(18,58,112,0.1); border-bottom: 1px solid rgba(18,58,112,0.1);">
      <div class="mx-auto max-w-5xl px-4">
        <div class="text-center" style="margin-bottom: 34px;">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">How Janan Consultancy Secures Your Scholarship</h2>
          <p class="mt-2 text-sm text-slate-600">A structured 4-phase roadmap ensuring zero documentation rejections.</p>
        </div>
        <div class="janan-about-impact-grid">
          <div class="janan-impact-card janan-shape-a text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Step 01</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Pre-Admission Offer</div>
            <p class="mt-1 text-[11px] text-slate-500">Securing your official acceptance letter from an Italian public university.</p>
          </div>
          <div class="janan-impact-card janan-shape-b text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Step 02</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Family Income Paperwork</div>
            <p class="mt-1 text-[11px] text-slate-500">FBR tax certificates, bank statements, property valuation legalized with MOFA.</p>
          </div>
          <div class="janan-impact-card janan-shape-b text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Step 03</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">ISEE Parificato Calculation</div>
            <p class="mt-1 text-[11px] text-slate-500">Official CAF evaluation certifying your economic threshold below €25,000.</p>
          </div>
          <div class="janan-impact-card janan-shape-a text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Step 04</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Portal Submission &amp; Grant</div>
            <p class="mt-1 text-[11px] text-slate-500">Error-free regional portal submission and tracking until cash disbursement.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Box with generous bottom space before footer -->
    <section style="padding: 48px 0 64px 0; margin-bottom: 60px;">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-8 sm:p-12 shadow-sm">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Ready to Claim Your 100% Scholarship in Europe?</h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Contact our specialized scholarship desk on WhatsApp for immediate profile review, ISEE calculation guidance, and regional deadline calendars.
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20ready%20to%20apply%20for%20an%20Italian%20scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary">
              <span>Start WhatsApp Application</span> ↗
            </a>
            <a href="/universities" class="janan-btn-secondary">
              <span>Browse 90 Universities</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <script>
      function filterScholarships() {
        var query = (document.getElementById('scholarship-search').value || '').trim().toLowerCase();
        var cards = document.querySelectorAll('[data-scholarship-card]');
        var visibleCount = 0;

        cards.forEach(function(card) {
          var haystack = card.getAttribute('data-search') || '';
          if (!query || haystack.indexOf(query) !== -1) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        document.getElementById('scholarship-count').innerText = 'Showing ' + visibleCount + ' of ' + cards.length + ' scholarship portals';
        var noResults = document.getElementById('no-scholarship-results');
        if (noResults) {
          if (visibleCount > 0) {
            noResults.classList.add('hidden');
          } else {
            noResults.classList.remove('hidden');
          }
        }
      }
    </script>
  </main>`;
}

// ==========================================
// 3. BUILD PORTUGAL PAGE (All 14 Public Universities & Guide)
// ==========================================
function buildPortugalHtml() {
  const cardsHtml = portugalUnis.map(u => {
    const searchTokens = `${u.name.toLowerCase()} ${u.ptName ? u.ptName.toLowerCase() : ''} portugal ${u.id}`;
    const cleanDomain = u.website.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const docItemsHtml = u.documents.slice(0, 5).map(doc => `
      <span style="display:inline-block;background:#f1f5f9;color:#334155;border-radius:6px;padding:3px 8px;font-size:10.5px;font-weight:600;">
        ✓ ${doc}
      </span>
    `).join(' ');

    return `
      <div data-pt-card data-search="${searchTokens}" class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span style="display:inline-flex;align-items:center;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;">
              🇵🇹 DGES Public University
            </span>
            <span style="display:inline-flex;align-items:center;border-radius:8px;background:#f1f5f9;padding:4px 10px;font-size:11px;font-weight:600;color:#475569;">
              Portugal
            </span>
          </div>

          <div style="margin-top:12px;font-size:11px;font-weight:800;color:#fbb040;letter-spacing:0.04em;">#${u.id} PUBLIC INSTITUTION</div>
          <h3 class="mt-1 text-lg font-bold text-[#123a70]" style="line-height:1.35;">${u.name}</h3>
          ${u.ptName ? `<div style="font-size:12px;color:#64748b;font-style:italic;margin-top:2px;">${u.ptName}</div>` : ''}

          <!-- Language / MOI / IELTS Policy Block -->
          <div style="margin-top:14px;background:#f8fafc;border-left:3px solid #123a70;padding:10px 12px;border-radius:0 8px 8px 0;font-size:11.5px;line-height:1.45;color:#334155;">
            <strong style="color:#123a70;">MOI / IELTS Policy:</strong> ${u.moiIelts}
          </div>

          <!-- Deadline Box -->
          <div style="margin-top:10px;background:#fffbeb;border:1px solid #fef3c7;padding:8px 12px;border-radius:8px;font-size:11px;color:#92400e;line-height:1.4;">
            <strong>Deadline Status:</strong> ${u.deadline}
          </div>

          <!-- Required Documents Checklist Preview -->
          <div style="margin-top:12px;">
            <div style="font-size:11px;font-weight:700;color:#64748b;margin-bottom:6px;">Key Required Documents:</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;">
              ${docItemsHtml}
              ${u.documents.length > 5 ? `<span style="font-size:10px;color:#94a3b8;align-self:center;">+${u.documents.length - 5} more</span>` : ''}
            </div>
          </div>
        </div>

        <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;padding-top:10px;border-top:1px solid #f1f5f9;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <a href="${u.website}" target="_blank" rel="noreferrer" class="janan-btn-secondary" style="padding:8px 8px;font-size:11px;border-radius:8px;width:100%;text-align:center;box-sizing:border-box;">
              Website ↗
            </a>
            <a href="${u.applyUrl}" target="_blank" rel="noreferrer" class="janan-btn-primary" style="padding:8px 8px;font-size:11px;border-radius:8px;width:100%;text-align:center;box-sizing:border-box;">
              Apply Portal ↗
            </a>
          </div>
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20to%20${encodeURIComponent(u.name)}%20in%20Portugal." target="_blank" rel="noreferrer" class="janan-btn-secondary" style="padding:8px 14px;font-size:11px;border-radius:8px;width:100%;border-width:1px;text-align:center;">
            Inquire with Counselor on WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('\n');

  return `<main class="min-h-screen bg-[#f7f9fc]">
    <!-- Hero Section -->
    <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
      <div class="mx-auto max-w-5xl px-4 text-center">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
          <a href="/" class="hover:text-white transition">Home</a>
          <span class="text-white/40">/</span>
          <a href="/study/portugal" class="text-white/80 hover:text-white transition">Study in Portugal</a>
          <span class="text-white/40">/</span>
          <span class="text-[#fbb040] font-bold">Public Universities (2027/28)</span>
        </nav>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Public Universities of Portugal</h1>
        <p class="mt-3 text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
          International Admission Guide 2027/28 — Covering all 14 official DGES-accredited public universities, direct application portals, English requirements, and verified guidance for Pakistani applicants.
        </p>

        <!-- Search input for Portugal universities -->
        <div class="mt-6 flex flex-col items-center justify-center gap-4">
          <div class="relative w-full max-w-md">
            <input 
              id="pt-search" 
              type="text" 
              placeholder="Search Portugal public universities (e.g. Porto, Lisbon, Coimbra)..." 
              style="width:100%;border-radius:9999px;border:2px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.95);padding:13px 22px;font-size:14px;color:#123a70;outline:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);"
              oninput="filterPortugalUnis()"
            />
          </div>

          <div id="pt-count" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);">
            Showing all 14 official Portuguese Public Universities
          </div>
        </div>

        <div class="janan-hero-btn-group mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20plan%20my%20application%20for%20Portugal%20public%20universities." target="_blank" rel="noreferrer" class="janan-btn-white">
            <span class="desktop-text">Consult on WhatsApp (+92 370 017 1997) ↗</span>
            <span class="mobile-text">WhatsApp Consult ↗</span>
          </a>
          <a href="#pakistani-notes" class="janan-btn-trans">
            <span class="desktop-text">Pakistani Applicant Rules ↓</span>
            <span class="mobile-text">Pakistani Rules ↓</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Important Advisory for Pakistani Applicants Section -->
    <section id="pakistani-notes" style="padding: 44px 0 20px 0;">
      <div class="mx-auto max-w-6xl px-4">
        <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 sm:p-8 shadow-sm">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <span style="font-size:24px;">🇵🇰</span>
            <h2 class="text-xl sm:text-2xl font-bold text-[#123a70]">Essential Guidelines for Pakistani Applicants</h2>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed">
            Compiled directly from official DGES (Direção-Geral do Ensino Superior) regulations and Portuguese university statutes. Please read carefully before preparing your application file.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
              <div style="font-weight:700;color:#123a70;font-size:14px;display:flex;align-items:center;gap:8px;">
                <span>🏛️ 14 Public Universities Network</span>
              </div>
              <p style="font-size:12px;color:#475569;margin-top:6px;line-height:1.5;">
                DGES defines Portugal’s public higher-education network as comprising exactly <strong>14 public universities</strong>, alongside public polytechnics and military/police schools. Every single one is profiled below.
              </p>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
              <div style="font-weight:700;color:#123a70;font-size:14px;display:flex;align-items:center;gap:8px;">
                <span>📄 Programme Page vs University Page</span>
              </div>
              <p style="font-size:12px;color:#475569;margin-top:6px;line-height:1.5;">
                For Master’s applicants, the <strong>exact programme page</strong> takes precedence over general university portals. Specific admission calls, English proficiency requirements, tuition fees, and deadlines differ between faculties.
              </p>
            </div>

            <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:12px;padding:16px;">
              <div style="font-weight:700;color:#92400e;font-size:14px;display:flex;align-items:center;gap:8px;">
                <span>⚠️ MOI vs IELTS: Critical Clarification</span>
              </div>
              <p style="font-size:12px;color:#78350f;margin-top:6px;line-height:1.5;">
                <strong>Do not assume</strong> that a Pakistani English-medium Bachelor’s degree or Medium of Instruction (MOI) letter will be automatically accepted across all Portuguese universities. Many programmes require explicit faculty confirmation or IELTS/TOEFL. Always verify first.
              </p>
            </div>

            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;">
              <div style="font-weight:700;color:#166534;font-size:14px;display:flex;align-items:center;gap:8px;">
                <span>⚖️ Apostille, Legalisation &amp; Translations</span>
              </div>
              <p style="font-size:12px;color:#14532d;margin-top:6px;line-height:1.5;">
                Academic transcripts and degree certificates issued outside the EU require MOFA attestation / Apostille legalisation and official certified translation into Portuguese or English, depending on individual university statutes.
              </p>
            </div>
          </div>

          <div style="margin-top:16px;background:#f1f5f9;border-radius:10px;padding:12px 16px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;font-size:12px;">
            <div style="color:#475569;">
              <strong>National Regulatory Reference:</strong> DGES Public Higher Education Directory
            </div>
            <a href="https://wwwcdn.dges.gov.pt/en/pagina/public-higher-education" target="_blank" rel="noreferrer" style="font-weight:700;color:#123a70;text-decoration:underline;">
              View DGES Official Government Portal ↗
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Cards Grid -->
    <section class="py-10 mb-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-center" style="margin-bottom: 34px;">
          <h2 class="text-2xl sm:text-3xl font-black text-[#123a70]">Directory of Portuguese Public Universities</h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Direct access to official international admission portals, language policies, deadlines, and application requirements.
          </p>
        </div>

        <div id="pt-grid" class="grid grid-cols-1 gap-6 sm:grid-cols-2 janan-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;">
          ${cardsHtml}
        </div>

        <div id="no-pt-results" class="hidden rounded-2xl border-2 border-dashed border-[#123a70]/20 bg-white p-12 text-center" style="margin-top:24px;">
          <p class="text-lg font-bold text-[#123a70]">No Portuguese universities match your search</p>
          <p class="mt-1 text-sm text-slate-500">Try searching by university city like Lisbon, Porto, Coimbra, Minho, or Aveiro.</p>
          <button onclick="document.getElementById('pt-search').value='';filterPortugalUnis();" class="janan-btn-primary" style="margin-top:16px;padding:8px 20px;font-size:12px;cursor:pointer;">Reset Search</button>
        </div>
      </div>
    </section>

    <!-- 4-Step Process Section -->
    <section style="padding: 50px 0; background: #ffffff; border-top: 1px solid rgba(18,58,112,0.1); border-bottom: 1px solid rgba(18,58,112,0.1);">
      <div class="mx-auto max-w-5xl px-4">
        <div class="text-center" style="margin-bottom: 34px;">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Step-by-Step Portugal Admission Roadmap</h2>
          <p class="mt-2 text-sm text-slate-600">How Janan Consultancy navigates your Portuguese application from start to visa.</p>
        </div>
        <div class="janan-about-impact-grid">
          <div class="janan-impact-card janan-shape-a text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Phase 01</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Course &amp; Language Check</div>
            <p class="mt-1 text-[11px] text-slate-500">Verify course teaching language and obtain faculty confirmation on MOI or IELTS requirements.</p>
          </div>
          <div class="janan-impact-card janan-shape-b text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Phase 02</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Apostille &amp; Translations</div>
            <p class="mt-1 text-[11px] text-slate-500">HEC, IBCC, and MOFA legalisation followed by certified Portuguese translation.</p>
          </div>
          <div class="janan-impact-card janan-shape-b text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Phase 03</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">International Contest Call</div>
            <p class="mt-1 text-[11px] text-slate-500">Submission through the university's specific candidate portal during Phase 1 or 2.</p>
          </div>
          <div class="janan-impact-card janan-shape-a text-center">
            <div class="impact-num text-xl font-black text-[#123a70]">Phase 04</div>
            <div class="impact-label mt-2 text-xs font-bold text-slate-700">Acceptance &amp; National Visa</div>
            <p class="mt-1 text-[11px] text-slate-500">Acceptance letter receipt, tuition fee deposit, and VFS Portugal student visa file preparation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation CTA Section -->
    <section style="padding: 48px 0 64px 0; margin-bottom: 60px;">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-8 sm:p-12 shadow-sm">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Planning Your Study in Portugal?</h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Get personalized university selection, document legalisation check, and direct admissions support with Engr. Janan and our senior counseling team.
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20for%20public%20universities%20in%20Portugal." target="_blank" rel="noreferrer" class="janan-btn-primary">
              <span>Chat on WhatsApp (+92 370 017 1997)</span> ↗
            </a>
            <a href="/universities" class="janan-btn-secondary">
              <span>View Italian Universities Directory</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <script>
      function filterPortugalUnis() {
        var query = (document.getElementById('pt-search').value || '').trim().toLowerCase();
        var cards = document.querySelectorAll('[data-pt-card]');
        var visibleCount = 0;

        cards.forEach(function(card) {
          var haystack = card.getAttribute('data-search') || '';
          if (!query || haystack.indexOf(query) !== -1) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        document.getElementById('pt-count').innerText = 'Showing ' + visibleCount + ' of ' + cards.length + ' Portuguese Public Universities';
        var noResults = document.getElementById('no-pt-results');
        if (noResults) {
          if (visibleCount > 0) {
            noResults.classList.add('hidden');
          } else {
            noResults.classList.remove('hidden');
          }
        }
      }
    </script>
  </main>`;
}

// ==========================================
// 4. BUILD ITALY GUIDE PAGE
// ==========================================
function buildItalyGuideHtml() {
  return `<main class="min-h-screen bg-[#f7f9fc]">
    <div class="mx-auto max-w-5xl px-4 py-12">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#123a70]/5 px-3 py-1 text-xs font-semibold text-[#123a70]">
        <a href="/" class="hover:underline">Home</a>
        <span class="text-slate-400">/</span>
        <span class="text-[#123a70]">Study in Italy</span>
      </nav>

      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-black text-[#123a70]">Study in Italy</h1>
        <p class="mt-2 max-w-2xl text-slate-600">
          Complete roadmap to Italian university admissions by degree level, 100% regional scholarships (DSU, ER.GO, Lazio DiSCo), certified legal translations, and student visa insurance.
        </p>
      </div>

      <!-- Section 1: Choose Your Degree Level (Admissions Hub) -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-[#123a70] flex items-center gap-2">
            <span>🎓</span> Degree Level Admissions
          </h2>
          <a href="/study/italy/admissions" class="text-xs font-bold text-[#123a70] hover:underline">View Admissions Hub →</a>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/study/italy/admissions/bachelors-programs" class="flex flex-col items-center justify-center gap-1.5 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">📚</span>
            <span class="text-base font-bold text-[#123a70]">Bachelor's Program</span>
            <span class="text-xs text-slate-500">Undergraduate 3-year degrees</span>
          </a>
          <a href="/study/italy/admissions/masters-programs" class="flex flex-col items-center justify-center gap-1.5 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">🎓</span>
            <span class="text-base font-bold text-[#123a70]">Master's Programs</span>
            <span class="text-xs text-slate-500">Postgraduate 2-year degrees</span>
          </a>
          <a href="/study/italy/admissions/phd-programs" class="flex flex-col items-center justify-center gap-1.5 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">🔬</span>
            <span class="text-base font-bold text-[#123a70]">PhD Programs</span>
            <span class="text-xs text-slate-500">Doctoral research &amp; grants</span>
          </a>
          <a href="/study/italy/admissions/single-degree" class="flex flex-col items-center justify-center gap-1.5 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">⚖️</span>
            <span class="text-base font-bold text-[#123a70]">Single Degree</span>
            <span class="text-xs text-slate-500">Medicine, Law &amp; Architecture</span>
          </a>
        </div>
      </div>

      <!-- Section 2: Core Italy Services & Directories -->
      <div style="margin-top: 52px; margin-bottom: 52px;">
        <h2 class="text-xl font-bold text-[#123a70] mb-4 flex items-center gap-2">
          <span>🏛️</span> Key Destinations &amp; Services
        </h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/universities" class="flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">🏛️</span>
            <span class="text-base font-bold text-[#123a70]">Universities</span>
            <span class="text-xs text-slate-500">Directory of 90 public &amp; private unis</span>
          </a>
          <a href="/scholarships" class="flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">💶</span>
            <span class="text-base font-bold text-[#123a70]">32 Regional Scholarships</span>
            <span class="text-xs text-slate-500">DSU, ER.GO, Lazio Disco</span>
          </a>
          <a href="/study/italy/translation" class="flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">📄</span>
            <span class="text-base font-bold text-[#123a70]">Italian Translation</span>
            <span class="text-xs text-slate-500">Embassy &amp; Consulate verified</span>
          </a>
          <a href="/study/italy/insurance" class="flex flex-col items-center justify-center gap-1 text-center rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 min-h-[120px] shadow-sm transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-3xl">🛡️</span>
            <span class="text-base font-bold text-[#123a70]">Visa Health Insurance</span>
            <span class="text-xs text-slate-500">Schengen compliant</span>
          </a>
        </div>
      </div>

      <!-- Section 3: Free Study in Italy 2027–28 Guides -->
      <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 sm:p-8" style="margin-top: 52px;">
        <h2 class="text-xl font-bold text-[#123a70]">🇮🇹 Free Study in Italy 2027–28 Guides by Janan Consultancy</h2>
        <p class="mt-2 text-slate-600 text-sm">
          Free, detailed guides covering the full application process, English-taught course directories, and public university admissions.
        </p>

        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a href="/study/italy/guide/process/" class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-[#f7f9fc] p-4 font-semibold text-[#123a70] transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-2xl">🇮🇹</span>
            <div>
              <div class="text-sm font-bold text-[#123a70]">Study in Italy — Step-by-Step Process</div>
              <div class="text-xs text-slate-500 font-normal">From pre-enrollment to visa stamping</div>
            </div>
          </a>
          <a href="/study/italy/guide/bachelors/" class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-[#f7f9fc] p-4 font-semibold text-[#123a70] transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-2xl">📚</span>
            <div>
              <div class="text-sm font-bold text-[#123a70]">Bachelor's Courses in Italian Universities</div>
              <div class="text-xs text-slate-500 font-normal">English-taught undergraduate degrees</div>
            </div>
          </a>
          <a href="/study/italy/guide/masters/" class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-[#f7f9fc] p-4 font-semibold text-[#123a70] transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-2xl">🎓</span>
            <div>
              <div class="text-sm font-bold text-[#123a70]">Master's Courses in Italian Universities</div>
              <div class="text-xs text-slate-500 font-normal">English-taught 2-year postgraduate degrees</div>
            </div>
          </a>
          <a href="/universities" class="flex items-center gap-3 rounded-xl border-2 border-[#123a70]/15 bg-[#f7f9fc] p-4 font-semibold text-[#123a70] transition hover:-translate-y-0.5 hover:border-[#123a70] hover:shadow-md">
            <span class="text-2xl">🏛️</span>
            <div>
              <div class="text-sm font-bold text-[#123a70]">Universities Directory (90 Listed)</div>
              <div class="text-xs text-slate-500 font-normal">Admissions, deadlines, fees &amp; portals</div>
            </div>
          </a>
        </div>

        <div class="mt-8 text-center">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20guidance%20for%20studying%20in%20Italy." target="_blank" rel="noreferrer" class="janan-btn-primary">
            <span>Speak with an Italy Counselor on WhatsApp (+92 370 017 1997)</span> ↗
          </a>
        </div>
      </div>
    </div>
  </main>`;
}

// ==========================================
// 5. GENERATE AND WRITE ALL FILES
// ==========================================
console.log('Writing redesigned pages to site-live...');

// 1. Universities
if (!fs.existsSync('site-live/universities')) {
  fs.mkdirSync('site-live/universities', { recursive: true });
}
const universitiesContent = buildUniversitiesHtml();
const universitiesHtml = buildFullHtml(
  "Italian Universities Official Directory (90 Listed) — Janan Consultancy",
  "Complete directory of 61 Public Universities, 22 Private Universities, and 7 Online Universities in Italy with official portals and scholarship eligibility.",
  universitiesContent,
  "universities"
);
fs.writeFileSync('site-live/universities/index.html', universitiesHtml, 'utf8');
fs.writeFileSync('site-live/universities.html', universitiesHtml, 'utf8');
console.log('✓ Wrote site-live/universities/index.html & site-live/universities.html');

// 2. Scholarships
if (!fs.existsSync('site-live/scholarships')) {
  fs.mkdirSync('site-live/scholarships', { recursive: true });
}
const scholarshipsContent = buildScholarshipsHtml();
const scholarshipsHtml = buildFullHtml(
  "Italian Regional Scholarships (32 Official Portals) — Janan Consultancy",
  "Comprehensive directory and application guide for all 32 Italian Regional Right to Study scholarships offering 100% free tuition, living grants, meals, and student housing.",
  scholarshipsContent,
  "scholarships"
);
fs.writeFileSync('site-live/scholarships/index.html', scholarshipsHtml, 'utf8');
fs.writeFileSync('site-live/scholarships.html', scholarshipsHtml, 'utf8');
console.log('✓ Wrote site-live/scholarships/index.html & site-live/scholarships.html');

// 3. Portugal Public Universities & Admission Guide
if (!fs.existsSync('site-live/study/portugal')) {
  fs.mkdirSync('site-live/study/portugal', { recursive: true });
}
const portugalContent = buildPortugalHtml();
const portugalHtml = buildFullHtml(
  "Public Universities of Portugal — International Admission Guide (2027/28)",
  "Official admission guide for all 14 Portuguese public universities under DGES regulations, MOI/IELTS requirements, application portals, and guidance for Pakistani applicants.",
  portugalContent,
  "portugal"
);
fs.writeFileSync('site-live/study/portugal/index.html', portugalHtml, 'utf8');
fs.writeFileSync('site-live/study/portugal.html', portugalHtml, 'utf8');
console.log('✓ Wrote site-live/study/portugal/index.html & site-live/study/portugal.html');

// 4. Italy Guide
if (!fs.existsSync('site-live/study/italy')) {
  fs.mkdirSync('site-live/study/italy', { recursive: true });
}
const italyGuideContent = buildItalyGuideHtml();
const italyGuideHtml = buildFullHtml(
  "Study in Italy — Admissions, Universities & 32 Regional Scholarships",
  "Step-by-step guidance for admissions to 90 Italian universities (public, private, online), 32 regional scholarships (DSU, ER.GO, Lazio Disco), certified legal translations and visa insurance.",
  italyGuideContent,
  "italy"
);
fs.writeFileSync('site-live/study/italy/index.html', italyGuideHtml, 'utf8');
fs.writeFileSync('site-live/study/italy.html', italyGuideHtml, 'utf8');
console.log('✓ Wrote site-live/study/italy/index.html & site-live/study/italy.html');

console.log('All redesigned data pages generated successfully!');
