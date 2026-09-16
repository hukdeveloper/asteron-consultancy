import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders exactly one H1", async () => {
    render((await AboutPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("About Asteron");
  });

  it("shows the mission statement", async () => {
    render((await AboutPage()) as ReactElement);
    expect(
      screen.getByText(/make international education planning clearer/i),
    ).toBeInTheDocument();
  });

  it("shows a temporary-content note for company history", async () => {
    render((await AboutPage()) as ReactElement);
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });

  it("does not invent a founding year, accreditation or award", async () => {
    const { container } = render((await AboutPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();
    for (const forbidden of [
      "founded in",
      "accredited by",
      "award-winning",
      "licensed immigration adviser",
    ]) {
      expect(text).not.toContain(forbidden);
    }
  });

  it("links to the full team page", async () => {
    render((await AboutPage()) as ReactElement);
    expect(
      screen.getByRole("link", { name: "Meet the full team" }),
    ).toHaveAttribute("href", "/team");
  });

  it("links to both Services and Insurance to distinguish them", async () => {
    render((await AboutPage()) as ReactElement);
    expect(
      screen.getByRole("link", { name: "Explore Services" }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", { name: "Explore Insurance" }),
    ).toHaveAttribute("href", "/insurance");
  });
});
