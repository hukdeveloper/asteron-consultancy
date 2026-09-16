import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { StudyLevelTemplate } from "@/components/study-abroad/StudyLevelTemplate";
import { getSiteContent } from "@/lib/content/site";
import {
  getStudyAbroadHubContent,
  getStudyLevelPageContent,
} from "@/lib/content/study-abroad";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStudyLevelPageContent("undergraduate");
  const title = content.seo.metaTitle ?? content.heading;
  const description = content.seo.metaDescription ?? content.intro;
  const path = "/study-abroad/undergraduate";

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

export default async function UndergraduatePage() {
  const [content, hub, site] = await Promise.all([
    getStudyLevelPageContent("undergraduate"),
    getStudyAbroadHubContent(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Study Abroad", path: "/study-abroad" },
          { label: content.heading },
        ])}
      />
      <JsonLd data={buildFaqPageJsonLd(content.faqItems)} />

      <StudyLevelTemplate
        content={content}
        finalCta={hub.finalCta}
        contact={site.contact}
      />
    </>
  );
}
