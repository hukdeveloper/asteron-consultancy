import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders a labelled breadcrumb landmark with an ordered list", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: "Visa Guidance" },
        ]}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.querySelector("ol")).toBeInTheDocument();
  });

  it("always includes a Home link first", () => {
    render(<Breadcrumbs items={[{ label: "Current" }]} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("marks the last item as the current page without a link", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: "Visa Guidance" },
        ]}
      />,
    );

    const current = screen.getByText("Visa Guidance");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).not.toBe("A");
  });
});
