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
      name: "Book a Consultation",
    });
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/book-consultation");
    }
  });

  it("does not show the phone number in the header row (moved to the mobile menu, footer, and Contact page)", async () => {
    const { container } = render((await SiteHeader()) as ReactElement);

    // The mobile menu's contact block is rendered off-screen inside the
    // same DOM tree (a Radix Dialog portal target), so this checks the
    // header's own visible row specifically, not the whole subtree.
    expect(container.textContent).not.toContain("+92 300 0000000");
  });
});
