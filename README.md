# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, written in plain HTML and CSS and deployed on Vercel.

Live site: [bentgarcia.com](https://bentgarcia.com)

## Overview

This repository contains a deliberately minimal, static portfolio with two public routes:

- `/` - introduction, experience, selected work, about, and contact links
- `/archive` - a chronological archive of projects with live-site and source links

The interface uses a single-column charcoal layout, restrained typography, calm staggered reveals, and underline-to-fill link interactions. There is no JavaScript, build step, framework, theme toggle, navigation shell, or UI state to maintain.

## Highlights

- Plain HTML and CSS with zero JavaScript and zero dependencies
- Responsive single-column layout for desktop and mobile
- Accessible reduced-motion support and keyboard focus states
- Pure-CSS staggered reveal animations and link interactions
- Canonical metadata, structured data, sitemap, robots, and web manifest
- Self-hosted Inter Variable font
- Resume and PolicyC paper served as public PDF assets

## Project Structure

```text
index.html            Home page
archive/index.html    Complete project archive
404.html              Custom 404 page
styles.css            Layout, typography, motion, and interaction styles
fonts/                Self-hosted Inter Variable woff2 files
static/favicon.svg
manifest.webmanifest
sitemap.xml
robots.txt
policyc.pdf
resume.pdf
vercel.json           Clean URLs and cache headers
```

## Local Development

No install or build step. Serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

## Editing Content

- Update homepage structure and copy in `index.html`.
- Update the project archive in `archive/index.html`.
- Update global visual styling and motion in `styles.css`.
- Replace `resume.pdf` or `policyc.pdf` to publish newer document versions at the same URLs.

No environment variables are required.
