"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      // CHANGED: Added 'mb-5' to base classes to match SectionHeader
      className="group relative w-fit border border-gray-300 rounded-md px-2 py-1 lg:py-[.5px] text-xs lg:text-sm uppercase mt-10 mb-5 lg:mt-0 lg:mb-5 font-semibold tracking-wider flex flex-row items-center gap-1 hover:cursor-pointer
      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
      hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <span className="relative w-4 h-4">
        <Moon
          size={14}
          strokeWidth={1.75}
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Sun
          size={14}
          strokeWidth={1.75}
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </span>
      <span
        className="transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        key={isDark ? "light" : "dark"}
      >
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}