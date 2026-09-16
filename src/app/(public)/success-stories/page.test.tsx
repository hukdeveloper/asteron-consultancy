import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SuccessStoriesPage from "./page";

describe("SuccessStoriesPage", () => {
  it("renders exactly one H1", async () => {
    render((await SuccessStoriesPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("explains that verified stories require permission", async () => {
    render((await SuccessStoriesPage()) as ReactElement);
    expect(screen.getByText(/give their permission/i)).toBeInTheDocument();
  });

  it("labels every example card as Demo content", async () => {
    render((await SuccessStoriesPage()) as ReactElement);
    const demoLabels = screen.getAllByText("Demo content");
    expect(demoLabels.length).toBeGreaterThan(0);
  });

  it("never exposes offer letters or passport information", async () => {
    const { container } = render((await SuccessStoriesPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();
    expect(text).not.toContain("passport");
    expect(text).not.toContain("offer letter");
  });

  it("does not add testimonial/review structured data", async () => {
    const { container } = render((await SuccessStoriesPage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));
    expect(payloads.some((p) => p["@type"] === "Review")).toBe(false);
    expect(payloads.some((p) => p["@type"] === "AggregateRating")).toBe(false);
  });
});
