"use client"; // Error boundaries must be Client Components

// global-error replaces the root layout entirely when the layout itself
// throws, so it must bring its own <html>/<body> and global stylesheet.
// metadata/generateMetadata are not supported here (see Next.js docs).
import "./globals.css";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 antialiased">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            A critical error occurred and this page could not be displayed.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="bg-primary text-primary-foreground mt-6 rounded-md px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
