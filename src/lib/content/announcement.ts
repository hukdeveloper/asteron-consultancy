import { announcement } from "@/content/announcement";
import type { AnnouncementContent } from "@/types/content";

export async function getAnnouncement(): Promise<AnnouncementContent> {
  return announcement;
}
