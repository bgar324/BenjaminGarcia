import SectionHeader from "../SectionHeader";
import TechStack from "../TechStack";

export default function TechStackSection() {
  return (
    <section id="tech-stack" aria-labelledby="tech-stack-heading" className="flex flex-col">
      <SectionHeader id="tech-stack-heading">technologies</SectionHeader>
      <TechStack />
    </section>
  );
}
