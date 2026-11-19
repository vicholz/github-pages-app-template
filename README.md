# GitHub Pages App Template

Template and guidelines for building modern, client-side GitHub Pages apps.

Derived from patterns in:
- [math-sheet-generator](https://vicholz.github.io/math-sheet-generator/)
- [simple_scheduler](https://vicholz.github.io/simple_scheduler/)
- [ebook_converter](https://vicholz.github.io/ebook_converter/)
- [web-reader](https://vicholz.github.io/web-reader/)
- [brackettier](https://vicholz.github.io/brackettier/)
- [livestream_tools](https://vicholz.github.io/livestream_tools/)

**Live host:** `https://vicholz.github.io/`

## What this is for

Self-contained browser apps that:
- Run entirely on the client (no server required)
- Use vanilla HTML, CSS, and JavaScript (with optional free open-source libraries only when complexity justifies them)
- Persist data and settings in the browser
- Support sharing and import/export where useful
- Look modern and feel responsive

## Quick start

1. Use this repo as a template (or copy the structure).
2. Replace `index.html`, styles, and scripts with your app.
3. Enable GitHub Pages (Settings → Pages → Deploy from branch `main` / root).
4. The site will be available at `https://vicholz.github.io/<repo>/` (or `https://<user>.github.io/<repo>/`).

```bash
# Local preview
python3 -m http.server 8080
```

## Project layout

```
index.html          # Entry point (required for GitHub Pages)
css/                # or styles.css
  style.css
js/
  app.js            # Main app logic
  store.js          # localStorage + state normalization
  share.js          # Optional: compressed query-string sharing
  ...               # Feature modules as needed
examples/           # Minimal runnable examples
skill/SKILL.md      # Agent/developer skill with rules
tests/              # Optional runnable tests
.nojekyll           # Disable Jekyll processing
```

## Core conventions

### 1. Import / export (when the app has durable data)
Provide clear controls to export current data (and optionally settings) as JSON and to import it back. Support at least a replace mode; add a merge-by-id mode when records have stable identifiers.

### 2. Sharing via URL
When sharing is useful:
- Prefer compressed base64 (gzip + base64url) in a query parameter for larger payloads.
- Allow sharing data, config, or both.
- Alternatively (or additionally) keep lightweight state in ordinary query parameters and update the URL as the user changes settings so the page is bookmarkable/shareable without a separate button.

### 3. Technology
- Modern CSS3 (custom properties, grid/flex, transitions, print styles when relevant).
- Vanilla JavaScript by default.
- Pull in a free, open-source library only when the problem is complex enough to justify it (e.g. heavy parsing, specialized formats). Document the dependency and prefer one that works without a build step when possible.
- `index.html` is the main entry point.

### 4. Persistence
Store data, configuration, and settings in `localStorage` (or cookies only when needed for very small values). Version the stored schema and normalize on load so older data remains usable.

### 5. Experience
- Autosave where it makes sense (debounce writes to storage).
- Modern visual design with a clear hierarchy, consistent spacing, and subtle transitions.
- Keep interactions snappy; avoid unnecessary reloads.

### 6. Tests
Add tests for pure logic (generation, normalization, encoding/decoding, import/export) when they can be run simply (Node, a small test runner, or a browser test page). Do not force a heavy test infrastructure on tiny apps.

### 7. Code organization
Use standard practices: separate concerns into files and folders, keep modules focused, prefer clear names over clever ones, and avoid large monolithic scripts when the app grows.

## Design notes

Look at the referenced apps for visual and interaction patterns:
- Dark, atmospheric backgrounds with restrained accents
- Display + body font pairing (e.g. Fraunces + Figtree)
- Glass-style panels, clear primary/secondary actions
- Print-friendly layouts when the output is meant to be printed (two-column grids, page-break control)

## Enabling Pages

1. Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `/(root)`
4. Save

Live URL pattern: `https://vicholz.github.io/<repo>/`

## License

MIT. Adapt as needed for your app.
