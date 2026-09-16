import { events, eventsIntro } from "@/content/events";
import type { Event } from "@/types/content";

export async function getEvents(): Promise<Event[]> {
  return events.filter((event) => event.contentStatus === "published");
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const all = await getEvents();
  return all.find((event) => event.slug === slug);
}

export async function getEventsIntro(): Promise<string> {
  return eventsIntro;
}
