import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { siteConfig } from "@/config/site";
import { getFooterLinkGroups, getLegalLinks } from "@/lib/content/navigation";
import { getSiteContent } from "@/lib/content/site";
import { getSocialLinks } from "@/lib/content/social-links";
import { cn } from "@/lib/utils";

/**
 * Public site footer — redesigned Phase 10B (see docs/DECISIONS.md "Visual
 * Language Reset"). A compact, three-row closing experience: a top CTA
 * row, a five-column main grid (Brand / Study / Services / Company /
 * Contact — each link group exactly 6 items, one column, no internal
 * sub-grid), and a short bottom legal row. The earlier Phase 10 footer
 * (12-14 links per group in a two-column sub-grid, a long disclaimer
 * paragraph, and placeholder "Fb/Ig/In/Yt" social circles) was rejected as
 * "too tall," "too much text," and reproducing the full sitemap rather
 * than guiding the visitor — this version is deliberately smaller.
 */
export async function SiteFooter() {
  const [linkGroups, legalLinks, site, socialLinks] = await Promise.all([
    getFooterLinkGroups(),
    getLegalLinks(),
    getSiteContent(),
    getSocialLinks(),
  ]);

  const year = new Date().getFullYear();
  // Placeholder social URLs ("#", disabled) are hidden entirely rather than
  // shown as meaningless circles — see docs/PRODUCTION_CONTENT_CHECKLIST.md.
  const realSocialLinks = socialLinks.filter((social) => !social.disabled);

  return (
    <footer className="bg-brand-ink text-primary-foreground">
      <div className="border-b border-white/10">
        <Container
          variant="wide"
          className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center"
        >
          <p className="text-base font-medium sm:text-lg">
            Ready to plan your next step?
          </p>
          <Button asChild variant="accent" size="lg" className="h-11 px-6">
            <Link href="/book-consultation">Book a Consultation</Link>
          </Button>
        </Container>
      </div>

      <Container
        variant="wide"
        className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block">
            <SiteLogo variant="full" />
          </Link>
          <p className="text-primary-foreground/65 max-w-xs text-sm leading-relaxed">
            Guidance for international education, visas, scholarships and
            pre-departure planning — one consultancy, every step.
          </p>
          {realSocialLinks.length > 0 ? (
            <ul className="flex gap-2" aria-label="Social media links">
              {realSocialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="text-primary-foreground/70 hover:bg-brand-blue hover:text-white flex size-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-transparent"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {linkGroups.map((group) => (
          <nav key={group.id} aria-label={group.heading}>
            <h2 className="text-sm font-semibold">{group.heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/65 hover:text-primary-foreground text-sm whitespace-nowrap hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="text-primary-foreground/65 mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${site.contact.phone}`}
                className="hover:text-primary-foreground inline-flex items-center gap-2 hover:underline"
              >
                <Phone aria-hidden="true" className="size-3.5 shrink-0" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary-foreground inline-flex items-center gap-2 hover:underline"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-primary-foreground inline-flex items-start gap-2 break-all hover:underline"
              >
                <Mail aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {site.contact.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          variant="wide"
          className={cn(
            "text-primary-foreground/55 flex flex-col gap-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between",
            // The fixed mobile MobileQuickActions bar sits below the footer —
            // this keeps the last legal row (which can wrap to two lines)
            // clear of it instead of being partly hidden underneath.
            siteConfig.mobileQuickActionsEnabled && "pb-20 md:py-5",
          )}
        >
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>Information only. No outcome is guaranteed.</p>
        </Container>
      </div>
    </footer>
  );
}
