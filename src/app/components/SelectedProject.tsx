"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { GitHubMarkIcon, WebsiteIcon } from "../svgs/Icons";

interface ProjectItemProps {
  src: string;
  title: ReactNode;
  summary?: string;
  alt?: string;
  link?: string;
  githubLink?: string;
  note?: ReactNode;
  tags: string[];
  galleryImages?: string[];
  onImageClick?: (
    imageSrc: string,
    imageAlt: string,
    triggerEl: HTMLButtonElement | null
  ) => void;
}

export default function ProjectItem({
  src,
  title,
  summary,
  alt,
  link,
  githubLink,
  note,
  tags,
  galleryImages,
  onImageClick,
}: ProjectItemProps) {
  const imageModalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previewAlt =
    alt || (typeof title === "string" ? title : "Project preview");
  const projectName = typeof title === "string" ? title : previewAlt;
  const titleClassName =
    "text-lg font-semibold text-gray-900 md:text-xl dark:text-slate-100";
  const subtitleClassName =
    "mt-1 min-h-[3.5rem] text-sm leading-7 text-gray-600 line-clamp-2 lg:min-h-[4rem] lg:text-base dark:text-slate-400";

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(
        galleryImages && galleryImages.length > 0 ? galleryImages[0] : src,
        previewAlt,
        imageModalTriggerRef.current
      );
    }
  };

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition-colors duration-300 dark:border-gray-600 dark:bg-black">
      <div className="group/img relative aspect-[16/9] w-full overflow-hidden border-b border-gray-200 dark:border-gray-700">
        <Image
          src={src}
          alt={previewAlt}
          fill
          quality={82}
          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 388px"
          className="object-cover"
        />
        <button
          ref={imageModalTriggerRef}
          type="button"
          onClick={handleImageClick}
          className="
            absolute top-3 right-3 flex items-center justify-center rounded-md
            bg-black/40 p-1.5 text-white/80 opacity-0 backdrop-blur-sm
            cursor-pointer
            transition-all duration-300 ease-in-out group-hover/img:opacity-100
            group-focus-visible/img:opacity-100
            focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
          "
          aria-label={`Expand ${previewAlt}`}
          title="Expand photo"
        >
          <Expand size={14} strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <h3 className={titleClassName}>{title}</h3>
          </div>

          <div className="flex shrink-0 items-center gap-3 pl-2">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 transition-colors duration-300 hover:text-gray-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-400 dark:hover:text-slate-200"
                title="Visit Site"
                aria-label={`Visit ${projectName}`}
              >
                <WebsiteIcon />
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 transition-colors duration-300 hover:text-gray-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-400 dark:hover:text-slate-200"
                title="View on GitHub"
                aria-label={`View ${projectName} on GitHub`}
              >
                <GitHubMarkIcon />
              </a>
            )}
          </div>
        </div>

        {summary && <p className={subtitleClassName}>{summary}</p>}

        {note && (
          <div className="mt-1 text-sm text-[#d87474] dark:text-[#f29ca3]">
            {note}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="whitespace-nowrap rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
