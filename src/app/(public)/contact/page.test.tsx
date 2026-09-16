import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "./page";

describe("ContactPage", () => {
  it("renders exactly one H1", async () => {
    render((await ContactPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("shows phone, email and WhatsApp contact methods", async () => {
    render((await ContactPage()) as ReactElement);
    expect(screen.getAllByText("Phone").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Email").length).toBeGreaterThan(0);
    expect(screen.getAllByText("WhatsApp").length).toBeGreaterThan(0);
  });

  it("shows the general location and office-hours placeholder", async () => {
    render((await ContactPage()) as ReactElement);
    expect(screen.getAllByText(/Islamabad, Pakistan/).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText(/Office hours: to be confirmed/i),
    ).toBeInTheDocument();
  });

  it("shows a map placeholder without embedding a real map", async () => {
    const { container } = render((await ContactPage()) as ReactElement);
    expect(screen.getByText(/Map placeholder/i)).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("clearly labels temporary contact values", async () => {
    render((await ContactPage()) as ReactElement);
    expect(screen.getByText(/temporary placeholders/i)).toBeInTheDocument();
  });

  it("renders the contact form", async () => {
    render((await ContactPage()) as ReactElement);
    expect(
      screen.getByRole("button", { name: "Send Message" }),
    ).toBeInTheDocument();
  });
});
