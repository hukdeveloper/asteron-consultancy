const MAIN_CONTENT_ID = "main-content";

/**
 * Visually hidden until focused, so keyboard users can jump past
 * repeated navigation straight to the main content landmark.
 */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

export { MAIN_CONTENT_ID };
