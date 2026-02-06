import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const simpleNathalie = localFont({
  src: "../../public/fonts/Simple Nathalie.otf",
  variable: "--font-simple-nathalie",
  display: "swap",
});

const sundayCharm = localFont({
  src: "../../public/fonts/Sunday Charm.otf", 
  variable: "--font-sunday-charm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Girl",
  description: "Pretty Lady",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${simpleNathalie.variable} ${sundayCharm.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
