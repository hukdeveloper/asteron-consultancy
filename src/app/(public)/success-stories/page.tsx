import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { SuccessStoryCard } from "@/components/success-stories/SuccessStoryCard";
import { getSiteContent } from "@/lib/content/site";
import {
  getSuccessStories,
  getSuccessStoriesIntro,
} from "@/lib/content/success-stories";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Success Stories";
  const description =
    "Verified student success stories will be published here with permission. See example journeys demonstrating the intended structure.";

  return {
    title,
    description,
    alternates: { canonical: "/success-stories" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/success-stories`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function SuccessStoriesPage() {
  const [stories, intro, site] = await Promise.all([
    getSuccessStories(),
    getSuccessStoriesIntro(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([{ label: "Success Stories" }])}
      />

      <DetailHero
        breadcrumbItems={[{ label: "Success Stories" }]}
        heading="Success Stories"
        description={intro}
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Quote", "Star", "Users"]}
      />

      <Section className="bg-muted/50">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <li key={story.id}>
                <SuccessStoryCard story={story} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Want to share your own journey one day?",
          description:
            "Once you've studied with our support, we'd welcome the chance to feature your story with your permission.",
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
