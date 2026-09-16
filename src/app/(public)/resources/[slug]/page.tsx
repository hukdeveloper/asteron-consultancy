import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { ResourceArticleTemplate } from "@/components/resources/ResourceArticleTemplate";
import {
  getRelatedResourceArticles,
  getResourceArticleBySlug,
  getResourceArticles,
  getResourceCategories,
} from "@/lib/content/resources";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateStaticParams() {
  const articles = await getResourceArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getResourceArticleBySlug(slug);

  if (!article) return { title: "Resources" };

  const title = article.seo.metaTitle ?? article.title;
  const description = article.seo.metaDescription ?? article.summary;
  const path = `/resources/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${env.siteUrl}${path}`,
      type: "article",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ResourceArticlePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const article = await getResourceArticleBySlug(slug);

  if (!article) notFound();

  const [categories, relatedArticles, site] = await Promise.all([
    getResourceCategories(),
    getRelatedResourceArticles(article),
    getSiteContent(),
  ]);

  const categoryLabel =
    categories.find((category) => category.id === article.categoryId)?.label ??
    article.categoryId;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Resources", path: "/resources" },
          { label: article.title },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          dateModified: article.lastReviewed,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />

      <ResourceArticleTemplate
        article={article}
        categoryLabel={categoryLabel}
        relatedArticles={relatedArticles}
        finalCta={{
          heading: "Ready to talk through your own plan?",
          description:
            "Book a free consultation for guidance tailored to your situation.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: {
            label: "Check Your Eligibility",
            href: "/check-eligibility",
          },
        }}
        contact={site.contact}
      />
    </>
  );
}
