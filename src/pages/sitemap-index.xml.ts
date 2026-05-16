import type { APIRoute } from "astro";
import { absoluteUrl } from "../data/site";

const pages = ["/", "/archive"];

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((page) => `  <url><loc>${absoluteUrl(page)}</loc></url>`)
      .join("\n")}\n</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
