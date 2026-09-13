import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders centralized contact data", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(
      screen.getByRole("link", { name: "+92 300 0000000" }),
    ).toHaveAttribute("href", "tel:+923000000000");
    expect(
      screen.getByRole("link", { name: "hello@example.com" }),
    ).toHaveAttribute("href", "mailto:hello@example.com");
    expect(screen.getByText("Islamabad, Pakistan")).toBeInTheDocument();
  });

  it("renders data-driven footer link groups and legal links", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(
      screen.getByRole("navigation", { name: "Study Abroad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/legal/privacy-policy");
  });

  it("includes a general-guidance disclaimer", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(screen.getByText(/general guidance only/i)).toBeInTheDocument();
  });
});
