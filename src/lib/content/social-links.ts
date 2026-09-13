import { socialLinks } from "@/content/social-links";
import type { SocialLink } from "@/types/content";

export async function getSocialLinks(): Promise<SocialLink[]> {
  return socialLinks;
}
