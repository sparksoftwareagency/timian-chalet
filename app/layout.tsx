import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timian Chalet",
  description: "Mountain retreat website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} antialiased`}>
        <div className="mobile-coming-soon" aria-live="polite">
          Coming soon.
        </div>
        <div className="desktop-site-content">{children}</div>
      </body>
    </html>
  );
}
