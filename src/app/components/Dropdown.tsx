"use client"

import React, { useState, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface DropdownProps {
  role: string
  position: string
  startDate: string
  endDate?: string
  src: string
  darkSrc?: string
  imageLink?: string
  link?: string
  description?: string
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
  description
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hasExpandableContent = Boolean(description || link)

  // Toggle function to be used by the whole card
  const toggleDropdown = () => {
    if (hasExpandableContent) {
      setIsOpen((v) => !v)
    }
  }

  // Prevent link clicks from toggling the dropdown
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const titleCls = "font-semibold w-full lg:text-lg text-gray-900 dark:text-slate-100"
  const subtitleCls = "text-sm text-gray-600 dark:text-slate-400 lg:text-base"
  const showDark = mounted && theme === "dark" && darkSrc
  const hasImageLink = Boolean(imageLink?.trim())
  const logoImages = (
    <>
      <Image
        src={src}
        alt={`${position} logo`}
        width={64}
        height={64}
        quality={88}
        className={`h-auto w-16 rounded-xl items-center p-1 lg:ml-1 ${showDark ? "hidden" : ""}`}
      />
      {darkSrc && (
        <Image
          src={darkSrc}
          alt={`${position} logo`}
          width={64}
          height={64}
          quality={88}
          className={`h-auto w-16 rounded-xl items-center p-1 lg:ml-1 ${showDark ? "" : "hidden"}`}
        />
      )}
    </>
  )

  return (
    <div
      onClick={toggleDropdown}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); } }}
      tabIndex={hasExpandableContent ? 0 : -1}
      role={hasExpandableContent ? "button" : undefined}
      aria-expanded={isOpen}
      className={`border border-gray-200 dark:border-gray-600 bg-white dark:bg-black rounded-[13px] flex flex-col transition-colors duration-300 shadow-xs ${hasExpandableContent ? "cursor-pointer" : ""}`}
    >
      <div className="flex flex-row">
        <div className="flex justify-center items-center">
          {hasImageLink ? (
            <a
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              aria-label="Open website"
              className="relative z-10 flex justify-center items-center rounded-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {logoImages}
            </a>
          ) : (
            logoImages
          )}
        </div>

        <div className="flex flex-col w-full p-2">
          <h1 className={titleCls}>{role}</h1>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <span className={subtitleCls}>{position}</span>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-sm text-gray-600 dark:text-slate-400 hidden sm:block lg:text-base">
                {startDate}
                {endDate ? ` - ${endDate}` : ""}
              </p>
              
              {hasExpandableContent && (
                <div className="ml-2 transition-all duration-300 ease-in-out rounded-3xl group-hover:bg-gray-200 dark:group-hover:bg-slate-700">
                  <div className="relative w-4 h-4">
                    <motion.div
                      initial={false}
                      animate={{ 
                        rotate: isOpen ? -90 : 0, 
                        opacity: isOpen ? 0 : 1, 
                        scale: isOpen ? 0.5 : 1 
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <ChevronDown strokeWidth="1" size={16} absoluteStrokeWidth />
                    </motion.div>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        rotate: isOpen ? 0 : 90, 
                        opacity: isOpen ? 1 : 0, 
                        scale: isOpen ? 1 : 0.5 
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <X strokeWidth="1" size={16} absoluteStrokeWidth />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700" onClick={handleLinkClick}>
              {description && (
                <p className="text-sm lg:text-base text-gray-800 dark:text-slate-200">
                  {description}
                </p>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline text-sm mt-2 inline-block focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                >
                  Visit website
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
