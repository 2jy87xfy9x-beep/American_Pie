<a id="top"></a>

# American Pie
## Design Specification & Implementation Plan

**Version 1.0 — March 2026**

*A personal financial literacy simulator. Local. Private. Yours.*

*Source PDF: [`american-pie-spec.pdf`](american-pie-spec.pdf)*

---

## Table of contents

**Jump to section**

| | |
| --- | --- |
| [1. Project Overview](#1-project-overview) | [2. Guiding Principles](#2-guiding-principles) |
| [3. File Structure](#3-file-structure) | [4. Data Architecture](#4-data-architecture) |
| [5. Themes](#5-themes) | [6. Screen Specifications](#6-screen-specifications) |
| [7. Core Components](#7-core-components) | [8. The Five Ghost Tracks](#8-the-five-ghost-tracks) |
| [9. Simulation Arc — 2008 to 2026](#9-simulation-arc--2008-to-2026) | [10. Full Article Manifest](#10-full-article-manifest--2008-simulation) |
| [11. Variable Manifest](#11-variable-manifest) | [12. Real App Translation Map](#12-real-app-translation-map) |
| [13. Implementation Plan](#13-implementation-plan) | [14. iCloud Sync Setup](#14-icloud-sync-setup) |
| [15. First Article — Complete Example](#15-first-article--complete-authored-example) | |

**§6 Screens**

- [6.1 Home Page](#61-home-page) · [6.2 Article View](#62-article-view) · [6.3 Ghost Track Full View](#63-ghost-track-full-view) · [6.4 Clarity Score](#64-clarity-score) · [6.5 Navigation Shell](#65-navigation-shell)

**§7 Components**

- [7.1 Ticker Bar](#71-ticker-bar) · [7.2 Pressure Gauge](#72-pressure-gauge) · [7.3 Ghost Tracks Margin Panel](#73-ghost-tracks-margin-panel) · [7.4 Inline Variable Editor](#74-inline-variable-editor) · [7.5 Source View](#75-source-view)

**§9 Simulation eras**

- [Era 1](#era-1) · [Era 2](#era-2) · [Era 3](#era-3) · [Era 4](#era-4) · [Era 5](#era-5) · [Era 6](#era-6) · [Era 7](#era-7) · [Era 8](#era-8) · [Era 9](#era-9)

**§13 Phases**

- [Phase 1](#phase-1) · [Phase 2](#phase-2) · [Phase 3](#phase-3) · [Phase 4](#phase-4) · [Phase 5](#phase-5) · [Phase 6](#phase-6)

---

<a id="1-project-overview"></a>

## 1. Project Overview

American Pie is a personal financial literacy simulator. It is not a product. It is not for market. It has one user: you.

The goal is not to build a finance app. The goal is for you to become financially literate and confident. The app is the mechanism. The knowledge is the outcome.

### What it is

A Wikipedia-style reading experience that slowly becomes a financial simulator without announcing the transition. Articles are static until they are not. Components that look like illustrations come alive as you read. The app is always pulling you forward without ever pushing you through a wall of information.

### Two modes

| Mode | What it is | Status |
| --- | --- | --- |
| **Simulation** | Historical financial periods with mock data. The game. | Built first. |
| **Real App** | Your actual financial life with your real numbers. | Shell exists. One starter article authored. |

### The game

The game is building accurate simulations. You play pre-built historical simulations to learn the variables. Then you research and build your own simulations for years you lived through. Your accuracy score improves as your financial understanding deepens. You eventually build forward-looking simulations for the current year. The only way to get better at the game is to become financially literate.

### The device strategy

All data lives in a synced iCloud folder at `C:\iCloudDrive\american_pie`. The app reads and writes to this folder. Changes made on desktop appear on mobile and vice versa. No database. No server. No accounts. Just a folder of text files displayed beautifully.

[↑ Back to top](#top)

---

<a id="2-guiding-principles"></a>

## 2. Guiding Principles

These principles govern every design and implementation decision. When in doubt, return here.

<details>
<summary><strong>P1 — The app is never empty</strong></summary>

From the first second the app loads, it shows real information. Before any data is entered it uses average American demographic data for someone in your approximate situation. The moment you enter one real number, that number becomes the seed of everything personal.
</details>

<details>
<summary><strong>P2 — The illusion is complete</strong></summary>

Every section of the app exists visually from day one. Undeveloped sections look identical to developed ones. They navigate correctly. They load correctly. They simply have no data behind them yet. The app looks finished. It is being filled in from the inside.
</details>

<details>
<summary><strong>P3 — Nothing is announced</strong></summary>

Components do not introduce themselves. The ticker appears as an illustration before it is live. The pressure gauge appears as a decorative element before it moves. The navigation appears after the first article is read, not before. The app reveals itself through use, not through onboarding.
</details>

<details>
<summary><strong>P4 — The clickbait is the curriculum</strong></summary>

Every hook, headline, and “did you know” item is chosen because it teaches a specific concept. The article it leads to is the lesson. The user never knows they are following a curriculum. They believe they are following their curiosity.
</details>

<details>
<summary><strong>P5 — No automation replaces your understanding</strong></summary>

The app does not fetch data for you. It does not read your documents. It does not make decisions. It tells you what to look for, where to find it, how to store it, and what it means once you have it. The manual process is the education.
</details>

<details>
<summary><strong>P6 — The simulation never saves</strong></summary>

When a simulation reaches the present day it resets. No portfolio to export. No score to keep. The knowledge is the only thing that transfers. This removes the temptation to optimize the simulation instead of learning from it.
</details>

<details>
<summary><strong>P7 — Both themes maintain the serious illusion</strong></summary>

Neither theme looks like a web app. The Encyclopedia theme looks like Wikipedia. The Newspaper theme looks like a broadsheet. No rounded corners. No drop shadows. No buttons that look like buttons. The UI chrome is always invisible.
</details>

<details>
<summary><strong>P8 — The backend is always visible</strong></summary>

Source View is available on every screen. It shows exactly which file is powering what you see, what variables are in use, and how each calculation works. Learning the backend is not separate from using the app. It is the same activity.
</details>

[↑ Back to top](#top)

---

<a id="3-file-structure"></a>

## 3. File Structure

```
C:\iCloudDrive\american_pie\
│
├── index.html          ← The entire app. Open this in a browser.
├── style.css           ← All visual styles. Both themes live here.
├── app.js              ← All display and interaction logic.
│
├── articles\
│   ├── _template.md    ← Template for every new article.
│   ├── emergency-fund.md ← Fully authored. The starter article.
│   ├── burn-rate.md
│   ├── checking-vs-savings.md
│   ├── federal-reserve.md
│   ├── bear-stearns.md
│   ├── mortgage-backed-securities.md
│   ├── unemployment-insurance.md
│   ├── income-tax-basics.md
│   ├── capital-gains.md
│   ├── index-funds.md
│   ├── compound-interest.md
│   ├── roth-ira.md
│   ├── inflation.md
│   ├── interest-rates.md
│   ├── net-worth.md
│   ├── credit-score.md
│   ├── dollar-cost-averaging.md
│   ├── sp500.md
│   ├── stimulus.md
│   ├── quantitative-easing.md
│   ├── bull-market.md
│   ├── lifestyle-inflation.md
│   ├── tax-brackets.md
│   ├── wash-sale.md
│   ├── sequence-of-returns.md
│   ├── i-bonds.md
│   ├── crypto-basics.md
│   └── [present]\
│       └── getting-started.md ← The one authored real-app article.
│
├── simulations\
│   ├── 2008\
│   │   ├── variables.json      ← All historical data for 2008 simulation.
│   │   ├── events.json         ← Ordered event sequence for 2008.
│   │   ├── ghost-tracks.json   ← All five track logs for 2008.
│   │   └── did-you-know.json   ← All hooks for 2008 home page.
│   ├── 1999\
│   │   └── [placeholder files]
│   ├── 2020\
│   │   └── [placeholder files]
│   └── [present]\
│       ├── variables.json      ← Your real numbers. You fill this in.
│       ├── watch-list.json     ← What to monitor and how often.
│       └── did-you-know.json   ← Personal hooks from your real data.
│
├── worksheets\
│   ├── simulation-research.md  ← Printable variable research worksheet.
│   └── real-life-snapshot.md   ← Printable personal finance snapshot.
│
└── sources\
    ├── where-to-find-things.md ← Master reference for every data source.
    └── [year]\
        └── [variable-name].md  ← Your source notes per variable per year.
```

[↑ Back to top](#top)

---

<a id="4-data-architecture"></a>

## 4. Data Architecture

### Variables file

Every simulation has a `variables.json`. This is the single source of truth for all numbers in that simulation. The app reads from this file. The UI writes to this file. You can edit this file directly in any text editor.

```json
{
  "fed_funds_rate": {
    "value": 4.25,
    "unit": "percent",
    "confirmed": true,
    "source": "federalreserve.gov",
    "last_checked": "2008-01-22",
    "notes": "Fed cut 75bps in emergency session January 22"
  },
  "your_monthly_expenses": {
    "value": 2100,
    "unit": "dollars",
    "confirmed": true,
    "source": "mock data",
    "last_checked": "2008-01-01",
    "notes": "Rent 950, food 400, car 300, other 450"
  },
  "your_cash": {
    "value": 7000,
    "unit": "dollars",
    "confirmed": true,
    "source": "mock data",
    "last_checked": "2008-01-01",
    "notes": "Starting position"
  }
}
```

**Every field explained:**

| Field | What it means | Required |
| --- | --- | --- |
| `value` | The number | Yes |
| `unit` | percent, dollars, days, etc. | Yes |
| `confirmed` | Is this verified data or an estimate? | Yes |
| `source` | Where you got this number | Yes |
| `last_checked` | When you last verified it | Yes |
| `notes` | Anything useful you want to remember | No |

### Articles file

Every article is a `.md` file. Plain text. Readable without the app. Variables are referenced with double brackets.

```markdown
# Emergency Fund
An emergency fund is money set aside...
Your situation covers an estimated
**{{coverage_days}} days** of expenses.
This is calculated as:
{{your_cash}} ÷ {{your_monthly_expenses}} × 30
```

The app replaces `{{variable_name}}` with the value from `variables.json` before displaying.

### Events file

The simulation event sequence. Each event is one entry. The app displays them in order and waits for user engagement before advancing.

```json
[
  {
    "id": "2008-01",
    "date": "January 2008",
    "era": 1,
    "headline": "Fed cuts rates for the fourth time in six months",
    "ticker_text": "FED CUTS RATES 25BPS · FOURTH CUT IN SIX MONTHS",
    "track": "economy",
    "article": "federal-reserve",
    "variables_affected": ["fed_funds_rate"],
    "ghost_track_updates": {
      "winner": "Noticed savings account rate dropped. Moved to higher yield.",
      "weatherer": "Saw the news. Did not act.",
      "unaware": "Did not see the news.",
      "gambler_lost": "Increased short position in financials.",
      "gambler_won": "Increased short position in financials."
    }
  }
]
```

### Ghost tracks file

The full log for all five tracks across the entire simulation period.

```json
{
  "winner": {
    "color": "#2D6A4F",
    "label": "The Winner",
    "philosophy": "Smart, boring, consistent decisions made early.",
    "log": [
      {
        "date": "January 2008",
        "cash": 7000,
        "monthly_burn": 2100,
        "coverage_days": 100,
        "credit_card_debt": 0,
        "net_worth": 7000,
        "action": "Calculated monthly burn rate for first time.",
        "thinking": "I need to know exactly where I stand."
      }
    ]
  }
}
```

[↑ Back to top](#top)

---

<a id="5-themes"></a>

## 5. Themes

The theme is controlled by a single class on the `<body>` element: either `theme-encyclopedia` or `theme-newspaper`. Switching is one line of JavaScript. All styling cascades from this class.

### Theme 1 — Encyclopedia

<details>
<summary><strong>Typography</strong></summary>

| Role | Font | Notes |
| --- | --- | --- |
| Body text | Linux Libertine (Google Fonts) | Wikipedia’s actual font |
| Data & numbers | IBM Plex Mono | Monospace. Terminal feel. |
| Headers | Linux Libertine, larger | Hierarchy through size only |

</details>

<details>
<summary><strong>Color palette</strong></summary>

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#F8F9FA` | Page background. Wikipedia grey. |
| `--text` | `#202122` | Body text. Wikipedia ink. |
| `--link` | `#3366CC` | All links. Wikipedia blue. |
| `--border` | `#A2A9B1` | Rules and dividers. |
| `--data` | `#000000` | Numbers and data values. |
| `--winner` | `#2D6A4F` | Ghost track: Winner |
| `--weatherer` | `#1D3557` | Ghost track: Weatherer |
| `--unaware` | `#E9C46A` | Ghost track: Unaware |
| `--gambler-lost` | `#E63946` | Ghost track: Gambler Lost |
| `--gambler-won` | `#6A994E` | Ghost track: Gambler Won |

No other colors. No accent. No gradients. No shadows.
</details>

<details>
<summary><strong>Layout rules</strong></summary>

- No rounded corners anywhere. `border-radius: 0` on everything.
- No box shadows anywhere.
- No buttons that look like buttons. All interactive elements are text links or inline fields.
- Thin 1px borders only. Color `--border`.
- Two column: 65% content, 35% margin on desktop. Single column on mobile.
- Generous line height: 1.7 for body text.
- Compact line height: 1.3 for data values.
</details>

### Theme 2 — Newspaper

<details>
<summary><strong>Typography</strong></summary>

| Role | Font | Notes |
| --- | --- | --- |
| Headlines | Playfair Display | Dramatic. High contrast serif. |
| Body text | Libre Baskerville | Dense newspaper column feel. |
| Data & bylines | Courier Prime | Typewriter. Dates, sources, numbers. |
| Pull quotes | Playfair Display Italic | Large. Grid-breaking. |

</details>

<details>
<summary><strong>Color palette</strong></summary>

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#F5F0E8` | Aged newsprint. Warm. |
| `--text` | `#1A1A1A` | Deep ink black. |
| `--headline` | `#0A0A0A` | Headlines heavier than body. |
| `--border` | `#2B2B2B` | Thick ink rules. |
| `--link` | `#1A1A1A` | Underlined. No blue. Editorial. |
| `--data` | `#8B0000` | Deep editorial red. Numbers only. |
| Ghost track colors | Desaturated Encyclopedia palette | Same meaning, less digital feel. |

</details>

<details>
<summary><strong>Layout rules</strong></summary>

- Three narrow columns on desktop. Left: dates and markers. Center: article body. Right: margin.
- Heavy horizontal rules between sections. 3px solid `--border`.
- Dateline always visible at top in Courier Prime.
- Subtle paper grain texture via CSS `::before` pseudo-element. `opacity: 0.03`. Barely visible.
- Pull quotes break the column grid intentionally. Full center column width. Large Playfair Italic.
- No rounded corners. No shadows. No web-app feel.
</details>

<details>
<summary><strong>Newspaper-only feature: the dateline</strong></summary>

Always present at the very top. Full width. Courier Prime. Small caps.

`AMERICAN PIE` — `WEDNESDAY, MARCH 26, 2026`

In simulation mode, shows the simulation date:

`AMERICAN PIE` — `TUESDAY, MARCH 11, 2008`
</details>

### Theme switch

Located at the bottom of every screen. Looks like a Wikipedia language selector. No modal. No settings page.

**Read in:** Encyclopedia · Newspaper

[↑ Back to top](#top)

---

<a id="6-screen-specifications"></a>

## 6. Screen specifications

<a id="61-home-page"></a>

### 6.1 Home page

The first screen. Looks exactly like a Wikipedia main page. No app chrome. No navigation. No onboarding. Just a page.

<details>
<summary><strong>Masthead</strong></summary>

**American Pie**  
The Free Financial Encyclopedia  

Right-aligned on the same row as the title:

`[ 2008 ]` `[ Present · ● ]`

The ● next to Present pulses at one breath per four seconds. Means the data is live. No tooltip. No label. You figure it out.

Font: Serif (Linux Libertine or Playfair Display depending on theme).
</details>

<details>
<summary><strong>Featured article block</strong></summary>

Full width. Light left border (grey in Encyclopedia, thick black rule in Newspaper).

Featured article title and lede (2008 crisis framing). **Read more →** is not a button. It is a text link. The only interactive element in this block.
</details>

<details>
<summary><strong>Left column — In the news</strong></summary>

Bullet list of early-2008 headlines (Bear Stearns, Fed cuts, unemployment, home prices, oil, consumer confidence, IndyMac). Each item: link, `--link` color, underline on hover only. Each opens a different article. Each teaches a different concept.
</details>

<details>
<summary><strong>Right column — Did you know</strong></summary>

Hooks including net worth loss stats, emergency fund stats, and the $7,000 → $47,000 example seeded from mock data.

Once you enter your real cash amount in any article sidebar, all instances of this figure update throughout the app.
</details>

<details>
<summary><strong>Bottom strip — On this day</strong></summary>

Example: March 14, 2008 — JP Morgan / Bear Stearns. No link. No interaction. Rotates from `did-you-know.json` each session.
</details>

<a id="62-article-view"></a>

### 6.2 Article view

The primary reading screen. Every concept, every simulation event lives here. The structure is always identical. The content changes.

<details>
<summary><strong>Layout</strong></summary>

- Desktop: 65% content left column, 35% margin right column.
- Mobile: single column. Margin collapses to expandable panel at bottom.
- No scrolling within a section. Each section is one screen tall. You advance with **Next →**.
- The section never moves. Only the content changes. Slideshow mechanic.
</details>

<details>
<summary><strong>Article header</strong></summary>

Breadcrumb: American Pie › 2008 › Category · Title · Date · section count · concepts count.

Breadcrumb is navigable. Each crumb is a link back to that level.
</details>

<details>
<summary><strong>Section structure — content column</strong></summary>

Every section follows this pattern: “Section N of M”, plain explanation (2–4 sentences), your number inline, **Next →**.

| # | Name | What it contains |
| --- | --- | --- |
| 1 | What it is | Plain language definition. No jargon. |
| 2 | Your number | One calculation using your variables. Editable inline. |
| 3 | The math | The calculation shown step by step using your actual values. |
| 4 | What people did | What most people did. What smart people did. Reveal for “if you’d known earlier.” |
| 5 | What it connects to | Three tappable chips linking to related concepts. |
| 6 | Your next step | One concrete action. Specific. Doable today. |
</details>

<details>
<summary><strong>Section 4 — What people did (detail)</strong></summary>

Two blocks (most people / financially stable people), divider, **If you had known this in 2007 ▸ Reveal** — expands one paragraph, personal, slightly uncomfortable; collapses when you advance.
</details>

<details>
<summary><strong>The margin panel — right column</strong></summary>

- Default: “In this article” outline (sections 1–6) + Ghost Tracks list (Winner, Weatherer, Unaware, Gambler−, Gambler+) — “Tap any track”.
- Active (after tapping inline field): edit fields for monthly expenses, savings, mock vs real copy, coverage days.
Ghost track expanded: track name, date, cash, burn, coverage, CC debt, last action, “what they’re thinking.”
</details>

<a id="63-ghost-track-full-view"></a>

### 6.3 Ghost track full view

Accessible by tapping any ghost track name. Full-page overlay from the right. Wikipedia-style “profile” article.

<details>
<summary><strong>Layout</strong></summary>

Header with breadcrumb (… › Profiles), title, date · age · renting, income · cash. Below: running log — date left, entry right (ship’s log).
</details>

<details>
<summary><strong>Final status screen (end of simulation)</strong></summary>

Summary: started/ended net worth, key decisions, luck vs knowledge, philosophy tagline.
</details>

<a id="64-clarity-score"></a>

### 6.4 Clarity score

Accessible from the persistent small number in the top right after the home page.

<details>
<summary><strong>Layout</strong></summary>

Score X / 100, explanatory copy, “What you understand” with block-character progress bars (monospace). Next concept that will move the score the most. Empty bars are not locked — just empty.
</details>

<a id="65-navigation-shell"></a>

### 6.5 Navigation shell

Appears after the first complete article is read. Not before.

<details>
<summary><strong>Desktop sidebar</strong></summary>

Icons: Home, Simulation, My Situation, Learn, Clarity (with score). Labels on hover. Clarity score next to icon permanently.
</details>

<details>
<summary><strong>Mobile bottom bar</strong></summary>

Five icons. Full width. Same icons. Labels always visible on mobile.
</details>

<details>
<summary><strong>Undeveloped section behavior</strong></summary>

Undeveloped sections navigate and load; header, breadcrumb, margin load. Content area: honest “no data yet” with a pointer to built content — not “coming soon”, not locked.
</details>

[↑ Back to top](#top)

---

<a id="7-core-components"></a>

## 7. Core components

<a id="71-ticker-bar"></a>

### 7.1 Ticker bar

<details>
<summary><strong>Behavior and first appearance</strong></summary>

First appears in the article explaining financial tickers as a flat illustration. Two sections later, numbers change without a click. From then on, always at the bottom of every screen. It never announces itself.
</details>

<details>
<summary><strong>Content</strong></summary>

Five color-coded tracks cycling continuously. One update per track every 30 seconds. Updates from `ghost-tracks.json` for the active simulation date.

Note: Gambler− and Gambler+ may be identical early; they diverge later (intentional tension).
</details>

<details>
<summary><strong>Visual spec</strong></summary>

Full width. Fixed bottom, above theme switch. Height 32px. Inverted text/bg vs page. Monospace 11px. Horizontal seamless loop (CSS animation). Color dots match ghost track colors.
</details>

<a id="72-pressure-gauge"></a>

### 7.2 Pressure gauge

<details>
<summary><strong>First appearance</strong></summary>

In the Federal Reserve article as a decorative illustration. Marker moves — you notice it moved but don’t see it move. Then present above the ticker on every screen.
</details>

<details>
<summary><strong>Data source</strong></summary>

- Simulation: `events.json` — each era has `stress_level` 0–100.
- Real app: calculated from personal variables + manually entered Fed stress data.
</details>

<details>
<summary><strong>Visual spec</strong></summary>

Full width above ticker. Height 6px. Gradient cool blue → crisis red. Marker: 10×10px square, `--text` color, `left` via percentage. Transition `left` 5000ms ease-in-out. Labels on hover only (Calm / Crisis, 10px monospace).
</details>

<a id="73-ghost-tracks-margin-panel"></a>

### 7.3 Ghost tracks margin panel

Always visible in the right margin of every article. Described fully in [§6.2](#62-article-view).

<a id="74-inline-variable-editor"></a>

### 7.4 Inline variable editor

<details>
<summary><strong>Trigger</strong></summary>

Any `{{variable_name}}` renders with a subtle ▸ after it. Tapping value or indicator opens margin panel in edit mode.
</details>

<details>
<summary><strong>Behavior</strong></summary>

1. Margin opens with fields for relevant variables  
2. Mock data as placeholders  
3. User enters real values  
4. App writes to `variables.json` on input  
5. Article updates inline — no reload  
6. Margin closes on tap in article body  
</details>

<details>
<summary><strong>Visual spec</strong></summary>

Editable values: monospace, `--data`, subtle dotted underline. Margin inputs: 1px `--border`, minimal “2005 form” feel. No save button; writes on input.
</details>

<a id="75-source-view"></a>

### 7.5 Source view

<details>
<summary><strong>Access</strong></summary>

Every screen after home: small `< >` in breadcrumb row. Opens bottom overlay.
</details>

<details>
<summary><strong>Content</strong></summary>

Shows powering file (e.g. `articles/emergency-fund.md`), variables used with values, calculation steps, and edit instructions (editor vs in-app).
</details>

[↑ Back to top](#top)

---

<a id="8-the-five-ghost-tracks"></a>

## 8. The five ghost tracks

All five start January 2008: age 28, renting, $7,000 cash, $2,100/month expenses, no investments, employed.

| Track | Color | Label | Philosophy | ~2026 net worth |
| --- | --- | --- | --- | --- |
| | `#2D6A4F` | The Winner | Smart, boring, consistent decisions early. | ~$340,000 |
| | `#1D3557` | The Weatherer | Never got ahead. Never collapsed. Low stress. | ~$85,000 |
| | `#C9952A` | The Unaware | Did not know the rules. Most common. | ~$12,000 |
| | `#C1121F` | Gambler who lost | Knew everything. Acted badly. | ~-$40,000 |
| | `#6A994E` | Gambler who won | Same knowledge, better timing; admits luck. | ~$1,200,000 |

The five tracks teach: identical starts, radically different outcomes from decisions, knowledge, and variance. Gambler lost vs won: same kinds of decisions; leverage separated them.

[↑ Back to top](#top)

---

<a id="9-simulation-arc--2008-to-2026"></a>

## 9. Simulation arc — 2008 to 2026

<a id="era-1"></a>

### Era 1 — The calm before (late 2007 – early 2008)

<details>
<summary><strong>World context</strong></summary>
Everything looks fine. Jobs exist. Housing peaked Oct 2007; market quietly declining. No official “recession” yet.
</details>
<details>
<summary><strong>Your mock character</strong></summary>
Employed, renting, $7k checking, almost no yield, no investments, car payment only. Life normal, slightly precarious.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Checking opportunity cost, Fed/rates, silent inflation, credit scores, “market peaked” with no holdings.
</details>
<details>
<summary><strong>Key ghost track divergence</strong></summary>
Winner moves 2 months expenses to high-yield savings — small action, ~$840 interest over 18 months, habit of where money sits.
</details>
<details>
<summary><strong>Clickbait hooks</strong></summary>
Savings account / bank, “number bank doesn’t want calculated”, Fed cuts vs grocery bill, things already broken in 2007.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
“Did you know”: Bear Stearns employees lost retirement in a week — link without full explanation yet.
</details>
<details>
<summary><strong>Stress level</strong></summary>
12 / 100
</details>

<a id="era-2"></a>

### Era 2 — The crack (March 2008 – September 2008)

<details>
<summary><strong>World context</strong></summary>
Bear Stearns March 14; “contained” narrative; housing falling nationally; interbank fear; still no official recession.
</details>
<details>
<summary><strong>Your mock character</strong></summary>
Still employed; hours reduced quietly; $7k still in checking; surplus shrinking.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Bear Stearns, MBS, Fed role, recession technical vs felt, reduced hours & taxes, emergency fund math, checking vs savings vs money market.
</details>
<details>
<summary><strong>Key ghost track divergence</strong></summary>
Winner calculates burn rate for the first time — most important action of the simulation.
</details>
<details>
<summary><strong>Clickbait hooks</strong></summary>
Bear 14k employees gone Monday; “contained”; paycheck smaller; days savings will last.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
Emergency fund article ends: “Lehman Brothers… exploring strategic alternatives.” Link. Must follow.
</details>
<details>
<summary><strong>Stress level</strong></summary>
38 / 100
</details>

<a id="era-3"></a>

### Era 3 — The fall (September 2008 – December 2008)

<details>
<summary><strong>World context</strong></summary>
Lehman Sept 15; −777 day; credit freeze; $700B bailout; plain-language gap.
</details>
<details>
<summary><strong>Your mock character</strong></summary>
Laid off; $7k, no income, countdown — decisions matter most.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Taxes mid job loss, unemployment insurance, COBRA, precise burn, bailout, too big to fail, deflation, bear market / panic.
</details>
<details>
<summary><strong>Key ghost track divergence</strong></summary>
Unaware delays unemployment filing; wastes ~$1,260; spends savings without plan; CC → ~$3k.
</details>
<details>
<summary><strong>Clickbait hooks</strong></summary>
Lehman 158 years gone by lunch; $700B; UI mistake; $7k expiration date.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
Gambler+ quietly “Bought” in Dec 2008 — follow into Era 4.
</details>
<details>
<summary><strong>Stress level</strong></summary>
87 / 100
</details>

<a id="era-4"></a>

### Era 4 — The bottom (January 2009 – March 2009)

<details>
<summary><strong>World context</strong></summary>
Market still falling; Mar 9 bottom S&P 676 (unknown at the time); Obama; stimulus; dark news.
</details>
<details>
<summary><strong>Your mock character</strong></summary>
UI arriving; burn tight; $7k → ~$5k; surviving uncomfortably.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Stimulus intent, buying the dip psychology, DCA, index funds, S&P 500, opportunity cost of not investing Mar 2009, fear & decisions.
</details>
<details>
<summary><strong>Key ghost track divergence</strong></summary>
Winner buys $1k S&P index Mar 9, 2009. Gambler+ bought at 850 in Dec — now 676, down 20%, doesn’t sell.
</details>
<details>
<summary><strong>Clickbait hooks</strong></summary>
Best day to invest = most insane day; $1k Mar 9 today; 401k penalty mistake; brain designed to lose.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
Winner: “Applied for one job today.”
</details>
<details>
<summary><strong>Stress level</strong></summary>
71 / 100
</details>

<a id="era-5"></a>

### Era 5 — The long climb (2009 – 2013)

<details>
<summary><strong>World context</strong></summary>
Slow then faster recovery; uneven jobs; “recovery” before feeling; depressed housing; new normal.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Rebuilding EF, compound interest, Roth IRA, 401k match, net worth, assets vs liabilities, budget reality.
</details>
<details>
<summary><strong>Stress level</strong></summary>
34 / 100
</details>

<a id="era-6"></a>

### Era 6 — The bull market nobody trusted (2013 – 2019)

<details>
<summary><strong>World context</strong></summary>
Longest bull; stocks up most years; cash lags; Bitcoin cultural; gig economy; inequality widens.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Bull markets & endings, idle cash inflation, Bitcoin basics, lifestyle inflation, tax brackets myth, diversification, sequence of returns, gig taxes.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
Dec 2019: Wuhan pneumonia line — no article, just the sentence.
</details>
<details>
<summary><strong>Stress level</strong></summary>
18 / 100
</details>

<a id="era-7"></a>

### Era 7 — The speed crash (February 2020 – April 2020)

<details>
<summary><strong>World context</strong></summary>
Fast crash (−34% / 33 days); fast recovery; stimulus; PPP; moratoriums; unprecedented Fed balance sheet growth.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Correction vs crash, QE plain language, stimulus design vs effect, moratoriums, panic sell cost.
</details>
<details>
<summary><strong>Key ghost track divergence</strong></summary>
Unaware sells at bottom Mar 2020; Winner adds on way down.
</details>
<details>
<summary><strong>Era-ending thread</strong></summary>
Apr 2020: lumber, used cars — “Something is happening to prices”; inflation word appears.
</details>
<details>
<summary><strong>Stress level</strong></summary>
82 / 100 at peak · 29 / 100 by April
</details>

<a id="era-8"></a>

### Era 8 — Inflation (2021 – 2022)

<details>
<summary><strong>World context</strong></summary>
CPI peak 9.1% Jun 2022; Fed hikes; housing affordability; wages vs prices; crypto collapse; tech crash.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
Inflation mechanics, CPI, Fed funds & your life, bonds & rates, I bonds, real vs nominal, housing affordability math, wage-price spiral.
</details>
<details>
<summary><strong>Stress level</strong></summary>
61 / 100
</details>

<a id="era-9"></a>

### Era 9 — The AI era and the present (2023 – 2026)

<details>
<summary><strong>World context</strong></summary>
Inflation cools, prices stick; AI reshapes work; tech-led market; rates high; housing still hard; structural work anxiety.
</details>
<details>
<summary><strong>Concepts taught</strong></summary>
AI & employment, high rates & homebuying, valuations, next steps, reading your documents, what real app must do.
</details>
<details>
<summary><strong>Ghost track final outcomes</strong></summary>

| Track | Started | Ended | Lesson |
| --- | --- | --- | --- |
| Winner | $7,000 | ~$340k | Boring is powerful |
| Weatherer | $7,000 | ~$85k | Stability is valid |
| Unaware | $7,000 | ~$12k | Most common outcome |
| Gambler lost | $7,000 | ~-$40k | Knowledge ≠ no risk |
| Gambler won | $7,000 | ~$1.2M | Luck played a role |

</details>
<details>
<summary><strong>The final screen</strong></summary>
Simulation complete — you started 2008 with $7k and no knowledge; real app waits. **Start over** · **Switch to Present**. No fanfare, no score.
</details>

[↑ Back to top](#top)

---

<a id="10-full-article-manifest--2008-simulation"></a>

## 10. Full article manifest — 2008 simulation

Every article required to fully author the 2008 simulation. (Filenames and eras per PDF manifest; status as specified.)

<details>
<summary><strong>Articles 1–24 (expand)</strong></summary>

| # | Article | Era | Concept | Status |
| --- | --- | --- | --- | --- |
| 1 | emergency-fund.md | 1–3 | Emergency fund & calculation | Fully authored |
| 2 | burn-rate.md | 2 | Monthly burn rate | To author |
| 3 | checking-vs-savings.md | 1 | Cost of checking | To author |
| 4 | federal-reserve.md | 1–2 | Fed & you | To author |
| 5 | bear-stearns.md | 2 | Bear Stearns & non-investors | To author |
| 6 | mortgage-backed-securities.md | 2 | MBS plain language | To author |
| 7 | recession-defined.md | 2–3 | Recession technical vs felt | To author |
| 8 | unemployment-insurance.md | 3 | UI apply/pay | To author |
| 9 | cobra-insurance.md | 3 | COBRA affordability | To author |
| 10 | taxes-when-laid-off.md | 3 | Taxes mid-year job loss | To author |
| 11 | too-big-to-fail.md | 3 | Phrase & taxpayer cost | To author |
| 12 | bear-market.md | 3 | Bear market & panic | To author |
| 13 | stimulus.md | 4 | Stimulus design | To author |
| 14 | buying-the-dip.md | 4 | Dip & psychology | To author |
| 15 | dollar-cost-averaging.md | 4 | DCA | To author |
| 16 | index-funds.md | 4–5 | Index funds | To author |
| 17 | sp500.md | 4 | What S&P 500 is | To author |
| 18 | opportunity-cost.md | 4 | Mar 2009 non-invest cost | To author |
| 19 | compound-interest.md | 5 | Compound interest | To author |
| 20 | roth-ira.md | 5 | Roth IRA | To author |
| 21 | 401k-matching.md | 5 | Employer match | To author |
| 22 | net-worth.md | 5 | Net worth | To author |
| 23 | assets-vs-liabilities.md | 5 | Assets vs liabilities | To author |
| 24 | budget-reality.md | 5 | Budget vs perception | To author |

</details>

<details>
<summary><strong>Articles 25–48 (expand)</strong></summary>

| # | Article | Era | Concept | Status |
| --- | --- | --- | --- | --- |
| 25 | bull-market.md | 6 | Bull markets end | To author |
| 26 | idle-cash-inflation.md | 6 | Cash & 6yr inflation | To author |
| 27 | crypto-basics.md | 6 | Bitcoin risk | To author |
| 28 | lifestyle-inflation.md | 6 | Lifestyle creep | To author |
| 29 | tax-brackets.md | 6 | Brackets / raise myth | To author |
| 30 | diversification.md | 6 | Diversification | To author |
| 31 | sequence-of-returns.md | 6 | Seq. of returns | To author |
| 32 | gig-economy-taxes.md | 6 | Gig taxes | To author |
| 33 | market-crash-vs-correction.md | 7 | Crash vs correction | To author |
| 34 | quantitative-easing.md | 7 | QE | To author |
| 35 | eviction-moratorium.md | 7 | Moratoriums | To author |
| 36 | panic-selling-cost.md | 7 | Selling bottom | To author |
| 37 | inflation-mechanics.md | 8 | Inflation mechanics | To author |
| 38 | cpi.md | 8 | CPI | To author |
| 39 | fed-funds-rate.md | 8 | Fed funds & life | To author |
| 40 | bonds-and-rates.md | 8 | Bonds when rates rise | To author |
| 41 | i-bonds.md | 8 | Series I | To author |
| 42 | real-vs-nominal-returns.md | 8 | Real vs nominal | To author |
| 43 | housing-affordability.md | 8 | Affordability math | To author |
| 44 | wage-price-spiral.md | 8 | Wage-price spiral | To author |
| 45 | ai-and-employment.md | 9 | AI & jobs | To author |
| 46 | high-rates-home-buying.md | 9 | Rates & first-time buyer | To author |
| 47 | market-valuation.md | 9 | Valuations | To author |
| 48 | reading-your-documents.md | 9 | Reading documents | To author |

</details>

**Real app starter:** `[present]/getting-started.md` — fully authored.

[↑ Back to top](#top)

---

## 11. Variable manifest

Every variable lives in `variables.json` for its simulation; real app: `[present]/variables.json`.

| Variable key | Unit | Description | Where to find | How often |
| --- | --- | --- | --- | --- |
| your_cash | dollars | Liquid cash | Bank statement | Monthly |
| your_monthly_expenses | dollars | Avg spending | Last 3 stmts ÷ 3 | Monthly |
| your_monthly_income | dollars | Take-home | Pay stub | Job changes |
| coverage_days | days | cash ÷ expenses × 30 | Calculated | Auto |
| fed_funds_rate | percent | Fed target | federalreserve.gov | Fed meetings |
| inflation_rate | percent | CPI YoY | bls.gov/cpi | Monthly |
| unemployment_rate | percent | National UE | bls.gov | Monthly |
| sp500_level | points | S&P | finance.yahoo.com | When relevant |
| your_credit_card_debt | dollars | CC balance | Statement | Monthly |
| your_credit_score | number | Score | e.g. Credit Karma | Quarterly |
| your_net_worth | dollars | Assets − liabilities | Calculated | Monthly |
| your_investment_value | dollars | Investments total | Brokerage | Monthly |
| your_monthly_rent | dollars | Rent | Lease | Lease changes |
| marginal_tax_rate | percent | Federal marginal | IRS tables | Annually |
| short_term_cg_rate | percent | Short-term CG | = marginal | Annually |
| long_term_cg_rate | percent | Long-term CG | IRS | Annually |
| high_yield_savings_rate | percent | HYSA APY | Your bank | Rate changes |
| stress_level | 0–100 | Stress → gauge | Calculated | Era / monthly |

[↑ Back to top](#top)

---

## 12. Real app translation map

Simulation → real app: **same visuals/structure**, **different data source**.

| Simulation | Real app |
| --- | --- |
| Featured by era | Featured by pressing real situation |
| In The News — 2008 | Headlines you curate |
| Did You Know — mock $7k seed | Recalculated around your numbers |
| On This Day — sim date | Real historical event for today |
| Pressure gauge — era stress | Personal stress from real variables |
| Ticker — ghost logs | Your events & watch list |
| Ghost tracks — five fictions | Composite profiles for your bracket |
| Ghost log — pre-written | Your log, entry by entry |
| Inline editor — sim `variables.json` | `[present]/variables.json` |
| Source view — sim paths | Real paths & calculations |
| Year: 2008 | Present + live pulse |
| Clarity — simulation engagement | Understanding + real application |
| Your number — mock | Your number — real |
| §4 “people did” — history | §4 — demographics for your bracket |
| Simulation resets | Real app never resets |

**Variables that change real-app presentation:**

| Condition | Visual change |
| --- | --- |
| Burn &lt; 60 days | Featured border → subtle amber |
| Concept aligns with real life today | Margin: “This is happening right now…” |
| No real data yet | Did You Know uses national demo averages |
| Clarity threshold | New hook type unlocks on home |
| Watch list overdue | Margin `!` on item |

[↑ Back to top](#top)

---

## 13. Implementation plan

Build order is sequential. Each phase completes before the next. Each produces something usable.

<a id="phase-1"></a>

### Phase 1 — Static shell

**Goal:** App looks complete. Both themes. All screens. Not functional yet.

**Deliverables:** `index.html` (all screens as hidden divs); `style.css` (both themes); home, article, ghost view, clarity, nav, ticker, gauge static; theme switch; undeveloped states; iCloud path `C:\iCloudDrive\american_pie`.

**Test:** Open `index.html`, switch themes, navigate — looks intentional, not broken.

<a id="phase-2"></a>

### Phase 2 — Article engine

**Goal:** `loadArticle(filename)` reads `.md`, sections by `##`, one section at a time, Next →, breadcrumb, margin TOC, swipe/gesture back, first article `emergency-fund.md`.

**Test:** Read all 6 sections; Next/back; both themes.

<a id="phase-3"></a>

### Phase 3 — Variable system

**Goal:** `loadVariables(year)`, `{{var}}` substitution, computed fields, inline edit → `variables.json`, source view shows calc.

**Test:** Edit cash → coverage updates; source view matches.

<a id="phase-4"></a>

### Phase 4 — Simulation data

**Goal:** Full 2008 playable — `variables.json`, `events.json`, `ghost-tracks.json`, `did-you-know.json` (30+ hooks), all 48 articles authored, home feeds, ticker, gauge, era transitions, final screen, reset.

**Test:** Play 2008 start→finish; reset.

<a id="phase-5"></a>

### Phase 5 — Living components

**Goal:** Scrolling ticker (~30px/s, pause hover), gauge transitions 5s, ghost panel refresh, on-this-day rotation, nav appears once after first full article, ticker/gauge “wake up” timing per spec, clarity live.

**Test:** Federal Reserve article → illustrations become live; play eras; gauge + ticker.

<a id="phase-6"></a>

### Phase 6 — Real app layer

**Goal:** Present mode → `[present]/` data; template `variables.json`, `did-you-know.json`, `getting-started.md`, watch list, worksheets print, `sources/where-to-find-things.md`.

**Test:** Present mode, demographics then real numbers, hooks update, source paths, emergency fund + expenses.

[↑ Back to top](#top)

---

## 14. iCloud sync setup

<details>
<summary><strong>Step 1 — Verify iCloud Drive is installed and syncing</strong></summary>

Your iCloud folder path is `C:\iCloudDrive\american_pie`.

On Windows: File Explorer → iCloud Drive. If missing, install [iCloud for Windows](https://www.apple.com/icloud/setup/pc/). Sign in, enable iCloud Drive, confirm `C:\iCloudDrive\` exists.
</details>

<details>
<summary><strong>Step 2 — Create the project folder</strong></summary>

Go to `C:\iCloudDrive\`. Create folder `american_pie`. This is the project root.
</details>

<details>
<summary><strong>Step 3 — Open the app</strong></summary>

Place `index.html` in `C:\iCloudDrive\american_pie\`. Open in any browser; paths are relative to this root.
</details>

<details>
<summary><strong>Step 4 — Access on mobile</strong></summary>

iPhone/iPad: Files → iCloud Drive → `american_pie` → `index.html` → Safari. Share → Add to Home Screen for app-like icon.
</details>

<details>
<summary><strong>Step 5 — Sync behavior</strong></summary>

Edits on desktop sync to mobile quickly; phone entries sync to laptop. No manual sync. Offline: last cached read; writes queue until reconnect.
</details>

<details>
<summary><strong>Step 6 — Backend editing on desktop</strong></summary>

Any editor works for `.json` / `.md`. Recommended: VS Code — open `american_pie` as workspace; edit files and use terminal. Same files the UI writes when you edit inline.
</details>

[↑ Back to top](#top)

---

## 15. First article — complete authored example

This content belongs in `articles/emergency-fund.md` (and present starter in `[present]/getting-started.md` as noted).

<details>
<summary><strong>Emergency fund article (full YAML + markdown)</strong></summary>

```markdown
---
title: Emergency Fund
era: 1
date: March 2008
category: Banking
sections: 6
concepts: [emergency-fund, burn-rate, coverage-days]
related: [burn-rate, checking-vs-savings, unemployment-insurance]
---
## What It Is
An emergency fund is money set aside specifically to cover
unexpected expenses or loss of income without disrupting your
regular financial life. It is not an investment. It is not
savings toward a goal. It is a buffer between you and the
decisions people make when they are desperate.

In March 2008, the median American household had $6,800 in
liquid savings. This sounds like a cushion. For most
households, it covered less than 47 days of expenses. Many
did not know that number until they needed it.
Your estimated coverage: **{{coverage_days}} days**
## Your Number
Your emergency fund coverage is calculated from two numbers
you already know: how much cash you have and how much you
spend each month.
Monthly expenses: **{{your_monthly_expenses}}**
Current cash: **{{your_cash}}**
Coverage: {{your_cash}} ÷ {{your_monthly_expenses}} × 30
= **{{coverage_days}} days**
The standard recommendation is 90 to 180 days. Most
financial advisors consider anything under 30 days a
critical gap. Not because catastrophe is certain, but
because you are one event away from choices you do not
want to make.
## The Math
Why does 90 days matter specifically?
The average job search in 2008 took 5 months for someone
with marketable skills in a normal economy. In a recession,
that extended to 7 to 9 months. Unemployment insurance, if
applied for immediately, replaces approximately 40 to 50
percent of prior income. The gap between what unemployment
pays and what you actually spend must come from somewhere.
At {{your_monthly_expenses}} per month with unemployment
covering 45 percent:
Monthly gap: {{your_monthly_expenses}} × 0.55
= approximately **{{income_gap}}**
At that gap rate, your {{your_cash}} covers approximately
**{{covered_months_with_ui}} months** with unemployment
assistance, or **{{coverage_days}} days** without it.
This is your number. Knowing it is the entire point of
this section.
## What People Did
**What most people did**
In 2008, 61 percent of Americans who lost their job waited
more than three weeks to reduce spending. By then, the
average household had used $1,400 of savings unnecessarily.
Most did not calculate their burn rate until the third or
fourth week of unemployment. By then, the decisions became
harder.
The second most common mistake: withdrawing from a 401k.
Early withdrawal costs 10 percent penalty plus income tax
on the amount withdrawn. A $10,000 withdrawal might net
$6,500 after penalties and taxes. Most people who did this
in 2008 called it the most expensive mistake of their
financial lives.
**What financially stable people did**
They calculated their exact burn rate within 48 hours of
job loss and cut non-essential spending immediately. Not
because they panicked. Because the math was clear. They
knew their number. They knew how long they had. They did
not guess.
They also filed for unemployment insurance immediately.
Not three weeks later. Immediately. The first check takes
three to four weeks to arrive regardless of when you file.
Waiting to file means waiting longer for the first check.
▸ If you had known this before 2008
The average person who calculated their burn rate and
filed for unemployment within 48 hours of job loss in 2008
preserved $2,300 more of their savings over the following
six months than someone who waited. That $2,300, invested
in March 2009 during the market bottom, would be worth
approximately $15,700 by 2024.
The lesson is not about the money. The lesson is that
knowing your number in advance removes the paralysis that
causes the delay that causes the unnecessary spending.
## What It Connects To
This concept touches three others directly:
→ **Burn Rate** — the monthly expense number that powers
all emergency fund calculations. Knowing your burn rate
precisely makes this number real instead of estimated.
→ **Checking vs Savings** — where your emergency fund
lives matters. Cash sitting in checking earns nothing.
The same cash in a high-yield savings account earned
4.5 percent in early 2008. On $7,000 that is $315 per
year for doing nothing differently.
→ **Unemployment Insurance** — how UI payments interact
with your emergency fund changes the calculation
significantly. Understanding both together gives you a
far more accurate picture of your actual runway.
## Your Next Step
Find your last three months of bank statements. Add the
total spending for each month. Divide by three. That is
your burn rate. Divide your current cash by that number
and multiply by 30.
That is how many days you have. Write it down. It is the
most important number in your financial life right now and
most people have never calculated it.
If you are using mock data, your number is {{coverage_days}}
days. To see your real number, tap any value above and
enter your actual figures.
```

</details>

<details>
<summary><strong>Getting started (present) — full example</strong></summary>

Place at `articles/[present]/getting-started.md`:

```markdown
---
title: Getting Started With Your Real Numbers
era: present
date: {{today}}
category: Your Situation
sections: 4
concepts: [real-data, first-steps, document-organization]
---
## The First Number That Matters
Before anything else in this app becomes personal, you
need one number: your monthly burn rate.

This is not your income. It is not your rent. It is the
total amount of money you spend in an average month on
everything. Rent, food, transportation, subscriptions,
utilities, everything.
You do not need to know this precisely to start. An
estimate within $200 is close enough for now. You will
refine it as you use the app.
To find it: open your last three bank statements. Add
the total money that left your account each month.
Divide by three. That is your burn rate.
Tap the value below to enter your number:
Your monthly burn rate: **{{your_monthly_expenses}}**
## What To Enter Next
With your burn rate entered, two things become real:
Your coverage days with current cash:
**{{coverage_days}} days**
Your monthly income gap if you lost income today:
**{{income_gap}}** (what expenses exceed unemployment)
These two numbers determine everything else in this app.
Every article, every calculation, every "did you know"
item will become personal once these are set.
Enter your current cash next. It is on your bank app
right now. Just the checking and savings total. Not
investments yet.
Your current cash: **{{your_cash}}**
## How To Organize Your Documents
You do not need to upload anything. You do not need to
scan anything. You need to know where things are when
the app asks for a specific number.
Create one folder on your computer:
Documents/finances/bank-statements/pay-stubs/tax-returns/other/

When the app asks for a number, it will tell you exactly
which document has it and exactly where on the document
to look. Your job is to have the document in the right
folder so you can find it in under 30 seconds.
That is the entire organization system. Simple enough
to actually use. Structured enough to actually work.
## Your First Watch List Item
The first thing to monitor in your real financial life
is the Federal Reserve interest rate. Not because you
are investing. Because the rate affects your savings
account, any debt you carry, and the job market you
are navigating.
Check it once a month at:
federalreserve.gov → Monetary Policy → Target Rate
Current rate as you have entered it: **{{fed_funds_rate}}**
When it changes, update that value in your variables
file. The app will show you exactly what the change
means for your specific situation.
```

</details>

---

<p align="center"><strong>American Pie — Design Specification v1.0</strong><br />Built for one user. Private. Local. Yours.<br /><code>C:\iCloudDrive\american_pie</code></p>

[↑ Back to top](#top)
