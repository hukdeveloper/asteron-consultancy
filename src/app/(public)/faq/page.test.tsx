import type { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FaqPage from "./page";

describe("FaqPage", () => {
  it("renders exactly one H1", async () => {
    render((await FaqPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("renders all eight category headings", async () => {
    render((await FaqPage()) as ReactElement);
    for (const category of [
      "General",
      "Study Abroad",
      "University Applications",
      "Visa Guidance",
      "Scholarships",
      "Insurance",
      "Accommodation",
      "Consultations",
    ]) {
      expect(
        screen.getByRole("heading", { name: category }),
      ).toBeInTheDocument();
    }
  });

  it("supports keyboard-accessible accordion expansion", async () => {
    render((await FaqPage()) as ReactElement);
    const question = screen.getByRole("button", {
      name: /Do you guarantee admission/i,
    });
    expect(question).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
  });

  it("embeds FAQPage structured data matching visible content", async () => {
    const { container } = render((await FaqPage()) as ReactElement);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));
    const faqPage = payloads.find((p) => p["@type"] === "FAQPage");
    expect(faqPage).toBeDefined();
    for (const entry of faqPage.mainEntity) {
      expect(screen.getByText(entry.name as string)).toBeInTheDocument();
    }
  });

  it("does not invent an exact service price", async () => {
    const { container } = render((await FaqPage()) as ReactElement);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[$£€]\s?\d/);
  });
});
