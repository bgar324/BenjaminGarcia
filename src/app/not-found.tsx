"use client";

import React, { useState, useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { FONT_OPTIONS } from "./fonts/not-found-fonts";

export default function NotFound() {
  const [resetKey, setResetKey] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  const onInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white dark:bg-black">
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex select-none" key={resetKey}>
          <FlickerDigit char="4" onInteraction={onInteraction} />
          <FlickerDigit char="0" onInteraction={onInteraction} />
          <FlickerDigit char="4" onInteraction={onInteraction} />
        </div>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
          The page you are looking for has been moved or doesn't exist.
        </p>

        <button
          onClick={handleReset}
          aria-label="Reset view"
          className={`mt-10 p-3 transition-all duration-1000 ease-in-out rounded-full group
            ${
              hasInteracted
                ? "opacity-30 hover:opacity-100 pointer-events-auto translate-y-0"
                : "opacity-0 pointer-events-none cursor-pointer"
            }
          `}
        >
          <RotateCcw
            size={18}
            className="text-black dark:text-white transition-transform duration-500 cursor-pointer"
          />
        </button>
      </div>
    </main>
  );
}

function FlickerDigit({
  char,
  onInteraction,
}: {
  char: string;
  onInteraction: () => void;
}) {
  const [currentFont, setCurrentFont] = useState<string>("inherit");
  const [isLocked, setIsLocked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startFlicker = () => {
    onInteraction();
    if (isLocked) return;

    intervalRef.current = setInterval(() => {
      const randomFont =
        FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)];
      setCurrentFont(randomFont);
    }, 140);
  };

  const stopFlicker = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isLocked) {
      setCurrentFont("inherit");
    }
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.preventDefault();
    onInteraction();
    if (isLocked) {
      setIsLocked(false);
      if (isHovering) startFlicker();
    } else {
      setIsLocked(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
        startFlicker();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stopFlicker();
      }}
      onClick={toggleLock}
      className={`cursor-pointer px-2 transition-all duration-150 ease-in-out ${
        isLocked ? "scale-110" : "hover:scale-105"
      }`}
      style={{ fontFamily: currentFont }}
    >
      <h1 className="text-[22vh] sm:text-[24vh] leading-none font-extrabold tracking-tighter text-black dark:text-white">
        {char}
      </h1>
    </div>
  );
}
