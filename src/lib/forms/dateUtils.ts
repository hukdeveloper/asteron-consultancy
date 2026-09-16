/**
 * Timezone-safe helpers for date-only (`YYYY-MM-DD`, as produced by native
 * `<input type="date">`) comparisons. Deliberately avoids
 * `Date.prototype.toISOString()` for "today" (which converts to UTC and
 * can shift the calendar date near midnight in most timezones) — instead
 * builds today's date string from the local `Date` object's own
 * year/month/day parts, matching what the browser's own date input
 * considers "today" for the user viewing the page.
 */
export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** True if `dateStr` (YYYY-MM-DD) is strictly before today's local date. */
export function isBeforeToday(dateStr: string): boolean {
  return dateStr < todayIsoDate();
}

/** True if `dateStr` (YYYY-MM-DD) is strictly after today's local date. */
export function isAfterToday(dateStr: string): boolean {
  return dateStr > todayIsoDate();
}
