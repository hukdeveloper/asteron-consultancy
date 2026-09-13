/**
 * Site-level feature configuration — structural on/off switches, distinct
 * from marketing content (src/content/site.ts) and environment variables
 * (src/lib/env.ts).
 */
export const siteConfig = {
  /**
   * Set to false to hide the announcement bar everywhere without deleting
   * its content (src/content/announcement.ts).
   */
  announcementBarEnabled: true,
  /**
   * Set to false to hide the mobile-only quick-actions bar (Call/WhatsApp/
   * Book Consultation). See src/components/shared/MobileQuickActions.tsx.
   */
  mobileQuickActionsEnabled: true,
} as const;
