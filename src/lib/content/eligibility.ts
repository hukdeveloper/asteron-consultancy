import {
  eligibilityFactors,
  eligibilityFaqItems,
  eligibilityIntro,
  eligibilitySeo,
} from "@/content/eligibility";

export async function getEligibilityContent() {
  return {
    intro: eligibilityIntro,
    factors: eligibilityFactors,
    faqItems: eligibilityFaqItems,
    seo: eligibilitySeo,
  };
}
