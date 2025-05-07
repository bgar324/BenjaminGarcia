"use client";

import React, { useEffect, useRef } from 'react';

interface MarqueeProps {
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  speed = -30,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const techImages = [
    { src: "/static/tech/react.webp", alt: "React" },
    { src: "/static/tech/next.webp", alt: "Next.js" },
    { src: "/static/tech/typescript.png", alt: "TypeScript" },
    { src: "/static/tech/tailwind.webp", alt: "Tailwind CSS" },
    { src: "/static/tech/prisma.svg", alt: "Prisma" },
    { src: "/static/tech/c++.webp", alt: "C++" },
    { src: "/static/tech/firebase.png", alt: "Firebase" },
    { src: "/static/tech/python.webp", alt: "Python" }
  ];

  // remove: html, javascript, bootstrap. replace with: firebase, typescript, prisma

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    const container = containerRef.current;
    const content = contentRef.current;

    const clone = content.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);
    
    let position = 0;
    let lastTimestamp = performance.now();
    
    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
    
      position += speed * (delta / 1000);
    
      if (position <= -content.offsetWidth) {
        position = 0;
      }
    
      container.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    
    return () => {
      cancelAnimationFrame(animation);
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden whitespace-nowrap relative select-none pointer-events-none ${className}`}>
      <div className="absolute -left-0.5 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      
      <div 
        ref={containerRef} 
        className="inline-block"
        style={{ willChange: 'transform' }}
      >
        <div ref={contentRef} className="inline-block">
          {techImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="inline-block h-12 w-auto mx-8" 
            />
          ))}
        </div>
      </div>

      <div className="absolute -right-0.5 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};

export default Marquee;