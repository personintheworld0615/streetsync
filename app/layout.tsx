import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreetSync — Frictionless Civic Reporting",
  description:
    "Report infrastructure and accessibility issues with voice, GPS, and photos. StreetSync deduplicates, prioritizes, and routes high-signal reports to municipal teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-canvas font-sans text-ink selection:bg-mint selection:text-brunswick">
        {children}
      </body>
    </html>
  );
}
