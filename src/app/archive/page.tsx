import ArchiveTable from "./components/ArchiveTable";
import PlannedTable from "./components/PlannedTable";
import ScrappedTable from "./components/ScrappedTable";
import UpdateCard from "./components/UpdateCard";
import { ArrowLeft } from "lucide-react";

export default function ArchivePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-6 md:pt-12 lg:pt-24 pb-16 text-gray-900 dark:text-slate-100 transition-colors">
      <a
        href="/"
        className="flex flex-row gap-2 items-center text-center hover:text-black dark:hover:text-slate-200 mb-4 arrow-link"
      >
        <ArrowLeft className="arrow-icon" size={14} />
        Benjamin Garcia
      </a>

      <div className="flex justify-between items-start mt-5 mb-10">
        <h1 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase tracking-wider lg:py-[.5px] flex items-center gap-1 text-xl md:text-3xl font-bold">
          All Projects
        </h1>
        {/* <div className="hidden md:flex flex-col gap-2 text-xs text-gray-500 dark:text-slate-400 text-start w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1">
          <div>
            <span className="font-medium text-gray-900 dark:text-slate-100">In Progress</span> – Currently being developed
          </div>
          <div>
            <span className="font-medium text-gray-900 dark:text-slate-100">Planned</span> – Upcoming, scoped but not started
          </div>
          <div>
            <span className="font-medium text-gray-900 dark:text-slate-100">Backlog</span> – Paused or deprioritized
          </div>
          <div>
            <span className="font-medium text-gray-900 dark:text-slate-100">Scrapped</span> – Explored but intentionally discontinued
          </div>
        </div> */}
      </div>

      <section>
        <h2 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Recent Updates
        </h2>
        <UpdateCard
          href="/blog/loma-lookup-retrospective"
          title="Loma Lookup Project Retrospective"
          description="A look back at what I learned from the Loma Lookup project"
        />
      </section>

      <section className="mt-10">
        <h2 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Planned Projects (3)
        </h2>
        <PlannedTable />
      </section>

      <section>
        <h2 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Past Projects (7)
        </h2>
        <ArchiveTable />
      </section>

      <section>
        <h2 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase mt-10 tracking-wider lg:py-[.5px] flex items-center gap-1 text-lg md:text-xl font-bold mb-5">
          Scrapped Projects (3)
        </h2>
        <ScrappedTable />
      </section>
    </main>
  );
}
