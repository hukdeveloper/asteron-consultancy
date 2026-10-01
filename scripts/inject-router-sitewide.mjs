import fs from 'fs';

const glob = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const full = dir + '/' + file.name;
    if (file.isDirectory()) {
      if (!['node_modules', '.git', 'out'].includes(file.name)) results = results.concat(glob(full));
    } else if (file.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
};

const allFiles = glob('site-live');
let patched = 0;

for (const filePath of allFiles) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Inject janan-custom.css if missing
  if (!html.includes('janan-custom.css') && html.includes('</head>')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/assets/janan-custom.css" />\n</head>');
    changed = true;
  }

  // 2. Inject janan-router.js if missing
  if (!html.includes('janan-router.js') && html.includes('</head>')) {
    html = html.replace('</head>', '<script src="/assets/janan-router.js"></script>\n</head>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    patched++;
  }
}

console.log(`✓ Injected stylesheets & router into ${patched} HTML files sitewide!`);
