"use client";

import React, { useEffect, useRef } from "react";

interface MarqueeProps {
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ speed = -50, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Add data-dark only to images that have a dark variant
  const techImages = [
    { src: "/static/tech/next.webp", alt: "Next.js", darkSrc: "/static/tech/nextdark.png" },
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

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    const isDark = () => document.documentElement.classList.contains("dark");

    const applyThemeToImages = () => {
      // Update src for all imgs that have data attributes, in BOTH strips
      const imgs = container.querySelectorAll<HTMLImageElement>("img[data-light]");
      imgs.forEach((img) => {
        const light = img.getAttribute("data-light")!;
        const dark = img.getAttribute("data-dark");
        img.src = isDark() && dark ? dark : light;
      });
    };

    // 1) Apply correct src BEFORE cloning so the clone matches
    applyThemeToImages();

    // 2) Clone once
    const clone = content.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    // 3) Apply again (affects the cloned nodes too)
    applyThemeToImages();

    // 4) Watch for theme toggle (html.class changes) and re-apply
    const mo = new MutationObserver(applyThemeToImages);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // 5) Animate
    let position = 0;
    let last = performance.now();

    const animate = (t: number) => {
      const dt = t - last;
      last = t;

      position += speed * (dt / 1000);

      if (position <= -content.offsetWidth) position = 0;

      container.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden whitespace-nowrap relative select-none pointer-events-none ${className}`}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 dark:from-black" />
      {/* Right fade (fix duplicated left) */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 dark:from-black" />

      <div ref={containerRef} className="inline-block" style={{ willChange: "transform" }}>
        <div ref={contentRef} className="inline-block">
          {techImages.map((image, i) => (
            <img
              key={i}
              // Always render with data-light and optional data-dark
              data-light={image.src}
              data-dark={"darkSrc" in image ? (image as any).darkSrc : undefined}
              src={image.src} // will be corrected on mount by applyThemeToImages()
              alt={image.alt}
              className="inline-block h-12 w-auto mx-8"
              loading="eager"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
