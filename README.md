# Benjamin Garcia Portfolio

Personal portfolio at [www.bentgarcia.com](https://www.bentgarcia.com), with experience, projects, technical articles, and a résumé preview.

Built with static HTML, CSS, and JavaScript. Vercel serves the site directly from `main`; there is no application build step.

## Run locally

```sh
python3 scripts/serve.py --port 8782
```

Open http://localhost:8782. Use this server rather than a generic static server so extensionless routes and missing-page responses work correctly.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `projects/index.html` | Project archive |
| `blog/` | Annie, Logit, and PolicyC articles |
| `404.html` | Not-found page |
| `styles.css`, `pages.css`, `snoopy.css` | Shared styles and responsive layouts |
| `snoopy.js` | Homepage illustration and clock |
| `static/navigation.js` | Swup navigation and page lifecycle |
| `static/article-media.js` | Article sidebar media |
| `static/resume-modal.js`, `resume-modal.css` | Accessible résumé dialog using self-hosted PDF.js |
| `static/` | Images, fonts, and vendored browser assets |
| `scripts/` | Preview server, asset generators, and checks |

The desktop and tablet homepage fits within one viewport. Phones use a scrolling layout. Native links and readable content remain available without JavaScript.

## Update content and assets

Edit page content in its HTML file. Keep shared stylesheet and script cache versions consistent across all six HTML entrypoints when publishing changed assets.

- **Résumé:** replace `resume.pdf`. The preview and download use that file. `resume.tex` is source only and is excluded from Vercel deployment.
- **Page fonts:** after changing the canonical WOFF2 files, run `python3 scripts/embed-page-fonts.py` to refresh the embedded fonts in `styles.css`.
- **Social image:** `scripts/assets/og-approved.png` is the approved source. Run `python3 scripts/generate-og-image.py` to publish it and update image cache versions when its bytes change. Use `--render` to create a candidate for review.
- **Diagram tooling:** Python dependencies are pinned in `scripts/requirements.txt`.

Vendored PDF.js and font license files are retained alongside their assets.

## Verify changes

Install browser-test dependencies and run the suite:

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
BROWSER=firefox npm test
BROWSER=webkit npm test
```

Set `CHROME_BIN` to use an installed Chrome executable instead of Playwright's Chromium.

Run the Python asset-generator checks:

```sh
python3 -m pip install -r scripts/requirements.txt
python3 -m unittest discover -s scripts -p 'test_*.py'
```

Before publishing, check homepage, archive, and article navigation at desktop and phone sizes. Exercise the résumé dialog with pointer and keyboard input, and confirm that the desktop homepage does not scroll.

## Deploy

Push changes to `main` to trigger Vercel deployment. Deployment settings are in `vercel.json`; `.vercelignore` controls excluded files.

After deployment, check the live routes and résumé preview. For résumé replacements, compare the served PDF with the supplied file byte-for-byte and confirm that `/resume.tex` returns 404.
