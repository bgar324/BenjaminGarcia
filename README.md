# Benjamin Garcia's portfolio

My personal website, with selected projects, work experience, campus involvement, and articles about things I've built.

**[bentgarcia.com](https://www.bentgarcia.com)**

The site uses static HTML, CSS, and JavaScript, hosted on Vercel. There is no application build step or backend. Swup handles navigation between pages, with ordinary links as a fallback when JavaScript is unavailable.

## Run locally

Python 3 is enough to preview the site. No package installation or environment variables are required.

```bash
python3 scripts/serve.py
```

Open [localhost:8765](http://127.0.0.1:8765). To use another port:

```bash
python3 scripts/serve.py --port 8770
```

The preview server supports the same clean URLs as production, such as `/projects` and `/blog/annie`.

## Pages and files

| Path | Contents |
| --- | --- |
| `index.html` | Homepage |
| `projects/index.html` | Project archive, with Personal and Campus filters |
| `blog/` | Articles about Annie, Logit, and PolicyC |
| `snoopy/` | An earlier version of the portfolio, preserved at `/snoopy` |
| `styles.css` | Shared layout and typography |
| `projects/filters.css` | Project archive filters |
| `static/` | Images, fonts, and browser scripts |
| `scripts/` | Preview server, asset generators, and tests |
| `resume.pdf` | Résumé |
| `policyc.pdf` | PolicyC paper |
| `vercel.json` | Deployment, clean URLs, and cache settings |

Pages are edited directly in HTML. Articles live at `blog/<slug>/index.html`, with images in `static/`.

## Tests

The navigation tests require Node.js 20 or newer:

```bash
npm ci
npx playwright install chromium
npm test
```

Each run starts its own preview server. The suite covers page navigation, browser history, scroll restoration, entrance animations, and failure recovery.

To test other browsers, install their Playwright binaries and select an engine:

```bash
npx playwright install firefox webkit
BROWSER=firefox npm test
BROWSER=webkit npm test
```

`CHROME_BIN` can point to an existing Chrome executable instead of Playwright's Chromium.

## Generated assets

Most content is edited by hand. A few assets have generators:

| Asset | Command |
| --- | --- |
| GitHub contribution calendar | `python3 scripts/generate-contributions.py` |
| Social preview image | `python3 scripts/generate-og-image.py` |
| PolicyC figures | `python3 scripts/generate-policyc-charts.py` |
| Page font subsets | `python3 scripts/build-inter-page-fonts.py` |
| Diagram font subset | `python3 scripts/build-inter-diagram-font.py` |
| Fonts embedded in SVGs | `python3 scripts/embedded_inter_font.py` |
| Bundled navigation libraries | `python3 scripts/vendor-navigation.py` |

Font generation requires the Python dependencies in `scripts/requirements.txt`:

```bash
python3 -m pip install -r scripts/requirements.txt
```

The contribution calendar reads public GitHub profile data without a personal access token. A [scheduled workflow](.github/workflows/contributions.yml) refreshes it daily. Failed refreshes leave the previous calendar in place.

## Deployment

Pushes to `main` deploy through the GitHub-to-Vercel integration. The site is served directly from the repository.

The explicit `null` build settings in `vercel.json` override the Vercel project's older Astro configuration. They allow deployment without installing packages or running a framework build.
