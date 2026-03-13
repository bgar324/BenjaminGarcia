"use client";

import { useEffect } from "react";
import { NOT_FOUND_FONT_STYLESHEET } from "../fonts/not-found-fonts";

function ensureHeadLink({
  id,
  rel,
  href,
  crossOrigin,
}: {
  id: string;
  rel: string;
  href: string;
  crossOrigin?: string;
}) {
  const existing = document.getElementById(id);
  if (existing) {
    return null;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = rel;
  link.href = href;

  if (crossOrigin) {
    link.crossOrigin = crossOrigin;
  }

  document.head.appendChild(link);
  return link;
}

export default function NotFoundFontLinks() {
  useEffect(() => {
    const links = [
      ensureHeadLink({
        id: "not-found-fonts-preconnect-googleapis",
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      }),
      ensureHeadLink({
        id: "not-found-fonts-preconnect-gstatic",
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      }),
      ensureHeadLink({
        id: "not-found-fonts-stylesheet",
        rel: "stylesheet",
        href: NOT_FOUND_FONT_STYLESHEET,
      }),
    ];

    return () => {
      links.forEach((link) => link?.remove());
    };
  }, []);

  return null;
}
