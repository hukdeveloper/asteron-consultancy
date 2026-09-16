import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServiceDetailPage, { generateStaticParams } from "./page";

function renderService(slug: string) {
  return ServiceDetailPage({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("ServiceDetailPage", () => {
  it("generates static params for all seven services", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual(
      [
        "study-abroad-counselling",
        "university-course-selection",
        "application-assistance",
        "visa-guidance",
        "scholarship-guidance",
        "accommodation-support",
        "pre-departure-guidance",
      ].sort(),
    );
  });

  it("calls notFound for an unknown service slug", async () => {
    await expect(renderService("does-not-exist")).rejects.toThrow();
  });

  describe("visa-guidance (representative service)", () => {
    it("renders exactly one H1 with the service's hero title", async () => {
      render((await renderService("visa-guidance")) as ReactElement);
      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent("Student Visa Guidance");
    });

    it("renders every required template section", async () => {
      render((await renderService("visa-guidance")) as ReactElement);

      expect(
        screen.getByRole("heading", { name: "What this service covers" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "What support includes" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Step-by-step process" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: "Information or documents commonly needed",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Important limitations" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Frequently asked questions" }),
      ).toBeInTheDocument();
    });

    it("shows the required visa notice verbatim", async () => {
      render((await renderService("visa-guidance")) as ReactElement);
      expect(
        screen.getByText(
          "Visa rules, documentation requirements, fees and processing times can change. Final decisions are made solely by the relevant government authority.",
        ),
      ).toBeInTheDocument();
    });

    it("never claims a guaranteed visa outcome", async () => {
      const { container } = render(
        (await renderService("visa-guidance")) as ReactElement,
      );
      const text = (container.textContent ?? "").toLowerCase();
      expect(text).not.toContain("guaranteed visa");
      expect(text).not.toContain("we guarantee visa");
    });

    it("shows the information-review disclaimer with the lastReviewed date", async () => {
      render((await renderService("visa-guidance")) as ReactElement);
      expect(screen.getByText(/last reviewed on/i)).toBeInTheDocument();
    });
  });

  describe("application-assistance", () => {
    it("shows the required academic-integrity statement verbatim", async () => {
      render((await renderService("application-assistance")) as ReactElement);
      expect(
        screen.getByText(
          "Asteron may guide applicants in presenting their own experience clearly, but applicants remain responsible for the truthfulness and originality of submitted material.",
        ),
      ).toBeInTheDocument();
    });
  });

  describe("scholarship-guidance", () => {
    it("shows the required scholarship disclaimer verbatim", async () => {
      render((await renderService("scholarship-guidance")) as ReactElement);
      expect(
        screen.getByText(
          "Scholarships are awarded by the relevant institution or funding body. Guidance does not guarantee selection or funding.",
        ),
      ).toBeInTheDocument();
    });
  });
});
