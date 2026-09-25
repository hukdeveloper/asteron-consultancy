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
      screen.getByRole("link", { name: "info@jananconsultancy.com" }),
    ).toHaveAttribute("href", "mailto:info@jananconsultancy.com");
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

  it("renders the real, confirmed social links", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/share/18Z3uypvtM/",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/engr-janan-813241273",
    );
    expect(screen.getByRole("link", { name: "TikTok" })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@ur_jkx?_r=1&_t=ZS-99mtM0ksG2S",
    );
    expect(
      screen.getByRole("link", { name: "WhatsApp Channel" }),
    ).toHaveAttribute(
      "href",
      "https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R",
    );
  });

  it("does not render social links with no confirmed profile yet", async () => {
    render((await SiteFooter()) as ReactElement);

    expect(
      screen.queryByRole("link", { name: /^Instagram$/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /^YouTube$/i }),
    ).not.toBeInTheDocument();
  });
});
