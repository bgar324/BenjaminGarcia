'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, MouseEvent, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface RandomImageHoverProps {
  children: React.ReactNode;
  images: string[];
}

export default function RandomImageHover({ children, images }: RandomImageHoverProps) {
  const [activeImage, setActiveImage] = useState<string>('');
  const [displayImage, setDisplayImage] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  
  const currentIndexRef = useRef<number>(0);
  const lastActiveTimeRef = useRef<number>(0);
  const preloadPromisesRef = useRef<Map<string, Promise<void>>>(new Map());
  const loadedImagesRef = useRef<Record<string, boolean>>({});
  const isMountedRef = useRef<boolean>(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xOffset = 100;
  const yOffset = 75;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    loadedImagesRef.current = loadedImages;
  }, [loadedImages]);

  const preloadImage = useCallback((src: string) => {
    if (typeof window === 'undefined' || !src) return Promise.resolve();
    if (loadedImagesRef.current[src]) return Promise.resolve();

    const existingPromise = preloadPromisesRef.current.get(src);
    if (existingPromise) return existingPromise;

    const promise = new Promise<void>((resolve) => {
      const image = new window.Image();
      let settled = false;

      const markLoaded = () => {
        if (settled) return;
        settled = true;
        if (isMountedRef.current) {
          loadedImagesRef.current = { ...loadedImagesRef.current, [src]: true };
          setLoadedImages((prev) => {
            if (prev[src]) return prev;
            return { ...prev, [src]: true };
          });
        }
        resolve();
      };

      const markDone = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      image.onload = markLoaded;
      image.onerror = markDone;
      image.src = src;

      if (typeof image.decode === 'function') {
        image.decode().then(markLoaded).catch(markDone);
      } else if (image.complete && image.naturalWidth > 0) {
        markLoaded();
      }
    }).finally(() => {
      preloadPromisesRef.current.delete(src);
    });

    preloadPromisesRef.current.set(src, promise);
    return promise;
  }, []);

  useEffect(() => {
    images.forEach((src) => {
      void preloadImage(src);
    });
  }, [images, preloadImage]);

  useEffect(() => {
    if (activeImage && loadedImages[activeImage]) {
      setDisplayImage(activeImage);
      return;
    }

    if (!displayImage) {
      const firstLoaded = images.find((src) => loadedImages[src]);
      if (firstLoaded) setDisplayImage(firstLoaded);
    }
  }, [activeImage, displayImage, images, loadedImages]);

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    x.set(e.clientX - xOffset);
    y.set(e.clientY - yOffset);
  };

  const handleMouseEnter = async (e: MouseEvent<HTMLSpanElement>) => {
    if (images.length === 0) return;

    x.set(e.clientX - xOffset);
    y.set(e.clientY - yOffset);
    setIsOpen(true);

    const now = Date.now();
    let nextImage = '';

    if (now - lastActiveTimeRef.current < 150) {
      nextImage = activeImage || images[currentIndexRef.current];
    } else {
      const index = currentIndexRef.current;
      nextImage = images[index];
      currentIndexRef.current = (index + 1) % images.length;
    }

    setActiveImage(nextImage);
    if (loadedImagesRef.current[nextImage]) {
      setDisplayImage(nextImage);
      return;
    }

    await preloadImage(nextImage);
    if (!isMountedRef.current) return;
    if (loadedImagesRef.current[nextImage]) {
      setDisplayImage(nextImage);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    lastActiveTimeRef.current = Date.now();
  };

  const imageToRender = loadedImages[activeImage] ? activeImage : displayImage;

  return (
    <span
      className="relative inline-block cursor-none py-1 px-1 -my-1 -mx-1 rounded-sm [&_*]:cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.span
            key="tooltip"
            className="fixed z-50 w-[200px] h-[150px] rounded-xl pointer-events-none overflow-hidden"
            style={{
              x,
              y,
              top: 0,
              left: 0,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {imageToRender && (
              <Image
                src={imageToRender}
                alt="Preview"
                fill
                className="object-cover"
                sizes="200px"
                loading="eager"
              />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
