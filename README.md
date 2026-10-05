# Benjamin Garcia Portfolio

Static HTML/CSS portfolio deployed from `main` to https://www.bentgarcia.com through Vercel. No build or install step is required.

Mobile pages extend into safe areas while padding content away from them. The paper texture fades at the upper/lower edges into the same cream used by browser theme metadata. Safari controls its own toolbar rendering; physical-device confirmation is still needed. Desktop archive/article titles share the homepage's Inter size, weight, tracking, and line height with proportional Snoopy artwork; mobile titles adapt to available width. Verified in headless WebKit at 1568/390/320px without horizontal overflow.

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
- `static/snoopy/`: four homepage poses, typewriter, and bookshelf artwork derived from supplied PNGs with transparency preserved.
- `static/navigation.js`: enhanced archive/article navigation. Homepage visits use native document loading to initialize its independent scripts.
- `resume.pdf`, `policyc.pdf`, `perspectevolver.pdf`: existing downloadable documents, unchanged by this launch.

Homepage scaling uses the smaller viewport width/height fit against 1568×984. Portrait tablets adapt rows; phones retain readable scrolling text. No clipping or scroll interception is used. Snoopy cycles on mouse, touch, Enter, and Space. Reload selection excludes the last pose using sessionStorage; without JS a static image remains. The footer clock uses local time.

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

Before launch, exercise homepage → archive → article → home in a headless browser, check desktop/tablet/mobile overflow, all four Snoopy states, résumé and paper responses, and verify `resume.tex` is not public. After launch compare the served HTML/CSS/JS and résumé bytes against this commit, then repeat the live navigation smoke.

The original working directory's unrelated resume.tex edit and untracked files were not included in the cutover; deployment was prepared in a separate worktree. The Ben-Snoopy preview directory remains available locally.
