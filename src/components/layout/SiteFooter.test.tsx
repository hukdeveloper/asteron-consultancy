import type { ReactElement } from "react";
import { render, screen, within } from "@testing-library/react";
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
      screen.getByRole("navigation", { name: "Study" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/legal/privacy-policy");
  });

  it("includes a short disclaimer line, linking to the full Disclaimer page instead of repeating it", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(
      screen.getByText(/Information only\. No outcome is guaranteed\./i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Disclaimer" })).toHaveAttribute(
      "href",
      "/legal/disclaimer",
    );
  });

  it("has exactly six links in the Study and Services groups", async () => {
    render((await SiteFooter()) as ReactElement);

    const studyNav = screen.getByRole("navigation", { name: "Study" });
    expect(within(studyNav).getAllByRole("link")).toHaveLength(6);

    const servicesNav = screen.getByRole("navigation", { name: "Services" });
    expect(within(servicesNav).getAllByRole("link")).toHaveLength(6);
  });

  it("does not render placeholder social links", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(
      screen.queryByRole("link", {
        name: /Facebook|Instagram|LinkedIn|YouTube/i,
      }),
    ).not.toBeInTheDocument();
  });
});
