import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { HeaderDesktopNav } from "@/components/layout/HeaderDesktopNav";
import { HeaderMobileMenu } from "@/components/layout/HeaderMobileMenu";
import { SiteLogo } from "@/components/shared/SiteLogo";
import {
  getHeaderNavigation,
  getHeaderPrimaryCta,
} from "@/lib/content/navigation";
import { getSiteContent } from "@/lib/content/site";

/**
 * Sticky public site header: logo, desktop nav with dropdowns, primary
 * CTA, and a mobile menu trigger. Navy background per
 * docs/DESIGN_SYSTEM.md §2 ("navigation background"), so it stays
 * readable regardless of the page content that scrolls beneath it.
 */
export async function SiteHeader() {
  const [navigation, primaryCta, site] = await Promise.all([
    getHeaderNavigation(),
    getHeaderPrimaryCta(),
    getSiteContent(),
  ]);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-white/10">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={`${site.name} — home`}
        >
          <SiteLogo variant="compact" />
        </Link>

        <HeaderDesktopNav items={navigation} />

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" className="hidden sm:inline-flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <HeaderMobileMenu
            items={navigation}
            primaryCta={primaryCta}
            contact={site.contact}
          />
        </div>
      </Container>
    </header>
  );
}
