# Typography System

## Current Issues

- The site has a strong minimal portfolio direction, but type rules are spread across components instead of a shared system. Similar UI elements use slightly different size, weight, line-height, tracking, and color choices.
- Body copy in `AboutSection` uses `leading-snug`, which makes longer paragraphs feel compressed. The text is readable, but the portfolio would feel more polished with a calmer paragraph rhythm.
- Section labels, archive headings, project archive links, badges, and table headers all use uppercase styling, but tracking ranges from default to `tracking-wider`. This makes small-label typography feel less intentional.
- Some text is heavier than needed for its role, especially mobile header identity text (`font-bold`) and some action labels (`font-semibold`). This can flatten the hierarchy because card titles, buttons, labels, and headings compete.
- Secondary text often uses `text-gray-600` / `dark:text-slate-400`. This is acceptable for short metadata, but paragraph-length copy should sit slightly darker in light mode and brighter in dark mode.
- Project cards and dropdown rows have good structure, but titles, summaries, dates, tags, and icon links should follow one repeatable hierarchy.
- The current custom CSS weight tokens in `globals.css` are useful (`380`, `440`, `520`, `610`), but component classes mostly use Tailwind defaults (`font-normal`, `font-medium`, `font-semibold`, `font-bold`) without documented intent.

## Design Direction

The typography should feel sharp, modern, readable, and developer-focused. Keep Inter as the site font and keep the current compact portfolio layout. The improvement should come from tighter hierarchy, better line height, stronger contrast, and fewer one-off type decisions.

Use a quiet editorial hierarchy:

- Large identity text should be confident, tight, and high impact.
- Section labels should feel like precise interface labels, not oversized headings.
- Body copy should be the easiest text on the page to read.
- Card titles should be clear but not louder than the sidebar identity.
- Metadata, tags, dates, and table headers should be smaller, calmer, and slightly tracked.
- Buttons and links should feel crisp through medium weight, consistent sizing, and predictable hover states.

Do not make everything bold. Use weight only when the text carries structural meaning.

## Type Scale

Use this scale as the default Tailwind-friendly system:

| Role | Mobile | Desktop | Recommended classes |
| --- | --- | --- | --- |
| Hero / identity heading | `text-2xl` | `text-2xl` or `text-3xl` if the sidebar grows | `text-2xl font-semibold leading-[0.98] tracking-tight` |
| Page title | `text-xl` | `md:text-2xl` | `text-xl md:text-2xl font-semibold leading-tight tracking-tight` |
| Section label | `text-[11px]` or `text-xs` | `text-xs` | `text-xs font-semibold uppercase tracking-[0.12em] leading-none` |
| Card title | `text-base` | `lg:text-lg` | `text-base lg:text-lg font-semibold leading-snug tracking-[-0.01em]` |
| Project title | `text-lg` | `md:text-xl` | `text-lg md:text-xl font-semibold leading-tight tracking-[-0.01em]` |
| Body copy | `text-[15px]` | `lg:text-base` or `lg:text-[17px]` for About | `text-[15px] lg:text-[17px] leading-7 lg:leading-8` |
| Compact body | `text-sm` | `lg:text-base` | `text-sm lg:text-base leading-6` |
| Secondary text | `text-sm` | `lg:text-[15px]` | `text-sm lg:text-[15px] leading-6` |
| Metadata / dates | `text-xs` | `sm:text-sm` | `text-xs sm:text-sm font-medium leading-none` |
| Tags / badges | `text-[11px]` | `text-xs` | `text-[11px] md:text-xs font-medium leading-none tracking-[0.01em]` |
| Nav / buttons | `text-sm` | `text-sm` | `text-sm font-medium leading-none tracking-normal` |

