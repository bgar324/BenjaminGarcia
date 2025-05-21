import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface BlogSectionImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BlogSectionProps {
  subheading: string;
  content: string[];
  image?: BlogSectionImage;
}

export default function BlogSection({ subheading, content, image }: BlogSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
        {subheading}
      </h2>
      <div className="text-gray-800 leading-relaxed text-base md:text-lg space-y-8">
        {/* First paragraph */}
        {content.length > 0 && (
          <ReactMarkdown
            components={{
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
            }}
          >
            {content[0]}
          </ReactMarkdown>
        )}

        {/* Optional image after first paragraph */}
        {image && (
          <figure className="my-8">
            <div className="relative w-full h-[300px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="text-center mt-4 text-gray-500 italic text-sm">
                {image.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Remaining paragraphs */}
        {content.slice(1).map((paragraph, index) => (
          <ReactMarkdown
            key={index}
            components={{
              strong: ({ children }) => (
                <span className="font-semibold text-gray-900">{children}</span>
              ),
            }}
          >
            {paragraph}
          </ReactMarkdown>
        ))}
      </div>
    </section>
  );
}
