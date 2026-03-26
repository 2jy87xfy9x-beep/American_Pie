# Investigation: V2 Changes Not Visible in Browser

**Date:** 2026-03-26
**Trigger:** User reports V2 article changes still not visible on GitHub Pages after bug fix commit `db5c5d0`
**Screenshot context:** Edge browser, `https://2jy87xfy9x-beep.github.io/American_Pie/`, approximately 19:26 UTC (3:26 PM ET), showing encyclopedia home scrolled to "IN THE NEWS — JANUARY 2008" section

---

## What Was Investigated

### 1. Local working tree — data.js

`grep` on disk confirms V2 content is present:

- `BRIEF` at lines 973 and 1019 (two blocks within emergency-fund article)
- `title: Emergency Fund Levels Below 30 Days for Half of US Households` at line 960
- `sections: 5` at line 964
- `voice: WSJ Analysis` at line 965
- `ticker_state: calm` at line 967

Working tree is clean. Local and remote are at the same commit (`c286035`).

### 2. GitHub Pages deployment status

All recent deployments succeeded. Timeline (UTC):

| Commit | Deployed at | Content |
|---|---|---|
| `db5c5d0` | 19:08:11 | Fix: featured title + cache-bust v=6→v=7 |
| `c286035` | 19:15:56 | Docs only (no code change) |

Screenshot taken at ~19:26 UTC — both deployments were complete before the screenshot.

### 3. Live site — data.js fetched from GitHub Pages CDN

WebFetch of `https://2jy87xfy9x-beep.github.io/American_Pie/data.js` confirmed:

- `BRIEF` present (3 occurrences — 2 block markers + 1 in sidebar placeholder text)
- Emergency-fund title: `Emergency Fund Levels Below 30 Days for Half of US Households`
- `sections: 5`
- `voice: WSJ Analysis`

**The CDN is serving the correct V2 data.js.** The root cause is not a stale deployment.

### 4. index.html — featured article title

V2 title is hardcoded in two places:

- Line 149 (newspaper featured block): `id="np-featured-link"`
- Line 173 (encyclopedia featured block): `id="featured-article-link"`

Both set to: `Emergency Fund Levels Below 30 Days for Half of US Households`

Cache-bust at `v=7` on all asset URLs (`style.css?v=7`, `data.js?v=7`, `app.js?v=7`).

### 5. app.js — dynamic title and BRIEF rendering

`renderHome()` (line 1998) reads the featured article title from `data.js` frontmatter at runtime. Fallback is also the correct V2 string. Either path produces the right title.

BRIEF block rendering in `renderSectionHtml()` (lines 1572–1602):

- Regex `^BRIEF\n([\s\S]*?)(?=\n\n|\n##)` extracts block body up to the next blank line
- Block is converted to `<div class="image-brief">…</div>` HTML
- Logic is present and structurally correct

---

## Findings

### The code is correct everywhere it can be verified

data.js on disk, data.js on CDN, index.html, and app.js all contain the correct V2 content. The deployment is live. There is no missing commit, no incorrect data, and no failed deployment.

### Three factors explain why the user may not see V2 content despite correct code

---

**Finding 1 — Browser cache (highest probability)**

The `db5c5d0` cache-bust bump (v=6 → v=7) requires that the browser fetch a *fresh* copy of `index.html` before the new asset URLs take effect. If Edge has a cached copy of `index.html` from the v=6 era (deployed at 18:13 UTC in commit `b906fdf`), it will request `data.js?v=6` and `app.js?v=6` — the old files — regardless of what is now on the server.

GitHub Pages serves HTML with `Cache-Control: max-age=600` (10 minutes). If the user visited the page within 10 minutes of the v=6 deployment (between 18:13 and ~18:23 UTC), Edge would have cached that `index.html` for 10 minutes. A normal reload (F5) within that window may honor the cache. After expiry, the next load would fetch fresh HTML.

However, Edge also maintains a disk cache that can persist beyond `max-age` depending on heuristic caching and user settings. A **hard refresh** (`Ctrl+Shift+R`) is required to guarantee the browser fetches fresh HTML and therefore the v=7 asset URLs.

---

**Finding 2 — CDN propagation timing (possible contributing factor)**

The screenshot was taken approximately 11 minutes after the `c286035` deployment (19:15:56 UTC). GitHub Pages uses Fastly CDN. While most edge nodes propagate within minutes, some nodes may lag 10–15 minutes for low-traffic origins. At 19:26 UTC, propagation was likely complete but not guaranteed for all edge nodes, depending on which Fastly node Edge's request was routed to.

This is a narrow window and unlikely to still be a factor at the time the user reports the issue, but it is a contributing factor for the timing of the screenshot specifically.

---

**Finding 3 — V2 content is not visible in the screenshot's viewport (structural)**

The screenshot shows the encyclopedia home page scrolled to the "IN THE NEWS — JANUARY 2008" and "DID YOU KNOW?" columns. The featured article block — which contains the V2 title "Emergency Fund Levels Below 30 Days for Half of US Households" — is **above** this section and not visible in the screenshot.

BRIEF blocks are inside the emergency-fund article itself, rendered section by section as the user navigates. They are not displayed on the home page. The user would need to:

1. Scroll up to the top of the page to see the featured article title
2. Click "Read full article →" and advance through sections to reach BRIEF blocks in sections 1 and 4

It is possible the user is not seeing V2 changes because they have not navigated to the specific views where V2 content renders, not because the content is absent.

---

## Summary Table

| Check | Result |
|---|---|
| data.js on disk — V2 content | ✓ Present |
| data.js on GitHub Pages CDN | ✓ V2 confirmed via live fetch |
| GitHub Pages deployment | ✓ Successful, 11 min before screenshot |
| index.html — V2 featured title hardcoded | ✓ Lines 149, 173 |
| app.js — dynamic title fallback | ✓ Correct V2 string |
| app.js — BRIEF rendering logic | ✓ Present, structurally correct |
| Cache-bust version | ✓ v=7 on all assets |
| Edge hard refresh performed | Unknown — not confirmed |

---

## Recommended Actions to Confirm or Close

1. **Hard refresh in Edge** (`Ctrl+Shift+R`) to bypass any cached `index.html` with v=6 asset URLs. If V2 content appears after this, Finding 1 is confirmed as root cause.

2. **Scroll to top of page** to verify the featured article block shows the V2 title.

3. **Open the emergency-fund article** ("Read full article →") and advance through sections to confirm BRIEF blocks render visually.

If all three steps show correct V2 content, the issue was browser cache + scroll position, not a code or deployment defect.

---

**Status:** Open — awaiting user verification steps above
