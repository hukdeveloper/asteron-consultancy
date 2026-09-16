import type { Event } from "@/types/content";

/**
 * Content for /events and /events/[slug]. No genuine event schedule
 * exists yet — every date, speaker, location and capacity below is either
 * omitted or clearly marked as sample-only. See docs/DECISIONS.md
 * "Events Policy": no registration success flow, no fabricated urgency.
 */

export const eventsIntro =
  "We don't have a confirmed event schedule to publish yet. The entry below is a labelled sample showing the kind of session we plan to run — no dates, speakers or registration links are invented.";

export const events: Event[] = [
  {
    id: "sample-event-1",
    slug: "study-abroad-planning-session",
    title: "Study Abroad Planning Session",
    type: "Free consultation webinar",
    description:
      "An introductory session covering how to approach choosing a destination, university and programme. This sample entry demonstrates the intended event format — it is not a scheduled, bookable session.",
    format: "online",
    eventStatus: "schedule-tbd",
    isSampleContent: true,
    icon: "CalendarClock",
    contentStatus: "published",
    seo: {
      metaTitle: "Study Abroad Planning Session (Sample Event)",
      metaDescription:
        "A sample event entry demonstrating the intended format for future study-abroad planning sessions — no schedule is confirmed yet.",
    },
  },
];
