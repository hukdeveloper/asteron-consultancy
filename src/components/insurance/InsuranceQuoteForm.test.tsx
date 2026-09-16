import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InsuranceQuoteForm } from "./InsuranceQuoteForm";
import { insuranceServices } from "@/content/insurance";
import type { ContactInfo } from "@/types/content";

const contact: ContactInfo = {
  phone: "+923000000000",
  phoneDisplay: "+92 300 0000000",
  whatsapp: "+923000000000",
  whatsappDisplay: "+92 300 0000000",
  email: "hello@example.com",
  address: "Islamabad, Pakistan",
};

function renderForm() {
  return render(
    <InsuranceQuoteForm
      contact={contact}
      insuranceServices={insuranceServices}
    />,
  );
}

/** YYYY-MM-DD `daysFromNow` days from today, in local time — keeps the form's date fields valid regardless of when tests run. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

async function fillValidFields() {
  fireEvent.change(screen.getByLabelText(/Full name/), {
    target: { value: "Jordan Smith" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: "jordan@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Phone number/), {
    target: { value: "+92 300 1234567" },
  });
  fireEvent.change(screen.getByLabelText(/Destination/), {
    target: { value: "United Kingdom" },
  });
  fireEvent.change(screen.getByLabelText(/Travel or coverage start date/), {
    target: { value: isoDateDaysFromNow(30) },
  });
  fireEvent.change(screen.getByLabelText(/End date or expected duration/), {
    target: { value: isoDateDaysFromNow(200) },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth/), {
    target: { value: "2003-05-14" },
  });
  fireEvent.change(screen.getByLabelText(/Number of travellers/), {
    target: { value: "1" },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("InsuranceQuoteForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible inline errors and an error summary when submitted empty", async () => {
    renderForm();

    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));

    const summary = await screen.findByRole("alert");
    expect(summary).toBeInTheDocument();

    expect(
      (await screen.findAllByText("Enter your full name.")).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Enter a valid email address.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("You must agree before submitting.").length,
    ).toBeGreaterThan(0);
  });

  it("associates each error message with its field via aria-describedby", async () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));
    await screen.findByRole("alert");

    const fullNameInput = screen.getByLabelText(/Full name/);
    expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
    expect(fullNameInput.getAttribute("aria-describedby")).toContain(
      "fullName-error",
    );
  });

  it("does not make any network request on submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderForm();

    await fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));

    await screen.findByText(/Online submission is not connected yet/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows the required not-connected message on a valid submission, never a fake success", async () => {
    renderForm();

    await fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));

    expect(
      await screen.findByText(
        "Online submission is not connected yet. Your information has not been sent or stored. Please contact Asteron by phone, email or WhatsApp.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/successfully submitted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/thank you.*submission/i),
    ).not.toBeInTheDocument();
  });

  it("shows real contact links alongside the not-connected message", async () => {
    renderForm();
    await fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));

    await waitFor(() => {
      expect(screen.getByText(`Call ${contact.phoneDisplay}`)).toHaveAttribute(
        "href",
        `tel:${contact.phone}`,
      );
    });
    expect(screen.getByText(`Email ${contact.email}`)).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
  });

  it("does not log any field values to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    renderForm();

    await fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));
    await screen.findByText(/Online submission is not connected yet/);

    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows the demo notice and sensitive-data warning before the form fields", () => {
    renderForm();
    expect(
      screen.getByText(
        /currently available for demonstration and validation only/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Do not enter passport numbers/),
    ).toBeInTheDocument();
  });

  it("does not write to localStorage or sessionStorage on submission", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    renderForm();

    await fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Request Quote" }));
    await screen.findByText(/Online submission is not connected yet/);

    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
