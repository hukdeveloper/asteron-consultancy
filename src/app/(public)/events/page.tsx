import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { EventCard } from "@/components/events/EventCard";
import { getEvents, getEventsIntro } from "@/lib/content/events";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Events";
  const description =
    "Study-abroad information sessions and webinars — a confirmed schedule will be published here once available.";

  return {
    title,
    description,
    alternates: { canonical: "/events" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/events`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function EventsPage() {
  const [events, intro, site] = await Promise.all([
    getEvents(),
    getEventsIntro(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Events" }])} />

      <DetailHero
        breadcrumbItems={[{ label: "Events" }]}
        heading="Events"
        description={intro}
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{
          label: "Check Your Eligibility",
          href: "/check-eligibility",
        }}
        icons={["Calendar", "Users", "MapPin"]}
      />

      <Section className="bg-muted/50">
        <Container>
          {events.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground max-w-2xl text-base">
              No events are listed right now. Check back soon, or book a
              consultation for one-to-one guidance in the meantime.
            </p>
          )}
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Prefer one-to-one guidance now?",
          description:
            "You don't need to wait for an event — book a free consultation any time.",
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
