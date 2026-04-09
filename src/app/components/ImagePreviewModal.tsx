"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const MODAL_EASE = [0.32, 0.72, 0, 1] as const;
const MODAL_TRANSITION = { duration: 0.3, ease: MODAL_EASE };

interface ImagePreviewModalProps {
  alt: string;
  ariaLabel?: string;
  containerClassName?: string;
  height?: number;
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
  sizes?: string;
  src: string;
  width?: number;
}

export default function ImagePreviewModal({
  alt,
  ariaLabel = "Expanded image preview",
  containerClassName = "max-w-5xl",
  height = 900,
  isOpen,
  onClose,
  returnFocusRef,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  src,
  width = 1600,
}: ImagePreviewModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    if (!returnFocusRef?.current) return;

    requestAnimationFrame(() => {
      returnFocusRef.current?.focus();
    });
  }, [isOpen, returnFocusRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          style={{ touchAction: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <motion.div
            ref={modalContentRef}
            className={`relative w-full ${containerClassName}`}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={MODAL_TRANSITION}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 p-2 text-gray-100 hover:text-white transition-colors duration-300 bg-black/60 rounded-full backdrop-blur-sm hover:bg-black/80 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label="Close image preview"
              autoFocus
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={90}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
              draggable={false}
              sizes={sizes}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
