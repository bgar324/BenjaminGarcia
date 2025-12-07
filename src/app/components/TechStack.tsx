"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// FIXED: Changed 'icon' to 'src' to match the component logic
const STACK = {
  Frontend: [
    {
      name: "Next.js",
      src: "/static/tech/next.webp",
      darkSrc: "/static/tech/nextdark.png",
    },
    { name: "React", src: "/static/tech/react.webp" },
    { name: "Tailwind", src: "/static/tech/tailwind.webp" },
    { name: "TypeScript", src: "/static/tech/typescript.png" },
    { name: "Redux", src: "/static/tech/redux.png" },
  ],
  Backend: [
    { name: "Python", src: "/static/tech/python.webp" },
    { name: "Postgres", src: "/static/tech/postgres.png" },
    { name: "Lambda", src: "/static/tech/lambda.png" },
    { name: "Prisma", src: "/static/tech/prisma.png" },
    { name: "Firebase", src: "/static/tech/firebase.png" },
  ],
  "Languages & Tools": [
    { name: "C++", src: "/static/tech/c++.webp" },
    { name: "Git", src: "/static/tech/git.png" },
  ],
};

export default function TechStack() {
  return (
    <div
      className="
        flex flex-col gap-6 rounded-xl border border-gray-200 dark:border-gray-600 
        p-6 transition-all duration-300 
        bg-white dark:bg-black
      "
    >
      {Object.entries(STACK).map(([category, items], i) => (
        <StackRow key={category} category={category} items={items} index={i} />
      ))}
    </div>
  );
}

// Sub-component for each row
function StackRow({
  category,
  items,
  index,
}: {
  category: string;
  items: any[];
  index: number;
}) {
  return (
    <div
      className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10 border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0"
    >
      {/* Category Label */}
      <div className="md:w-32 shrink-0">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {category}
        </h3>
      </div>

      {/* Tech Pills Area */}
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <TechPill key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

// The "Upgraded Tag" Component
function TechPill({ item }: { item: any }) {
  return (
    <div
      className="
        group flex items-center gap-2 
        bg-gray-100 dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700
        px-3 py-1.5 rounded-full 
        transition-all duration-200 
        hover:border-gray-300 dark:hover:border-gray-500
        cursor-default
      "
    >
      {/* Icon Wrapper */}
      <div className="relative w-4 h-4 grayscale group-hover:grayscale-0 transition-all duration-300">
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
      <span className="text-xs font-medium text-gray-600 dark:text-slate-300">
        {item.name}
      </span>
    </div>
  );
}
