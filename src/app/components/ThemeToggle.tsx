"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTactilePress } from "./useTactilePress";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const press = useTactilePress({ includeSpaceKey: true });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  const transitionClass =
    "transition-all duration-300";

  return (
    <motion.div
      initial={false}
      animate={
        press.shouldReduceMotion
          ? undefined
          : { scale: press.pressScale, y: press.pressY }
      }
      transition={press.pressTransition}
      style={{ transformOrigin: "center center" }}
      className="w-fit"
    >
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        onPointerDown={press.onPressPointerDown}
        onPointerUp={press.onPressPointerUp}
        onPointerLeave={press.onPressPointerLeave}
        onPointerCancel={press.onPressPointerCancel}
        onKeyDown={press.onPressKeyDown}
        onKeyUp={press.onPressKeyUp}
        onBlur={press.onPressBlur}
        aria-label="Toggle dark mode"
        className="group relative w-fit border border-gray-300 rounded-md pl-1 pr-2 py-1 text-xs uppercase mt-10 mb-5 lg:mt-0 lg:mb-5 font-semibold tracking-wider flex flex-row items-center gap-0.5 hover:cursor-pointer
        transition-colors duration-300"
      >
        <span className="relative w-4 h-4 flex items-center justify-center pb-[1px]">
          <Moon
            size={12}
            strokeWidth={2}
            className={`absolute pb-[0.5px] ${transitionClass} ${
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
          className="transition-opacity duration-300"
          key={isDark ? "light" : "dark"}
        >
          {isDark ? "Light" : "Dark"}
        </span>
      </button>
    </motion.div>
  );
}
