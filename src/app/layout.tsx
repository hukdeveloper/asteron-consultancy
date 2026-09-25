import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { JsonLd } from "@/components/shared/JsonLd";
import { SkipLink } from "@/components/shared/SkipLink";
import { getSiteContent } from "@/lib/content/site";
import { getSocialLinks } from "@/lib/content/social-links";
import { env } from "@/lib/env";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/structuredData";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, socialLinks] = await Promise.all([
    getSiteContent(),
    getSocialLinks(),
  ]);
  const sameAs = socialLinks
    .filter((social) => !social.disabled)
    .map((social) => social.href);

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd
          data={buildOrganizationJsonLd({
            name: site.name,
            description: site.description,
            contact: site.contact,
            sameAs,
          })}
        />
        <JsonLd data={buildWebSiteJsonLd({ name: site.name })} />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
