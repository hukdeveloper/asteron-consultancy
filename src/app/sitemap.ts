import type { MetadataRoute } from "next";

import { getDestinations } from "@/lib/content/destinations";
import { getInsuranceServices } from "@/lib/content/insurance";
import { getResourceArticles } from "@/lib/content/resources";
import { getServices } from "@/lib/content/services";
import { env } from "@/lib/env";

/**
 * Generated entirely from local content — no hand-maintained URL list to
 * drift out of sync. Deliberately excludes:
 * - the four `/legal/*` pages (`LegalPage.isDraft === true` for all of
 *   them today — see docs/DECISIONS.md "Legal Draft Status"),
 * - the two scholarship detail pages (`Scholarship.isTemplate === true` —
 *   explicit content templates, not active scholarships), and
 * - the one sample event detail page (`Event.isSampleContent === true`).
 * Their hub pages (`/scholarships`, `/events`) remain included since they
 * are real, substantive pages in their own right. No `lastModified` is
 * set for a route unless the underlying content genuinely carries a
 * review date (`lastReviewed`) — never today's date used as a stand-in
 * for "this was checked," per docs/DECISIONS.md "Content Accuracy".
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, services, insuranceServices, resourceArticles] =
    await Promise.all([
      getDestinations(),
      getServices(),
      getInsuranceServices(),
      getResourceArticles(),
    ]);

  const staticPaths = [
    "/about",
    "/team",
    "/success-stories",
    "/resources",
    "/events",
    "/faq",
    "/contact",
    "/scholarships",
    "/services",
    "/insurance",
    "/insurance-quote",
    "/study-abroad",
    "/study-abroad/undergraduate",
    "/study-abroad/postgraduate",
    "/check-eligibility",
    "/book-consultation",
    "/universities",
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${env.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...staticPaths.map((path) => ({
      url: `${env.siteUrl}${path}`,
      changeFrequency: "monthly" as const,
    })),
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${env.siteUrl}/study-abroad/${d.slug}`,
    lastModified: d.lastReviewed,
    changeFrequency: "monthly",
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${env.siteUrl}/services/${s.slug}`,
    lastModified: s.lastReviewed,
    changeFrequency: "monthly",
  }));

  const insuranceRoutes: MetadataRoute.Sitemap = insuranceServices.map((i) => ({
    url: `${env.siteUrl}/insurance/${i.slug}`,
    lastModified: i.lastReviewed,
    changeFrequency: "monthly",
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resourceArticles.map((r) => ({
    url: `${env.siteUrl}/resources/${r.slug}`,
    lastModified: r.lastReviewed,
    changeFrequency: "yearly",
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...serviceRoutes,
    ...insuranceRoutes,
    ...resourceRoutes,
  ];
}
