"use client";

import Image from "next/image";
import SectionHeader from "../SectionHeader";
import ProjectItem from "../SelectedProject";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="flex flex-row justify-between">
        <SectionHeader>selected projects</SectionHeader>
        <a
          href="/archive"
          className="group w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm flex items-center gap-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          project archive
          <ArrowUpRight
            size={14}
            className="transform transition-transform duration-200 group-hover:translate-x-[1px]"
          />
        </a>
      </div>
      <div className="flex flex-col gap-y-3">
        <ProjectItem
          src="/static/project-previews/poly-clubs-2.png"
          title="Poly Clubs"
          description="Cal Poly students had no way to get honest peer reviews of 486+ campus clubs. Built a transparent review platform with anonymous multi-dimensional ratings ('Vibe Check') and real-time aggregation, helping students make informed decisions about campus involvement."
          link="https://poly-clubs.vercel.app/"
          githubLink="https://github.com/bgar324/poly-clubs"
          tags={[
            "Next.js",
            "Tailwind CSS",
            "TypeScript",
            "Supabase",
            "Framer Motion",
          ]}
        />
        <ProjectItem
          src="/static/project-previews/gitproof-2.png"
          title="Git Proof"
          description="Developers struggle to showcase GitHub contributions effectively to recruiters. GitProof generates shareable, recruiter-facing profile reports with impact scores, consistency analysis, and archetype classification using the GitHub GraphQL API, PostgreSQL, and Gemini 2.5 Flash for AI-assisted insights."
          link="https://gitproof.dev"
          githubLink="https://github.com/bgar324/gitproof-2"
          tags={[
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "OAuth",
            "GitHub GraphQL API",
            "Gemini 2.5 Flash",
          ]}
        />
        <ProjectItem
          src="/static/project-previews/mtsaccsprev.png"
          title="Computer Science Club Website"
          description="Mt. SAC's CS Club needed a modern, maintainable website to serve 900+ members. Rebuilt the site with Next.js, TypeScript, and Tailwind CSS, implementing modular components and data-driven rendering for events and officer directories. Replaced legacy Bootstrap build with mobile-first design and static optimization."
          link="https://mtsaccs.org"
          githubLink="https://github.com/bgar324/mtsaccs-v2"
          tags={["Next.js", "Tailwind CSS", "TypeScript", "Vercel"]}
        />
        <ProjectItem
          src="/static/project-previews/logit-preview.webp"
          title="Logit"
          description="Most workout apps are bloated with features users don't need. Built a minimal workout logger focused on efficient tracking with calendar-based editing, progress visualizations, and PostgreSQL storage for tags, comments, and dropsets. Enables progressive overload tracking without complexity."
          githubLink="https://github.com/bgar324/logit"
          tags={[
            "Next.js",
            "Tailwind CSS",
            "react-calendar",
            "Recharts",
            "Supabase",
            "PostgreSQL",
            "Prisma",
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
                    src="/static/hacktech-logo.png"
                    width={24}
                    height={24}
                    alt="HackTech logo"
                    className="w-[1.25rem] h-[1.25rem]"
                    quality={100}
                  />
                  <span>HackTech 2025</span>
                </a>
              </div>
            </>
          }
          description="Desk workers lack real-time feedback on wrist posture, leading to repetitive strain injuries. Built het.ai at HackTech 2025—a real-time wrist diagnostic platform using Leap Motion to visualize hand posture and calculate ergonomic risk. Led frontend with Next.js, creating interactive visualizations and dashboard integrated with FastAPI backend. Outputs flexion, deviation, and pronation angles for live feedback and long-term session insights."
          link="https://hetai.vercel.app/"
          githubLink="https://github.com/bgar324/hacktech-25-brjk"
          tags={[
            "Next.js",
            "Tailwind CSS",
            "Python",
            "Leap Motion",
            "FastAPI",
            "Firebase",
            "Real-Time Data",
            "Data Visualization & Diagnostics",
          ]}
        />
      </div>
    </section>
  );
}
