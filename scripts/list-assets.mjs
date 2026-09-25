import fs from 'fs';

async function listAssets() {
  const routes = JSON.parse(fs.readFileSync('scripts/routes-studyabroadguide.json', 'utf8'));
  const assetSet = new Set();

  for (const r of routes) {
    try {
      const res = await fetch('https://jananconsultancy-studyabroadguide.netlify.app' + r);
      const text = await res.text();
      const matches = [...text.matchAll(/(\/assets\/[^"'\s>]+)/g)].map(m => m[1]);
      matches.forEach(a => assetSet.add(a));
    } catch (e) {
      console.error(r, e.message);
    }
  }

  console.log('Total unique assets:', assetSet.size);
  const arr = Array.from(assetSet).sort();
  fs.writeFileSync('scripts/assets-studyabroadguide.json', JSON.stringify(arr, null, 2));
  console.log(arr);
}

listAssets();
