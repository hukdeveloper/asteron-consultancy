import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("links the logo to the homepage", async () => {
    render((await SiteHeader()) as ReactElement);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("exposes the primary consultation CTA", async () => {
    render((await SiteHeader()) as ReactElement);

    const ctas = screen.getAllByRole("link", {
      name: "Book Free Consultation",
    });
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/book-consultation");
    }
  });
});