Avoid adding more sizes unless a component has a real reason. Most of the site should live in `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, and `text-2xl`.

## Font Weight Rules

- `font-normal` / weight `380`: Default body copy. Use for paragraphs, card descriptions, dropdown descriptions, footer copy, and table body values.
- `font-medium` / weight `440`: Use for inline links, secondary labels that need a little presence, dates, buttons, nav items, and badges.
- `font-semibold` / weight `520`: Use for structural titles: sidebar name, project titles, dropdown role titles, table project titles, and section labels.
- `font-bold` / weight `610`: Reserve for rare high-impact display text only. Avoid it in mobile header text, normal buttons, cards, badges, and body copy.
- `font-extrabold` / weight `700`: Do not use for visible portfolio UI except decorative background text, such as the mobile menu `bg` mark.

Recommended replacements:

- Mobile header name: change `font-bold` to `font-semibold`.
- Resume button: consider `font-medium` instead of `font-semibold`.
- Archive page title: use `font-semibold` instead of `font-bold`.
- Footer links: keep `font-medium`; do not underline by default unless the link appears inside long copy and needs clearer affordance.

## Line Height Rules

- Large headings: `leading-[0.98]`, `leading-none`, or `leading-tight`. Use only for short headings.
- Page titles and card titles: `leading-tight` or `leading-snug`.
- Body paragraphs: use `leading-7` on mobile and `lg:leading-8` for About. Avoid `leading-snug` for paragraph-length text.
- Compact descriptions: use `leading-6`, especially in cards and dropdown expanded descriptions.
- Labels, tags, nav, buttons: use `leading-none` when the element has enough vertical padding; use `leading-tight` when the label wraps.
- Table cells: use `leading-6` to prevent dense rows from feeling cramped.

## Letter Spacing Rules

- Large identity and project titles: use mild negative tracking only when the text is large enough: `tracking-tight` or `tracking-[-0.01em]`.
- Body text: use `tracking-normal`. Do not apply negative tracking to paragraphs.
- Section labels, table headers, archive link pills, and uppercase metadata: use `tracking-[0.12em]`. Avoid `tracking-wider` as a default because it can feel too loose at `text-xs`.
- Badges and tags: use `tracking-[0.01em]` or `tracking-normal`. Do not uppercase technology tags.
- Navigation and buttons: use `tracking-normal`; only add `tracking-[0.01em]` if the label is very short.

## Text Color Hierarchy

Use a consistent contrast hierarchy:

- Primary text: `text-gray-950 dark:text-slate-50`
  - Main identity, section content titles, project names, table project names.
- Strong text: `text-gray-900 dark:text-slate-100`
  - Default heading and card-title color when `gray-950` feels too stark.
- Body text: `text-gray-700 dark:text-slate-300`
  - Paragraphs, project summaries, dropdown descriptions.
- Secondary text: `text-gray-600 dark:text-slate-400`
  - Dates, locations, subtitles, table support cells.
- Muted metadata: `text-gray-500 dark:text-slate-400`
  - Tags, captions, footer secondary details. Use sparingly for long text.
- Interactive text: default to the text role above, then use `hover:text-gray-950 dark:hover:text-slate-50`.
- Accent links: use `text-blue-600 dark:text-blue-400` only for explicit action links. Inline editorial links can stay `text-slate-800 dark:text-slate-100 font-medium`.

Avoid `text-gray-500` for body paragraphs and descriptions longer than one short line.

## Component Typography Rules

### Hero

The desktop sidebar is the main identity block. Keep it compact and confident.

Recommended classes:

```tsx
<p className="text-2xl font-semibold leading-[0.98] tracking-tight text-gray-950 dark:text-slate-50">
  Hello, I'm
</p>
<p className="text-2xl font-semibold leading-tight tracking-tight text-gray-950 dark:text-slate-50">
  Benjamin Garcia
</p>
<p className="mt-2 text-[15px] font-normal leading-6 text-gray-700 dark:text-slate-300">
  I turn code into meaningful creations.
</p>
```

Rules:

- Keep the greeting and name at the same size unless a full hero is introduced later.
- Do not use `font-bold` here. `font-semibold` is strong enough with tight tracking.
- Keep the tagline one step lower in color and weight.

### Section Headings

Section headings are label pills, not large editorial headings. Their job is to organize scanning.

Recommended classes for `SectionHeader`:

```tsx
className="w-fit rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold uppercase leading-none tracking-[0.12em] text-gray-700 dark:border-gray-700 dark:text-slate-300"
```

Rules:

- Use the same label style for `about`, `experience`, `selected projects`, `education`, and archive controls.
- Keep labels uppercase.
- Keep label tracking consistent with `tracking-[0.12em]`.
- Do not use section labels as large page headings on the home page.

### Body Text

About copy should be more readable than the current `leading-snug`.

Recommended class:

```tsx
const BODY_COPY = "text-[15px] leading-7 text-gray-700 dark:text-slate-300 lg:text-[17px] lg:leading-8";
```

Rules:

- Use this for the main About paragraphs.
- Keep inline links `font-medium text-gray-900 dark:text-slate-100`.
- Keep paragraph spacing modest: `mt-3` between related paragraphs.
- Do not use `text-gray-500` or `leading-snug` for multi-sentence copy.

### Navigation

Navigation appears mostly as sidebar actions, mobile menu links, the archive link, and the back link.

Recommended classes:

```tsx
// Back link / small nav
"text-sm font-medium leading-none text-gray-600 transition-colors hover:text-gray-950 dark:text-slate-400 dark:hover:text-slate-50"

