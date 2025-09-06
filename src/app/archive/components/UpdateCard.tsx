"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface UpdateCardProps {
  href: string;
  title: string;
  description: string;
}

export default function UpdateCard({ href, title, description }: UpdateCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 w-fit p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
    >
      <div>
        <h3 className="font-medium text-lg text-gray-800 dark:text-slate-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm">
          {description}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
