import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileQuickActions } from "./MobileQuickActions";

describe("MobileQuickActions", () => {
  it("renders Call, WhatsApp, and Book links using centralized contact data", async () => {
    render((await MobileQuickActions()) as ReactElement);

    expect(screen.getByRole("link", { name: /Call Asteron/ })).toHaveAttribute(
      "href",
      "tel:+923000000000",
    );
    expect(
      screen.getByRole("link", { name: /Message Asteron on WhatsApp/ }),
    ).toHaveAttribute("href", "https://wa.me/923000000000");
    expect(
      screen.getByRole("link", { name: "Book a free consultation" }),
    ).toHaveAttribute("href", "/book-consultation");
  });
});