// Mobile full-screen menu links
"text-2xl font-semibold leading-tight tracking-tight text-gray-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
```

Rules:

- Small nav items use `font-medium`, not `font-semibold`.
- Full-screen mobile menu items can use `font-semibold` because they are the main content of that state.
- Avoid uppercase nav except for small pill controls.

### Buttons

Buttons should feel crisp and stable.

Recommended classes:

```tsx
"text-sm font-medium leading-none tracking-normal"
```

Rules:

- Use `font-medium` for buttons and action pills.
- Use `font-semibold` only for primary actions that need stronger emphasis.
- Keep button text color tied to the component state: muted at rest, primary on hover.
- Do not use `tracking-wider` for normal button text.

### Links

Inline links should be discoverable without shouting.

Recommended classes:

```tsx
"font-medium text-gray-900 transition-colors hover:text-gray-950 dark:text-slate-100 dark:hover:text-white"
```

Rules:

- In body copy, use `font-medium` plus stronger color.
- For standalone icon links, use color hierarchy and `aria-label`; no visible text is needed.
- For dotted links, keep the underline treatment subtle and use current color.
- Use blue only for clear action links such as `Visit website`.

### Cards

Project and experience cards should use a consistent hierarchy.

Recommended project card title:

```tsx
"text-lg font-semibold leading-tight tracking-[-0.01em] text-gray-950 dark:text-slate-50 md:text-xl"
```

Recommended summary:

```tsx
"mt-1 text-sm leading-6 text-gray-700 line-clamp-2 dark:text-slate-300 lg:text-[15px]"
```

Recommended tags:

```tsx
"whitespace-nowrap rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-medium leading-none tracking-[0.01em] text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300 md:text-xs"
```

Rules:

- Card title gets the highest contrast in the card.
- Summary uses body color, not muted metadata color.
- Tags should be visually quiet and never compete with the title.
- Keep icon links muted at rest and primary on hover.

### Project Sections

Selected projects and the archive should feel like one system.

Rules:

- Selected project titles: `text-lg md:text-xl font-semibold leading-tight tracking-[-0.01em]`.
- Project summaries: `text-sm lg:text-[15px] leading-6 text-gray-700 dark:text-slate-300`.
- Archive table project titles: `font-semibold text-gray-950 dark:text-slate-50`.
- Archive table body cells: `text-sm md:text-base leading-6`.
- Archive table headers: `text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-slate-400`.
- Archive page title: use `text-xl md:text-2xl font-semibold leading-tight tracking-tight`, not a heavily tracked uppercase badge unless it is intentionally a label.

### Captions and Metadata

Use metadata styling for dates, location, badges, footer attribution, and table headers.

Recommended classes:

```tsx
"text-xs font-medium leading-none text-gray-500 dark:text-slate-400 sm:text-sm"
```

For uppercase metadata:

```tsx
"text-xs font-semibold uppercase leading-none tracking-[0.12em] text-gray-600 dark:text-slate-400"
```

Rules:

- Metadata should be smaller or lower contrast, not both too aggressively.
- Dates in dropdown rows can stay `text-sm lg:text-base`, but use `font-medium` and secondary color.
- Footer copy can stay `text-sm`, but should use `leading-6` for polish.

## Responsive Rules

- Mobile body text should not drop below `text-[15px]` for paragraph content.
- Desktop About copy can increase to `lg:text-[17px]` because it is the most narrative text on the home page.
- Card descriptions should stay compact: `text-sm lg:text-[15px]`.
- Section labels should stay the same size across breakpoints. Their stability helps the page scan.
- Mobile header identity text should stay compact: `text-sm font-semibold` for the name and `text-[11px] font-medium` for the tagline.
- Avoid viewport-based font sizing. Use breakpoint classes and fixed scale steps.
- On mobile, prefer better line height over larger text. Long paragraphs should use `leading-7`.

## Tailwind Class Recommendations

Add reusable constants near the components first. If the patterns repeat in more than three places, promote them into shared component helpers or Tailwind component classes.

Recommended local constants:

```tsx
const TYPE_SECTION_LABEL =
  "text-xs font-semibold uppercase leading-none tracking-[0.12em] text-gray-700 dark:text-slate-300";

const TYPE_BODY =
  "text-[15px] leading-7 text-gray-700 dark:text-slate-300 lg:text-[17px] lg:leading-8";

const TYPE_COMPACT_BODY =
  "text-sm leading-6 text-gray-700 dark:text-slate-300 lg:text-[15px]";

const TYPE_CARD_TITLE =
  "text-base font-semibold leading-snug tracking-[-0.01em] text-gray-950 dark:text-slate-50 lg:text-lg";

const TYPE_PROJECT_TITLE =
  "text-lg font-semibold leading-tight tracking-[-0.01em] text-gray-950 dark:text-slate-50 md:text-xl";

const TYPE_METADATA =
  "text-xs font-medium leading-none text-gray-500 dark:text-slate-400 sm:text-sm";

const TYPE_BUTTON =
  "text-sm font-medium leading-none tracking-normal";

