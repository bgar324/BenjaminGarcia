# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, built with Next.js App Router and deployed on Vercel.

Live site: [bentgarcia.com](https://bentgarcia.com)

## Overview

This repo powers a static portfolio site with two public routes:

- `/` - a one-page portfolio with profile, experience, leadership, stack, projects, education, and closing sections
- `/archive` - a larger project archive with links to live sites and source code

The site is intentionally easy to maintain. Most content lives directly in React section components, archive entries are centralized in one typed data file, and media ships from `public/static`.

## Highlights

- Next.js App Router with static generation
- Light and dark mode with `next-themes`
- Animated page reveals, dropdown cards, and image/video modals with Framer Motion
- Typed project archive data
- ESLint CLI setup for Next.js core-web-vitals and TypeScript rules
- SEO metadata, Open Graph tags, Vercel Analytics, and Speed Insights
- Resume served from `public/resume.pdf`

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind 4
- Framer Motion
- ESLint
- Lucide React
- next-themes
- Vercel Analytics
- Vercel Speed Insights

## Project Structure

```text
src/app/
  archive/
    components/        Archive table UI
    data/              Project archive data
    page.tsx           Archive route
  components/
    sections/          Home page sections and copy
  fonts/               Local font setup
  globals.css          Global styles
  layout.tsx           Metadata, providers, analytics
  not-found.tsx        Custom 404 page
  page.tsx             Home page composition

public/
  static/              Images, logos, previews, icons
  resume.pdf           Primary resume file

eslint.config.mjs      ESLint flat config for Next.js + TypeScript
```

## Local Development

Prerequisites:

- Node.js 20+
- npm

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Run lint checks with:

```bash
npm run lint
```

## Production

Build and serve the production bundle:

```bash
npm run build
npm run start
```

The current build succeeds and statically generates:

- `/`
- `/archive`
- the custom not-found page

## Editing Content

- `src/app/page.tsx` controls the section order on the home page.
- `src/app/components/sections/*.tsx` contains the main portfolio copy and section UI.
- `src/app/components/Sidebar.tsx` owns the profile card, social links, mobile menu, and resume CTA.
- `src/app/archive/data/projectData.ts` is the source of truth for archive entries.
- `src/app/layout.tsx` contains metadata, canonical URL, Open Graph config, and analytics hooks.
- `public/static/*` holds the portfolio images, logos, and project previews.
- `public/resume.pdf` is the file opened by the resume buttons.

## Notes

- No environment variables are required for the current site.
- Linting uses the ESLint CLI with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Bundle analysis is available with:

```bash
ANALYZE=true npm run build
```
