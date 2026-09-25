import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('site-live');
const outDir = path.resolve('out');

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
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying static site to out directory...');
copyRecursive(srcDir, outDir);

// Ensure .htaccess exists for Hostinger / Apache hosting
const htaccessPath = path.join(outDir, '.htaccess');
const htaccessContent = `
# Apache / Hostinger configuration for Janan Consultancy
Options -MultiViews
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle trailing slash and directory index
DirectoryIndex index.html

# Fallback clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L]

# Security Headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

fs.writeFileSync(htaccessPath, htaccessContent.trim() + '\n', 'utf8');

console.log('Static build complete! The out/ directory is ready for deployment to Hostinger or Netlify.');
