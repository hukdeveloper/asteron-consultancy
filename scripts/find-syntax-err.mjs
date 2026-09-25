import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('site-live/assets/index-CrB-hXUe.js', 'utf8');
try {
  new vm.Script(code);
  console.log('Script is 100% valid!');
} catch (e) {
  console.log('Error message:', e.message);
  console.log('Stack:', e.stack);
}
