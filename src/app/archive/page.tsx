import ConfigurableProjectTable from "./components/ConfigurableProjectTable";
import { ArrowLeft } from "lucide-react";
import PageReveal from "../components/PageReveal";

export default function ArchivePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-6 md:pt-12 lg:pt-24 pb-16 text-gray-900 dark:text-slate-100 transition-colors">
      <PageReveal>
        <a
          href="/"
          className="flex flex-row gap-2 items-center text-center hover:text-black dark:hover:text-slate-200 mb-4 arrow-link transition-colors duration-300"
        >
          <ArrowLeft className="arrow-icon" size={14} />
          Benjamin Garcia
        </a>

        <div className="flex justify-between items-start mt-5 mb-10">
          <h1 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase tracking-wider lg:py-[.5px] flex items-center gap-1 text-xl md:text-3xl font-bold">
            Project Archive
          </h1>
        </div>
      </PageReveal>

      <PageReveal delay={0.2}>
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-4 md:p-6 transition-colors duration-300">
          <ConfigurableProjectTable type="archive" />
        </div>
      </PageReveal>
    </main>
  );
}
