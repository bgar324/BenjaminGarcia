# Personal Portfolio Website v4
[![Next.js](https://img.shields.io/badge/Next.js-13%2B-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8)](https://tailwindcss.com)

A modern, responsive personal portfolio website built with Next.js 15 and Tailwind CSS. This website showcases professional experience, projects, and technical skills in an elegant and interactive interface.

## Tech Stack 

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics & Speed Insights
- **TypeScript:** For type safety and better development experience

## Features

- Responsive design optimized for all devices
- Smooth animations and transitions using Framer Motion
- Dynamic navigation with scroll tracking
- Interactive project showcase
- Mobile-friendly navigation with hamburger menu
- Performance optimized with Next.js

## Project Structure

```
src/
├── app/
│   ├── archive/         # Archive section components
│   ├── components/      # Reusable UI components
│   ├── svgs/           # SVG icons and assets
│   └── page.tsx        # Main application page
├── components/         # Global components
│   └── ui/            # UI component library
└── lib/               # Utility functions and helpers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design

Inspired by MonoCV template, the design focuses on clean typography using Cabinet Grotesk typeface and modern UI elements. The layout is optimized for both desktop and mobile viewing experiences.

## Deployment

The website is deployed on Vercel for optimal performance and reliability.

## License

All rights reserved. This is a personal portfolio project.

## Developer Notes

> 🚧 **Future Update**: This project is planned to be refactored into Astro.js for improved performance and bundle size optimization. The refactor will leverage Astro's partial hydration and static site generation capabilities.
