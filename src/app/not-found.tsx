"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-5 md:px-20 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen text-center"
    >
      <p className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-xs uppercase font-semibold tracking-wider lg:text-sm mb-6 text-black dark:text-white">
        404
      </p>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white mb-3">
        Page not found
      </h1>

      <p className="text-muted-foreground text-sm sm:text-base max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 active:scale-95"
      >
        <span aria-hidden="true">&larr;</span>
        Back to home
      </Link>
    </motion.div>
  );
}
