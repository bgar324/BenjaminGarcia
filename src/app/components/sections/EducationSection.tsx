import SectionHeader from "../SectionHeader";
import Dropdown from "../Dropdown";

export default function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-heading" className="mt-10">
      <SectionHeader id="education-heading">education</SectionHeader>
      <div className="flex flex-col gap-4">
        <Dropdown
          role="University of California, Los Angeles"
          position="BS, Computer Science"
          imageLink="https://www.ucla.edu"
          startDate="2025"
          endDate="Present"
          src="/static/schools/ucla.webp"
          description="Transfer Research Entry Program, ACM Hack Intern, Content Member & Frontend Developer at exploretech.la, Undergraduate Research Developer for UCLA HCI Research Lab"
        />
        <Dropdown
          role="Mount San Antonio College"
          position="Honors Transfer"
          imageLink="https://www.mtsac.edu"
          startDate="2023"
          endDate="2025"
          src="/static/schools/mtsac.webp"
          description="Outreach Officer & Front-End Developer for the Computer Science Club."
        /> 
      </div>
    </section>
  );
}
