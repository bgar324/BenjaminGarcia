"use client";

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface DropdownProps {
  role: string;
  position: string;
  startDate: string;
  endDate?: string;
  src: string;
  darkSrc?: string;
  imageLink?: string;
  link?: string;
  description?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  role,
  position,
  startDate,
  endDate,
  src,
  darkSrc,
  imageLink,
  link,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const hasExpandableContent = Boolean(description || link);

  const toggleDropdown = () => {
    if (hasExpandableContent) {
      setIsOpen((v) => !v);
    }
  };

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const handlePressStart = () => {
    if (hasExpandableContent) {
      setIsPressed(true);
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasExpandableContent) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasExpandableContent) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePressEnd();
      toggleDropdown();
    }
  };

  const titleCls =
    "font-semibold w-full lg:text-lg text-gray-900 dark:text-slate-100";
  const subtitleCls = "text-sm text-gray-600 dark:text-slate-400 lg:text-base";
  const shellMotion =
    shouldReduceMotion || !hasExpandableContent
      ? undefined
      : {
          scale: isPressed ? 0.9925 : 1,
          y: isPressed ? 1 : 0,
        };
  const shellTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: "tween" as const, duration: 0.14, ease: "easeOut" as const };
  const hasImageLink = Boolean(imageLink?.trim());
  const logoImages = (
    <>
      <Image
        src={src}
        alt={`${position} logo`}
        width={64}
        height={64}
        sizes="64px"
        loading={darkSrc ? "eager" : undefined}
        quality={88}
        className={`h-auto w-16 rounded-xl items-center p-1 lg:ml-1 lg:p-1 ${darkSrc ? "dark:hidden" : ""}`}
      />
      {darkSrc && (
        <Image
          src={darkSrc}
          alt={`${position} logo`}
          width={64}
          height={64}
          sizes="64px"
          loading="eager"
          quality={88}
          className="hidden h-auto w-16 rounded-xl items-center p-0.5 lg:ml-1 lg:p-1 dark:block"
        />
      )}
    </>
  );

  return (
    <motion.div
      initial={false}
      animate={shellMotion}
      transition={shellTransition}
      style={{ transformOrigin: "center top" }}
      className={`border border-gray-200 dark:border-gray-600 bg-white dark:bg-black rounded-[13px] flex flex-col transition-colors duration-300 shadow-xs ${hasExpandableContent ? "cursor-pointer" : ""}`}
    >
      <div
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPointerDown={handlePressStart}
        onPointerUp={handlePressEnd}
        onPointerLeave={handlePressEnd}
        onPointerCancel={handlePressEnd}
        onBlur={handlePressEnd}
        tabIndex={hasExpandableContent ? 0 : -1}
        role={hasExpandableContent ? "button" : undefined}
        aria-expanded={hasExpandableContent ? isOpen : undefined}
        className="flex flex-row"
      >
        <div className="flex justify-center items-center">
          {hasImageLink ? (
            <a
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopPropagation}
              onPointerDown={stopPropagation}
              onKeyDown={stopPropagation}
              onKeyUp={stopPropagation}
              aria-label={`Visit ${position}`}
              className="relative z-10 flex justify-center items-center rounded-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {logoImages}
            </a>
          ) : (
            logoImages
          )}
        </div>

        <div className="flex w-full items-center justify-between gap-2 p-1.5 sm:p-2 lg:gap-3">
          <div className="flex min-w-0 flex-col">
            <h3 className={titleCls}>{role}</h3>

            <div className="flex flex-row items-center">
              <span className={subtitleCls}>{position}</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-row items-center">
            <p className="hidden text-sm text-gray-600 dark:text-slate-400 sm:block lg:text-base">
              {startDate}
              {endDate ? ` - ${endDate}` : ""}
            </p>

            {hasExpandableContent && (
              <div className="ml-1 transition-all duration-300 ease-in-out rounded-3xl group-hover:bg-gray-200 dark:group-hover:bg-slate-700 sm:ml-2">
                <div className="grid h-4 w-4 place-items-center">
                  {isOpen ? (
                    <X
                      strokeWidth="1"
                      size={14}
                      absoluteStrokeWidth
                      className="block text-gray-600 dark:text-slate-400"
                    />
                  ) : (
                    <ChevronDown
                      strokeWidth="1"
                      size={14}
                      absoluteStrokeWidth
                      className="block text-gray-600 dark:text-slate-400"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasExpandableContent && isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div
              className="p-4 border-t border-gray-200 dark:border-gray-700"
              onClick={stopPropagation}
              onPointerDown={stopPropagation}
            >
              {description && (
                <p className="text-sm lg:text-base text-gray-600 dark:text-slate-200">
                  {description}
                </p>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  onPointerDown={stopPropagation}
                  onKeyDown={stopPropagation}
                  onKeyUp={stopPropagation}
                  className="text-blue-500 dark:text-blue-400 hover:underline text-sm mt-2 inline-block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                >
                  Visit website
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
