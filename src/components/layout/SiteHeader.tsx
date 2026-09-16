import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { HeaderDesktopNav } from "@/components/layout/HeaderDesktopNav";
import { HeaderMobileMenu } from "@/components/layout/HeaderMobileMenu";
import { StickyHeaderShell } from "@/components/layout/StickyHeaderShell";
import { SiteLogo } from "@/components/shared/SiteLogo";
import {
  getHeaderNavigation,
  getHeaderPrimaryCta,
} from "@/lib/content/navigation";
import { getSiteContent } from "@/lib/content/site";

/**
 * Sticky public site header — redesigned Phase 10B (see docs/DECISIONS.md
 * "Visual Language Reset"). A light, uncluttered shell: logo, a 6-item
 * nav, and exactly one CTA — no phone number in this row (it moved to the
 * mobile menu's contact block, the footer, and the Contact page, per the
 * explicit brief; a crowded desktop row was one of the named defects).
 * Height ~80px (`h-20`), well short of "excessive."
 */
export async function SiteHeader() {
  const [navigation, primaryCta, site] = await Promise.all([
    getHeaderNavigation(),
    getHeaderPrimaryCta(),
    getSiteContent(),
  ]);

  return (
    <StickyHeaderShell>
      <Container
        variant="wide"
        className="flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6"
      >
        <Link
          href="/"
          className="focus-visible:ring-brand-blue shrink-0 rounded-md outline-none focus-visible:ring-2"
          aria-label={`${site.name} — home`}
        >
          <SiteLogo variant="compact" />
        </Link>

        <HeaderDesktopNav items={navigation} />

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            variant="accent"
            size="lg"
            className="hidden h-11 px-6 sm:inline-flex"
          >
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <HeaderMobileMenu
            items={navigation}
            primaryCta={primaryCta}
            contact={site.contact}
          />
        </div>
      </Container>
    </StickyHeaderShell>
  );
}
