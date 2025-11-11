import { ProjectEntry, Column } from "../components/ProjectTable";

export const archiveProjects: ProjectEntry[] = [
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

export const plannedProjects: ProjectEntry[] = [
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

export const scrappedProjects: ProjectEntry[] = [
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

export const scrappedColumns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "madeAt", header: "Scrapped at", hiddenOn: "lg" },
  { key: "builtWith", header: "Scrapped stack", hiddenOn: "md" },
  { key: "status", header: "Status", hiddenOn: "md" },
];
