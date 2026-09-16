import { env } from "@/lib/env";
import type { ContactInfo } from "@/types/content";

/**
 * Safely serializes a JSON-LD object for embedding inside a `<script
 * type="application/ld+json">` tag. `JSON.stringify` alone is not safe to
 * interpolate into HTML: a string field containing `</script>` would
 * terminate the script element early, and `<!--`/`-->`/`<` sequences have
 * their own HTML-parsing quirks inside a script body. Escaping every `<`
 * as `<` (valid inside a JSON string, invisible to JSON.parse, and
 * never itself starts a tag) neutralizes all of these — the standard
 * mitigation recommended for embedding JSON in HTML. Every JSON-LD
 * `<script>` in this codebase must go through this function (or the
 * `JsonLd` component, which already does) rather than calling
 * `JSON.stringify` directly.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Builds the site-wide schema.org Organization + WebSite JSON-LD, rendered once in the root layout. Only real, verifiable fields — no fabricated address, rating, founding date, or social profiles. */
export function buildOrganizationJsonLd(options: {
  name: string;
  description: string;
  contact: ContactInfo;
}) {
  const { name, description, contact } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: env.siteUrl,
    email: contact.email,
    telephone: contact.phone,
  };
}

export function buildWebSiteJsonLd(options: { name: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name,
    url: env.siteUrl,
  };
}

export interface BreadcrumbTrailItem {
  label: string;
  /** Site-relative path, e.g. "/study-abroad". Omit for the current (last) page. */
  path?: string;
}

/** Builds schema.org BreadcrumbList JSON-LD matching a visible Breadcrumbs trail exactly. */
export function buildBreadcrumbListJsonLd(items: BreadcrumbTrailItem[]) {
  const trail: BreadcrumbTrailItem[] = [{ label: "Home", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.path ? { item: `${env.siteUrl}${item.path}` } : {}),
    })),
  };
}

/** Builds schema.org FAQPage JSON-LD — only use when it exactly matches the visible FAQ content on the page. */
export function buildFaqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
