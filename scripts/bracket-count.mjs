import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('site-live/assets/index-CrB-hXUe.js', 'utf8');
const qEStart = code.indexOf('function qE(){');
const qEEnd = code.indexOf('const Uy=', qEStart);
const qECode = code.substring(qEStart, qEEnd);

// Let's inspect the end of qECode
console.log('End of qECode (last 100 chars):');
console.log(qECode.slice(-100));

// Count brackets in qECode:
let braces = 0, brackets = 0, parens = 0;
for (let i = 0; i < qECode.length; i++) {
  const ch = qECode[i];
  if (ch === '{') braces++;
  else if (ch === '}') braces--;
  else if (ch === '[') brackets++;
  else if (ch === ']') brackets--;
  else if (ch === '(') parens++;
  else if (ch === ')') parens--;
  if (braces < 0 || brackets < 0 || parens < 0) {
    console.log(`Mismatch at index ${i}, char: ${ch}`);
    console.log(`Context: ${qECode.substring(i - 30, i + 30)}`);
    break;
  }
}
console.log('Final counts: braces =', braces, 'brackets =', brackets, 'parens =', parens);
