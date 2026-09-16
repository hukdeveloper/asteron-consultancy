import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { getLegalDraftNotice, getLegalPageBySlug } from "@/lib/content/legal";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

const SLUG = "disclaimer";

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([
    getLegalPageBySlug(SLUG),
    getSiteContent(),
  ]);
  if (!page) return { title: "Disclaimer" };

  const title = page.seo.metaTitle ?? page.title;
  const description = page.seo.metaDescription ?? "";
  const path = "/legal/disclaimer";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}${path}`,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function DisclaimerPage() {
  const [page, draftNotice] = await Promise.all([
    getLegalPageBySlug(SLUG),
    getLegalDraftNotice(),
  ]);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: page.title }])} />
      <LegalPageTemplate page={page} draftNotice={draftNotice} />
    </>
  );
}
