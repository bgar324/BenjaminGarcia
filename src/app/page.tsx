"use client";

import Image from "next/image";
import Dropdown from "./components/Dropdown";
import Marquee from "./components/Marquee";
import { useState } from "react";
import PastVersions from "./components/PastVersions";
import "./globals.css";
import { motion } from "framer-motion";
import ProjectItem from "./components/SelectedProject";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import SectionHeader from "./components/SectionHeader";
import GradientLink from "./components/GradientLink";
import YouTubeModal from "./components/YouTubeModal";
import Sidebar from "./components/Sidebar";
import RandomImageHover from "./components/RandomImageHover";
import TechStack from "./components/TechStack";
const UCLA_IMAGES = [
  "/static/ucla/overhead-ucla.jpg",
  "/static/ucla/bruin-bear.jpg",
  "/static/ucla/powell.jpg",
  "/static/ucla/e6.jpg",
];

const ELDEN_RING_IMAGES = [
  "/static/elden/sote.jpg",
  "/static/elden/miquella.jpg",
  "/static/elden/erdtree.jpg",
  "/static/elden/mountaintop.jpg",
];

export default function Home() {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-5 pt-2 md:pt-4 lg:pt-0 pb-8 lg:pb-0 lg:px-8 md:px-20 sm:px-6 max-w-5xl mx-auto flex flex-col min-h-screen lg:flex-row lg:gap-7 lg:justify-between"
    >
      <div className="lg:py-10">
        <Sidebar />
      </div>

      <main className="flex-1 flex-col lg:w-2/3 lg:py-13 pt-6">
        <section id="about" className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <SectionHeader className="lg:mt-0">about</SectionHeader>
            <ThemeToggle />
          </div>

          <p className="text-gray-600 dark:text-slate-400 lg:text-lg leading-snug mt-4">
            I'm a junior studying Computer Science at the{" "}
            <RandomImageHover images={UCLA_IMAGES}>
              <GradientLink
                href="https://ucla.edu/"
                gradient="linear-gradient(to right, #1e3a8a, #b45309)"
              >
                University of California, Los Angeles
              </GradientLink>
            </RandomImageHover>
            . I currently serve as an officer for{" "}
            <GradientLink
              href="https://hack.uclaacm.com"
              gradient="linear-gradient(to right, hsla(196,67%,45%,1), hsla(280,100%,69%,1))"
            >
              ACM Hack
            </GradientLink>{" "}
            and contribute to{" "}
            <GradientLink
              href="https://exploretech.la"
              gradient="linear-gradient(to right, #eab308, #1e3a8a)"
            >
              exploretech.la
            </GradientLink>
            , where I help build responsive, accessible interfaces that bring
            ideas to life. In winter, I'll be joining Professor Xiang "Anthony"
            Chen's{" "}
            <GradientLink
              href="https://hci.ucla.edu"
              gradient="linear-gradient(to right, hsla(36,52%,60%,1), hsla(210,64%,61%,1))"
            >
              Human-Computer Interaction Research Lab
            </GradientLink>
            .
          </p>

          <p className="mt-2 text-gray-600 dark:text-slate-400 lg:text-lg leading-snug">
            Outside of coding, I enjoy weightlifting, spending time with my dog,
            and exploring the{" "}
            <RandomImageHover images={ELDEN_RING_IMAGES}>
              <GradientLink
                href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
                gradient="linear-gradient(to right, #092322, #996A48)"
              >
                Lands Between
              </GradientLink>
            </RandomImageHover>
            .
          </p>
        </section>

        <section id="experience" className="flex flex-col">
          <SectionHeader>experience</SectionHeader>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="Undergraduate Research Developer"
              position="UCLA HCI Research Lab"
              companyLink="https://hci.ucla.edu"
              startDate="Dec 2025 (Starting)"
              src="/static/companies/ucla-hci.png"
              darkSrc="/static/companies/ucla-hci-dark.png"
              description="Joining Professor Xiang 'Anthony' Chen's Human-Computer Interaction Lab in Winter 2026, where I'll collaborate with designers and researchers to prototype and explore new interaction experiences."
            />
            <Dropdown
              role="Software Engineer Intern"
              position="Todd Agriscience"
              companyLink="https://www.toddagriscience.com/"
              startDate="Mar 2025"
              endDate="Oct 2025"
              src="/static/companies/todd-dark.png"
              description="Built and deployed Todd's first client-facing dashboard using Next.js, enabling 5–10 early customers to visualize AI-powered crop insights. Work contributed to scaling the team from 1 to 14 engineers and drove initial product adoption."
            />
            <Dropdown
              role="Research & Development Engineer Intern"
              position="Bonterra"
              companyLink="https://www.bonterratech.com/"
              startDate="Jul 2025"
              endDate="Aug 2025"
              src="/static/companies/bonterra.png"
              description="Researched and prototyped agentic AI pipelines for nonprofit event analysis. Presented findings to 40+ cross-functional stakeholders, shaping early AI adoption strategy."
            />
            <Dropdown
              role="Software Engineer Intern"
              position="TensorStax"
              companyLink="https://www.tensorstax.com"
              startDate="May 2025"
              endDate="Jun 2025"
              src="/static/companies/tensorstax.png"
              description="Designed secure credential-submission UI integrated with HashiCorp Vault, streamlining auth across 50+ enterprise data sources. Built low-latency frontend (Next.js, Redux, WebSockets) supporting 100+ concurrent beta users with sub-100ms response times."
            />
          </div>
        </section>

        <section
          id="leadership-and-campus-involvement"
          className="flex flex-col"
        >
          <SectionHeader>leadership & campus involvement</SectionHeader>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="Officer"
              position="ACM Hack"
              companyLink="https://hack.uclaacm.com/"
              startDate="Nov 2025"
              endDate="Present"
              src="/static/companies/hack.png"
              description="Contributing to cross-team projects and workshops for UCLA's premier software engineering community. Collaborating with 10+ officers to organize hackathons and technical events for 200+ students."
            />
            <Dropdown
              role="Frontend Developer"
              position="exploretech.la"
              companyLink="https://www.exploretech.la/"
              startDate="Sep 2025"
              endDate="Present"
              src="/static/companies/ela.png"
              description="Core member of 5-person web development team rebuilding the organization's website with React and JavaScript. Support Content Board of 10–20 members, helping run workshops and prepare for the Ignite Program in Winter 2026."
            />
            <Dropdown
              role="Frontend Developer"
              position="Mt. SAC Computer Science Club"
              companyLink="https://www.mtsaccs.org"
              startDate="Sep 2024"
              endDate="Jul 2025"
              src="/static/companies/mtsaccs.webp"
              description="Redesigned and rebuilt the Mt. SAC CS Club website using React and Bootstrap, enhancing UX, responsiveness, and access to events, officers, and contact info for 900+ members."
            />
          </div>
        </section>

        <section id="tech-stack" className="flex flex-col">
          <SectionHeader>technologies</SectionHeader>
          <TechStack />
        </section>

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

        <section id="education" className="mt-10">
          <SectionHeader>education</SectionHeader>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="University of California, Los Angeles"
              position="BS, Computer Science"
              schoolLink="https://www.ucla.edu"
              startDate="2025"
              endDate="Present"
              src="/static/schools/ucla.png"
              description="Transfer Research Entry Program, ACM Hack Intern, Content Member & Frontend Developer at exploretech.la, Undergraduate Research Developer for UCLA HCI Research Lab"
            />
            <Dropdown
              role="Mount San Antonio College"
              position="Honors Transfer"
              schoolLink="https://www.mtsac.edu"
              startDate="2023"
              endDate="2025"
              src="/static/schools/mtsac.png"
              description="Outreach Officer & Front-End Developer for the Computer Science Club."
            />
            <Dropdown
              role="Walnut High School"
              position="High School Diploma"
              schoolLink="https://www.walnuths.net"
              startDate="2019"
              endDate="2023"
              src="/static/schools/whs.png"
            />
          </div>
        </section>

        <section id="past-iterations" className="mt-10">
          <SectionHeader>past versions</SectionHeader>
          <div className="flex mx-auto items-center justify-center">
            <PastVersions />
          </div>
        </section>

        <section id="closing-note">
          <div className="w-full justify-between flex flex-col sm:flex-row items-center text-center pt-16 gap-3">
            <div className="flex flex-row gap-3">
              <button
                onClick={() => setVideoId("YWdbfy231n0")}
                className="relative transition-all duration-300 hover:-translate-y-2 cursor-pointer group p-1 md:p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md"
                aria-label="Watch Malenia video"
                style={{ minWidth: 0 }}
              >
                <Image
                  src="/static/hom.png"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 48px, 36px"
                  alt="Watch me defeat Malenia!"
                  className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300 w-9 h-9 md:w-12 md:h-12"
                />
              </button>
              <button
                onClick={() => setVideoId("NaVNh79V4F4")}
                className="relative transition-all duration-300 hover:-translate-y-2 cursor-pointer group p-1 md:p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md"
                aria-label="Watch Radahn video"
                style={{ minWidth: 0 }}
              >
                <Image
                  src="/static/rg.png"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 48px, 36px"
                  alt="Watch me defeat Promised Consort Radahn!"
                  className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300 w-9 h-9 md:w-12 md:h-12"
                />
              </button>
            </div>

            <div className="md:text-right max-w-full sm:max-w-[365px] md:ml-auto text-gray-600 dark:text-slate-400 text-sm">
              <p>
                Loosely inspired by{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://www.framer.com/marketplace/templates/monocv/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MonoCV
                </a>{" "}
                and coded in{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visual Studio Code
                </a>
                . Built with{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://nextjs.org/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://tailwindcss.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://vercel.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Vercel
                </a>
                . <span className="sm:hidden">All text is in</span>{" "}
                <span className="sm:hidden">
                  <a
                    className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                    href="https://www.fontshare.com/fonts/cabinet-grotesk"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Cabinet Grotesk
                  </a>{" "}
                  typeface.
                </span>
              </p>
              <p className="hidden sm:block">
                All text is in{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://www.fontshare.com/fonts/cabinet-grotesk"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cabinet Grotesk
                </a>{" "}
                typeface.
              </p>
            </div>
          </div>
        </section>

        <YouTubeModal
          isOpen={!!videoId}
          onClose={() => setVideoId(null)}
          videoId={videoId || ""}
        />
      </main>
    </motion.div>
  );
}
