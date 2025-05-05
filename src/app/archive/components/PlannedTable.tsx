// components/ArchiveTable.tsx
"use client";

import { ArrowUpRightFromSquareIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProjectEntry {
  year: number;
  title: string;
  madeAt?: string;
  builtWith: string[];
  status?: string;
  label?: string;
}

const archiveProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "CS Club v2",
    builtWith: ["Next.js", "Tailwind", "framer-motion"],
    madeAt: "Mt. SAC",
    status: "Building"
  },
  {
    year: 2025,
    title: "LLU Attendee Lookup",
    builtWith: ["Next.js", "Tailwind", "Firebase", "Google Vision API"],
    madeAt: "LLU Dental School",
    status: "In Progress"
  },
  {
    year: 2025,
    title: "log•it v2",
    builtWith: ["Next.js", "Tailwind", "Firebase"],
    status: "Coming soon"
  },
  {
    year: 2025,
    title: "Tax Mavericks",
    builtWith: ["Next.js", "Tailwind", "Firebase"],
    madeAt: "AdeptEye",
    status: "Coming soon"
  },
  {
    year: 2025,
    title: "Open CV AI Squat Analyzer",
    builtWith: ["Next.js", "Tailwind", "Firebase", "Python", "OpenCV"],
    status: "Coming soon"
  },
];

export default function ArchiveTable() {
  return (
    <Table className="w-full table-fixed">
      <colgroup>
        <col className="w-[100px] md:w-[120px]" />
        <col />
        <col className="hidden lg:table-column w-[180px]" />
        <col className="hidden md:table-column w-[45%]" />
        <col className="hidden md:table-column w-[100px]" />
      </colgroup>

      <TableHeader>
        <TableRow>
          <TableHead className="text-base">Year</TableHead>
          <TableHead className="text-base">Project</TableHead>
          <TableHead className="hidden lg:table-cell text-base">
            Made at
          </TableHead>
          <TableHead className="hidden md:table-cell text-base">
            Built With
          </TableHead>
          <TableHead className="hidden md:table-cell text-base">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {archiveProjects.map(
          ({ year, title, madeAt, builtWith, status, label }) => (
            <TableRow key={title}>
              <TableCell className="whitespace-nowrap text-base py-4">
                {year}
              </TableCell>

              <TableCell>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline flex items-center gap-1 text-base"
                >
                  {title}
                  <ArrowUpRightFromSquareIcon
                    className="inline-block md:hidden"
                    size={14}
                  />
                </a>
              </TableCell>

              <TableCell className="hidden lg:table-cell text-gray-600 text-base">
                {madeAt}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-2">
                  {builtWith.map((t) => (
                    <span
                      key={t}
                      className="bg-gray-200 text-black px-2 py-1 rounded-full text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-base">
                {status || "—"}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
