# American Pie — Implementation Report

**Reference:** Design specification v1.0 (`docs/american-pie-spec.md` / original PDF)  
**Project root:** `C:\iCloudDrive\american_pie`  
**Report date:** 25 March 2026  
**Last updated:** 2026-03-25T14:47:26-04:00

---

## 1. Executive summary

American Pie is implemented as a **static, file-backed** financial literacy simulator: one HTML entrypoint, shared CSS for two themes, and JavaScript that reads Markdown articles and JSON simulation data from a **bundled `data.js` module** (generated from the same `.md` / `.json` sources in the repo). The **2008 simulation** and **Present** modes are wired with starter content. The build follows the spec’s phased plan through a **usable subset** of Phases 1–3 plus partial Phase 4 data—not the full 48-article 2008 manifest or complete Phase 5–6 behavior.

**Update (2026-03-25T14:47:26-04:00):** Runtime `fetch()` for local content was removed. Content ships in `data.js` so **opening `index.html` via `file://`** (double-click on Windows, Files → iCloud Drive on iOS Safari) works with **no HTTP server**, matching spec §1 and Phase 1 test criteria. Operators edit source `.md` / `.json` files as before and run `node build.js` to regenerate `data.js`; the generated file is checked in so devices can sync a pre-built bundle via iCloud without running Node.

---

## 2. Delivered artifacts

| Artifact      | Purpose                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`  | Single-page shell: home, article, ghost profile, clarity, stub views; overlays (source, simulation complete); nav rail; ticker + pressure; theme switch |
| `style.css`   | `body.theme-encyclopedia` and `body.theme-newspaper`: tokens, typography, layout, ticker, gauge; no radius/shadows per spec principles   |
| `app.js`      | ES module: routing, synchronous lookups in `data`, frontmatter + `##` section parser, `{{variable}}` rendering, derived fields, margin editor, home/news/DYK, ghost tracks + ticker, clarity from local concept progress, nav after first completed article |
| `build.js`    | Node (built-ins only): scans `articles/`, `simulations/`, `worksheets/`, `sources/`; writes `data.js`. **Run:** `node build.js` after any content edit. |
| `data.js`     | Generated `export const data = { articles, simulations, worksheets, sources }` — checked in for offline / `file://` use. |

**Content & data**

- **Articles:** `emergency-fund.md` (full spec example), `present/getting-started.md`, `_template.md`, plus short stubs: `burn-rate`, `bear-stearns`, `federal-reserve`, `unemployment-insurance`, `inflation`, `bull-market`.
- **2008:** `simulations/2008/variables.json`, `events.json`, `did-you-know.json`, `ghost-tracks.json`.
- **Present:** `simulations/present/variables.json`, `events.json`, `did-you-know.json`, `ghost-tracks.json`, `watch-list.json`.
- **Worksheets / sources:** `worksheets/*.md`, `sources/where-to-find-things.md`.

---

## 3. Status vs implementation plan

| Phase                | Spec goal                                                         | Status                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **1 — Static shell** | Full visual shell, both themes, all screens exist                 | **Largely done.** Some mobile / layout details simplified vs spec.                                                                      |
| **2 — Article engine** | `loadArticle`, sections, Next, breadcrumb, TOC                  | **Done** for core flow: load MD from `data.articles`, split on `##`, one section at a time, TOC, Next, reveal for “If you had known”.                        |
| **3 — Variable system** | Read `variables.json`, inline edit, source view                | **Done with caveat:** JSON + **`localStorage`** overlay; no silent on-disk write (browser limitation).                                 |
| **4 — Simulation data** | Full 2008 content, 48 articles, playable arc                     | **Partial:** starter JSON + handful of articles; no full era sequencer or end-to-end playthrough.                                      |
| **5 — Living components** | Ticker cadence, gauge choreography, first-appearance rules       | **Partial:** ticker scrolls; stress drives gauge; narrative first-appearance rules not fully implemented.                                |
| **6 — Real app layer**  | Present home, demographic seeding, printables                    | **Partial:** Present mode and scaffolding; P1 demographic seeding and print CSS not fully implemented.                                    |

---

## 4. Technical architecture

