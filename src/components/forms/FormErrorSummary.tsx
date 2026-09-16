import type { RefObject } from "react";
import { AlertCircle } from "lucide-react";

import { FORM_ERROR_SUMMARY_HEADING } from "@/lib/forms/messages";

interface FormErrorEntry {
  field: string;
  message?: string;
}

interface FormErrorSummaryProps {
  id: string;
  errors: FormErrorEntry[];
  summaryRef: RefObject<HTMLDivElement | null>;
}

/**
 * Shared, keyboard-reachable error summary. Rendered only when
 * `errors.length > 0`; each link's `href="#field"` moves focus to the
 * corresponding control (every field in every form uses its schema key
 * as its `id`, so this always resolves). `summaryRef` lets the owning
 * form move focus here on every failed submit attempt via
 * `formState.submitCount`, so assistive technology re-announces it even
 * when the same fields are still invalid.
 */
export function FormErrorSummary({
  id,
  errors,
  summaryRef,
}: FormErrorSummaryProps) {
  if (errors.length === 0) return null;

  return (
    <div
      ref={summaryRef}
      id={id}
      role="alert"
      tabIndex={-1}
      className="border-destructive/40 bg-destructive/10 rounded-xl border p-4 outline-none"
    >
      <div className="flex items-center gap-2">
        <AlertCircle aria-hidden="true" className="text-destructive size-4" />
        <p className="text-destructive text-sm font-semibold">
          {FORM_ERROR_SUMMARY_HEADING}
        </p>
      </div>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        {errors.map(({ field, message }) => (
          <li key={field}>
            <a
              href={`#${field}`}
              className="text-destructive text-sm underline underline-offset-2"
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
