// components/ScrappedTable.tsx
"use client";

import ProjectTable, { Column, ProjectEntry } from "./ProjectTable";

const scrappedProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "TeaSpots v2",
    builtWith: ["Astro", "Tailwind CSS", "Square"],
    madeAt: "AdeptEye",
    status: "Scrapped",
  },
  {
    year: 2025,
    title: "Tax Mavericks",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase"],
    madeAt: "AdeptEye",
    status: "Scrapped",
  },
  {
    year: 2025,
    title: "Loma Lookup",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase", "Google Vision API"],
    madeAt: "LLU Dental School",
    status: "Scrapped",
  },
];

const columns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Scrapped at", hiddenOn: "lg" },
  { key: "builtWith", header: "Scrapped stack", hiddenOn: "md" },
  { key: "status", header: "Status", hiddenOn: "md" },
];

export default function ScrappedTable() {
  return <ProjectTable columns={columns} rows={scrappedProjects} />;
}
