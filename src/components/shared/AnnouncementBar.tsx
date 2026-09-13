import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getAnnouncement } from "@/lib/content/announcement";
import { Container } from "@/components/layout/Container";

/**
 * Sitewide announcement strip. Static (no dismiss state) by design: an
 * accessible dismiss control would need to persist across visits
 * (localStorage) to avoid re-appearing on every navigation, which is
 * unnecessary client complexity for a single, low-stakes message — see
 * docs/DECISIONS.md. Disable entirely via `siteConfig.announcementBarEnabled`,
 * or per-message via `AnnouncementContent.enabled` in src/content/announcement.ts.
 */
export async function AnnouncementBar() {
  if (!siteConfig.announcementBarEnabled) return null;

  const announcement = await getAnnouncement();
  if (!announcement.enabled) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-sm">
        <p>{announcement.message}</p>
        {announcement.linkHref && announcement.linkLabel ? (
          <Link
            href={announcement.linkHref}
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
          >
            {announcement.linkLabel}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        ) : null}
      </Container>
    </div>
  );
}
