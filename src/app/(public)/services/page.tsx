import type { Metadata } from "next";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { InsuranceSection } from "@/components/home/InsuranceSection";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { HowSupportWorksSection } from "@/components/services/HowSupportWorksSection";
import { ScopeLimitationsSection } from "@/components/services/ScopeLimitationsSection";
import { ServiceCategoriesSection } from "@/components/services/ServiceCategoriesSection";
import { ApplicationJourneySection } from "@/components/study-abroad/ApplicationJourneySection";
import {
  getInsuranceDisclaimer,
  getInsuranceHighlights,
} from "@/lib/content/home";
import { getServices, getServicesHubContent } from "@/lib/content/services";
import { getSiteContent } from "@/lib/content/site";
import { getGenericApplicationProcess } from "@/lib/content/study-abroad";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Services";
  const description =
    "From choosing a programme to preparing documents, understanding visa steps and arranging essential travel support, Asteron helps you move forward with a clearer plan.";

  return {
    title,
    description,
    alternates: { canonical: "/services" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/services`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ServicesPage() {
  const [
    services,
    hub,
    genericApplicationProcess,
    insuranceHighlights,
    insuranceDisclaimer,
    site,
  ] = await Promise.all([
    getServices(),
    getServicesHubContent(),
    getGenericApplicationProcess(),
    getInsuranceHighlights(),
    getInsuranceDisclaimer(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Services" }])} />
      <JsonLd data={buildFaqPageJsonLd(hub.faqItems)} />

      <DetailHero
        breadcrumbItems={[{ label: "Services" }]}
        heading="Practical support for every stage of your international journey."
        description="From choosing a programme to preparing documents, understanding visa steps and arranging essential travel support, Asteron helps you move forward with a clearer plan."
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Compass", "FileText", "Plane"]}
      />

      <ServiceCategoriesSection
        categories={hub.categories}
        services={services}
      />

      <HowSupportWorksSection items={hub.howSupportWorks} />

      <ApplicationJourneySection
        steps={genericApplicationProcess}
        headingId="services-application-journey-heading"
      />

      <InsuranceSection
        highlights={insuranceHighlights}
        disclaimer={insuranceDisclaimer}
      />

      <ScopeLimitationsSection items={hub.honestScopeLimitations} />

      <FaqSection items={hub.faqItems} />

      <FinalCtaSection cta={hub.finalCta} contact={site.contact} />
    </>
  );
}
