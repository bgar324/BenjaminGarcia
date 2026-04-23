"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
import ImagePreviewModal from "../ImagePreviewModal";
import ProjectItem from "../SelectedProject";
import { ArrowUpRight } from "lucide-react";
import { useTactilePress } from "../useTactilePress";

export default function ProjectsSection() {
  const [activeImage, setActiveImage] = useState<{
    alt: string;
    src: string;
  } | null>(null);
  const imageModalTriggerRef = useRef<HTMLElement | null>(null);
  const archivePress = useTactilePress();

  const openImagePreview = useCallback(
    (src: string, alt: string, triggerEl: HTMLButtonElement | null) => {
      imageModalTriggerRef.current = triggerEl;
      setActiveImage({ alt, src });
    },
    [],
  );

  return (
    <>
      <section id="projects" aria-labelledby="projects-heading">
        <div className="flex flex-row justify-between">
          <SectionHeader id="projects-heading">selected projects</SectionHeader>
          <motion.div
            initial={false}
            animate={
              archivePress.shouldReduceMotion
                ? undefined
                : { scale: archivePress.pressScale, y: archivePress.pressY }
            }
            transition={archivePress.pressTransition}
            style={{ transformOrigin: "center center" }}
            className="w-fit"
          >
            <Link
              href="/archive"
              onPointerDown={archivePress.onPressPointerDown}
              onPointerUp={archivePress.onPressPointerUp}
              onPointerLeave={archivePress.onPressPointerLeave}
              onPointerCancel={archivePress.onPressPointerCancel}
              onKeyDown={archivePress.onPressKeyDown}
              onKeyUp={archivePress.onPressKeyUp}
              onBlur={archivePress.onPressBlur}
              className="group w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm flex items-center gap-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 shadow-xs"
            >
              project archive
              <ArrowUpRight
                size={14}
                className="transform transition-transform duration-300 group-hover:translate-x-[1px]"
              />
            </Link>
          </motion.div>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <ProjectItem
            src="/static/project-previews/gitproof.png"
            title="GitProof"
            summary="Recruiter-facing GitHub reports that make public contribution history legible and credible."
            link="https://gitproof.dev"
            githubLink="https://github.com/bgar324/gitproof-2"
            onImageClick={openImagePreview}
            tags={[
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Prisma",
              "GitHub GraphQL API",
              "Gemini 2.5 Flash",
            ]}
          />
          <ProjectItem
            src="/static/project-previews/logit.png"
            title="Logit"
            summary="A lightweight workout tracker built for fast logging and clear progress review."
            link="https://logit-prod.vercel.app"
            githubLink="https://github.com/bgar324/log-it"
            onImageClick={openImagePreview}
            tags={[
              "Next.js",
              "Tailwind CSS",
              "Supabase",
              "PostgreSQL",
              "Prisma",
            ]}
          />
        </div>
      </section>

      <ImagePreviewModal
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        src={activeImage?.src || ""}
        alt={activeImage?.alt || "Project preview"}
        ariaLabel="Expanded project image preview"
        returnFocusRef={imageModalTriggerRef}
      />
    </>
  );
}
