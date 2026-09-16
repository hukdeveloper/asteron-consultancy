import { test, expect } from "@playwright/test";

/**
 * Site-wide internal-link crawl (Phase 9 release review). Visits every
 * real route (static pages + one example of each dynamic template +
 * legal pages, which the sitemap deliberately excludes — see
 * src/app/sitemap.ts — but which are still real, linked pages) and
 * collects every same-origin `<a href="/...">` on each page, then
 * requests each discovered URL once and asserts it resolves with a
 * non-404 status. Also asserts that no `href="#"` appears without
 * `aria-disabled="true"` (the only sanctioned use of a literal `#` href
 * in this codebase — the footer's placeholder social links).
 */
const SEED_PAGES = [
  "/",
  "/about",
  "/team",
  "/study-abroad",
  "/study-abroad/undergraduate",
  "/study-abroad/postgraduate",
  "/study-abroad/united-kingdom",
  "/services",
  "/services/visa-guidance",
  "/insurance",
  "/insurance/student-health-insurance",
  "/insurance-quote",
  "/resources",
  "/resources/how-to-choose-the-right-study-destination",
  "/events",
  "/events/study-abroad-planning-session",
  "/faq",
  "/contact",
  "/scholarships",
  "/scholarships/template-destination-based-scholarship",
  "/success-stories",
  "/check-eligibility",
  "/book-consultation",
  "/universities",
  "/legal/privacy-policy",
  "/legal/terms-of-service",
  "/legal/cookie-policy",
  "/legal/disclaimer",
];

test("no internal link points at a missing route, and every literal '#' href is properly disabled", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const discoveredInternalHrefs = new Set<string>();
  const badHashLinks: string[] = [];

  for (const seedPath of SEED_PAGES) {
    const response = await page.goto(seedPath);
    expect(response?.status(), `${seedPath} failed to load`).toBe(200);

    const anchors = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a[href]")).map((a) => ({
        href: a.getAttribute("href") ?? "",
        ariaDisabled: a.getAttribute("aria-disabled"),
      }));
    });

    for (const { href, ariaDisabled } of anchors) {
      if (href === "#") {
        if (ariaDisabled !== "true") {
          badHashLinks.push(
            `${seedPath} -> an <a href="#"> without aria-disabled="true"`,
          );
        }
        continue;
      }
      if (href.startsWith("/") && !href.startsWith("//")) {
        discoveredInternalHrefs.add(href.split("#")[0].split("?")[0]);
      }
    }
  }

  expect(badHashLinks, badHashLinks.join("\n")).toEqual([]);

  const broken: string[] = [];
  for (const href of discoveredInternalHrefs) {
    if (href === "") continue;
    const res = await request.get(href);
    if (res.status() === 404) {
      broken.push(`${href} -> 404`);
    }
  }

  expect(broken, broken.join("\n")).toEqual([]);
});
