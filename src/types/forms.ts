/**
 * Shared form architecture types — see docs/TECHNICAL_ARCHITECTURE.md §5
 * and docs/DECISIONS.md "Form Architecture (Phase 7)".
 *
 * Every current-track form (Consultation, Eligibility, Insurance Quote,
 * Contact) shares this same submission-adapter contract. Track 1's only
 * implementation is `notConfiguredAdapter`
 * (src/lib/forms/adapters/notConfiguredAdapter.ts), which makes no
 * network request and always resolves `{status: "not-configured"}`. A
 * future Track 2 (real submission service) or Track 3 (Strapi) adapter
 * implements the same `SubmissionAdapter` interface — no form component
 * should need to change when that happens.
 */

export type SubmissionStatus =
  "success" | "validation-error" | "not-configured" | "service-error";

export type SubmissionResult =
  | { status: "success" }
  | { status: "validation-error"; message: string }
  | { status: "not-configured" }
  | { status: "service-error"; message: string };

/**
 * A form calls `submit(payload)` after its own client-side (Zod) validation
 * already passed — this interface does not replace that validation, it
 * only decides what happens to a valid payload. `payload` is intentionally
 * `unknown`: the adapter must not assume a specific form's shape, and must
 * never log, store, or transmit it in the current track.
 */
export interface SubmissionAdapter {
  submit(payload: unknown): Promise<SubmissionResult>;
}
