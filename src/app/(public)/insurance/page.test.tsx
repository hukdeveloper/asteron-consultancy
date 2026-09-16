import type { ReactElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InsurancePage from "./page";

describe("InsurancePage (hub)", () => {
  it("renders exactly one H1", async () => {
    render((await InsurancePage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(
      "Understand your insurance options before you travel.",
    );
  });

  it("links to all three insurance detail pages", async () => {
    render((await InsurancePage()) as ReactElement);

    for (const [title, slug] of [
      ["Student Health Insurance", "student-health-insurance"],
      ["Travel Insurance", "travel-insurance"],
      ["Visitor Insurance", "visitor-insurance"],
    ]) {
      expect(screen.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `/insurance/${slug}`,
      );
    }
  });

  it("shows the global insurance disclosure verbatim", async () => {
    render((await InsurancePage()) as ReactElement);
    expect(
      screen.getByText(
        "Asteron Global Consultancy provides general information and quotation assistance. Insurance coverage, premiums, eligibility, exclusions, claims and policy issuance are determined by the relevant insurance provider. Always review the provider's official policy wording before purchase.",
      ),
    ).toBeInTheDocument();
  });

  it("links to the insurance quote page", async () => {
    render((await InsurancePage()) as ReactElement);
    const links = screen.getAllByRole("link", {
      name: "Request an Insurance Quote",
    });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/insurance-quote");
    }
  });

  it("never implies Asteron is the insurer or guarantees claims/coverage", async () => {
    const { container } = render((await InsurancePage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();

    for (const phrase of [
      "asteron is an insurer",
      "asteron underwrites",
      "we guarantee coverage",
      "guaranteed claim",
    ]) {
      expect(text).not.toContain(phrase);
    }
  });

  it("embeds BreadcrumbList and FAQPage structured data", async () => {
    const { container } = render((await InsurancePage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));

    expect(payloads.some((p) => p["@type"] === "BreadcrumbList")).toBe(true);
    expect(payloads.some((p) => p["@type"] === "FAQPage")).toBe(true);
  });

  it("renders section headings without skipping levels", async () => {
    const { container } = render((await InsurancePage()) as ReactElement);
    const headings = within(container).getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.replace("H", "")));

    expect(levels[0]).toBe(1);
    expect(levels.slice(1).every((level) => level === 2 || level === 3)).toBe(
      true,
    );
  });
});
