import type { Metadata } from "next";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EligibilityForm } from "@/components/eligibility/EligibilityForm";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import { getEligibilityContent } from "@/lib/content/eligibility";
import { getSiteContent } from "@/lib/content/site";
import { getStudyAbroadHubContent } from "@/lib/content/study-abroad";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEligibilityContent();
  const title = content.seo.metaTitle ?? "Check Your Eligibility";
  const description = content.seo.metaDescription ?? content.intro;
  const path = "/check-eligibility";

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

export default async function CheckEligibilityPage() {
  const [content, hub, site] = await Promise.all([
    getEligibilityContent(),
    getStudyAbroadHubContent(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([{ label: "Check Eligibility" }])}
      />
      <JsonLd data={buildFaqPageJsonLd(content.faqItems)} />

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Check Eligibility" }]}
            className="mb-6"
          />
          <PageHeader
            heading="Check Your Eligibility"
            description={content.intro}
          />
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="eligibility-factors-heading"
      >
        <Container>
          <SectionHeading
            eyebrow="What's generally considered"
            heading="Factors that typically affect eligibility"
            headingId="eligibility-factors-heading"
            description="These are general factors, not a checklist that guarantees any outcome — exact requirements are set by each institution and government authority."
            className="max-w-3xl"
          />
          <KeyPointGrid items={content.factors} className="mt-8" />
        </Container>
      </Section>

      <Section aria-labelledby="eligibility-form-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Get started"
            heading="Tell us about your plans"
            headingId="eligibility-form-heading"
            description="Share a few details and we'll follow up to discuss your options. This does not check eligibility automatically."
            className="max-w-3xl"
          />
          <div className="mt-8">
            <EligibilityForm contact={site.contact} />
          </div>
        </Container>
      </Section>

      <FaqSection items={content.faqItems} />

      <FinalCtaSection cta={hub.finalCta} contact={site.contact} />
    </>
  );
}
