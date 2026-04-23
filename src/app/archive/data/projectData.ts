import { ProjectEntry, Column } from "../components/ProjectTable";

export const archiveProjects: ProjectEntry[] = [
  {
    year: 2026,
    title: "Poly Clubs",
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase", "Framer Motion"],
    websiteLink: "https://poly-clubs.vercel.app/",
    githubLink: "https://github.com/bgar324/poly-clubs",
  },
  {
    year: 2025,
    title: "Het.AI",
    builtWith: ["Next.js", "Tailwind CSS", "Python", "FastAPI", "Firebase"],
    websiteLink: "https://hetai.vercel.app/",
    githubLink: "https://github.com/bgar324/hacktech-25-brjk",
  },
  {
    year: 2025,
    title: "Computer Science Club Website",
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    websiteLink: "https://mtsaccs.org/",
    githubLink: "https://github.com/bgar324/mtsaccs-v2"
  },
  {
    year: 2025,
    title: "Rift Report",
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript", "Riot API"],
    githubLink: "https://github.com/bgar324/Rift-Report/",
  },
  {
    year: 2025,
    title: "15th Annual HPC Website",
    builtWith: ["Next.js", "Tailwind CSS", "Vercel", "shadcn-ui"],
    websiteLink: "https://caduceuswebsitev1.vercel.app/",
    githubLink: "https://github.com/bgar324/caduceus-club-website"
  },
  {
    year: 2025,
    title: "Computer Science Club Website (v1)",
    builtWith: ["React.js", "Bootstrap", "Netlify"],
    websiteLink: "https://v1.mtsaccs.org",
    githubLink: "https://github.com/bgar324/mtsaccs"
  },
  {
    year: 2025,
    title: "Benjamin Garcia",
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    websiteLink: "https://bentgarcia.com/",
    githubLink: "https://github.com/bgar324/BenjaminGarcia-v4"
  },
  {
    year: 2024,
    title: "Roadmap Maker",
    builtWith: ["Next.js", "Tailwind CSS", "Material UI", "pdfmake"],
    githubLink: "https://github.com/bgar324/roadmapMaker",
  },
  {
    year: 2024,
    title: "Suika Remake",
    builtWith: ["Python", "Pygame", "Pymunk"],
    githubLink: "https://github.com/bgar324/suika",
  },
  {
    year: 2024,
    title: "Weather Display",
    builtWith: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    websiteLink: "https://beautiful-gumption-a0ca0e.netlify.app/",
    githubLink: "https://github.com/bgar324/weather"
  },
];

export const archiveColumns: Column[] = [
  { key: "year", header: "Year" },
  { key: "title", header: "Project" },
  { key: "builtWith", header: "Built With", hiddenOn: "md" },
  { key: "link", header: "Links", hiddenOn: "md" },
];
