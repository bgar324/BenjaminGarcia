import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,ts}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
