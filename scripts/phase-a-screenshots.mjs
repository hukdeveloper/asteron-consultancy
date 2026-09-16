// One-off screenshot capture for the Phase A visual-reset review. Not a
// test — run manually against a running `next start` server on :3000.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = process.argv[2] || "screenshots-phase-a";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

async function shot(name, width, height, fn) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await fn(page);
  await context.close();
  console.log(`captured ${name}`);
}

// --- Desktop 1440 ---
await shot("desktop-1440-header-closed", 1440, 900, async (page) => {
  await page.screenshot({
    path: path.join(outDir, "desktop-1440-header-closed.png"),
  });
});

for (const label of [
  "Study Abroad",
  "Destinations",
  "Services",
  "Resources",
  "About",
]) {
  await shot(`desktop-1440-dropdown-${label}`, 1440, 900, async (page) => {
    const header = page.getByRole("banner");
    await header.getByRole("button", { name: label, exact: true }).click();
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(
        outDir,
        `desktop-1440-dropdown-${label.replace(/\s+/g, "-")}.png`,
      ),
    });
  });
}

await shot("desktop-1440-hero", 1440, 900, async (page) => {
  await page.screenshot({ path: path.join(outDir, "desktop-1440-hero.png") });
});

await shot("desktop-1440-middle", 1440, 900, async (page) => {
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight * 0.45),
  );
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, "desktop-1440-middle.png") });
});

await shot("desktop-1440-footer", 1440, 900, async (page) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, "desktop-1440-footer.png") });
});

await shot("desktop-1440-fullpage", 1440, 900, async (page) => {
  await page.screenshot({
    path: path.join(outDir, "desktop-1440-fullpage.png"),
    fullPage: true,
  });
});

// --- Mobile 375 ---
await shot("mobile-375-header-closed", 375, 812, async (page) => {
  await page.screenshot({
    path: path.join(outDir, "mobile-375-header-closed.png"),
  });
});

await shot("mobile-375-nav-open", 375, 812, async (page) => {
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, "mobile-375-nav-open.png") });
});

await shot("mobile-375-hero", 375, 812, async (page) => {
  await page.screenshot({ path: path.join(outDir, "mobile-375-hero.png") });
});

await shot("mobile-375-destinations", 375, 812, async (page) => {
  await page
    .getByRole("heading", { name: "Popular study destinations" })
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(outDir, "mobile-375-destinations.png"),
  });
});

await shot("mobile-375-services", 375, 812, async (page) => {
  await page
    .getByRole("heading", { name: "Main services" })
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, "mobile-375-services.png") });
});

await shot("mobile-375-footer", 375, 812, async (page) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, "mobile-375-footer.png") });
});

await shot("mobile-375-fullpage", 375, 812, async (page) => {
  await page.screenshot({
    path: path.join(outDir, "mobile-375-fullpage.png"),
    fullPage: true,
  });
});

await browser.close();
console.log("done");
