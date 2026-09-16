import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { ApplicationJourneySection } from "@/components/study-abroad/ApplicationJourneySection";
import { DestinationHero } from "@/components/study-abroad/DestinationHero";
import { DestinationLifestyleSection } from "@/components/study-abroad/DestinationLifestyleSection";
import { DestinationOverviewSection } from "@/components/study-abroad/DestinationOverviewSection";
import { DestinationScholarshipVisaSection } from "@/components/study-abroad/DestinationScholarshipVisaSection";
import { DestinationStudyOptionsSection } from "@/components/study-abroad/DestinationStudyOptionsSection";
import { InformationReviewNote } from "@/components/study-abroad/InformationReviewNote";
import { PlanningSection } from "@/components/study-abroad/PlanningSection";
import { RelatedServicesSection } from "@/components/study-abroad/RelatedServicesSection";
import {
  getDestinationBySlug,
  getDestinations,
} from "@/lib/content/destinations";
import { getServices } from "@/lib/content/services";
import { getSiteContent } from "@/lib/content/site";
import {
  getCostPlanningCategories,
  getGenericApplicationProcess,
  getStudyAbroadHubContent,
} from "@/lib/content/study-abroad";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((destination) => ({ destination: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/study-abroad/[destination]">): Promise<Metadata> {
  const { destination: slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) return { title: "Study Abroad" };

  const title = destination.seo.metaTitle ?? destination.heroTitle;
  const description =
    destination.seo.metaDescription ?? destination.heroDescription;
  const path = `/study-abroad/${destination.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${env.siteUrl}${path}`,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function StudyAbroadDestinationPage({
  params,
}: PageProps<"/study-abroad/[destination]">) {
  const { destination: slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  const [allServices, costPlanningCategories, genericApplicationProcess, site] =
    await Promise.all([
      getServices(),
      getCostPlanningCategories(),
      getGenericApplicationProcess(),
      getSiteContent(),
    ]);
  const hub = await getStudyAbroadHubContent();

  const relatedServices = destination.relatedServices
    .map((serviceSlug) =>
      allServices.find((service) => service.slug === serviceSlug),
    )
    .filter((service) => service !== undefined);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Study Abroad", path: "/study-abroad" },
          { label: destination.name },
        ])}
      />
      <JsonLd data={buildFaqPageJsonLd(destination.faqItems)} />

      <DestinationHero destination={destination} />
      <DestinationOverviewSection destination={destination} />
      <DestinationStudyOptionsSection destination={destination} />
      <ApplicationJourneySection
        steps={genericApplicationProcess}
        destinationNote={destination.applicationProcess}
        headingId="destination-application-journey-heading"
      />
      <PlanningSection
        destination={destination}
        costPlanningCategories={costPlanningCategories}
      />
      <DestinationScholarshipVisaSection destination={destination} />
      <DestinationLifestyleSection destination={destination} />
      <RelatedServicesSection services={relatedServices} />
      <FaqSection items={destination.faqItems} />
      <FinalCtaSection cta={hub.finalCta} contact={site.contact} />
      <InformationReviewNote lastReviewed={destination.lastReviewed} />
    </>
  );
}
