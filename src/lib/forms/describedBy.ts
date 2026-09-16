/** `${id}-description`/`${id}-error` ids, joined for `aria-describedby` — only the ones that actually exist. Shared across every form in `src/components/forms/`. */
export function describedBy(
  id: string,
  hasDescription: boolean,
  hasError: boolean,
) {
  const ids: string[] = [];
  if (hasDescription) ids.push(`${id}-description`);
  if (hasError) ids.push(`${id}-error`);
  return ids.length > 0 ? ids.join(" ") : undefined;
}
