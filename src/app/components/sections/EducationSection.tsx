import SectionHeader from "../SectionHeader";
import Dropdown from "../Dropdown";

export default function EducationSection() {
  return (
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
  );
}
