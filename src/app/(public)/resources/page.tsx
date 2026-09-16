import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  categoryLabelFor,
  ResourceCard,
} from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getFeaturedResourceArticle,
  getResourceArticles,
  getResourceCategories,
  getResourcesHubContent,
} from "@/lib/content/resources";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Resources";
  const description =
    "Practical guides on choosing a destination, preparing applications, planning a budget, understanding insurance and preparing for departure.";

  return {
    title,
    description,
    alternates: { canonical: "/resources" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/resources`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ResourcesPage() {
  const [articles, categories, featured, hub, site] = await Promise.all([
    getResourceArticles(),
    getResourceCategories(),
    getFeaturedResourceArticle(),
    getResourcesHubContent(),
    getSiteContent(),
  ]);

  const lastReviewed = articles.reduce(
    (latest, article) =>
      article.lastReviewed > latest ? article.lastReviewed : latest,
    articles[0]?.lastReviewed ?? "",
  );

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Resources" }])} />

      <DetailHero
        breadcrumbItems={[{ label: "Resources" }]}
        heading="Resources"
        description={hub.intro}
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["BookOpen", "FileText", "Newspaper"]}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <p className="text-muted-foreground text-sm">
            Content last reviewed:{" "}
            <time dateTime={lastReviewed}>{lastReviewed}</time>
          </p>
        </Container>
      </Section>

      {featured ? (
        <Section
          className="bg-muted/50"
          aria-labelledby="featured-resource-heading"
        >
          <Container>
            <SectionHeading
              eyebrow="Start here"
              heading="Featured resource"
              headingId="featured-resource-heading"
              className="max-w-3xl"
            />
            <div className="mt-6 max-w-2xl">
              <ResourceCard
                article={featured}
                categoryLabel={categoryLabelFor(
                  categories,
                  featured.categoryId,
                )}
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="resource-categories-heading">
        <Container>
          <SectionHeading
            eyebrow="Browse by topic"
            heading="Categories"
            headingId="resource-categories-heading"
            className="max-w-3xl"
          />
          <nav
            aria-label="Resource categories"
            className="mt-6 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.slug}`}
                className="border-border text-foreground hover:bg-muted focus-visible:ring-ring rounded-full border px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2"
              >
                {category.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {categories.map((category) => {
        const categoryArticles = articles.filter(
          (article) => article.categoryId === category.id,
        );
        if (categoryArticles.length === 0) return null;

        return (
          <Section
            key={category.id}
            id={`category-${category.slug}`}
            className="bg-muted/50 scroll-mt-20 [&:nth-of-type(even)]:bg-transparent"
            aria-labelledby={`category-${category.slug}-heading`}
          >
            <Container>
              <SectionHeading
                eyebrow={category.label}
                heading={category.description}
                headingId={`category-${category.slug}-heading`}
                headingLevel="h3"
                className="max-w-3xl"
              />
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryArticles.map((article) => (
                  <li key={article.id}>
                    <ResourceCard
                      article={article}
                      categoryLabel={category.label}
                    />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section aria-labelledby="newsletter-heading">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Stay updated"
            heading="Newsletter"
            headingId="newsletter-heading"
          />
          <NoticeCallout className="mt-4">
            {hub.newsletterPlaceholderNote}
          </NoticeCallout>
          <form className="mt-4 flex flex-wrap gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              disabled
              className="max-w-xs"
            />
            <Button type="button" disabled>
              Notify Me
            </Button>
          </form>
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Want guidance tailored to your situation?",
          description:
            "These resources are a general starting point — a consultation can help you apply them to your own goals.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: {
            label: "Explore Study Abroad",
            href: "/study-abroad",
          },
        }}
        contact={site.contact}
      />
    </>
  );
}
