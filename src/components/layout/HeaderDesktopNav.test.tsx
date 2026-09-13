import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { HeaderDesktopNav } from "./HeaderDesktopNav";
import type { NavItem } from "@/types/content";

const items: NavItem[] = [
  { id: "about", label: "About", href: "/about" },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: [
      { id: "all-services", label: "All Services", href: "/services" },
      { id: "visa", label: "Visa Guidance", href: "/services/visa-guidance" },
    ],
  },
];

describe("HeaderDesktopNav", () => {
  it("renders a flat link for items without children", () => {
    render(<HeaderDesktopNav items={items} />);

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders a dropdown trigger for items with children", () => {
    render(<HeaderDesktopNav items={items} />);

    expect(
      screen.getByRole("button", { name: /Services/ }),
    ).toBeInTheDocument();
  });
});
