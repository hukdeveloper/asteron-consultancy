import { useEffect, useId, useRef, useState } from "react";

import { notConfiguredAdapter } from "@/lib/forms/adapters/notConfiguredAdapter";

/**
 * Shared submit/focus-management behaviour for every demo form: calls the
 * current track's `notConfiguredAdapter` on a valid submission, and moves
 * focus to the error summary on every failed attempt (via
 * `formState.submitCount`, so it re-focuses even when the same fields are
 * still invalid — plain assistive-technology announcement of a
 * `role="alert"` region alone doesn't repeat on an unchanged DOM node).
 */
export function useDemoFormSubmit(submitCount: number, hasErrors: boolean) {
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitCount > 0 && hasErrors) {
      errorSummaryRef.current?.focus();
    }
    // Only re-run when a new submit attempt happens, not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);

  async function handleValidSubmit() {
    const result = await notConfiguredAdapter.submit(undefined);
    if (result.status === "not-configured") {
      setSubmitted(true);
    }
  }

  return { submitted, errorSummaryId, errorSummaryRef, handleValidSubmit };
}
