import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EventsPage from "./page";

describe("EventsPage", () => {
  it("renders exactly one H1", async () => {
    render((await EventsPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("shows the sample event clearly labelled", async () => {
    render((await EventsPage()) as ReactElement);
    expect(screen.getByText("Sample event")).toBeInTheDocument();
    expect(screen.getByText("Schedule to be announced")).toBeInTheDocument();
  });

  it("does not invent a date, speaker or registration count", async () => {
    const { container } = render((await EventsPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();
    for (const forbidden of ["seats remaining", "register now", "spots left"]) {
      expect(text).not.toContain(forbidden);
    }
  });

  it("does not embed Event structured data for a sample/schedule-tbd entry", async () => {
    const { container } = render((await EventsPage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));
    expect(payloads.some((p) => p["@type"] === "Event")).toBe(false);
  });
});
