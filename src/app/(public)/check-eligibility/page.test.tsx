import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CheckEligibilityPage from "./page";

describe("CheckEligibilityPage", () => {
  it("renders exactly one H1", async () => {
    render((await CheckEligibilityPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Check Your Eligibility");
  });

  it("renders the eligibility form but never an automated eligibility result", async () => {
    render((await CheckEligibilityPage()) as ReactElement);
    expect(
      screen.getByRole("button", { name: "Check Eligibility" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /This initial form does not determine admission, scholarship or visa eligibility/,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/you are eligible/i)).not.toBeInTheDocument();
  });

  it("renders the general eligibility factors and FAQ", async () => {
    render((await CheckEligibilityPage()) as ReactElement);
    expect(
      screen.getByRole("heading", {
        name: /Factors that typically affect eligibility/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Frequently asked questions/i }),
    ).toBeInTheDocument();
  });

  it("never promises a guaranteed eligibility outcome", async () => {
    // Affirmative-claim forms only — the page's own FAQ legitimately asks
    // "...guaranteed to be accepted..." as a negated question, same as the
    // homepage's "Do you guarantee admission..." FAQ (see home.test.ts).
    const { container } = render(
      (await CheckEligibilityPage()) as ReactElement,
    );
    const text = (container.textContent ?? "").toLowerCase();
    expect(text).not.toContain("we guarantee");
    expect(text).not.toContain("guaranteed eligibility");
    expect(text).not.toContain("100% eligible");
  });

  it("directs users to book a consultation instead of an online checker", async () => {
    render((await CheckEligibilityPage()) as ReactElement);
    const link = screen.getAllByRole("link", {
      name: "Book Free Consultation",
    })[0];
    expect(link).toHaveAttribute("href", "/book-consultation");
  });
});
