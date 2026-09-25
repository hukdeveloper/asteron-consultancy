import fs from 'fs';
import path from 'path';

function cleanHydration(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += cleanHydration(full);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      const original = content;

      // Remove TSR barrier
      content = content.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">[\s\S]*?<\/script>/g, '');
      // Remove TanStack start scroll restoration script
      content = content.replace(/<script>\(function\(t\)\{let s;[\s\S]*?<\/script>/g, '');
      // Remove index-CrB-hXUe.js import
      content = content.replace(/<script type="module" async=""?>import\("\/assets\/index-CrB-hXUe\.js"\)<\/script>/g, '');
      // Remove modulepreloads
      content = content.replace(/<link rel="modulepreload"[^>]*\/>/g, '');

      // Ensure janan-features.js is loaded
      if (!content.includes('/assets/janan-features.js')) {
        content = content.replace('</body>', '<script src="/assets/janan-features.js" defer></script></body>');
      }

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        count++;
      }
    }
  }
  return count;
}

const cleaned = cleanHydration('site-live');
console.log(`Cleaned hydration from ${cleaned} HTML files in site-live!`);
