import type { Metadata } from "next";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { ProcessStepsSection } from "@/components/shared/ProcessStepsSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { InsuranceCategoriesSection } from "@/components/insurance/InsuranceCategoriesSection";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import {
  getInsuranceHubContent,
  getInsuranceServices,
} from "@/lib/content/insurance";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Insurance";
  const description =
    "Get guidance on student health, travel and visitor insurance options, including the information commonly needed to request a quotation.";

  return {
    title,
    description,
    alternates: { canonical: "/insurance" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/insurance`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function InsurancePage() {
  const [insuranceServices, hub, site] = await Promise.all([
    getInsuranceServices(),
    getInsuranceHubContent(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Insurance" }])} />
      <JsonLd data={buildFaqPageJsonLd(hub.faqItems)} />

      <DetailHero
        breadcrumbItems={[{ label: "Insurance" }]}
        heading={hub.hero.heading}
        description={hub.hero.description}
        primaryCta={{
          label: "Request an Insurance Quote",
          href: "/insurance-quote",
        }}
        secondaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        icons={["ShieldCheck", "Plane", "HeartPulse"]}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <p className="text-muted-foreground text-sm">{hub.intro}</p>
        </Container>
      </Section>

      <InsuranceCategoriesSection insuranceServices={insuranceServices} />

      <Section className="bg-muted/50" aria-labelledby="insurance-why-heading">
        <Container>
          <SectionHeading
            eyebrow="Why it may matter"
            heading="Why insurance may be required"
            headingId="insurance-why-heading"
            className="max-w-3xl"
          />
          <KeyPointGrid items={hub.whyRequired} className="mt-8" />
        </Container>
      </Section>

      <Section aria-labelledby="insurance-compare-heading">
        <Container>
          <SectionHeading
            eyebrow="Comparing options"
            heading="General comparison considerations"
            headingId="insurance-compare-heading"
            description="A general starting point for comparing policies — not a recommendation of any specific provider."
            className="max-w-3xl"
          />
          <KeyPointGrid items={hub.comparisonConsiderations} className="mt-8" />
        </Container>
      </Section>

      <ProcessStepsSection
        className="bg-muted/50"
        eyebrow="Getting a quote"
        heading="How the quote-assistance process works"
        headingId="insurance-process-heading"
        steps={hub.quoteProcessSteps}
      />

      <Section aria-labelledby="insurance-explain-heading">
        <Container className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <div>
            <h2
              id="insurance-explain-heading"
              className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Coverage and exclusions
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              Every policy sets its own coverage and exclusions — always review
              the provider&apos;s official policy wording before purchase,
              rather than relying on general guidance alone.
            </p>
          </div>
          <div>
            <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
              Claims support
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              {hub.claimsSupportGeneral}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/50">
        <Container className="max-w-3xl space-y-4">
          <p className="text-muted-foreground text-sm">
            {hub.providerDisclosureGeneral}
          </p>
          <NoticeCallout>{hub.globalDisclosure}</NoticeCallout>
        </Container>
      </Section>

      <FaqSection items={hub.faqItems} />

      <FinalCtaSection
        cta={{
          heading: "Ready to request a quote?",
          description:
            "Share a few details and we'll help you request a quotation suited to your situation.",
          primaryCta: {
            label: "Request an Insurance Quote",
            href: "/insurance-quote",
          },
          secondaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
        }}
        contact={site.contact}
      />
    </>
  );
}
