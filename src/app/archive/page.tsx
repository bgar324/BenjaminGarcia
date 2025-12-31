"use client";

import ConfigurableProjectTable from "./components/ConfigurableProjectTable";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

export default function ArchivePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-6 md:pt-12 lg:pt-24 pb-16 text-gray-900 dark:text-slate-100 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-10"
      >
        <SectionHeader>planned projects (3)</SectionHeader>
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-4 md:p-6 transition-colors duration-300">
          <ConfigurableProjectTable type="planned" />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <SectionHeader>past projects (8)</SectionHeader>
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md dark:shadow-lg p-4 md:p-6 transition-colors duration-300">
          <ConfigurableProjectTable type="archive" />
        </div>
      </motion.section>

    </main>
  );
}
