import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import {
  FORM_DEMO_NOTICE,
  FORM_SENSITIVE_DATA_WARNING,
} from "@/lib/forms/messages";

/** Required demo-mode notice shown before every form, plus the sensitive-data warning — see docs/DECISIONS.md "Form Architecture (Phase 7)". */
export function FormDemoNotice() {
  return (
    <div className="space-y-3">
      <SampleContentBadge
        className="h-auto w-full max-w-full text-wrap whitespace-normal sm:w-fit"
        label="Development demo form — not yet connected"
      />
      <NoticeCallout>{FORM_DEMO_NOTICE}</NoticeCallout>
      <p className="text-muted-foreground text-xs">
        {FORM_SENSITIVE_DATA_WARNING}
      </p>
    </div>
  );
}
