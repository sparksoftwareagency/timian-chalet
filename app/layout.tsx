import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { LanguageProvider } from "./i18n/LanguageContext";

const Footer = dynamic(() => import("./components/Footer"), { ssr: true });
const FloatingMenu = dynamic(() => import("./components/FloatingMenu"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timian Chalet | Mountain Retreat",
  description: "Transylvanian Mountain Retreat with modern comforts. Book your stay at Timian Chalet.",
  openGraph: {
    title: "Timian Chalet | Mountain Retreat",
    description: "Transylvanian Mountain Retreat with modern comforts. Book your stay at Timian Chalet.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timian Chalet | Mountain Retreat",
    description: "Transylvanian Mountain Retreat with modern comforts. Book your stay at Timian Chalet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <title>Timian Chalet | Mountain Retreat</title>
          {/* Preload critical resources */}
        <link rel="preload" href="/Timian2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/nature.jpg" as="image" />
        <link rel="preload" href="/the_chalet.jpg" as="image" />
        <link rel="preload" href="/nature-optimized.jpg" as="image" />
        <link rel="preload" href="/rooms-thumbnail.jpg" as="image" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          <FloatingMenu />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
