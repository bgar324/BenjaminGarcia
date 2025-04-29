"use client";

import { useState } from "react";
import { ArrowUpRightFromSquare } from "lucide-react";

type ProjectItemProps = {
  src: string;
  title: string;
  note?: string;
  description: string;
  link?: string;
  tags?: string[];
  galleryImages?: string[];
  onImageClick?: (images: string[], initialIndex: number) => void;
};

export default function ProjectItem({
  src,
  title,
  note,
  description,
  link,
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
          <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white font-semibold text-lg md:text-xl flex items-center gap-2 hover:underline transition-all duration-300"
          >
            {title}
            {note && <span className="text-[#d87474] text-sm">{note}</span>}
            <ArrowUpRightFromSquare className="w-4 h-4" />
          </a>
          <p className={`text-gray-600 dark:text-gray-400 text-sm md:text-base ${isExpanded ? '' : 'line-clamp-3'}`}>
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
