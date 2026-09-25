import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('site-live/assets/index-CrB-hXUe.js', 'utf8');

// Binary search or find prefix that parses
const qEStart = code.indexOf('function qE(){');
const qEEnd = code.indexOf('const Uy=', qEStart);

console.log('qE block:');
const qECode = code.substring(qEStart, qEEnd);
console.log('Length:', qECode.length);

try {
  new vm.Script('let X, jE;\n' + qECode);
  console.log('qECode itself is valid!');
} catch (e) {
  console.log('Error inside qECode:', e.message);
  console.log(e.stack);
}
