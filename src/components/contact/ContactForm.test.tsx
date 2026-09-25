import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./ContactForm";
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
  fireEvent.change(screen.getByLabelText(/Message/), {
    target: { value: "I would like guidance on studying in the UK." },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible inline errors and an error summary when submitted empty", async () => {
    render(<ContactForm contact={contact} />);
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    const summary = await screen.findByRole("alert");
    expect(summary).toBeInTheDocument();
    expect(
      (await screen.findAllByText("Enter your full name.")).length,
    ).toBeGreaterThan(0);
  });

  it("does not make any network request on submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ContactForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await screen.findByText(/Online submission is not connected yet/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("does not log field values to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<ContactForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await screen.findByText(/Online submission is not connected yet/);

    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows the not-connected message on a valid submission, never a fake success", async () => {
    render(<ContactForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(
        "Online submission is not connected yet. Your information has not been sent or stored. Please contact Janan by phone, email or WhatsApp.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/successfully sent/i)).not.toBeInTheDocument();
  });

  it("shows the demo notice and sensitive-data warning before the form fields", () => {
    render(<ContactForm contact={contact} />);
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
    render(<ContactForm contact={contact} />);

    fillValidFields();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await screen.findByText(/Online submission is not connected yet/);

    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
