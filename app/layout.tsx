import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreetSync — Frictionless Civic Reporting",
  description:
    "Simplifying communication between residents and municipal governments with voice activation, auto-telemetry, and intelligent deduplication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} antialiased`}>
      <body className="bg-canvas text-charcoal selection:bg-mint-highlight selection:text-brunswick min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
