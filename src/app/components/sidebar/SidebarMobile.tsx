"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profileImage, resumeHref, socialLinks } from "./shared";

const APP_EASE = [0.32, 0.72, 0, 1] as const;
const HEADER_TRANSITION = { duration: 0.3, ease: APP_EASE };
const MENU_TRANSITION = { duration: 0.18, ease: APP_EASE };

type SidebarMobileProps = {
  isImageModalOpen: boolean;
  onOpenImageModal: (triggerEl: HTMLButtonElement) => void;
};

export default function SidebarMobile({
  isImageModalOpen,
  onOpenImageModal,
}: SidebarMobileProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true);

  const isMobileHeaderVisibleRef = useRef(true);
  const lastScrollYRef = useRef(0);
  const directionAnchorYRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const menuItemDuration = 0.12;
  const menuItemBaseDelay = 0.04;
  const menuItemStepDelay = 0.03;
  const mobileMenuLinks = [
    ...socialLinks.map(({ href, label }) => ({
      href,
      label,
      variant: "link" as const,
    })),
    {
      href: resumeHref,
      label: "View Résumé",
      variant: "primary" as const,
    },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    isMobileHeaderVisibleRef.current = isMobileHeaderVisible;
  }, [isMobileHeaderVisible]);

  useEffect(() => {
    const minDelta = 3;
    const topRevealOffset = 32;
    const hideStartOffset = 88;
    const toggleAfter = 48;
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const resetScrollTracking = () => {
      lastScrollYRef.current = window.scrollY;
      directionAnchorYRef.current = window.scrollY;
      scrollDirectionRef.current = null;
    };

    const syncMobileHeaderVisibility = () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }

      setIsMobileHeaderVisible(true);
      resetScrollTracking();
    };

    const updateMobileHeaderVisibility = () => {
      scrollFrameRef.current = null;

      if (
        desktopMediaQuery.matches ||
        isMobileMenuOpen ||
        isImageModalOpen
      ) {
        resetScrollTracking();
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      lastScrollYRef.current = currentScrollY;

      if (Math.abs(delta) < minDelta) return;

      if (currentScrollY <= topRevealOffset) {
        directionAnchorYRef.current = currentScrollY;
        scrollDirectionRef.current = null;
        setIsMobileHeaderVisible(true);
        return;
      }

      const direction = delta > 0 ? "down" : "up";

      if (scrollDirectionRef.current !== direction) {
        scrollDirectionRef.current = direction;
        directionAnchorYRef.current = currentScrollY;
      }

      const travelSinceDirectionChange = Math.abs(
        currentScrollY - directionAnchorYRef.current
      );

      if (
        direction === "down" &&
        isMobileHeaderVisibleRef.current &&
        currentScrollY >= hideStartOffset &&
        travelSinceDirectionChange >= toggleAfter
      ) {
        directionAnchorYRef.current = currentScrollY;
        setIsMobileHeaderVisible(false);
      }

      if (
        direction === "up" &&
        !isMobileHeaderVisibleRef.current &&
        travelSinceDirectionChange >= toggleAfter
      ) {
        directionAnchorYRef.current = currentScrollY;
        setIsMobileHeaderVisible(true);
      }
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(
        updateMobileHeaderVisibility
      );
    };

    syncMobileHeaderVisibility();

    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopMediaQuery.addEventListener("change", syncMobileHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      desktopMediaQuery.removeEventListener(
        "change",
        syncMobileHeaderVisibility
      );

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [isImageModalOpen, isMobileMenuOpen]);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileHeaderVisible ? 1 : 0,
          y: isMobileHeaderVisible ? 0 : -24,
        }}
        transition={HEADER_TRANSITION}
        className="lg:hidden fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none 
        bg-gradient-to-b from-white/90 via-white/60 to-transparent 
        dark:from-black/90 dark:via-black/60 dark:to-transparent"
        aria-hidden="true"
      />

      <motion.div
        initial={false}
        animate={{
          opacity: isMobileHeaderVisible ? 1 : 0,
          y: isMobileHeaderVisible ? 0 : -96,
        }}
        transition={HEADER_TRANSITION}
        style={{ pointerEvents: isMobileHeaderVisible ? undefined : "none" }}
        className="lg:hidden fixed top-2 left-0 right-0 z-50 flex justify-center px-5 md:px-20 pointer-events-none"
      >
        <div
          className="
          w-full max-w-5xl pointer-events-auto
          border border-gray-200 dark:border-gray-600 
          bg-white/85 dark:bg-black backdrop-blur-xl
          rounded-lg flex flex-row items-center justify-between 
          p-3 shadow-md transition-colors duration-300
        "
        >
          <div className="flex items-center gap-3">
            <button
              onClick={(event) => onOpenImageModal(event.currentTarget)}
              className="flex-shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
              aria-label="View full photo of Benjamin Garcia"
            >
              <Image
                src={profileImage.src}
                alt={profileImage.alt}
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </button>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-gray-900 dark:text-slate-100 leading-tight">
                Benjamin Garcia
              </p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 font-medium leading-tight">
                I turn code into meaningful creations.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close full-screen menu"
                : "Open full-screen menu"
            }
          >
            {isMobileMenuOpen ? (
              <X
                size={20}
                strokeWidth={2.1}
                className="text-gray-600 dark:text-gray-300"
              />
            ) : (
              <Menu
                size={20}
                strokeWidth={2.1}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </button>
        </div>
      </motion.div>

      <div className="lg:hidden mb-8" />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.98 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.98 }}
            transition={MENU_TRANSITION}
            className="fixed inset-0 z-[60] bg-white dark:bg-black p-6 pt-24 flex flex-col lg:hidden overflow-hidden"
          >
            <div className="pointer-events-none absolute top-2 left-0 right-0 z-20 flex justify-center px-5 md:px-20">
              <div className="w-full max-w-5xl rounded-lg border border-transparent flex flex-row items-center justify-between p-3">
                <div className="invisible flex items-center gap-3" aria-hidden="true">
                  <div className="h-10 w-10 rounded-lg" />
                  <div className="flex flex-col">
                    <p className="text-sm font-bold leading-tight">
                      Benjamin Garcia
                    </p>
                    <p className="text-[11px] font-medium leading-tight">
                      I turn code into meaningful creations.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="pointer-events-auto relative flex h-10 w-10 translate-y-[6.5px] items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  type="button"
                  aria-label="Close full-screen menu"
                >
                  <X
                    size={20}
                    strokeWidth={2.1}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-1 justify-center items-center relative z-10">
              {mobileMenuLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    y: link.variant === "primary" ? 0 : -14,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: link.variant === "primary" ? 0 : -10,
                  }}
                  transition={{
                    duration: menuItemDuration,
                    delay: menuItemBaseDelay + index * menuItemStepDelay,
                    ease: APP_EASE,
                  }}
                  className={
                    link.variant === "primary"
                      ? "inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-lg font-medium text-white transition-transform duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-slate-100 dark:text-gray-950"
                      : "text-2xl font-semibold text-gray-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  }
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0">
              <span className="text-[35vh] font-bold text-black dark:text-white leading-none tracking-tighter pr-6">
                bg
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
