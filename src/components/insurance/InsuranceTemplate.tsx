import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { FaqSection } from "@/components/home/FaqSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { ProcessStepsSection } from "@/components/shared/ProcessStepsSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { InsuranceHero } from "@/components/insurance/InsuranceHero";
import { InformationReviewNote } from "@/components/study-abroad/InformationReviewNote";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import { RelatedServicesSection } from "@/components/study-abroad/RelatedServicesSection";
import type { InsuranceService, Service } from "@/types/content";

interface InsuranceTemplateProps {
  insurance: InsuranceService;
  relatedServices: Service[];
  globalDisclosure: string;
}

/**
 * One shared template for every /insurance/[slug] page. Do not create a
 * second, duplicated implementation per insurance type.
 */
export function InsuranceTemplate({
  insurance,
  relatedServices,
  globalDisclosure,
}: InsuranceTemplateProps) {
  return (
    <>
      <InsuranceHero insurance={insurance} />

      <Section aria-labelledby="insurance-overview-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Overview"
            heading="What this cover is generally for"
            headingId="insurance-overview-heading"
          />
          <p className="text-muted-foreground mt-4 text-base">
            {insurance.overview}
          </p>
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="insurance-coverage-heading"
      >
        <Container>
          <SectionHeading
            eyebrow="Coverage"
            heading="Possible coverage areas"
            headingId="insurance-coverage-heading"
            description="These are general categories only — specific benefits, limits and eligibility vary by provider and policy."
            className="max-w-3xl"
          />
          <KeyPointGrid
            items={insurance.possibleCoverageAreas}
            className="mt-8"
          />
        </Container>
      </Section>

      <Section aria-labelledby="insurance-exclusions-heading">
        <Container className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <div>
            <h2
              id="insurance-exclusions-heading"
              className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Common exclusions
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              {insurance.commonExclusionsNote}
            </p>
          </div>
          <div>
            <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
              Eligibility
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              {insurance.eligibilityNote}
            </p>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="insurance-quote-info-heading"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Requesting a quote"
            heading="Information commonly needed for a quote"
            headingId="insurance-quote-info-heading"
          />
          <ul className="mt-6 space-y-3">
            {insurance.informationNeededForQuote.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  aria-hidden="true"
                  className="text-brand-teal-text mt-0.5 size-4 shrink-0"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6">
            <Link href="/insurance-quote">Request an Insurance Quote</Link>
          </Button>
        </Container>
      </Section>

      <ProcessStepsSection
        eyebrow="Process"
        heading="How the quote-assistance process works"
        headingId="insurance-process-heading"
        steps={insurance.processSteps}
      />

      <Section aria-labelledby="insurance-provider-heading">
        <Container className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <div>
            <h2
              id="insurance-provider-heading"
              className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Provider disclosure
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              {insurance.providerDisclosure}
            </p>
          </div>
          <div>
            <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
              Claims support
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              {insurance.claimsSupportDescription}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/50">
        <Container className="max-w-3xl">
          <NoticeCallout>{globalDisclosure}</NoticeCallout>
        </Container>
      </Section>

      <RelatedServicesSection
        services={relatedServices}
        headingId="insurance-related-heading"
      />

      <FaqSection items={insurance.faqItems} />

      <Section aria-labelledby="insurance-cta-heading">
        <Container className="max-w-2xl text-center">
          <h2
            id="insurance-cta-heading"
            className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Ready to request a quote?
          </h2>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            Share a few details and we&apos;ll help you request a quotation
            suited to your situation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/insurance-quote">Request an Insurance Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book-consultation">Book Free Consultation</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <InformationReviewNote lastReviewed={insurance.lastReviewed} />
    </>
  );
}
