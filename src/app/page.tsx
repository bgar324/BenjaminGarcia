import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import PageReveal from "./components/PageReveal";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import LeadershipSection from "./components/sections/LeadershipSection";
import TechStackSection from "./components/sections/TechStackSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import EducationSection from "./components/sections/EducationSection";
import FooterSection from "./components/sections/FooterSection";
import { absoluteUrl, siteConfig } from "./seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: absoluteUrl("/"),
  },
};

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl("/static/me.jpeg"),
    email: siteConfig.email,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    knowsAbout: siteConfig.keywords,
    sameAs: siteConfig.sameAs,
    homeLocation: {
      "@type": "Place",
      name: siteConfig.location,
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of California, Los Angeles",
        sameAs: "https://ucla.edu/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Mount San Antonio College",
        sameAs: "https://www.mtsac.edu/",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />

      <PageReveal
        className="page-shell-gutter pt-2 md:pt-4 lg:pt-0 pb-8 lg:pb-0 max-w-5xl mx-auto flex flex-col min-h-screen lg:flex-row lg:gap-7 lg:justify-between"
      >
        <div className="lg:py-10">
          <Sidebar />
        </div>

        <main
          aria-labelledby="home-heading"
          className="flex-1 flex-col lg:w-2/3 lg:py-13 pt-6"
        >
          <h1 id="home-heading" className="sr-only">
            {siteConfig.title}
          </h1>
          <AboutSection />
          <ExperienceSection />
          {/* <LeadershipSection />
          <TechStackSection /> */}
          <ProjectsSection />
          <EducationSection />
          <FooterSection />
        </main>
      </PageReveal>
    </>
  );
}
