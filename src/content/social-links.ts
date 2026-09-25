import type { SocialLink } from "@/types/content";

/**
 * Social profile links shown in the footer. Facebook, LinkedIn, TikTok,
 * and the WhatsApp channel are real, lead-architect-supplied URLs
 * (2026-09-18) and render as live links. Instagram and YouTube have no
 * confirmed profile yet, so they stay `href: "#"` and `disabled: true` —
 * hidden entirely rather than shown as a non-functional button (see
 * `realSocialLinks` in SiteFooter.tsx) — per docs/DESIGN_SYSTEM.md §11-12
 * temporary-content policy. Do not point a disabled entry at a real
 * account without the same kind of explicit confirmation.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/18Z3uypvtM/",
    platform: "facebook",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/engr-janan-813241273",
    platform: "linkedin",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@ur_jkx?_r=1&_t=ZS-99mtM0ksG2S",
    platform: "tiktok",
  },
  {
    id: "whatsapp-channel",
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R",
    platform: "whatsapp",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    platform: "instagram",
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
