# American Pie — Implementation Report

**Reference:** Design specification v1.0 (`docs/american-pie-spec.md` / original PDF)  
**Project root:** `C:\iCloudDrive\american_pie`  
**Report date:** 25 March 2026

---

## 1. Executive summary

American Pie is implemented as a **static, file-backed** financial literacy simulator: one HTML entrypoint, shared CSS for two themes, and JavaScript that loads Markdown articles and JSON simulation data over HTTP. The **2008 simulation** and **Present** modes are wired with starter content. The build follows the spec’s phased plan through a **usable subset** of Phases 1–3 plus partial Phase 4 data—not the full 48-article 2008 manifest or complete Phase 5–6 behavior.

---

## 2. Delivered artifacts

| Artifact      | Purpose                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`  | Single-page shell: home, article, ghost profile, clarity, stub views; overlays (source, simulation complete); nav rail; ticker + pressure; theme switch |
| `style.css`   | `body.theme-encyclopedia` and `body.theme-newspaper`: tokens, typography, layout, ticker, gauge; no radius/shadows per spec principles   |
| `app.js`      | Routing, `fetch` loaders, frontmatter + `##` section parser, `{{variable}}` rendering, derived fields, margin editor, home/news/DYK, ghost tracks + ticker, clarity from local concept progress, nav after first completed article |

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
| **2 — Article engine** | `loadArticle`, sections, Next, breadcrumb, TOC                  | **Done** for core flow: fetch MD, split on `##`, one section at a time, TOC, Next, reveal for “If you had known”.                        |
| **3 — Variable system** | Read `variables.json`, inline edit, source view                | **Done with caveat:** JSON + **`localStorage`** overlay; no silent on-disk write (browser limitation).                                 |
| **4 — Simulation data** | Full 2008 content, 48 articles, playable arc                     | **Partial:** starter JSON + handful of articles; no full era sequencer or end-to-end playthrough.                                      |
| **5 — Living components** | Ticker cadence, gauge choreography, first-appearance rules       | **Partial:** ticker scrolls; stress drives gauge; narrative first-appearance rules not fully implemented.                                |
| **6 — Real app layer**  | Present home, demographic seeding, printables                    | **Partial:** Present mode and scaffolding; P1 demographic seeding and print CSS not fully implemented.                                    |

---

## 4. Technical architecture

- **Runtime:** Browser only; no build step; no server-side code.
- **Data loading:** Relative `fetch()` under `articles/` and `simulations/<2008|present>/`. **HTTP required** (e.g. `python -m http.server`); `file://` shows an in-app banner.
- **State:** In-memory `state` plus `localStorage` for variable overrides, first-article completion, concept scores, and “on this day” session selection.
- **Markdown:** Frontmatter (`---` … `---`), body split by `##`; `**bold**`; variables interpolated with control over escaping so inline editors render correctly.
- **Derived variables (JS):** `coverage_days`, `income_gap`, `covered_months_with_ui`; display helpers for money, percent, days.

---

## 5. Deviations and limitations

1. **File writes:** Spec targets writing `variables.json` in the synced folder. Static pages cannot silently update disk; **`localStorage`** persists edits until export or a future File System Access / helper approach.
2. **Article set:** Many manifest paths are **not** authored; missing articles will fail `fetch` until added.
3. **Simulation timeline:** Events exist for headlines/stress but **no full sequencer** for eras, final screen, or reset as in Phase 4/5 acceptance tests.
4. **Clarity score:** **Heuristic** from concepts completed—not a full formal rubric from the spec.
5. **Fonts:** Stack approximates spec (Libre/Playfair/Courier/IBM Plex Mono); may not match Wikipedia pixel-for-pixel.
6. **Dateline:** Shown prominently in **newspaper** theme; **hidden** in encyclopedia theme for a cleaner home.

---

## 6. Verification performed

- HTTP server smoke test: **`200`** for `articles/emergency-fund.md` and `simulations/2008/variables.json`.
- **`node --check app.js`** — syntax OK.

Systematic cross-browser QA, a11y audit, and full simulation playthrough were **not** run as part of this report.

---

## 7. Recommended next steps

1. **Persistence:** “Export `variables.json`” download and/or **File System Access** folder pick for spec-aligned writes.
2. **Phase 4:** Author remaining manifest articles; grow `events.json` and ghost logs; implement event index, era transitions, completion + reset.
3. **Phase 5:** Spec first-appearance rules for ticker and gauge; optional timed ticker refresh alongside CSS marquee.
4. **Phase 6:** Present home with **average/demographic placeholders** when fields are empty; `@media print` for worksheets.
5. **Hardening:** Missing-article handling, keyboard/back navigation for sections, short operator note on HTTP requirement if desired.

---

## 8. Conclusion

The repo delivers a **vertical slice**: themed shell, **Emergency Fund** and **Getting Started** flows, variable-driven copy, margin editing, ghost integration, and 2008/Present switching, consistent with the documented file layout. Gaps are **breadth of content**, **on-disk persistence**, and **full simulation lifecycle** (Phases 4–6).

---

*Draft suitable for internal tracking; update dates and verification sections as releases ship.*
