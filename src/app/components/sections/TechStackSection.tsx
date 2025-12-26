import SectionHeader from "../SectionHeader";
import TechStack from "../TechStack";

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="flex flex-col">
      <SectionHeader>technologies</SectionHeader>
      <TechStack />
    </section>
  );
}
