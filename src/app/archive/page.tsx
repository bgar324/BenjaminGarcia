import type { Metadata } from "next";
import ConfigurableProjectTable from "./components/ConfigurableProjectTable";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageReveal from "../components/PageReveal";
import { archiveProjects } from "./data/projectData";
import { absoluteUrl, siteConfig } from "../seo";

const archiveDescription =
  "A broader archive of product, AI, and web engineering work spanning Next.js, React, TypeScript, Python, and Vercel deployments.";

export const metadata: Metadata = {
  title: "Project Archive",
  description: archiveDescription,
  alternates: {
    canonical: "/archive",
  },
  openGraph: {
    title: "Project Archive",
    description: archiveDescription,
    url: absoluteUrl("/archive"),
  },
  twitter: {
    title: "Project Archive",
    description: archiveDescription,
  },
};

const archiveStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${siteConfig.name} Project Archive`,
  description: archiveDescription,
  url: absoluteUrl("/archive"),
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  about: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: archiveProjects.length,
    itemListElement: archiveProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        dateCreated: String(project.year),
        url:
          project.websiteLink ??
          project.githubLink ??
          absoluteUrl("/archive"),
        keywords: project.builtWith.join(", "),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    })),
  },
};

export default function ArchivePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-6 md:pt-12 lg:pt-24 pb-16 text-gray-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(archiveStructuredData),
        }}
      />

      <PageReveal>
        <Link
          href="/"
          className="flex flex-row gap-2 items-center text-center hover:text-black dark:hover:text-slate-200 mb-4 arrow-link transition-colors duration-300"
        >
          <ArrowLeft className="arrow-icon" size={14} />
          Benjamin Garcia
        </Link>

        <div className="flex justify-between items-start mt-5 mb-10">
          <div className="max-w-2xl">
            <h1 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase tracking-wider lg:py-[.5px] flex items-center gap-1 text-xl md:text-3xl font-bold">
              Project Archive
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-slate-400 leading-relaxed">
              {archiveDescription}
            </p>
          </div>
        </div>
      </PageReveal>

      <PageReveal delay={0.2}>
        <div className="bg-white dark:bg-black/85 rounded-xl shadow-md dark:shadow-lg p-4 md:p-6 transition-colors duration-300">
          <ConfigurableProjectTable type="archive" />
        </div>
      </PageReveal>
    </main>
  );
}
