import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = "screenshots-review";
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();

for (const [name, w, h] of [
  ["desktop", 1440, 900],
  ["mobile", 375, 812],
]) {
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, `final-${name}-hero.png`) });
  await context.close();
}

// Footer with new icons
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, "final-footer.png") });
  await context.close();
}

await browser.close();
console.log("done");
