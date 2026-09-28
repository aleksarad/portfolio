# aleksarad.com — Portfolio

Personal portfolio. A hyper-minimal, typography-led site with a dark and light theme. This file is the project guide for anyone (human or Claude) working in this repo.

## Stack

- **Astro + TypeScript (strict).** Static site, zero client JavaScript by default.
- **Fonts self-hosted** (e.g. via Fontsource). Don't load fonts from a third-party CDN at runtime.
- **Content collections** for structured content (projects) instead of hardcoding data in markup.
- **Hosting:** GitHub Pages via GitHub Actions, custom domain.

## Design tokens

### Color

Colors are authored in OKLCH and set as CSS custom properties on `:root`, with a light-theme override (dark is the default theme). Keep new colors in OKLCH for consistency.

| Token            | Dark (default)         | Light                  | Used for                                                                                         |
| ---------------- | ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| `--color-bg`     | `oklch(0.14 0 0)`      | `oklch(0.98 0 0)`      | Page background                                                                                  |
| `--color-name`   | `oklch(0.97 0.002 90)` | `oklch(0.15 0 0)`      | The name / hero heading                                                                          |
| `--color-link`   | `oklch(0.9 0 0)`       | `oklch(0.2 0 0)`       | Primary nav links and project titles                                                             |
| `--color-dim`    | `oklch(0.58 0 0)`      | `oklch(0.5 0 0)`       | Current-page nav state, muted footer text                                                        |
| `--color-body`   | `oklch(0.72 0 0)`      | `oklch(0.35 0 0)`      | Body copy (About paragraph)                                                                      |
| `--color-accent` | `oklch(0.72 0.23 350)` | `oklch(0.55 0.23 350)` | Sparse decorative accent (hover underline, hover mark) — do not use for body text or large fills |

All text-on-background pairings must pass WCAG AA (4.5:1 for text under ~24px/18.5px bold; 3:1 for larger text) in **both** themes. `--color-dim` and `--color-body` are the tightest margins — re-check contrast whenever these values change.

### Typography

Three serif families, used deliberately, not interchangeably:

- **Instrument Serif** (italic) — the name/hero only. One place, one use.
- **Playfair Display** (400/500/600) — nav links, section headings, project titles.
- **EB Garamond** (regular + italic) — body copy, taglines, footer text.

Sizes are fluid via `clamp()` rather than fixed breakpoints.

### Spacing

Interactive text (links, nav items) carry generous vertical padding (8–10px) for comfortable tap targets even though they render as plain text.

### Motion

Hover/transition timing is 0.15–0.3s ease. Motion is decorative (underline reveals, a small rotate+scale accent mark on hover) and must be wrapped in `prefers-reduced-motion` so it can be disabled — this isn't optional polish, it's a correctness requirement for any new hover/transition effect.

## Conventions

- `.astro` components with typed `Props` interfaces (`Layout`, `Nav`, `ProjectItem`, `Footer`, …). These render to static HTML at build time.
- Theme state: an inline script in `<head>` sets the theme before first paint (default to `prefers-color-scheme`, override persisted for the toggle), so there's no flash of the wrong theme. This toggle is plain script — it does not justify a framework.
- Projects are data (a content collection with a schema — title, url, and optionally year/description/tags), not markup. Add fields to the schema, not one-off HTML per project.
- One concern per commit; small, scoped diffs.
- Keep Claude's co-author attribution on commits it authors or contributes to.

## Accessibility rules (non-negotiable)

- WCAG AA contrast minimum, in both themes, checked whenever a color token changes.
- Real semantic HTML: an actual `<h1>` for the name, `<nav>` for navigation, `<main>` and `<footer>` landmarks.
- Real `<a>`/`<button>` elements for anything interactive — no bare `<div onclick>` patterns, even for something that looks like plain text.
- Visible focus states on every interactive element, including the theme toggle.
- The current page/section is never indicated by color alone — pair it with something structural (e.g. `aria-current="page"`).
- Icon-only controls get an `aria-label` (e.g. a back arrow labeled "Home").
- Full keyboard navigability; no interaction that only works with a mouse/pointer.

## Working in this repo

1. **Small slices.** One concern per request/commit (e.g. "convert the nav," not "build the site").
2. **Review every diff.** Nothing lands without a human reading the change.
3. **Update this file when corrected twice.** If the same correction happens twice in a session, add it here as a rule instead of relying on memory.

Once Astro is scaffolded, standard scripts apply: `npm run dev`, `npm run build`, `npm run preview`.
