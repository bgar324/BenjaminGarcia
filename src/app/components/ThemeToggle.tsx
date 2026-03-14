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

  const transitionClass =
    "transition-all duration-300";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="group relative w-fit border border-gray-300 rounded-md pl-1 pr-2 py-1 lg:py-[.5px] text-xs lg:text-sm uppercase mt-10 mb-5 lg:mt-0 lg:mb-5 font-semibold tracking-wider flex flex-row items-center gap-0.5 hover:cursor-pointer
      transition-colors duration-200 
      hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <span className="relative w-4 h-4 flex items-center justify-center pb-[1px]">
        <Moon
          size={12}
          strokeWidth={2}
          className={`absolute ${transitionClass} ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Sun
          size={12}
          strokeWidth={2}
          className={`absolute ${transitionClass} ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </span>

      <span
        className="transition-opacity duration-200"
        key={isDark ? "light" : "dark"}
      >
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
