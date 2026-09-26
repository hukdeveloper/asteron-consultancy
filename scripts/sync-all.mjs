import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('site-live');
const rootDir = path.resolve('.');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (err) {
        try {
          fs.writeFileSync(destPath, fs.readFileSync(srcPath));
        } catch (innerErr) {
          console.warn(`Warning copying ${srcPath} -> ${destPath}:`, innerErr.message);
        }
      }
    }
  }
}

console.log('Copying site-live to root and out...');
copyRecursive(srcDir, rootDir);
copyRecursive(srcDir, path.resolve('out'));
console.log('Done!');
