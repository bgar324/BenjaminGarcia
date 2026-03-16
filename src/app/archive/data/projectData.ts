import { ProjectEntry, Column } from "../components/ProjectTable";

export const archiveProjects: ProjectEntry[] = [
    {
    year: 2025,
    title: "Computer Science Club Website",
    madeAt: "Mt. SAC",
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    link: "https:/mtsaccs.org/",
    label: "Website",
  },
  {
    year: 2025,
    title: "Rift Report",
    madeAt: "",
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript", "Riot API"],
    link: "https://github.com/bgar324/Rift-Report/",
    label: "GitHub",
  },
  {
    year: 2025,
    title: "15th Annual HPC Website",
    madeAt: "Mt. SAC",
    builtWith: ["Next.js", "Tailwind CSS", "Vercel", "shadcn-ui"],
    link: "https://caduceuswebsitev1.vercel.app/",
    label: "Website",
  },
  {
    year: 2025,
    title: "Computer Science Club Website (v1)",
    madeAt: "Mt. SAC",
    builtWith: ["React.js", "Bootstrap", "Netlify"],
    link: "https://v1.mtsaccs.org",
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

export const plannedProjects: ProjectEntry[] = [
  {
    year: 2025,
    title: "log•it v2",
    builtWith: ["Next.js", "Tailwind CSS", "Supabase"],
    status: "In Progress",
  },
];

export const archiveColumns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Made at", hiddenOn: "lg" },
  { key: "builtWith", header: "Built With", hiddenOn: "md" },
  { key: "link", header: "Link", hiddenOn: "md" },
];

export const plannedColumns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Made at", hiddenOn: "lg" },
  { key: "builtWith", header: "Planned stack", hiddenOn: "md" },
  { key: "status", header: "Status", hiddenOn: "md" },
];
