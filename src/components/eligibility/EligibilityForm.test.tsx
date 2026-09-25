import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { EligibilityForm } from "./EligibilityForm";
import type { ContactInfo } from "@/types/content";

const contact: ContactInfo = {
  phone: "+923000000000",
  phoneDisplay: "+92 300 0000000",
  whatsapp: "+923000000000",
  whatsappDisplay: "+92 300 0000000",
  email: "hello@example.com",
  address: "Islamabad, Pakistan",
};

function fillValidFields() {
  fireEvent.change(screen.getByLabelText(/Full name/), {
    target: { value: "Jordan Smith" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: "jordan@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Phone or WhatsApp/), {
    target: { value: "+92 300 1234567" },
  });
  fireEvent.change(screen.getByLabelText(/Country of residence/), {
    target: { value: "Pakistan" },
  });
  fireEvent.change(screen.getByLabelText(/Nationality/), {
    target: { value: "Pakistani" },
  });
  fireEvent.change(screen.getByLabelText(/Highest qualification/), {
    target: { value: "BSc Computer Science" },
  });
  fireEvent.change(screen.getByLabelText(/Institution/), {
    target: { value: "Example University" },
  });
  fireEvent.change(screen.getByLabelText(/Graduation year/), {
    target: { value: "2024" },
  });
  fireEvent.change(screen.getByLabelText(/Grade, CGPA or percentage/), {
    target: { value: "78%" },
  });
  fireEvent.click(screen.getByLabelText("United Kingdom"));
  fireEvent.change(screen.getByLabelText(/Intended subject area/), {
    target: { value: "Data Science" },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: /I understand/ }));
}

describe("EligibilityForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the required non-eligibility-determination notice", () => {
    render(<EligibilityForm contact={contact} />);
    expect(
      screen.getByText(
        /This initial form does not determine admission, scholarship or visa eligibility/,
      ),
    ).toBeInTheDocument();
  });

  it("shows accessible inline errors and an error summary when submitted empty", async () => {
    render(<EligibilityForm contact={contact} />);
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));

    const summary = await screen.findByRole("alert");
    expect(summary).toBeInTheDocument();
    expect(
      (await screen.findAllByText("Enter your full name.")).length,
    ).toBeGreaterThan(0);
  });

  it(
    "hides English-test fields until 'test taken' is checked, then requires them",
    { timeout: 15000 },
    async () => {
      render(<EligibilityForm contact={contact} />);
      expect(screen.queryByLabelText(/Test type/)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Overall score/)).not.toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("checkbox", {
          name: /I have taken an English language test/,
        }),
      );
      expect(screen.getByLabelText(/Test type/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Overall score/)).toBeInTheDocument();

      fillValidFields();
      fireEvent.click(
        screen.getByRole("button", { name: "Check Eligibility" }),
      );
      expect(
        (await screen.findAllByText("Select the English test you took."))
          .length,
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText("Enter your overall score.").length,
      ).toBeGreaterThan(0);
    },
  );

  it("hides study-gap details until a gap is indicated, then requires it", async () => {
    render(<EligibilityForm contact={contact} />);
    expect(
      screen.queryByLabelText(/Briefly describe your study gap/),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /I have a gap in my study history/,
      }),
    );
    expect(
      screen.getByLabelText(/Briefly describe your study gap/),
    ).toBeInTheDocument();

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));
    expect(
      (await screen.findAllByText("Briefly describe your study gap.")).length,
    ).toBeGreaterThan(0);
  });

  it("requires at least one preferred destination", async () => {
    render(<EligibilityForm contact={contact} />);
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));
    expect(
      (await screen.findAllByText("Select at least one destination.")).length,
    ).toBeGreaterThan(0);
  });

  it("does not make any network request on a valid submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<EligibilityForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));

    await screen.findByText(/Online submission is not connected yet/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows the not-connected message on a valid submission and never an eligibility result", async () => {
    render(<EligibilityForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));

    expect(
      await screen.findByText(
        "Online submission is not connected yet. Your information has not been sent or stored. Please contact Janan by phone, email or WhatsApp.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/you are eligible/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/not eligible/i)).not.toBeInTheDocument();
  });

  it("shows real contact links alongside the not-connected message", async () => {
    render(<EligibilityForm contact={contact} />);
    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));

    await waitFor(() => {
      expect(screen.getByText(`Call ${contact.phoneDisplay}`)).toHaveAttribute(
        "href",
        `tel:${contact.phone}`,
      );
    });
  });

  it("does not log any field values to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<EligibilityForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Check Eligibility" }));
    await screen.findByText(/Online submission is not connected yet/);

    expect(logSpy).not.toHaveBeenCalled();
  });
});
