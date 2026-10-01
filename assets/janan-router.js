/**
 * Janan Consultancy - Next.js Style Client-Side SPA Router
 * 
 * Provides instantaneous, client-side route transitions without hard page reloads
 * and without browser tab loading / favicon spinning.
 */

(function () {
  'use strict';

  const cache = new Map();

  function setCache(key, val) {
    console.log('[JananRouter] cache.set:', key, 'len:', val ? val.length : 0, 'snippet:', val ? val.slice(0, 60) : '');
    cache.set(key, val);
  }

  // Prefetch a URL into cache
  function prefetch(url) {
    if (!url) return;
    try {
      const u = new URL(url, window.location.origin);
      if (u.origin !== window.location.origin) return;
      const path = u.pathname.replace(/\/$/, '') || '/';
      if (cache.has(path)) return;

      fetch(u.href, { credentials: 'same-origin' })
        .then(res => {
          if (!res.ok) throw new Error('Prefetch status ' + res.status);
          return res.text();
        })
        .then(html => {
          setCache(path, html);
          setCache(u.pathname, html);
        })
        .catch(() => {});
    } catch (e) {}
  }

  // Pre-fetch current page pristine HTML in background
  try {
    prefetch(window.location.href);
  } catch (e) {}

  // Prefetch on hover / touchstart for instant 0ms transitions
  document.addEventListener('mouseover', function (e) {
    const a = e.target.closest('a');
    if (a && isNavigable(a)) prefetch(a.href);
  }, { passive: true });

  document.addEventListener('touchstart', function (e) {
    const a = e.target.closest('a');
    if (a && isNavigable(a)) prefetch(a.href);
  }, { passive: true });

  function isNavigable(a) {
    if (!a || !a.href) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.hasAttribute('data-no-spa')) return false;

    // Must be same origin
    if (a.origin !== window.location.origin) return false;

    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }

    if (a.pathname === window.location.pathname && a.hash) {
      return false;
    }

    return true;
  }

  // Re-run inline scripts inside an element
  function executeScripts(container) {
    if (!container) return;
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      // Don't re-run the router itself
      if (oldScript.src && (oldScript.src.includes('janan-router') || oldScript.src.includes('janan-features'))) {
        return;
      }
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // Perform client-side route navigation
  async function navigate(url, push = true) {
    const targetUrl = new URL(url, window.location.origin);
    const targetPath = targetUrl.pathname.replace(/\/$/, '') || '/';

    // 1. Close mobile menu if open
    try {
      const dropdown = document.getElementById('janan-mobile-menu-dropdown');
      const backdrop = document.getElementById('janan-mobile-backdrop');
      const iconOpen = document.getElementById('hamburger-icon-open');
      const iconClose = document.getElementById('hamburger-icon-close');
      const btn = document.getElementById('janan-mobile-menu-btn');
      if (dropdown && dropdown.classList.contains('is-open')) {
        dropdown.classList.remove('is-open');
        if (backdrop) backdrop.style.display = 'none';
        if (iconOpen) iconOpen.style.display = 'block';
        if (iconClose) iconClose.style.display = 'none';
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    } catch (e) {}

    try {
      let html = cache.get(targetPath) || cache.get(targetUrl.pathname);
      // Ensure cached content is complete and valid (> 5000 bytes)
      if (!html || html.length < 5000) {
        const res = await fetch(targetUrl.href, { credentials: 'same-origin' });
        if (!res.ok) throw new Error('Fetch failed with status ' + res.status);
        html = await res.text();
        setCache(targetPath, html);
        setCache(targetUrl.pathname, html);
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Update Title
      if (doc.title) {
        document.title = doc.title;
      }

      // Update Meta Description
      const newMeta = doc.querySelector('meta[name="description"]');
      const curMeta = document.querySelector('meta[name="description"]');
      if (newMeta && curMeta) {
        curMeta.setAttribute('content', newMeta.getAttribute('content'));
      }

      // Synchronize Head Styles and Stylesheets
      doc.querySelectorAll('head style, head link[rel="stylesheet"]').forEach(el => {
        const href = el.getAttribute('href');
        const id = el.id;
        if (href && !document.querySelector(`head link[href="${href}"]`)) {
          document.head.appendChild(el.cloneNode(true));
        } else if (id && !document.getElementById(id)) {
          document.head.appendChild(el.cloneNode(true));
        } else if (!href && !id) {
          const text = el.textContent.trim();
          let exists = false;
          document.querySelectorAll('head style').forEach(s => {
            if (s.textContent.trim() === text) exists = true;
          });
          if (!exists) {
            document.head.appendChild(el.cloneNode(true));
          }
        }
      });

      // Update Header (active navigation links & styling)
      const curHeader = document.querySelector('header');
      const newHeader = doc.querySelector('header');
      if (curHeader && newHeader) {
        curHeader.innerHTML = newHeader.innerHTML;
      }

      // Seamlessly swap all content between Header and Footer
      const curFooter = document.querySelector('footer');
      const newFooter = doc.querySelector('footer');

      if (curHeader && curFooter && newHeader && newFooter) {
        // Remove old sibling nodes between header and footer
        let node = curHeader.nextSibling;
        while (node && node !== curFooter) {
          const next = node.nextSibling;
          node.remove();
          node = next;
        }

        // Collect new sibling nodes from incoming page
        const nodesToInsert = [];
        let newNode = newHeader.nextSibling;
        while (newNode && newNode !== newFooter) {
          nodesToInsert.push(newNode.cloneNode(true));
          newNode = newNode.nextSibling;
        }

        // Insert new nodes before footer
        nodesToInsert.forEach(n => {
          curFooter.parentNode.insertBefore(n, curFooter);
        });

        // Execute scripts in all inserted nodes
        nodesToInsert.forEach(n => {
          if (n.nodeType === Node.ELEMENT_NODE) {
            if (n.tagName === 'SCRIPT') {
              if (!n.src || (!n.src.includes('janan-router') && !n.src.includes('janan-features'))) {
                const s = document.createElement('script');
                Array.from(n.attributes).forEach(a => s.setAttribute(a.name, a.value));
                s.textContent = n.textContent;
                n.parentNode.replaceChild(s, n);
              }
            } else {
              executeScripts(n);
            }
          }
        });
      } else {
        // Fallback: replace main element
        const curMain = document.querySelector('main');
        const newMain = doc.querySelector('main');
        if (curMain && newMain) {
          curMain.parentNode.replaceChild(newMain.cloneNode(true), curMain);
          executeScripts(document.querySelector('main'));
        }
      }

      // Update History
      if (push) {
        window.history.pushState({ path: targetUrl.pathname }, '', targetUrl.href);
      }

      // Scroll to top or anchor
      if (targetUrl.hash) {
        const el = document.querySelector(targetUrl.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Re-initialize modals & features
      if (window.initJananFeatures) {
        window.initJananFeatures();
      }

      // Dispatch navigation event
      window.dispatchEvent(new CustomEvent('janan:navigated', { detail: { url: targetUrl.href } }));

    } catch (err) {
      console.warn('[JananRouter] Fallback:', err);
      window.location.href = url;
    }
  }

  // Intercept all internal clicks in the CAPTURE PHASE
  // Capture phase guarantees interception before any child onclick or stopPropagation
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const a = e.target.closest('a');
    if (!a || !isNavigable(a)) return;

    const onclickAttr = a.getAttribute('onclick') || '';
    if (onclickAttr.includes('openJananChoiceModal') || onclickAttr.includes('openPaidConsultation') || onclickAttr.includes('return false;')) {
      return;
    }

    // Stop native hard navigation & browser favicon spinner
    e.preventDefault();
    navigate(a.href, true);
  }, true); // TRUE = CAPTURE PHASE

  // Browser Back / Forward buttons
  window.addEventListener('popstate', function () {
    navigate(window.location.href, false);
  });

  // Expose global router API
  window.JananRouter = {
    navigate: navigate,
    prefetch: prefetch
  };

  console.log('✓ JananRouter (React/Next.js Link Client-Side Navigation) Active');
})();
