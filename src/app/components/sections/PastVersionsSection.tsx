import SectionHeader from "../SectionHeader";
import PastVersions from "../PastVersions";

export default function PastVersionsSection() {
  return (
    <section id="past-iterations" className="mt-10">
      <SectionHeader>past versions</SectionHeader>
      <div className="flex mx-auto items-center justify-center">
        <PastVersions />
      </div>
    </section>
  );
}
