"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, X, Menu, GitGraph, Expand } from "lucide-react";
import { LinkedInIcon, GitHubMarkIcon } from "../svgs/Icons";
import { ArrowUpRight } from "lucide-react";

const APP_EASE = [0.32, 0.72, 0, 1] as const;
const APP_TRANSITION = { duration: 0.4, ease: APP_EASE };
const QUICK_TRANSITION = { duration: 0.2, ease: APP_EASE };

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true);

  const imageModalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const scrollTravelRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const openImageModal = useCallback((triggerEl: HTMLButtonElement) => {
    imageModalTriggerRef.current = triggerEl;
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
    requestAnimationFrame(() => {
      imageModalTriggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isImageModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isImageModalOpen]);

  useEffect(() => {
    if (!isImageModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImageModal();
        return;
      }

      if (e.key === "Tab" && modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImageModalOpen, closeImageModal]);

  useEffect(() => {
    const hideAfter = 24;
    const revealAfter = 16;
    const topRevealOffset = 24;
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const resetScrollTracking = () => {
      lastScrollYRef.current = window.scrollY;
      scrollTravelRef.current = 0;
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

      if (Math.abs(delta) < 2) return;

      if (currentScrollY <= topRevealOffset) {
        scrollTravelRef.current = 0;
        scrollDirectionRef.current = null;
        setIsMobileHeaderVisible(true);
        return;
      }

      const direction = delta > 0 ? "down" : "up";

      if (scrollDirectionRef.current !== direction) {
        scrollDirectionRef.current = direction;
        scrollTravelRef.current = 0;
      }

      scrollTravelRef.current += Math.abs(delta);

      if (direction === "down" && scrollTravelRef.current >= hideAfter) {
        scrollTravelRef.current = 0;
        setIsMobileHeaderVisible(false);
      }

      if (direction === "up" && scrollTravelRef.current >= revealAfter) {
        scrollTravelRef.current = 0;
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
  }, [isMobileMenuOpen, isImageModalOpen]);

  const socialLinks = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      href: "mailto:bentgarcia05@gmail.com",
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/btgarcia05/",
    },
    {
      icon: <GitHubMarkIcon />,
      label: "GitHub",
      href: "https://github.com/bgar324",
    },
    {
      icon: <GitGraph size={18} />,
      label: "GitProof",
      href: "https://gitproof.dev/u/bgar324",
    },
  ];

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileHeaderVisible ? 1 : 0,
          y: isMobileHeaderVisible ? 0 : -24,
        }}
        transition={APP_TRANSITION}
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
        transition={APP_TRANSITION}
        style={{ pointerEvents: isMobileHeaderVisible ? undefined : "none" }}
        className="lg:hidden fixed top-2 left-0 right-0 z-50 flex justify-center px-5 md:px-20 pointer-events-none"
      >
        <div
          className="
          w-full max-w-5xl pointer-events-auto
          border border-gray-200 dark:border-gray-600 
          bg-white/85 dark:bg-black/85 backdrop-blur-xl
          rounded-lg flex flex-row items-center justify-between 
          p-3 shadow-md transition-colors duration-300
        "
        >
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => openImageModal(e.currentTarget)}
              className="flex-shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
              aria-label="View full photo of Benjamin Garcia"
            >
              <Image
                src="/static/me.jpeg"
                alt="Benjamin Garcia"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-gray-900 dark:text-slate-100 leading-tight">
                Benjamin Garcia
              </h1>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 font-medium leading-tight">
                I turn code into meaningful creations.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </motion.div>

      <div className="lg:hidden mb-8" />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={APP_TRANSITION}
            className="fixed inset-0 z-[60] bg-white dark:bg-black p-6 flex flex-col lg:hidden overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8 relative z-10">
              <span className="text-lg font-bold text-gray-400">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-1 justify-center items-center relative z-10">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  className="text-2xl font-semibold text-gray-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="mt-4 px-8 py-3 rounded-md bg-black dark:bg-slate-100 text-white dark:text-gray-950 font-medium text-lg active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                View Résumé
              </a>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0">
              <span className="text-[35vh] font-bold text-black dark:text-white leading-none tracking-tighter pr-6">
                bg
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <aside className="hidden lg:flex flex-col lg:w-[204px] lg:shrink-0 lg:gap-y-3 lg:sticky lg:top-10 h-fit">
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-2 transition-colors duration-300">
          <div className="relative group/img">
            <Image
              src="/static/me.jpeg"
              alt="Benjamin Garcia"
              width={698}
              height={800}
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQAA4DASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EACQQAAEDAwMEAwAAAAAAAAAAAAECAwQABREhEjFBBhMiURQyYf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECAxEhIv/aAAwDAQACEQMRAD8A3qKKKyNDBooooA//2Q=="
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 112px, 192px"
              className="h-auto w-full rounded-xl mb-2"
            />
            <button
              onClick={(e) => openImageModal(e.currentTarget)}
              className="
                absolute top-2 right-2 p-1.5 rounded-md
                bg-black/40 backdrop-blur-sm
                text-white/80 hover:text-white hover:bg-black/60
                opacity-0 group-hover/img:opacity-100
                transition-all duration-200 ease-in-out
                cursor-pointer
                focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
              "
              aria-label="Expand photo"
              title="Expand photo"
            >
              <Expand size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-1">
            <h1 className="text-gray-900 dark:text-slate-100 text-2xl font-semibold tracking-tight leading-none">
              Hello, I'm
            </h1>
            <h1 className="text-gray-900 dark:text-slate-100 text-2xl font-semibold tracking-tight">
              Benjamin Garcia
            </h1>
            <h3 className="text-gray-700 dark:text-slate-300 text-base leading-tight mt-2 font-normal">
              I turn code into meaningful creations.
            </h3>

            <div className="flex flex-row gap-1 items-center mt-2">
              <MapPin size={16} className="text-gray-500 dark:text-slate-400" />
              <a
                className="text-sm text-gray-500 dark:text-slate-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://www.google.com/maps/place/Westwood,+Los+Angeles,+CA/@34.0652211,-118.4610312,14z"
                target="_blank"
              >
                Los Angeles, California
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-2 transition-colors duration-300">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                title={link.label}
                className="
                  flex items-center justify-center aspect-square rounded-md
                  bg-gray-50 dark:bg-gray-900
                  text-gray-600 dark:text-slate-400
                  hover:bg-gray-100 dark:hover:bg-gray-900
                  hover:text-black dark:hover:text-white
                  transition-all duration-200 ease-in-out
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                "
              >
                {link.icon}
              </a>
            ))}
          </div>

          <a
            className="
              flex items-center justify-center gap-2
              bg-black/90 dark:bg-slate-100
              text-white dark:text-gray-950
              dark:hover:bg-white
              hover:bg-black
              rounded-md px-4 py-2 text-sm font-semibold
              w-full text-center
              active:scale-[0.98]
              transition duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            "
            href="/resume.pdf"
            target="_blank"
            title="Resume"
          >
            View My Résumé
            <ArrowUpRight
              size={14}
              className="transform transition-transform duration-200 group-hover:translate-x-[1px]"
            />
          </a>
        </div>
      </aside>

      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            style={{ touchAction: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded photo of Benjamin Garcia"
          >
            <motion.div
              ref={modalContentRef}
              className="relative max-w-lg w-full"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={QUICK_TRANSITION}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute top-2 right-2 z-10 p-2 text-gray-100 hover:text-white transition-colors bg-black/60 rounded-full backdrop-blur-sm hover:bg-black/80 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                aria-label="Close photo"
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
                src="/static/me.jpeg"
                alt="Benjamin Garcia"
                width={698}
                height={800}
                quality={90}
                className="w-full h-auto rounded-lg shadow-2xl select-none"
                draggable={false}
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
