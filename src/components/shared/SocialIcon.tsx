import { MessageCircle } from "lucide-react";
import type { SocialPlatform } from "@/types/content";

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

/**
 * Real, recognizable glyphs for each social platform — lucide-react ships
 * no brand/logo icons at all (checked directly against its export list),
 * which is why the footer previously fell back to plain two-letter text
 * initials ("Fb", "In", "Tt", "Wa") in a circle. That read as unfinished
 * placeholder buttons once the links themselves became real — replaced
 * with simplified, hand-authored single-color glyphs (not a downloaded
 * asset, consistent with this project's code-based-icon approach
 * elsewhere), used purely to identify the linked platform — standard,
 * non-infringing nominative use, the same way every site's footer links
 * to a brand's own official page using that brand's own icon shape.
 * WhatsApp reuses the same `MessageCircle` lucide icon already used for
 * every other WhatsApp link across this codebase, for visual consistency.
 */
export function SocialIcon({ platform, className }: SocialIconProps) {
  switch (platform) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.5 21.9v-8.4h2.8l.4-3.3h-3.2V8c0-.95.27-1.6 1.63-1.6h1.74V3.46A23.3 23.3 0 0 0 14.3 3.3c-2.5 0-4.2 1.52-4.2 4.32v2.55H7.3v3.3h2.8v8.44a9.5 9.5 0 0 0 3.4 0Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="7.6" cy="8" r="1.35" />
          <rect x="6.5" y="10.4" width="2.2" height="7.3" />
          <path d="M11.4 10.4h2.1v1.05c.5-.75 1.3-1.25 2.4-1.25 2 0 2.9 1.3 2.9 3.55v4h-2.2v-3.6c0-1.1-.4-1.8-1.35-1.8-.9 0-1.5.6-1.75 1.2-.09.2-.1.5-.1.8v3.4h-2.2Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M16.6 3.5c.45 1.8 1.6 3.05 3.4 3.3v2.6c-1.2.05-2.35-.35-3.4-1.15v6.15c0 3.15-2.3 5.6-5.6 5.6-3.15 0-5.6-2.5-5.6-5.6 0-3.05 2.4-5.55 5.5-5.6a5.5 5.5 0 0 1 .85.07v2.75a2.9 2.9 0 0 0-.85-.13c-1.6 0-2.85 1.2-2.85 2.9 0 1.65 1.25 2.9 2.85 2.9 1.7 0 2.95-1.25 2.95-2.9V3.5Z" />
        </svg>
      );
    case "whatsapp":
      return <MessageCircle className={className} aria-hidden="true" />;
    default:
      return null;
  }
}
