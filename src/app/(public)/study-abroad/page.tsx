import type { Metadata } from "next";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ScholarshipSection } from "@/components/home/ScholarshipSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { ApplicationJourneySection } from "@/components/study-abroad/ApplicationJourneySection";
import { DestinationComparisonTable } from "@/components/study-abroad/DestinationComparisonTable";
import { DestinationSelectorSection } from "@/components/study-abroad/DestinationSelectorSection";
import { HowAsteronSupportsSection } from "@/components/study-abroad/HowAsteronSupportsSection";
import { HubVisaGuidanceSection } from "@/components/study-abroad/HubVisaGuidanceSection";
import { ParentReassuranceSection } from "@/components/study-abroad/ParentReassuranceSection";
import { StudyLevelLinksSection } from "@/components/study-abroad/StudyLevelLinksSection";
import { getDestinations } from "@/lib/content/destinations";
import { getStudyAbroadHubContent } from "@/lib/content/study-abroad";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Study Abroad";
  const description =
    "Compare international study destinations, understand study levels and application steps, and get guidance preparing a stronger study-abroad application.";

  return {
    title,
    description,
    alternates: { canonical: "/study-abroad" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/study-abroad`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function StudyAbroadPage() {
  const [destinations, hub] = await Promise.all([
    getDestinations(),
    getStudyAbroadHubContent(),
  ]);
  const site = await getSiteContent();

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Study Abroad" }])} />
      <JsonLd data={buildFaqPageJsonLd(hub.faqItems)} />

      <DetailHero
        breadcrumbItems={[{ label: "Study Abroad" }]}
        heading={hub.hero.heading}
        description={hub.hero.description}
        primaryCta={hub.hero.primaryCta}
        secondaryCta={hub.hero.secondaryCta}
        icons={["GraduationCap", "Compass", "MapPin"]}
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="text-muted-foreground text-base sm:text-lg">
            {hub.intro}
          </p>
        </Container>
      </Section>

      <DestinationSelectorSection destinations={destinations} />

      <StudyLevelLinksSection popularSubjectAreas={hub.popularSubjectAreas} />

      <HowAsteronSupportsSection items={hub.howAsteronSupports} />

      <ApplicationJourneySection steps={hub.genericApplicationProcess} />

      <ScholarshipSection highlights={hub.scholarshipHighlights} />

      <HubVisaGuidanceSection intro={hub.visaGuidanceIntro} />

      <DestinationComparisonTable destinations={destinations} />

      <ParentReassuranceSection items={hub.parentReassurance} />

      <FaqSection items={hub.faqItems} />

      <FinalCtaSection cta={hub.finalCta} contact={site.contact} />
    </>
  );
}
