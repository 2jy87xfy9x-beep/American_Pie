# Implementation Report — V2 Redesign (feature/v2-redesign)
Date: 2026-03-26
Branch: feature/v2-redesign → merged to main
Commits: 3b7aa0f · 3a5cf00 · 9aaaf40

---

## Overview

Three-session implementation of the V2 specification, guided by Directors Bible v2 and v2.1. Work covered a full UI redesign, article architecture enforcement, and two rounds of bug fixes targeting layout scroll and image placeholder rendering.

---

## Pass 2 — UI Redesign (3b7aa0f)

### style.css
- Encyclopedia theme: Wikipedia-spec colors, sidebar widths, typography scale
- Newspaper theme: 1950s broadsheet masthead, column rules, serif display
- Ticker bar: fixed bottom, 30px height, calm/elevated/crisis/chaotic/still era states
- Right margin: 190px reserved for future sidebar/annotation layer
- Read In controls (Encyclopedia / Newspaper toggle) moved into ticker bar
- Source toggle: dimmed state when source view is off
- Pressure gauge: removed from spec; not implemented
- Home scroll: `overflow-y: auto` scoped to home view only; article view locked

### app.js
- Era-aware ticker: `ticker_state` frontmatter field drives content class
- `calm` state: single-line market data headlines, measured tempo
- `elevated` / `crisis` / `chaotic` states: progressively shorter bursts, interruption patterns
- `still` state: single-fact residue
- See Also mechanic: replaces Ghost Tracks sidebar; renders related article slugs as cross-links in article sidebar
- Nav rail: removed; replaced by sidebar TOC (`IN THIS ARTICLE`) generated from `## heading` markers
- Home rendering: encyclopedia and newspaper markup generated from era data, era-gated

### index.html
- V2 DOM structure: `np-masthead` + `layout-body` (sidebar + main-column + right-rail)
- Body class system: `view-home-active` / `view-article-active` controls which panels render
- Cache-bust params added to all static assets

### data.js — emergency-fund article (first rewrite)
- Removed instructional voice ("Your Next Step", reader address)
- Rewritten to WSJ Analysis voice: consequence-first, no vars on screen 1
- Six screens → five movements matching Bible architecture (Hook / Mechanics / Scale / What People Did / Residue)
- Ghost track archetype: Federal Reserve Survey of Consumer Finances household used anonymously as statistic source
- Reveal block: `▸ What the households that preserved the most capital in the eighteen months following January 2008 had in common`

---

## Directors Bible v2.1 Update (3a5cf00)

- Fixed six-screen article structure retired; variable-length movement guidance adopted
- Layered canvas navigation documented: screens are discrete pages, not scroll positions
- Section editing workflows codified: in-article variable editing via `var-field` inputs
- Anti-drift checklist updated with new nav and editing standards

---

## Pass 3 — Bug Fixes (9aaaf40)

### Problem 1: Page-level scroll not blocked in Edge

**Root cause**: `overflow: hidden` was applied to `body` but not to `html`. Edge renders a scrollbar when `html` has default overflow even if `body` is hidden.

**Fix** (style.css):
```css
html {
  height: 100%;
  overflow: hidden; /* block page-level scroll at root */
}
```

**Verification**: `document.documentElement.scrollHeight === document.documentElement.clientHeight` → confirmed 900px = 900px; no overflow.

---

### Problem 2: BRIEF image placeholder blocks not rendering

**Root cause (two-part)**:

**Part A** — No BRIEF content in data.js
The BRIEF block parser in app.js was built but no article had `BRIEF\n...` blocks. Parser was exercised against empty data.

**Part B** — Regex `$` with `gm` flags matched end-of-line, not end-of-string
The regex `/^BRIEF\n([\s\S]*?)(?=\n\n|\n##|$)/gm` with the `m` (multiline) flag changes `$` to match end-of-line. The non-greedy `[\s\S]*?` stopped at the first `$` match (end of the first BRIEF content line), capturing only one line instead of the full block.

**Fix** (app.js):
```js
// Before (broken):
rawText.replace(/^BRIEF\n([\s\S]*?)(?=\n\n|\n##|$)/gm, ...)

// After (correct):
rawText.replace(/^BRIEF\n([\s\S]*?)(?=\n\n|\n##)/gm, ...)
```
Removing `|$` means the regex only stops at a blank line or heading — always present after a BRIEF block in practice.

**Content added** (data.js) — emergency-fund article:

Screen 1 BRIEF:
```
BRIEF
Type: Documentary photograph
Subject: A kitchen table covered with bank statements, checkbook registers,
  a yellow notepad with handwritten calculations — no faces visible
Era: Late 2007, suburban American household
Tone: Quiet dread; the stillness before awareness
Technical: Shallow depth of field, warm tungsten interior light, slightly underexposed
Source: Wire archive, AP or Reuters lifestyle assignment; alternatively, commission original
What not to show: Computers, cell phones, poverty signifiers, dramatic emotion
```

Screen 4 BRIEF:
```
BRIEF
Type: Data visualization / infographic placeholder
Subject: Bar chart showing liquid savings depletion curves — two lines:
  households that calculated burn rate in week one vs. those that did not
Era: 2008–2009 Federal Reserve longitudinal data
Tone: Clinical, analytical — no decoration
Technical: Black and white, newspaper-reproduction quality, clear axis labels
Source: Produce original from Federal Reserve Survey of Consumer Finances 2009
What not to show: Color, 3D effects, stock photo of worried person
```

**Verification**: `document.querySelectorAll('.image-brief').length` → 1 (screen 1 loaded); BRIEF box floated right at 38% width, monospace font, bordered frame.

---

## Cache-Bust History

| Version | Changed |
|---------|---------|
| v=1 | Initial V2 build |
| v=2 | First CSS/JS fixes |
| v=3 | Article rewrite, BRIEF parser added |
| v=4 | html overflow fix, BRIEF content added |
| v=5 | BRIEF regex fix (final) |

---

## Deployment

- Remote: `git@github.com:2jy87xfy9x-beep/American_Pie.git`
- Branch: `main`
- GitHub Pages: `https://2jy87xfy9x-beep.github.io/American_Pie/`
- Build type: legacy (deploy from branch root)
