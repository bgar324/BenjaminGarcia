// components/PlannedTable.tsx
"use client";

import ProjectTable, { Column, ProjectEntry } from "./ProjectTable";

const plannedProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "log•it v2",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase"],
    status: "In Progress",
  },
  {
    year: 2025,
    title: "Git Proof",
    builtWith: ["Next.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "GitHub API", "Celery", "Redis"],
    status: "In Progress",
  },
  {
    year: 2025,
    title: "Open CV AI Squat Analyzer",
    builtWith: ["Next.js", "Tailwind CSS", "Firebase", "Python", "OpenCV"],
    status: "Backlog",
  },
];

const columns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Made at", hiddenOn: "lg" },
  { key: "builtWith", header: "Planned stack", hiddenOn: "md" },
  { key: "status", header: "Status", hiddenOn: "md" },
];

export default function PlannedTable() {
  return <ProjectTable columns={columns} rows={plannedProjects} />;
}
