import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteLogo } from "./SiteLogo";

describe("SiteLogo", () => {
  it("exposes the full brand name as accessible text", () => {
    const { container } = render(<SiteLogo />);

    expect(container).toHaveTextContent("Janan Consultancy");
  });

  it("shows the tagline only in the full variant", () => {
    const { rerender } = render(<SiteLogo variant="compact" />);
    expect(
      screen.queryByText("Guidance Beyond Borders"),
    ).not.toBeInTheDocument();

    rerender(<SiteLogo variant="full" />);
    expect(screen.getByText("Guidance Beyond Borders")).toBeInTheDocument();
  });
});
