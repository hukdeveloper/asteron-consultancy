import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ScholarshipDetailPage, { generateStaticParams } from "./page";

function renderScholarship(slug: string) {
  return ScholarshipDetailPage({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("ScholarshipDetailPage", () => {
  it("generates static params for both template records", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(2);
  });

  it("calls notFound for an unknown scholarship slug", async () => {
    await expect(renderScholarship("does-not-exist")).rejects.toThrow();
  });

  it("clearly marks the page as a content template, not an active scholarship", async () => {
    render(
      (await renderScholarship(
        "template-destination-based-scholarship",
      )) as ReactElement,
    );
    expect(
      screen.getAllByText(
        /this is a content template, not an active scholarship/i,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("does not publish an opening date or deadline", async () => {
    const { container } = render(
      (await renderScholarship(
        "template-destination-based-scholarship",
      )) as ReactElement,
    );
    expect(
      screen.getByText(/to be confirmed once verified/i),
    ).toBeInTheDocument();
    const text = (container.textContent ?? "").toLowerCase();
    expect(text).not.toMatch(/deadline: \d/);
  });
});
