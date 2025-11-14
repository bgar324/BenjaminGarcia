import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { cabinet } from "./fonts/cabinet";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benjamin Garcia",
  description: "Personal portfolio of Benjamin Garcia",
  icons: {
    icon: "/static/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cabinet.variable} suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <Providers>
          <Analytics />
          <SpeedInsights />
          {children}
        </Providers>
      </body>
    </html>
  );
}
