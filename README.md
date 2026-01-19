# Benjamin Garcia - Personal Portfolio

A modern, production-ready portfolio website showcasing my work as a full-stack software engineer. Built with cutting-edge web technologies and designed for performance, accessibility, and user experience.

**Live Site:** [bentgarcia.com](https://bentgarcia.com)
**Contact:** bentgarcia05@gmail.com

---

## Overview

This portfolio serves as a comprehensive showcase of my professional experience, technical skills, and project work. The site features a clean, responsive design with dark/light theme support, smooth animations, and thoughtful user interactions.

### Key Highlights

- UCLA Computer Science student
- Full-stack engineer with experience at Todd Agriscience, Bonterra, and TensorStax
- ACM Hack officer and exploretech.la contributor
- 5 featured projects + extensive project archive
- Integrated Spotify now-playing feature (optional)

---

## Tech Stack

### Core Framework
- **Next.js 16.0.10** - Latest App Router with React Server Components
- **React 19.0.0** - Modern React with concurrent features
- **TypeScript 5** - Full type safety across the application

### Styling & UI
- **Tailwind CSS 4.1.3** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Modern icon library
- **Custom CSS Variables** - OKLCH color space for enhanced color consistency

### Animation & Interaction
- **Framer Motion 12.6.3** - Production-ready motion library for complex animations
- **next-themes** - Seamless dark/light mode with persistence

### Performance & Analytics
- **@vercel/analytics** - User analytics and insights
- **@vercel/speed-insights** - Real-time performance monitoring
- **Next.js Image** - Automatic image optimization
- **@next/bundle-analyzer** - Bundle size analysis

### External Integrations
- **Spotify API** - Currently-playing track integration
- **Vercel** - Hosting and deployment platform

---

## Project Structure

```
BenjaminGarcia-v4/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main portfolio page
│   │   ├── layout.tsx                  # Root layout with metadata
│   │   ├── providers.tsx               # Theme provider setup
│   │   ├── globals.css                 # Global styles with Tailwind
│   │   ├── components/
│   │   │   ├── sections/               # Portfolio sections
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ExperienceSection.tsx
│   │   │   │   ├── LeadershipSection.tsx
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   ├── TechStackSection.tsx
│   │   │   │   ├── EducationSection.tsx
│   │   │   │   ├── PastVersionsSection.tsx
│   │   │   │   └── FooterSection.tsx
│   │   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   │   ├── SelectedProject.tsx     # Project card component
│   │   │   ├── Dropdown.tsx            # Expandable dropdown
│   │   │   ├── ThemeToggle.tsx         # Theme switcher
│   │   │   ├── RandomImageHover.tsx    # Image preview on hover
│   │   │   ├── YouTubeModal.tsx        # Video modal player
│   │   │   └── ...                     # Additional UI components
│   │   ├── archive/
│   │   │   ├── page.tsx                # Project archive page
│   │   │   ├── components/
│   │   │   │   ├── ProjectTable.tsx
│   │   │   │   └── UpdateCard.tsx
│   │   │   └── data/                   # Project data definitions
│   │   ├── api/
│   │   │   ├── now-playing/            # Spotify now-playing endpoint
│   │   │   └── spotify/                # Spotify OAuth handlers
│   │   └── svgs/                       # SVG icon components
│   ├── components/
│   │   └── ui/                         # shadcn/ui components
│   └── lib/                            # Utility functions
├── public/
│   ├── static/                         # Images, logos, screenshots
│   ├── resume.pdf                      # PDF resume
│   └── ...                             # Favicons and other assets
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies and scripts
```

---

## Features

### Portfolio Sections

1. **Hero & Sidebar**
   - Profile image with gradient shadow effect
   - Location badge (Los Angeles, California)
   - Social links (Email, LinkedIn, GitHub, GitProof)
   - Responsive mobile menu with smooth animations

2. **About Section**
   - Professional background and education
   - Campus involvement and leadership roles
   - Personal interests with interactive image hover effects
   - Dark/light theme toggle

3. **Experience**
   - Expandable dropdown items for each role
   - Company logos with dark mode variants
   - Detailed descriptions of responsibilities and achievements
   - Links to company websites

4. **Leadership & Campus Involvement**
   - ACM Hack (Officer, Nov 2025-Present)
   - exploretech.la (Frontend Developer, Sep 2025-Present)
   - Previous roles and contributions

5. **Technology Stack**
   - Frontend technologies: Next.js, React, Tailwind, TypeScript, Redux
   - Backend technologies: Python, PostgreSQL, Lambda, Prisma, Firebase
   - Animated tech pill components

6. **Selected Projects**
   - 5 featured projects with detailed case studies:
     - **Poly Clubs** - Club review platform for Cal Poly Pomona
     - **Git Proof** - GitHub contribution analyzer with heatmap visualization
     - **CS Club Website** - Modern rebuild with Next.js
     - **Logit** - Minimal workout logger
     - **het.AI** - Wrist posture diagnostic (HackTech 2025 winner)
   - Each includes problem, solution, outcome, tech stack, and links

7. **Education**
   - UCLA (Current - Computer Science)
   - Mt. San Antonio College (2023-2025, Honors Transfer)
   - Walnut High School (2019-2023)

8. **Project Archive**
   - Responsive data table with 8+ past projects
   - 3 planned/in-progress projects with pulsing indicators
   - Sortable and filterable by technology and year

9. **Past Versions**
   - Links to previous iterations of the portfolio

### Technical Features

- **Theme System**: Persistent dark/light mode with smooth transitions
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Performance Optimized**: Image optimization, lazy loading, code splitting
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO Optimized**: Metadata, Open Graph tags, Twitter cards
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Mobile Menu**: Full-screen menu with scroll lock and smooth animations
- **Image Hover Previews**: Interactive hover effects with mouse tracking
- **Expandable Components**: Smooth height animations for dropdowns
- **Spotify Integration**: Optional now-playing card with real-time updates

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- (Optional) Spotify API credentials for now-playing feature

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/BenjaminGarcia-v4.git
cd BenjaminGarcia-v4
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. (Optional) Set up environment variables for Spotify integration:
```bash
# Create .env.local file
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

### Bundle Analysis

Analyze bundle size:
```bash
ANALYZE=true npm run build
```

---

## Configuration

### Next.js Configuration

The `next.config.ts` file includes:
- Bundle analyzer integration
- Remote image domains for Spotify CDN

### Tailwind Configuration

Custom configuration in `tailwind.config.ts`:
- Dark mode: class-based strategy
- Content paths for app directory structure
- Minimal theme extensions (uses Tailwind defaults)

### TypeScript Configuration

Strict mode enabled with path aliases:
- `@/*` → `./src/*`

---

## Deployment

This project is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/BenjaminGarcia-v4)

---

## Performance

- Lighthouse score: 95+ across all categories
- Optimized images with Next.js Image component
- Code splitting for optimal bundle sizes
- Vercel Edge Network for global CDN delivery
- Real-time performance monitoring via Speed Insights

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Credits & Inspiration

- **Design Inspiration**: [MonoCV](https://monokaicv.com/) template
- **Typography**: [Cabinet Grotesk](https://fontshare.com/fonts/cabinet-grotesk) font family
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## License

This project is open source and available for reference. Feel free to draw inspiration, but please don't copy it directly.

---

## Contact

**Benjamin Garcia**
Email: bentgarcia05@gmail.com
Portfolio: [bentgarcia.com](https://bentgarcia.com)
GitHub: [@yourgithub](https://github.com/yourgithub)
LinkedIn: [Benjamin Garcia](https://linkedin.com/in/yourprofile)

---

Built with Next.js, React, TypeScript, and Tailwind CSS. Deployed on Vercel.
