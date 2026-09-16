import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PostgraduatePage from "./page";

describe("PostgraduatePage", () => {
  it("renders exactly one H1", async () => {
    render((await PostgraduatePage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Postgraduate Study Abroad");
  });

  it("renders the qualification, timeline, document and funding sections", async () => {
    render((await PostgraduatePage()) as ReactElement);

    expect(
      screen.getByRole("heading", { name: /Qualification considerations/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /A general planning timeline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /General document checklist/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Course selection and funding/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Frequently asked questions/i }),
    ).toBeInTheDocument();
  });

  it("states that requirements vary rather than making a universal claim", async () => {
    const { container } = render((await PostgraduatePage()) as ReactElement);
    expect((container.textContent ?? "").toLowerCase()).toMatch(
      /vary|varies|varying/,
    );
  });

  it("exposes an accessible consultation CTA", async () => {
    render((await PostgraduatePage()) as ReactElement);
    const link = screen.getAllByRole("link", {
      name: "Book Free Consultation",
    })[0];
    expect(link).toHaveAttribute("href", "/book-consultation");
  });
});
