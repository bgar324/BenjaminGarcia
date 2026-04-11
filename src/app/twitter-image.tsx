import {
  createSeoImage,
  seoImageContentType,
  seoImageSize,
} from "./seo-image";

export const alt = "Benjamin Garcia portfolio preview";
export const size = seoImageSize;
export const contentType = seoImageContentType;

export default function TwitterImage() {
  return createSeoImage({
    eyebrow: "Selected Work",
    title: "Benjamin Garcia Portfolio",
    description:
      "Projects, experience, and engineering work across product UI, AI interfaces, and full-stack development.",
    accentStart: "#0f172a",
    accentEnd: "#1d4ed8",
  });
}
