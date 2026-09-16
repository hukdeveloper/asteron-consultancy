import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ScholarshipsPage from "./page";

describe("ScholarshipsPage (hub)", () => {
  it("renders exactly one H1", async () => {
    render((await ScholarshipsPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("explains that no active scholarship is published yet", async () => {
    render((await ScholarshipsPage()) as ReactElement);
    expect(
      screen.getByText(/haven't verified any active scholarship/i),
    ).toBeInTheDocument();
  });

  it("labels every template card clearly", async () => {
    render((await ScholarshipsPage()) as ReactElement);
    const labels = screen.getAllByText(
      "Content template — not an active scholarship",
    );
    expect(labels.length).toBeGreaterThan(0);
  });

  it("does not publish a deadline anywhere on the page", async () => {
    const { container } = render((await ScholarshipsPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();
    expect(text).not.toMatch(/deadline: \d/);
  });
});
