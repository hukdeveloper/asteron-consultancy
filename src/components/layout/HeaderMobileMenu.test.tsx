import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { HeaderMobileMenu } from "./HeaderMobileMenu";
import type { ContactInfo, NavItem } from "@/types/content";

const items: NavItem[] = [{ id: "about", label: "About", href: "/about" }];
const primaryCta = {
  label: "Book Free Consultation",
  href: "/book-consultation",
};
const contact: ContactInfo = {
  phone: "+923000000000",
  phoneDisplay: "+92 300 0000000",
  whatsapp: "+923000000000",
  whatsappDisplay: "+92 300 0000000",
  email: "hello@example.com",
  address: "Islamabad, Pakistan",
};

describe("HeaderMobileMenu", () => {
  it("has an accessible menu trigger that is closed by default", () => {
    render(
      <HeaderMobileMenu
        items={items}
        primaryCta={primaryCta}
        contact={contact}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "About" }),
    ).not.toBeInTheDocument();
  });

  it("opens to reveal navigation and the consultation CTA", async () => {
    render(
      <HeaderMobileMenu
        items={items}
        primaryCta={primaryCta}
        contact={contact}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("link", { name: "About" });

    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: primaryCta.label }),
    ).toHaveAttribute("href", primaryCta.href);
  });
});
