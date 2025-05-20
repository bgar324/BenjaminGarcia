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
    title: "Loma Lookup",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase", "Google Vision API"],
    madeAt: "LLU Dental School",
    status: "In Progress",
  },
  {
    year: 2025,
    title: "log•it v2",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase"],
    status: "Planned",
  },
  {
    year: 2025,
    title: "Git Proof",
    builtWith: [
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "GitHub API",
      "Celery",
      "Redis",
    ],
    status: "Planned",
  },
  {
    year: 2025,
    title: "TeaSpots v2",
    builtWith: ["Astro", "Tailwind CSS", "Square"],
    madeAt: "AdeptEye",
    status: "Backlog"
  },
  {
    year: 2025,
    title: "Tax Mavericks",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase"],
    madeAt: "AdeptEye",
    status: "Backlog",
  },
  {
    year: 2025,
    title: "Open CV AI Squat Analyzer",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase", "Python", "OpenCV"],
    status: "Backlog",
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
            Planned stack
          </TableHead>
          <TableHead className="hidden md:table-cell text-base">
            Status
          </TableHead>
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
                <div className="flex items-center gap-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium flex items-center gap-1 text-base"
                  >
                    {title}
                  </a>
                  {status === "Building" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-slow-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  )}
                </div>
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
