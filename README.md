# Benjamin Garcia's Portfolio
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)](https://tailwindcss.com)

A modern, responsive personal portfolio website built with Next.js 16 and React 19. Features professional experience, projects, technical skills, education, and past portfolio versions with smooth animations and interactive components.

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes for dark/light mode
- **Analytics:** Vercel Analytics & Speed Insights
- **TypeScript:** Type safety and enhanced developer experience

## Features

- **Responsive Design:** Mobile-first, optimized for all screen sizes
- **Dark/Light Mode:** Theme toggle with next-themes
- **Smooth Animations:** Framer Motion transitions throughout
- **Interactive Components:**
  - Gradient hover links
  - Random image hover effects
  - Expandable dropdowns for experience/education
  - YouTube modal integration
- **Dynamic Sections:**
  - Professional experience timeline
  - Leadership & campus involvement
  - Selected projects showcase with live demos
  - Tech stack visualization
  - Past portfolio versions
- **Project Archive:** Dedicated archive page with filterable project tables
- **Performance Optimized:** Next.js 16 with static generation and Vercel deployment

## Project Structure

```
src/
├── app/
│   ├── archive/              # Project archive page
│   │   ├── components/       # Archive-specific components (ProjectTable, UpdateCard)
│   │   ├── data/            # Project data
│   │   └── page.tsx
│   ├── blog/                 # Blog section
│   │   ├── components/
│   │   └── [slug]/
│   ├── components/           # Page-specific components
│   │   ├── Dropdown.tsx      # Expandable dropdowns
│   │   ├── GradientLink.tsx  # Animated gradient links
│   │   ├── Marquee.tsx       # Scrolling marquee
│   │   ├── PastVersions.tsx  # Portfolio versions showcase
│   │   ├── RandomImageHover.tsx  # Image hover effects
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── TechStack.tsx     # Tech stack display
│   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   └── YouTubeModal.tsx  # Video modal
│   ├── fonts/                # Custom fonts (Cabinet Grotesk)
│   ├── svgs/                 # SVG icons
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main portfolio page
│   └── providers.tsx         # Theme provider
└── public/
    └── static/               # Images and assets
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

Inspired by the [MonoCV](https://www.framer.com/marketplace/templates/monocv/) template, the design emphasizes clean typography using the Cabinet Grotesk typeface and modern UI patterns. The layout features a sidebar navigation on desktop that transforms into mobile-friendly navigation on smaller screens, with consistent use of gradient accents and smooth Framer Motion animations throughout.

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch. Includes Vercel Analytics and Speed Insights for performance monitoring.

## License

All rights reserved. This is a personal portfolio project.
