import { teamMembers } from "@/content/team";
import type { TeamMember } from "@/types/content";

export async function getTeamMembers(): Promise<TeamMember[]> {
  return [...teamMembers].sort((a, b) => a.displayOrder - b.displayOrder);
}
