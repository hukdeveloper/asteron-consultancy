import type { DestinationSummary } from "@/types/content";

/**
 * Minimal destination records — enough to drive navigation and generate a
 * "coming soon" static page per destination (src/app/(public)/study-abroad/[destination]).
 * Full destination content (climate, cost of living, universities, etc. —
 * see docs/CONTENT_MODEL.md §3) is out of scope until Phase 3.
 */
export const destinations: DestinationSummary[] = [
  {
    id: "uk",
    slug: "united-kingdom",
    name: "United Kingdom",
    status: "published",
  },
  { id: "au", slug: "australia", name: "Australia", status: "published" },
  { id: "ca", slug: "canada", name: "Canada", status: "published" },
  {
    id: "us",
    slug: "united-states",
    name: "United States",
    status: "published",
  },
  { id: "de", slug: "germany", name: "Germany", status: "published" },
  { id: "ie", slug: "ireland", name: "Ireland", status: "published" },
];
