import type { AnnouncementContent } from "@/types/content";

/**
 * Sitewide announcement bar content. Set `enabled: false` to hide the bar
 * everywhere without deleting this record — see src/lib/content/announcement.ts.
 */
export const announcement: AnnouncementContent = {
  id: "intake-2026",
  message:
    "Applications are now being reviewed for upcoming international study intakes.",
  linkLabel: "Explore your options",
  linkHref: "/study-abroad",
  enabled: true,
};
