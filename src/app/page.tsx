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
import { motion } from "framer-motion";
import ProjectItem from "./components/SelectedProject";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

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
                Irvine, California
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
              href="/static/resume.pdf"
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
            <span
              className="font-medium"
              style={{
                background: "linear-gradient(to right, #1e3a8a, #b45309)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline",
              }}
            >
              University of California, Irvine
            </span>
            . Currently a{" "}
            <span className="font-medium">
              Full Stack Engineer Intern at{" "}
              <a
                className="text-black"
                href="https://toddagriscience.com"
                target="_blank"
              >
                Todd
              </a>
            </span>
            {""} & a{" "}
            <span className="font-medium">
              Software Engineer Intern at{" "}
              <a
                style={{
                  background: "linear-gradient(to right, #ee512d, #000000)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline",
                }}
                href="https://tensorstax.com"
                target="_blank"
              >
                TensorStax
              </a>
            </span>
            . I build performant, accessible interfaces and engineer systems
            that translate design into impact.
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
              role="Software Engineer Intern"
              position="TensorStax"
              startDate="May 2025"
              endDate="Present"
              src="/static/companies/tensorstax.png"
              description="Engineered real-time frontend systems (Next.js, Redux, WebSockets) for low-latency agentic interfaces and dynamic pipeline configuration. Designed and implemented a secure credential submission UI with HashiCorp Vault, Python, and Redis. Collaborated in a fast-paced startup to ship complex internal tooling with asynchronous task flows."
            />
            <Dropdown
              role="Full Stack Engineer Intern"
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
              role="Frontend Developer"
              position="AdeptEye"
              startDate="Sep. 2024"
              endDate="Apr. 2025"
              src="/static/companies/adepteye.webp"
              description="Revamped and optimized client websites on Shopify and Squarespace, improving UX, reducing load times by 40–50%, and launching scalable e-commerce platforms with POS integration and 1,800+ page views in the first week."
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
                  <div className = "flex flex-row items-center">
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
                      <span>
                        HackTech 2025
                      </span>
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
              role="University of California, Irvine"
              position="BS, Computer Science"
              startDate="2025"
              endDate="Present"
              src="/static/schools/uci.webp"
              description="Campuswide Honors Collegium"
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
          <div className="sm:text-right max-w-full sm:max-w-[365px] sm:ml-auto text-gray-600 pt-16 text-sm">
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
        </section>
      </motion.main>
    </div>
  );
}
