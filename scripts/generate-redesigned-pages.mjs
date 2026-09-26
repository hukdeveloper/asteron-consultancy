import fs from 'fs';
import path from 'path';

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
  const isContact = activePage === 'contact';

  return `<header class="sticky top-0 z-50 border-b border-[#123a70]/10 bg-white/95 backdrop-blur" style="position:sticky;top:0;z-index:9999;">
  <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
    <a class="flex items-center gap-2.5 shrink-0 ${isHome ? 'active' : ''}" href="/" ${isHome ? 'data-status="active" aria-current="page"' : ''}>
      <img src="/img/janan-logo.jpg" alt="Janan Consultancy logo" width="38" height="38" class="rounded-lg object-cover shadow-xs" style="width:38px;height:38px"/>
      <span class="font-extrabold text-[#123a70] text-sm leading-tight tracking-tight">Janan<br/><span class="text-xs font-semibold text-slate-500">Consultancy</span></span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="janan-desktop-nav" style="display:flex;align-items:center;gap:20px;">
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isHome ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/" ${isHome ? 'data-status="active" aria-current="page"' : ''}>Home</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isAbout ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/about" ${isAbout ? 'data-status="active" aria-current="page"' : ''}>About</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isUniversities ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/universities" ${isUniversities ? 'data-status="active" aria-current="page"' : ''}>Universities</a>
      <a class="hover:text-[#fbb040] transition" style="text-decoration:none;color:#123a70;font-size:14px;${isScholarships ? 'font-weight:700;border-bottom:2px solid #123a70;padding-bottom:2px;' : 'font-weight:600;'}" href="/scholarships" ${isScholarships ? 'data-status="active" aria-current="page"' : ''}>Scholarships</a>
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
              <span style="background:#fef3c7;color:#92400e;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">Directory</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">Italian Public Unis &amp; Fees</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 4: Scholarships (NEW) -->
      <a href="/scholarships" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isScholarships ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;display:flex;align-items:center;gap:6px;">
              <span>Scholarships</span>
              <span style="background:#ecfdf5;color:#047857;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">€8,500/yr</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">DSU, ER.GO, Lazio &amp; MAECI</div>
          </div>
        </div>
        <span style="font-size:14px;color:#94a3b8;">→</span>
      </a>

      <!-- Item 5: Contact Us -->
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

// 1. Redesigned About Content
const ABOUT_CONTENT = `<main class="min-h-screen bg-[#f7f9fc]">
  <!-- Hero Section -->
  <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
    <div class="mx-auto max-w-5xl px-4 text-center">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
        <a href="/" class="hover:text-white transition">Home</a>
        <span class="text-white/40">/</span>
        <span class="text-[#fbb040] font-bold">About Us</span>
      </nav>
      <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">About Janan Consultancy</h1>
      <div class="janan-hero-btn-group mt-6 flex flex-wrap items-center justify-center gap-3">
        <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services." target="_blank" rel="noreferrer" class="janan-btn-white">
          <span class="desktop-text">Start 1-on-1 Consultation ↗</span>
          <span class="mobile-text">Consultation ↗</span>
        </a>
        <a href="/universities" class="janan-btn-trans">
          <span class="desktop-text">Explore Universities →</span>
          <span class="mobile-text">Universities →</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Impact Numbers (4 Geometric Leaf/Faceted Shield Badges: Neither rectangle, nor square, nor circle) -->
  <section class="janan-impact-section" style="padding: 48px 0 40px 0;">
    <div class="mx-auto max-w-5xl px-4">
      <div class="janan-about-impact-grid">
        <div class="janan-impact-card janan-shape-a text-center">
          <div class="impact-num text-2xl sm:text-4xl font-black text-[#123a70]">50,000+</div>
          <div class="impact-label mt-1 text-xs sm:text-sm font-semibold text-slate-600">Community Members</div>
        </div>
        <div class="janan-impact-card janan-shape-b text-center">
          <div class="impact-num text-2xl sm:text-4xl font-black text-[#123a70]">70+</div>
          <div class="impact-label mt-1 text-xs sm:text-sm font-semibold text-slate-600">Public Universities</div>
        </div>
        <div class="janan-impact-card janan-shape-b text-center">
          <div class="impact-num text-2xl sm:text-4xl font-black text-[#123a70]">€8,500/yr</div>
          <div class="impact-label mt-1 text-xs sm:text-sm font-semibold text-slate-600">Max Regional Grant</div>
        </div>
        <div class="janan-impact-card janan-shape-a text-center">
          <div class="impact-num text-2xl sm:text-4xl font-black text-[#123a70]">100%</div>
          <div class="impact-label mt-1 text-xs sm:text-sm font-semibold text-slate-600">Direct Official Portals</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Founder & Mission Section -->
  <section style="padding: 24px 0 36px 0;">
    <div class="mx-auto max-w-5xl px-4">
      <div class="overflow-hidden rounded-2xl border-2 border-[#123a70]/15 bg-white shadow-sm" style="display:flex;flex-wrap:wrap;">
        <div style="flex:1 1 320px;background:#123a70;color:#fff;padding:36px;display:flex;flex-direction:column;justify-content:between;">
          <div>
            <span class="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">Leadership &amp; Vision</span>
            <h2 class="mt-4 text-2xl font-bold">Engr. Janan</h2>
            <p class="text-sm text-white/80">Founder &amp; Principal Education Consultant</p>
            <div class="mt-6 border-t border-white/20 pt-6 text-sm leading-relaxed text-white/90">
              <p>&ldquo;Kindness is not an act, it's a reflection of your soul. We built Janan Consultancy so students never fall victim to exorbitant agent charges or false promises. We guide with precision, truth, and heart.&rdquo;</p>
            </div>
          </div>
          <div class="mt-8">
            <a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/25 transition">
              <span>Connect on LinkedIn</span> ↗
            </a>
          </div>
        </div>
        <div style="flex:2 1 380px;padding:36px;display:flex;flex-direction:column;justify-content:center;">
          <h3 class="text-2xl font-bold text-[#123a70]">Why Janan Consultancy Was Built</h3>
          <p class="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
            Studying in Europe offers world-class education at zero tuition fee through regional scholarships. However, bureaucratic mazes, complex document legalization, embassy translation guidelines, and strict university deadlines leave many qualified students stranded.
          </p>
          <p class="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            Janan Consultancy eliminates this confusion. We walk alongside students through university selection, admission portal submissions, regional scholarship paperwork (DSU, ER.GO, ALiSEO, LazioDisco), certified Italian embassy translations, and Schengen visa health insurance.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ No False Promises</span>
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ Direct Official Portals</span>
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ 1-on-1 Personalized Care</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Services -->
  <section class="py-12">
    <div class="mx-auto max-w-5xl px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Complete End-to-End Guidance</h2>
        <p class="mt-2 text-slate-600 max-w-xl mx-auto text-sm">Every step of your European academic path handled under one dedicated roof.</p>
      </div>
      <div class="janan-grid-2">
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">01</span>
            <h3 class="text-lg font-bold text-[#123a70]">University Admissions &amp; Shortlisting</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Personalized shortlisting of top Italian and European public universities matching your GPA, budget, and English proficiency (with or without IELTS). Direct guidance for Bachelor's, Master's, and PhD programs.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">02</span>
            <h3 class="text-lg font-bold text-[#123a70]">Regional Scholarships (Up to €8,500/yr)</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Full support for Italian regional need-based scholarships including DSU, ER.GO, ALiSEO, and LazioDisco. We assist with family income evaluations (ISEE Parificato), document preparation, and error-free submissions.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">03</span>
            <h3 class="text-lg font-bold text-[#123a70]">Embassy Translation &amp; Legalization</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Certified Italian language translations accepted by both the Embassy of Italy in Islamabad and the Consulate General in Karachi. Jurisdiction-specific documentation for Punjab, KPK, Sindh, and Balochistan.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">04</span>
            <h3 class="text-lg font-bold text-[#123a70]">Visa Health Insurance &amp; Pre-Enrollment</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Official Schengen student visa health insurance with required minimum €30,000 coverage, alongside Universitaly pre-enrollment validation and visa interview preparation.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Box with generous bottom space before footer -->
  <section class="py-12 mb-20 sm:mb-28">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <div class="rounded-2xl bg-[#123a70] p-8 sm:p-12 text-white shadow-xl">
        <h2 class="text-2xl sm:text-3xl font-extrabold">Ready to Begin Your European Academic Journey?</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/80 text-sm sm:text-base">Connect directly with our counseling team on WhatsApp today for free initial guidance.</p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20consult%20regarding%20studying%20in%20Europe." target="_blank" rel="noreferrer" class="janan-btn-white">
            <span>Contact on WhatsApp</span> ↗
          </a>
          <a href="/contact" class="janan-btn-trans">
            <span>Visit Contact Page</span> →
          </a>
        </div>
      </div>
    </div>
  </section>
