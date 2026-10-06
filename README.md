# Benjamin Garcia Portfolio

Static HTML/CSS portfolio deployed from `main` to https://www.bentgarcia.com through Vercel. No build or install step is required.

## Résumé modal

Clicking an ordinary résumé link opens a native dialog over the current page. It renders the unchanged PDF with a selectable text layer, places reading Snoopy outside the lower-left edge, and places Download/Share outside the lower-right edge. Button labels expand on hover or keyboard focus; touch layouts show labels directly. The backdrop dims and blurs by 4px. Opening uses the supplied 250ms scale/fade and closing uses 150ms; reduced motion skips transitions.

Escape, backdrop click, and the close button dismiss it. Focus is trapped while open and restored afterward; page scrolling is locked without changing the URL. Navigation closes the dialog and releases the lock. Downloads preserve original PDF bytes. Desktop Share copies the direct PDF URL; touch devices use Web Share when available, with a selectable-link fallback. No JavaScript or modified clicks retain native PDF behavior. A render failure offers a direct PDF link.

Successful clipboard sharing turns Share into a green checkmark pill labeled Copied for 1.5 seconds, then collapses to the share icon even while hovered. Native sharing uses Shared instead of claiming a clipboard copy. There is no separate visible success message. Expanded widths are measured from actual labels for equal left/right padding; the icon stays anchored during 220ms pill expansion. Pending sharing keeps keyboard focus and blocks duplicate requests, with a centered spinner. Closing clears feedback timers and ignores late results. Desktop rests at 48px and mobile at 44px after success. Chromium checks measured matching padding within 0.1px and verified pending → success → reset → fresh-hover behavior; WebKit verified touch sharing and reduced motion.

