import ArchiveTable from "./components/ArchiveTable";
import PlannedTable from "./components/PlannedTable";
import { ArrowLeft } from "lucide-react";

export default function ArchivePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
      <a
        href="/"
        className="flex flex-row gap-2 items-center text-center hover:text-black mb-4"
      >
        <ArrowLeft size={14} />
        Benjamin Garcia
      </a>
      <h1 className="w-fit border border-gray-300 rounded-md px-2 py-1 uppercase mt-5  tracking-wider lg:py-[.5px] flex items-center gap-1 text-xl md:text-3xl font-bold mb-10">
        All Projects
      </h1>
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