- **Runtime:** Browser only; **no database, no accounts, no server** for reading app content.
- **Content build:** `node build.js` (Node built-ins only, no `package.json`) aggregates all `articles/**/*.md`, `simulations/**/*.json`, `worksheets/*.md`, and `sources/*.md` into **`data.js`**. Markdown values are template-literal strings (escaped); JSON is embedded as parsed objects via `JSON.stringify`.
- **Data loading:** `app.js` is an ES module that **`import { data } from './data.js'`** and looks up `data.articles[key]`, `data.simulations['2008/variables']`, etc. No `fetch()` for bundled content; **`file://` is supported** (e.g. iOS Safari 16+ from Files / iCloud Drive).
- **State:** In-memory `state` plus `localStorage` for variable overrides, first-article completion, concept scores, and “on this day” session selection.
- **Markdown:** Frontmatter (`---` … `---`), body split by `##`; `**bold**`; variables interpolated with control over escaping so inline editors render correctly.
- **Derived variables (JS):** `coverage_days`, `income_gap`, `covered_months_with_ui`; display helpers for money, percent, days.

---

## 5. Deviations and limitations

1. **File writes:** Spec targets writing `variables.json` in the synced folder. Static pages cannot silently update disk; **`localStorage`** persists edits until export or a future File System Access / helper approach.
2. **Article set:** Many manifest paths are **not** authored; missing articles show the **stub / “no data yet”** path instead of a network error.
3. **Simulation timeline:** Events exist for headlines/stress but **no full sequencer** for eras, final screen, or reset as in Phase 4/5 acceptance tests.
4. **Clarity score:** **Heuristic** from concepts completed—not a full formal rubric from the spec.
5. **Fonts:** Stack approximates spec (Libre/Playfair/Courier/IBM Plex Mono); may not match Wikipedia pixel-for-pixel.
6. **Dateline:** Shown prominently in **newspaper** theme; **hidden** in encyclopedia theme for a cleaner home.
7. **Content workflow:** After editing any tracked `.md` or `.json` source, run **`node build.js`** and let iCloud sync the updated **`data.js`** (or rely on a pre-built `data.js` already in the folder).

---

## 6. Verification performed

**Previous (pre-bundle):**

- HTTP server smoke test: **`200`** for `articles/emergency-fund.md` and `simulations/2008/variables.json`.
- **`node --check app.js`** — syntax OK.

**Current (2026-03-25T14:47:26-04:00):**

- **`node --check build.js`** — passes.
- **`node build.js`** — completes without errors; **`data.js`** generated.
- **`import('./data.js')` in Node** — module loads; article and simulation key counts match source tree.
- **App loading:** Open **`index.html` directly** (no `python -m http.server`); ES module graph (`data.js` + `app.js`) is intended to run from **`file://`** per project requirements. Re-verify in target browsers (Windows + iOS Safari) after any change to script loading.

Systematic cross-browser QA, full iOS Files/`file://` device pass, and full simulation playthrough were **not** re-run for this report revision.

---

## 7. Recommended next steps

1. **Persistence:** “Export `variables.json`” download and/or **File System Access** folder pick for spec-aligned writes.
2. **Phase 4:** Author remaining manifest articles; grow `events.json` and ghost logs; implement event index, era transitions, completion + reset.
3. **Phase 5:** Spec first-appearance rules for ticker and gauge; optional timed ticker refresh alongside CSS marquee.
4. **Phase 6:** Present home with **average/demographic placeholders** when fields are empty; `@media print` for worksheets.
5. **Hardening:** Keyboard/back navigation for sections; optional README for operators (open `index.html` + rebuild `data.js`).

---

## 8. Conclusion

The repo delivers a **vertical slice**: themed shell, **Emergency Fund** and **Getting Started** flows, variable-driven copy, margin editing, ghost integration, and 2008/Present switching, consistent with the documented file layout. **Bundled `data.js`** aligns the implementation with **no-server, folder-of-files** operation on disk and over iCloud sync. Gaps remain **breadth of content**, **on-disk persistence**, and **full simulation lifecycle** (Phases 4–6).

---

*Draft suitable for internal tracking; update dates and verification sections as releases ship.*
