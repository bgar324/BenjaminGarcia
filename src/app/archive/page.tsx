import type { Metadata } from "next";
import ProjectTable from "./components/ProjectTable";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageReveal from "../components/PageReveal";
import { archiveColumns, archiveProjects } from "./data/projectData";
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
          <ArrowLeft className="arrow-icon" size={12} />
          Benjamin Garcia
        </Link>

        <div className="flex justify-between items-start gap-4 mt-5 mb-10">
          <h1 className="w-fit border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 uppercase tracking-wider flex items-center gap-1 text-xl md:text-2xl font-bold">
            Project Archive
          </h1>
        </div>

        <div className="bg-white dark:bg-black rounded-xl shadow-md dark:shadow-lg p-4 md:p-6 transition-colors duration-300">
          <ProjectTable
            columns={archiveColumns}
            rows={archiveProjects}
            caption="Archived projects with build stack and links."
          />
        </div>
      </PageReveal>
    </main>
  );
}
