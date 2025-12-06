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

        {/* ... Keep all other sections (Experience, Projects, etc) exactly the same ... */}

        <section id="experience" className="flex flex-col">
          <SectionHeader>experience</SectionHeader>
          {/* ... Dropdowns ... */}
          <div className="flex flex-col gap-4">
            <Dropdown
              role="Undergraduate Research Developer"
              position="UCLA HCI Research Lab"
              companyLink="https://hci.ucla.edu"
              startDate="Joining Dec. 2025"
              src="/static/companies/ucla-hci.png"
              darkSrc="/static/companies/ucla-hci-dark.png"
              description="Joining Professor Xiang “Anthony” Chen’s Human-Computer Interaction Lab in Winter 2026, where I’ll collaborate with designers and researchers to prototype and explore new interaction experiences."
            />
            <Dropdown
              role="Senior Software Development Intern"
              position="Todd Agriscience"
              companyLink="https://www.toddagriscience.com/"
              startDate="Mar. 2025"
              endDate="Oct. 2025"
              src="/static/companies/todd-dark.png"
              description="I built and deployed Todd’s first client-facing dashboard and landing site using Next.js, Tailwind CSS, and Framer Motion, creating a responsive interface for AI-powered crop insights. I linked backend inference pipelines directly into dynamic UI components, enabling farmers to visualize 20+ real-time data streams including soil, irrigation, weather, and yield metrics. The work helped the company’s initial 5–10 clients adopt the platform and was recognized by the founder for driving both product adoption and internal growth, scaling the team from just one intern to fourteen engineers after my internship."
            />
            <Dropdown
              role="Research & Development Engineer Intern"
              position="Bonterra"
              companyLink="https://www.bonterratech.com/"
              startDate="Jul. 2025"
              endDate="Aug. 2025"
              src="/static/companies/bonterra.png"
              description="At Bonterra, I researched and prototyped agentic AI systems tailored for nonprofit event analysis. I modeled key outcomes like attendance, retention, and fundraising while benchmarking orchestration pipelines across five agent frameworks to assess scalability and efficiency. My findings were presented to an audience of 40–50 cross-functional stakeholders—including engineers, analysts, and senior leadership—and directly shaped early strategies for adopting AI to improve nonprofit impact measurement."
            />
            <Dropdown
              role="Software Engineer Intern"
              position="TensorStax"
              companyLink="https://www.tensorstax.com"
              startDate="May 2025"
              endDate="Jun. 2025"
              src="/static/companies/tensorstax.png"
              description="At TensorStax, I owned the design and development of a secure credential-submission UI integrated with HashiCorp Vault, which streamlined authentication across 50+ enterprise data sources such as AWS Glue, Snowflake, MongoDB, Postgres, Airflow, dbt, and Spark. I also built low-latency frontend systems with Next.js, Redux, and WebSockets that supported 100+ concurrent beta users with sub-100ms latency. Over the course of the internship, I contributed to 30+ reusable UI components and collaborated with a 10–15 person engineering team spanning frontend, machine learning, and infrastructure."
            />
          </div>
        </section>

        <section
          id="leadership-and-campus-involement"
          className="flex flex-col"
        >
          <SectionHeader>leadership & campus involvement</SectionHeader>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="Officer"
              position="ACM Hack"
              companyLink="https://hack.uclaacm.com/"
              startDate="Nov. 2025"
              endDate="Present"
              src="/static/companies/hack.png"
              description="Supporting ACM Hack's engineering initiatives through contributing to cross-team projects, workshops, and events."
            />
            <Dropdown
              role="Web Developer"
              position="exploretech.la"
              companyLink="https://www.exploretech.la/"
              startDate="Sep. 2025"
              endDate="Present"
              src="/static/companies/ela.png"
              description="Core member of a 5-person web development team rebuilding the organization’s website with React and JavaScript. Contribute to Jira-driven workflows, GitHub Actions, and CI/CD pipelines. Also support the 10–20 person Content Board, helping run workshops and prepare for the Ignite Program in Winter 2026."
            />
            <Dropdown
              role="Frontend Developer"
              position="Mt. SAC Computer Science Club"
              companyLink="https://www.mtsaccs.org"
              startDate="Sep. 2024"
              endDate="Jul. 2025"
              src="/static/companies/mtsaccs.webp"
              description="Redesigned and rebuilt the Mt. SAC CS Club website using React and Bootstrap, enhancing UX, responsiveness, and access to events, officers, and contact info for 900+ members."
            />
          </div>
        </section>

        <section id="tech-stack" className="flex flex-col">
          <SectionHeader className="my-10">technologies</SectionHeader>
          <Marquee />
          <div className="mb-8" />
        </section>

        <section id="projects">
          <div className="flex flex-row justify-between">
            <SectionHeader>selected projects</SectionHeader>
            <a
              href="/archive"
              className="group w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm flex items-center gap-1 text-center"
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
              src="/static/project-previews/rift-report.png"
              title="Rift Report"
              description="Built a full-stack analytics platform that aggregates and visualizes over 1,000+ ranked matches from the Riot Games API. The dashboard highlights role distribution, champion performance trends, and build efficiency, giving players a data-driven lens into their gameplay. To ensure responsiveness at scale, I implemented caching and rate-limiting strategies that reduced fetch times by 40%, while still delivering real-time timelines, item builds, and matchup insights. Designed with a clean, interactive interface, the tool helps users explore both aggregate trends and individual match breakdowns seamlessly."
              githubLink="https://github.com/bgar324/Rift-Report"
              tags={["Next.js", "Tailwind CSS", "TypeScript", "Riot API"]}
            />
            <ProjectItem
              src="/static/project-previews/git-proof.png"
              title="Git Proof"
              description="An AI-powered GitHub analytics and report generation tool that transforms public repositories into recruiter-ready summaries. Users can generate commit heatmaps, analyze tech stacks, and receive AI-generated repository insights and README suggestions using Google Gemini. Built with Next.js, Tailwind CSS, and TypeScript, Git Proof also offers professional PDF exports powered by jsPDF and @react-pdf/renderer, all wrapped in a secure, OAuth-authenticated experience. Originally developed and presented during the final round of Bonterra’s R&D internship interview."
              githubLink="https://github.com/bgar324/gitproof"
              tags={[
                "Next.js",
                "Tailwind CSS",
                "TypeScript",
                "Gemini API",
                "GitHub API",
                "React PDF",
              ]}
            />
            <ProjectItem
              src="/static/project-previews/mtsaccsprev.png"
              title="Computer Science Club Website"
              description="Rebuilt the Mt. SAC Computer Science Club website (v2) using Next.js, TypeScript, and Tailwind CSS, replacing the previous Bootstrap-based build. Engineered modular, reusable components and implemented mobile-first design, semantic HTML, and static optimization. Integrated structured data-driven rendering for events, directories, and dynamic routes to enhance scalability and maintainability across the 900+ member platform."
              link="https://mtsaccs.org"
              githubLink="https://github.com/bgar324/mtsaccs-v2"
              tags={["Next.js", "Tailwind CSS", "TypeScript", "Vercel"]}
            />
            <ProjectItem
              src="/static/project-previews/logit-preview.webp"
              title="Logit"
              description="A full-stack workout logging app designed for a minimal and efficient tracking experience. Users can log workouts, edit past sessions with a React-calendar, and track progress with Recharts visualizations. Workouts are stored in a PostgreSQL database, with support for tags, comments, and dropsets. Built with Next.js, Tailwind CSS, and Prisma, it streamlines workout management while enabling progressive overload tracking."
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
              description="Collaborated in a team of four to build het.ai (Hand Ergonomic Tracker) during HackTech 2025, a real-time wrist diagnostic platform that visualizes hand posture and calculates ergonomic risk using the Leap Motion Controller. I led the frontend development using Next.js and Tailwind CSS, building interactive visualizations and a dynamic dashboard that interfaces with a FastAPI backend and Firebase Firestore. The platform outputs flexion, deviation, and pronation angles, enabling users to receive live feedback and long-term session insights for improving typing ergonomics."
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
              description="Transfer Research Entry Program, ACM Hack Intern, Content Member & Web Developer at exploretech.la, Undergraduate Research Developer for UCLA HCI Research Lab"
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
          <div className="w-full justify-between flex flex-col md:flex-row items-center text-center pt-16 gap-3">
            <div className="flex flex-row gap-3">
              <button
                onClick={() => setVideoId("YWdbfy231n0")}
                className="relative transition-all duration-300 hover:-translate-y-2 focus:outline-none cursor-pointer group p-1 md:p-2"
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
                className="relative transition-all duration-300 hover:-translate-y-2 focus:outline-none cursor-pointer group p-1 md:p-2"
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

            <div className="sm:text-right max-w-full sm:max-w-[365px] sm:ml-auto text-gray-600 dark:text-slate-400 text-sm">
              <p>
                Loosely inspired by{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
                  href="https://www.framer.com/marketplace/templates/monocv/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MonoCV
                </a>{" "}
                and coded in{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visual Studio Code
                </a>
                . Built with{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
                  href="https://nextjs.org/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
                  href="https://tailwindcss.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
                  href="https://vercel.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Vercel
                </a>
                . <span className="sm:hidden">All text is in</span>{" "}
                <span className="sm:hidden">
                  <a
                    className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
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
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474]"
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