Interaction references: [Radix Icon Button](https://www.radix-ui.com/themes/docs/components/icon-button) for consistent dimensions and accessible labels; [React Aria Button](https://react-aria.adobe.com/Button) for press/focus/pending states and link semantics; [Motion hover guidance](https://motion.dev/docs/hover) for avoiding touch-emulated hover. These patterns are adapted using native elements and CSS, without adding a component framework.

Base controls use a light neutral border (#c5c8cf). The green success state uses a soft, lighter green border (#8fb49b), rather than a dark outline; its fill remains #2f7045.

The renderer is self-hosted PDF.js 5.4.624, lazy-loaded only when opening the preview. Vendored files in static/pdfjs are package/build/pdf.min.mjs, package/build/pdf.worker.min.mjs, and package/LICENSE from `npm pack pdfjs-dist@5.4.624`. Package SHA-256: `5c387457cd03cc2e7b9c9b1ed642e8148d1ba44c3b8e5b5b771526feb24b61b9`. The Apache-2.0 license is preserved. The reading illustration is derived from the supplied Snoopy Reading on Colorful Books.png.

Verified real PDF canvas/text rendering, matching download bytes, actual clipboard output, intercepted native-share payload/copy fallback, forward/backward keyboard focus, Escape/backdrop dismissal, rapid reopen, reduced motion, and failed-PDF fallback. Open/close animation intermediate frames were sampled. Desktop actions sit outside the PDF's bottom-right edge; the close button sits outside its top-right edge on the same control rail. On phones, controls stay within the viewport and the close button sits above the paper.

The social card is the approved 1200×630 Ben Garcia/laptop Snoopy image. `scripts/assets/og-approved.png` is its byte-exact source; `python3 scripts/generate-og-image.py` publishes it to `static/og.png` and advances all OG/Twitter/structured-data image versions only if bytes change. Two consecutive runs are no-ops for the approved release. `--render` creates a future candidate from homepage copy and the bundled Inter/artwork; browser/font rasterization can differ, so review it before updating the approved source. LinkedIn can require a refresh through https://www.linkedin.com/post-inspector/ after deployment.

Bonterra's role is “R&D Engineer Intern” above 760px and “Research & Development Engineer Intern” on phones. CSS switches the visible wording without JavaScript.

Mobile pages extend into safe areas while padding content away from them. The root canvas, body, and page containers use flat cream without a texture layer. Safari controls its own toolbar rendering. Desktop reading pages use a fixed title/media column beside prose; mobile retains its inline layout.

The homepage must fit on one screen on desktop and tablets, including the complete footer and bottom padding. Phones at 760px or narrower retain their scrolling layout. Landscape spacing now changes continuously with available height instead of switching abruptly at 850px; the previous cutoff overflowed at intermediate heights such as 1512×871 and 1568×924.

## Approved design update

The mixed-font homepage uses Inter for names/roles/intro and mono for descriptions/metadata. Five Snoopy poses include daydreaming and headphones; dancing has been replaced. The background is flat cream, including the root canvas. Desktop archive rows span name, technologies, and source links. Desktop articles have a fixed title column with section-linked images/charts underneath, 150ms out/in blur-and-slide swaps, and carry-forward visuals for text-only sections. Mobile, short windows, and no-JavaScript views retain inline figures. Article footers are removed. All diagrams have transparent canvases; the PolicyC generator preserves transparency.

Monospace text uses self-hosted Geist Mono for descriptions, dates, metadata, and secondary-page labels. Its Latin variable WOFF2 comes from `@fontsource-variable/geist-mono` 5.3.0; `OFL-GeistMono.txt` preserves the SIL Open Font License. Regular mono text uses weight 375; experience dates use 500 so they remain secondary to company names. Other bold labels and Inter weights are unchanged. The superseded IBM Plex and static Geist assets are removed.

The three featured Work descriptions share the experience-description typography, including font size, weight, line height, color, and full opacity, on both desktop and phones.

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
- `/404`: compact cream-and-blue not-found screen with the supplied detective Snoopy and Woodstock illustration on the left, text on the right, and one Return home link. Phones stack the illustration above the text. `scripts/serve.py` serves this HTML with HTTP 404 for missing paths; Vercel uses the root `404.html`.
- `pages.css`: shared archive/article/not-found palette and typography over `styles.css`. Article-title Snoopy is 1.35em rather than 1em and aligns to the project-name baseline; title text sizes are unchanged. The complete desktop article header starts at 89px rather than 121px, moving the name, illustration, subtitle, and media up 32px while keeping the sidebar's bottom 24px from the viewport edge.
- `static/snoopy/`: five homepage poses, typewriter, bookshelf, and detective artwork derived from supplied PNGs with transparency preserved. `detectives.webp` is a cropped 900×750 lossless conversion of `Snoopy and Woodstock Detective Duo.png`.
- `static/navigation.js`: legacy-style Swup navigation across the homepage, archive, articles, and 404. The current document stays visible during fetches; only main is replaced, with no page transition animation. External sites, non-résumé PDFs, downloads, and fragment fallback remain native.
- `resume.pdf`, `policyc.pdf`, `perspectevolver.pdf`: existing downloadable documents, unchanged by this launch.

The content canvas is capped at 1568px. CSS provides a fitted desktop/tablet fallback and keeps the phone layout scrolling. Landscape spacing interpolates between compact 34.5rem and roomy 49.2rem height budgets. Square viewports use only the portrait layout. No overflow hiding, clipping, or scroll interception is used. Snoopy cycles on mouse, touch, Enter, and Space; reload selection excludes the last pose using sessionStorage, and a static image remains without JavaScript. The footer clock uses local time.

Above 760px, `snoopy.js` grows only reading text into spare space, up to an 18px main-text size. It measures actual wrapping, block overflow, and total sheet height, choosing the largest fitting scale within .005. The display name, illustration, and row spacing are not enlarged by this pass. Font loading and window resizing trigger a coalesced fit; navigation removes the listener and pending frame. The scale is local to the homepage and is cleared for phones. The rejected stretched-row layout is removed.

Headless Chromium verified 238 desktop/tablet viewport combinations spanning 761–3440px wide and 400–1180px high, checking document overflow and visible content bounds. At 1260×871, main text grows from 13.06px to 16.11px and descriptions from 12.05px to 14.87px, without stretching row gaps. At 1568×924, descriptions reach 16.46px. Phone descriptions remain 14px with vertical scrolling. The existing browser regression now checks text growth, screenshot-sized viewports, tablet fit, and returning from a scrolled phone layout.

The not-found screen was inspected at 1568×924 and 390×844; the supplied artwork retains transparency. Missing nested paths return HTTP 404, and keyboard activation of Return home restores the working homepage. All three article titles were checked at 1568/1100/820/390/320px after enlarging their typewriter Snoopy, with no horizontal overflow.

SEO/canonical metadata, social image references, sitemap, robots, manifest, font assets, and deployment configuration are retained. The scheduled contribution updater is removed because this homepage does not include the contribution calendar. Its generator and tests remain available in history and source, but do not run it against the Snoopy homepage without restoring its marker block.

## Verification

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
BROWSER=firefox npm test
BROWSER=webkit npm test
```

`CHROME_BIN` optionally selects an installed Chrome executable. Thirteen regressions cover same-document identity, slow-fetch visibility, repeated Snoopy/clock initialization, entry-specific Back/Forward scrolling, article-media restoration, response races, failed-history recovery, native fragments/external links/non-résumé PDFs, 404 round trips, no-JavaScript fallback, adaptive reading size, PDF overlay rendering/focus, and history cleanup. The current typography and initial illustrated-404 changes pass all thirteen in Chromium; later illustration-size refinements were checked directly in the browser.

All routes load the same stylesheets in order: styles.css, pages.css, snoopy.css, resume-modal.css. Page-specific selectors are scoped so incoming page assets cannot restyle the outgoing view. Shared scripts load once; portfolio:before-replace cleans up homepage timers/listeners and article media and closes the résumé modal, portfolio:after-replace mounts the new main, and portfolio:scroll-restored selects the correct visual immediately after restoring scroll. The MutationObserver-based media mount and native homepage handoff were removed.

During a delayed homepage→article fetch, 23 sampled browser frames retained an opaque, styled main with no blank frame. Navigation requested no additional stylesheets and preserved document identity. Direct-load fonts and measured geometry match the prior production homepage, archive, Logit, and 404.

Before launch, exercise homepage → archive → article → home in a headless browser, check desktop/tablet/mobile overflow, all five Snoopy states, résumé and paper responses, and verify `resume.tex` is not public. After launch compare the served HTML/CSS/JS and résumé bytes against this commit, then repeat the live navigation smoke.

The original working directory's unrelated resume.tex edit and untracked files were not included in the cutover; deployment was prepared in a separate worktree. The Ben-Snoopy preview directory remains available locally.
