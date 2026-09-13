import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SkipLink } from "@/components/shared/SkipLink";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
