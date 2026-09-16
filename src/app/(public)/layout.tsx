import type { ReactNode } from "react";

import { MAIN_CONTENT_ID } from "@/components/shared/SkipLink";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { MobileQuickActions } from "@/components/shared/MobileQuickActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * Shell for every public marketing page: announcement bar, header, the
 * page's own content inside the single <main> landmark, footer, and the
 * mobile-only quick-actions bar. The root layout (src/app/layout.tsx)
 * intentionally does not render its own <main> so this is the only one on
 * any public page — a future route group with a different shell (e.g. a
 * standalone campaign landing page) can define its own <main> without
 * conflicting with this one or duplicating this file's shell logic.
 *
 * The fixed mobile MobileQuickActions bar sits below the *footer*, not
 * <main> — the footer always renders as the last thing on every page, so
 * the safe-area bottom padding that keeps content clear of that bar lives
 * on SiteFooter itself (see its `pb-16 md:pb-0` on the closing legal row).
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileQuickActions />
    </div>
  );
}
