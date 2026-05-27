import bonterraLogo from "../assets/companies/bonterra.jpg";
import lindyLogo from "../assets/companies/lindy.jpg";
import tensorstaxLogo from "../assets/companies/tensorstax.png";
import toddLogo from "../assets/companies/todd.png";
import uclaHciLogoDark from "../assets/companies/ucla-hci-dark.png";
import uclaHciLogo from "../assets/companies/ucla-hci.png";
import mtsacLogo from "../assets/schools/mtsac.webp";
import uclaLogo from "../assets/schools/ucla.webp";

export const siteConfig = {
  name: "Benjamin Garcia",
  title: "Benjamin Garcia",
  description:
    "Full-stack engineer building production interfaces at scale. Experience at Todd Agriscience, Bonterra, TensorStax, and Lindy. CS @ UCLA.",
  url: "https://bentgarcia.com",
  locale: "en_US",
  author: "Benjamin Garcia",
  jobTitle: "Full-Stack Engineer",
  location: "Los Angeles, California, United States",
  keywords: [
    "software engineer",
    "full-stack developer",
    "frontend engineer",
    "React",
    "Astro",
    "TypeScript",
    "UCLA",
    "computer science",
    "web development",
    "Benjamin Garcia",
  ],
  email: "mailto:bentgarcia05@gmail.com",
  sameAs: [
    "https://github.com/bgar324",
    "https://www.linkedin.com/in/btgarcia05/",
    "https://gitproof.dev/u/bgar324",
  ],
} as const;

export const defaultOpenGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Benjamin Garcia portfolio preview",
} as const;

export const defaultTwitterImage = "/twitter-image";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export const profileImage = {
  alt: "Benjamin Garcia",
  width: 4284,
  height: 5712,
} as const;

export const mapHref =
  "https://www.google.com/maps/place/Westwood,+Los+Angeles,+CA/@34.0652211,-118.4610312,14z";

export const resumeHref = "/resume.pdf";

export const socialLinks = [
  {
    icon: "mail",
    label: "Email",
    href: "mailto:bentgarcia05@gmail.com",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/btgarcia05/",
  },
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/bgar324",
  },
  {
    icon: "logit",
    label: "logit",
    href: "https://trylogit.me/u/ben",
  },
] as const;

export const experiences = [
  {
    role: "Software Engineer Intern",
    position: "Lindy",
    imageLink: "https://www.lindy.ai",
    startDate: "Summer 2026",
    src: lindyLogo,
    description:
      "Lindy is an AI work assistant and no-code agent platform that automates inbox, meetings, scheduling, CRM updates, and other cross-app business workflows.",
  },
  {
    role: "Undergraduate Researcher",
    position: "UCLA HCI Research Lab",
    imageLink: "https://www.hci.ucla.edu",
    startDate: "Dec 2025",
    endDate: "Present",
    src: uclaHciLogo,
    darkSrc: uclaHciLogoDark,
    description:
      "Collaborated on HI-COS, a multi-agent scientific hypothesis generation platform built with FastAPI, Pydantic AI, Supabase, Gemini, Next.js, React Flow, Zustand, and Tailwind.",
  },
  {
    role: "Software Engineer Intern",
    position: "Todd Agriscience",
    imageLink: "https://www.toddagriscience.com/",
    startDate: "Mar 2025",
    endDate: "Oct 2025",
    src: toddLogo,
    description:
      "Built and deployed Todd's first client-facing dashboard using Next.js, enabling 5-10 early customers to visualize AI-powered crop insights. Work contributed to scaling the team from 1 to 14 engineers and drove initial product adoption.",
  },
  {
    role: "R&D Engineer Intern",
    position: "Bonterra",
    imageLink: "https://www.bonterratech.com/",
    startDate: "Jul 2025",
    endDate: "Aug 2025",
    src: bonterraLogo,
    description:
      "Researched and prototyped agentic AI pipelines for nonprofit event analysis. Presented findings to 40+ cross-functional stakeholders, shaping early AI adoption strategy.",
  },
  {
    role: "Software Engineer Intern",
    position: "TensorStax",
    imageLink: "https://www.tensorstax.com",
    startDate: "May 2025",
    endDate: "Jun 2025",
    src: tensorstaxLogo,
    description:
      "Designed secure credential-submission UI integrated with HashiCorp Vault, streamlining auth across 50+ enterprise data sources. Built low-latency frontend (Next.js, Redux, WebSockets) supporting 100+ concurrent beta users with sub-100ms response times.",
  },
] as const;

