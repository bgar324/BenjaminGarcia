import {
  createSeoImage,
  seoImageContentType,
  seoImageSize,
} from "./seo-image";
import { siteConfig } from "./seo";

export const alt = "Benjamin Garcia portfolio preview";
export const size = seoImageSize;
export const contentType = seoImageContentType;

export default function OpenGraphImage() {
  return createSeoImage({
    eyebrow: "Full-Stack Engineer",
    title: siteConfig.name,
    description:
      "Production interfaces, AI products, and web experiences built with Next.js, React, and TypeScript.",
  });
}
