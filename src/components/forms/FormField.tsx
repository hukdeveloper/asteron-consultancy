import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
}

/**
 * Shared accessible field wrapper reused by every form: label with a
 * required indicator that isn't colour-only ("*" plus, for required
 * fields, an implicit visual weight — screen readers get it from the
 * control's own `aria-required`/`required` attribute, set by each form's
 * `register()` call), optional description, and an inline error message.
 * The control itself is passed as `children` so this works for
 * `<input>`, `<textarea>`, and Controller-wrapped Radix `Select`/
 * `Checkbox` alike.
 */
export function FormField({
  label,
  htmlFor,
  required,
  description,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        ) : (
          <span className="text-muted-foreground font-normal">(optional)</span>
        )}
      </Label>
      {description ? (
        <p
          id={`${htmlFor}-description`}
          className="text-muted-foreground text-xs"
        >
          {description}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-destructive text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
