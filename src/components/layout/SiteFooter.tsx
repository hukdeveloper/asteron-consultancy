import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { getFooterLinkGroups, getLegalLinks } from "@/lib/content/navigation";
import { getSiteContent } from "@/lib/content/site";
import { getSocialLinks } from "@/lib/content/social-links";

const platformInitials: Record<string, string> = {
  facebook: "Fb",
  instagram: "Ig",
  linkedin: "In",
  youtube: "Yt",
  twitter: "X",
};

/**
 * Public site footer: brand summary, data-driven link groups, contact
 * details, social links, legal links, copyright, and disclaimer. See
 * src/content/navigation.ts and src/content/social-links.ts for the
 * underlying content.
 */
export async function SiteFooter() {
  const [linkGroups, legalLinks, site, socialLinks] = await Promise.all([
    getFooterLinkGroups(),
    getLegalLinks(),
    getSiteContent(),
    getSocialLinks(),
  ]);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="max-w-xs space-y-4">
          <Link href="/" className="inline-block">
            <SiteLogo variant="full" />
          </Link>
          <p className="text-primary-foreground/75 text-sm">
            Asteron Global Consultancy provides guidance for international
            education, admissions preparation, student visa documentation,
            insurance enquiries and pre-departure planning.
          </p>
          <ul className="flex gap-2" aria-label="Social media links">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={
                    social.disabled
                      ? `${social.label} (coming soon)`
                      : social.label
                  }
                  aria-disabled={social.disabled}
                  className="text-primary-foreground/70 hover:text-primary-foreground flex size-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold transition-colors hover:border-white/40 aria-disabled:pointer-events-none aria-disabled:opacity-50"
                >
                  {platformInitials[social.platform]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {linkGroups.map((group) => (
          <nav key={group.id} aria-label={group.heading}>
            <h2 className="text-primary-foreground text-sm font-semibold tracking-wide uppercase">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/75 hover:text-primary-foreground text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-primary-foreground text-sm font-semibold tracking-wide uppercase">
            Contact
          </h2>
          <ul className="text-primary-foreground/75 mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${site.contact.phone}`}
                className="hover:text-primary-foreground inline-flex items-center gap-2 hover:underline"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-primary-foreground inline-flex items-center gap-2 hover:underline"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>{site.contact.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="text-primary-foreground/65 flex flex-col gap-4 py-6 text-xs">
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
          <p>
            This website provides general guidance only. Admission and visa
            decisions are made solely by the relevant institutions and
            government authorities. Where insurance products are introduced,
            they may be provided by third-party insurers. No outcome is
            guaranteed.
          </p>
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
