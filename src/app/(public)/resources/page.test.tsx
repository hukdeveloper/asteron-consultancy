import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResourcesPage from "./page";

describe("ResourcesPage (hub)", () => {
  it("renders exactly one H1", async () => {
    render((await ResourcesPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Resources");
  });

  it("links to every initial article", async () => {
    render((await ResourcesPage()) as ReactElement);

    for (const [title, slug] of [
      [
        "How to Choose the Right Study Destination",
        "how-to-choose-the-right-study-destination",
      ],
      [
        "Documents Commonly Needed for University Applications",
        "documents-commonly-needed-for-university-applications",
      ],
      [
        "Understanding Student Travel and Health Insurance",
        "understanding-student-travel-and-health-insurance",
      ],
      [
        "How to Plan a Study Abroad Budget",
        "how-to-plan-a-study-abroad-budget",
      ],
      [
        "Questions to Ask During a University Consultation",
        "questions-to-ask-during-a-university-consultation",
      ],
      [
        "Preparing for Your Pre-departure Checklist",
        "preparing-your-pre-departure-checklist",
      ],
    ]) {
      const links = screen.getAllByRole("link", { name: title });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", `/resources/${slug}`);
      }
    }
  });

  it("shows category navigation", async () => {
    render((await ResourcesPage()) as ReactElement);
    expect(
      screen.getByRole("navigation", { name: "Resource categories" }),
    ).toBeInTheDocument();
  });

  it("labels the newsletter placeholder as not connected", async () => {
    render((await ResourcesPage()) as ReactElement);
    expect(screen.getByText(/not connected yet/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeDisabled();
  });

  it("shows a content-last-reviewed date", async () => {
    render((await ResourcesPage()) as ReactElement);
    expect(screen.getByText(/content last reviewed/i)).toBeInTheDocument();
  });
});
