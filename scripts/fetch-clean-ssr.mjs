import fs from 'fs';
import path from 'path';

const routes = JSON.parse(fs.readFileSync('scripts/routes-studyabroadguide.json', 'utf8'));

async function fetchClean() {
  console.log(`Fetching clean SSR HTML for ${routes.length} routes...`);

  for (const r of routes) {
    try {
      const res = await fetch('https://jananconsultancy-studyabroadguide.netlify.app' + r);
      if (!res.ok) {
        console.error('Failed to fetch', r, res.status);
        continue;
      }
      let html = await res.text();

      // Only clean the netlify agent runner tracker script at the very end
      html = html.replace(/<script async src="\/\.netlify\/scripts\/ar"[^>]*><\/script>/g, '');

      // Ensure janan-features.js is loaded at the end of body
      if (!html.includes('/assets/janan-features.js')) {
        html = html.replace('</body>', '<script src="/assets/janan-features.js" defer></script>\n</body>');
      }

      // Write to site-live directory
      let relPath = r === '/' ? 'index.html' : r.replace(/^\//, '') + '/index.html';
      const destPath = path.join('site-live', relPath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, html, 'utf8');

      // Also flat html
      if (r !== '/') {
        const flatPath = path.join('site-live', r.replace(/^\//, '') + '.html');
        fs.mkdirSync(path.dirname(flatPath), { recursive: true });
        fs.writeFileSync(flatPath, html, 'utf8');
      }

      console.log('Clean saved:', r);
    } catch (e) {
      console.error('Error on', r, e.message);
    }
  }

  console.log('All routes saved cleanly!');
}

fetchClean();
