# Benjamin Garcia Portfolio

Static HTML/CSS portfolio deployed from `main` to https://www.bentgarcia.com through Vercel. No build or install step is required.

Mobile pages extend into safe areas while padding content away from them. The root canvas, body, and page containers use flat cream without a texture layer. Safari controls its own toolbar rendering. Desktop reading pages use a fixed title/media column beside prose; mobile retains its inline layout.

Short desktop windows use compact heading/list/contact/footer spacing without reducing reading text. A further spacing pass accommodates shorter browser content areas; WebKit checks fit 1568×714, 1568×690, 1366×768, and 1280×600. These are simulated viewports, not a guarantee about every Windows font/browser configuration.

## Approved design update

The mixed-font homepage uses Inter for names/roles/intro and mono for descriptions/metadata. Five Snoopy poses include daydreaming and headphones; dancing has been replaced. The background is flat cream, including the root canvas. Desktop archive rows span name, technologies, and source links. Desktop articles have a fixed title column with section-linked images/charts underneath, 150ms out/in blur-and-slide swaps, and carry-forward visuals for text-only sections. Mobile, short windows, and no-JavaScript views retain inline figures. Article footers are removed. All diagrams have transparent canvases; the PolicyC generator preserves transparency.

The readable width-based sizing hotfix and footer résumé underline remain in place. The local design was integrated on top of production rather than replacing that fix. The unrelated resume.tex edit, Benjamin_Garcia.pdf, website-audit.md, and Python caches are excluded.

Homepage company names and Work project titles are underlined links. Work retains its two-line name/descriptor format; no technical-description paragraph is displayed.

On phones, underlined Résumé and All projects links share the Experience and Work heading rows. On desktop/tablet, Résumé remains in the footer and All projects remains below the featured list. All projects is underlined with no arrow at every size. Responsive copies expose only one link per destination at a time, including without JavaScript.

## Roll back to the old portfolio

The last old-portfolio commit is **`1551b7d3fa0090e4c1902e2ef297e43ef100c95e`**, also tagged **`portfolio-before-snoopy-2026-10-05`**. Its homepage bytes were checked against production immediately before this cutover.

The Snoopy cutover is tagged **`portfolio-snoopy-launch-2026-10-05`**. To undo only this launch without rewriting history, use a clean checkout:

```sh
git fetch origin --tags
git switch main
git pull --ff-only origin main
git revert portfolio-snoopy-launch-2026-10-05
git push origin main
```

Vercel deploys the revert. If subsequent edits conflict, resolve them against the old-portfolio tag before committing. Do not use a force push. The revert restores the prior design, navigation contract, and contribution-calendar workflow together.

For an exact old-tree restoration after substantial later changes, review the full impact first, then restore the old tree in a clean branch with `git restore --source=portfolio-before-snoopy-2026-10-05 --staged --worktree -- .`, commit it, and merge/push normally. This intentionally discards all tracked changes since that snapshot, not just the design.

## Preview

```sh
python3 scripts/serve.py --port 8782
```

Use this server for extensionless routes, not `python -m http.server`.

## Routes and ownership

- `/`: `index.html`, `snoopy.css`, `snoopy.js`. Fitted desktop composition; adapted portrait tablet layout; scrolling mobile layout with orange About/contact prose.
- `/projects`: year-grouped archive, all 20 existing entries, bookshelf Snoopy.
- `/blog/annie`, `/blog/logit`, `/blog/policyc`: long-form articles with typewriter Snoopy. Body copy and chart data are unchanged.
- `pages.css`: shared archive/article paper palette and typography over `styles.css`.
- `static/snoopy/`: five homepage poses, typewriter, and bookshelf artwork derived from supplied PNGs with transparency preserved.
- `static/navigation.js`: enhanced archive/article navigation. Homepage visits use native document loading to initialize its independent scripts.
- `resume.pdf`, `policyc.pdf`, `perspectevolver.pdf`: existing downloadable documents, unchanged by this launch.

Homepage text scales with viewport width, clamped to a 16–20px root size; reducing window height does not shrink reading text or the page width. The content canvas is capped at the 1568px reference width. Short landscape windows tighten vertical spacing and reduce only the display-name/artwork size. Portrait tablets retain a width-based 16–20px root size; phones retain readable scrolling text. No clipping or scroll interception is used. Archive/article display titles are width-based too. Snoopy cycles on mouse, touch, Enter, and Space. Reload selection excludes the last pose using sessionStorage; without JS a static image remains. The footer clock uses local time.

The footer résumé link is permanently underlined without changing its size or placement. The desktop sizing hotfix was verified at 1568×714 (the reported browser-content height), 1568×769, 1568×984, 1366×768, 1280×600, 1024×768, and portrait iPad sizes. Main text stays the same size when a 1568px-wide window becomes shorter. Chromium, Firefox, and WebKit passed the navigation suite and the new short-window regression.

SEO/canonical metadata, social image references, sitemap, robots, manifest, font assets, and deployment configuration are retained. The scheduled contribution updater is removed because this homepage does not include the contribution calendar. Its generator and tests remain available in history and source, but do not run it against the Snoopy homepage without restoring its marker block.

## Verification

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
BROWSER=firefox npm test
BROWSER=webkit npm test
```

`CHROME_BIN` optionally selects an installed Chrome executable. Navigation regressions cover the homepage handoff, image cycling after reload, slow-fetch archive visibility, history scroll restoration, chart selection, and no-JavaScript navigation. The older tests tied to the retired homepage were replaced to match this contract.

Before launch, exercise homepage → archive → article → home in a headless browser, check desktop/tablet/mobile overflow, all five Snoopy states, résumé and paper responses, and verify `resume.tex` is not public. After launch compare the served HTML/CSS/JS and résumé bytes against this commit, then repeat the live navigation smoke.

The original working directory's unrelated resume.tex edit and untracked files were not included in the cutover; deployment was prepared in a separate worktree. The Ben-Snoopy preview directory remains available locally.
