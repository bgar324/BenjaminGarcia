'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface RandomImageHoverProps {
  children: React.ReactNode;
  images: string[];
}

export default function RandomImageHover({ children, images }: RandomImageHoverProps) {
  const [activeImage, setActiveImage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  
  const currentIndexRef = useRef<number>(0);
  const lastActiveTimeRef = useRef<number>(0); // Cooldown tracker

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
    setIsOpen(true);

    const now = Date.now();
    // 1. COOLDOWN LOGIC
    // If the user left and came back within 150ms, keep the same image.
    // This prevents flickering when moving between words or lines.
    if (now - lastActiveTimeRef.current < 150) {
        if (activeImage === '') setActiveImage(images[currentIndexRef.current]);
        return;
    }

    // 2. IMAGE CYCLING
    const index = currentIndexRef.current;
    setActiveImage(images[index]);
    currentIndexRef.current = (index + 1) % images.length;
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    lastActiveTimeRef.current = Date.now(); // Record when they left
  };

  return (
    <span
      // 3. HITBOX OPTIMIZATION
      // Added py-1 and decoration-clone.
      // This creates a slightly larger invisible hit area around the text
      // so the mouse doesn't slip off easily.
      className="relative inline-block cursor-none py-1 px-1 -my-1 -mx-1 rounded-sm [&_*]:cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isOpen && activeImage && (
          <motion.span
            key="tooltip"
            className="fixed z-50 w-[200px] h-[150px] rounded-lg pointer-events-none shadow-xl border border-neutral-200 dark:border-neutral-800 bg-white overflow-hidden"
            style={{
              x,
              y,
              top: 0,
              left: 0,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Image
              src={activeImage}
              alt="Preview"
              fill
              className="object-cover"
              sizes="200px" // Optimized for the specific container size
              priority={true} // Optional: Helps load the current hover image faster
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}