export const education = [
  {
    role: "University of California, Los Angeles",
    position: "BS, Computer Science",
    imageLink: "https://www.ucla.edu",
    startDate: "2025",
    endDate: "Present",
    src: uclaLogo,
    description:
      "ACM Hack Software Engineer Lead, Content Member & Frontend Developer at exploretech.la",
  },
  {
    role: "Mt. San Antonio College",
    position: "Honors Transfer",
    imageLink: "https://www.mtsac.edu",
    startDate: "2023",
    endDate: "2025",
    src: mtsacLogo,
    description:
      "Outreach Officer & Frontend Developer for the Computer Science Club",
  },
] as const;

export const selectedProjects = [
  {
    imageKey: "gitproof",
    title: "GitProof",
    width: 2048,
    height: 1277,
    summary:
      "Recruiter-facing GitHub reports that make public contribution history legible and credible.",
    link: "https://gitproof.dev",
    githubLink: "https://github.com/bgar324/gitproof-2",
    tags: [
      "Astro",
      "TypeScript",
      "Tailwind",
      "Postgres",
      "Prisma",
      "GitHub API",
      "Gemini 2.5 Flash",
    ],
  },
  {
    imageKey: "logit",
    title: "Logit",
    width: 2048,
    height: 1277,
    summary:
      "A lightweight workout tracker built for fast logging and clear progress review.",
    link: "https://trylogit.me",
    githubLink: "https://github.com/bgar324/log-it",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Postgres",
      "Prisma",
      "Recharts",
      "Supabase",
      "Anthropic API",
    ],
  },
] as const;

export type ArchiveProject = {
  year: number;
  title: string;
  builtWith: string[];
  websiteLink?: string;
  githubLink?: string;
};

export const archiveProjects: ArchiveProject[] = [
  {
    year: 2026,
    title: "ACM Hack Website",
    builtWith: ["JavaScript", "CSS"],
    websiteLink: "https://hack.uclaacm.com",
    githubLink: "https://github.com/uclaacm/hack.uclaacm.com"
  },
  {
    year: 2026,
    title: "exploretech.la Website",
    builtWith: ["JavaScript", "HTML", "SCSS"],
    websiteLink: "https://exploretech.la",
    githubLink: "https://github.com/exploretech-la/website"
  },
  {
    year: 2026,
    title: "Poly Clubs",
    builtWith: ["Next.js", "Tailwind", "TypeScript", "Supabase", "Framer Motion"],
    websiteLink: "https://poly-clubs.vercel.app/",
    githubLink: "https://github.com/bgar324/poly-clubs",
  },
  {
    year: 2025,
    title: "Het.AI",
    builtWith: ["Next.js", "Tailwind", "Python", "FastAPI", "Firebase"],
    websiteLink: "https://hetai.vercel.app/",
    githubLink: "https://github.com/bgar324/hacktech-25-brjk",
  },
  {
    year: 2025,
    title: "Computer Science Club Website",
    builtWith: ["Next.js", "Tailwind", "TypeScript", "Vercel"],
    websiteLink: "https://mtsaccs.org/",
    githubLink: "https://github.com/bgar324/mtsaccs-v2",
  },
  {
    year: 2025,
    title: "Rift Report",
    builtWith: ["Next.js", "Tailwind", "TypeScript", "Riot API"],
    githubLink: "https://github.com/bgar324/Rift-Report/",
  },
  {
    year: 2025,
    title: "15th Annual HPC Website",
    builtWith: ["Next.js", "Tailwind", "Vercel", "shadcn-ui"],
    websiteLink: "https://caduceuswebsitev1.vercel.app/",
    githubLink: "https://github.com/bgar324/caduceus-club-website",
  },
  {
    year: 2025,
    title: "Computer Science Club Website (v1)",
    builtWith: ["React.js", "Bootstrap", "Netlify"],
    websiteLink: "https://v1.mtsaccs.org",
    githubLink: "https://github.com/bgar324/mtsaccs",
  },
  {
    year: 2025,
    title: "Benjamin Garcia",
    builtWith: ["Astro", "TypeScript", "Tailwind", "Vercel"],
    websiteLink: "https://bentgarcia.com/",
    githubLink: "https://github.com/bgar324/BenjaminGarcia-v4",
  },
  {
    year: 2024,
    title: "Roadmap Maker",
    builtWith: ["Next.js", "Tailwind", "Material UI", "pdfmake"],
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
    githubLink: "https://github.com/bgar324/weather",
  },
] as const;
