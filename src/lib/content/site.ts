import { siteContent } from "@/content/site";
import type { SiteContent } from "@/types/content";

/**
 * Content-access layer for site-wide settings.
 *
 * Pages and components should import this function, not src/content/site.ts
 * directly. It currently returns local typed content synchronously wrapped
 * in a promise; a future phase can replace the implementation with a
 * Strapi API call without changing this signature or any call site.
 */
export async function getSiteContent(): Promise<SiteContent> {
  return siteContent;
}
