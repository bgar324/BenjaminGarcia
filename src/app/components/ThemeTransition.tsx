"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

export function useThemeTransition() {
  const { setTheme } = useTheme();

  const transition = useCallback(
    (_x: number, _y: number, newTheme: "light" | "dark") => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return { transition };
}
