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
        <div className="flex flex-col gap-y-3">
          <ProjectItem
            src="/static/project-previews/gitproof-2.webp"
            title="Git Proof"
            description="Developers struggle to showcase GitHub contributions effectively to recruiters. GitProof generates shareable, recruiter-facing profile reports with impact scores, consistency analysis, and archetype classification using the GitHub GraphQL API, PostgreSQL, and Gemini 2.5 Flash for AI-assisted insights."
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
            src="/static/project-previews/logit-preview.png"
            title="Logit"
            description="Logit is a lightweight workout tracker for logging sets, reps, weight, and training history without unnecessary friction. It lets users quickly record workouts, get exercise name suggestions and last-session comparisons while logging, and review their progress through dashboards, charts, personal bests, and exercise detail pages."
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
          <ProjectItem
            src="/static/project-previews/poly-clubs-2.webp"
            title="Poly Clubs"
            description="Cal Poly students had no way to get honest peer reviews of 486+ campus clubs. Built a transparent review platform with anonymous multi-dimensional ratings ('Vibe Check') and real-time aggregation, helping students make informed decisions about campus involvement."
            link="https://poly-clubs.vercel.app/"
            githubLink="https://github.com/bgar324/poly-clubs"
            onImageClick={openImagePreview}
            tags={[
              "Next.js",
              "Tailwind CSS",
              "TypeScript",
              "Supabase",
              "Framer Motion",
            ]}
          />
          <ProjectItem
            src="/static/project-previews/hetai.webp"
            alt="het.ai project preview"
            title={
              <>
                <div className="flex flex-row items-center">
                  Het.AI |{" "}
                  <a
                    href="https://hack.caltech.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-gray-500 hover:text-orange-500 transition-colors duration-300 flex flex-row gap-2 ml-2 items-center text-center justify-center"
                  >
                    <Image
                      src="/static/hacktech-logo.webp"
                      width={24}
                      height={24}
                      alt="HackTech logo"
                      className="w-[1.25rem] h-[1.25rem]"
                      quality={88}
                    />
                    <span>HackTech 2025</span>
                  </a>
                </div>
              </>
            }
            description="Desk workers lack real-time feedback on wrist posture, leading to repetitive strain injuries. Built het.ai at HackTech 2025—a real-time wrist diagnostic platform using Leap Motion to visualize hand posture and calculate ergonomic risk. Led frontend with Next.js, creating interactive visualizations and dashboard integrated with FastAPI backend. Outputs flexion, deviation, and pronation angles for live feedback and long-term session insights."
            link="https://hetai.vercel.app/"
            githubLink="https://github.com/bgar324/hacktech-25-brjk"
            onImageClick={openImagePreview}
            tags={["Next.js", "Tailwind CSS", "Python", "FastAPI", "Firebase"]}
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
