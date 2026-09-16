import Link from "next/link";
import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { ScholarshipCard } from "@/components/scholarships/ScholarshipCard";
import {
  getScholarships,
  getScholarshipsIntro,
} from "@/lib/content/scholarships";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Scholarships";
  const description =
    "A scholarship directory is planned for this section — verified opportunities will be added once confirmed. See our Scholarship Guidance service in the meantime.";

  return {
    title,
    description,
    alternates: { canonical: "/scholarships" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/scholarships`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ScholarshipsPage() {
  const [scholarships, intro, site] = await Promise.all([
    getScholarships(),
    getScholarshipsIntro(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Scholarships" }])} />

      <DetailHero
        breadcrumbItems={[{ label: "Scholarships" }]}
        heading="Scholarships"
        description={intro}
        primaryCta={{
          label: "Explore Scholarship Guidance",
          href: "/services/scholarship-guidance",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Award", "GraduationCap", "FileCheck"]}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <NoticeCallout>
            No deadlines are published on this page until they&apos;ve been
            officially verified. For general guidance identifying and applying
            to opportunities, see our{" "}
            <Link
              href="/services/scholarship-guidance"
              className="underline underline-offset-2"
            >
              Scholarship Guidance
            </Link>{" "}
            service.
          </NoticeCallout>
        </Container>
      </Section>

      <Section className="bg-muted/50">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((scholarship) => (
              <li key={scholarship.id}>
                <ScholarshipCard scholarship={scholarship} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Want help finding real opportunities?",
          description:
            "Book a free consultation to discuss scholarship options relevant to your situation.",
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
