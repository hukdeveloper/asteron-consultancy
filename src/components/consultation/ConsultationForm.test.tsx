import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ConsultationForm } from "./ConsultationForm";
import type { ContactInfo } from "@/types/content";

const contact: ContactInfo = {
  phone: "+923000000000",
  phoneDisplay: "+92 300 0000000",
  whatsapp: "+923000000000",
  whatsappDisplay: "+92 300 0000000",
  email: "hello@example.com",
  address: "Islamabad, Pakistan",
};

/** YYYY-MM-DD `daysFromNow` days from today, in local time. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function fillValidFields() {
  fireEvent.change(screen.getByLabelText(/Full name/), {
    target: { value: "Jordan Smith" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: "jordan@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Phone number/), {
    target: { value: "+92 300 1234567" },
  });
  fireEvent.change(
    screen.getByLabelText(/Current or most recent qualification/),
    {
      target: { value: "BSc Computer Science" },
    },
  );
  fireEvent.change(screen.getByLabelText(/Preferred date/), {
    target: { value: isoDateDaysFromNow(14) },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("ConsultationForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible inline errors and an error summary when submitted empty", async () => {
    render(<ConsultationForm contact={contact} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );

    const summary = await screen.findByRole("alert");
    expect(summary).toBeInTheDocument();
    expect(
      (await screen.findAllByText("Enter your full name.")).length,
    ).toBeGreaterThan(0);
  });

  it("shows the preference-only notice", () => {
    render(<ConsultationForm contact={contact} />);
    expect(
      screen.getByText(/Your selected date and time are preferences/),
    ).toBeInTheDocument();
  });

  it("rejects a preferred date in the past", async () => {
    render(<ConsultationForm contact={contact} />);
    fillValidFields();
    fireEvent.change(screen.getByLabelText(/Preferred date/), {
      target: { value: "2000-01-01" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );

    expect(
      (await screen.findAllByText("Preferred date cannot be in the past."))
        .length,
    ).toBeGreaterThan(0);
  });

  it("does not make any network request on a valid submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ConsultationForm contact={contact} />);

    fillValidFields();
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );

    await screen.findByText(/Online submission is not connected yet/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows the not-connected message on a valid submission, never a fake success or booking confirmation", async () => {
    render(<ConsultationForm contact={contact} />);

    fillValidFields();
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );

    expect(
      await screen.findByText(
        "Online submission is not connected yet. Your information has not been sent or stored. Please contact Janan by phone, email or WhatsApp.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/confirmed/i)).not.toBeInTheDocument();
  });

  it("shows real contact links alongside the not-connected message", async () => {
    render(<ConsultationForm contact={contact} />);
    fillValidFields();
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );

    await waitFor(() => {
      expect(screen.getByText(`Call ${contact.phoneDisplay}`)).toHaveAttribute(
        "href",
        `tel:${contact.phone}`,
      );
    });
  });

  it("does not log any field values to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<ConsultationForm contact={contact} />);

    fillValidFields();
    fireEvent.click(
      screen.getByRole("button", { name: "Request Consultation" }),
    );
    await screen.findByText(/Online submission is not connected yet/);

    expect(logSpy).not.toHaveBeenCalled();
  });
});
