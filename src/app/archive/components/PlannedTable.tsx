// components/PlannedTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRightFromSquareIcon } from "lucide-react";


interface PlannedProject {
  title: string;
  plannedFor: string;             // year / season
  stack: string[];
  madeAt?: string;                // optional
  link?: string;                  // optional
  label?: string;                 // text shown in Link column
}

const plannedProjects: PlannedProject[] = [
  {
    title: "CS Club v2",
    plannedFor: "2025",
    stack: ["Next.js", "Tailwind", "framer-motion"],
    madeAt: "Mt. SAC"
  },
  {
    title: "LLU Attendee Lookup",
    plannedFor: "2025",
    stack: ["Next.js", "Tailwind", "Firebase", "Google Vision API"],
    madeAt: "LLU Dental School"
  },
  {
    title: "log•it v2",
    plannedFor: "2025",
    stack: ["Next.js", "Tailwind", "Firebase"],
  },
  {
    title: "Tax Mavericks",
    plannedFor: "2025",
    stack: ["Next.js", "Tailwind", "Firebase"],
    madeAt: "AdeptEye"
  },
  {
    title: "Open CV AI Squat Analyzer",
    plannedFor: "2025",
    stack: ["Next.js", "Tailwind", "Firebase", "Python", "OpenCV"],
  },
];

export default function PlannedTable() {
  return (
    <Table className="w-full table-fixed">
      {/* identical colgroup to ArchiveTable */}
      <colgroup>
        <col className="w-[100px] md:w-[120px]" />
        <col />
        <col className="hidden md:table-column w-[180px]" />
        <col className="hidden md:table-column w-[45%]" />
        <col className="hidden md:table-column w-[100px]" />
      </colgroup>

      <TableHeader>
        <TableRow>
          <TableHead className="text-base">Year</TableHead>
          <TableHead className="text-base">Project</TableHead>
          <TableHead className="hidden md:table-cell text-base">Made at</TableHead>
          <TableHead className="hidden md:table-cell text-base">Built With</TableHead>
          <TableHead className="hidden md:table-cell text-base">Link</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {plannedProjects.map(({ plannedFor, title, stack, madeAt, link, label }) => (
          <TableRow key={title}>
            {/* Year / Planned For */}
            <TableCell className="whitespace-nowrap text-base py-4">{plannedFor}</TableCell>

            {/* Title (on mobile also carries link icon) */}
            <TableCell className="font-medium text-base">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  {title}
                  <ArrowUpRightFromSquareIcon className="inline-block md:hidden" size={14} />
                </a>
              ) : (
                title
              )}
            </TableCell>

            {/* Made At (desktop only) */}
            <TableCell className="hidden lg:table-cell text-gray-600 text-base">
              {madeAt ?? "—"}
            </TableCell>

            {/* Tech stack (desktop only) */}
            <TableCell className="hidden md:table-cell">
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-200 text-black px-2 py-1 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TableCell>

            {/* Link column (desktop only) */}
            <TableCell className="hidden md:table-cell text-base">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  {label ?? "Link"}
                  <ArrowUpRightFromSquareIcon size={14} />
                </a>
              ) : (
                "—"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}