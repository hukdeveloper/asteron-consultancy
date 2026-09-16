import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InsuranceQuotePage from "./page";

describe("InsuranceQuotePage", () => {
  it("renders exactly one H1", async () => {
    render((await InsuranceQuotePage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Request an Insurance Quote");
  });

  it("labels the form as a development/demo form", async () => {
    render((await InsuranceQuotePage()) as ReactElement);
    expect(
      screen.getByText(/Development demo form — not yet connected/i),
    ).toBeInTheDocument();
  });

  it("shows the privacy notice covering all required points", async () => {
    render((await InsuranceQuotePage()) as ReactElement);
    expect(
      screen.getByText(/is not transmitted or stored/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/do not enter passport numbers/i),
    ).toBeInTheDocument();
  });

  it("does not ask for a passport number or medical history field", async () => {
    render((await InsuranceQuotePage()) as ReactElement);
    expect(screen.queryByLabelText(/passport/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/medical history/i)).not.toBeInTheDocument();
  });

  it("renders the insurance quote form", async () => {
    render((await InsuranceQuotePage()) as ReactElement);
    expect(
      screen.getByRole("button", { name: "Request Quote" }),
    ).toBeInTheDocument();
  });
});
