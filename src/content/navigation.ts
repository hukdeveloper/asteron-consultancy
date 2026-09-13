import { destinations } from "@/content/destinations";
import { services } from "@/content/services";
import type { FooterLinkGroup, NavItem, NavLink } from "@/types/content";

/**
 * Header navigation. Destinations/Services dropdown children are derived
 * from src/content/{destinations,services}.ts rather than duplicated here,
 * so adding a destination/service automatically updates the header.
 *
 * Every href below points at its eventual planned route (per
 * docs/SITEMAP.md) even though most of those routes currently render a
 * temporary "coming soon" page — see src/components/shared/ComingSoon.tsx.
 */
export const headerNavigation: NavItem[] = [
  {
    id: "study-abroad",
    label: "Study Abroad",
    href: "/study-abroad",
    children: [
      {
        id: "study-abroad-overview",
        label: "Study Abroad Overview",
        href: "/study-abroad",
      },
      {
        id: "study-abroad-undergraduate",
        label: "Undergraduate",
        href: "/study-abroad",
      },
      {
        id: "study-abroad-postgraduate",
        label: "Postgraduate",
        href: "/study-abroad",
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
    id: "universities",
    label: "Universities",
    href: "/universities",
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: [
      { id: "services-all", label: "All Services", href: "/services" },
      ...services.map((service) => ({
        id: `service-${service.id}`,
        label: service.title,
        href: `/services/${service.slug}`,
      })),
    ],
  },
  {
    id: "scholarships",
    label: "Scholarships",
    href: "/scholarships",
  },
  {
    id: "insurance",
    label: "Insurance",
    href: "/insurance",
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
      { id: "resources-events", label: "Events and Webinars", href: "/events" },
      { id: "resources-faqs", label: "FAQs", href: "/resources/faqs" },
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
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export const headerPrimaryCta: { label: string; href: string } = {
  label: "Book Free Consultation",
  href: "/book-consultation",
};

/** Footer link groups — deliberately smaller than the full header, per docs/SITEMAP.md §4. */
export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: "footer-group-study-abroad",
    heading: "Study Abroad",
    links: [
      {
        id: "footer-study-abroad",
        label: "Study Abroad",
        href: "/study-abroad",
      },
      {
        id: "footer-universities",
        label: "Universities",
        href: "/universities",
      },
      {
        id: "footer-scholarships",
        label: "Scholarships",
        href: "/scholarships",
      },
    ],
  },
  {
    id: "footer-group-services",
    heading: "Services",
    links: [
      { id: "footer-services", label: "Services Overview", href: "/services" },
      { id: "footer-insurance", label: "Insurance", href: "/insurance" },
    ],
  },
  {
    id: "footer-group-company",
    heading: "Company",
    links: [
      { id: "footer-about", label: "About", href: "/about" },
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
  {
    id: "footer-group-get-started",
    heading: "Get Started",
    links: [
      {
        id: "footer-book-consultation",
        label: "Book a Consultation",
        href: "/book-consultation",
      },
      {
        id: "footer-check-eligibility",
        label: "Check Eligibility",
        href: "/check-eligibility",
      },
      {
        id: "footer-insurance-quote",
        label: "Insurance Quote",
        href: "/insurance-quote",
      },
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
