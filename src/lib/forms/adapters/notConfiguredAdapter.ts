import type { SubmissionAdapter, SubmissionResult } from "@/types/forms";

/**
 * The current track's only `SubmissionAdapter` implementation. Every
 * current-track form (Consultation, Eligibility, Insurance Quote,
 * Contact) uses this adapter — there is no database, no API route, and no
 * external submission service to send anything to yet (see
 * docs/DECISIONS.md "Form Architecture (Phase 7)").
 *
 * Guarantees, all verified by tests in `notConfiguredAdapter.test.ts`:
 * - makes no network request (no `fetch`, no third-party SDK call)
 * - writes nothing to `localStorage`/`sessionStorage`/any other storage
 * - logs nothing to the console
 * - puts nothing in the URL or browser history
 * - never resolves `"success"` — a valid submission always yields
 *   `"not-configured"`, so the UI can never claim data was saved or sent.
 *
 * A future Track 2 (real form-service) or Track 3 (Strapi) adapter
 * implements this same `SubmissionAdapter` interface — see
 * `src/types/forms.ts`. No form component should need to change when
 * that adapter is swapped in; only the object passed to each form (or a
 * shared default-adapter selection point) changes.
 */
export const notConfiguredAdapter: SubmissionAdapter = {
  async submit(payload: unknown): Promise<SubmissionResult> {
    void payload;
    return { status: "not-configured" };
  },
};
