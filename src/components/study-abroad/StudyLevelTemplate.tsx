import { CheckCircle2 } from "lucide-react";

import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type {
  ContactInfo,
  FinalCtaContent,
  StudyLevelPageContent,
} from "@/types/content";

interface StudyLevelTemplateProps {
  content: StudyLevelPageContent;
  finalCta: FinalCtaContent;
  contact: ContactInfo;
}

/**
 * One shared template for both /study-abroad/undergraduate and
 * /study-abroad/postgraduate — see docs/CONTENT_MODEL.md. Do not create a
 * second, duplicated implementation for the other study level.
 */
export function StudyLevelTemplate({
  content,
  finalCta,
  contact,
}: StudyLevelTemplateProps) {
  return (
    <>
      <DetailHero
        breadcrumbItems={[
          { label: "Study Abroad", href: "/study-abroad" },
          { label: content.heading },
        ]}
        heading={content.heading}
        description={content.intro}
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icon="GraduationCap"
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <p className="text-muted-foreground text-sm">{content.whoItsFor}</p>
        </Container>
      </Section>

      <Section aria-labelledby="qualification-considerations-heading">
        <Container>
          <SectionHeading
            eyebrow="Getting started"
            heading="Qualification considerations"
            headingId="qualification-considerations-heading"
            description="Requirements vary by institution, programme and destination — use these as general starting points, not a fixed checklist."
            className="max-w-3xl"
          />
          <KeyPointGrid
            items={content.qualificationConsiderations}
            className="mt-8"
          />
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="planning-timeline-heading"
      >
        <Container>
          <SectionHeading
            eyebrow="Planning ahead"
            heading="A general planning timeline"
            headingId="planning-timeline-heading"
            description="Exact deadlines vary by institution and destination — this is a general guide to help you plan backwards from your intended intake."
            className="max-w-3xl"
          />
          <KeyPointGrid
            items={content.planningTimeline}
            columns={3}
            className="mt-8"
          />
        </Container>
      </Section>

      <Section aria-labelledby="document-checklist-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Documents"
            heading="General document checklist"
            headingId="document-checklist-heading"
            description="Specific document requirements vary by institution, programme and destination — confirm the exact list with each university."
          />
          <ul className="mt-6 space-y-3">
            {content.documentChecklist.map((item) => (
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

      <Section className="bg-muted/50" aria-labelledby="course-funding-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Choosing well"
            heading="Course selection and funding"
            headingId="course-funding-heading"
          />
          <div className="mt-6 space-y-5">
            <p className="text-muted-foreground text-sm">
              {content.courseSelectionGuidance}
            </p>
            <p className="text-muted-foreground text-sm">
              {content.fundingConsiderations}
            </p>
          </div>
        </Container>
      </Section>

      <FaqSection items={content.faqItems} />
      <FinalCtaSection cta={finalCta} contact={contact} />
    </>
  );
}
