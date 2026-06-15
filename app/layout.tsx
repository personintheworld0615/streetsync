import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "CivicPulse — Frictionless Civic Engagement & Smart Triage",
  description: "Reducing the friction of traditional city reporting systems through voice-activated reporting, real-time GPS telemetry, and smart municipal sorting.",
  keywords: ["CivicPulse", "BOS:311", "Congressional App Challenge", "voice reporting", "smart cities", "ADA accessibility"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable}`}>
      <body className="font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200">
        <div className="noise-overlay fixed inset-0 pointer-events-none z-50 opacity-40" />
        {children}
      </body>
    </html>
  );
}
