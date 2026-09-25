import fs from 'fs';

const code = fs.readFileSync('site-live/assets/index-CrB-hXUe.js', 'utf8');
const idx = code.indexOf('function qE()');
console.log('--- START PART ---');
console.log(code.substring(idx - 100, idx + 100));

const endIdx = code.indexOf('const Uy=', idx);
console.log('--- END PART ---', endIdx);
if (endIdx !== -1) {
  console.log(code.substring(endIdx - 100, endIdx + 50));
} else {
  console.log('const Uy= not found, searching const Uy');
  const endIdx2 = code.indexOf('Uy', idx);
  console.log(code.substring(endIdx2 - 100, endIdx2 + 50));
}
