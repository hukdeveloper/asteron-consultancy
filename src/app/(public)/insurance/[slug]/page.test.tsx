import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InsuranceDetailPage, { generateStaticParams } from "./page";

function renderInsurance(slug: string) {
  return InsuranceDetailPage({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  });
}

describe("InsuranceDetailPage", () => {
  it("generates static params for all three insurance types", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual(
      [
        "student-health-insurance",
        "travel-insurance",
        "visitor-insurance",
      ].sort(),
    );
  });

  it("calls notFound for an unknown insurance slug", async () => {
    await expect(renderInsurance("dental-insurance")).rejects.toThrow();
  });

  describe("student-health-insurance (representative page)", () => {
    it("renders exactly one H1", async () => {
      render(
        (await renderInsurance("student-health-insurance")) as ReactElement,
      );
      const h1s = screen.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent("Student Health Insurance");
    });

    it("renders the expected template sections", async () => {
      render(
        (await renderInsurance("student-health-insurance")) as ReactElement,
      );

      expect(
        screen.getByRole("heading", {
          name: "What this cover is generally for",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Possible coverage areas" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Common exclusions" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Eligibility" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: "Information commonly needed for a quote",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Provider disclosure" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Claims support" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Frequently asked questions" }),
      ).toBeInTheDocument();
    });

    it("shows the global insurance disclosure", async () => {
      render(
        (await renderInsurance("student-health-insurance")) as ReactElement,
      );
      expect(
        screen.getByText(
          /Insurance coverage, premiums, eligibility, exclusions/,
        ),
      ).toBeInTheDocument();
    });

    it("links to the insurance quote page", async () => {
      render(
        (await renderInsurance("student-health-insurance")) as ReactElement,
      );
      const links = screen.getAllByRole("link", {
        name: "Request an Insurance Quote",
      });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", "/insurance-quote");
      }
    });

    it("uses 'may include' language rather than claiming universal coverage", async () => {
      const { container } = render(
        (await renderInsurance("student-health-insurance")) as ReactElement,
      );
      expect(container.textContent ?? "").toMatch(/may include/i);
    });
  });
});
