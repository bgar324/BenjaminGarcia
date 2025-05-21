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
      className="group flex items-center gap-2 w-fit p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
    >
      <div>
        <h3 className="font-medium text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
