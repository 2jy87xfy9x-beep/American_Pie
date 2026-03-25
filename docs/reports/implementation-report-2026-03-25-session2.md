# American Pie — Implementation Report (Session 2)
**Date:** 2026-03-25
**Session goal:** Fix remaining UI defects — app felt incomplete per user screenshot

---

## Summary

Five defects were fixed and one rendering bug was corrected. All changes are in `app.js`, `style.css`, and `simulations/2008/ghost-tracks.json`. `data.js` was rebuilt.

---

## Changes Made

### 1. "In the news" — era date label and item count

**Problem:** The home page news column showed "Era 1" as its heading and only 3 items (era 1 has only 3 events).

**Fix:** Added `eraDateLabel(era)` to derive a human-readable date from the first event in that era, and `getHomeNewsEvents()` to collect up to 7 items spanning consecutive eras. The heading now reads "In the news — January 2008".

**Files:** `app.js` — `eraDateLabel()`, `getHomeNewsEvents()`, `renderHome()`

---

### 2. Article connection links — clickable

**Problem:** `→ **Article Name**` patterns at the end of article sections rendered as bold text, not as tappable links.

**Fix:** Extended `mdInlineToHtml()` with a post-pass that detects `<p>→ <strong>Name</strong>`, derives the slug, checks `MANIFEST_SLUGS`, and rewrites as `<a class="concept-link" data-slug="...">`. Click handlers wired in `renderArticleSection()`.

**Files:** `app.js` — `mdInlineToHtml()`, `renderArticleSection()`
**CSS:** `.concept-link-para` left-border accent

---

### 3. Ghost tracks — full simulation arc

**Problem:** `ghost-tracks.json` had only 2 log entries per track (January and March 2008), giving the ghost profile view almost no content.

**Fix:** Rewrote with 11 entries per track spanning all 9 eras (January 2008 → 2026). Each entry has `cash`, `net_worth`, `coverage_days`, `credit_card_debt`, `monthly_burn`, `action`, and `thinking`. Final 2026 net worth by track:

| Track | Net Worth |
|---|---|
| winner | ~$341,000 |
| weatherer | ~$84,000 |
| unaware | ~$12,000 |
| gambler_lost | ~−$41,000 |
| gambler_won | ~$1,190,000 |

**Files:** `simulations/2008/ghost-tracks.json`

---

### 4. Ghost profile view — financial stats display

**Problem:** `openGhostFull()` rendered only `entry.action` text. Net worth, cash, coverage, and credit card debt were present in the data but never shown.

**Fix:** Added a stats line (`NW · Cash · days coverage · CC debt`) and an italicized "thinking" quote block per entry.

**Files:** `app.js` — `openGhostFull()`
**CSS:** `.ghost-entry-stats`, `.ghost-entry-thinking`, `.ghost-entry-body`

---

### 5. Variable substitution inside bold markers

**Problem:** `**{{coverage_days}} days**` was split at `{{...}}` before bold processing, leaving visible `**` markers in rendered text ("Your estimated coverage: ** 100 days days**").

**Fix:** Rewrote `renderSectionHtml()` to substitute all `{{var}}` occurrences with null-byte-delimited placeholders first, run `mdInlineToHtml()` on the full text (so `**...**` markers resolve correctly), then swap placeholders back with their var-span HTML.

**Files:** `app.js` — `renderSectionHtml()`

---

## Files modified

| File | Nature of change |
|---|---|
| `app.js` | `eraDateLabel`, `getHomeNewsEvents`, `renderHome`, `mdInlineToHtml`, `renderArticleSection`, `openGhostFull`, `renderSectionHtml` |
| `style.css` | `.ghost-entry-stats`, `.ghost-entry-thinking`, `.ghost-entry-body`, `.concept-link-para` |
| `simulations/2008/ghost-tracks.json` | Full rewrite — 11 entries × 5 tracks |
| `data.js` | Rebuilt — 151,215 bytes |
| `.claude/launch.json` | Created — Python HTTP server on port 5174 |

---

*End of report.*
