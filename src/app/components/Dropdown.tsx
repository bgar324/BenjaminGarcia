"use client"

import React, { useState, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { useTheme } from "next-themes"

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

  // choose correct image based on theme, no fade transition
  const imageSrc =
    mounted && theme === "dark" && darkSrc ? darkSrc : src

  return (
    <div className="border border-gray-300 dark:border-gray-700 border-dotted bg-white dark:bg-black rounded-lg flex flex-col transition-colors duration-300">
      <div className="flex flex-row">
        <div className="flex justify-center items-center">
          <img
            src={imageSrc}
            alt=""
            className="h-auto w-16 rounded-xl bg-white dark:bg-black items-center p-1 lg:ml-1"
          />
        </div>

        <div className="flex flex-col w-full p-2">
          <h1 className={titleCls}>
            {schoolLink?.trim() ? (
              <a
                href={schoolLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
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
                  className={`${companyBase} hover:underline hover:cursor-pointer`}
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
                  className={`hover:cursor-pointer ml-2 transition-all duration-300 ease-in-out rounded-3xl hover:bg-gray-200 dark:hover:bg-slate-700 ${isOpen ? "rotate-180" : ""}`}
                >
                  {isOpen ? (
                    <X strokeWidth="1" size={16} absoluteStrokeWidth />
                  ) : (
                    <ChevronDown strokeWidth="1" size={16} absoluteStrokeWidth />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {hasExpandableContent && (
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
                className="text-blue-500 dark:text-blue-400 hover:underline text-sm mt-2 inline-block"
              >
                Visit website
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown