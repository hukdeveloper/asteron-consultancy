import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { InsuranceSection } from "@/components/home/InsuranceSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { ScholarshipSection } from "@/components/home/ScholarshipSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StudyAbroadIntroSection } from "@/components/home/StudyAbroadIntroSection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getDestinations } from "@/lib/content/destinations";
import {
  getFaqItems,
  getFinalCta,
  getHomeHero,
  getInsuranceDisclaimer,
  getInsuranceHighlights,
  getProcessSteps,
  getResourceSummaries,
  getScholarshipHighlights,
  getSuccessStoryDemos,
  getTrustPoints,
} from "@/lib/content/home";
import { getFeaturedServices } from "@/lib/content/services";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = `${site.name} — ${site.tagline}`;
  const description = site.description;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: env.siteUrl,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const [
    site,
    hero,
    trustPoints,
    services,
    destinations,
    processSteps,
    scholarshipHighlights,
    successStories,
    insuranceHighlights,
    insuranceDisclaimer,
    resources,
    faqItems,
    finalCta,
  ] = await Promise.all([
    getSiteContent(),
    getHomeHero(),
    getTrustPoints(),
    getFeaturedServices(),
    getDestinations(),
    getProcessSteps(),
    getScholarshipHighlights(),
    getSuccessStoryDemos(),
    getInsuranceHighlights(),
    getInsuranceDisclaimer(),
    getResourceSummaries(),
    getFaqItems(),
    getFinalCta(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: env.siteUrl,
    email: site.contact.email,
    telephone: site.contact.phone,
  };

  return (
    <>
      {/* Real, non-fictional fields only — see docs/DECISIONS.md for what is
          deliberately omitted (address/coordinates/ratings/hours) until verified. */}
      <JsonLd data={structuredData} />

      <Hero hero={hero} />
      <TrustStrip points={trustPoints} />
      <StudyAbroadIntroSection />
      <DestinationsSection destinations={destinations} />
      <HowItWorksSection steps={processSteps} />
      <ServicesSection services={services} />
      <ScholarshipSection highlights={scholarshipHighlights} />
      <InsuranceSection
        highlights={insuranceHighlights}
        disclaimer={insuranceDisclaimer}
      />
      <SuccessStoriesSection stories={successStories} />
      <ResourcesSection resources={resources} />
      <FaqSection items={faqItems} />
      <FinalCtaSection cta={finalCta} contact={site.contact} />
    </>
  );
}
