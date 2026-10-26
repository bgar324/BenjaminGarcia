# Benjamin Garcia Portfolio

Personal portfolio for Benjamin Garcia, written in plain HTML and CSS and deployed on Vercel.

Live site: [bentgarcia.com](https://www.bentgarcia.com)

## Overview

This repository contains a deliberately minimal, static portfolio with five public routes:

- `/` - introduction, experience, selected work, about, GitHub contributions, and contact links
- `/projects` - projects grouped by year created, with live-site and source links
- `/blog/annie` - a case study about building Annie, a personal iMessage assistant
- `/blog/policyc` - a case study about testing request-specific policy compilation
- `/blog/logit` - a case study about designing a workout logger that gets out of the way

The interface uses a single-column layout, a bundled Inter type scale, and underline-to-fill link interactions. The pages remain static HTML. Self-hosted Swup progressively enhances internal navigation without replacing the browser document; no install or build is required to serve or deploy the site.

## Highlights

- Static HTML and CSS with progressive navigation and ordinary-link fallback
- Responsive single-column layout for desktop and mobile
- Accessible keyboard focus states and reduced-motion handling
- No page-transition, entrance, or scroll animations. Native View Transitions are not enabled.
- Canonical metadata, structured data, sitemap, robots, and web manifest
- Subsetted Inter normal and italic page fonts with the full variable weight range
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
static/inter-page.woff2         Subsetted normal page font
static/inter-page-italic.woff2  Subsetted italic page font
static/inter-variable.woff2     Full source font retained for asset generation
static/inter-variable-italic.woff2   Full italic source font
static/inter-diagrams.woff2    Subset embedded in SVG image assets
static/inter-diagrams.unicodes Glyph coverage checked before SVG emission
static/inter-diagrams.sha256   Checksums for the generated diagram subset
scripts/serve.py               Local preview with direct clean URLs
scripts/requirements.txt       Pinned font-subset build dependencies
scripts/build-inter-page-fonts.py   Rebuilds both page subsets from full source fonts
scripts/build-inter-diagram-font.py  Rebuilds the diagram subset from the full source font
scripts/embedded_inter_font.py Embeds the diagram font in SVG assets
static/navigation.js          Owns navigation policy and scroll restoration
static/navigation-vendor.js   Pinned Swup, Head, and Accessibility browser bundles
static/navigation-vendor.LICENSE.txt   Third-party notices
scripts/vendor-navigation.py  Reproduces vendor bundles with pinned archive hashes
scripts/test-navigation.mjs   Browser navigation regressions
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
static deploy. Keep those overrides: the optional `package.json` is for browser
regression tests, not an Astro build or a production runtime.

## Local Development

No install or build step. Use the clean-URL preview server:

```bash
python3 scripts/serve.py
```

Open [127.0.0.1:8765](http://127.0.0.1:8765).

The server serves routes such as `/projects` and `/blog/policyc` directly,
matching Vercel's clean URLs. Python's generic `http.server` redirects these
directory paths to trailing-slash URLs instead. If that server was used before,
the browser may retain its permanent redirects.
Run `python3 scripts/serve.py --port 8770` and open [127.0.0.1:8770](http://127.0.0.1:8770) for a fresh origin.

### Progressive navigation

`static/navigation.js` uses Swup 4.10.0, Head Plugin 2.3.1, and Accessibility
Plugin 5.2.1. All runtime code is served locally, with no CDN dependency.
Internal page visits keep the old `<main>` visible until the HTML is ready,
then replace it without animation. Swup owns history, titles, metadata,
screen-reader announcements, and focus. The initializer owns per-entry and
per-URL scroll positions, including reloads and return links.

PDFs, downloads, external links, named targets, and fragment visits retain
browser navigation. Same-page fragments relinquish enhancement without
reloading the document. Fetch failures fall back to full navigation; blocked
scripts and disabled JavaScript leave ordinary links usable.

New HTML routes should be added to the `pages` set in `static/navigation.js`
to receive progressive navigation. Otherwise they use normal navigation.
Regenerate the committed vendor bundle and license notices with
`python3 scripts/vendor-navigation.py`; archive SHA-512 values are pinned in
that script.

### Navigation regression tests

Node 20 or newer is needed only for the optional tests:

```bash
npm ci
npx playwright install chromium firefox webkit
npm test
BROWSER=webkit npm test
BROWSER=firefox npm test
```

Each run starts an isolated preview server on an available loopback port.
The tests cover keeping content visible during loading, metadata/focus,
distinct history-entry positions, stale responses, fragment handling, and
failed Back navigation when the library also fails to load. Set `CHROME_BIN`
to a local Chrome executable to use it instead of Playwright's Chromium.

## Editing Content

- Update homepage structure and copy in `index.html`.
- Update the project collection in `projects/index.html`.
- Update global visual styling and motion in `styles.css`.
- Add portfolio articles under `blog/<slug>/index.html` and their images under `static/`.
- Run `python3 -m pip install -r scripts/requirements.txt` once before rebuilding font subsets.
- Run `python3 scripts/build-inter-page-fonts.py` to rebuild the normal and italic page fonts. The builder combines its Unicode ranges with current rendered HTML text and preserves variable weights and layout features. Keep the full `static/inter-variable.woff2` and `static/inter-variable-italic.woff2` source files; page subsetting does not replace them.
- Every HTML entry preloads `/static/inter-page.woff2?v=1` with `as="font"`, `type="font/woff2"`, and `crossorigin`. Both page faces use `font-display: block`; italic loads only when needed. Browsers can hide text briefly while the font loads, then show fallback if the blocking period expires. This reduces the initial fallback flash but does not guarantee one can never occur.
- `static/inter-diagrams.unicodes` is the explicit diagram subset input. If generator output reports a missing U+ codepoint, add it there, then run `python3 scripts/build-inter-diagram-font.py`, `python3 scripts/generate-policyc-charts.py`, and `python3 scripts/embedded_inter_font.py`. The builder derives the subset from the full source font and asserts that its cmap exactly matches the manifest.
- Run `python3 scripts/generate-og-image.py` after changing homepage card copy. The generator embeds the full source font.
- Replace `resume.pdf` or `policyc.pdf` to publish newer document versions at the same URLs.

No environment variables are required to serve the site.

### Daily GitHub calendar

The homepage ends with a contribution calendar below About, generated as HTML
and styled by `styles.css`.
CSS tooltips show each day's count on hover or keyboard focus, using the site's
colors and typography. They stay centered over the cell; CSS anchor positioning
lets them extend beyond the calendar's bounds in supporting browsers.
The tooltips do not intercept pointer movement between cells. Hovering a cell
does not outline it; keyboard focus retains a visible indicator.
On narrow screens, the full year remains horizontally scrollable, but the
scroller opens at the newest months.
The calendar makes no browser API calls and works with JavaScript disabled.
It shows all
GitHub contributions, not just commits, including private contribution counts
shared on the profile. No repository names or commit details are published.

To refresh locally, run:

```bash
python3 scripts/generate-contributions.py
```

The generator fetches GitHub's public profile contribution calendar, selects
the 365 dates ending at today's UTC date, and replaces only the block between
`contributions:start` and `contributions:end` in `index.html`. Use
`--through YYYY-MM-DD` to reproduce a particular date range. The public
profile includes anonymized private activity, so no personal GitHub token is
needed to read the data. HTTP 5xx responses and connection/read timeouts get
up to three attempts, with waits of 5 and 10 seconds between attempts.
Other HTTP errors and invalid or incomplete calendar data fail immediately.
Any failed refresh leaves the previous calendar intact.

Run the fetch recovery regression tests with:

```bash
python3 -m unittest discover -s scripts -p 'test_generate_contributions.py' -v
```

`.github/workflows/contributions.yml` runs daily at approximately 10:23 UTC
and can also be started manually from the Actions tab. GitHub's automatic
workflow token is used by checkout and the final commit/push, not to read
your profile data. The workflow commits only `index.html` when it changes.
The existing GitHub-to-Vercel integration deploys the resulting push.

The schedule becomes active once the workflow is pushed to `main`. Repository
rules must allow its token to push to `main`; GitHub may delay scheduled jobs
or disable them after 60 days without repository activity. Check the Actions
run and resulting Vercel deployment after enabling it. If a refresh fails, the
site keeps the last successful calendar.
