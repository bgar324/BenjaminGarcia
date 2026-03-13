import Sidebar from "./components/Sidebar";
import PageReveal from "./components/PageReveal";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import LeadershipSection from "./components/sections/LeadershipSection";
import TechStackSection from "./components/sections/TechStackSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import EducationSection from "./components/sections/EducationSection";
import FooterSection from "./components/sections/FooterSection";

export default function Home() {
  return (
    <PageReveal
      className="px-5 pt-2 md:pt-4 lg:pt-0 pb-8 lg:pb-0 lg:px-8 md:px-20 sm:px-6 max-w-5xl mx-auto flex flex-col min-h-screen lg:flex-row lg:gap-7 lg:justify-between"
    >
      <div className="lg:py-10">
        <Sidebar />
      </div>

      <main className="flex-1 flex-col lg:w-2/3 lg:py-13 pt-6">
        <AboutSection />
        <ExperienceSection />
        <LeadershipSection />
        <TechStackSection />
        <ProjectsSection />
        <EducationSection />
        <FooterSection />
      </main>
    </PageReveal>
  );
}
