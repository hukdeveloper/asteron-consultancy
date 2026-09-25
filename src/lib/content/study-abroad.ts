import {
  costPlanningCategories,
  genericApplicationProcess,
  howJananSupports,
  parentReassurance,
  popularSubjectAreas,
  postgraduatePageContent,
  studyAbroadFaqItems,
  studyAbroadFinalCta,
  studyAbroadHero,
  studyAbroadIntro,
  studyAbroadScholarshipHighlights,
  undergraduatePageContent,
  visaGuidanceIntro,
} from "@/content/study-abroad";
import type { StudyLevelPageContent } from "@/types/content";

export async function getStudyAbroadHubContent() {
  return {
    hero: studyAbroadHero,
    intro: studyAbroadIntro,
    genericApplicationProcess,
    popularSubjectAreas,
    howJananSupports,
    visaGuidanceIntro,
    parentReassurance,
    costPlanningCategories,
    faqItems: studyAbroadFaqItems,
    scholarshipHighlights: studyAbroadScholarshipHighlights,
    finalCta: studyAbroadFinalCta,
  };
}

export async function getCostPlanningCategories() {
  return costPlanningCategories;
}

const studyLevelPages: Record<
  "undergraduate" | "postgraduate",
  StudyLevelPageContent
> = {
  undergraduate: undergraduatePageContent,
  postgraduate: postgraduatePageContent,
};

export async function getStudyLevelPageContent(
  slug: "undergraduate" | "postgraduate",
): Promise<StudyLevelPageContent> {
  return studyLevelPages[slug];
}

export async function getGenericApplicationProcess() {
  return genericApplicationProcess;
}
