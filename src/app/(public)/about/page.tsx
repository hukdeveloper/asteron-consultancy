import Link from "next/link";
import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamGrid } from "@/components/team/TeamGrid";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import { Button } from "@/components/ui/button";
import { getAboutContent } from "@/lib/content/about";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "About";
  const description =
    "How Asteron Global Consultancy supports students and families planning international education — our mission, values and guidance principles.";

  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/about`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function AboutPage() {
  const [about, site] = await Promise.all([
    getAboutContent(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "About" }])} />

      <DetailHero
        breadcrumbItems={[{ label: "About" }]}
        heading="About Asteron"
        description={about.intro}
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Building2", "Users", "Target"]}
      />

      <Section className="bg-muted/50" aria-labelledby="about-mission-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Our mission"
            heading="What we're working toward"
            headingId="about-mission-heading"
          />
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            {about.mission}
          </p>
          <NoticeCallout className="mt-6">{about.historyNote}</NoticeCallout>
        </Container>
      </Section>

      <Section aria-labelledby="about-values-heading">
        <Container>
          <SectionHeading
            eyebrow="What we value"
            heading="Our values"
            headingId="about-values-heading"
            className="max-w-3xl"
          />
          <KeyPointGrid items={about.values} className="mt-8" />
        </Container>
      </Section>

      <Section className="bg-muted/50" aria-labelledby="about-support-heading">
        <Container>
          <SectionHeading
            eyebrow="How we help"
            heading="How Asteron supports clients"
            headingId="about-support-heading"
            className="max-w-3xl"
          />
          <KeyPointGrid
            items={about.howWeSupport}
            className="mt-8"
            columns={2}
          />
        </Container>
      </Section>

      <Section aria-labelledby="about-distinction-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Two related, distinct areas"
            heading="Study Abroad services and insurance guidance"
            headingId="about-distinction-heading"
          />
          <p className="text-muted-foreground mt-4 text-base">
            {about.serviceDistinction}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/insurance">Explore Insurance</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-muted/50"
        aria-labelledby="about-principles-heading"
      >
        <Container>
          <SectionHeading
            eyebrow="How we work"
            heading="Guidance principles"
            headingId="about-principles-heading"
            className="max-w-3xl"
          />
          <KeyPointGrid
            items={about.guidancePrinciples}
            className="mt-8"
            columns={2}
          />
        </Container>
      </Section>

      <Section aria-labelledby="about-team-heading">
        <Container>
          <SectionHeading
            eyebrow="Our team"
            heading="Meet the team"
            headingId="about-team-heading"
            description={about.teamPreviewIntro}
            className="max-w-3xl"
          />
          <TeamGrid members={about.teamPreview} />
          <div className="mt-6">
            <Link
              href="/team"
              className="text-foreground text-sm font-medium hover:underline"
            >
              Meet the full team
            </Link>
          </div>
        </Container>
      </Section>

      <FinalCtaSection cta={about.finalCta} contact={site.contact} />
    </>
  );
}
