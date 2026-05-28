import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import { DEFAULT_SITE_LOCALE, isSiteLocale, type SiteLocale } from "./lib/locale";
import { SITE_URL } from "./lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

async function resolveLocale(): Promise<SiteLocale> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  const segment = pathname.split("/")[1] ?? "";
  return isSiteLocale(segment) ? segment : DEFAULT_SITE_LOCALE;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();

  return (
    <html lang={locale}>
      <head />
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
