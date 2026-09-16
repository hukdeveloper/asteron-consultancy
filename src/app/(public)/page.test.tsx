import type { ReactElement } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders exactly one H1 with the hero heading", async () => {
    render((await HomePage()) as ReactElement);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Build your future beyond borders.");
  });

  it("exposes the primary and secondary hero CTAs with correct destinations", async () => {
    render((await HomePage()) as ReactElement);

    const bookLinks = screen.getAllByRole("link", {
      name: "Book Free Consultation",
    });
    expect(bookLinks.length).toBeGreaterThan(0);
    for (const link of bookLinks) {
      expect(link).toHaveAttribute("href", "/book-consultation");
    }

    const eligibilityLinks = screen.getAllByRole("link", {
      name: "Check Your Eligibility",
    });
    expect(eligibilityLinks.length).toBeGreaterThan(0);
    for (const link of eligibilityLinks) {
      expect(link).toHaveAttribute("href", "/check-eligibility");
    }
  });

  it("renders the six main services with links to their service pages", async () => {
    render((await HomePage()) as ReactElement);

    for (const title of [
      "Study Abroad Counselling",
      "University and Course Selection",
      "Application Assistance",
      "Student Visa Guidance",
      "Accommodation Support",
      "Pre-departure Guidance",
    ]) {
      expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
    }
  });

  it("renders the six featured destinations", async () => {
    render((await HomePage()) as ReactElement);

    for (const name of [
      "United Kingdom",
      "Australia",
      "Canada",
      "United States",
      "Germany",
      "Ireland",
    ]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("shows the required insurance disclaimer", async () => {
    render((await HomePage()) as ReactElement);

    expect(
      screen.getByText(
        "Asteron provides general guidance and quotation assistance. Coverage, eligibility, exclusions and policy issuance are determined by the relevant insurance provider.",
      ),
    ).toBeInTheDocument();
  });

  it("labels the success-stories area as sample/demo content", async () => {
    render((await HomePage()) as ReactElement);

    // Featured Universities and the sample Event section were removed
    // from the homepage in the Phase 10B visual reset (see
    // docs/DECISIONS.md "Visual Language Reset") — the homepage now shows
    // a single compact success-story example rather than a full card grid.
    expect(screen.getByText("Demo content")).toBeInTheDocument();
  });

  it("renders an accessible FAQ accordion that can be expanded", async () => {
    render((await HomePage()) as ReactElement);

    const question = screen.getByRole("button", {
      name: "Do you guarantee admission or visa approval?",
    });
    expect(question).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");

    const region = screen.getByText(
      /Admission and visa decisions are made solely/i,
    );
    expect(region).toBeInTheDocument();
  });

  it("never claims a guaranteed admission, visa, or scholarship outcome", async () => {
    const { container } = render((await HomePage()) as ReactElement);
    const text = container.textContent ?? "";

    for (const phrase of [
      "guaranteed admission",
      "guaranteed visa",
      "we guarantee admission",
      "we guarantee visa",
      "100% visa",
      "visa success rate",
    ]) {
      expect(text.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });

  it("embeds valid, non-fictional Organization/ProfessionalService structured data", async () => {
    const { container } = render((await HomePage()) as ReactElement);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.innerHTML ?? "{}");
    expect(data["@type"]).toBe("ProfessionalService");
    expect(data.name).toBe("Asteron Global Consultancy");
    expect(typeof data.url).toBe("string");
    // No fabricated ratings, reviews, opening hours, or coordinates.
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("openingHours");
    expect(data).not.toHaveProperty("geo");
  });

  it("keeps the announcement/hero region readable without a second competing landmark", async () => {
    render((await HomePage()) as ReactElement);
    // The page itself renders no <header>/<footer> — those belong to the
    // (public) layout, not the page — confirming no duplicated landmark.
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });
});

describe("HomePage sections", () => {
  it("renders section headings in a logical order without skipping levels", async () => {
    const { container } = render((await HomePage()) as ReactElement);
    const headings = within(container).getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.replace("H", "")));

    // h1 first, then only h2/h3 afterwards (no jump straight to h4+).
    expect(levels[0]).toBe(1);
    expect(levels.slice(1).every((level) => level === 2 || level === 3)).toBe(
      true,
    );
  });
});
