import SectionHeader from "../SectionHeader";
import Dropdown from "../Dropdown";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="flex flex-col"
    >
      <SectionHeader id="experience-heading">experience</SectionHeader>
      <div className="flex flex-col gap-4">
        <Dropdown
          role="Software Engineer Intern"
          position="Lindy"
          imageLink="https://www.lindy.ai"
          startDate="Summer 2026"
          src="/static/companies/lindy.png"
          description="Lindy is an AI work assistant and no-code agent platform that automates inbox, meetings, scheduling, CRM updates, and other cross-app business workflows."
        />
        <Dropdown
          role="Researcher"
          position="UCLA HCI Research Lab"
          imageLink="https://www.hci.ucla.edu"
          startDate="Dec 2025"
          endDate="Present"
          src="/static/companies/ucla-hci.png"
          darkSrc="/static/companies/ucla-hci-dark.png"
          description="Working in Professor Xiang “Anthony” Chen’s Human–Computer Interaction Lab, advised by Youngseung Jeon, on interactive systems for human–AI collaboration and hypothesis exploration."
        />
        <Dropdown
          role="Software Engineer Intern"
          position="Todd Agriscience"
          imageLink="https://www.toddagriscience.com/"
          startDate="Mar 2025"
          endDate="Oct 2025"
          src="/static/companies/todd.png"
          description="Built and deployed Todd's first client-facing dashboard using Next.js, enabling 5–10 early customers to visualize AI-powered crop insights. Work contributed to scaling the team from 1 to 14 engineers and drove initial product adoption."
        />
        <Dropdown
          role="Research & Development Engineer Intern"
          position="Bonterra"
          imageLink="https://www.bonterratech.com/"
          startDate="Jul 2025"
          endDate="Aug 2025"
          src="/static/companies/bonterra.webp"
          description="Researched and prototyped agentic AI pipelines for nonprofit event analysis. Presented findings to 40+ cross-functional stakeholders, shaping early AI adoption strategy."
        />
        <Dropdown
          role="Software Engineer Intern"
          position="TensorStax"
          imageLink="https://www.tensorstax.com"
          startDate="May 2025"
          endDate="Jun 2025"
          src="/static/companies/tensorstax.png"
          description="Designed secure credential-submission UI integrated with HashiCorp Vault, streamlining auth across 50+ enterprise data sources. Built low-latency frontend (Next.js, Redux, WebSockets) supporting 100+ concurrent beta users with sub-100ms response times."
        />
      </div>
    </section>
  );
}
