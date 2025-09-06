// components/ArchiveTable.tsx
"use client";

import ProjectTable, { Column, ProjectEntry } from "./ProjectTable";

const archiveProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "Computer Science Website (v1)",
    madeAt: "Mt. SAC",
    builtWith: ["React.js", "Bootstrap", "Netlify"],
    link: "https://v1.mtsaccs.org",
    label: "Website",
  },
  {
    year: 2025,
    title: "Tea Spots",
    madeAt: "AdeptEye",
    builtWith: ["Square Online", "Square Sites", "Photopea", "Graphic Design", "Video Production"],
    link: "https://www.myteaspots.com/",
    label: "Website",
  },
  {
    year: 2025,
    title: "Benjamin Garcia",
    madeAt: "",
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://bentgarcia.com/",
    label: "Website",
  },
  {
    year: 2024,
    title: "Roadmap Maker",
    madeAt: "",
    builtWith: ["Next.js", "Tailwind CSS", "Material UI", "pdfmake"],
    link: "https://github.com/bgar324/roadmapMaker",
    label: "GitHub",
  },
  {
    year: 2024,
    title: "Suika Remake",
    madeAt: "",
    builtWith: ["Python", "Pygame", "Pymunk"],
    link: "https://github.com/bgar324/suika",
    label: "GitHub",
  },
  {
    year: 2024,
    title: "Weather Display",
    madeAt: "",
    builtWith: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    link: "https://beautiful-gumption-a0ca0e.netlify.app/",
    label: "Website",
  },
];

const columns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Made at", hiddenOn: "lg" },
  { key: "builtWith", header: "Built With", hiddenOn: "md" },
  { key: "link", header: "Link", hiddenOn: "md" },
];

export default function ArchiveTable() {
  return <ProjectTable columns={columns} rows={archiveProjects} />;
}
