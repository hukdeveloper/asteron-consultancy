import {
  insuranceClaimsSupportGeneral,
  insuranceComparisonConsiderations,
  insuranceGlobalDisclosure,
  insuranceHero,
  insuranceHubFaqItems,
  insuranceIntro,
  insuranceProviderDisclosureGeneral,
  insuranceQuoteProcessSteps,
  insuranceServices,
  insuranceWhyRequired,
} from "@/content/insurance";
import type { InsuranceService } from "@/types/content";

export async function getInsuranceServices(): Promise<InsuranceService[]> {
  return insuranceServices.filter(
    (service) => service.contentStatus === "published",
  );
}

export async function getInsuranceServiceBySlug(
  slug: string,
): Promise<InsuranceService | undefined> {
  const all = await getInsuranceServices();
  return all.find((service) => service.slug === slug);
}

export async function getInsuranceHubContent() {
  return {
    hero: insuranceHero,
    intro: insuranceIntro,
    whyRequired: insuranceWhyRequired,
    comparisonConsiderations: insuranceComparisonConsiderations,
    quoteProcessSteps: insuranceQuoteProcessSteps,
    providerDisclosureGeneral: insuranceProviderDisclosureGeneral,
    claimsSupportGeneral: insuranceClaimsSupportGeneral,
    faqItems: insuranceHubFaqItems,
    globalDisclosure: insuranceGlobalDisclosure,
  };
}

export async function getInsuranceGlobalDisclosure(): Promise<string> {
  return insuranceGlobalDisclosure;
}
