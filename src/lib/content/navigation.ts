import {
  footerLinkGroups,
  headerNavigation,
  headerPrimaryCta,
  legalLinks,
} from "@/content/navigation";
import type { FooterLinkGroup, NavItem, NavLink } from "@/types/content";

/**
 * Content-access layer for navigation. See src/lib/content/site.ts for the
 * rationale — pages/components import from here, not from
 * src/content/navigation.ts directly.
 */
export async function getHeaderNavigation(): Promise<NavItem[]> {
  return headerNavigation;
}

export async function getHeaderPrimaryCta(): Promise<{
  label: string;
  href: string;
}> {
  return headerPrimaryCta;
}

export async function getFooterLinkGroups(): Promise<FooterLinkGroup[]> {
  return footerLinkGroups;
}

export async function getLegalLinks(): Promise<NavLink[]> {
  return legalLinks;
}
