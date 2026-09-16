import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EventDetailPage, { generateStaticParams } from "./page";

function renderEvent(slug: string) {
  return EventDetailPage({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("EventDetailPage", () => {
  it("generates static params for the sample event", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "study-abroad-planning-session" }]);
  });

  it("calls notFound for an unknown event slug", async () => {
    await expect(renderEvent("does-not-exist")).rejects.toThrow();
  });

  it("renders exactly one H1 and a schedule-tbd notice", async () => {
    render(
      (await renderEvent("study-abroad-planning-session")) as ReactElement,
    );
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(screen.getByText(/schedule to be announced/i)).toBeInTheDocument();
  });

  it("does not embed Event structured data for this sample entry", async () => {
    const { container } = render(
      (await renderEvent("study-abroad-planning-session")) as ReactElement,
    );
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));
    expect(payloads.some((p) => p["@type"] === "Event")).toBe(false);
  });

  it("does not provide a registration success flow", async () => {
    render(
      (await renderEvent("study-abroad-planning-session")) as ReactElement,
    );
    expect(
      screen.queryByText(/registration confirmed/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /register/i }),
    ).not.toBeInTheDocument();
  });
});
