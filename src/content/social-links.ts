import type { SocialLink } from "@/types/content";

/**
 * Social profile links shown in the footer. All hrefs are placeholders
 * (`#`) and marked `disabled` until real, verified profiles exist — do not
 * point these at a real organization's or individual's account without
 * confirmation (docs/DESIGN_SYSTEM.md §11-12 temporary-content policy).
 */
export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "#",
    platform: "facebook",
    disabled: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    platform: "instagram",
    disabled: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "#",
    platform: "linkedin",
    disabled: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "#",
    platform: "youtube",
    disabled: true,
  },
];
