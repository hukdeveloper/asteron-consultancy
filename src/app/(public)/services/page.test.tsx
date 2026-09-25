import type { ReactElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServicesPage from "./page";

describe("ServicesPage (hub)", () => {
  it("renders exactly one H1", async () => {
    render((await ServicesPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(
      "Practical support for every stage of your international journey.",
    );
  });

  it("links to every real service detail page", async () => {
    render((await ServicesPage()) as ReactElement);

    for (const [title, slug] of [
      ["Study Abroad Counselling", "study-abroad-counselling"],
      ["University and Course Selection", "university-course-selection"],
      ["Application Assistance", "application-assistance"],
      ["Student Visa Guidance", "visa-guidance"],
      ["Scholarship Guidance", "scholarship-guidance"],
      ["Accommodation Support", "accommodation-support"],
      ["Pre-departure Guidance", "pre-departure-guidance"],
    ]) {
      const links = screen.getAllByRole("link", { name: title });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", `/services/${slug}`);
      }
    }
  });

  it("shows the three primary service categories", async () => {
    render((await ServicesPage()) as ReactElement);
    expect(
      screen.getByRole("heading", { name: "Study Planning" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Application Preparation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Journey Preparation" }),
    ).toBeInTheDocument();
  });

  it("links to the insurance hub from the journey-preparation category", async () => {
    render((await ServicesPage()) as ReactElement);
    const insuranceLink = screen.getByRole("link", {
      name: "Insurance Guidance",
    });
    expect(insuranceLink).toHaveAttribute("href", "/insurance");
  });

  it("shows the required insurance disclaimer", async () => {
    render((await ServicesPage()) as ReactElement);
    expect(
      screen.getByText(
        "Janan provides general guidance and quotation assistance. Coverage, eligibility, exclusions and policy issuance are determined by the relevant insurance provider.",
      ),
    ).toBeInTheDocument();
  });

  it("shows an honest scope-and-limitations section", async () => {
    render((await ServicesPage()) as ReactElement);
    expect(
      screen.getByRole("heading", {
        name: "What we don't control or guarantee",
      }),
    ).toBeInTheDocument();
  });

  it("embeds BreadcrumbList and FAQPage structured data matching visible content", async () => {
    const { container } = render((await ServicesPage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));

    expect(payloads.some((p) => p["@type"] === "BreadcrumbList")).toBe(true);
    const faqPage = payloads.find((p) => p["@type"] === "FAQPage");
    expect(faqPage).toBeDefined();
    for (const entry of faqPage.mainEntity) {
      expect(screen.getByText(entry.name as string)).toBeInTheDocument();
    }
  });

  it("never claims a guaranteed admission, visa, or scholarship outcome", async () => {
    const { container } = render((await ServicesPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();

    for (const phrase of [
      "guaranteed admission",
      "guaranteed visa",
      "we guarantee admission",
      "we guarantee visa",
      "guaranteed scholarship",
    ]) {
      expect(text).not.toContain(phrase);
    }
  });

  it("renders section headings without skipping levels", async () => {
    const { container } = render((await ServicesPage()) as ReactElement);
    const headings = within(container).getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.replace("H", "")));

    expect(levels[0]).toBe(1);
    expect(levels.slice(1).every((level) => level === 2 || level === 3)).toBe(
      true,
    );
  });
});
