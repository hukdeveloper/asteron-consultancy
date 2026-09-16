import {
  faqItems,
  featuredUniversityPlaceholders,
  finalCta,
  homeHero,
  insuranceDisclaimer,
  insuranceHighlights,
  processSteps,
  resourceSummaries,
  sampleEvent,
  scholarshipHighlights,
  successStoryDemos,
  trustPoints,
  whyChooseReasons,
} from "@/content/home";
import type {
  FaqItem,
  FeaturedUniversityPlaceholder,
  FinalCtaContent,
  HomeEventSummary,
  HomeHeroContent,
  InsuranceHighlight,
  ProcessStep,
  ResourceSummary,
  ScholarshipHighlight,
  SuccessStoryDemo,
  TrustPoint,
  WhyChooseReason,
} from "@/types/content";

/**
 * Content-access layer for the homepage. Pages/components import from
 * here, not from src/content/home.ts directly — see
 * docs/TECHNICAL_ARCHITECTURE.md "Content Access Approach".
 */

export async function getHomeHero(): Promise<HomeHeroContent> {
  return homeHero;
}

export async function getTrustPoints(): Promise<TrustPoint[]> {
  return trustPoints;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return processSteps;
}

export async function getWhyChooseReasons(): Promise<WhyChooseReason[]> {
  return whyChooseReasons;
}

export async function getFeaturedUniversityPlaceholders(): Promise<
  FeaturedUniversityPlaceholder[]
> {
  return featuredUniversityPlaceholders;
}

export async function getScholarshipHighlights(): Promise<
  ScholarshipHighlight[]
> {
  return scholarshipHighlights;
}

export async function getSuccessStoryDemos(): Promise<SuccessStoryDemo[]> {
  return successStoryDemos;
}

export async function getInsuranceHighlights(): Promise<InsuranceHighlight[]> {
  return insuranceHighlights;
}

export async function getInsuranceDisclaimer(): Promise<string> {
  return insuranceDisclaimer;
}

export async function getSampleEvent(): Promise<HomeEventSummary> {
  return sampleEvent;
}

export async function getResourceSummaries(): Promise<ResourceSummary[]> {
  return resourceSummaries;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return faqItems;
}

export async function getFinalCta(): Promise<FinalCtaContent> {
  return finalCta;
}
