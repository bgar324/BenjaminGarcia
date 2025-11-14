import localFont from "next/font/local";

export const cabinet = localFont({
  src: [
    {
      path: "./CabinetGrotesk-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});
