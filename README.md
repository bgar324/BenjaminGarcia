# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, built with Astro and deployed on Vercel.

Live site: [bentgarcia.com](https://bentgarcia.com)

## Overview

This repository contains a deliberately minimal, static portfolio with two public routes:

- `/` - introduction, experience, selected work, about, and contact links
- `/archive` - a chronological archive of projects with live-site and source links

The interface uses a single-column charcoal layout, restrained typography, calm staggered reveals, and underline-to-fill link interactions. There is no client-side framework, theme toggle, navigation shell, or UI state to maintain.

## Highlights

- Astro static generation with no client-side framework runtime
- Responsive single-column layout for desktop and mobile
- Accessible reduced-motion support and keyboard focus states
- Typed experience, selected-project, and archive data
- Generated Open Graph and Twitter images
- Canonical metadata, structured data, sitemap, robots, and web manifest
- Resume and PolicyC paper served as public PDF assets

## Stack

- Astro 5
- TypeScript 5
- Tailwind CSS 4
- Inter Variable via Fontsource

## Project Structure

```text
src/
  pages/
    index.astro             Home page
    archive.astro           Complete project archive
    404.astro               Custom 404 page
    opengraph-image.png.ts  Generated Open Graph image
    twitter-image.png.ts    Generated Twitter image
    sitemap-index.xml.ts    Generated sitemap
  layouts/
    BaseLayout.astro        Shared document shell and metadata
  data/
    site.ts                 Portfolio content and site configuration
  lib/
    socialImage.ts          Shared social-image renderer
  styles/
    globals.css             Layout, typography, motion, and interaction styles

public/
  static/favicon.svg
  manifest.webmanifest
  policyc.pdf
  resume.pdf
  robots.txt
  sw.js
```

## Local Development

Requires Node.js 20+ and pnpm 10+.

```bash
pnpm install
pnpm dev
```

Open [localhost:4321](http://localhost:4321).

## Validation and Production

```bash
pnpm lint
pnpm build
pnpm start
```

`pnpm lint` runs Astro diagnostics. `pnpm build` creates the fully static production output in `dist/`.

## Editing Content

- Update homepage structure and copy in `src/pages/index.astro`.
- Update experience, selected work, archive entries, social links, and site metadata in `src/data/site.ts`.
- Update the project archive layout in `src/pages/archive.astro`.
- Update global visual styling and motion in `src/styles/globals.css`.
- Replace `public/resume.pdf` or `public/policyc.pdf` to publish newer document versions at the same URLs.

No environment variables are required.
