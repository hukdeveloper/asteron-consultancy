import { createElement } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { PageHeader } from "@/components/shared/PageHeader";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import { Badge } from "@/components/ui/badge";
import { getEventBySlug, getEvents } from "@/lib/content/events";
import { getSiteContent } from "@/lib/content/site";
import { resolveIcon } from "@/lib/icons";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Events" };

  const title = event.seo.metaTitle ?? event.title;
  const description = event.seo.metaDescription ?? event.description;
  const path = `/events/${event.slug}`;

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

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const site = await getSiteContent();

  // Never emit Event structured data for a "schedule to be announced" or
  // sample event — only a genuine event with valid dates qualifies.
  const canEmitEventJsonLd =
    !event.isSampleContent &&
    event.eventStatus === "scheduled" &&
    event.startAt;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Events", path: "/events" },
          { label: event.title },
        ])}
      />
      {canEmitEventJsonLd ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.description,
            startDate: event.startAt,
            endDate: event.endAt,
            eventAttendanceMode:
              event.format === "online"
                ? "https://schema.org/OnlineEventAttendanceMode"
                : event.format === "hybrid"
                  ? "https://schema.org/MixedEventAttendanceMode"
                  : "https://schema.org/OfflineEventAttendanceMode",
            organizer: { "@type": "Organization", name: site.name },
          }}
        />
      ) : null}

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Events", href: "/events" },
              { label: event.title },
            ]}
            className="mb-6"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{event.type}</Badge>
            {event.isSampleContent ? (
              <SampleContentBadge label="Sample event" />
            ) : null}
          </div>

          <div className="mt-3 flex items-start gap-4">
            <span
              aria-hidden="true"
              className="bg-secondary text-secondary-foreground flex size-12 shrink-0 items-center justify-center rounded-full"
            >
              {createElement(resolveIcon(event.icon), { className: "size-6" })}
            </span>
            <PageHeader
              heading={event.title}
              description={event.description}
              className="mt-0"
            />
          </div>

          <NoticeCallout className="mt-6">
            {event.eventStatus === "schedule-tbd"
              ? "Schedule to be announced — no date, time, speaker or registration link is confirmed yet."
              : "Event details are general guidance only and may change."}
          </NoticeCallout>
        </Container>
      </Section>

      <FinalCtaSection
        cta={{
          heading: "Don't want to wait for a confirmed date?",
          description: "Book a free one-to-one consultation any time.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: { label: "Back to Events", href: "/events" },
        }}
        contact={site.contact}
      />
    </>
  );
}
