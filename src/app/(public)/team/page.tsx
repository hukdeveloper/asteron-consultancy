import Link from "next/link";
import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { TeamGrid } from "@/components/team/TeamGrid";
import { getTeamMembers } from "@/lib/content/team";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Team";
  const description =
    "The roles our team fills to support your study-abroad journey — from counselling through to insurance guidance.";

  return {
    title,
    description,
    alternates: { canonical: "/team" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/team`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function TeamPage() {
  const [members, site] = await Promise.all([
    getTeamMembers(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Team" }])} />

      <DetailHero
        breadcrumbItems={[{ label: "Team" }]}
        heading="Our Team"
        description="The roles our team fills as you move from planning through to departure. Individual staff profiles will be added here once available."
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Users", "Award", "Heart"]}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <NoticeCallout>
            Real staff profiles are not yet published. The cards below describe
            the roles that support you, not specific individuals — see{" "}
            <Link href="/about" className="underline underline-offset-2">
              About
            </Link>{" "}
            for more on how we work.
          </NoticeCallout>
        </Container>
      </Section>

      <Section className="bg-muted/50">
        <Container>
          <TeamGrid members={members} />
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Ready to talk to our team?",
          description:
            "Book a free consultation and we'll match you with the right support.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: { label: "Contact Us", href: "/contact" },
        }}
        contact={site.contact}
      />
    </>
  );
}
