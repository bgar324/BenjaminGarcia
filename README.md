# Benjamin Garcia Portfolio

Portfolio site for Benjamin Garcia, built with Next.js App Router.

Live site: [bentgarcia.com](https://bentgarcia.com)

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- next-themes
- Vercel Analytics + Speed Insights

## Routes

- `/` - main portfolio page
- `/archive` - project archive table
- `not-found` - interactive 404 page

## Structure

```text
src/
  app/
    archive/
    components/
    fonts/
    svgs/
    globals.css
    layout.tsx
    not-found.tsx
    page.tsx
  components/
    ui/
  lib/
public/
  static/
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - serve the production build
- `npm run lint` - run the configured lint script

## Bundle / Bloat Cleanup

Recent low-risk cleanup work in this repo:

- Moved page-enter animations into a small client wrapper so the route files can stay server-rendered.
- Scoped the Google font stylesheet for the 404 page to `not-found` instead of loading it on every route.
- Removed unused direct dependencies: `@tailwindcss/vite`, `motion`, and `react-markdown`.
- Removed a duplicate global CSS import from the home page.
- Kept all existing user-facing features and route behavior intact.

## Notes

- No environment variables are required for the current portfolio build.
- Bundle analysis is available through the existing Next.js analyzer integration:

```bash
ANALYZE=true npm run build
```
