"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MarqueeProps {
  speed?: number;
  className?: string;
}

const techImages = [
  {
    src: "/static/tech/next.webp",
    darkSrc: "/static/tech/nextdark.png",
    alt: "Next.js",
  },
  { src: "/static/tech/react.webp", alt: "React" },
  { src: "/static/tech/typescript.png", alt: "TypeScript" },
  { src: "/static/tech/python.webp", alt: "Python" },
  { src: "/static/tech/postgres.png", alt: "PostgreSQL" },
  { src: "/static/tech/lambda.png", alt: "Lambda" },
  { src: "/static/tech/tailwind.webp", alt: "Tailwind CSS" },
  { src: "/static/tech/redux.png", alt: "Redux" },
  { src: "/static/tech/prisma.png", alt: "Prisma" },
  { src: "/static/tech/firebase.png", alt: "Firebase" },
  { src: "/static/tech/c++.webp", alt: "C++" },
];

export default function Marquee({ speed = 3, className = "" }: MarqueeProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap select-none pointer-events-none ${className}`}
    >
      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${Math.max(5, 100 / speed)}s` }}
      >
        {[...techImages, ...techImages].map((img, i) => {
          const src =
            resolvedTheme === "dark" && img.darkSrc ? img.darkSrc : img.src;

          return (
            <Image
              key={i}
              src={src}
              alt={img.alt}
              width={48}
              height={48}
              className="h-12 w-auto mx-8"
              priority={i < 6} // only first row loads eagerly
            />
          );
        })}
      </div>
    </div>
  );
}
