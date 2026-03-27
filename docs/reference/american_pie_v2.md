# American Pie — Design Specification V2
*The simulation that is not a simulation. The financial app that is not a financial app.*
*Version 2.0 — March 2026*

---

## Table of Contents

- [1. What This Is](#1-what-this-is)
- [2. What This Is Not](#2-what-this-is-not)
- [3. The Four Layers](#3-the-four-layers)
- [4. The Environment Shell](#4-the-environment-shell)
- [5. The Two Themes](#5-the-two-themes)
- [6. The Chrome](#6-the-chrome)
- [7. The Sidebar — Encyclopedia Theme](#7-the-sidebar--encyclopedia-theme)
- [8. The Left Column — Newspaper Theme](#8-the-left-column--newspaper-theme)
- [9. The Main Content Area](#9-the-main-content-area)
- [10. The Ticker](#10-the-ticker)
- [11. The Text Slide Animation](#11-the-text-slide-animation)
- [12. The Year System](#12-the-year-system)
- [13. The Emotional Calendar](#13-the-emotional-calendar)
- [14. The Vehicle Layer](#14-the-vehicle-layer)
- [15. The Reader Variables](#15-the-reader-variables)
- [16. The Asset System](#16-the-asset-system)
- [17. The Edition System](#17-the-edition-system)
- [18. The Authoring Overlay](#18-the-authoring-overlay)
- [19. Gaps — Undecided](#19-gaps--undecided)
- [20. Deferred Decisions](#20-deferred-decisions)

---

## 1. What This Is

<details>
<summary>Expand</summary>

American Pie is a simulation that teaches without instructing. It is built on a single premise borrowed from the best white collar crime storytelling — The Wolf of Wall Street, Succession, the long-form financial journalism that people read at midnight and fact-check the next morning. The subject matter is finance. The experience is not.

The reader does not open American Pie to learn about finances. They open it because something on the home screen made them stop scrolling. They read an article because the headline contained a number that started a thought they needed to finish. They click through to something else because the first article left a question they did not arrive with. An hour later they understand something about money they did not understand before. They do not feel taught. They feel like they went down a rabbit hole.

The 2008 — 2025 simulation is the teacher. It is eighteen years of documented financial history presented as a research archive — the kind of folder a careful, obsessive person assembled over a decade to understand what happened and why. The reader finds the folder. The folder has no author. It has no agenda. It just exists.

2026 is where the simulation becomes the reader's own. They have rehearsed the emotions across eighteen years of other people's decisions. Now the decisions are theirs.

**The single test for every element of this product:**

If the reader never knew this was designed to teach them something, would this element make them want to keep reading? If yes it belongs. If it only makes sense as a teaching tool it does not belong.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 2. What This Is Not

<details>
<summary>Expand</summary>

**Not a financial education app.** A financial education app teaches concepts and measures retention. American Pie does neither explicitly. The concepts are embedded in journalism. The retention happens because the reader felt something, not because they completed a module.

**Not a simulation game.** A simulation game has mechanics, feedback loops, scores, and win states. American Pie has none of these. There is no score. There is no winning. There is only the simulation running and the reader inside it.

**Not a dashboard.** A dashboard surfaces data for decision support. American Pie surfaces data as journalism — the way an archive surfaces data, without telling you what to do with it.

**Not a web app.** From a glance it is a screenshot of 2001 Wikipedia or a 1953 broadsheet newspaper. It should never be possible to clock it as a web app from a glance. Every interactive element earns its existence by being something that already existed in the reference medium.

**The three enemies of the illusion:**

*Smoothness.* Web apps ease in and out. They transition gracefully. Old media was not smooth. A newspaper had hard edges. Wikipedia 2001 had no transitions — pages either loaded or they did not. Every animation in this product should feel mechanical, not graceful.

*Interface language.* Buttons, hover states, progress indicators, modals, form fields with visible borders, drop shadows, rounded corners that a 1953 newspaper would not have had. None of these exist here. Every control is disguised as something native to the reference medium.

*Consistency.* Real archives are inconsistent. Column widths vary slightly. Some headlines are too long for their box. Some items feel newer than others. The realism comes from deliberate inconsistency that looks accidental.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 3. The Four Layers

<details>
<summary>Expand</summary>

The entire system is built in four loosely coupled layers. Each layer knows only what it needs to know. No layer reaches into another layer's concerns. Changes in one layer do not require changes in any other layer. The layers communicate through named contracts — defined fields with known types.

### Layer 1 — Fixed Reality
`layer_fixed_reality`

The historical record. Cannot be edited after it is written. Knows: what year it is, what era that year belongs to, whether that year resets emotionally, and the baseline emotional temperature of each month within that year as history actually produced it.

Knows nothing about articles, songs, vehicles, or the reader.

Single file: `reality.json`

**Contract exposed upward** `reality_contract`:
- `year` — integer
- `month` — integer 1–12
- `era_id` — string, one of the named eras
- `es_temperature` — calm / warm / elevated / urgent / crisis / still / clear
- `es_trajectory` — rising / falling / stable / recovering / unknown
- `es_reset` — boolean
- `carry_emotion` — string, the temperature carried from previous December if `es_reset` is false

---

### Layer 2 — Authored Content
`layer_authored_content`

Articles, songs, ticker items, drilled phrases, Did You Know entries, featured slot configurations, vehicle decision logs. Knows nothing about the reader. Knows nothing about the UI. Reads from `layer_fixed_reality` to know which era it is configuring content for but does not depend on it structurally.

One config file per year for home screen configurations. One file per article for article content. Each file is independent.

For 2026 and forward this layer starts empty. The fields exist. The values are blank. The system renders a valid page with empty slots until they are populated.

**Contract exposed upward** `content_contract`:
- `year` — integer
- `month` — integer 1–12
- `featured_slot_type` — the type of hook that belongs in the featured slot
- `featured_headline_type` — the register of the headline
- `news_item_count` — integer 2–5
- `news_item_register` — calm / elevated / alarming / overwhelming
- `did_you_know_register` — curious / unsettling / recontextualizing
- `song_reference` — reference to asset in `asset_song`
- `ticker_items` — array of strings
- `drilled_phrase` — string or null. The phrase `ticker_state_drilled` will repeat. Set by article author. Never hardcoded by the system.
- `vehicle_labels` — object keyed by vehicle id, value is current sidebar label
- `on_this_day_register` — neutral / significant / impossible to ignore

---

### Layer 3 — Reader State
`layer_reader_state`

Everything about the reader. Their variables. Their vehicle 6 position. Their decision log. Their current position in the simulation. What they have entered and what they have not.

Knows nothing about articles or songs directly. Reads `reality_contract` to know what era the reader is currently in.

Single file: `reader.json` — updates as the reader interacts.

**Contract exposed upward** `reader_contract`:
- `var_cash` — liquid savings
- `var_monthly_income` — take-home
- `var_monthly_expenses` — total outgoing
- `var_coverage_days` — derived: `var_cash` divided by daily burn rate
- `var_credit_debt` — credit balances
- `var_investment_value` — portfolio value
- `var_net_worth` — derived
- `var_monthly_rent` — housing cost
- `var_stress_level` — subjective, reader-entered
- `vehicle_6_year_state` — object keyed by year
- `vehicle_6_decision_log` — array of named decisions
- `current_year` — integer
- `current_month` — integer

---

### Layer 4 — Presentation
`layer_presentation`

Themes, animations, ticker states, globe states, text slide variants, and the full UI anatomy of both themes. Knows nothing about historical reality, articles, or reader variables directly. Receives rendered values from the layers below and combines them into what the reader sees.

Entirely replaceable. A third theme can be added here without touching any other layer.

**Contract consumed** `presentation_contract`:
Reads all three contracts. Produces:
- `active_theme` — encyclopedia / newspaper
- `ticker_state` — current behavioral state of the ticker
- `globe_state` — static / spinning / degraded / spinning-degraded
- `slide_variant` — which animation variant fires on next content change
- `sidebar_vehicle_visibility` — object keyed by vehicle id, value is visible / stub / greyed / gone
- `chrome_year_tab_states` — object keyed by year, value is historical / active / future / locked
- `sidebar_visited_links` — array of navigation link ids that appear visited

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 4. The Environment Shell

<details>
<summary>Expand</summary>

`env_shell`
The outermost container. One viewport. No scroll. Ever. No clipped content. No scrollbars anywhere in the UI. The screen is a photograph. Photographs do not scroll. If content does not fit it does not go in.

`env_theme`
Current value: `encyclopedia` or `newspaper`. Controls which visual system is active. Toggling swaps every visual element simultaneously. No transition. Instant. Like flipping a physical switch.

`env_year`
Current value: any year 2008 — present and forward. The simulation's active temporal position. Every content slot reads from this value.

`env_era`
Derived from `env_year`. Not set directly. Maps years to named emotional eras:

| `era_id` | Years / Months | Emotional Character |
|---|---|---|
| `era_surface` | Late 2007 — Early 2008 | False calm |
| `era_first_crack` | March 2008 | Speed of collapse |
| `era_quiet_summer` | June 2008 | False recovery |
| `era_floor_disappears` | September 2008 | Vertigo |
| `era_machinery` | October — November 2008 | Surreal scale |
| `era_long_winter` | December 2008 — January 2009 | Accumulating loss |
| `era_bottom` | February — March 2009 | Eerie stillness |
| `era_first_breath` | April — December 2009 | Cautious, fragile |
| `era_recovery` | 2010 — 2012 | Patience rewarded quietly |
| `era_bull` | 2013 — 2019 | Deceptive warmth |
| `era_covid_crash` | February — April 2020 | Urgent, fast |
| `era_inflation` | 2021 — 2022 | Simmering anger |
| `era_recalibration` | 2023 — 2024 | Slow clarity |
| `era_present` | 2025 | Threshold |
| `era_live` | 2026 onward | The reader's unwritten year |

`env_emotional_state`
Derived from `env_era` plus month within the year. A composite of three properties read from `reality_contract`:
- `es_temperature` — calm / warm / elevated / urgent / crisis / still / clear
- `es_trajectory` — rising / falling / stable / recovering / unknown
- `es_reset` — boolean. True if this year opens with a January emotional reset.

Years where `es_reset` is false: 2009, 2020, 2021. Every other year resets. January of a reset year opens with hope. January of a non-reset year continues the previous December's emotional state.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 5. The Two Themes

<details>
<summary>Expand</summary>

### Encyclopedia Theme
`theme_encyclopedia`

The exact visual language of Wikipedia as it existed in approximately 2001 — 2003. Not inspired by it. That thing. Every typographic and layout decision derived from screenshots of the original.

**Typography:**
- Body text: `Georgia, "Times New Roman", serif` — Wikipedia's exact serif stack
- Sidebar labels, metadata, navigation: `Arial, Helvetica, sans-serif`
- Monospace / data: `"IBM Plex Mono", "Courier New", monospace`
- Link color unvisited: `#0645ad`
- Link color visited: `#0b0080`
- Body text size: 14px
- Line height: 1.5

**Layout:**
- Left sidebar: 160px fixed width
- Content area: fills remaining width, max ~900px for article column
- No rounded corners anywhere
- No shadows
- Rules: 1px solid `#a2a9b1`
- Background: `#f8f9fa`

**Interactive elements disguised as:**
- Theme toggle → "Read in" language options strip
- Year navigation → language alternates strip
- Audio toggle → puzzle globe `chrome_logo`
- Lyrics → featured text epigraph block in sidebar
- Ticker → Press coverage section in footer
- Vehicle status → "What links here" block
- My Situation → User page link
- Navigation → Standard Wikipedia sidebar

---

### Newspaper Theme
`theme_newspaper`

The exact visual language of a British broadsheet newspaper circa 1950 — 1960. The Newcastle Journal June 2 1953 is the primary reference.

**Typography:**
- Masthead title: `"UnifrakturMaguntia", serif` — genuine blackletter
- Banner headlines: `"Playfair Display", "Georgia", serif` — ExtraBold, large
- Subheadlines / deck lines: `"Playfair Display", serif` — italic, normal weight
- Body column text: `"IM Fell English", "Georgia", serif`
- Section labels: `"Libre Baskerville", serif` — small caps, bold
- Background: `#f5f0e8` — aged newsprint cream
- Text: `#1a1a1a` — near-black, not pure black

**Layout:**
- Full-width masthead with ruled borders
- Three-column grid for home screen
- Two-column layout for article screens
- Column rules: 1px solid `#2b2b2b`

**Interactive elements disguised as:**
- Theme toggle → Edition marker in masthead ("Encyclopedia Edition" / "Newspaper Edition")
- Year navigation → Issue number and date references in dateline
- Audio toggle → Advertisement or listing box in left column
- Lyrics → Advertisement copy in audio box
- Ticker → Shipping and arrivals notices at page bottom
- Vehicle status → Classified notices in left column
- My Situation → Reader-submitted column or personal accounts box
- Navigation → Section headers in left commentary column

---

### Theme Switch Behavior

Switching themes is instant. No transition. No animation. No acknowledgment. The content is identical. Only the chrome changes. The switch is triggered by:
- Encyclopedia theme: clicking "Newspaper" in `sidebar_read_in`
- Newspaper theme: clicking "Encyclopedia Edition" in `chrome_edition_marker`

Neither trigger looks like a button. Neither uses button styling. Both look like a production or editorial decision native to their medium.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 6. The Chrome

<details>
<summary>Expand</summary>

Chrome elements exist in both themes but manifest differently. They never scroll. They never clip. They are always exactly the right size for their content. They do not move during content transitions.

### `chrome_masthead`
Encyclopedia theme: contains `chrome_logo`, `chrome_tagline`, `chrome_year_tabs`.
Newspaper theme: contains `chrome_nameplate`, `chrome_edition_marker`, `chrome_dateline`, `chrome_year_tabs`.

### `chrome_logo`
Encyclopedia theme only. The Wikipedia puzzle globe SVG.

Three states:
- `logo_state_static` — default. Globe is still.
- `logo_state_spinning` — audio is on. Globe rotates. Speed and behavior keyed to song tempo and era emotional state. The globe is responding to the era, not directly to the audio. The audio and the globe happen to feel synchronized because they are both responding to the same underlying era state.
- `logo_state_degraded` — era-driven. Puzzle pieces subtly missing or displaced. Begins `era_floor_disappears`. Never announced. Never restored.

**Globe degradation schedule** — twelve puzzle pieces total, removed at specific emotional moments not era transitions:

| Trigger Moment | Pieces Lost | Running Total |
|---|---|---|
| First `ticker_state_ghost_1` fires | 1 | 1 missing |
| `era_floor_disappears` — Lehman specifically | 2 | 3 missing |
| `era_bottom` | 3 | 6 missing |
| `era_covid_crash` | 2 | 8 missing |
| `era_inflation` peak | 1 | 9 missing |

No pieces return. Ever. By `era_live` the reader has been navigating with a broken globe long enough that they have stopped expecting it to be fixed. That normalization is deliberate.

### `chrome_tagline`
Encyclopedia theme only. "The Free Financial Encyclopedia." Never changes.

### `chrome_nameplate`
Newspaper theme only. The blackletter title. "American Pie" in the register of the Newcastle Journal masthead.

### `chrome_edition_marker`
Newspaper theme only. The edition stamp. Functions as theme toggle. "Newspaper Edition" is current state. "Encyclopedia Edition" switches theme. Looks like an editorial production decision. Never looks like a button.

### `chrome_dateline`
Newspaper theme only. Issue number, date, price, wire service attribution. Date reflects `env_year` and month. Issue number increments with each year. Price frozen at 1953 equivalent. Wire service attribution is the thematic anchor text for the current era.

### `chrome_year_tabs`
Both themes. The year navigation.

Encyclopedia theme: appears as the language links strip — horizontal list of years separated by pipes, exactly as 2001 Wikipedia rendered language alternates.

Newspaper theme: appears as a row of edition dates below the dateline, formatted as issue references.

**Individual tab ids:** `year_tab_2008` through `year_tab_2025`, then `year_tab_2026` and forward.

**Tab visual states:**

Encyclopedia theme:
- Historical years: slightly purple-tinted as if visited
- Active year: appears in visited color even though the reader is currently on it
- 2026 and forward: blue — unvisited, open
- Locked / unpopulated year: greyed, same treatment as a deprecated Wikipedia entry

Newspaper theme:
- Historical years: lighter weight, archived edition register
- Active year: slightly heavier type, current edition register
- 2026 and forward: same weight as today's edition
- Locked / unpopulated year: italic, struck through, out of print

**Tab behavior:** Clicking any year tab fires `anim_text_slide` on all main content slots and updates `env_year`. The chrome does not move. The sidebar does not move. Only `main_content` changes.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 7. The Sidebar — Encyclopedia Theme

<details>
<summary>Expand</summary>

`sidebar`
Encyclopedia theme only. Left column. 160px fixed width. Never scrolls. Never clips. Contains the following named slots in fixed order.

### `sidebar_navigation`
Standard Wikipedia navigation block. Links: Main Page, My Situation, Simulation, Learn, Clarity.

All styled as standard Wikipedia blue links. As simulation progresses more appear in visited purple — not because the reader clicked them but because the archive feels used. This is era-driven not click-driven.

**Visited link progression:**

| Era | Link That Appears Visited |
|---|---|
| `era_surface` | None — all blue, no history |
| `era_first_crack` | My Situation |
| `era_quiet_summer` | Simulation |
| `era_floor_disappears` | Learn |
| `era_bottom` | Clarity |
| `era_live` | All visited — the reader has been here before |

### `sidebar_simulation_year`
Appears as a Wikipedia "In other projects" block. Lists years as project links. Redundant with `chrome_year_tabs` but in sidebar format. Same functional behavior.

### `sidebar_read_in`
The theme toggle. Appears as a "Read in" block. Options: "Encyclopedia" (bold, current state), "Newspaper" (blue link). Looks like a translation or format option. Clicking "Newspaper" triggers `env_theme` switch.

### `sidebar_audio`
The audio toggle and lyric display. Appears as a "Press coverage" block in the style of Wikipedia's footer attribution section.

Structure:
- The current song appears as a publication name — formatted as an external press citation
- Three lyric lines appear as linked headlines in that publication — italic, slightly smaller than body text, formatted as quoted external sources
- The current line: full opacity
- The previous line: 40% opacity, fading
- The next line: 20% opacity, arriving
- Lines slide upward mechanically as the song progresses — `slide_mechanical` variant, no easing
- The attribution line below all three: static, never moves, formatted as a Wikipedia citation with song title and artist

The globe `chrome_logo` is the visual indicator that audio is on. The sidebar block is the control. They are connected but separated.

Clicking the globe toggles audio. No label. No icon. No affordance. Just the globe that is either still or spinning.

### `sidebar_tools`
Source view, Worksheets. Standard Wikipedia tools block. Static across all eras.

### `sidebar_vehicle_status`
Appears as a "What links here" style block — the Wikipedia feature that showed which articles linked to the current one.

The five vehicles plus the reader's sixth appear as anonymous article links. Their labels do not identify them as vehicles. They read as related reference entries.

**Vehicle label progression across eras:**

Vehicle 3 specifically:
- `era_quiet_summer` — label shrinks from full entry to stub. One line.
- `era_floor_disappears` — text greys to 60% opacity
- `era_long_winter` — shrinks to a single word
- `era_bottom` — gone. Entries above and below close the gap as if it never existed.

Vehicle 1: gains entries over time. Longest entry by `era_live`.
Vehicle 5: gains entries from `era_first_breath` onward.
Vehicle 6 (reader): appears as a red link — created but not yet written — until the reader enters their first variable.

### `sidebar_lyrics_epigraph`
The lyric display described under `sidebar_audio` above. Appears as a Wikipedia featured text block — slightly indented, italic, formatted as an epigraph with attribution. The current lyric line looks like a sourced quotation from a relevant document. The attribution reads as a citation. It is the song title and timestamp. Nobody reads it as lyrics unless they know the song. People who know the song recognize it and feel something they cannot immediately explain.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 8. The Left Column — Newspaper Theme

<details>
<summary>Expand</summary>

`newspaper_left_column`
Newspaper theme only. Replaces `sidebar` entirely. The commentary column. Narrow. Set in slightly smaller typeface than the main columns.

### `nlc_commentary_header`
Small caps label. "COMMENTARY" exactly as the Newcastle Journal renders it.

### `nlc_audio_box`
The audio feature. Appears as an advertisement or listing box. Size and position fixed.

**States:**
- Audio off: static printed advertisement or listing. Looks entirely inert.
- Audio on: the graphic inside the box animates. Animation type is keyed to the graphic content.

**Animation types keyed to graphic:**
- Record player graphic → record spins
- Radio tower graphic → tower pulses with concentric ring animation
- Performer graphic → figure rocks back and forth
- Any other graphic → slow breathing pulse at song tempo

The animation is small, slow, loops continuously. From a distance it looks printed. Up close it moves. This is the only element in the newspaper theme that moves and it only moves when audio is on.

The current lyric appears as advertisement copy — set in the typeface and layout of a period advertisement. The lyric looks like a slogan or a headline. It updates as the song progresses using the same three-line opacity system as `sidebar_audio` but formatted as ad copy rather than a quotation.

### `nlc_did_you_know`
Appears as an editorial commentary box — ruled box with bold header. Content changes with `env_year` and `env_emotional_state`. Register matches `did_you_know_register` from `content_contract`.

### `nlc_navigation`
Section headers in the commentary column. Standard newspaper section index: Foreign, Home, Markets, Commentary, Simulation, Clarity. Functions as navigation. Looks like editorial organization. Clicking navigates without any visual affordance that it is a link until hover.

### `nlc_vehicle_status`
Appears as a narrow column of classified-style notices. Each vehicle is a notice. Notice content reflects vehicle's current state in the active year. Vehicle 3's notice disappears by `era_bottom` using the same four-stage progression as `sidebar_vehicle_status`. Vehicle 1's notice is the longest entry by `era_live`.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 9. The Main Content Area

<details>
<summary>Expand</summary>

`main_content`
The area where all content changes happen. In encyclopedia theme: the right portion of the screen. In newspaper theme: the center and right columns.

This is the only area that animates during navigation. The sidebar and chrome never move. Only `main_content` changes and it changes via `anim_text_slide`.

### `slot_featured_article`
The primary content slot.

Encyclopedia theme: the starred featured article block with ruled border.
Newspaper theme: the banner headline and featured story columns.

Sub-slots:
- `slot_featured_headline` — the title or headline. In newspaper theme this is the largest typographic element on the page.
- `slot_featured_excerpt` — the opening text. Minimum two sentences. Maximum four. Never more. Never less.

**Featured slot type progression across eras:**

| Era | Featured Slot Type |
|---|---|
| `era_surface` | Something a careful person saved because it seemed important but not urgent |
| `era_first_crack` | Something that required two reads to understand what had happened |
| `era_quiet_summer` | Something that seemed like evidence of recovery |
| `era_floor_disappears` | Something nobody could not save |
| `era_machinery` | Something that required the reader to sit with a number they could not process |
| `era_long_winter` | Something that arrived after the drama and felt heavier for arriving quietly |
| `era_bottom` | Something so specific it could only have been written by someone who was there |
| `era_first_breath` | Something retrospective — looking back at what just happened |
| `era_recovery` | Something that would not have been interesting in 2008 because 2008 was happening |
| `era_bull` | Something comfortable |
| `era_covid_crash` | Something nobody could not save — the second time |
| `era_inflation` | Something that felt personal even though it was about everyone |
| `era_recalibration` | Something preparatory rather than retrospective |
| `era_present` | Something the reader saves when they are trying to understand something in order to do something about it |
| `era_live` | Blank until authored |

### `slot_in_the_news`
The news items column. Contains between two and five items depending on `env_era`.

Named individually: `news_item_1` through `news_item_5`. Items 4 and 5 only appear from `era_floor_disappears` onward. More items signals more pressure. This looks like a production decision made under pressure, not a UI feature.

### `slot_on_this_day`
The date-specific historical note. Keyed to the specific month and day within `env_year`.

In calm eras: neutral or positive historical note.
In crisis eras: the thing that happened on this exact date that nobody could ignore.

### `slot_did_you_know`
Encyclopedia theme only. Newspaper theme handles this in `nlc_did_you_know`.

Register changes with `env_emotional_state`:
- `era_surface`: curious — facts that are interesting
- `era_first_crack` through `era_floor_disappears`: unsettling — facts that are harder to dismiss
- `era_machinery` onward: recontextualizing — facts that change what the reader thought they understood about something they read earlier

### `slot_simulation_snapshot`
Present in both themes. Appears as something native.

Encyclopedia theme: a "Statistics" box — the kind Wikipedia used for geographical articles. Values appear as reference data.
Newspaper theme: a small ruled table in the commentary column.

Shows:
- Reader's `var_coverage_days` — displayed as a reference value, not a dashboard metric
- Reader's `vehicle_position` relative to the five vehicles at the active year
- Current year's `es_temperature` — expressed as an era description, not a label

All three displayed as values that look like reference data. Not as metrics. Not as scores.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 10. The Ticker

<details>
<summary>Expand</summary>

`ticker`
The most behaviorally complex element in the simulation. Never looks like a ticker. Always looks like something native to the active theme. Its behavior across the simulation is the closest thing this product has to a ghost story.

### Encyclopedia Theme Manifestation
`ticker_press_coverage`

Appears as the "Press coverage" section in the Wikipedia footer area. Formatted as a list of external publication links with dates. At rest it looks completely static. When it begins to move the motion is so slow that the reader does not immediately register it as animation.

### Newspaper Theme Manifestation
`ticker_shipping_notices`

Appears as shipping and arrivals notices at the bottom of the page. Dense small-type. Vessel names, departure times, port references. In crisis eras shifts to wire report format — short urgent dispatches pasted at the bottom of a late edition.

---

### Ticker Behavioral States

#### `ticker_state_synchronized`
Default state. Only changes when the reader clicks a link. Changes simultaneously with main content slide. Reader learns this is how it works. This assumption is correct and deliberately reinforced across two full eras before it is violated.

Active: `era_surface`, `era_first_crack`, early `era_quiet_summer`.

#### `ticker_state_ghost_1`
First haunting. The ticker attempts to change without a click. It stutters — text half-slides and stops. What it is trying to show is specific information keyed to that exact moment in the simulation. It never completes the change. It looks like a rendering glitch.

The specific text it fails to show is the single most important thing the reader needs to know for what is about to happen in `era_floor_disappears`. They will not know this until later.

Fires via `slide_stutter` animation variant.

Active: mid `era_quiet_summer`.

#### `ticker_state_recovered`
The ticker returns to `ticker_state_synchronized` behavior. The reader relaxes. The glitch seems resolved. This recovery is deliberate. The ticker needed the reader to lower their guard.

Active: late `era_quiet_summer` through early `era_floor_disappears`.

#### `ticker_state_ghost_2`
Second haunting. Different from the first. The ticker is not glitching. It is working perfectly — but showing something it should not be able to show. It references the reader's actual `var_coverage_days`. The real value they entered. Formatted as a historical data point in the ticker's native format. The number inside it is the reader's actual number.

When the reader updates their variables later the ticker will show the updated number formatted the same way. This is how the simulation learns the reader's name.

Active: `era_machinery`.

#### `ticker_state_drilled`
The ticker begins repeating a specific phrase. Not looping — drilling. Shows the phrase, pauses longer than normal, shows something else briefly, returns to the phrase.

**The phrase is not hardcoded.** It is the `drilled_phrase` field from the active article's authored content. The article author sets it. The system executes it. An article with an empty `drilled_phrase` field never triggers this state.

The phrase is always true for whatever the reader was just reading. That contextual universality is what makes it feel addressed to them specifically.

Active: `era_long_winter`, `era_bottom`, December 2025, and any article where `drilled_phrase` is populated.

#### `ticker_state_crisis`
Fast. Fragments. Items cut mid-sentence. The content is overwhelming the display's ability to show it. Visually alarming. The state most likely to risk breaking the screenshot illusion — handle with restraint.

Active: `era_floor_disappears`, `era_machinery`, `era_covid_crash`.

#### `ticker_state_still`
The ticker stops. Not paused. Stopped. The last text it showed remains on screen. The stillness is felt before it is noticed.

Active: `era_bottom`. Does not restart until the reader advances past screen three of the bottom article.

#### `ticker_state_present`
`era_live` and forward. Returns to `ticker_state_synchronized` but the content it shows is no longer historical. It is current. Keyed to the reader's actual variables. Formatted as archive entries. The gap between the historical format and the present-tense content is the final piece of the simulation's emotional architecture.

---

### Ticker Activation Sequence — The Ghost Story Arc

The ticker's behavioral arc across the simulation is designed to move through three phases:

**Phase 1 — Trusted tool (eras 1–2):** The ticker is reliable. It changes when you click. You trust it.

**Phase 2 — Haunted (eras 3–5):** The ticker begins to behave unexpectedly. First chaotically, then deliberately. The reader is unsettled in two different ways at two different moments.

**Phase 3 — Aware (eras 6–live):** The ticker knows things it should not know. It has been watching the reader the entire time. What it shows in `era_live` is not historical. It is the reader's present situation formatted as if it has already happened. Which, in a sense, it has.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 11. The Text Slide Animation

<details>
<summary>Expand</summary>

`anim_text_slide`

Triggered by any content-changing event — year tab click, navigation click, link click within content. Not tied to a specific region. Any text block that changes, changes via this animation. The sidebar and chrome never animate. Only content slots.

The animation feels mechanical, not graceful. Like a departures board at an old train station. Not a web transition.

### Named Variants

#### `slide_standard`
Duration: 150ms. Clean horizontal exit and entrance. No easing. The default. Used for navigation clicks in calm eras.

#### `slide_mechanical`
Duration: 120ms. Slightly faster than standard. No easing. Feels like a physical mechanism moving. Used for year tab changes.

#### `slide_drag`
Duration: 200ms. The outgoing text lingers very slightly before releasing. Barely perceptible at normal reading pace. Used in `era_long_winter` and `era_bottom`. The text does not want to leave.

#### `slide_snap`
Duration: 80ms. Fast and hard. Used in `era_floor_disappears` and `era_covid_crash`. The content changes before you are ready.

#### `slide_stutter`
Used during `ticker_state_ghost_1` attempts. The text begins to slide, stops, resets to original position. Repeats two or three times before the ticker gives up and returns to its previous state. Each stutter attempt is slightly shorter than the last — the ghost is losing the ability to communicate.

### Slide Direction

Direction encodes the emotional movement without explaining it.

- Going forward in years → content exits left, enters from right
- Going backward in years → content exits right, enters from left
- Going to an article from home → content exits left, enters from right
- Going to home from an article → content exits right, enters from left

**No vertical slide variants.** The up-down axis is reserved for the screenshot illusion. Horizontal motion only. The speed and easing variants carry all emotional information needed without introducing vertical motion that would break the static-page illusion.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 12. The Year System

<details>
<summary>Expand</summary>

### Year Range
2008 — present and forward. Each year is an entry point into the simulation. No "Present" tab. Only years.

### Historical Years (2008 — 2025)
Fixed reality. The emotional arc of each year is derived from what actually happened and lives in `layer_fixed_reality`. The content within that arc is authored and lives in `layer_authored_content`. Historical years cannot be re-written at the reality layer. They can be re-authored at the content layer.

### The Live Year (2026 and forward)
2026 has no fixed arc because it has not happened yet. The emotional arc is configured by the reader-author as the year progresses. The same configuration layer that exists for 2008 — 2025 applies but with nothing pre-populated. Fields exist. Values are blank until populated.

### Future Years (2027 and forward)
Adding a new year requires:
1. Creating one config file in `layer_authored_content` for that year — fields present, values empty
2. The year tab appears automatically
3. The tab appears locked until at least one content field is populated

The data model stores years as objects in an array. Adding 2027 is adding one object. Nothing else changes.

### Emotional Carry Between Years
When `es_reset` is false the January home screen of that year does not open with hope. It opens with the carried emotion from the previous December. The `carry_emotion` field in `reality_contract` specifies what that emotion is.

Years where `es_reset` is false: 2009, 2020, 2021. These years open carrying the weight of what ended the year before.

### The Reader's Variables in Historical Years
The reader's current variables travel through the historical years as a parallel track. When the simulation is in 2009 a sidebar entry shows what the reader's current numbers would have looked like in that moment. Not what they should have done. Just what would have been true.

This appears in `sidebar_vehicle_status` as the vehicle 6 entry — formatted as historical data, not as a personal recommendation. "As of January 2009 this position held X days of coverage." The X is the reader's real number applied retrospectively. No second person. No instruction.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 13. The Emotional Calendar

<details>
<summary>Expand</summary>

Year-by-year mapping of `es_reset`, `es_temperature`, and the quality of the home screen's emotional register. This lives in `layer_fixed_reality` and cannot be edited.

| Year | `es_reset` | Jan Temperature | Arc | Notable Home Screen Moment |
|---|---|---|---|---|
| 2008 | true | calm | calm → crisis | September home screen is the thing nobody could not save |
| 2009 | false | crisis carried | crisis → cautious | January does not reset. The archive knows. |
| 2010 | true | cautious | cautious → warm | First genuine reset since 2007. Fragile. |
| 2011 | true | warm | warm → warm | Recovery establishing. Nothing remarkable. |
| 2012 | true | warm | warm → uncertain | Election year uncertainty — different from financial uncertainty |
| 2013 | true | comfortable | comfortable → comfortable | The bull market is established. The reader who was right in 2009 is quietly right. |
| 2014 | true | comfortable | comfortable → comfortable | Nothing remarkable. The globe is still broken. Nobody notices anymore. |
| 2015 | true | comfortable | comfortable → brief dip → comfortable | August correction: one week of elevated ticker. Then recovery. |
| 2016 | true | uncertain | uncertain → uncertain | Significant but whose significance won't be clear until later |
| 2017 | true | warm | warm → warm | Markets performing. Ticker calm. Globe still broken. |
| 2018 | true | warm | warm → edge | December 2018: worst Christmas Eve market performance in history. `es_reset` for 2019 is true but December 2018 home screen is the first elevated ticker since 2009 without an external crisis driving it. |
| 2019 | true | comfortable | comfortable → suspended | Most comfortable year in a decade until December. One line in the December In The News items. The ticker shows it once and does not repeat it. |
| 2020 | false | suspended carried | suspended → crisis → urgent | January almost normal. March: the second thing nobody could not save. The globe loses no new pieces — it was already broken. |
| 2021 | false | angry carried | angry → simmering | Inflation-angry. Low-grade. Grinding. Different quality from 2008 crisis. |
| 2022 | false | simmering carried | simmering → simmering | `ticker_state_ghost_2` fires once briefly in late 2022. The reader's `var_coverage_days` appears in the ticker. Does not reappear. |
| 2023 | true | recalibrating | recalibrating → recalibrating | Genuine reset. The ticker returns to `ticker_state_synchronized`. Featured article is retrospective. |
| 2024 | true | cautiously optimistic | cautiously optimistic → cautiously optimistic | The reader has entirely stopped expecting the globe to be fixed. This normalization is the most important emotional achievement of 2024. |
| 2025 | true | threshold | threshold → threshold | Last historical year. December 2025: `ticker_state_drilled` fires one final time. Then synchronized. Then 2026 begins. |
| 2026 | configurable | clear (earned) | unwritten | Does not get January's hopeful reset. Gets something better: clarity. The specific quality of starting something while knowing what starting uninformed cost other people. |

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 14. The Vehicle Layer

<details>
<summary>Expand</summary>

Five historical vehicles plus the reader as a sixth. They are not characters. They are outcome containers — five possible trajectories through the same years. The reader encounters them through `sidebar_vehicle_status` or `nlc_vehicle_status` and through the articles. They are never introduced. They are discovered.

### Vehicle Identifiers

| ID | Role | Emotional Function |
|---|---|---|
| `vehicle_1` | The early mover | Quiet satisfaction — boring correct decisions compounding into something significant |
| `vehicle_2` | The steady one | Deep satisfaction of surviving through not doing anything catastrophically wrong |
| `vehicle_3` | The absent decider | Slow motion horror — accumulation of absent decisions over eighteen years |
| `vehicle_4` | The overreacher | Guilty satisfaction when overconfidence fails — the reader might have made the same choice |
| `vehicle_5` | The lucky right | Gleeful excitement followed by the most important admission in the simulation |
| `vehicle_6` | The reader | The only vehicle whose outcome is not yet written |

### Vehicle Data Structure

Each vehicle has:
- `vehicle_id` — v1 through v6
- `vehicle_year_state` — object keyed by year, containing position at that year's end
- `vehicle_emotional_arc` — sequence of emotional states across all years
- `vehicle_decision_log` — named decisions made and not made, keyed by year
- `vehicle_sidebar_label` — what appears in the sidebar status block for this vehicle at the active year. Changes across eras. Read from `content_contract`.
- `vehicle_visibility` — visible / stub / greyed / gone. Changes across eras for vehicle 3.

### Vehicle 6 — The Reader

Differs from vehicles 1–5:
- `vehicle_6_year_state` — populated by real variable entries
- `vehicle_6_decision_log` — populated by real decisions made in the live app
- `vehicle_6_emotional_arc` — not predetermined, emerges from real behavior
- `vehicle_6_sidebar_label` — shows present-tense value in `era_live`, not historical

In historical years vehicle 6 appears as a red Wikipedia link — created but not yet written. In `era_live` it is the only vehicle whose entry is still being written. The five resolved trajectories sitting alongside an unresolved one is the most motivating element in the simulation. It requires no instruction.

### Vehicle 5's Admission
The single most important line in the simulation and the one that earns everything before it:

*"Luck played a role. I know it."*

This appears in `era_live` in vehicle 5's final sidebar entry. It is never celebrated. It is never explained. It sits in the same format as every other vehicle entry and says what it says.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 15. The Reader Variables

<details>
<summary>Expand</summary>

Named variables that travel through the entire simulation. They have mock values during historical eras before the reader has entered their own. The switch from mock to real is silent — the content does not acknowledge it, the numbers simply become the reader's numbers.

| Variable ID | Description | Type | Derived |
|---|---|---|---|
| `var_cash` | Liquid savings | number | no |
| `var_monthly_income` | Take-home pay | number | no |
| `var_monthly_expenses` | Total monthly outgoing | number | no |
| `var_coverage_days` | Days of runway | number | yes — `var_cash` ÷ (`var_monthly_expenses` ÷ 30) |
| `var_credit_debt` | Credit card balances | number | no |
| `var_investment_value` | Portfolio value | number | no |
| `var_net_worth` | Net worth | number | yes — assets minus liabilities |
| `var_monthly_rent` | Housing cost | number | no |
| `var_stress_level` | Subjective stress | integer 1–10 | no — reader-entered |

### Mock Values
Mock values are seeded from `layer_authored_content` per era. They are chosen to represent a median household state for that era — not alarming enough to feel contrived, not comfortable enough to feel safe.

### Variable Display
Variables appear in article text as `{{variable_name}}`. When rendered they display the current value with a faint gray underline — the notebook-edit affordance native to the encyclopedia theme. Clicking edits in place. The variable field looks like pencil on paper. No border. No placeholder hint text. The current value displayed in the article's typeface at the article's size with a single underline at 40% opacity. On hover underline darkens to 70%. On click becomes a text input with same styling.

Saving: on blur or Enter key. Value propagates instantly. Every dependent calculated variable updates without reload.

### Variable Placement Rules
- Variables appear in article screens 2 and 3 only
- Never on screen 1 — the hook is pure journalism
- A variable appears in its natural journalistic context — never as a standalone display element
- Calculated variables are never editable — shown with their calculation inline

### Historical Projection
Each variable has a historical projection — what that value would have meant in each simulation year. This is what appears in vehicle 6's sidebar entry during historical years. Formatted as historical data. Never as personal advice.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 16. The Asset System

<details>
<summary>Expand</summary>

Three independent asset types. Each exists on its own. None is owned by another. The relationships between them are what get created and destroyed, not the assets themselves.

### `asset_article`
An article exists independently. Has its own file, its own content, its own frontmatter. Not owned by any edition. Not owned by any song. Can be referenced by as many editions as appropriate.

Key frontmatter fields:
- `title` — publication-style headline
- `era` — which era this article belongs to
- `date` — simulation date
- `voice` — one of the six publication voices
- `ticker_state` — overrides era default while this article is being read
- `drilled_phrase` — the phrase `ticker_state_drilled` will repeat. Null if not applicable.
- `sections` — integer, number of screen delimiters
- `concepts` — array of concept slugs
- `related` — array of related article slugs

### `asset_song`
A song exists independently. Has:
- `song_id` — unique identifier
- `song_file_reference` — path to audio file
- `song_lyric_reference` — path to lyric file (separate from audio — loosely coupled)
- `song_tempo_bpm` — base tempo for globe sensitivity calculation
- `song_era_suggestion` — which era this song feels appropriate for. Suggestion only, not constraint.
- `song_globe_sensitivity_default` — default value, overridable per edition manifest entry

Lyric file and audio file are separate references. The same song with different lyric files is valid. The globe sensitivity is configurable per edition association, not per song. The same song can make the globe behave differently in different editions.

### `asset_edition`
A named, saved, complete configuration snapshot. Has:
- `edition_id` — unique identifier
- `edition_name` — human-readable name
- `edition_created` — timestamp
- `edition_modified` — timestamp
- `edition_notes` — free text authoring notes

An edition holds no content directly. All content references live in `edition_manifest`.

### `edition_manifest`
The relationship layer. Each entry connects one edition to one article or one song. All connections live here.

Manifest entry fields:
- `manifest_id` — unique identifier for this specific relationship
- `edition_ref` — which edition
- `article_ref` — which article (null if this is a song relationship)
- `song_ref` — which song (null if this is an article relationship)
- `song_position` — named position within the edition where this song plays
- `article_position` — era, month, and slot where this article appears
- `timing_triggers` — triggers recorded from reading session for this article in this edition
- `is_frozen` — boolean. If true this relationship includes a content snapshot taken at time of association. If false it is referential and always reflects current state of the asset.
- `globe_sensitivity_override` — overrides `song_globe_sensitivity_default` for this specific edition association
- `content_snapshot` — populated only if `is_frozen` is true. Complete content at time of freezing.

### Many-to-Many Relationships

An article can belong to many editions.
An edition can contain many articles.
A song can belong to many editions.
An edition can contain many songs.
An article can have many songs associated with it.
A song can be associated with many articles.

None of these relationships are destructive. Adding an article to a new edition does not change the article's existing edition memberships. Removing an article from an edition deletes only that manifest entry. Deleting an edition deletes all its manifest entries but no assets.

### Edition Duplication
Always produces independent copies. At the moment of duplication all manifest entries are copied as independent records pointing to the same assets but with their own `manifest_id` values. Modifying the duplicate's manifest entries does not affect the original. The assets themselves are still shared — only the relationship configuration is independent.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 17. The Edition System

<details>
<summary>Expand</summary>

An edition is a named, saved, complete environmental configuration. It captures everything `layer_presentation` is producing at a given moment plus the authored content driving it — theme, emotional state, ticker behavior, globe state, music, timing triggers, slide variants, vehicle visibility — stored as a reloadable snapshot.

### Edition Types

**Working edition** — referential. Always reflects current state of all referenced assets. Used during active authoring. Loading a working edition restores the configuration but content reflects the latest version of each asset.

**Frozen edition** — archival. All manifest entries have `is_frozen` true. Content snapshots taken at time of freezing. Loading a frozen edition restores both configuration and the exact content that existed when it was frozen. The assets continue to evolve. The frozen edition remembers what they said.

A single edition can have some manifest entries frozen and some referential. The freeze is per relationship, not per edition.

### Named Edition Examples

These are not required names — they are examples of the naming convention. The author names editions freely.

- `edition_era_surface` — the calm January 2008 state
- `edition_era_crisis` — the September 15 2008 state
- `edition_era_bottom` — the March 2009 still state
- `edition_live_january` — the default 2026 opening state
- `edition_live_july` — what 2026 looks like if July goes a specific way

### Edition Loading
Loading an edition is instant. All four layer states update simultaneously. The reader-facing app is indistinguishable from the same state arrived at by navigating — loading an edition does not look like loading a preset. It looks like the simulation is in that moment.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 18. The Authoring Overlay

<details>
<summary>Expand</summary>

`author_overlay`

Not a separate tool. A mode that lives inside the simulation itself. Activated by a keyboard shortcut or URL parameter a reader would never stumble on. From the outside the app is identical. From inside authoring mode a thin persistent panel appears docked to one edge — never covering the content — giving live controls over everything affecting the current moment.

The reader sees a screenshot. The author sees a screenshot with an instrument panel attached.

### Overlay Components

#### `author_timeline`
A scrubber for current year and month. Drag and the entire simulation state updates in real time. Featured article changes. Ticker state changes. Globe state changes. Emotional temperature changes. News items change. The full January 2009 versus March 2009 comparison visible by dragging one control. No save required. No reload.

#### `author_ticker_preview`
Shows current ticker state name and the actual ticker text running at this moment. Manual trigger buttons for each ticker state — force `ticker_state_ghost_1` or `ticker_state_drilled` at any moment without waiting for the simulation to reach it naturally. Shows the `drilled_phrase` field for the current article if one is set.

#### `author_music_sync`
The song assigned to this era plays with a visible beat indicator. Globe behavior plays simultaneously. A file picker to swap the song — writes the reference to config automatically. A tempo override slider adjusting globe sensitivity. Finding the right value: the slider writes it to config. Changing a song: only the song reference in the era's config changes. The globe still responds correctly because it was listening to the era, not the song.

#### `author_article_inspector`
Current article's key fields as editable inline fields: voice, ticker state, drilled phrase, reveal block content, ghost track assignments. Changes write directly to the article's data file on save. For larger edits a button opens the full file in the configured external editor.

#### `author_theme_comparator`
A split toggle to flick between encyclopedia and newspaper themes while everything else stays frozen at the current moment. Not switching themes for the reader — comparing how the same content moment looks in both themes. Useful when writing an article to confirm it works in both visual languages.

#### `author_emotional_state_override`
Direct controls for `es_temperature`, `es_trajectory`, and `es_reset` that override `layer_fixed_reality` values for the current session only. Nothing is saved. Lets the author ask: what does this article look like if the temperature were crisis instead of elevated? What does the ticker do if forced to `ticker_state_ghost_2` right now?

#### `author_vehicle_inspector`
All six vehicles' current state at the active year and month. Editable for vehicles 1 through 5 — position, sidebar label, visibility state. Changes write to `layer_authored_content`. Vehicle 6 shows the reader's real values and is not editable here.

#### `author_contract_viewer`
Raw view of what all four layer contracts are currently returning. Three columns: what `layer_fixed_reality` is saying, what `layer_authored_content` is saying, what `layer_reader_state` is saying. Below: what `layer_presentation` is producing. The debugging tool. When something looks wrong this immediately identifies which layer is producing the unexpected value.

#### `author_reading_session`
The recording tool. Has three states:

- `session_recording` — watches and timestamps every click, every screen advance, every pause longer than three seconds
- `session_playback` — replays the session on a timeline so triggers can be placed
- `session_idle` — not recording

A session is not automatically saved. The author reviews it, places triggers, decides it is right, then saves it as part of an edition. If the session felt wrong — read too fast, distracted — discard and re-record. The edition only captures sessions deliberately saved.

**Trigger placement:** After recording, the overlay shows a timeline of the reading session. Every click is timestamped. Time spent on each screen is visible. The author drags feature triggers onto the timeline at the moments where they felt something. `ticker_state_ghost_1` fires at the exact second the reader paused. The drilled phrase begins at the exact screen where the idea landed. The timing is calibrated against a real human reading real content at a real pace.

#### `author_edition_recorder`
Records reading sessions as timelines. Lets the author drag feature triggers onto the timeline. Lets the author name and save the result as an edition. Loads any saved edition instantly. Compares two editions side by side in `author_theme_comparator`.

#### `author_asset_library`
Three-column panel showing all three asset types. Articles. Songs. Editions. Drag an article onto an edition to create a manifest entry. Drag a song onto an edition to create a manifest entry. Click any manifest entry to see its settings. Click the freeze toggle on any entry to snapshot it. Click delete on any entry to remove the relationship without deleting either asset.

#### `author_edition_builder`
Opens when an edition is selected in `author_asset_library`. Shows full manifest — every article and song associated, in order, with trigger timelines as horizontal bars. Reorder articles by dragging. Swap one song for another by dragging from the library onto the position. Record a new reading session for any article in this edition directly from this view. Duplicate the edition under a new name.

#### `author_song_manager`
Opens when a song is selected in `author_asset_library`. Shows every edition the song belongs to and every article it has been associated with. Globe sensitivity setting per association. Lyric file reference. Button to swap the audio file without changing any associations — the reference updates everywhere simultaneously. Button to add a new lyric file independently of the audio file.

### Authoring Workflow Example

Write the article. Open authoring mode. Drag `author_timeline` to the target era and month. Simulation is now in that moment. Open `author_article_inspector` and write the drilled phrase. Watch the ticker enter `ticker_state_drilled` in real time with the phrase running. Adjust the phrase. Ticker updates instantly. Open `author_music_sync` and swap the song for the era. Globe responds immediately. Watch the lyric scroll in the sidebar. Adjust globe sensitivity with the tempo override slider until it feels right. Save — value writes to config. Flick `author_theme_comparator` to see the newspaper theme. Same moment, same song, same ticker, other visual language. Confirm it works. Start recording session. Read the article at natural pace. Finish. Open `author_edition_recorder`. Place triggers on the timeline at the felt moments. Name the configuration. Save as edition. Close overlay. App returns to pure reader mode. Screenshot illusion intact.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 19. Gaps — Undecided

<details>
<summary>Expand</summary>

These are decisions that must be made before building the affected systems. They are not deferred by choice — they are genuinely open.

### `gap_1` — Vehicle 3 intermediate sidebar states
The four-stage disappearance is specified (stub → greyed → single word → gone). The exact label text at each stage is not specified. What does the stub say? What is the single word? These are content decisions with emotional weight that need deliberate authoring, not placeholder text.

### `gap_2` — The `ticker_state_ghost_1` failed message
The text the ticker tries and fails to show during the first haunting is the single most important thing the reader needs to know for `era_floor_disappears`. This text has not been determined. It is a content decision that affects the emotional architecture of the entire simulation. It must be decided before `era_quiet_summer` articles are written.

### `gap_3` — Mobile behavior
The screenshot illusion is designed for a desktop viewport. What happens on mobile is entirely unaddressed. The no-scroll, no-clip constraint that makes the desktop experience feel like a photograph becomes a serious design problem on a mobile screen. This may require a fundamentally different approach for mobile — possibly a third theme, possibly a deliberately degraded experience, possibly mobile access disabled with an explanation native to the archive metaphor.

### `gap_4` — The newspaper page bottom anatomy — classifieds content
The structure is specified (classifieds left, ticker center, section index right). The content register for the classifieds in each era is not fully specified. What kind of notices appear in calm eras? What makes the crisis-era classifieds alarming in aggregate while each individual notice reads as ordinary? This requires deliberate authoring.

### `gap_5` — Vehicle 6 historical projection methodology
The spec says the reader's current variables are applied retrospectively to historical years. The methodology for this projection is not specified. Is it a simple inflation adjustment? Is it a more complex calculation that accounts for what those specific assets would have done during that era? The answer changes the emotional impact of seeing your own number in 2009.

### `gap_6` — Audio system architecture
The song reference, tempo, and lyric file are specified as asset fields. The actual audio system — how songs are served, whether they loop, what happens when a song ends, whether the reader can skip, whether audio autoplay browser restrictions affect behavior — is not addressed. This has technical implications that need to be resolved before the audio feature is built.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 20. Deferred Decisions

<details>
<summary>Expand</summary>

These are decisions that have been deliberately deferred. They are not gaps — the direction is clear. The specifics are deferred until the relevant system is ready to be built.

### `defer_1` — Article content
Deliberately deferred. The environment must be fully specified and built before a single article is written. Articles are authored against a working simulation, not against a specification.

### `defer_2` — Vehicle decision logs in detail
The five vehicles' shapes and emotional functions are fully specified. The exact decision log for each vehicle across each year — the specific named decisions made and not made — is deferred until the emotional calendar for 2010 — 2025 is fully authored.

### `defer_3` — The full 2026 content layer
The emotional register and opening state of 2026 are specified. The specific home screen state, featured article type, In The News items, and vehicle 6 presentation in `era_live` are deferred until the reader has lived enough of 2026 to author it honestly.

### `defer_4` — The complete `reality.json` file
The year-by-year emotional calendar is mapped in section 13. The month-by-month detail within each year — the specific `es_temperature` value for each month of each year — is deferred. This requires research into the month-by-month historical record for each year 2008 — 2025 and is a significant content project in its own right.

### `defer_5` — The authoring overlay visual design
The authoring overlay's functional specification is complete. Its visual design — how it sits against the encyclopedia and newspaper themes, how it is visually distinguished from the reader-facing content, whether it uses the same typographic system — is deferred until the reader-facing themes are built and stable.

### `defer_6` — The `present/getting-started` article
The article that closes the historical simulation and opens the reader's present situation. Its structure is known — same five movements, all variables central, British press voice, the specific quality of understanding something fully that you did not understand while it was happening. The content is deferred because it is the last article written, not the first.

### `defer_7` — Third theme and beyond
The architecture supports additional themes — a third theme can be added to `layer_presentation` without touching any other layer. The content, reality, and reader state layers are theme-agnostic. Specific additional themes — 1970s teletext, 1990s Ceefax, other reference media — are deferred until the two primary themes are complete and stable.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

*American Pie — Design Specification V2*
*March 2026*
*The simulation that is not a simulation. The financial app that is not a financial app.*
*Both Director's Bibles remain authoritative on emotional architecture and writing standards.*
*This document governs what gets built and how the layers connect.*
