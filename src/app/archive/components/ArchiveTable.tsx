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
  link?: string;
  label?: string;
}

const archiveProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "Mt. SAC Computer Science Website",
    madeAt: "Mt. SAC",
    builtWith: [
      "React.js",
      "Bootstrap",
      "Netlify",
    ],
    link: "https://www.mtsaccs.org",
    label: "Website",
  },
  {
    year: 2025,
    title: "Tea Spots",
    madeAt: "AdeptEye",
    builtWith: [
      "Square Online",
      "Square Sites",
      "Photopea",
      "Graphic Design",
      "Video Production",
    ],
    link: "https://www.myteaspots.com/",
    label: "Website",
  },
  {
    year: 2025,
    title: "Benjamin Garcia",
    madeAt: "Independent",
    builtWith: ["Next.js", "Typescript", "Tailwind", "Vercel"],
    link: "https://bentgarcia.com/",
    label: "Website",
  },
  {
    year: 2024,
    title: "Roadmap Maker",
    madeAt: "Independent",
    builtWith: ["Next", "Tailwind", "Material UI", "pdfmake"],
    link: "https://github.com/bgar324/roadmapMaker",
    label: "GitHub",
  },
  {
    year: 2024,
    title: "Suika Remake",
    madeAt: "Independent",
    builtWith: ["Python", "Pygame", "Pymunk"],
    link: "https://github.com/bgar324/suika",
    label: "GitHub",
  },
  {
    year: 2024,
    title: "Weather Display",
    madeAt: "Independent",
    builtWith: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    link: "https://beautiful-gumption-a0ca0e.netlify.app/",
    label: "Website",
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
          <TableHead className="hidden md:table-cell text-base">Link</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {archiveProjects.map(
          ({ year, title, madeAt, builtWith, link, label }) => (
            <TableRow key={title}>
              <TableCell className="whitespace-nowrap text-base py-4">
                {year}
              </TableCell>

              <TableCell>
                <a
                  href={link}
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
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    {label}
                    <ArrowUpRightFromSquareIcon size={14} />
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
