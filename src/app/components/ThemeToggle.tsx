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
      className="w-fit border border-gray-300 rounded-md px-2 py-1 lg:py-[.5px] text-xs lg:text-sm uppercase mt-10 lg:mt-0 lg:mb-5 font-semibold tracking-wider flex flex-row items-center gap-1 hover:cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
      transition-colors duration-300"
    >
      {isDark ? (
        <Sun size={14} strokeWidth={1.75} />
      ) : (
        <Moon size={14} strokeWidth={1.75} />
      )}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
