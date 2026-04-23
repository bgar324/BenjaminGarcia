import SectionHeader from "../SectionHeader";
import Dropdown from "../Dropdown";

export default function LeadershipSection() {
  return (
    <section
      id="leadership-and-campus-involvement"
      aria-labelledby="leadership-heading"
      className="flex flex-col"
    >
      <SectionHeader id="leadership-heading">
        leadership & campus involvement
      </SectionHeader>
      <div className="flex flex-col gap-4">
        <Dropdown
          role="Software Engineer Lead"
          position="ACM Hack"
          imageLink="https://hack.uclaacm.com/"
          startDate="Sep 2025"
          endDate="Present"
          src="/static/companies/hack.png"
          description="Contributing to cross-team projects and workshops for UCLA's premier software engineering community. Collaborating with 10+ officers to organize hackathons and technical events for 200+ students."
        />
        <Dropdown
          role="Frontend Developer"
          position="exploretech.la"
          imageLink="https://www.exploretech.la/"
          startDate="Sep 2025"
          endDate="Present"
          src="/static/companies/ela.webp"
          description="Core member of 5-person web development team rebuilding the organization's website with React and JavaScript. Support Content Board of 10–20 members, helping run workshops and prepare for the Ignite Program in Winter 2026."
        />
        {/* <Dropdown
          role="Frontend Developer"
          position="Mt. SAC Computer Science Club"
          imageLink="https://www.mtsaccs.org"
          startDate="Sep 2024"
          endDate="Jul 2025"
          src="/static/companies/mtsaccs.webp"
          description="Redesigned and rebuilt the Mt. SAC CS Club website using React and Bootstrap, enhancing UX, responsiveness, and access to events, officers, and contact info for 900+ members."
        /> */}
      </div>
    </section>
  );
}
