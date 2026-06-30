import type { APIRoute } from "astro";
import { createSocialImage } from "../lib/socialImage";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await createSocialImage()), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
