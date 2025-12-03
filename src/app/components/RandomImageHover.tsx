'use client';

import { motion, useMotionValue } from 'framer-motion';
import React, { useState, useRef, MouseEvent } from 'react';
// 1. Import the Next.js Image component
import Image from 'next/image';

interface RandomImageHoverProps {
  children: React.ReactNode;
  images: string[]; 
}

export default function RandomImageHover({ children, images }: RandomImageHoverProps) {
  const [activeImage, setActiveImage] = useState<string>('');
  const [opacity, setOpacity] = useState(0);
  
  const currentIndexRef = useRef<number>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xOffset = 100;
  const yOffset = 75;

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    x.set(e.clientX - xOffset); 
    y.set(e.clientY - yOffset);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLSpanElement>) => {
    x.set(e.clientX - xOffset);
    y.set(e.clientY - yOffset);

    const index = currentIndexRef.current;
  
    setActiveImage(images[index]);

    currentIndexRef.current = (index + 1) % images.length;
    
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <span
      className="relative inline-block cursor-none [&_*]:cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {activeImage && (
        <motion.span
          // The container keeps its fixed dimensions (w-200 h-150)
          className="fixed z-50 w-[200px] h-[150px] rounded-lg pointer-events-none shadow-xl border border-neutral-200 dark:border-neutral-800 bg-white overflow-hidden" 
          style={{
            x,
            y,
            opacity,
            position: 'fixed', 
            top: 0, 
            left: 0,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.8, 
          }}
          animate={{ opacity: opacity, scale: opacity === 1 ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {/* 2. Replace <img> with <Image /> */}
          <Image
            src={activeImage}
            alt="Preview"
            // Use 'fill' prop to fill the parent container
            fill
            // Keep object-cover so it crops correctly within the 200x150 box
            className="object-cover" 
            // Optional: since these load on hover, you might want to prioritize them slightly, 
            // but default lazy loading is usually fine here.
            // priority 
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.span>
      )}
    </span>
  );
}