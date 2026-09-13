import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders its label and responds to clicks", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Book a consultation</Button>);

    const button = screen.getByRole("button", { name: "Book a consultation" });
    expect(button).toBeInTheDocument();

    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables interaction when the disabled prop is set", () => {
    render(<Button disabled>Unavailable</Button>);

    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});
