"use client";

import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";
import { GitHubMarkIcon } from "../svgs/Icons";

interface ProjectItemProps {
  src: string;
  title: ReactNode;
  alt?: string;
  description: string;
  link?: string;
  githubLink?: string;
  note?: string;
  tags: string[];
  galleryImages?: string[];
  onImageClick?: (images: string[], startIndex: number) => void;
}

export default function ProjectItem({
  src,
  title,
  alt,
  description,
  link,
  githubLink,
  note,
  tags,
  galleryImages,
  onImageClick,
}: ProjectItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(
        galleryImages && galleryImages.length > 0 ? galleryImages : [src],
        0
      );
    }
  };

  return (
    <div
      className="
      relative
      flex flex-col md:flex-row gap-4 group rounded-xl border border-gray-200 dark:border-gray-600 
      p-3 transition-all duration-300 
      bg-white dark:bg-black md:items-start shadow-xs
    "
    >
      <div
        className="
        w-full md:w-1/3   
        relative 
        aspect-video md:aspect-auto 
        md:h-[130px]
        flex-shrink-0
      "
      >
        <Image
          src={src}
          alt={alt || (typeof title === "string" ? title : "Project preview")}
          fill
          quality={82}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="
          rounded-lg
          border border-gray-300 dark:border-gray-700
          object-cover
        "
          onClick={(e) => {
            e.preventDefault();
            handleImageClick();
          }}
        />
      </div>

      <div className="flex flex-col justify-between md:w-2/3">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-gray-900 dark:text-slate-100 font-semibold text-lg md:text-xl">
              {title}
            </h2>

            <div
              className="
              flex items-center gap-4
              md:absolute md:top-3 md:right-3
            "
            >
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 transition-colors duration-300 flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  title="Visit Site"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </a>
              )}

              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 transition-colors duration-300 flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  title="View on GitHub"
                >
                  <GitHubMarkIcon />
                </a>
              )}
            </div>
          </div>

          {note && (
            <span className="text-[#d87474] dark:text-[#f29ca3] text-sm">
              {note}
            </span>
          )}

          <p
            className={`text-gray-600 dark:text-slate-300 text-sm md:text-base ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs mt-1 font-medium hover:cursor-pointer transition-all duration-300 ease-in-out w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
            title="Read more"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium cursor-default border border-gray-200 dark:border-gray-700 transition-colors duration-300 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
