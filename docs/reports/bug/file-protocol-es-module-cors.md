# Bug Report: App Does Not Load When Opened via file://

**Date:** 2026-03-25
**Status:** Fixed
**Severity:** High — app completely non-functional for anyone opening index.html directly from file explorer

---

## Summary

Opening `index.html` by double-clicking in File Explorer caused the app to render as static HTML only. No JavaScript executed, leaving the page in its default hardcoded state: empty "In the news" and "Did you know?" lists, "Early 2008" placeholder text, and the pressure gauge visible (normally hidden by JS on load).

The same files served over HTTP (localhost) worked correctly.

---

## Root Cause

`app.js` and `data.js` were loaded as ES modules (`<script type="module">`). Chromium-based browsers (Edge, Chrome) treat every `file://` URL as a **unique null security origin**. When `app.js` attempted to `import { data } from "./data.js"`, the browser rejected it as a cross-origin request:

```
Access to script at 'file:///C:/iCloudDrive/american_pie/data.js' from origin 'null'
has been blocked by CORS policy: Cross origin requests are only supported for
protocol schemes: chrome-extension, chrome-untrusted, data, edge, http, https,
isolated-app.
```

```
'file:' URLs are treated as unique security origins.
```

Both `data.js` and `app.js` failed to load. The page rendered its static HTML shell with no dynamic content.

This affected all users opening the file directly — including InPrivate windows (ruling out caching as a cause).

---

## Symptoms

- "In the news" and "Did you know?" sections empty
- Title reads "In the news — Early 2008" (hardcoded HTML default, never updated by JS)
- Pressure gauge visible at bottom (JS normally initializes and manages its display)
- No navigation, no articles, no simulation functionality

---

## Fix

Removed ES module syntax. Three files changed:

1. **`index.html`** — removed `type="module"` from both script tags
2. **`app.js`** — removed `import { data } from "./data.js"` (top-level import)
3. **`build.js`** — changed `export const data = {` to `var data = {` so the generated `data.js` declares a global variable instead of an ES module export

After running `node build.js`, the app loads correctly on both `file://` and `http://`.

---

## Notes

- The HTTP server (localhost:5174) was unaffected because `http://` origins are not subject to this restriction.
- Hard refresh (Ctrl+Shift+R) alone does not fix this — the error is a security policy, not a cache issue.
- This fix also improves mobile compatibility, where `file://` access to local JS modules has the same restriction.
