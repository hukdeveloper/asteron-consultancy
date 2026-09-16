import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StudyAbroadDestinationPage, { generateStaticParams } from "./page";

function renderDestination(slug: string) {
  return StudyAbroadDestinationPage({
    params: Promise.resolve({ destination: slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("StudyAbroadDestinationPage", () => {
  it("generates static params for all six destinations", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.destination).sort()).toEqual(
      [
        "australia",
        "canada",
        "germany",
        "ireland",
        "united-kingdom",
        "united-states",
      ].sort(),
    );
  });

  it("calls notFound for an unknown destination slug", async () => {
    await expect(renderDestination("atlantis")).rejects.toThrow();
  });

  describe("United Kingdom (representative destination)", () => {
    it("renders exactly one H1 with the destination's hero title", async () => {
      render((await renderDestination("united-kingdom")) as ReactElement);
      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent("Study in the United Kingdom");
    });

    it("renders the expected template sections", async () => {
      render((await renderDestination("united-kingdom")) as ReactElement);

      expect(
        screen.getByRole("heading", { name: /Why consider United Kingdom/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Study levels and popular subject areas/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /A general application process/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Intakes and cost planning/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Scholarship and visa-document guidance/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Work, lifestyle and planning notes/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Frequently asked questions/i }),
      ).toBeInTheDocument();
    });

    it("shows the information-review disclaimer with the destination's lastReviewed date", async () => {
      render((await renderDestination("united-kingdom")) as ReactElement);
      expect(screen.getByText(/last reviewed on/i)).toBeInTheDocument();
      expect(screen.getByText("2026-09-13")).toBeInTheDocument();
    });

    it("never claims a guaranteed admission or visa outcome", async () => {
      const { container } = render(
        (await renderDestination("united-kingdom")) as ReactElement,
      );
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

    it("embeds BreadcrumbList and FAQPage structured data", async () => {
      const { container } = render(
        (await renderDestination("united-kingdom")) as ReactElement,
      );
      const scripts = container.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      const payloads = Array.from(scripts).map((s) => JSON.parse(s.innerHTML));

      expect(payloads.some((p) => p["@type"] === "BreadcrumbList")).toBe(true);
      expect(payloads.some((p) => p["@type"] === "FAQPage")).toBe(true);
    });
  });
});
