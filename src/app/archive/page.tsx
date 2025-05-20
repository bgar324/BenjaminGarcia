import ArchiveTable from "./components/ArchiveTable";
import PlannedTable from "./components/PlannedTable";
import { ArrowLeft } from "lucide-react";

export default function ArchivePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
      <a
        href="/"
        className="flex flex-row gap-2 items-center text-center hover:text-black mb-4 arrow-link"
      >
        <ArrowLeft className="arrow-icon" size={14} />
        Benjamin Garcia
      </a>
      <div className="relative mt-5 mb-10">
        <h1 className="w-fit border border-gray-300 rounded-md px-2 py-1 uppercase tracking-wider lg:py-[.5px] flex items-center gap-1 text-xl md:text-3xl font-bold">
          All Projects
        </h1>
        <div className="hidden md:block absolute top-0 right-0 text-xs text-gray-500 text-start">
          <div className = "leading-loose"><span className="font-medium">In Progress</span> – Currently being developed</div>
          <div className = "leading-loose"><span className="font-medium">Planned</span> – Upcoming, scoped but not started</div>
          <div className = "leading-loose"><span className="font-medium">Backlog</span> – Paused or deprioritized</div>
        </div>
      </div>
      <section className="mt-10">
        <h2 className="w-fit border border-gray-300 rounded-md px-2 py-1  uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Planned Projects
        </h2>

        <PlannedTable />
      </section>
      <section>
        <h2 className="w-fit border border-gray-300 rounded-md px-2 py-1  uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Past Projects
        </h2>
        <ArchiveTable />
      </section>
    </main>
  );
}
