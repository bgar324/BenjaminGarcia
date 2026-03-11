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
  link?: string
  description?: string
  companyLink?: string
  schoolLink?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  role,
  position,
  startDate,
  endDate,
  src,
  darkSrc,
  link,
  description,
  companyLink,
  schoolLink
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hasExpandableContent = Boolean(description || link)
  const titleCls = "font-semibold w-full lg:text-lg text-gray-900 dark:text-slate-100"
  const companyBase = "text-sm text-gray-600 dark:text-slate-400 lg:text-base"
  const companyIsLink = !!companyLink?.trim()

  const showDark = mounted && theme === "dark" && darkSrc

  return (
    <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-black rounded-[13px] flex flex-col transition-colors duration-300">
      <div className="flex flex-row"> 
        <div className="flex justify-center items-center">
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
        </div>

        <div className="flex flex-col w-full p-2">
          <h1 className={titleCls}>
            {schoolLink?.trim() ? (
              <a
                href={schoolLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
              >
                {role}
              </a>
            ) : (
              role
            )}
          </h1>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              {companyIsLink ? (
                <a
                  className={`${companyBase} hover:underline hover:cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm`}
                  href={companyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {position}
                </a>
              ) : (
                <span className={companyBase}>{position}</span>
              )}
            </div>

            <div className="flex flex-row items-center">
              <p className="text-sm text-gray-600 dark:text-slate-400 hidden sm:block lg:text-base">
                {startDate}
                {endDate ? ` - ${endDate}` : ""}
              </p>
              
              {hasExpandableContent && (
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="hover:cursor-pointer ml-2 transition-all duration-300 ease-in-out rounded-3xl hover:bg-gray-200 dark:hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <div className="relative w-4 h-4">
                    <motion.div
                      initial={false}
                      animate={{ 
                        rotate: isOpen ? -90 : 0, 
                        opacity: isOpen ? 0 : 1, 
                        scale: isOpen ? 0.5 : 1 
                      }}
                      transition={{ duration: 0.2 }}
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
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <X strokeWidth="1" size={16} absoluteStrokeWidth />
                    </motion.div>
                  </div>
                </button>
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
