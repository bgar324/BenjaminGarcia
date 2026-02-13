"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// 1. Define strict types
interface TechItem {
  name: string;
  src: string;
  darkSrc?: string;
}

interface TechCategory {
  [key: string]: TechItem[];
}

const STACK: TechCategory = {
  Frontend: [
    {
      name: "Next.js",
      src: "/static/tech/next.webp",
      darkSrc: "/static/tech/nextdark.webp",
    },
    { name: "React", src: "/static/tech/react.webp" },
    { name: "Tailwind", src: "/static/tech/tailwind.webp" },
    { name: "TypeScript", src: "/static/tech/typescript.webp" },
    { name: "Redux", src: "/static/tech/redux.webp" },
  ],
  Backend: [
    { name: "Python", src: "/static/tech/python.webp" },
    { name: "Postgres", src: "/static/tech/postgres.webp" },
    { name: "Lambda", src: "/static/tech/lambda.webp" },
    { name: "Prisma", src: "/static/tech/prisma.webp" },
    { name: "Firebase", src: "/static/tech/firebase.webp" },
  ],
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function TechStack() {
  return (
    <div
      className="
        flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-black overflow-hidden"
    >
      {Object.entries(STACK).map(([category, items]) => (
        <StackRow key={category} category={category} items={items} />
      ))}
    </div>
  );
}

function StackRow({
  category,
  items,
}: {
  category: string;
  items: TechItem[];
}) {
  return (
    <div
      className="
        flex flex-col md:grid md:grid-cols-[120px_1fr] gap-4 
        p-6 border-b border-gray-100 dark:border-gray-800 last:border-0
      "
    >
      {/* Category Label */}
      <div className="flex items-center">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {category}
        </h3>
      </div>

      {/* Tech Pills Area */}
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <motion.li key={item.name} variants={itemVariants}>
            <TechPill item={item} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function TechPill({ item }: { item: TechItem }) {
  return (
    <div
      className="
        group flex items-center gap-2 
        bg-gray-50 dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        px-3 py-1.5 rounded-full 
        transition-all duration-300
        hover:border-gray-300 dark:hover:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-800
        cursor-default select-none
      "
    >
      {/* Icon Wrapper */}
      <div className="relative w-4 h-4 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100">
        {/* Dual Image strategy for Dark Mode hydration safety */}
        {item.darkSrc ? (
          <>
            <Image
              src={item.src}
              alt={item.name}
              fill
              sizes="16px"
              className="object-contain dark:hidden"
            />
            <Image
              src={item.darkSrc}
              alt={item.name}
              fill
              sizes="16px"
              className="object-contain hidden dark:block"
            />
          </>
        ) : (
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes="16px"
            className="object-contain"
          />
        )}
      </div>

      {/* Text */}
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
        {item.name}
      </span>
    </div>
  );
}
