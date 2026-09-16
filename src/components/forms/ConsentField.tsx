import Link from "next/link";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FORM_CONSENT_LABEL } from "@/lib/forms/messages";

interface ConsentFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
}

/**
 * Shared, unchecked-by-default privacy-consent checkbox, reused by every
 * form. Never preselected; never bundles optional marketing consent,
 * since marketing isn't implemented (docs/DECISIONS.md "Form Architecture
 * (Phase 7)"). Links to the draft Privacy Policy.
 */
export function ConsentField<T extends FieldValues>({
  control,
  name,
  error,
}: ConsentFieldProps<T>) {
  const errorId = `${name}-error`;

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
        <Label
          htmlFor={name}
          className="text-foreground text-sm leading-snug font-normal"
        >
          {FORM_CONSENT_LABEL}{" "}
          <Link
            href="/legal/privacy-policy"
            className="underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          . <span aria-hidden="true">*</span>
        </Label>
      </div>
      {error ? (
        <p id={errorId} className="text-destructive mt-1.5 ml-6 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
