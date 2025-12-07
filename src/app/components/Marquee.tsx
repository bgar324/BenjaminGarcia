"use client";

import React from "react";
import Image from "next/image";

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

const TechIcon = ({ item, priority }: { item: typeof techImages[0], priority: boolean }) => {
  const baseClass = "object-contain h-8 w-auto mx-4 md:h-12 md:mx-8 transition-all duration-300";
  
  if (item.darkSrc) {
    return (
      <>
        {/* Light Mode */}
        <Image
          src={item.src}
          alt={item.alt}
          width={48}
          height={48}
          className={`${baseClass} dark:hidden`}
          priority={priority}
        />
        {/* Dark Mode */}
        <Image
          src={item.darkSrc}
          alt={item.alt}
          width={48}
          height={48}
          className={`${baseClass} hidden dark:block`}
          priority={priority}
        />
      </>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={48}
      height={48}
      className={baseClass}
      priority={priority}
    />
  );
};

export default function Marquee({ speed = 30, className = "" }: MarqueeProps) {
  const marqueeContent = [...techImages, ...techImages, ...techImages];

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap select-none group ${className}`}
    >
      {/* Left Fade - Responsive width */}
      <div className="absolute left-0 top-0 h-full w-12 md:w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />

      {/* Right Fade - Responsive width */}
      <div className="absolute right-0 top-0 h-full w-12 md:w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

      <div
        className="flex w-max animate-marquee transform-gpu group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {marqueeContent.map((img, i) => (
          <TechIcon 
            key={`${img.alt}-${i}`} 
            item={img} 
            priority={i < 10} 
          />
        ))}
      </div>
    </div>
  );
}