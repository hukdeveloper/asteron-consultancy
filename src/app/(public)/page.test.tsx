import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the main heading", async () => {
    render((await HomePage()) as ReactElement);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Welcome to Asteron Global Consultancy/i,
      }),
    ).toBeInTheDocument();
  });
});
