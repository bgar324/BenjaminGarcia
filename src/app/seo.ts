export const siteConfig = {
  name: "Benjamin Garcia",
  title: "Benjamin Garcia",
  description:
    "Full-stack engineer building production interfaces at scale. Experience at Todd Agriscience, Bonterra, TensorStax. CS @ UCLA.",
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
    "Next.js",
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
