import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { MAIN_CONTENT_ID } from "@/components/shared/SkipLink";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { MobileQuickActions } from "@/components/shared/MobileQuickActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/utils";

/**
 * Shell for every public marketing page: announcement bar, header, the
 * page's own content inside the single <main> landmark, footer, and the
 * mobile-only quick-actions bar. The root layout (src/app/layout.tsx)
 * intentionally does not render its own <main> so this is the only one on
 * any public page — a future route group with a different shell (e.g. a
 * standalone campaign landing page) can define its own <main> without
 * conflicting with this one or duplicating this file's shell logic.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <main
        id={MAIN_CONTENT_ID}
        className={cn(
          "flex-1",
          siteConfig.mobileQuickActionsEnabled && "pb-16 md:pb-0",
        )}
      >
        {children}
      </main>
      <SiteFooter />
      <MobileQuickActions />
    </div>
  );
}
