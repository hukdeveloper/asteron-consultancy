import { createElement } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import { resolveIcon } from "@/lib/icons";
import type { Event } from "@/types/content";

interface EventCardProps {
  event: Event;
}

const FORMAT_LABEL: Record<Event["format"], string> = {
  "in-person": "In person",
  online: "Online",
  hybrid: "Hybrid",
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="relative h-full transition-shadow focus-within:shadow-md hover:shadow-md">
      <CardContent className="flex h-full flex-col pt-6">
        <span
          aria-hidden="true"
          className="bg-secondary text-secondary-foreground flex size-10 shrink-0 items-center justify-center rounded-full"
        >
          {createElement(resolveIcon(event.icon), { className: "size-5" })}
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">{event.type}</Badge>
          <Badge variant="outline">{FORMAT_LABEL[event.format]}</Badge>
        </div>
        <h3 className="text-foreground mt-3 text-base font-semibold">
          <Link
            href={`/events/${event.slug}`}
            className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
          >
            {event.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {event.description}
        </p>
        <p className="text-muted-foreground mt-3 text-sm font-medium">
          {event.eventStatus === "schedule-tbd"
            ? "Schedule to be announced"
            : event.startAt}
        </p>
        {event.isSampleContent ? (
          <SampleContentBadge
            className="mt-3 self-start"
            label="Sample event"
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
