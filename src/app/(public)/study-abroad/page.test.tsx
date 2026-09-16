import type { ReactElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StudyAbroadPage from "./page";

describe("StudyAbroadPage (hub)", () => {
  it("renders exactly one H1", async () => {
    render((await StudyAbroadPage()) as ReactElement);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders a working link to every destination", async () => {
    render((await StudyAbroadPage()) as ReactElement);

    for (const [name, slug] of [
      ["United Kingdom", "united-kingdom"],
      ["Australia", "australia"],
      ["Canada", "canada"],
      ["United States", "united-states"],
      ["Germany", "germany"],
      ["Ireland", "ireland"],
    ]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", `/study-abroad/${slug}`);
    }
  });

  it("links to the undergraduate and postgraduate pages", async () => {
    render((await StudyAbroadPage()) as ReactElement);

    expect(screen.getByRole("link", { name: /Undergraduate/ })).toHaveAttribute(
      "href",
      "/study-abroad/undergraduate",
    );
    expect(screen.getByRole("link", { name: /Postgraduate/ })).toHaveAttribute(
      "href",
      "/study-abroad/postgraduate",
    );
  });

  it("presents the destination comparison as general notes, not a ranking", async () => {
    render((await StudyAbroadPage()) as ReactElement);
    expect(
      screen.getByText(/general starting point for comparison/i),
    ).toBeInTheDocument();
  });

  it("embeds BreadcrumbList and FAQPage structured data matching visible content", async () => {
    const { container } = render((await StudyAbroadPage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));

    const breadcrumb = payloads.find((p) => p["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();

    const faqPage = payloads.find((p) => p["@type"] === "FAQPage");
    expect(faqPage).toBeDefined();
    expect(faqPage.mainEntity.length).toBeGreaterThan(0);
    for (const entry of faqPage.mainEntity) {
      expect(screen.getByText(entry.name as string)).toBeInTheDocument();
    }
  });

  it("never claims Asteron controls admission or visa outcomes", async () => {
    const { container } = render((await StudyAbroadPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();

    for (const phrase of [
      "guaranteed admission",
      "guaranteed visa",
      "we guarantee admission",
      "we guarantee visa",
    ]) {
      expect(text).not.toContain(phrase);
    }
  });

  it("renders section headings without skipping levels", async () => {
    const { container } = render((await StudyAbroadPage()) as ReactElement);
    const headings = within(container).getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.replace("H", "")));

    expect(levels[0]).toBe(1);
    expect(levels.slice(1).every((level) => level === 2 || level === 3)).toBe(
      true,
    );
  });
});
