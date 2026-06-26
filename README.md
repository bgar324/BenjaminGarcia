# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, built with Astro and deployed on Vercel.

Live site: [bentgarcia.com](https://bentgarcia.com)

## Overview

This repo powers a static portfolio site with two public routes:

- `/` - a one-page portfolio with profile, experience, projects, education, and closing sections
- `/archive` - a larger project archive with links to live sites and source code

The site is intentionally easy to maintain. Most content lives in Astro pages/components, shared portfolio data is centralized in one typed data file, and media ships from `public/static`.

## Highlights

- Astro static generation with framework-free interactive UI
- Light and dark mode with a small persisted theme controller
- Animated page reveals, dropdown cards, and image/video modals with CSS and vanilla JavaScript
- Typed project archive data
- Astro diagnostics via `astro check`
- SEO metadata, Open Graph tags, web manifest, robots, and sitemap output
- Resume served from `public/resume.pdf`

## Stack

- Astro 5
- TypeScript 5
- Tailwind 4

## Project Structure

```text
src/
  pages/
    index.astro          Home route
    archive.astro        Archive route
    404.astro            Custom 404 route
    sitemap-index.xml.ts Sitemap output
  layouts/
    BaseLayout.astro     Shared document shell and metadata
  components/
    Dropdown.astro       Expandable experience/education rows
    FooterLink.astro     Footer link styling
    Icon.astro           Inline SVG icons
  data/
    site.ts              Site config and portfolio data
  fonts/
    CabinetGrotesk...    Local font asset
  styles/
    globals.css          Global styles

public/
  static/              Images, logos, previews, icons
  resume.pdf           Primary resume file

astro.config.mjs        Astro config with Tailwind
```

## Local Development

Prerequisites:

- Node.js 20+
- pnpm 10+

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

Run lint checks with:

```bash
pnpm lint
```

## Production

Build and serve the production bundle:

```bash
pnpm build
pnpm start
```

The current build succeeds and statically generates:

- `/`
- `/archive`
- `/404`
- `/sitemap-index.xml`

## Editing Content

- `src/pages/*.astro` defines public routes.
- `src/layouts/BaseLayout.astro` contains document metadata, canonical URL, Open Graph config, and the theme bootstrap script.
- `src/pages/index.astro` controls the home page layout and section order.
- `src/pages/archive.astro` renders the project archive.
- `src/data/site.ts` is the source of truth for site config, social links, experience, education, selected projects, and archive entries.
- `src/components/*.astro` contains the shared static UI pieces.
- `public/static/*` holds the portfolio images, logos, and project previews.
- `public/resume.pdf` is the file opened by the resume buttons.

## Notes

- No environment variables are required for the current site.
- The production build is fully static.
