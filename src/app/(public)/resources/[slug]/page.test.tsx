import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResourceArticlePage, { generateStaticParams } from "./page";

function renderArticle(slug: string) {
  return ResourceArticlePage({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("ResourceArticlePage", () => {
  it("generates static params for all six articles", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(6);
  });

  it("calls notFound for an unknown article slug", async () => {
    await expect(renderArticle("does-not-exist")).rejects.toThrow();
  });

  describe("how-to-choose-the-right-study-destination (representative article)", () => {
    it("renders exactly one H1", async () => {
      render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent(
        "How to Choose the Right Study Destination",
      );
    });

    it("shows a reading-time estimate and reviewed date", async () => {
      render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      expect(screen.getByText(/min read/i)).toBeInTheDocument();
      expect(screen.getAllByText(/reviewed/i).length).toBeGreaterThan(0);
    });

    it("renders a table of contents linking to each section", async () => {
      render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      expect(
        screen.getByRole("navigation", { name: "Table of contents" }),
      ).toBeInTheDocument();
    });

    it("shows related resources", async () => {
      render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      expect(
        screen.getByRole("heading", { name: "Related resources" }),
      ).toBeInTheDocument();
    });

    it("shows a general-information notice", async () => {
      render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      expect(screen.getByText(/general information only/i)).toBeInTheDocument();
    });

    it("does not make specific legal, immigration, medical or financial claims", async () => {
      const { container } = render(
        (await renderArticle(
          "how-to-choose-the-right-study-destination",
        )) as ReactElement,
      );
      const text = (container.textContent ?? "").toLowerCase();
      expect(text).not.toMatch(/guaranteed|you will be approved/);
    });
  });
});
