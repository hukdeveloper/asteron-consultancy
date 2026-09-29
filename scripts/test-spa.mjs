import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

function createServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl.endsWith('/')) cleanUrl += 'index.html';
    let filePath = path.join(path.resolve('site-live'), cleanUrl);

    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function testSpa() {
  const server = await createServer(3457);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3457/');
  await page.evaluate(() => { window.__spa_marker = 12345; });

  console.log('Initial page marker:', await page.evaluate(() => window.__spa_marker));

  // Click on Universities
  await page.click('nav.janan-desktop-nav a[href="/universities"]');
  await page.waitForTimeout(300);

  const marker = await page.evaluate(() => window.__spa_marker);
  const path = await page.evaluate(() => window.location.pathname);
  console.log('After clicking /universities -> Marker:', marker, 'Path:', path, 'Preserved without reload:', marker === 12345);

  // Click on Portugal
  await page.click('nav.janan-desktop-nav a[href="/study/portugal"]');
  await page.waitForTimeout(300);

  const marker2 = await page.evaluate(() => window.__spa_marker);
  const path2 = await page.evaluate(() => window.location.pathname);
  console.log('After clicking /study/portugal -> Marker:', marker2, 'Path:', path2, 'Preserved without reload:', marker2 === 12345);

  // Click Home
  await page.click('nav.janan-desktop-nav a[href="/"]');
  await page.waitForTimeout(300);

  const marker3 = await page.evaluate(() => window.__spa_marker);
  const path3 = await page.evaluate(() => window.location.pathname);
  console.log('After clicking Home -> Marker:', marker3, 'Path:', path3, 'Preserved without reload:', marker3 === 12345);

  await browser.close();
  server.close();
}

testSpa().catch(console.error);
