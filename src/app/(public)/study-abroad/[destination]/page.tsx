import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";
import {
  getDestinationBySlug,
  getDestinations,
} from "@/lib/content/destinations";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((destination) => ({ destination: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/study-abroad/[destination]">): Promise<Metadata> {
  const { destination: slug } = await params;
  const destination = await getDestinationBySlug(slug);
  return { title: destination?.name ?? "Study Abroad" };
}

export default async function StudyAbroadDestinationPage({
  params,
}: PageProps<"/study-abroad/[destination]">) {
  const { destination: slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  return <ComingSoon title={destination.name} />;
}
