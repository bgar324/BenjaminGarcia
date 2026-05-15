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
  const hasImageLink = Boolean(imageLink?.trim());

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

  const logoImages = (
    <>
      <span
        className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-xl p-1 lg:ml-0.5 ${
          darkSrc ? "dark:hidden" : ""
        }`}
      >
        <span className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={src}
            alt={`${position} logo`}
            fill
            sizes="60px"
            loading={darkSrc ? "eager" : undefined}
            quality={88}
            className="object-cover"
          />
        </span>
      </span>

      {darkSrc && (
        <span className="hidden h-[62px] w-[62px] shrink-0 items-center justify-center rounded-xl p-1 lg:ml-0.5 dark:flex">
          <span className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src={darkSrc}
              alt={`${position} logo`}
              fill
              sizes="60px"
              loading="eager"
              quality={88}
              className="object-cover"
            />
          </span>
        </span>
      )}
    </>
  );

  return (
    <motion.div
      initial={false}
      animate={shellMotion}
      transition={shellTransition}
      style={{ transformOrigin: "center top" }}
      className={`flex flex-col rounded-[13px] border border-gray-200 bg-white shadow-xs transition-colors duration-300 dark:border-gray-600 dark:bg-black ${
        hasExpandableContent ? "cursor-pointer" : ""
      }`}
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
        <div className="flex items-center justify-center">
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
              className="relative z-10 flex items-center justify-center rounded-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {logoImages}
            </a>
          ) : (
            logoImages
          )}
        </div>

        <div className="flex w-full items-center justify-between gap-2 py-1.5 pr-1.5 pl-1 sm:py-2 sm:pr-2 sm:pl-1.5 lg:gap-3">
          {" "}
          <div className="flex min-w-0 flex-col">
            <h3 className="w-full font-semibold text-gray-900 dark:text-slate-100 lg:text-lg">
              {role}
            </h3>

            <div className="flex flex-row items-center">
              <span className="text-sm text-gray-600 dark:text-slate-400 lg:text-base">
                {position}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-row items-center">
            <p className="hidden text-sm text-gray-600 dark:text-slate-400 sm:block lg:text-base">
              {startDate}
              {endDate ? ` - ${endDate}` : ""}
            </p>

            {hasExpandableContent && (
              <div className="ml-1 rounded-3xl transition-all duration-300 ease-in-out group-hover:bg-gray-200 dark:group-hover:bg-slate-700 sm:ml-2">
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
              className="border-t border-gray-200 p-4 dark:border-gray-700"
              onClick={stopPropagation}
              onPointerDown={stopPropagation}
            >
              {description && (
                <p className="text-sm text-gray-800 dark:text-slate-200 lg:text-base">
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
                  className="mt-2 inline-block text-sm text-blue-500 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-blue-400"
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