</main>`;

// 2. Redesigned Contact Content
const CONTACT_CONTENT = `<main class="min-h-screen bg-[#f7f9fc]">
  <!-- Hero Section -->
  <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
        <a href="/" class="hover:text-white transition">Home</a>
        <span class="text-white/40">/</span>
        <span class="text-[#fbb040] font-bold">Contact Us</span>
      </nav>
      <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Contact Janan Consultancy</h1>
    </div>
  </section>

  <!-- Direct Channels Grid -->
  <section class="py-12">
    <div class="mx-auto max-w-5xl px-4">
      <div class="janan-grid-3">
        <!-- WhatsApp Direct -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#e8f5e9;display:flex;align-items:center;justify-content:center;color:#2e7d32;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">WhatsApp Counseling</h3>
            <p class="mt-2 text-sm text-slate-600">Immediate 1-on-1 counseling, quick document checks, and status updates.</p>
            <p class="mt-3 text-base font-bold text-[#123a70]">+92 370 017 1997</p>
          </div>
          <div class="mt-6">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question%20about%20studying%20in%20Europe." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;text-align:center;">Chat on WhatsApp ↗</a>
          </div>
        </div>

        <!-- Official Email -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#e3f2fd;display:flex;align-items:center;justify-content:center;color:#1565c0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">Email Inquiries</h3>
            <p class="mt-2 text-sm text-slate-600">For academic transcripts evaluation, scholarship queries, and partnerships.</p>
            <p class="mt-3 text-xs sm:text-sm font-bold text-[#123a70] break-all">jananconsultants.services@gmail.com</p>
          </div>
          <div class="mt-6">
            <a href="mailto:jananconsultants.services@gmail.com" class="janan-btn-primary" style="width:100%;text-align:center;">Send Email ↗</a>
          </div>
        </div>

        <!-- WhatsApp Community -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#fff8e1;display:flex;align-items:center;justify-content:center;color:#b78103;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">Student Community</h3>
            <p class="mt-2 text-sm text-slate-600">Get daily updates on admission windows, scholarship deadlines, and visa alerts.</p>
            <p class="mt-3 text-base font-bold text-[#123a70]">50,000+ Followers</p>
          </div>
          <div class="mt-6">
            <a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;text-align:center;">Join Channel ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive WhatsApp Dispatch Form -->
  <section class="py-6">
    <div class="mx-auto max-w-3xl px-4">
      <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 sm:p-10 shadow-sm">
        <div class="text-center mb-6">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#123a70]">Quick Consultation Request</h2>
          <p class="mt-2 text-sm text-slate-600">Fill in your details below to dispatch your profile directly to our counseling team on WhatsApp.</p>
        </div>

        <form id="contact-dispatch-form" onsubmit="event.preventDefault(); dispatchWhatsApp();" style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <label class="block text-xs font-bold text-[#123a70] uppercase">Full Name *</label>
            <input type="text" id="c-name" required placeholder="e.g. Muhammad Ali" style="margin-top:6px;width:100%;border-radius:12px;border:1px solid #cbd5e1;padding:12px 16px;font-size:14px;color:#1e293b;outline:none;" />
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:14px;">
            <div>
              <label class="block text-xs font-bold text-[#123a70] uppercase">WhatsApp Number *</label>
              <input type="tel" id="c-phone" required placeholder="e.g. +92 300 1234567" style="margin-top:6px;width:100%;border-radius:12px;border:1px solid #cbd5e1;padding:12px 16px;font-size:14px;color:#1e293b;outline:none;" />
            </div>
            <div>
              <label class="block text-xs font-bold text-[#123a70] uppercase">Target Degree *</label>
              <select id="c-degree" required style="margin-top:6px;width:100%;border-radius:12px;border:1px solid #cbd5e1;padding:12px 16px;font-size:14px;color:#1e293b;outline:none;background:#fff;">
                <option value="Master's Degree (Laurea Magistrale)">Master's Degree (2 Years)</option>
                <option value="Bachelor's Degree (Laurea Triennale)">Bachelor's Degree (3 Years)</option>
                <option value="PhD Research">PhD / Doctorate</option>
                <option value="Regional Scholarship Guidance">Regional Scholarship Guidance</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#123a70] uppercase">Target Destination *</label>
            <select id="c-country" required style="margin-top:6px;width:100%;border-radius:12px;border:1px solid #cbd5e1;padding:12px 16px;font-size:14px;color:#1e293b;outline:none;background:#fff;">
              <option value="Italy (Zero Tuition / Regional Scholarships)">Italy (Public Unis &amp; 100% Scholarships)</option>
              <option value="Portugal">Portugal</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#123a70] uppercase">Brief Academic Background &amp; Query</label>
            <textarea id="c-notes" rows="3" placeholder="Tell us your GPA, degree completion year, and English status..." style="margin-top:6px;width:100%;border-radius:12px;border:1px solid #cbd5e1;padding:12px 16px;font-size:14px;color:#1e293b;outline:none;"></textarea>
          </div>

          <div style="margin-top:8px;">
            <button type="submit" class="janan-btn-primary" style="width:100%;padding:14px 20px;font-size:15px;cursor:pointer;">
              Submit &amp; Open WhatsApp Conversation ↗
            </button>
          </div>
        </form>

        <script>
          function dispatchWhatsApp() {
            var name = document.getElementById('c-name').value.trim();
            var phone = document.getElementById('c-phone').value.trim();
            var degree = document.getElementById('c-degree').value;
            var country = document.getElementById('c-country').value;
            var notes = document.getElementById('c-notes').value.trim();

            var text = "Hello Janan Consultancy,\\n\\n" +
              "I would like to request study abroad counseling:\\n" +
              "• Name: " + name + "\\n" +
              "• Phone: " + phone + "\\n" +
              "• Degree Level: " + degree + "\\n" +
              "• Country: " + country + "\\n" +
              (notes ? "• Details: " + notes + "\\n" : "") +
              "\\nPlease let me know the admission windows and next steps.";

            var url = "https://wa.me/923700171997?text=" + encodeURIComponent(text);
            window.open(url, "_blank");
          }
        </script>
      </div>
    </div>
  </section>

  <!-- FAQs Accordion -->
  <section class="py-12 mb-20 sm:mb-28">
    <div class="mx-auto max-w-4xl px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Frequently Asked Questions</h2>
        <p class="mt-2 text-sm text-slate-600">Quick answers to common questions about admissions and scholarships.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>Can I apply to Italian public universities without IELTS?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Yes! Many Italian public universities accept an English Proficiency Certificate (Medium of Instruction - MOI) from your previous institution if your degree was taught in English. However, some specific courses or universities may require an IELTS score of 5.5 to 6.5. We evaluate your profile and target the right universities accordingly.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>What are Italian Regional Scholarships (DSU, ER.GO, ALiSEO)?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Regional scholarships in Italy are government need-based grants offered by regional bodies (such as DSU in Tuscany, ER.GO in Emilia Romagna, LazioDisco in Lazio, EDiSU in Piedmont/Lombardy). If your family income evaluates below the threshold (ISEE Parificato &lt; €25,000/year), you receive full tuition fee waiver, free or subsidized meals, accommodation, and an annual cash stipend up to €8,500.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>How does Janan Consultancy assist with embassy translations &amp; legalizations?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Both the Italian Embassy in Islamabad and the Consulate General in Karachi have strict translation and apostille/attestation standards. We provide authorized Italian sworn translations and guide you through Ministry of Foreign Affairs (MOFA) attestation, IBCC/HEC verification, and consulate submissions without delays.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>What are your active working hours?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Our counselors are actively available on WhatsApp and email Monday through Saturday from 10:00 AM to 8:00 PM (PKT). Community channels receive updates 24/7.
          </p>
        </details>
      </div>
    </div>
  </section>
