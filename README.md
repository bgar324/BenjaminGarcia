# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, written in plain HTML and CSS and deployed on Vercel.

Live site: [bentgarcia.com](https://www.bentgarcia.com)

## Overview

This repository contains a deliberately minimal, static portfolio with five public routes:

- `/` - introduction, experience, selected work, about, and contact links
- `/projects` - a chronological collection of projects with live-site and source links
- `/blog/annie` - a case study about building Annie, a personal iMessage assistant
- `/blog/policyc` - a case study about testing request-specific policy compilation
- `/blog/logit` - a case study about designing a workout logger that gets out of the way

The interface uses a single-column charcoal layout, a bundled Inter type scale, and underline-to-fill link interactions. One small shared script restores each page's last scroll position within the current tab. There is no build step, framework, theme toggle, or navigation shell to maintain.

## Highlights

- Plain HTML and CSS with one dependency-free scroll-restoration script
- Responsive single-column layout for desktop and mobile
- Accessible keyboard focus states and reduced-motion handling
- Immediate content rendering with no entrance animation
- Canonical metadata, structured data, sitemap, robots, and web manifest
- Bundled Inter variable font with standard 400, 500, and 600 weights
- Resume and PolicyC paper served as public PDF assets

## Project Structure

```text
index.html            Home page
projects/index.html   Complete project collection
blog/annie/index.html   Blog article about Annie
blog/policyc/index.html Blog article about PolicyC
blog/logit/index.html  Blog article about Logit
404.html              Custom 404 page
styles.css            Layout, typography, and interaction styles
static/inter-variable.woff2     Bundled page font
static/inter-variable-italic.woff2   Bundled italic page font
static/inter-diagrams.woff2    Subset embedded in SVG image assets
static/inter-diagrams.unicodes Glyph coverage checked before SVG emission
static/inter-diagrams.sha256   Checksums for the generated diagram subset
scripts/requirements.txt       Pinned font-subset build dependencies
scripts/build-inter-diagram-font.py  Rebuilds the subset from the bundled font
scripts/embedded_inter_font.py Embeds the diagram font in SVG assets
static/scroll-restoration.js   Restores per-page scroll position within a tab
scripts/generate-policyc-charts.py   Regenerates the PolicyC SVG figures
static/favicon.svg
static/annie-imessage-conversation.webp
static/annie-deepseek-usage.webp
static/logit-workout.webp
static/logit-workout-square.webp
static/logit-iterations.png
static/logit-logged-today.svg
static/policyc-input-reduction.svg
static/policyc-preservation.svg
static/policyc-cost-reduction.svg
static/policyc-billed-cost.svg
static/policyc-latency.svg
static/policyc-compiler-pipeline.svg
static/policyc-compiler-pipeline-v09.svg
static/policyc-study-protocol.svg
static/policyc-paired-outcomes.svg
static/policyc-polaris-pipeline.svg
static/policyc-canary-protocol.svg
static/policyc-canary-arms.svg
static/policyc-reader-economics.svg
manifest.webmanifest
sitemap.xml
robots.txt
policyc.pdf
resume.pdf
vercel.json           Buildless deploy overrides, clean URLs, cache headers
```

`vercel.json` pins `framework`, `buildCommand`, `installCommand`, and
`outputDirectory` to `null`. The Vercel project predates this rewrite and still
carries the old Astro framework preset, so those keys are what force a buildless
static deploy. Removing them makes Vercel fall back to the preset and the
deployment fails with no `package.json` to build.

## Local Development

No install or build step. Serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

## Editing Content

- Update homepage structure and copy in `index.html`.
- Update the project collection in `projects/index.html`.
- Update global visual styling and motion in `styles.css`.
- Add portfolio articles under `blog/<slug>/index.html` and their images under `static/`.
- Run `python3 -m pip install -r scripts/requirements.txt` once when rebuilding the diagram font. `static/inter-diagrams.unicodes` is the explicit subset input: if generator output reports a missing U+ codepoint, add it there, then run `python3 scripts/build-inter-diagram-font.py`, `python3 scripts/generate-policyc-charts.py`, and `python3 scripts/embedded_inter_font.py`. The builder derives the subset from the bundled page font and asserts that its cmap exactly matches the manifest.
- Run `python3 scripts/generate-og-image.py` after changing homepage card copy. The generator embeds the bundled page font.
- Replace `resume.pdf` or `policyc.pdf` to publish newer document versions at the same URLs.

No environment variables are required.
