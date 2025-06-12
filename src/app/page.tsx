"use client";

import Image from "next/image";
import Dropdown from "./components/Dropdown";
import Marquee from "./components/Marquee";
import {
  LocationIcon,
  MailIcon,
  GlobeIcon,
  LinkedInIcon,
  GithubIcon,
  SpotifyIcon,
  Hamburger,
  XIcon,
} from "./svgs/Icons";
import { useState, useEffect } from "react";
import PastVersions from "./components/PastVersions";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import ProjectItem from "./components/SelectedProject";
import { ArrowRight } from "lucide-react";

const YouTubeModal = ({
  isOpen,
  onClose,
  videoId,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 -right-2 -translate-x-1/2 z-10 p-2 text-gray-100 hover:text-white transition-colors bg-black/10 rounded-full backdrop-blur-sm hover:bg-black/50 cursor-pointer"
            aria-label="Close video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "experience",
        "tech-stack",
        "projects",
        "education",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-5 pt-2 md:pt-4 lg:pt-0 pb-8 lg:pb-0 lg:px-8 md:px-20 sm:px-6 max-w-5xl mx-auto flex flex-col min-h-screen lg:flex-row lg:gap-7 lg:justify-between">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:sticky lg:top-0 flex flex-col lg:max-h-screen md:flex md:flex-row lg:flex-col z-50 lg:w-[204px] lg:shrink-0 lg:gap-y-3 lg:py-10 md:gap-3 md:mx-auto 
      mx-auto"
      >
        <div className="bg-white rounded-xl shadow-md p-2 flex sm:flex-row lg:flex-col lg:gap-3 relative">
          <img
            src="/static/ben_pfp22.webp"
            className="h-auto w-32 md:w-28 lg:w-48 rounded-xl"
          />
          <div className="ml-2 pt-2 pr-2 lg:ml-1 lg:pt-0 lg:pr-0">
            <h1 className="text-gray-900 text-2xl lg:text-2xl font-semibold lg:font-semibold tracking-tight leading-none">
              Hello I'm
            </h1>
            <h1 className="text-gray-900 text-2xl lg:text-2xl font-semibold lg:font-semibold tracking-tight">
              Benjamin Garcia
            </h1>
            <h3 className="text-gray-700 text-base lg:text-lg leading-tight mt-2 font-normal">
              I turn code into meaningful creations.
            </h3>
            <div className="flex flex-row gap-1 items-center mt-2">
              <LocationIcon />
              <p className="text-sm text-gray-500 hover:underline">
                Los Angeles, California
              </p>
            </div>
            <button
              onClick={toggleMenu}
              className={`absolute top-2 right-2 md:hidden transition-all duration-300 hover:bg-gray-200 ease-in-out rounded-3xl ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              {isMenuOpen ? <XIcon /> : <Hamburger />}
            </button>
          </div>
        </div>

        <div
          id="socials"
          className={`bg-white rounded-xl shadow-md p-2 flex flex-row gap-3 lg:p-3
              ${isMenuOpen ? "flex" : "hidden"} 
              top-full left-0 right-0 mt-2 z-50 md:flex md:flex-col lg:flex lg:flex-col lg:mt-0 md:mt-0`}
        >
          <div className="flex flex-col gap-2 mt-3 md:mt-0 lg:mt-0 md:gap-1 lg:gap-1 w-full sm:pl-6 md:pl-0 lg:pl-0">
            <a
              className="flex items-center gap-2 hover:underline text-sm mb-1 truncate"
              href="https://www.bentgarcia.com/"
              title="bentgarcia.com"
              target="_blank"
            >
              <GlobeIcon /> <span className="truncate">www.bentgarcia.com</span>
            </a>
            <a
              className="flex items-center gap-2 hover:underline transition duration-300 ease-in-out text-sm truncate"
              href="mailto:bentgarcia05@gmail.com"
              title="bentgarcia05@gmail.com"
              target="_blank"
            >
              <MailIcon />{" "}
              <span className="truncate">bentgarcia05@gmail.com</span>
            </a>
          </div>
          <div className="items-center flex flex-col mt-2 lg:mt-0 md:mt-0 sm:pr-12 md:pr-0 lg:pr-0">
            <div className="flex flex-row items-center justify-center gap-6 mb-3">
              <a
                href="https://www.linkedin.com/in/btgarcia05/"
                target="_blank"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/bgar324"
                target="_blank"
                title="Github"
              >
                <GithubIcon />
              </a>
              <a
                href="https://open.spotify.com/user/13loawolnhae7wiuu1ficd51g"
                target="_blank"
                title="Spotify"
              >
                <SpotifyIcon />
              </a>
            </div>
            <a
              className="bg-black text-white rounded-xl px-4 py-1 text-sm w-fit mx-auto items-center justify-center hover:bg-black/90 font-semibold duration-300 transition ease-in-out"
              href="/resume.pdf"
              target="_blank"
              title="Resume"
            >
              Download My CV
            </a>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:mt-1 bg-white rounded-xl shadow-md p-3">
          <div>
            <a
              href="#about"
              title="Go to About"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "about"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              About
            </a>
            <a
              href="#experience"
              title="Go to Experience"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "experience"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Experience
            </a>
          </div>
          <div>
            <a
              href="#tech-stack"
              title="Go to Tech Stack"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "tech-stack"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Tech Stack
            </a>
            <a
              href="#projects"
              title="Go to Projects"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "projects"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Projects
            </a>
          </div>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex-col lg:w-2/3 lg:py-13"
      >
        <section id="about" className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="w-fit border border-gray-300 rounded-md px-2 py-1 lg:py-[.5px] text-xs lg:text-sm uppercase mt-10 lg:mt-0 lg:mb-5 font-semibold tracking-wider">
              about
            </p>
          </div>

          <p className="text-gray-600 lg:text-lg leading-snug mt-4">
            I'm Benjamin Garcia, a junior majoring in Computer Science at{" "}
            <a
              className="font-medium"
              style={{
                background: "linear-gradient(to right, #1e3a8a, #b45309)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline",
              }}
              href="https://ucla.edu/"
              target="_blank"
            >
              University of California, Los Angeles
            </a>
            . Currently a{" "}
            <span className="font-medium">
              Senior Software Development Intern at{" "}
              <a
                className="text-black"
                href="https://toddagriscience.com"
                target="_blank"
              >
                Todd Agriscience
              </a>
            </span>
            {""} & a{" "}
            <span className="font-medium">
              Research and Development Engineer Intern at{" "}
              <a
                style={{
                  background: "linear-gradient(to right, #feb6b2, #420c7d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline",
                }}
                href="https://www.bonterratech.com/"
                target="_blank"
              >
                Bonterra
              </a>
            </span>
            . I thrive in fast-paced, collaborative teams and build performant,
            accessible interfaces that drive real-world impact.
          </p>
          <p className="mt-2 text-gray-600 lg:text-lg leading-snug ">
            Outside of coding, you can find me at the gym, hanging out with my
            dog, or exploring the{" "}
            <a
              className="font-medium"
              href="/static/image.png"
              target="_blank"
              title="Elden Ring"
            >
              Lands Between.
            </a>
          </p>
        </section>

        <section id="experience" className="flex flex-col">
          <p className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm">
            experience
          </p>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="Research and Development Engineer Intern"
              position="Bonterra"
              startDate="incoming Jul. 2025"
              endDate="Present"
              src="/static/companies/bonterra.png"
            />
            <Dropdown
              role="Senior Software Development Intern"
              position="Todd Agriscience"
              startDate="Mar. 2025"
              endDate="Present"
              src="/static/companies/todd.webp"
              description="Built and deployed a responsive, client-facing dashboard and website (Next.js, Tailwind CSS, Framer Motion) with interactive data visualizations for agricultural insights. Integrated Palantir Foundry and AWS Lambda to stream AI-analyzed crop data into real-time UI components. Designed scalable, accessible UI architecture and modular components."
            />
            <Dropdown
              role="Frontend Developer"
              position="Mt. SAC CS Club"
              startDate="Sep. 2024"
              endDate="Present"
              src="/static/companies/mtsaccs.webp"
              description="Redesigned and rebuilt the Mt. SAC CS Club website using React and Bootstrap, enhancing UX, responsiveness, and access to events, officers, and contact info for 900+ members."
            />
            <Dropdown
              role="Software Engineer Intern"
              position="TensorStax"
              startDate="May 2025"
              endDate="Jun. 2025"
              src="/static/companies/tensorstax.png"
              description="Engineered real-time frontend systems (Next.js, Redux, WebSockets) for low-latency agentic interfaces and dynamic pipeline configuration. Designed and implemented a secure credential submission UI with HashiCorp Vault, Python, and Redis. Collaborated in a fast-paced startup to ship complex internal tooling with asynchronous task flows."
            />
            <Dropdown
              role="AI Engineer"
              position="Outlier AI"
              startDate="Mar. 2024"
              endDate="Apr. 2025"
              src="/static/companies/outlier.webp"
              description="Developed a recursive self-improvement method that reduced trend-based LLM errors by 15–20%, enhancing reasoning through failure-based prompt refinement. Optimized AI response pipelines by analyzing 30–50 outputs per session, leveraging A/B testing, hallucination detection, and effectiveness evaluation to boost accuracy."
            />
          </div>
        </section>

        <section id="tech-stack" className="flex flex-col">
          <p className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase my-10 font-semibold tracking-wider lg:py-[.5px] lg:text-sm">
            tech stack
          </p>
          <Marquee />
          <div className="mb-8" />
        </section>

        <section id="projects">
          <div className="flex flex-row justify-between">
            <p className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm">
              selected projects
            </p>
            <a
              className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm flex items-center gap-1"
              href="/archive"
            >
              project archive
              <ArrowRight size={14} strokeWidth={1} />
            </a>
          </div>

          <div className="flex flex-col gap-y-3">
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
              title="logit"
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
                    het.ai |{" "}
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
            <ProjectItem
              src="/static/project-previews/caduceus.webp"
              title="15th Annual HPC Website"
              description="Designed and launched a mobile-first website for the 15th Annual Health Professions Conference, partnering with the Caduceus Club and backed by a grant and Kaiser Permanente sponsorship. Engineered the site to centralize and streamline over 700 attendees’ access to feedback forms for 36 speakers and 83 vendors/exhibitors, prioritizing accessibility, responsiveness, and frictionless UX. The system was so effective it’s being adopted for future conferences. Received direct praise from organizers for its impact—no technical issues, only a need for greater form visibility. Site significantly improved attendee and staff workflow, simplifying form submission and centralizing event feedback at scale."
              link="https://caduceuswebsitev1.vercel.app"
              githubLink="https://github.com/bgar324/caduceus-club-website"
              tags={["Next.js", "Tailwind CSS", "Vercel", "shadcn-ui"]}
            />
          </div>
        </section>

        <section id="education">
          <p className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm">
            education
          </p>
          <div className="flex flex-col gap-4">
            <Dropdown
              role="University of California, Los Angeles"
              position="BS, Computer Science"
              startDate="2025"
              endDate="Present"
              src="/static/schools/ucla.png"
            />
            <Dropdown
              role="Mount San Antonio College"
              position="Honors"
              startDate="2023"
              endDate="2025"
              src="/static/schools/mtsac.webp"
              description="Outreach Officer & Front-End Developer for the Computer Science Club."
            />
            <Dropdown
              role="Walnut High School"
              position="High School Diploma"
              startDate="2019"
              endDate="2023"
              src="/static/schools/whs.webp"
            />
          </div>
        </section>
        <section id="past-iterations">
          <p className="w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold tracking-wider lg:py-[.5px] lg:text-sm">
            past versions
          </p>
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
                <div
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-75 transition-opacity duration-300 bg-gradient-to-r from-red-300 via-yellow-300 to-red-300 rounded-full animate-aurora"
                  style={{
                    filter: "blur(12px)",
                    width: "calc(100% + 20px)",
                    height: "calc(100% + 20px)",
                    top: "-10px",
                    left: "-10px",
                    backgroundSize: "200% 200%",
                    animation: "aurora 3s ease infinite",
                  }}
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
                <div
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-full animate-aurora"
                  style={{
                    background:
                      "linear-gradient(90deg, #FFD600 0%, #FFB300 50%, #8B0000 100%)",
                    filter: "blur(12px)",
                    width: "calc(100% + 20px)",
                    height: "calc(100% + 20px)",
                    top: "-10px",
                    left: "-10px",
                    backgroundSize: "200% 200%",
                    animation: "aurora 3s ease infinite",
                  }}
                />
              </button>
            </div>

            <div className="sm:text-right max-w-full sm:max-w-[365px] sm:ml-auto text-gray-600  text-sm">
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
      </motion.main>
    </div>
  );
}