</main>`;

// 3. Redesigned Universities Content
const rawUnis = JSON.parse(fs.readFileSync('scripts/complete-universities.json', 'utf8'));

function buildUniversitiesHtml() {
  const cardsHtml = rawUnis.map(u => {
    const isFree = u.fee.includes('No Fee') || u.fee.includes('€0');
    const feeBadgeStyle = isFree 
      ? 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;' 
      : 'background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;';
    const hasApply = u.applyUrl && u.applyUrl.startsWith('http');
    const applyHref = hasApply ? u.applyUrl : `https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20to%20${encodeURIComponent(u.name)}.`;
    const searchTokens = `${u.name.toLowerCase()} ${u.city.toLowerCase()} ${isFree ? 'nofee free' : ''} ${u.english.toLowerCase()}`;

    const cleanCity = u.city.replace(/,\s*Italy$/i, '').trim();
    return `
      <div data-uni-card data-search="${searchTokens}" class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <span style="display:inline-flex;align-items:center;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;${feeBadgeStyle}">
              ${u.fee}
            </span>
            <span style="display:inline-flex;align-items:center;border-radius:8px;background:#f1f5f9;padding:4px 10px;font-size:11px;font-weight:600;color:#475569;">
              📍 ${cleanCity}, Italy
            </span>
          </div>
          <h3 class="mt-3 text-lg font-bold text-[#123a70]" style="line-height:1.35;min-height:48px;">${u.name}</h3>
          
          <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:12px;font-size:12px;color:#475569;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Language:</span>
              <span style="font-weight:600;color:#334155;">English / MOI Accepted</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Scholarship:</span>
              <span style="font-weight:600;color:#047857;">DSU / Regional Eligible</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Degrees:</span>
              <span style="font-weight:600;color:#334155;">Bachelor's &amp; Master's</span>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;padding-top:8px;">
          <a href="${applyHref}" target="_blank" rel="noreferrer" class="janan-btn-primary" style="padding:9px 14px;font-size:12px;border-radius:10px;width:100%;">
            Apply Portal ↗
          </a>
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20need%20admission%20guidance%20for%20${encodeURIComponent(u.name)}." target="_blank" rel="noreferrer" class="janan-btn-secondary" style="padding:8px 14px;font-size:12px;border-radius:10px;width:100%;border-width:1px;">
            Ask Counselor on WhatsApp
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
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Italian Public Universities Directory</h1>

        <!-- Search & Filter Controls -->
        <div class="mt-6 flex flex-col items-center justify-center gap-4">
          <div class="relative w-full max-w-md">
            <input 
              id="uni-search" 
              type="text" 
              placeholder="Search by university name or city (e.g. Milan, Rome, Bologna, Genoa)..." 
              style="width:100%;border-radius:9999px;border:2px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.95);padding:13px 22px;font-size:14px;color:#123a70;outline:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);"
              oninput="filterUniversities()"
            />
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;">
            <button onclick="setFilter('all')" id="btn-all" class="filter-btn" style="border-radius:9999px;background:#fbb040;color:#123a70;padding:7px 18px;font-size:12px;font-weight:700;border:none;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.2);">All (${rawUnis.length})</button>
            <button onclick="setFilter('nofee')" id="btn-nofee" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">No Application Fee</button>
            <button onclick="setFilter('milan')" id="btn-milan" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Milan</button>
            <button onclick="setFilter('rome')" id="btn-rome" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Rome</button>
            <button onclick="setFilter('bologna')" id="btn-bologna" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Bologna</button>
            <button onclick="setFilter('turin')" id="btn-turin" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.15);color:#fff;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;">Turin</button>
          </div>

          <div id="uni-count" style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);">
            Showing ${rawUnis.length} of ${rawUnis.length} universities
          </div>
        </div>
      </div>
    </section>

    <!-- Cards Grid -->
    <section class="py-12 mb-20 sm:mb-28">
      <div class="mx-auto max-w-6xl px-4">
        <div id="uni-grid" class="janan-grid-3">
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
      var currentTag = 'all';

      function filterUniversities() {
        var query = (document.getElementById('uni-search').value || '').trim().toLowerCase();
        var cards = document.querySelectorAll('[data-uni-card]');
        var visibleCount = 0;

        cards.forEach(function(card) {
          var haystack = card.getAttribute('data-search') || '';
          var matchesQuery = !query || haystack.indexOf(query) !== -1;
          var matchesTag = (currentTag === 'all') || (haystack.indexOf(currentTag) !== -1);

          if (matchesQuery && matchesTag) {
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

      function setFilter(tag) {
        currentTag = tag;
        var buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(function(b) {
          b.style.background = 'rgba(255,255,255,0.15)';
          b.style.color = '#ffffff';
          b.style.border = '1px solid rgba(255,255,255,0.3)';
          b.style.fontWeight = '600';
          b.style.boxShadow = 'none';
        });
        var activeBtn = document.getElementById('btn-' + tag);
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

// 4. NEW Scholarships Page Content
const SCHOLARSHIPS_CONTENT = `<main class="min-h-screen bg-[#f7f9fc]">
  <!-- Hero Section -->
  <section class="janan-dark-hero border-b border-[#123a70]/30 text-white shadow-inner" style="background:linear-gradient(135deg, #0a1f3d 0%, #123a70 50%, #1a498b 100%);padding:56px 20px;">
    <div class="mx-auto max-w-5xl px-4 text-center">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs border border-white/15">
        <a href="/" class="hover:text-white transition">Home</a>
        <span class="text-white/40">/</span>
        <span class="text-[#fbb040] font-bold">Scholarships</span>
      </nav>
      <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Italian &amp; European Regional Scholarships</h1>

      <div class="janan-hero-btn-group mt-6 flex flex-wrap items-center justify-center gap-3">
        <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20evaluate%20my%20eligibility%20for%20Italian%20regional%20scholarships." target="_blank" rel="noreferrer" class="janan-btn-white">
          <span class="desktop-text">Evaluate My Eligibility on WhatsApp ↗</span>
          <span class="mobile-text">Check Eligibility ↗</span>
        </a>
        <a href="#scholarships-grid" class="janan-btn-trans">
          <span class="desktop-text">View All Regional Grants ↓</span>
          <span class="mobile-text">Browse Grants ↓</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Scholarships Cards Directory -->
  <section id="scholarships-grid" style="padding-top: 52px; padding-bottom: 60px;">
    <div class="mx-auto max-w-6xl px-4">
      <div class="scholarships-heading-block text-center" style="margin-bottom: 40px;">
        <h2 class="text-2xl sm:text-3xl font-black text-[#123a70]">Active Italian Regional Grants (100% Coverage)</h2>
        <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto" style="margin-top: 10px; margin-bottom: 0;">
          Need-based government funding available to international students regardless of high school or university grades, calculated through family income (ISEE Parificato).
        </p>
      </div>

      <div class="janan-grid-3">
        <!-- 1. DSU Toscana -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Open for Prep</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 Tuscany Region</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">DSU Toscana Scholarship</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€8,500 <span class="text-xs font-semibold text-slate-500">/ Year Cash Stipend</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">100% Free Exemption</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Meals:</span>
                <span style="font-weight:600;color:#334155;">Free Mensa (2 Meals/Day)</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Accommodation:</span>
                <span style="font-weight:600;color:#334155;">Free Student Residence</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">ISEE &lt; €25,000</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Institutions:</strong> University of Pisa, Florence, Siena, Sant'Anna, Scuola Normale.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20for%20the%20DSU%20Toscana%20Scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>

        <!-- 2. ER.GO Emilia-Romagna -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Admissions Active</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 Emilia-Romagna</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">ER.GO Regional Grant</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€8,500+ <span class="text-xs font-semibold text-slate-500">/ Year Bank Deposit</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">Zero University Fee</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Meals:</span>
                <span style="font-weight:600;color:#334155;">Canteen Card Allowance</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Accommodation:</span>
                <span style="font-weight:600;color:#334155;">Priority Student Housing</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">ISEE &lt; €27,000</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Institutions:</strong> University of Bologna (#1 in Italy), Parma, Modena, Reggio Emilia, Ferrara.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20want%20to%20apply%20for%20ER.GO%20Regional%20Scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>

        <!-- 3. LazioDisco Rome -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Priority Call</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 Rome / Lazio</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">LazioDisco Scholarship</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€8,000+ <span class="text-xs font-semibold text-slate-500">/ Year Cash Allowance</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">Full Fee Waiver</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Meals:</span>
                <span style="font-weight:600;color:#334155;">Daily Dining Vouchers</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Accommodation:</span>
                <span style="font-weight:600;color:#334155;">Rome Student Residence</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">ISEE &lt; €26,000</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Institutions:</strong> Sapienza University of Rome, Tor Vergata, Roma Tre, Univ. of Tuscia, Cassino.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20interested%20in%20LazioDisco%20Rome%20Scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>

        <!-- 4. EDiSU Piemonte & Lombardy -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Engineering Focus</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 Piedmont &amp; Lombardy</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">EDiSU Regional Grants</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€8,200 <span class="text-xs font-semibold text-slate-500">/ Year Grant</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">100% Free at PoliTO</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Meals:</span>
                <span style="font-weight:600;color:#334155;">Free Dining Card</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Accommodation:</span>
                <span style="font-weight:600;color:#334155;">EDiSU Hostel Room</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">ISEE &lt; €25,000</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Institutions:</strong> Politecnico di Torino, University of Turin, Milan, Pavia, Eastern Piedmont.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20need%20EDiSU%20Piemonte%20scholarship%20assistance." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>

        <!-- 5. ALiSEO Liguria -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Coastal Region</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 Liguria / Genoa</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">ALiSEO Liguria Scholarship</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€7,500 <span class="text-xs font-semibold text-slate-500">/ Year Stipend</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">Full Fee Exemption</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Meals:</span>
                <span style="font-weight:600;color:#334155;">Campus Canteen Covered</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Accommodation:</span>
                <span style="font-weight:600;color:#334155;">University Residences</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">ISEE &lt; €25,000</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Institutions:</strong> University of Genoa (UniGe), Ligurian academies of art and music.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20interested%20in%20ALiSEO%20Liguria%20scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>

        <!-- 6. MAECI Italian Government Grant -->
        <div class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="background:#fef3c7;color:#92400e;border:1px solid #fde68a;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;">Government Merit</span>
              <span style="background:#f1f5f9;color:#475569;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:600;">📍 All Italy</span>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">MAECI Italian National Award</h3>
            <div class="mt-2 text-2xl font-black text-[#fbb040]">€9,000 <span class="text-xs font-semibold text-slate-500">/ Total (€1,000/Mo)</span></div>

            <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:14px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Tuition:</span>
                <span style="font-weight:700;color:#047857;">100% Enrollment Waiver</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Health Insurance:</span>
                <span style="font-weight:600;color:#334155;">Full Medical Cover Included</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Scope:</span>
                <span style="font-weight:600;color:#334155;">All Italian Public Unis</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="color:#64748b;">Key Condition:</span>
                <span style="font-weight:600;color:#123a70;">Pre-admission Offer</span>
              </div>
            </div>

            <div style="margin-top:16px;background:#f8fafc;border-radius:10px;padding:10px;font-size:11px;color:#475569;">
              <strong style="color:#123a70;">Covered Programs:</strong> Master's (Laurea Magistrale), PhD Research, AFAM Italian Arts and Music.
            </div>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20want%20to%20prepare%20for%20MAECI%20Government%20Scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;padding:10px;font-size:12px;border-radius:10px;">Apply with Counselor on WhatsApp ↗</a>
          </div>
        </div>
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
          Contact our specialized scholarship desk on WhatsApp for immediate profile review and deadline schedules.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20ready%20to%20apply%20for%20an%20Italian%20scholarship." target="_blank" rel="noreferrer" class="janan-btn-primary">
            <span>Start WhatsApp Application</span> ↗
          </a>
          <a href="/universities" class="janan-btn-secondary">
            <span>Browse Eligible Universities</span> →
          </a>
        </div>
      </div>
    </div>
  </section>
</main>`;

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

    /* 4 boxes: Each row has two boxes (2x2 grid) with shape other than rectangle, square, and circle */
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

// Full HTML Template Wrapper
function buildFullHtml(title, description, contentHtml, activeNav) {
  return `<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="image" href="/img/janan-logo.jpg"/><link rel="stylesheet" href="/assets/index-Cmku6p7J.css" type="text/css" data-precedence="default"/><title>${title}</title><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/>${GLOBAL_ENHANCEMENT_STYLES}</head><body>
${getHeader(activeNav)}
${contentHtml}
${PERFECT_FOOTER_HTML}
<script src="/assets/janan-features.js" defer></script>
</body></html>`;
}

// 1. Write Redesigned About Pages
const aboutHtml = buildFullHtml(
  "About Janan Consultancy — Study in Italy & Europe",
  "Learn about Janan Consultancy, our mission, leadership by Engr. Janan, and our end-to-end guidance for public universities and scholarships in Europe.",
  ABOUT_CONTENT,
  "about"
);
fs.writeFileSync('site-live/about/index.html', aboutHtml, 'utf8');
fs.writeFileSync('site-live/about.html', aboutHtml, 'utf8');
console.log('Successfully wrote site-live/about/index.html & site-live/about.html');

// 2. Write Redesigned Contact Pages
const contactHtml = buildFullHtml(
  "Contact Us — Janan Consultancy",
  "Connect with Janan Consultancy for study abroad counseling, Italian public university admissions, DSU scholarships, translations, and visa insurance.",
  CONTACT_CONTENT,
  "contact"
);
fs.writeFileSync('site-live/contact/index.html', contactHtml, 'utf8');
fs.writeFileSync('site-live/contact.html', contactHtml, 'utf8');
console.log('Successfully wrote site-live/contact/index.html & site-live/contact.html');

// 3. Write Universities Pages
if (!fs.existsSync('site-live/universities')) {
  fs.mkdirSync('site-live/universities', { recursive: true });
}
const universitiesContent = buildUniversitiesHtml();
const universitiesHtml = buildFullHtml(
  "Italian & European Public Universities Directory — Janan Consultancy",
  "Comprehensive directory of Italian public universities with admission fee details, English-taught degree criteria, and direct application portals.",
  universitiesContent,
  "universities"
);
fs.writeFileSync('site-live/universities/index.html', universitiesHtml, 'utf8');
fs.writeFileSync('site-live/universities.html', universitiesHtml, 'utf8');
console.log('Successfully wrote site-live/universities/index.html & site-live/universities.html');

// 4. Write NEW Scholarships Pages
if (!fs.existsSync('site-live/scholarships')) {
  fs.mkdirSync('site-live/scholarships', { recursive: true });
}
const scholarshipsHtml = buildFullHtml(
  "Italian & European Regional Scholarships — Janan Consultancy",
  "Complete guide and directory of Italian regional scholarships (DSU, ER.GO, LazioDisco, EDiSU, ALiSEO) offering 100% free tuition, living grants, meals, and student housing.",
  SCHOLARSHIPS_CONTENT,
  "scholarships"
);
fs.writeFileSync('site-live/scholarships/index.html', scholarshipsHtml, 'utf8');
fs.writeFileSync('site-live/scholarships.html', scholarshipsHtml, 'utf8');
console.log('Successfully wrote site-live/scholarships/index.html & site-live/scholarships.html');
