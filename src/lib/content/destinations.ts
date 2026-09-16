import { destinations } from "@/content/destinations";
import type { Destination } from "@/types/content";

export async function getDestinations(): Promise<Destination[]> {
  return destinations.filter(
    (destination) => destination.contentStatus === "published",
  );
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | undefined> {
  const all = await getDestinations();
  return all.find((destination) => destination.slug === slug);
}