const TYPE_INLINE_LINK =
  "font-medium text-gray-900 transition-colors hover:text-gray-950 dark:text-slate-100 dark:hover:text-white";
```

Tailwind v4 token guidance for `globals.css`:

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 0.9375rem;
  --text-lg: 1.0625rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --font-weight-normal: 380;
  --font-weight-medium: 440;
  --font-weight-semibold: 520;
  --font-weight-bold: 610;
}
```

The current token weights are good. The main adjustment is using them consistently through Tailwind classes.

## Before / After Examples

### About Paragraph

Before:

```tsx
const ABOUT_TEXT_CLASS_NAME =
  "text-gray-600 dark:text-slate-400 lg:text-lg leading-snug";
```

After:

```tsx
const ABOUT_TEXT_CLASS_NAME =
  "text-[15px] leading-7 text-gray-700 dark:text-slate-300 lg:text-[17px] lg:leading-8";
```

Why: stronger contrast and more comfortable leading make the longest copy on the page easier to read.

### Section Header

Before:

```tsx
"text-xs uppercase mt-10 mb-5 font-semibold"
```

After:

```tsx
"text-xs font-semibold uppercase leading-none tracking-[0.12em] text-gray-700 dark:text-slate-300"
```

Why: consistent tracking and color make labels feel intentional rather than default.

### Project Card

Before:

```tsx
const titleClassName =
  "text-lg font-semibold text-gray-900 md:text-xl dark:text-slate-100";
const subtitleClassName =
  "mt-1 text-sm text-gray-600 line-clamp-2 lg:min-h-[4rem] lg:text-base dark:text-slate-400";
```

After:

```tsx
const titleClassName =
  "text-lg font-semibold leading-tight tracking-[-0.01em] text-gray-950 dark:text-slate-50 md:text-xl";
const subtitleClassName =
  "mt-1 text-sm leading-6 text-gray-700 line-clamp-2 lg:min-h-[4rem] lg:text-[15px] dark:text-slate-300";
```

Why: the title gets sharper, while the summary becomes easier to read and less washed out.

### Dropdown Row

Before:

```tsx
const titleCls =
  "font-semibold w-full lg:text-lg text-gray-900 dark:text-slate-100";
const subtitleCls = "text-sm text-gray-600 dark:text-slate-400 lg:text-base";
```

After:

```tsx
const titleCls =
  "w-full text-base font-semibold leading-snug tracking-[-0.01em] text-gray-950 dark:text-slate-50 lg:text-lg";
const subtitleCls =
  "text-sm leading-6 text-gray-600 dark:text-slate-400 lg:text-[15px]";
```

Why: explicit leading and tracking keep repeated rows visually consistent.

### Archive Table Header

Before:

```tsx
"text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
```

After:

```tsx
"text-xs font-semibold uppercase leading-none tracking-[0.12em] text-gray-600 dark:text-slate-400"
```

Why: `tracking-[0.12em]` is precise and repeatable across small uppercase UI labels.

### Mobile Header

Before:

```tsx
<p className="text-sm font-bold text-gray-900 dark:text-slate-100 leading-tight">
  Benjamin Garcia
</p>
```

After:

```tsx
<p className="text-sm font-semibold leading-tight text-gray-950 dark:text-slate-50">
  Benjamin Garcia
</p>
```

Why: the header still reads clearly, but no longer feels heavier than project titles.

## Implementation Checklist

1. Update `SectionHeader` to include consistent label color, `leading-none`, and `tracking-[0.12em]`.
2. Replace About paragraph classes with the recommended body copy class.
3. Update inline About link color from `text-slate-800` to `text-gray-900` in light mode for consistency.
4. Change mobile header name from `font-bold` to `font-semibold`.
5. Normalize sidebar identity text to `text-gray-950 dark:text-slate-50`, tight leading, and `font-semibold`.
6. Change resume/action button text from `font-semibold` to `font-medium` unless it needs primary emphasis.
7. Update project card title, summary, note, and tag classes to the card rules above.
8. Update dropdown title, subtitle, date, and expanded description classes.
9. Normalize archive table header tracking to `tracking-[0.12em]`.
10. Normalize archive table body cells to `text-sm md:text-base leading-6`.
11. Update archive page title from `font-bold` to `font-semibold` and reduce uppercase tracking unless keeping it as a label pill.
12. Audit all `text-gray-500`, `text-gray-600`, `dark:text-slate-400`, `leading-snug`, `tracking-wider`, and `font-bold` usages.
13. Keep `font-bold` only for rare display/decorative text.
14. Check mobile widths after changes to make sure longer project titles and tags wrap cleanly.
15. Review dark mode contrast manually after applying changes; body copy should read as `dark:text-slate-300`, not `dark:text-slate-400`.
