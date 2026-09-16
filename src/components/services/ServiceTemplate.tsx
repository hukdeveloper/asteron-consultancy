import { CheckCircle2 } from "lucide-react";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { ProcessStepsSection } from "@/components/shared/ProcessStepsSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { InformationReviewNote } from "@/components/study-abroad/InformationReviewNote";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import { RelatedServicesSection } from "@/components/study-abroad/RelatedServicesSection";
import { ServiceHero } from "@/components/services/ServiceHero";
import type { ContactInfo, FinalCtaContent, Service } from "@/types/content";

interface ServiceTemplateProps {
  service: Service;
  categoryLabel: string;
  relatedServices: Service[];
  finalCta: FinalCtaContent;
  contact: ContactInfo;
}

/**
 * One shared template for every /services/[slug] page. Do not create a
 * second, duplicated implementation per service — see docs/DECISIONS.md.
 */
export function ServiceTemplate({
  service,
  categoryLabel,
  relatedServices,
  finalCta,
  contact,
}: ServiceTemplateProps) {
  return (
    <>
      <ServiceHero service={service} categoryLabel={categoryLabel} />

      <Section aria-labelledby="service-overview-heading">
        <Container>
          <SectionHeading
            eyebrow="Overview"
            heading="What this service covers"
            headingId="service-overview-heading"
            className="max-w-3xl"
          />
          <p className="text-muted-foreground mt-4 max-w-3xl text-base">
            {service.overview}
          </p>
          <p className="text-muted-foreground mt-4 max-w-3xl text-sm">
            {service.whoItMayHelp}
          </p>
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="service-support-heading"
      >
        <Container>
          <SectionHeading
            eyebrow="What's included"
            heading="What support includes"
            headingId="service-support-heading"
            className="max-w-3xl"
          />
          <KeyPointGrid items={service.includedSupport} className="mt-8" />
        </Container>
      </Section>

      <ProcessStepsSection
        heading="Step-by-step process"
        headingId="service-process-heading"
        steps={service.processSteps}
      />

      <Section
        className="bg-muted/50"
        aria-labelledby="service-required-info-heading"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Getting started"
            heading="Information or documents commonly needed"
            headingId="service-required-info-heading"
          />
          <ul className="mt-6 space-y-3">
            {service.requiredInformation.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  aria-hidden="true"
                  className="text-brand-teal-text mt-0.5 size-4 shrink-0"
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="service-limitations-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Important to know"
            heading="Important limitations"
            headingId="service-limitations-heading"
          />
          <ul className="mt-6 space-y-3">
            {service.limitations.map((item) => (
              <li key={item} className="text-muted-foreground text-sm">
                {item}
              </li>
            ))}
          </ul>

          {service.importantNotice ? (
            <NoticeCallout className="mt-6">
              {service.importantNotice}
            </NoticeCallout>
          ) : null}
        </Container>
      </Section>

      <RelatedServicesSection
        services={relatedServices}
        headingId="service-related-heading"
      />

      <FaqSection items={service.faqItems} />

      <FinalCtaSection cta={finalCta} contact={contact} />

      <InformationReviewNote lastReviewed={service.lastReviewed} />
    </>
  );
}
