/**
 * Shared typing for the local, file-based content layer (src/content,
 * accessed via src/lib/content).
 *
 * These shapes intentionally mirror the entities documented in
 * docs/CONTENT_MODEL.md (the target Strapi CMS content model for a later
 * phase) so that swapping a local content-access function for a Strapi API
 * call later doesn't require changing anything that consumes it. Records
 * that will eventually map to a Strapi content type carry a stable `id`
 * and `slug` now, even while nothing "publishes" them but a pull request.
 */

export type PublicationStatus = "draft" | "published";

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContactInfo {
  /** E.164-ish value for `tel:`/`https://wa.me/` links, digits only after the leading +. */
  phone: string;
  /** Human-readable phone for display. */
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  /** Single display line — intentionally not a detailed/verified office address. */
  address: string;
}

export interface SiteContent extends SeoFields {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
}

export interface AnnouncementContent {
  id: string;
  message: string;
  linkLabel?: string;
  linkHref?: string;
  /** Central on/off switch — set false to hide the bar without deleting content. */
  enabled: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Short supporting copy shown under the label in a dropdown column. */
  description?: string;
  children?: NavLink[];
}

export interface FooterLinkGroup {
  id: string;
  heading: string;
  links: NavLink[];
}

export type SocialPlatform =
  "facebook" | "instagram" | "linkedin" | "youtube" | "twitter";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  platform: SocialPlatform;
  /** True while href is a placeholder — rendered as visibly inactive rather than linking anywhere misleading. */
  disabled?: boolean;
}

export interface ServiceSummary extends SeoFields {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: PublicationStatus;
}

export interface DestinationSummary extends SeoFields {
  id: string;
  slug: string;
  name: string;
  status: PublicationStatus;
}
