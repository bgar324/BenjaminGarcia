"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import ImagePreviewModal from "../ImagePreviewModal";
import ProjectItem from "../SelectedProject";
import { ArrowRight } from "lucide-react";
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
              className="group w-fit border border-gray-300 rounded-md px-2 py-1 uppercase mt-10 mb-5 font-semibold tracking-wider text-xs flex items-center gap-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              project archive
              <ArrowRight
                size={12}
                className="transform transition-transform duration-300 group-hover:translate-x-[0.5px] pb-[0.5px]"
              />
            </Link>
          </motion.div>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <ProjectItem
            src="/static/project-previews/gitproof.png"
            title="GitProof"
            eager
            summary="Recruiter-facing GitHub reports that make public contribution history legible and credible."
            link="https://gitproof.dev"
            githubLink="https://github.com/bgar324/gitproof-2"
            onImageClick={openImagePreview}
            tags={[
              "Next.js",
              "TypeScript",
              "Tailwind",
              "Postgres",
              "Prisma",
              "GitHub GraphQL API",
              "Gemini 2.5 Flash",
            ]}
          />
          <ProjectItem
            src="/static/project-previews/logit.png"
            title="Logit"
            eager
            summary="A lightweight workout tracker built for fast logging and clear progress review."
            link="https://log--it.vercel.app"
            githubLink="https://github.com/bgar324/log-it"
            onImageClick={openImagePreview}
            tags={[
              "Next.js",
              "TypeScript",
              "Tailwind",
              "Supabase",
              "Postgres",
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
