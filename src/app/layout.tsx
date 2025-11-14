import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { cabinet } from "./fonts/cabinet";
import "./globals.css";


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
        className="antialiased bg-white dark:bg-black"
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
