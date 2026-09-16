import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  getScholarshipBySlug,
  getScholarships,
} from "@/lib/content/scholarships";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateStaticParams() {
  const scholarships = await getScholarships();
  return scholarships.map((scholarship) => ({ slug: scholarship.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/scholarships/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);

  if (!scholarship) return { title: "Scholarships" };

  const title = scholarship.seo.metaTitle ?? scholarship.name;
  const description =
    scholarship.seo.metaDescription ?? scholarship.eligibilitySummary;
  const path = `/scholarships/${scholarship.slug}`;

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

export default async function ScholarshipDetailPage({
  params,
}: PageProps<"/scholarships/[slug]">) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);

  if (!scholarship) notFound();

  const site = await getSiteContent();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Scholarships", path: "/scholarships" },
          { label: scholarship.name },
        ])}
      />

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Scholarships", href: "/scholarships" },
              { label: scholarship.name },
            ]}
            className="mb-6"
          />
          <PageHeader
            heading={scholarship.name}
            description={`Provider: ${scholarship.provider}`}
          />
          <NoticeCallout className="mt-6">
            This is a content template, not an active scholarship. It
            demonstrates the intended structure only — no opening date or
            deadline is published until officially verified.
          </NoticeCallout>
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="scholarship-eligibility-heading"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Eligibility"
            heading="Eligibility summary"
            headingId="scholarship-eligibility-heading"
          />
          <p className="text-muted-foreground mt-4 text-base">
            {scholarship.eligibilitySummary}
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="scholarship-process-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Applying"
            heading="Application process"
            headingId="scholarship-process-heading"
          />
          <p className="text-muted-foreground mt-4 text-base">
            {scholarship.applicationProcessSummary}
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            Opening date and deadline: to be confirmed once verified.
          </p>
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Want help with scholarships relevant to you?",
          description:
            "Book a free consultation to discuss opportunities that fit your situation.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: {
            label: "Scholarship Guidance",
            href: "/services/scholarship-guidance",
          },
        }}
        contact={site.contact}
      />
    </>
  );
}
