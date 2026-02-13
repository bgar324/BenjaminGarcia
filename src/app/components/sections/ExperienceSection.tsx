import SectionHeader from "../SectionHeader";
import Dropdown from "../Dropdown";

export default function ExperienceSection() {
  return (
    <section id="experience" className="flex flex-col">
      <SectionHeader>experience</SectionHeader>
      <div className="flex flex-col gap-4">
        <Dropdown
          role="Interface Undergraduate Researcher "
          position="UCLA HCI Research Lab"
          companyLink="https://hci.ucla.edu"
          startDate="Dec 2025"
          endDate="Present"
          src="/static/companies/ucla-hci.png"
          darkSrc="/static/companies/ucla-hci-dark.png"
          description="Working in Professor Xiang “Anthony” Chen’s Human–Computer Interaction Lab, advised by Youngseung Jeon, on interactive systems for human–AI collaboration and hypothesis exploration."
        />
        <Dropdown
          role="Software Engineer Intern"
          position="Todd Agriscience"
          companyLink="https://www.toddagriscience.com/"
          startDate="Mar 2025"
          endDate="Oct 2025"
          src="/static/companies/todd-dark.webp"
          description="Built and deployed Todd's first client-facing dashboard using Next.js, enabling 5–10 early customers to visualize AI-powered crop insights. Work contributed to scaling the team from 1 to 14 engineers and drove initial product adoption."
        />
        <Dropdown
          role="Research & Development Engineer Intern"
          position="Bonterra"
          companyLink="https://www.bonterratech.com/"
          startDate="Jul 2025"
          endDate="Aug 2025"
          src="/static/companies/bonterra.webp"
          description="Researched and prototyped agentic AI pipelines for nonprofit event analysis. Presented findings to 40+ cross-functional stakeholders, shaping early AI adoption strategy."
        />
        <Dropdown
          role="Software Engineer Intern"
          position="TensorStax"
          companyLink="https://www.tensorstax.com"
          startDate="May 2025"
          endDate="Jun 2025"
          src="/static/companies/tensorstax.webp"
          description="Designed secure credential-submission UI integrated with HashiCorp Vault, streamlining auth across 50+ enterprise data sources. Built low-latency frontend (Next.js, Redux, WebSockets) supporting 100+ concurrent beta users with sub-100ms response times."
        />
      </div>
    </section>
  );
}
