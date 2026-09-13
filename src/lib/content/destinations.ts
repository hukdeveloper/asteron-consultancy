import { destinations } from "@/content/destinations";
import type { DestinationSummary } from "@/types/content";

export async function getDestinations(): Promise<DestinationSummary[]> {
  return destinations.filter(
    (destination) => destination.status === "published",
  );
}

export async function getDestinationBySlug(
  slug: string,
): Promise<DestinationSummary | undefined> {
  const all = await getDestinations();
  return all.find((destination) => destination.slug === slug);
}
