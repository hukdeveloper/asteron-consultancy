import fs from 'fs';
import path from 'path';

function getHeaderHtml(activePage = '') {
  const isHome = activePage === 'home';
  const isAbout = activePage === 'about';
  const isUniversities = activePage === 'universities';
  const isScholarships = activePage === 'scholarships';
  const isContact = activePage === 'contact';

  return `<header class="sticky top-0 z-40 border-b border-[#123a70]/10 bg-white/95 backdrop-blur">
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

  <!-- Mobile Dropdown Menu Panel -->
  <div id="janan-mobile-menu-dropdown" class="janan-mobile-dropdown border-t border-[#123a70]/10 bg-white/98 shadow-2xl backdrop-blur-md" style="position:relative;z-index:99999;width:100%;max-width:100vw;box-sizing:border-box;">
    <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px;max-width:480px;margin:0 auto;">
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

      <!-- Item 4: Scholarships -->
      <a href="/scholarships" onclick="window.toggleJananMobileMenu()" class="janan-menu-link" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;text-decoration:none;transition:all 0.2s;${isScholarships ? 'background:rgba(18,58,112,0.08);color:#123a70;font-weight:700;' : 'color:#334155;font-weight:600;'}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:rgba(18,58,112,0.08);color:#123a70;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </span>
          <div>
            <div style="font-size:14px;line-height:1.2;display:flex;align-items:center;gap:6px;">
              <span>Scholarships</span>
              <span style="background:#dcfce7;color:#15803d;font-size:10px;font-weight:700;padding:1px 6px;border-radius:9999px;">100% Free</span>
            </div>
            <div style="font-size:11px;color:#64748b;font-weight:400;margin-top:2px;">DSU, ER.GO, LazioDisco &amp; Grants</div>
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
</header>`;
}

const RESPONSIVE_HEADER_CSS = `
<style id="janan-responsive-nav-style">
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
    width: 100% !important;
    position: relative !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  *, *::before, *::after {
    box-sizing: border-box !important;
  }
  .overflow-hidden {
    overflow: hidden !important;
  }
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
  @media (max-width: 768px) {
    .janan-desktop-nav {
      display: none !important;
    }
    .janan-mobile-toggle {
      display: flex !important;
    }
  }
</style>
<script id="janan-nav-inline-script">
  window.toggleJananMobileMenu = function(e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    var dropdown = document.getElementById('janan-mobile-menu-dropdown');
    var btn = document.getElementById('janan-mobile-menu-btn');
    var iconOpen = document.getElementById('hamburger-icon-open');
    var iconClose = document.getElementById('hamburger-icon-close');
    if (!dropdown) return;
    var isOpen = dropdown.classList.contains('is-open');
    if (isOpen) {
      dropdown.classList.remove('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (iconOpen) iconOpen.style.display = 'block';
      if (iconClose) iconClose.style.display = 'none';
    } else {
      dropdown.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (iconOpen) iconOpen.style.display = 'none';
      if (iconClose) iconClose.style.display = 'block';
    }
  };
  document.addEventListener('click', function(e) {
    var dropdown = document.getElementById('janan-mobile-menu-dropdown');
    var btn = document.getElementById('janan-mobile-menu-btn');
    if (!dropdown || !btn) return;
    if (dropdown.classList.contains('is-open')) {
      if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        window.toggleJananMobileMenu();
      }
    }
  });
</script>
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Determine active nav
  let activePage = '';
  const norm = filePath.replace(/\\/g, '/');
  if (norm.endsWith('site-live/index.html')) {
    activePage = 'home';
  } else if (norm.includes('about')) {
    activePage = 'about';
  } else if (norm.includes('universities')) {
    activePage = 'universities';
  } else if (norm.includes('scholarships')) {
    activePage = 'scholarships';
  } else if (norm.includes('contact')) {
    activePage = 'contact';
  }

  // 1. Replace <header>...</header>
  const headerRegex = /<header[\s\S]*?<\/header>/i;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, getHeaderHtml(activePage));
  }

  // 2. Ensure Responsive Nav CSS & inline script in <head>
  if (content.includes('id="janan-responsive-nav-style"')) {
    content = content.replace(/<style id="janan-responsive-nav-style"[\s\S]*?<\/style>(\s*<script id="janan-nav-inline-script"[\s\S]*?<\/script>)?/, RESPONSIVE_HEADER_CSS.trim());
  } else {
    content = content.replace('</head>', `${RESPONSIVE_HEADER_CSS}\n</head>`);
  }

  // 3. Fix any marquee overflow leakage across all HTML files
  content = content.replace(
    /<div class="overflow-hidden border-b border-\[#123a70\]\/20 bg-\[#123a70\]/g,
    '<div style="overflow:hidden;max-width:100vw;width:100%;box-sizing:border-box;" class="border-b border-[#123a70]/20 bg-[#123a70]'
  );

  // 4. Ensure janan-features.js is loaded
  if (!content.includes('/assets/janan-features.js')) {
    content = content.replace('</body>', '<script src="/assets/janan-features.js" defer></script>\n</body>');
  }

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
console.log(`Updated header and navigation across ${total} HTML files in site-live!`);
