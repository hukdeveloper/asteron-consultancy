import { describe, expect, it } from "vitest";

import { events } from "./events";

describe("events content", () => {
  it("has unique ids and slugs", () => {
    const ids = events.map((event) => event.id);
    const slugs = events.map((event) => event.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("marks every current event as sample content with no confirmed schedule", () => {
    for (const event of events) {
      expect(event.isSampleContent).toBe(true);
      expect(event.eventStatus).toBe("schedule-tbd");
      expect(event.startAt).toBeUndefined();
      expect(event.endAt).toBeUndefined();
    }
  });

  it("never invents a speaker name, location, capacity or registration URL", () => {
    for (const event of events) {
      expect(event.speaker).toBeUndefined();
      expect(event.location).toBeUndefined();
      expect(event.capacity).toBeUndefined();
      expect(event.registrationUrl).toBeUndefined();
    }
  });
});
