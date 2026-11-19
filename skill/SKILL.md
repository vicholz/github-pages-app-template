# Skill: GitHub Pages Client App

Use this skill when building or extending a browser-only app that will be hosted on GitHub Pages.

## Goal

Produce a self-contained, modern, client-side app that matches the style and reliability of existing pages apps (math-sheet-generator, simple_scheduler, ebook_converter, web-reader, brackettier, livestream_tools).

## Rules

1. **Import / export (when applicable)**  
   If the app holds user data or durable settings, provide import and export. Export should produce a clear JSON file of the current data (and settings if relevant). Import should support at least a full replace. Prefer a merge-by-id option when items have stable identifiers. Keep the UI obvious: dedicated buttons or a Data section.

2. **Share via URL (when applicable)**  
   Offer a share path that puts state into the query string.
   - For larger payloads use gzip + base64url in a single parameter (e.g. `?sheet=...`).
   - Let the user choose what is shared (data, config, or both) when both exist.
   - For lightweight settings, keep them in ordinary query parameters and update the URL automatically as the user changes them so the current view is always shareable/bookmarkable.
   - On load, prefer URL state over stored state when a share payload or relevant params are present.

3. **Technology choices**  
   - Use modern CSS3 (custom properties, grid/flex, transitions, and print styles when the output is printed).
   - Prefer vanilla JavaScript.
   - Add a free open-source library only when the task is genuinely complex (specialized parsers, heavy formats, etc.). Prefer libraries that work without a build step.
   - The main entry point must be `index.html` so GitHub Pages serves it from the repo root.

4. **Persistence**  
   Store data, configuration, and settings in browser storage (`localStorage` preferred; cookies only for tiny values). Version the schema. Normalize on load so older data continues to work. Autosave with a short debounce where the user expects changes to stick without an explicit save.

5. **Experience**  
   Make the app feel current: clear visual hierarchy, consistent spacing, restrained color, subtle transitions, and immediate feedback. Avoid full-page reloads for ordinary actions. Where output is printed, control columns, page breaks, and hide chrome.

6. **Tests**  
   Add tests for pure logic (normalization, encoding/decoding, generation, import/export helpers) when they can be run simply. A small Node test file or a browser test page is enough. Skip heavy frameworks for small apps.

7. **Structure**  
   Separate concerns. Put styles in `css/`, logic in `js/` modules (store, share, domain logic, UI). Keep files focused. Use clear names. Include `.nojekyll` at the repo root.

## Checklist before finishing

- [ ] `index.html` is the entry point and links external CSS/JS correctly
- [ ] State survives reload via `localStorage` (when the app has state)
- [ ] Import/export works for the intended payload (when applicable)
- [ ] Share link or auto-updated query params work and restore state (when applicable)
- [ ] Print layout is correct if the app produces printable output
- [ ] No build step is required to run the app
- [ ] `.nojekyll` is present
- [ ] Short commit version hash is shown when the GitHub API is reachable

## Reference patterns

- **Storage:** versioned key + `loadState` / `saveState` / `normalizeState` (see simple_scheduler `js/store.js`)
- **Share:** `CompressionStream`/`DecompressionStream` + base64url (see math-sheet-generator)
- **Layout:** atmospheric dark theme, Fraunces + Figtree, sticky controls, print media queries that force multi-column grids
- **Modules:** one file per concern (`store.js`, `share.js`, domain modules, thin `app.js`)

## Version hash

When possible, show a short commit hash on the page so the running version is visible.

- Fetch `https://api.github.com/repos/<owner>/<repo>/commits/main` (or the default branch).
- Display the first 7 characters as a link to `https://github.com/<owner>/<repo>/commit/<sha>`.
- Place it near the title or brand. Hide it until the fetch succeeds, and hide it in print.
- Do not block app startup on this request. Ignore failures.

```js
const APP_REPO = "owner/repo";

function loadAppVersion() {
  fetch("https://api.github.com/repos/" + APP_REPO + "/commits/main")
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .then((commit) => {
      if (!commit.sha) return;
      const el = document.getElementById("app-version");
      if (!el) return;
      el.replaceChildren();
      el.append("Version ");
      const a = document.createElement("a");
      a.href = "https://github.com/" + APP_REPO + "/commit/" + commit.sha;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = commit.sha.slice(0, 7);
      el.appendChild(a);
      el.hidden = false;
    })
    .catch(() => {});
}
```

HTML: `<p class="app-version" id="app-version" hidden></p>`

