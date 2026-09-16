import { destinations } from "@/content/destinations";
import type { FooterLinkGroup, NavItem, NavLink } from "@/types/content";

/**
 * Header navigation (reduced to 6 top-level items — redesigned Phase 10B,
 * see docs/DECISIONS.md "Visual Language Reset"). Universities, Scholarships,
 * and Insurance are no longer standalone top-level items — they live inside
 * the Study Abroad / Services dropdowns instead, so the primary row never
 * exceeds 6 items. The Services dropdown is a deliberately curated subset
 * (6 items), not every `Service` record — see `footerLinkGroups` below or
 * `/services` itself for the complete list. Destinations' dropdown is still
 * derived from `src/content/destinations.ts` so a new destination is picked
 * up automatically.
 *
 * Active-state matching does NOT use simple href-prefix matching (a
 * `/study-abroad/united-kingdom` URL is prefixed by `/study-abroad` but
 * must activate "Destinations", not "Study Abroad") — see
 * `getActiveNavGroupId()` in `src/lib/navigation-active.ts` for the
 * authoritative route-ownership mapping every nav item's active state is
 * derived from.
 */
export const headerNavigation: NavItem[] = [
  {
    id: "study-abroad",
    label: "Study Abroad",
    href: "/study-abroad",
    children: [
      {
        id: "study-abroad-overview",
        label: "Overview",
        href: "/study-abroad",
      },
      {
        id: "study-abroad-undergraduate",
        label: "Undergraduate",
        href: "/study-abroad/undergraduate",
      },
      {
        id: "study-abroad-postgraduate",
        label: "Postgraduate",
        href: "/study-abroad/postgraduate",
      },
      {
        id: "study-abroad-universities",
        label: "Universities",
        href: "/universities",
      },
      {
        id: "study-abroad-scholarships",
        label: "Scholarships",
        href: "/scholarships",
      },
      {
        id: "study-abroad-eligibility",
        label: "Check Eligibility",
        href: "/check-eligibility",
      },
    ],
  },
  {
    id: "destinations",
    label: "Destinations",
    href: "/study-abroad",
    children: [
      {
        id: "destinations-all",
        label: "View All Destinations",
        href: "/study-abroad",
      },
      ...destinations.map((destination) => ({
        id: `destination-${destination.id}`,
        label: destination.name,
        href: `/study-abroad/${destination.slug}`,
      })),
    ],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: [
      { id: "services-all", label: "All Services", href: "/services" },
      {
        id: "services-application-assistance",
        label: "Application Assistance",
        href: "/services/application-assistance",
      },
      {
        id: "services-visa-guidance",
        label: "Visa Guidance",
        href: "/services/visa-guidance",
      },
      { id: "services-insurance", label: "Insurance", href: "/insurance" },
      {
        id: "services-accommodation",
        label: "Accommodation",
        href: "/services/accommodation-support",
      },
      {
        id: "services-pre-departure",
        label: "Pre-departure Guidance",
        href: "/services/pre-departure-guidance",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    children: [
      {
        id: "resources-articles",
        label: "Articles and Guides",
        href: "/resources",
      },
      { id: "resources-events", label: "Events", href: "/events" },
      { id: "resources-faq", label: "FAQs", href: "/faq" },
      {
        id: "resources-success-stories",
        label: "Success Stories",
        href: "/success-stories",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    children: [
      { id: "about-overview", label: "About Overview", href: "/about" },
      { id: "about-team", label: "Our Team", href: "/team" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export const headerPrimaryCta: { label: string; href: string } = {
  label: "Book a Consultation",
  href: "/book-consultation",
};

/**
 * Footer link groups — redesigned Phase 10B (see docs/DECISIONS.md "Visual
 * Language Reset"). Deliberately a **curated, fixed 6-link list per
 * group**, not a full derivation from every destination/service/insurance
 * record: the earlier Phase 10 footer listed every destination and every
 * service (12-14 links per group, two internal sub-columns) and was
 * rejected as "too tall," "too much text," and "a footer should guide
 * users, not reproduce the complete sitemap." The full destination/service
 * list remains reachable from `/study-abroad` and `/services` themselves,
 * and from the header's own dropdowns — the footer no longer needs to
 * duplicate it.
 */
export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: "footer-group-study",
    heading: "Study",
    links: [
      {
        id: "footer-study-abroad",
        label: "Study Abroad",
        href: "/study-abroad",
      },
      {
        id: "footer-study-undergraduate",
        label: "Undergraduate",
        href: "/study-abroad/undergraduate",
      },
      {
        id: "footer-study-postgraduate",
        label: "Postgraduate",
        href: "/study-abroad/postgraduate",
      },
      {
        id: "footer-study-destinations",
        label: "Destinations",
        href: "/study-abroad#destinations",
      },
      {
        id: "footer-study-scholarships",
        label: "Scholarships",
        href: "/scholarships",
      },
      {
        id: "footer-study-eligibility",
        label: "Check Eligibility",
        href: "/check-eligibility",
      },
    ],
  },
  {
    id: "footer-group-services",
    heading: "Services",
    links: [
      { id: "footer-services-all", label: "All Services", href: "/services" },
      {
        id: "footer-services-application",
        label: "Application Assistance",
        href: "/services/application-assistance",
      },
      {
        id: "footer-services-visa",
        label: "Visa Guidance",
        href: "/services/visa-guidance",
      },
      {
        id: "footer-services-insurance",
        label: "Insurance",
        href: "/insurance",
      },
      {
        id: "footer-services-accommodation",
        label: "Accommodation",
        href: "/services/accommodation-support",
      },
      {
        id: "footer-services-pre-departure",
        label: "Pre-departure",
        href: "/services/pre-departure-guidance",
      },
    ],
  },
  {
    id: "footer-group-company",
    heading: "Company",
    links: [
      { id: "footer-about", label: "About", href: "/about" },
      { id: "footer-team", label: "Team", href: "/team" },
      {
        id: "footer-success-stories",
        label: "Success Stories",
        href: "/success-stories",
      },
      { id: "footer-resources", label: "Resources", href: "/resources" },
      { id: "footer-events", label: "Events", href: "/events" },
      { id: "footer-contact", label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  {
    id: "legal-privacy",
    label: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
  {
    id: "legal-terms",
    label: "Terms and Conditions",
    href: "/legal/terms-of-service",
  },
  { id: "legal-cookies", label: "Cookie Policy", href: "/legal/cookie-policy" },
  { id: "legal-disclaimer", label: "Disclaimer", href: "/legal/disclaimer" },
];
