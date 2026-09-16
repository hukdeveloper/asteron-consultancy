import {
  aboutFinalCta,
  aboutGuidancePrinciples,
  aboutHistoryNote,
  aboutHowWeSupport,
  aboutIntro,
  aboutMission,
  aboutServiceDistinction,
  aboutTeamPreviewIntro,
  aboutValues,
} from "@/content/about";
import { getTeamMembers } from "@/lib/content/team";

export async function getAboutContent() {
  const teamPreview = (await getTeamMembers()).slice(0, 3);

  return {
    intro: aboutIntro,
    mission: aboutMission,
    historyNote: aboutHistoryNote,
    values: aboutValues,
    howWeSupport: aboutHowWeSupport,
    serviceDistinction: aboutServiceDistinction,
    guidancePrinciples: aboutGuidancePrinciples,
    teamPreviewIntro: aboutTeamPreviewIntro,
    teamPreview,
    finalCta: aboutFinalCta,
  };
}
