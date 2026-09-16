import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { InsuranceTemplate } from "@/components/insurance/InsuranceTemplate";
import {
  getInsuranceGlobalDisclosure,
  getInsuranceServiceBySlug,
  getInsuranceServices,
} from "@/lib/content/insurance";
import { getServices } from "@/lib/content/services";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateStaticParams() {
  const insuranceServices = await getInsuranceServices();
  return insuranceServices.map((insurance) => ({ slug: insurance.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insurance/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insurance = await getInsuranceServiceBySlug(slug);

  if (!insurance) return { title: "Insurance" };

  const title = insurance.seo.metaTitle ?? insurance.heroTitle;
  const description =
    insurance.seo.metaDescription ?? insurance.heroDescription;
  const path = `/insurance/${insurance.slug}`;

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

export default async function InsuranceDetailPage({
  params,
}: PageProps<"/insurance/[slug]">) {
  const { slug } = await params;
  const insurance = await getInsuranceServiceBySlug(slug);

  if (!insurance) notFound();

  const [allServices, globalDisclosure] = await Promise.all([
    getServices(),
    getInsuranceGlobalDisclosure(),
  ]);

  const relatedServices = insurance.relatedServiceSlugs
    .map((serviceSlug) =>
      allServices.find((service) => service.slug === serviceSlug),
    )
    .filter((service) => service !== undefined);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Insurance", path: "/insurance" },
          { label: insurance.title },
        ])}
      />
      <JsonLd data={buildFaqPageJsonLd(insurance.faqItems)} />

      <InsuranceTemplate
        insurance={insurance}
        relatedServices={relatedServices}
        globalDisclosure={globalDisclosure}
      />
    </>
  );
}
