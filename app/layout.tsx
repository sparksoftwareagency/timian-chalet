import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timian Chalet | Alpine Hotel",
  description: "A serene alpine retreat with modern comforts. Book your stay at Timian Chalet.",
  openGraph: {
    title: "Timian Chalet | Alpine Hotel",
    description: "A serene alpine retreat with modern comforts. Book your stay at Timian Chalet.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timian Chalet | Alpine Hotel",
    description: "A serene alpine retreat with modern comforts. Book your stay at Timian Chalet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
