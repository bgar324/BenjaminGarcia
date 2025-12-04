"use client";

import Image from "next/image";
// 1. Import useEffect
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Globe,
  X,
  Menu,
} from "lucide-react";
import { LinkedInIcon, GitHubMarkIcon } from "../svgs/Icons";
// import NowPlayingCard from "./NowPlayingCard";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Add Scroll Lock Effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scrolling on the body
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup: ensure scrolling is enabled if component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const socialLinks = [
    {
      icon: <Globe size={18} />,
      label: "Website",
      href: "https://www.bentgarcia.com/",
    },
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
  ];

  return (
    <>
      {/* MOBILE: Fixed "Island" Header */}
      <div 
        className="lg:hidden fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none 
        bg-gradient-to-b from-white/90 via-white/60 to-transparent 
        dark:from-black/90 dark:via-black/60 dark:to-transparent"
        aria-hidden="true"
      />

      <div className="lg:hidden fixed top-2 left-0 right-0 z-50 flex justify-center px-5 md:px-20 pointer-events-none">
        <div className="
          w-full max-w-5xl pointer-events-auto
          border border-gray-200 dark:border-gray-600 
          bg-white/85 dark:bg-black/85 backdrop-blur-xl
          rounded-lg flex flex-row items-center justify-between 
          p-3 shadow-md transition-colors duration-300
        ">
          <div className="flex items-center gap-3">
            <Image
              src="/static/IMG_7044_tiny.jpg"
              alt="Benjamin Garcia"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
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
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="lg:hidden mb-8" />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-white dark:bg-black p-6 flex flex-col lg:hidden overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8 relative z-10">
              <span className="text-lg font-bold text-gray-400">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900"
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
                  className="text-2xl font-semibold text-gray-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="mt-4 px-8 py-3 rounded-md bg-black dark:bg-slate-100 text-white dark:text-gray-950 font-medium text-lg active:scale-95 transition-transform"
              >
                View Resume
              </a>
            </div>
{/* 
            <div className="w-full relative z-10">
              <NowPlayingCard />
            </div> */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0">
              <span className="text-[35vh] font-bold text-black dark:text-white leading-none tracking-tighter pr-6">
                bg
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden lg:flex flex-col lg:w-[204px] lg:shrink-0 lg:gap-y-3 lg:sticky lg:top-10 h-fit"
      >
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-2 transition-colors duration-300">
          <Image
            src="/static/IMG_7044_tiny.jpg"
            alt="Benjamin Garcia"
            width={698}
            height={800}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQAA4DASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EACQQAAEDAwMEAwAAAAAAAAAAAAECAwQABREhEjFBBhMiURQyYf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECAxEhIv/aAAwDAQACEQMRAD8A3qKKKyNDBooooA//2Q=="
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 112px, 192px"
            className="h-auto w-full rounded-xl mb-2"
          />

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
                className="text-sm text-gray-500 dark:text-slate-400 hover:underline"
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
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  hover:text-black dark:hover:text-white 
                  transition-all duration-200 ease-in-out
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
            "
            href="/resume.pdf"
            target="_blank"
            title="Resume"
          >
            View My Résumé
          </a>
        </div>

        {/* <div className="w-full">
          <NowPlayingCard />
        </div> */}
      </aside>
    </>
  );
}