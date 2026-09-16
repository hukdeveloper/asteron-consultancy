// Manual visual-QA screenshot capture (added Phase 10 redesign). Not part
// of the automated test suite (`npm test` / `npm run test:e2e`) — this is
// a standalone tool for capturing full-page screenshots across a set of
// representative breakpoints/pages for human before/after design review.
//
// Usage: build and start the app first, then run this against it:
//   npm run build && npm run start &
//   node scripts/visual-qa-screenshot.mjs <output-dir> [baseURL]
//
// Prints any horizontal overflow found at each breakpoint/page so a
// regression is visible without opening every screenshot.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = process.argv[2] || "screenshots";
const baseURL = process.argv[3] || "http://localhost:3000";

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "375x812", width: 375, height: 812 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "study-abroad", path: "/study-abroad" },
  { name: "destination-uk", path: "/study-abroad/united-kingdom" },
  { name: "services", path: "/services" },
  { name: "insurance", path: "/insurance" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

const browser = await chromium.launch();
let anyOverflow = false;

for (const vp of VIEWPORTS) {
  const dir = path.join(outDir, vp.name);
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await context.newPage();
  for (const p of PAGES) {
    await page.goto(`${baseURL}${p.path}`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(dir, `${p.name}.png`),
      fullPage: true,
    });
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    if (overflow > 0) {
      anyOverflow = true;
      console.log(`OVERFLOW ${overflow}px at ${vp.name} on ${p.path}`);
    }
    console.log(`captured ${vp.name}/${p.name}.png (overflow: ${overflow})`);
  }
  await context.close();
}

await browser.close();
console.log(
  anyOverflow ? "FAIL: overflow detected" : "PASS: no overflow anywhere",
);
