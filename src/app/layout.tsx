import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { cabinet } from "./fonts/cabinet";
import "./globals.css";


export const metadata: Metadata = {
  title: "Benjamin Garcia",
  description: "Full-stack engineer building production interfaces at scale. Experience at Todd Agriscience, Bonterra, TensorStax. CS @ UCLA.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "frontend engineer",
    "React",
    "Next.js",
    "TypeScript",
    "UCLA",
    "computer science",
    "web development",
    "Benjamin Garcia",
  ],
  authors: [{ name: "Benjamin Garcia", url: "https://bentgarcia.com" }],
  creator: "Benjamin Garcia",
  publisher: "Benjamin Garcia",
  metadataBase: new URL("https://bentgarcia.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/static/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bentgarcia.com",
    title: "Benjamin Garcia",
    description: "Full-stack engineer building production interfaces at scale. Experience at Todd Agriscience, Bonterra, TensorStax. CS @ UCLA.",
    siteName: "Benjamin Garcia",
    images: [
      {
        url: "/static/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benjamin Garcia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamin Garcia",
    description: "Full-stack engineer building production interfaces at scale. Experience at Todd Agriscience, Bonterra, TensorStax. CS @ UCLA.",
    images: ["/static/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
