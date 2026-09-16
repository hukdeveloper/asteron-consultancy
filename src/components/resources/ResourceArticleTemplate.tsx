import Link from "next/link";
import { Clock } from "lucide-react";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ContactInfo,
  FinalCtaContent,
  ResourceArticle,
} from "@/types/content";

interface ResourceArticleTemplateProps {
  article: ResourceArticle;
  categoryLabel: string;
  relatedArticles: ResourceArticle[];
  finalCta: FinalCtaContent;
  contact: ContactInfo;
}

/** One shared template for every /resources/[slug] page — do not create a duplicated implementation per article. */
export function ResourceArticleTemplate({
  article,
  categoryLabel,
  relatedArticles,
  finalCta,
  contact,
}: ResourceArticleTemplateProps) {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: article.title },
            ]}
            className="mb-6"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{categoryLabel}</Badge>
          </div>
          <PageHeader
            className="mt-3"
            heading={article.title}
            description={article.summary}
          />
          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span>
              Reviewed{" "}
              <time dateTime={article.lastReviewed}>
                {article.lastReviewed}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-4" />
              {article.readingTimeMinutes} min read
            </span>
          </div>
        </Container>
      </Section>

      {article.sections.length > 2 ? (
        <Section className="bg-muted/50 py-8">
          <Container className="max-w-3xl">
            <h2 className="text-foreground text-sm font-semibold tracking-wide">
              In this article
            </h2>
            <nav aria-label="Table of contents">
              <ol className="mt-3 space-y-1.5">
                {article.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-foreground focus-visible:ring-ring rounded-sm text-sm outline-none hover:underline focus-visible:ring-2"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="max-w-3xl space-y-10">
          {article.sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <NoticeCallout>
            This article provides general information only, not legal,
            immigration, medical or financial advice. Requirements may change —
            always confirm current details with the relevant official source.
            Last reviewed on{" "}
            <time dateTime={article.lastReviewed}>{article.lastReviewed}</time>.
          </NoticeCallout>
        </Container>
      </Section>

      {relatedArticles.length > 0 ? (
        <Section
          className="bg-muted/50"
          aria-labelledby="related-resources-heading"
        >
          <Container>
            <SectionHeading
              eyebrow="Keep reading"
              heading="Related resources"
              headingId="related-resources-heading"
              className="max-w-3xl"
            />
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <li key={related.id}>
                  <Card className="relative h-full transition-shadow focus-within:shadow-md hover:shadow-md">
                    <CardContent>
                      <h3 className="text-foreground text-base font-semibold">
                        <Link
                          href={`/resources/${related.slug}`}
                          className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mt-1.5 text-sm">
                        {related.summary}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection cta={finalCta} contact={contact} />
    </>
  );
}
