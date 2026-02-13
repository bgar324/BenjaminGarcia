import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogSection from "../components/BlogSection";

interface BlogSectionImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BlogSection {
  subheading: string;
  content: string[];
  image?: BlogSectionImage;
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  status: string;
  stack: string[];
  image?: string;
  imageDescription?: string;
  sections: BlogSection[];
}

const blogPosts: Record<string, BlogPost> = {
  "loma-lookup-retrospective": {
    slug: "loma-lookup-retrospective",
    title: "Loma Lookup: A Case Study in AI Limitations",
    date: "May 20, 2025",
    status: "Scrapped",
    stack: ["Next.js", "Tailwind CSS", "Firebase", "Google Vision API", "Google Document AI", "LLaVA", "4o", "Python"],
    image: "/static/blog-images/loma-lookup_blog-image.webp",
    imageDescription: "Sample data. Believe it or not, this was one of the better/easier images to work with.",
    sections: [
      {
        subheading: "Problem Statement",
        content: [
          "At Loma Linda University’s Dental School (LLU), D3 and D4 students begin clinical rotations under the guidance of **attendees**—senior practitioners responsible for oversight and support.",
          "However, the system used to track these attendees is confusing and inaccessible. The weekly **clinic schedule**, formatted as a dense spreadsheet, is hard to read and interpret, especially given the complex layout of the clinic floor.",
          "To make matters worse, LLU does not distribute this schedule digitally. Instead, it’s displayed only on a single hallway **TV monitor**, making it nearly impossible for students to plan ahead or access it remotely.",
        ],
      },
      {
        subheading: "Design Objective",
        content: [
          "Build a system capable of extracting structured JSON from arbitrary photographs of LLU’s clinic schedule—removing the need to physically view the TV and enabling digital lookup of attendees by day, time slot, and clinic block.",
        ],
      },
      {
        subheading: "Preprocessing & Extraction",
        content: [
          "Each image first passed through a custom **OpenCV pipeline** that flattened perspective distortion, enhanced contrast, and standardized brightness. This normalized the input for further parsing.",
          "I began with **Google Vision OCR** to extract text from individual cells. When results became inconsistent, especially with merged cells or rotated entries, I switched to **Google Document AI's table processor**, which improved baseline accuracy but still lacked full structural understanding.",
        ],
        image: {
          src: "/static/blog-images/loma-lookup_blog-image-preprocessed.webp",
          alt: "Preprocessed of the raw image through a custom Python script.",
          caption: "Preprocessed image."
        },
      },
      {
        subheading: "Testing the Frontier",
        content: [
          "To handle table structure, merge semantics, and embedded shorthand (e.g., ‘Clin 7910’ → Clin 7, 9, 10), I explored multimodal models: **LLaVA-v1.5**, **table-llava**, and **GPT-4o**.",
          "Each model could understand pieces of the layout but none offered consistent, complete parsing of arbitrary photos. These models collapsed when faced with skewed perspectives, inconsistent row heights, or vertically merged cells. That's when I realized this wasn’t an implementation issue—it was an **AI limitation**.",
        ],
      },
      {
        subheading: "Takeaways & Implications",
        content: [
          "This project looked simple on paper—turn a photo into JSON. In practice, it revealed a deeper truth: some tasks remain on the **edge of AI's capabilities**, especially those requiring spatial logic, semantic interpretation, and structural inference.",
          "Loma Lookup is now retired, but it serves as a technical postmortem on where automation fails, and how critical human verification still is when pushing past the bounds of AI reliability.",
          "What's next? **log it v2 & Git Proof**"
        ],
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (slug !== "loma-lookup-retrospective") {
    return null;
  }
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-8 lg:pt-16 lg:pb-0 text-gray-900 dark:text-slate-100">
      <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 mb-12">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">
          Home
        </Link>
        <span className="text-gray-400 dark:text-slate-600">/</span>
        <Link href="/archive" className="hover:text-gray-900 dark:hover:text-slate-200 transition-colors">
          Archive
        </Link>
        <span className="text-gray-400 dark:text-slate-600">/</span>
        <span className="text-gray-900 dark:text-slate-100 truncate">{post.title}</span>
      </nav>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{post.title}</h1>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-slate-400 mb-8">
            <span>Benjamin Garcia</span>
            <span className="text-gray-300 dark:text-slate-700">|</span>
            <time>{post.date}</time>
            <span className="text-gray-300 dark:text-slate-700">|</span>
            <span>Status: {post.status}</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-2xl mx-auto">
            {post.stack.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {post.image && (
            <figure className="mb-12">
              <div className="relative w-full h-[400px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              {post.imageDescription && (
                <figcaption className="text-center mt-4 text-gray-500 dark:text-slate-400 italic text-sm">
                  {post.imageDescription}
                </figcaption>
              )}
            </figure>
          )}
        </header>

        <div className="space-y-16">
          {post.sections.map((section, index) => (
            <div key={section.subheading}>
              <BlogSection
                subheading={section.subheading}
                content={section.content}
                image={section.image}
              />
              {index !== post.sections.length - 1 && (
                <hr className="my-16 border-gray-100 dark:border-slate-800" />
              )}
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
