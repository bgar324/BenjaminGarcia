"use client";

import { useState } from "react";
import { ArrowUpRightFromSquare } from "lucide-react";

interface ProjectItemProps {
  src: string;
  title: string;
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
    <div className="flex flex-col md:flex-row gap-4 group rounded-xl border border-gray-300 border-dotted px-2 py-4 transition-all duration-300 bg-white">
      <div className="w-full md:w-1/3 flex items-start justify-center">
        <img
          src={src}
          alt={title}
          className="w-full h-auto rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer object-cover max-h-48"
          onClick={(e) => {
            e.preventDefault();
            handleImageClick();
          }}
        />
      </div>
      <div className="flex flex-col justify-between md:w-2/3">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-900 font-semibold text-lg md:text-xl">
              {title}
            </h2>
            <div className="flex items-center gap-4 text-center pb-[1px]">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
                  title="Visit Site"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
                  title="View on GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              )}
            </div>
          </div>
          {note && <span className="text-[#d87474] text-sm">{note}</span>}
          <p className={`text-gray-600 text-sm md:text-base ${isExpanded ? '' : 'line-clamp-3'}`}>
            {description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 text-xs mt-1 font-medium hover:cursor-pointer transition-all duration-300 ease-in-out w-fit"
            title="Read more"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm dark:bg-gray-700 dark:text-white"
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
