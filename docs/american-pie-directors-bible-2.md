# American Pie — Director's Bible, Volume 2
## The Production Standard
*Version 2.1 — March 2026*
*This document governs what gets built, what gets written, and what never appears. Bible 1 established the emotional architecture. Bible 2 is the production standard that prevents drift.*

*v2.1 additions: Article screen count is now variable (minimum three, target four to seven). The six-screen rule is retired; articles now follow five movements at any length. Navigation model codified: within-article advances use a downward canvas slide; between-article navigation uses a horizontal slide; ticker and chrome never move. New Section 17 documents the section editing system — all section types support drag-drop, upload, copy-paste, and export directly from the UI.*

---

## Table of Contents

- [1. What This Document Is For](#1-what-this-document-is-for)
- [2. The Illusion — Rules That Cannot Break](#2-the-illusion--rules-that-cannot-break)
- [3. Journalistic Standards — The Six Publication Voices](#3-journalistic-standards--the-six-publication-voices)
- [4. Article Architecture — The Exact Spec](#4-article-architecture--the-exact-spec)
- [5. The Placeholder Article Format — The Shell Standard](#5-the-placeholder-article-format--the-shell-standard)
- [6. The Emotional Arc — Era by Era, Screen by Screen](#6-the-emotional-arc--era-by-era-screen-by-screen)
- [7. The Hidden Curriculum — What Each Article Teaches](#7-the-hidden-curriculum--what-each-article-teaches)
- [8. Ghost Track Integration — How Household Archetypes Appear in Journalism](#8-ghost-track-integration--how-household-archetypes-appear-in-journalism)
- [9. Ticker Behavior — The Pressure Gauge Spec](#9-ticker-behavior--the-pressure-gauge-spec)
- [10. Title and Headline Standards](#10-title-and-headline-standards)
- [11. Image Brief Standards](#11-image-brief-standards)
- [12. Variable Integration — Where Editable Data Appears](#12-variable-integration--where-editable-data-appears)
- [13. UI and Design Standards](#13-ui-and-design-standards)
- [14. The First Fifteen Articles — Shell Map](#14-the-first-fifteen-articles--shell-map)
- [15. Anti-Drift Checklist](#15-anti-drift-checklist)
- [16. The One Question](#16-the-one-question)
- [17. The Section Editing System — Authoring from the UI](#17-the-section-editing-system--authoring-from-the-ui)
- [18. UI Mockups — Reference Layouts](#18-ui-mockups--reference-layouts)

---

## 1. What This Document Is For

Bible 1 answers: what is this thing and what should it feel like?

Bible 2 answers: exactly how do you build it so it always feels that way?

Bible 1 is the emotional contract with the reader. Bible 2 is the production contract with everyone who touches the codebase, writes an article, drafts a headline, or positions an image placeholder. If Bible 1 is the director's vision, Bible 2 is the production bible that a writer's room, a UI developer, and a photo researcher can each pick up independently and produce work that fits together without a single coordination call.

**The drift problem this document solves:** Without a production standard, the second article added by a second writer will be 15% off. The tenth article will be unrecognizable. The UI built six months from now will have added three features that break the illusion. The image in slot four will be the wrong tone. Bible 2 exists so that every element added to this product — article, headline, image brief, UI component, ticker state — can be checked against a single standard and either passes or fails with no ambiguity.

[↑ Back to top](#table-of-contents)

---

## 2. The Illusion — Rules That Cannot Break

The central fiction of American Pie is that the reader has stumbled into a research archive. A curated folder of journalism, data, and case studies assembled by someone who was trying to understand what happened in 2008 — for legal research, academic work, or personal reckoning. The reader found the folder. The folder has no author. It has no agenda. It just exists.

Every design decision, every word of article content, every UI element must either maintain that fiction or be invisible enough that it does not break it.

### The Archive Is Curated, Not Comprehensive

The research folder that the reader has stumbled into was assembled by someone with a specific, unstated agenda. Not every article they saved was front-page news. Most were not. A real research folder assembled by a careful person over twelve months looks like this: three dry government reports, one wire story about a Fed rate decision, a local newspaper piece about foreclosures in a specific county, two WSJ analysis pieces with paragraphs highlighted in the margin, and then — interspersed — the articles they absolutely could not not save.

The front-page pieces. The ones where the headline made them stop scrolling. The Bear Stearns weekend story. The Lehman bankruptcy notice. The wire report from the morning of September 15. The feature piece about what the trading floor looked like at 2 AM. These are in the folder too, and they are not surrounded by explanation or apology. They sit next to the dry FDIC quarterly report the way a clipped front page sits in a manila folder next to a spreadsheet printout.

**The ratio is approximately 60/40.** Sixty percent of the archive is normal journalism — analytical, dry, thorough, the kind of article a serious person saves for reference. Forty percent is the front-page, stop-everything, someone-was-very-tempted-to-save-this kind. The mix is what makes the folder feel real. A folder that is all front-page drama was assembled by someone performing panic. A folder that is all dry analysis was assembled by someone performing expertise. This folder was assembled by someone trying to understand something. That person is believable precisely because they saved both.

**The sensationalized articles are not dramatized.** They are genuine front-page journalism — the kind that earned its placement by being first, by being specific, by having a number in the headline that nobody had processed yet. The sensation comes from the reality, not from the writing. A writer adding drama to a Lehman Brothers article is a writer who has not read the original Lehman Brothers articles. The original articles are already the most dramatic texts of their genre because the facts are already the most dramatic facts.

### The Six Rules of the Illusion

**Rule 1 — The app never speaks directly to the reader.**
No article, no UI label, no tooltip ever uses second-person "you" in the context of instruction. "You should build an emergency fund" breaks the illusion. "In the months following Bear Stearns, households with fewer than thirty days of liquid savings faced constrained options" does not. The reader may apply this to themselves. That is their choice. The app never makes it for them.

*Exception: The My Situation section uses second person because it is a personal worksheet, not journalism. The frame is different. The reader knows they are filling in their own data. The illusion there is a different one — that of a private notebook, not a public archive.*

**Rule 2 — The app never teaches. It documents.**
Every article is documentation of something that happened or is happening. The financial mechanics are embedded in the documentation the way physics is embedded in an accident report. The reader learns about liquidity risk by reading about Bear Stearns, not by reading about liquidity risk. The lesson and the journalism are the same sentence. They are never separate.

**Rule 3 — The five household archetypes are never introduced.**
They are discovered. Their first appearance in any article is an anonymous case study — "a household in the Federal Reserve's 2009 Survey of Consumer Finances," "a 2010 bankruptcy filing reviewed by the publication," "an unnamed source in testimony before the Senate Banking Committee." Across five or six articles the reader may begin to recognize the pattern. That recognition is the feature. It is never announced.

**Rule 4 — The UI is a reading environment, not an app.**
Every UI element that draws attention to itself as software breaks the illusion. Navigation that looks like an app navigation breaks it. A submit button breaks it. A progress bar labeled "Simulation Progress: 34%" breaks it. The interface must look like something that existed before software — a newspaper, a reference work, a research archive — that has been translated into this format. Every new UI component proposed must pass this test: does it look like it belongs in a 1953 broadsheet or a 2001 encyclopedia? If the answer is no, redesign it until it does.

**Rule 5 — The simulation's interactivity feels accidental.**
The reader should not feel like they are operating a simulation. They should feel like they found an archive that, oddly, responds to them. The variable editor feels like writing in the margin of a book. The reveal block feels like turning a page to a section that was previously folded. The See Also expansion feels like a footnote that opened into a full document. None of these feel like UI features. They feel like the archive behaving in an unexpected but natural way.

**Rule 6 — The ticker is not a feature. It is the room.**
The ticker is ambient. It is the background hum of the environment. When it changes behavior the reader should feel it before they notice it. When it glitches during chaos they should be unsettled before they understand why. When it goes still during the market bottom they should feel the stillness before they look down to see what changed. It is not a data display. It is the emotional atmosphere of the current moment in the simulation, expressed through the behavior of text.

[↑ Back to top](#table-of-contents)

---

## 3. Journalistic Standards — The Six Publication Voices

Every article in the American Pie archive is written in one of six publication voices. Each voice has specific conventions that must be followed precisely. An article written in the wrong voice, or in a voice that blends two of these, reads as synthetic. The reader will feel it even if they cannot name it.

---

<details>
<summary><strong>Voice 1 — AP Wire Service</strong></summary>

### Voice 1 — AP Wire Service

**Publication model:** Associated Press, Reuters, Bloomberg News (breaking coverage)
**Era usage:** Breaking events. Bear Stearns weekend. Lehman filing. TARP vote. Market bottom. Any article covering an event in real time.
**Dateline format:** `NEW YORK (AP) —` at the opening. Date in the dateline, not the headline.
**Sentence structure:** Short. Active voice. No editorializing. Every claim attributed. Numbers precise. No metaphor in the first four paragraphs.
**What it sounds like:** "JPMorgan Chase & Co. agreed Sunday to acquire Bear Stearns Cos. for approximately $236 million, or $2 a share, a price that represented a 93 percent discount to the firm's closing stock price on Friday."
**What it never does:** Use the word "stunning." Use "historic" without attribution. Express an opinion. Begin with anything other than the single most important fact of the event.
**Emotional register:** Controlled urgency. The discipline of the writing is itself alarming — the gap between how calmly it is written and how catastrophic the content is produces specific dread.

</details>

---

<details>
<summary><strong>Voice 2 — WSJ Front Page Analysis</strong></summary>

### Voice 2 — WSJ Front Page Analysis

**Publication model:** Wall Street Journal Page A1, Financial Times front page
**Era usage:** Analysis pieces. Articles about the mechanics underneath the events. How mortgage-backed securities worked. What the Fed's rate decisions meant. The housing peak retrospective.
**Dateline format:** Byline at top, publication date. No dateline city.
**Sentence structure:** Longer. Can use subordinate clauses. Can introduce a scene before pivoting to analysis. First paragraph often tells a story that will be explained in the next five.
**What it sounds like:** "On a Tuesday morning in November 2007, a compliance officer at a regional bank in Columbus, Ohio, placed a call to the firm's risk committee. The call lasted fourteen minutes. Its subject was a portfolio of mortgage-backed securities that, by the firm's own internal models, had lost 23 percent of their rated value in thirty days. No one on the risk committee had been told about the losses. The call was the first time."
**What it never does:** Use the first person. Quote without attribution. Make claims that cannot be sourced. Begin a sentence with "Incredibly."
**Emotional register:** The scene-setting creates intimacy. The pivot to analysis creates distance. The reader moves between the two and the gap between them is where the dread lives.

</details>

---

<details>
<summary><strong>Voice 3 — Local American Newspaper</strong></summary>

### Voice 3 — Local American Newspaper

**Publication model:** Tampa Bay Times, Columbus Dispatch, Detroit Free Press, Fresno Bee
**Era usage:** Human cost articles. The article about unemployment lines. The article about foreclosure rates in specific zip codes. The article where the simulation becomes real because it stopped being about institutions and started being about families.
**Dateline format:** Byline. City. Human subject's first name only in opening paragraph per editorial policy.
**Sentence structure:** Paragraph structure follows the human subject. More conversational. Can quote at length. Numbers used sparingly and always translated into human terms.
**What it sounds like:** "Sandra had worked at the mortgage company for eleven years when she was laid off in January 2008. She did not file for unemployment insurance the same week because, she said later, she assumed she would find something within two weeks. She did not find something within two weeks. She found something in four months."
**What it never does:** Explain financial concepts. Refer to Sandra as a "case study." Use Sandra to make a point the reader is supposed to take home. Sandra is not a lesson. Sandra is a person. The lesson is the reader's problem.
**Emotional register:** The highest human register in the simulation. The articles that produce the most durable emotional response. Used sparingly because of it. If every article sounds like this one, none of them do.

</details>

---

<details>
<summary><strong>Voice 4 — British and International Press</strong></summary>

### Voice 4 — British and International Press

**Publication model:** The Guardian, The Economist, Le Monde (translated), Der Spiegel (translated)
**Era usage:** Retrospective analysis pieces. Articles that describe the American crisis from the outside — which reveals things that American journalism missed because it was too close. The housing bubble seen from London. The Fed's credibility seen from Frankfurt.
**Dateline format:** Publication name, date. Byline optional.
**Sentence structure:** More analytical distance. Can use irony. Can describe American financial culture as a subject of study rather than a context assumed.
**What it sounds like:** "The concept of the emergency fund — a sum of liquid savings sufficient to cover several months of expenses without income — occupies a peculiar position in American personal finance discourse. It is universally recommended and almost universally ignored. The Federal Reserve's 2007 Survey of Consumer Finances found that fewer than half of American households could cover three months of expenses from liquid savings alone. British households, for comparison, held a median of four months. German households, six."
**What it never does:** Condescend. Explain America to itself. Draw explicit lessons for the reader.
**Emotional register:** The external view produces a specific alienation — the reader suddenly sees their own context from the outside. This is one of the simulation's most powerful tools for interrupting the reader's assumptions about what is normal.

</details>

---

<details>
<summary><strong>Voice 5 — Government and Institutional Document</strong></summary>

### Voice 5 — Government and Institutional Document

**Publication model:** Federal Reserve working papers, Congressional Research Service reports, FDIC quarterly reports, Senate Banking Committee testimony excerpts
**Era usage:** The articles that make the reader feel how large the machinery was and how much of it was operating invisibly. The TARP article. The FDIC list article. The Fed rate decision retrospective.
**Dateline format:** Document title in header. Agency name. Date.
**Sentence structure:** Formal. Passive voice acceptable and expected. Numbers with footnotes. "As noted in the preceding table" is a legitimate sentence in this voice.
**What it sounds like:** "As of September 30, 2008, the FDIC's list of 'problem institutions' had grown to 171 institutions with combined assets of $115.6 billion, compared with 76 institutions and $22.2 billion in assets at the same time the previous year. The increase represents the largest year-over-year growth in the problem institution list since 1992."
**What it never does:** Express urgency. Use quotation marks for emphasis. Make recommendations to the public.
**Emotional register:** The bureaucratic tone applied to catastrophic numbers is its own form of horror. The gap between the institutional calm of the language and the scale of what is being described is the tension. The reader feels the size of the machinery by the size of the vocabulary used to describe it.

</details>

---

<details>
<summary><strong>Voice 6 — Long-Form Feature (Magazine)</strong></summary>

### Voice 6 — Long-Form Feature (Magazine)

**Publication model:** New York Times Magazine, The Atlantic, Rolling Stone financial features
**Era usage:** The retrospective deep-dive articles. "What really happened at Lehman Brothers." "The families who bought at the peak." The articles that pull back and show the full shape of something that was impossible to see from inside it.
**Dateline format:** Long-form headline, deck line, byline, magazine and date.
**Sentence structure:** Can be anything. This voice has the most latitude. Can use the first person if the journalist is present in the story. Can open with a scene that does not connect to the thesis until paragraph four.
**What it sounds like:** "The conference room on the thirty-first floor of 745 Seventh Avenue looked out over midtown Manhattan on the morning of September 12, 2008. The men in it had been awake for most of the previous forty-eight hours. On the table were several thousand pages of financial documents and two legal pads with handwritten numbers that would determine, by the end of the weekend, whether Lehman Brothers would survive or cease to exist. By Sunday night, the answer was clear. On Monday morning, 26,000 people would go to work at a company that no longer existed as a legal entity."
**What it never does:** Lose the journalism. The latitude of this voice is structural and stylistic. It does not authorize fabrication, embellishment, or speculation without sourcing.
**Emotional register:** The most cinematic voice in the archive. Used for the highest-stakes articles. Its presence signals to the reader that they are entering a different register — something closer to the center of what happened.

</details>

[↑ Back to top](#table-of-contents)

---

## 4. Article Architecture — The Exact Spec

Every article in American Pie is built to the following exact specification. Deviation requires a specific documented reason. No exceptions.

### Frontmatter

```yaml
---
title: [The exact title as it appears in the archive]
era: [1-9]
date: [Month Year — the dateline of the primary journalism]
category: [Banking / Housing / Policy / Labor / Markets / Personal]
sections: 6
voice: [One of the six voices from Section 3]
publication: [The simulated publication name — e.g., "Associated Press" or "The Guardian"]
concepts: ["slug-1", "slug-2", "slug-3"]
related: ["article-slug-1", "article-slug-2", "article-slug-3"]
ticker_state: [calm / elevated / crisis / chaotic / still]
---
```

`ticker_state` drives the ticker behavior during this article. It is set at the article level and overrides the era default during reading. An article about the market bottom in Era 7 uses `still` even though the era default is `elevated`.

### Article Length and Screens

Articles are not constrained to a fixed screen count. The correct length is the length required to do the journalism. A Bear Stearns wire piece may warrant three screens. A long-form retrospective on the full 2008 arc may warrant eight or nine. The previous standard of exactly six screens was a scaffold. It has been retired.

**The minimum is three screens.** No article with fewer than three screens has enough room for a hook, the mechanics, and the behavior data. Articles below three screens are fragments, not articles.

**The practical target is four to seven screens for most articles.** Fewer screens mean richer individual screens. The goal is depth, not breadth. An article that covers one subject thoroughly in five screens is worth more than an article that covers one subject thinly in six.

**The `{{screen}}` delimiter is a page-flip moment, not a structural checkpoint.** It is placed where the journalism earns a pause — where the reader has absorbed something and is ready for the next movement. It is never placed to hit a number. The wrong reason to add a `{{screen}}` is "this article only has three screens." The right reason is "this is where the article takes its breath."

**Frontmatter `sections` field:** Set to the actual number of `{{screen}}` divisions in the article. This is the count the application displays in article metadata. It is informational.

### The Five Movements

Every article, regardless of screen count, passes through five movements. These are not one-screen-each. A movement may take one screen or two depending on the journalism's demands. The movements must all be present. Their order is fixed.

**Movement 1 — The Hook**
Opens in the publication's voice, mid-scene or mid-fact. Never with a definition. Never with context-setting. The first sentence contains one specific number, date, or proper noun that is alarming enough to demand the second sentence. This movement ends with a question the reader did not arrive with but cannot leave without answering.

No variable fields in this movement. No interactive elements. Pure journalism. The reader is not a participant yet. They are a reader.

**Movement 2 — The Mechanics**
The reader learns what they need to understand the rest of the article. The mechanics are embedded in journalism — a source explaining something, a data table being described, a sequence of events that requires the reader to understand a concept to follow it. The concept is never named as a lesson. It is narrated as context.

Variable fields may appear here if they are natural to the journalism (e.g., "At the median household income of ${{your_monthly_income}}, the calculation is as follows").

**Movement 3 — The Scale**
The reader now understands the mechanism. This movement shows them the scale. Numbers. Geography. How many households. Which sectors. Which states. The specific human and institutional dimensions of what the journalism is covering. This movement produces the transition from "this is interesting" to "this is real."

Variable fields appear here in comparison form — the reader's number alongside the historical number they have just been shown.

**Movement 4 — What People Did**
This is the most important movement in every article. It contains the behavior data — what households, institutions, or individuals actually did when faced with the situation the article describes. Not what experts recommended. Not what the theory prescribes. What actually happened.

This movement always contains the reveal block. The reveal separator `▸` appears after the first description of the predominant behavior (what most people did). What follows the reveal is what the households that preserved or gained the most did differently. Same events, same timeline, different decisions. The gap between before and after the reveal is the hidden lesson landing.

Ghost track archetypes appear in this movement. They are embedded as anonymous sources, case studies, or statistical abstractions.

**Movement 5 — The Residue**
The article ends the way great journalism ends: not with a conclusion, but with a fact or image that stays. Something specific. A number. A date. A name. A sentence that the reader will carry. This movement does not summarize. It does not draw lessons. It ends with the article's most consequential fact, stated plainly.

Optional: Three or four genuine connections to related articles in the archive, written as journalism — "the dynamic described above intersects with a separate phenomenon in the federal mortgage market, documented in [link]." Not a list. A paragraph that opens doors.

Optional: A single action-item sentence for articles with direct personal application. Written in the same journalistic voice. Never instructional. "The Bureau of Labor Statistics' unemployment insurance estimator calculates a household's expected benefit in under four minutes" is acceptable. "You should calculate your unemployment insurance estimate now" is not.

### The Reveal Block

The reveal is placed on Screen 4, after the description of the predominant behavior. It is never placed on any other screen. Its trigger text always follows the format: `▸ [specific description of what follows]`.

Correct: `▸ What the households that preserved the most capital in the eighteen months following Bear Stearns had in common`
Incorrect: `▸ Read more` or `▸ What you should do` or `▸ The lesson`

The text after the reveal is written in the same journalistic voice as the rest of the article. It does not address the reader. It presents the data of the behavior that produced better outcomes. The reader draws their own conclusion. The reveal is never a lecture. It is a document.

### See Also Integration

The left margin See Also block is populated by `renderSeeAlso()` from the application code. The article author does not control this directly. However, the article's frontmatter `era` value determines which ghost track entries appear. Authors must understand which archetypes are visible at their article's era and write Screen 4 so that the anonymous case studies in the text align with the See Also entries the reader will see in the margin.

[↑ Back to top](#table-of-contents)

---

## 5. The Placeholder Article Format — The Shell Standard

A shell article is a complete article that contains no final prose. Every screen exists. Every `{{screen}}` delimiter is in place. Every variable reference is present. Every image slot has its brief. But where the journalism belongs there is a structured placeholder block.

The placeholder block is not lorem ipsum. It is a production note — the same kind of note a film director leaves on a locked-picture edit before the final dialogue is recorded. The writer who fills the screen reads this note and knows exactly what to write.

### Placeholder Block Format

Every screen in a shell article that has not been written contains this block:

```
[PLACEHOLDER — Screen N]

PUBLICATION VOICE: [Exact voice from Section 3]
DATELINE: [City, Month Year]
PUBLICATION: [Simulated publication name]

EMOTIONAL TARGET:
[One paragraph describing exactly how the reader should feel at the end of this screen.
Not what they should know. How they should feel. "Mild dread at the gap between the
surface calm and what the reader knows is coming" is a target. "Understand that the
federal funds rate affects savings account yields" is not.]

CONTENT REQUIREMENTS:
[Bullet points describing what information must appear on this screen. These are
minimums, not outlines. The writer has full latitude within these constraints.]
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

HIDDEN LEARNING:
[The single financial concept this screen teaches, stated plainly, as the writer
needs to know it to embed it correctly. This never appears in the article text.]

GHOST TRACK INTEGRATION:
[If a household archetype appears on this screen: which archetype, in what form
— statistical, named source, anonymous case study — and what behavior they exhibit.
If no archetype appears: "None."]

TICKER STATE: [calm / elevated / crisis / chaotic / still]
[One sentence explaining why this screen drives that ticker state.]

IMAGE BRIEF:
[Or "None." If an image belongs on this screen, the full brief in the format
specified in Section 11.]

VARIABLE FIELDS:
[List any {{variable}} tokens that appear on this screen, with a note on how they
integrate into the surrounding prose.]

WHAT THIS SCREEN MUST NOT DO:
[The anti-drift constraints for this specific screen. Things that would seem plausible
but would break the voice, the illusion, or the emotional register.]

TRANSITION:
[The last sentence or image of this screen, and what question it must leave the
reader with to make them advance. Not a cliffhanger — an unresolved fact.]
```

[↑ Back to top](#table-of-contents)

---

## 6. The Emotional Arc — Era by Era, Screen by Screen

This is the master emotional map of the simulation. Every article must know where in this arc it falls. Articles that do not fit this arc do not belong in the simulation.

---

### Era 1 — January 2008: The Surface

**Emotional register:** False calm. The reader knows what is coming. The articles do not.
**Ticker default:** Static. The ticker barely moves. In calm eras it is almost indistinguishable from a caption line at the bottom of the page.
**What the reader should feel across Era 1:** The particular unease of knowing something is wrong before anyone admits it. Dramatic irony at full strength.
**Articles that belong here:** Emergency fund mechanics. Burn rate. Checking vs. savings account yields. Federal Reserve's January 2008 rate cut. Housing market data through Q3 2007.
**What the reader leaves Era 1 knowing** (without being told): Their own coverage days. The information gap between what they hold and what they need. The first crack in the surface — the Fed has already cut rates twice.

---

### Era 2 — March 2008: The First Crack

**Emotional register:** The speed of collapse. Something untouchable fell in a weekend.
**Ticker default:** Drifting. Barely perceptible movement. Walking pace. The ticker has woken up.
**What the reader should feel:** The specific shock of institutional collapse. Bear Stearns was, as far as most Americans knew, permanent. It is gone by Sunday night.
**Articles that belong here:** Bear Stearns collapse (AP wire voice). Prime brokerage and counterparty risk (WSJ analysis voice). The weekend the Fed guaranteed the JPMorgan acquisition (institutional document voice).
**What the reader leaves Era 2 knowing:** That the institutions they assumed were permanent are not. That the speed of collapse can outpace the news cycle. That the emergency fund calculation done in Era 1 has a new urgency.

---

### Era 3 — June 2008: The Quiet Summer

**Emotional register:** False recovery. The market bounced after Bear Stearns. Commentators suggested the worst was over. They were wrong.
**Ticker default:** Steady walking pace. Purposeful. Not urgent but not still.
**What the reader should feel:** The particular dread of a pause before something worse. The reader knows what is coming in September. The articles in Era 3 do not.
**Articles that belong here:** Housing foreclosure rates by state (local newspaper voice). Oil prices and their interaction with household expenses (WSJ analysis). The leverage decision that separates the two gambler archetypes (embedded in a case study on investment strategy circa mid-2008).
**What the reader leaves Era 3 knowing:** The leverage variable. That the pause was not recovery. The geographic distribution of the coming collapse.

---

### Era 4 — September 2008: The Floor Disappears

**Emotional register:** Vertigo. The largest bankruptcy in US history. A weekend. Monday morning is different from Friday afternoon.
**Ticker default:** Fast and erratic. Not chaotic yet but unmistakably urgent. Occasional stutter — a ticker item repeating before advancing.
**What the reader should feel:** The speed and scale simultaneously. Lehman is $600 billion. The speed is a weekend. The combination of those two things is the specific quality of this era.
**Articles that belong here:** Lehman Brothers bankruptcy filing (AP wire voice). The Merrill Lynch acquisition (WSJ analysis). AIG and the federal bailout (institutional document + WSJ hybrid). What a money market fund breaking the buck meant for ordinary depositors.
**What the reader leaves Era 4 knowing:** What systemic risk means in practice. That the government intervened in real time to prevent worse. That the gambler-lost archetype's position just became catastrophic.

---

### Era 5 — October–November 2008: The Machinery of Rescue

**Emotional register:** Surreal scale. Trillion-dollar numbers. The government as active participant in a drama that is still unresolved.
**Ticker default:** Chaotic. Text cuts off. Items repeat. Fragments appear. The ticker is showing what it feels like to be inside the news cycle at this moment.
**What the reader should feel:** The cognitive gap between the numbers being discussed (trillions) and the reader's own variables (thousands). Both are real. The distance between them is the specific surrealism of this era.
**Articles that belong here:** TARP legislation and the House vote (institutional document + AP hybrid). The FDIC problem institution list (institutional document voice). The specific week credit markets froze and what that meant for businesses that depended on thirty-day commercial paper.
**What the reader leaves Era 5 knowing:** The FDIC's $250,000 limit and what it protected and what it did not. That the machinery of rescue was functioning — imperfectly, expensively, in real time.

---

### Era 6 — December 2008–January 2009: The Long Winter

**Emotional register:** Dread settling into something slower and heavier. The human cost becomes visible. Unemployment claims. Foreclosure filings. The numbers that are not institutions but households.
**Ticker default:** Slow again but different from Era 1 calm. The pace is the pace of accumulating loss rather than the pace of nothing happening yet.
**What the reader should feel:** The shift from institutional crisis to human crisis. The specific weight of knowing the crisis is going to outlast the news cycle that covered it.
**Articles that belong here:** Unemployment rate hitting 7.2% in December 2008 (AP wire). Foreclosure filings by state Q4 2008 (institutional document). The recession officially declared retroactive to December 2007 (WSJ analysis). A local newspaper feature on a single family navigating unemployment — the Sandra archetype.
**What the reader leaves Era 6 knowing:** The 401k withdrawal math. What filing for UI within the first week versus three weeks later costs in real dollars. That the unaware archetype is now visible in the journalism in a way they were not before.

---

### Era 7 — February–March 2009: The Bottom

**Emotional register:** Stillness. The specific quiet of something catastrophic that has arrived completely.
**Ticker default:** Eerily slow. Almost stopped. The quality of the stillness is different from Era 1 — it is not the stillness of nothing happening yet, it is the stillness of something that has already fully arrived.
**What the reader should feel:** The weight of a bottom. The S&P at 676. The unemployment rate still climbing. The specific dread of not knowing you are at the bottom when you are there.
**Articles that belong here:** The S&P 500 closing at 676 on March 9, 2009 (AP wire, very short, very dry). Unemployment claims continuing to rise (institutional document). A Financial Times retrospective on the six months from Bear Stearns to Lehman to the bottom.
**What the reader leaves Era 7 knowing:** The precise date and number of the bottom. That almost nobody acted on it. The full comparison of the five archetypes at this exact moment.

---

### Era 8 — April–December 2009: The First Breath

**Emotional register:** Cautious. Fragile. Not relief — the first breath after something terrible, which is not the same as the end of it.
**Ticker default:** Steady. Measured. Finding its pace. Not slow, not urgent. Present.
**What the reader should feel:** The asymmetry between how fast things fell and how slowly they recover. The specific quality of a recovery that does not feel like one.
**Articles that belong here:** The market rising from the March 9 bottom (WSJ analysis). TARP repayments beginning (institutional document). The first month of declining unemployment claims — one month, not a trend yet.
**What the reader leaves Era 8 knowing:** What investing at the bottom would have returned by 2013 and by 2024. The compounding divergence between the five archetypes. The concept of dollar-cost averaging as it actually functioned in 2009 for the households that had the resources to deploy it.

---

### Era 9 — Present Mode: The Rearview Mirror

**Emotional register:** Clarity. The specific quality of understanding something fully that you did not understand while it was happening.
**Ticker default:** Present tense. Different register entirely. The content shifts to current data, current rates, the reader's own situation in the current year.
**What the reader should feel:** That the simulation was practice. That the concepts do not belong to 2008. That they are in play right now, for the reader, with the reader's actual numbers.
**Articles that belong here:** Current emergency fund mechanics (same structure as Article 1 but with current rates and the reader's real variables). High-yield savings account comparison tools. UI estimators. Brokerage comparison for an investor starting today.
**What the reader leaves Era 9 knowing:** Everything they learned in 2008, translated into their present-tense situation. The difference between then and now is not conceptual. It is numerical.

[↑ Back to top](#table-of-contents)

---

## 7. The Hidden Curriculum — What Each Article Teaches

The following is the map of what each article teaches. This information appears in no article. It is the author's working knowledge. The concepts are embedded in the journalism, never stated as lessons.

| Article | What it teaches | How it's embedded |
|---|---|---|
| Emergency Fund | Coverage days calculation; the gap between liquid savings and actual runway | The median household statistic makes the reader calculate their own |
| Burn Rate | The precision of monthly expenses; the cost of estimation | The source describing why approximation fails |
| Checking vs Savings | Yield differential; opportunity cost of inaction | The $315 calculation embedded in a piece about savings account policy |
| Unemployment Insurance | Filing timing; benefit calculation; the four-week delay | Sandra's story; the Senate testimony excerpt on claim processing times |
| Bear Stearns | Liquidity risk; what a bank run looks like from outside; counterparty exposure | The timeline of Friday to Sunday makes liquidity visceral without defining it |
| Mortgage-Backed Securities | Securitization; risk distribution; why ordinary people held these without knowing | The dollar of mortgage payment traced through the chain |
| Fed Rate Decisions | The Fed funds rate's effect on savings yields; the signal embedded in emergency cuts | The rate table; the gap between what the cuts signaled and what the public heard |
| Housing Market Peak | Lagging indicators; the gap between data and public perception | The July 2006 date introduced before the 2008 consequences |
| Lehman Bankruptcy | Systemic risk; the weekend timeline; what bankruptcy means for counterparties | The conference room scene; the 26,000 employees number |
| TARP | Government intervention mechanics; moral hazard; the scale of the rescue | The House vote; the institutional document voice making $700 billion feel bureaucratic |
| FDIC Insurance | Deposit insurance limits; what "problem institution" classification means | The table of 171 institutions; the reader's own cash balance in the margin |
| 401k Withdrawals | Early withdrawal penalty; opportunity cost of liquidating long-term holdings | The $10,000 / $6,500 / $29,000 calculation |
| The Market Bottom | Entry point; the psychology of buying at the bottom; dollar-cost averaging | The specific date and price; what the households that bought held by 2013 |
| Unemployment Rate 2009 | Labor market lag; the human cost dimension; the geography of unemployment | The local newspaper voice; specific counties; specific sectors |
| Recovery and Divergence | Compound interest; the full 18-year comparison; present-tense application | The five-archetype comparison table; the reader's own projected trajectory |

[↑ Back to top](#table-of-contents)

---

## 8. Ghost Track Integration — How Household Archetypes Appear in Journalism

The five household archetypes are the backbone of the simulation's narrative. They are never named, never introduced, never called "Ghost Tracks" anywhere in the reader-facing product. They appear as journalism appears — as sources, statistics, case studies, and anonymized data points.

### The Five Archetypes and Their Journalistic Masks

**Archetype 0 — The household that built runway early.**
Appears as: A Federal Reserve Survey of Consumer Finances statistical outlier. "Among households in the lowest income quartile with liquid savings exceeding ninety days of expenses — approximately 12 percent of that cohort in 2007..."
First appearance: Era 1, Screen 4 of the Emergency Fund article. The data point that sits in the See Also margin as "The position one household carried entering 2008."
Emotional function: The specific envy the reader feels for something so simple they almost missed it.

**Archetype 1 — The household that weathered it.**
Appears as: A background source in a local newspaper piece. "One household in the survey, a dual-income family in suburban Cleveland whose primary earner was laid off in October 2008, reported reducing discretionary spending by forty percent within the first week and filing for unemployment insurance the same day as the layoff notice."
First appearance: Era 2, Screen 4 of the Bear Stearns article. In the See Also margin as "What the same news meant for a second balance sheet."
Emotional function: The recognition that correct behavior was available. That it was not extraordinary. That it was available to anyone who knew the mechanics.

**Archetype 2 — The household that was unaware.**
Appears as: The most common case in every statistical table. The median. The average. This archetype is not a source — they are the number. "The median household held fewer than thirty days of liquid savings in Q4 2008."
First appearance: Era 1, implied throughout. Named in See Also from Era 3 onward.
Emotional function: The quiet horror of recognizing yourself in the average. This archetype's appearance is always statistical, never named. The reader finds themselves in it.

**Archetype 3 — The household that gambled and lost.**
Appears as: A bankruptcy filing. A Senate testimony exhibit. "Exhibit 14: A portfolio of leveraged positions in financial sector equities, initiated March 2008, valued at $142,000 at initiation, with an estimated current value of $11,400 as of the date of the filing."
First appearance: Era 3, Screen 4 reveal. One line. A date and a number. The See Also expansion shows the leverage entry. The reader will look for this archetype in subsequent articles.
Emotional function: The one that teaches leverage. The reader will feel the loss before they understand why it was different from the winning gambler.

**Archetype 4 — The household that gambled and won.**
Appears as: A single sentence in an institutional survey footnote. "Among households that purchased broad equity index positions in Q1 2009, median portfolio value as of December 2010 represented a 78 percent gain from cost basis." This archetype is never romanticized. The win is presented with the same bureaucratic distance as the loss.
First appearance: Era 7, Screen 4 reveal. After the losing gambler has already appeared three times. The juxtaposition is the lesson.
Emotional function: Gleeful complicity (see Bible 1, Lever 3). Then the guilt of the complicity. Then the question: what was the actual variable? The answer is leverage and timing — not courage or insight.

### Rules for Writing Archetypes into Journalism

1. Each archetype appears in only one form per article — statistical, source, or case study. Never all three.
2. The form rotates across articles. An archetype that appeared as a statistic in the last article appears as a source in the next.
3. The detail level increases across eras. In Era 1 an archetype is a single data point. By Era 7 they have a balance sheet and a filing date.
4. The reader should be able to track the archetypes without ever being told they are there. If the reader can only track them by looking at the See Also entries, the journalism is not doing its job. The journalism should make the pattern visible before the margin confirms it.

[↑ Back to top](#table-of-contents)

---

## 9. Ticker Behavior — The Pressure Gauge Spec

The ticker is the room. Its state is set by the `ticker_state` field in the article frontmatter. It has five states.

### The Five States

**`calm`** — Text does not move for the first thirty seconds after the article loads. Then it begins to drift, imperceptibly slowly, left. The reader may look at it twice before registering that the text has moved at all. The drift speed is 80 seconds per full cycle. The ticker content in this state is dry, factual, dated: era-appropriate historical data in AP wire style with no urgency.

**`elevated`** — Text is moving at a walking pace from the moment the article loads. 45 seconds per full cycle. The content is slightly more urgent — market data, rate announcements, headlines with numbers. The reader notices it moving without being startled by it.

**`crisis`** — Text moves at 20 seconds per full cycle. Still legible. The reader can read individual items but must pay attention to do so. Content is breaking-news style. Short, factual, alarming in aggregate. Individual items are each individually plausible but the pace makes the accumulation feel out of control.

**`chaotic`** — The ticker is not reliably linear. Items repeat. An item appears that appears to be mid-sentence. A number appears without context. A ticker item cuts off before its sentence ends. The visual effect is of a system that is receiving more input than it can process. This state appears exclusively during Era 4 and 5 articles and recovers to `elevated` at the end of the article.

**`still`** — The ticker stops. Not paused — stopped. The content present when it stopped remains on screen. This is used for the market bottom article (Era 7). The stillness is the point. The ticker should not restart until the reader advances past Screen 3 of that article.

### The Three Zones

The ticker strip has three invisible interaction zones across its full width. No zone is visually distinguished. The division is interaction-only.

**Left zone (22% of width):** Controls — theme toggle, audio toggle. Invisible until hover. Tooltip rises on hover listing available actions. Click activates. Click again changes.

**Middle zone (56% of width):** The scrolling text lives here. Click anywhere in the middle zone to pause. Cursor changes to pause symbol on hover. Click again to resume. No other affordance.

**Right zone (22% of width):** Additional controls — source view, worksheets, settings. Same hover-to-reveal behavior as left zone.

### Ticker Content by Era

Each era has an array of ticker items. The items are written in the journalistic voice of the era — AP wire style, short, factual, dated. In calm eras the items are routine financial data. In crisis eras they read like a newswire that has more incoming than it can display. The specific content for each era is defined in `data.js` under `ERA_TICKER_CONTENT`.

The ticker item format: `[Month Year] · [Fact or headline, one sentence, no editorializing]`

Example calm era items: `Jan 2008 · Fed funds rate cut to 3.5% — second reduction in nine days · FOMC statement cites deteriorating credit conditions`

Example crisis era items: `Sept 15 2008 · Lehman Brothers files Chapter 11 · $639B in assets · Largest bankruptcy in US history` — and thirty seconds later: `Sept 15 2008 · Merrill Lynch agrees to acquisition by Bank of America · $50B · Deal reached Sunday night`

The crisis era items are not more dramatic in language. They are more frequent and the facts themselves are more alarming. The register stays flat throughout. The flat register during catastrophic facts is the technique.

[↑ Back to top](#table-of-contents)

---

## 10. Title and Headline Standards

The title of an article is not editorial copy. It is the title of a document in an archive. It should read like a headline from the publication in whose voice it is written, from the year in which it is dated.

### The Test

A good American Pie title passes this test: if you removed the article and left only the title, it would feel like a real document that belongs in a 2008 research folder. It would not feel like it was written to make you click.

**The clickbait quality is the quality of the real subject, not of the writing.**

The Bear Stearns collapse is genuinely more dramatic than most fiction. A title that captures what actually happened is genuinely clickbait. You do not need to manufacture urgency. You need to not suppress it.

### Title Formats by Voice

**AP Wire:** `[Institution] [Verbs]: [One Fact]`
Example: `Bear Stearns Acquired by JPMorgan for $2 a Share`

**WSJ Analysis:** `How [Thing] [Consequence] — and What It Meant for [Group]`
Example: `How the Repo Market Froze in September 2008 and What That Meant for Companies With Commercial Paper Due the Following Week`

**Local Newspaper:** `[Human Subject's situation, specific city]`
Example: `In Columbus, the Layoffs Arrived Before the Word "Recession" Did`

**British/International Press:** `[American Phenomenon] as [External Perspective]`
Example: `The American Emergency Fund: A Standard That Half the Country Did Not Meet`

**Institutional Document:** `[Agency/Program]: [Report Title], [Quarter/Year]`
Example: `FDIC Quarterly Banking Profile: Third Quarter 2008`

**Long-Form Feature:** `[Scene-Setting Phrase]: [What It Revealed]`
Example: `The Weekend Nobody Slept: Inside the Federal Reserve's Decision to Backstop JPMorgan's Bear Stearns Acquisition`

### What a Title Must Never Do

- Use "you" or imply direct reader address
- Use adjectives like "shocking," "stunning," "incredible," or "devastating"
- State the lesson the article teaches
- Use a question as a title (questions in titles are the single most reliable signal of manufactured clickbait)
- Be vague enough to belong to any article rather than this specific one

[↑ Back to top](#table-of-contents)

---

## 11. Image Brief Standards

Every image slot in the application produces a placeholder frame when unpopulated. The placeholder frame contains a brief that tells the user exactly what image should go there.

### The Brief Format

```
BRIEF
Type: [photograph / editorial illustration / archival scan / data chart / map]
Subject: [Exactly what is shown — specific, visual, physical description]
Era: [Year and season]
Tone: [The emotional register — calm, concentrated, stark, surreal, documentary]
Technical: [Color or black and white. Grain level. Crop. Any specific framing notes.]
Source guidance: [AP archive / Getty historical / editorial illustration commission / public domain federal archive]
What not to show: [Specific exclusions that would break the tone or the illusion]
```

### Examples

**Emergency Fund, Screen 1:**
```
BRIEF
Type: editorial illustration
Subject: A clock face where the hands show 47 minutes past midnight. The clock face
  is printed on what appears to be a household budget spreadsheet, visible underneath
  the clockface as the paper. The numbers on the clock face are the months of 2008.
Era: 2007-2008
Tone: Calm. The unease comes from the concept, not from any visual drama.
Technical: Black ink on off-white. No color. No grain. Clean line.
Source guidance: Original editorial illustration — this image does not exist in
  any archive. Commission required.
What not to show: Any face. Any expression. Any visual indicator of distress.
```

**Bear Stearns, Screen 1:**
```
BRIEF
Type: photograph
Subject: The exterior of 383 Madison Avenue, New York — the Bear Stearns headquarters
  building — on a weekday morning. Normal foot traffic. The sign is visible. Nothing
  about the photograph indicates what happened inside over the preceding weekend.
Era: March 2008
Tone: Documentary. The normalcy of the exterior is the point.
Technical: Color acceptable. Sharp focus. Wide enough to show the street context.
Source guidance: AP archive, Reuters, Getty — March 16-17, 2008 date range.
What not to show: Employees carrying boxes. Any visual cliché of institutional collapse.
```

**Market Bottom, Screen 1:**
```
BRIEF
Type: data chart
Subject: The S&P 500 from January 2007 to December 2009. The chart ends on the
  March 9, 2009 bottom at 676. The bottom is marked with a single vertical line
  and the number. No other annotation.
Era: March 2009
Tone: Documentary. The data is the image. No editorial framing.
Technical: Black line on white. No color. The line ends — it does not continue
  into the recovery. The reader does not yet know the recovery is coming.
Source guidance: Reproduce from public domain federal data. No commercial source needed.
What not to show: The recovery. Any upward movement after March 9.
```

### Theme-Aware Image Treatment

When an image is embedded it receives a CSS filter based on the active theme.

**Encyclopedia theme filter:** `saturate(85%) brightness(103%) contrast(105%)`
Slight desaturation, slightly lifted, clean. The photograph looks like it belongs in a reference work.

**Newspaper theme filter:** `grayscale(80%) sepia(30%) contrast(115%) brightness(92%)`
Near-grayscale with warm undertones. The photograph looks like newsprint reproduction. Strong edges. Slightly compressed tonal range.

The filter is applied automatically. The user sources one image. Both themes handle it correctly if the original image is high-contrast enough to read in near-grayscale. This is the single most important sourcing criterion: does it read in black and white?

[↑ Back to top](#table-of-contents)

---

## 12. Variable Integration — Where Editable Data Appears

Variables appear in article text as `{{variable_name}}`. When rendered they display the current value with a faint gray underline — the notebook-edit affordance. Click to edit in place. Enter or blur to save. All articles recalculate instantly.

### Variable Placement Rules

1. Variables appear on Screen 2 and Screen 3 only. Never on Screen 1 (the hook must be pure journalism). Never on Screen 5 (the connections screen is an invitation, not an analysis). Screen 6 is the residue — it may reference a variable in prose but does not display an editable field.

2. A variable appears in its natural journalistic context. "At {{your_monthly_expenses}} per month, the coverage calculation is as follows" is correct. A standalone line that says only `{{your_monthly_expenses}}` is not.

3. Calculated variables — `coverage_days`, `income_gap`, `covered_months_with_ui` — are never editable. They are displayed with their calculation shown inline. The calculation is the journalism.

4. Mock values are seeded from `data.js` variables configuration. The mock values are chosen to be representative of the median American household in 2008. They are not alarming enough to feel contrived and not comfortable enough to feel safe. The mock emergency fund gives approximately 100 days of coverage — enough to be technically adequate and not enough to be clearly correct.

### The Editing Experience

The variable field looks like pencil on paper. No border. No background. No placeholder hint text. The current value is displayed in the article's typeface, at the article's size, with a single underline that is 40% opacity of the text color. On hover the underline darkens to 70%. On click the value becomes a text input with the same styling — the user types over the existing value. The only indication that editing is active is the cursor change to text and the underline at full opacity.

Saving: on blur or Enter key. The value propagates instantly. Every dependent calculated variable updates on screen without reload.

[↑ Back to top](#table-of-contents)

---

## 13. UI and Design Standards

### The Two Themes

**Encyclopedia — Wikipedia 2001**
Every element of this theme is derived from the visual language of Wikipedia as it existed in approximately 2001-2003. This is not a reference to or homage to Wikipedia. It is the exact aesthetic: the fonts, the link colors, the sidebar structure, the article layout. A reader familiar with early Wikipedia should feel ambient recognition, not novelty.

Typography:
- Body text: `Georgia, "Times New Roman", serif` — the exact serif stack Wikipedia used
- Sidebar labels, metadata, navigation: `Arial, Helvetica, sans-serif` — the exact sans stack
- Monospace/data: `"IBM Plex Mono", "Courier New", monospace`
- Link color: `#0645ad` (unvisited), `#0b0080` (visited) — Wikipedia's exact values
- Body text size: 14px (Wikipedia's 2001 default)
- Line height: 1.5

Layout:
- Left sidebar: 160px fixed width. Wikipedia 2001's exact sidebar width.
- Content area: fills remaining width with a max of approximately 900px for the article column
- No rounded corners anywhere
- No shadows
- Rules are 1px solid `#a2a9b1` (Wikipedia's border color)
- Background: `#f8f9fa` (Wikipedia's article background)

**Newspaper — 1950s Broadsheet**
Every element derived from the visual language of a British or American broadsheet newspaper circa 1950-1960. Masthead blackletter. Column grid. Rules between columns. Headlines in a heavy condensed serif.

Typography:
- Masthead title: `"UnifrakturMaguntia", serif` — genuine blackletter
- Banner headlines: `"Playfair Display", "Georgia", serif` — ExtraBold weight, large
- Subheadlines/deck lines: `"Playfair Display", serif` — italic, normal weight
- Body column text: `"IM Fell English", "Georgia", serif` — designed to read like pre-1900s print
- Section labels: `"Libre Baskerville", serif` — small caps, bold
- Bylines: italic, same as body but smaller
- Background: `#f5f0e8` — aged newsprint cream
- Text: `#1a1a1a` — near-black, not pure black (newsprint was never pure white)

Layout:
- Full-width masthead with ruled borders
- Three-column grid for home screen
- Two-column layout for article screens (TOC/sidebar left, content right)
- Column rules: 1px solid `#2b2b2b`

### Layout Rules

**Left Sidebar** (both themes):
- Present on every screen
- Contains: navigation, simulation year controls, theme toggle, audio toggle, In This Article (article screens only), See Also (article screens only)
- Width: 160px (Encyclopedia), 180px (Newspaper)
- Position: fixed left, full height, no scroll

**Ticker Strip** (both themes):
- Height: 28px
- Sits at the absolute bottom of the viewport
- Encyclopedia: same background as page, 1px top rule
- Newspaper: slightly darker cream, 2px top rule in `#2b2b2b`
- Text: 11px, monospace, 60% opacity of body text color
- Three zones as specified in Section 9

**Article Content Area**:
- No side padding on mobile
- 24px padding on desktop
- Article body max-width: 680px for readability
- Images float within the column, right-aligned by default, width 35-40% of column
- Section heading: `##` renders as the publication's article section style

**No element in this application should require a tooltip to understand its function if you have been reading for more than two minutes.** The interface teaches itself through use. The controls that are hidden until hover (ticker zones) are hidden because they are advanced — not because they are primary. The primary actions are always visible.

### Navigation and Motion — The Layered Canvas Model

The application has one screen. Not the illusion of one screen — actually one screen. The ticker strip is a permanent fixture. The chrome frame (sidebar, dateline, overall structure) is a permanent fixture. Only the content layer moves, and what it does depends on what kind of navigation is happening.

**Within an article — the page-flip:**
When the reader advances from one screen to the next within the same article, only the article text canvas moves. It slides downward — a vertical translation, as if a new page is being revealed beneath the current one. The article toolbar (title, breadcrumb, meta line) remains in place. The section indicator updates in place without motion. The ticker stays. The margin stays. Nothing outside the text canvas changes.

This is not scroll. The reader does not drag or swipe. They advance — the same gesture that turns a page — and the canvas responds. The motion takes approximately 250ms. It is fast enough that it does not feel like an animation; it feels like the page reacting.

**Between articles — the horizontal slide:**
When the reader navigates to a different article, the content region slides out horizontally and the new article slides in from the same direction. The ticker stays anchored at the bottom throughout. The dateline header stays. The sidebar stays. Only the main content column moves.

The direction of the slide is consistent: forward in the simulation sequence moves right-to-left (the new article enters from the right). Backward navigation reverses this. Navigation that is not sequential — jumping via a concept link or See Also — uses the same right-to-left convention as forward movement.

**View transitions (home, clarity, ghost tracks):**
These are not article-to-article transitions. They are context switches. They use a fade — a 150ms opacity change — rather than a directional slide. The ticker always remains. The dateline always remains.

**What never moves:**
- The ticker strip
- The dateline header
- The sidebar navigation and controls
- The section indicator (it updates in place)
- The article toolbar when advancing within an article

**The principle:** The reader should never feel like the entire screen has changed. Something has changed — the text, the content — but the room has not. The ticker is still there. The brand is still there. They have turned a page, not walked into a different building.

This model is not optional. Every navigation interaction in the application must respect it. A new view type that requires a full-screen replacement breaks the illusion and is not acceptable.

[↑ Back to top](#table-of-contents)

---

## 14. The First Fifteen Articles — Shell Map

These are the articles that constitute the complete simulation experience. Each entry specifies the article's place in the arc, the publication voice, the emotional target, and the hidden curriculum. Shell articles for the feature branch follow this map exactly.

| # | Title | Voice | Era | Emotional Target | Hidden Curriculum |
|---|---|---|---|---|---|
| 1 | Emergency Fund | WSJ Analysis | 1 | The specific unease of a number you have never calculated | Coverage days; the gap between estimated and actual runway |
| 2 | Burn Rate | WSJ Analysis | 1 | The cost of approximation | Monthly expense precision; how a 10% error compounds |
| 3 | Checking vs Savings | British Press | 1 | The specific regret of inaction that required no money | Yield differential; the $315 that required no behavior change |
| 4 | Unemployment Insurance | Local Newspaper | 1 | The machinery of the safety net and its timing | Filing date mechanics; the four-week processing delay |
| 5 | Bear Stearns Acquired by JPMorgan | AP Wire + Long-Form | 2 | The speed of institutional collapse | Liquidity risk; counterparty exposure; what a bank run looks like |
| 6 | The Federal Reserve's Rate Decisions, 2007-2008 | Institutional Document | 2 | The signal embedded in the seven cuts | Fed funds rate and its effect on savings yields; what emergency cuts signal |
| 7 | Mortgage-Backed Securities | WSJ Analysis | 2 | The machinery underneath; understanding it makes everything worse | Securitization; why ordinary people held these without knowing |
| 8 | US Housing Market: Peak to Trough | British Press | 3 | The lag between data and public knowledge | Leading vs lagging indicators; the July 2006 peak |
| 9 | Foreclosure Rates by Geography, Q2 2008 | Local Newspaper | 3 | The geographic distribution of the coming collapse | Foreclosure mechanics; the specific counties and sectors |
| 10 | Lehman Brothers Holdings Inc. Files Chapter 11 | AP Wire | 4 | The largest bankruptcy in US history, described with bureaucratic calm | Systemic risk; what Chapter 11 means for counterparties |
| 11 | The Emergency Economic Stabilization Act (TARP) | Institutional Document | 5 | The surreal scale of the rescue | Government intervention mechanics; moral hazard; the $700B number |
| 12 | FDIC Quarterly Banking Profile: Q3 2008 | Institutional Document | 5 | 171 institutions; $115.6 billion; the number that was not in the news | Deposit insurance; problem institution classification; the $250K limit |
| 13 | Early 401(k) Withdrawals During the 2008 Crisis | WSJ Analysis | 6 | The $10,000 that became $6,500 that would have been $29,000 | Early withdrawal penalty; opportunity cost; the 2013 recovery |
| 14 | Unemployment Claims: The 2008-2009 Surge | AP Wire + Local Newspaper | 6 | The human cost, measured in weekly claims | Labor market lag; the difference in outcomes based on filing date |
| 15 | The S&P 500 Closes at 676: March 9, 2009 | Long-Form Feature | 7 | The bottom, in real time; nobody knew it was the bottom | Entry point psychology; what the households at the bottom held by 2013 |

[↑ Back to top](#table-of-contents)

---

## 15. Anti-Drift Checklist

Before any article, UI component, or design element is added to the simulation, run this checklist. A single "no" answer requires revision before the element is included.

### Content Checklist

- [ ] Does the article read as journalism, not as financial education?
- [ ] Does the article open with a specific fact, number, or scene — not a definition?
- [ ] Does the article use second-person "you" in an instructional context? (Must be no.)
- [ ] Is the financial concept this article teaches invisible as a concept — embedded in the journalism?
- [ ] Does Screen 4 contain the behavior data (what most people did)?
- [ ] Does the reveal block describe what produced better outcomes without editorializing?
- [ ] Does the reveal text address the reader? (Must be no.)
- [ ] Are the ghost track archetypes embedded in journalistic forms (statistics, sources, case studies)?
- [ ] Are the ghost track archetypes labeled or introduced? (Must be no.)
- [ ] Does the title read like a real headline from a real publication in the article's voice?
- [ ] Does the title use "you," "your," or a direct question? (Must be no.)
- [ ] Is the article's publication voice consistent across all six screens?
- [ ] Do variable fields appear only on Screen 2 and Screen 3?
- [ ] Does Screen 6 end with a specific fact, not a summary or lesson?

### Article Architecture Checklist

- [ ] Does the article have at least three screens?
- [ ] Is each `{{screen}}` delimiter placed where the journalism earns a pause — not to hit a number?
- [ ] Are all five movements present: Hook, Mechanics, Scale, What People Did, Residue?
- [ ] Is the reveal block in Movement 4?

### UI Checklist

- [ ] Does the new component look like it belongs in a 1953 broadsheet or a 2001 encyclopedia?
- [ ] Does the component draw attention to itself as software?
- [ ] Does any new label or tooltip address the reader instructionally? (Must be no.)
- [ ] Is the ticker behavior correct for the article's `ticker_state` value?
- [ ] Are the three ticker zones interaction-only (no visual distinction)?
- [ ] Do new navigation elements maintain the archive illusion?
- [ ] Does the sidebar contain any element that looks like an app feature? (Must be no.)

### Navigation and Motion Checklist

- [ ] Does within-article navigation (screen to screen) use a downward canvas slide only?
- [ ] Does between-article navigation use a horizontal slide only?
- [ ] Does the ticker remain anchored during all navigation events?
- [ ] Does the dateline header remain anchored during all navigation events?
- [ ] Does the article toolbar remain in place during within-article navigation?
- [ ] Does any new transition require the full screen to replace itself? (Must be no.)
- [ ] Do view transitions (home, clarity, ghost tracks) use a fade rather than a slide?

### Section Editing Checklist

- [ ] Is edit mode inaccessible via any reader-facing gesture?
- [ ] Are the section affordances (drag handle, upload, export) invisible until hover in edit mode?
- [ ] Does the article remain fully readable while in edit mode?
- [ ] Does section replacement trigger link-manifest resolution automatically?
- [ ] Does section replacement update only content — not frontmatter? (Must be yes.)
- [ ] Does the exported section filename follow the `[article-slug]-section-[n].md` convention?

### Image Checklist

- [ ] Does the image read clearly in near-grayscale?
- [ ] Does the image brief specify what not to show as well as what to show?
- [ ] Does the image avoid visual clichés of the financial crisis genre?
- [ ] Does the editorial illustration commission (if applicable) avoid any human face?

[↑ Back to top](#table-of-contents)

---

## 16. The One Question

Bible 1 ended with a one rule. Bible 2 ends with a one question. Every element added to this product — every sentence, every component, every image, every interaction — must be able to answer it.

**If the reader never knew this was designed to teach them something, would this element make them want to keep reading?**

If the answer is yes, the element belongs. If the answer is no — if the element only makes sense as a teaching tool, if it would not survive in a publication that was not trying to educate anyone — then it does not belong in American Pie.

The simulation is not a financial education tool that has been made to look like an archive.

It is an archive that teaches, the way all great archives teach: by being so complete, so specific, and so honest about what actually happened that the reader cannot leave without understanding why.

[↑ Back to top](#table-of-contents)

---

---

## 17. The Section Editing System — Authoring from the UI

Every section in every article is a plug-and-play unit. The reader never sees the editing layer. The author never needs to touch a markdown file to update content. The two audiences see the same article through completely different interfaces — one is a reading environment, one is an authoring environment — and neither interferes with the other.

### What a Section Is

For authoring purposes, a section is any block of content delimited by a `{{screen}}` marker in the article's markdown. Each section is treated as an independent, replaceable unit. The article is an ordered collection of sections. Sections can be replaced, reordered, or removed without affecting the others.

### The Four Authoring Operations

Every section — regardless of type (text block, image slot, reveal block, variable section, concept-link paragraph) — supports the same four operations:

**Drag and drop:** A file (markdown fragment, image, plain text) dragged onto a section replaces it. The drop target highlights when a valid file is dragged over it. Release drops the new content in. The application parses the incoming content, identifies any embedded links, updates their targets, and renders the updated section in place. No save button. No confirmation. The change is visible immediately and written to the article file.

**Copy and paste:** Paste anywhere within a section's active editing zone to replace the section's content. The application accepts plain text, markdown, or an image from the clipboard. Same link-parsing and render logic as drag and drop.

**Upload:** A per-section upload affordance (invisible until the section is in edit mode) opens the system file picker. Selected file replaces the section content. Same parsing and render logic.

**Export:** A per-section export affordance (same visibility rule) downloads the section's current content as a markdown fragment. The filename is `[article-slug]-section-[n].md`. The exported file can be edited externally and re-imported via drag and drop or upload.

### Link-Aware Replacement

Sections contain embedded links — concept links, article cross-references, See Also targets. When a section is replaced, the application scans the incoming content for any link targets (slugs, article references) and compares them against the manifest. Valid targets are rendered as live links. Invalid targets are rendered as plain text with a faint indicator that the link is unresolved.

The author does not need to manually update link syntax. If the new section contains `→ **Mortgage-backed securities**` in the expected format, the application resolves it against the manifest and renders it as a live concept link automatically. Swapping a section never requires manually updating the surrounding application state.

### Edit Mode

Sections are not editable by default in the reader-facing view. Edit mode is toggled per-session — it is an authoring context, not a reader feature. In edit mode, each section gains a faint border and a small affordance strip (drag handle, upload icon, export icon) that appears on hover. The article remains fully readable in edit mode; the affordances are additive, not disruptive.

Edit mode is never accessible via a reader-facing gesture. It requires a deliberate authoring action (a keyboard shortcut or a URL parameter) to activate. The reader can never accidentally enter it.

### What Does Not Change

The application's rendering pipeline — variable substitution, reveal blocks, ghost track archetypes, ticker state — is driven by the article's frontmatter and the content of each section. Replacing a section's content updates what is displayed. Replacing a section's content does not change the article's frontmatter. If the new section content changes the ticker state for a given screen, the author must update the frontmatter `ticker_state` field separately. The editing system is for content, not for metadata.

[↑ Back to top](#table-of-contents)

---

## 18. UI Mockups — Reference Layouts

These are static ASCII mockups of key screens. They are canonical in structure and proportion. They are not canonical in content — the text shown is placeholder. The layouts, column widths, sidebar positions, and ticker behaviors shown here are the target.

---

<details>
<summary><strong>Home — Encyclopedia Theme — Era 1 (Calm, January 2008)</strong></summary>

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [American Pie wordmark — Georgia bold]   The Free Financial            │
│                                            Encyclopedia · Jan 2008      │
├─────────────────────┬───────────────────────────────────────────────────┤
│  NAVIGATION         │  From American Pie, the free financial            │
│  ─────────────────  │  encyclopedia. [Era 1 of 9 · 2,847 articles]     │
│  Main Page          │  ─────────────────────────────────────────────── │
│  My Situation       │                                                   │
│  Simulation         │  ┌──────────────────────────┐  ┌───────────────┐ │
│  Learn              │  │ ★ FEATURED ARTICLE        │  │ IN THE NEWS   │ │
│  Clarity       [0]  │  │ ─────────────────────────│  │ ────────────  │ │
│                     │  │ ┌─────────────────────┐  │  │               │ │
│  ─────────────────  │  │ │  [IMAGE PLACEHOLDER] │  │  │ · Emergency   │ │
│  SIMULATION YEAR    │  │ │  BRIEF: Quiet 2007   │  │  │   Fund Levels │ │
│  [2008]  [Present]  │  │ │  suburban street.    │  │  │   Below 30    │ │
│                     │  │ │  For Sale sign,      │  │  │   Days for    │ │
│  ─────────────────  │  │ │  barely visible.     │  │  │   Half of US  │ │
│  READ IN            │  │ │  Calm surface.       │  │  │   Households  │ │
│  Encyclopedia ✓     │  │ └─────────────────────┘  │  │               │ │
│  Newspaper          │  │                           │  │ · Fed Cuts    │ │
│                     │  │  Emergency Fund Levels     │  │   Rates to    │ │
│  ─────────────────  │  │  Below 30 Days for Half   │  │   3.5% — 2nd  │ │
│  ♪  Audio  [off]    │  │  of US Households         │  │   Cut in Nine │ │
│                     │  │                           │  │   Days        │ │
│  ─────────────────  │  │  By late 2007 the Federal │  └───────────────┘ │
│  TOOLS              │  │  Reserve's own survey      │                   │
│  Source view        │  │  data showed...           │  ┌───────────────┐ │
│  Worksheets         │  │  Read more →              │  │ DID YOU KNOW? │ │
│                     │  └──────────────────────────┘  │ ────────────  │ │
│                     │                                 │               │ │
│                     │  ON THIS DAY — January 22, 2008 │ · 57% of US   │ │
│                     │  The Federal Reserve cut rates  │   households  │ │
│                     │  by 75 basis points in an       │   had no      │ │
│                     │  emergency inter-meeting        │   liquid      │ │
│                     │  action — the largest single    │   emergency   │ │
│                     │  cut since 1984.                │   fund in     │ │
│                     │                                 │   2008.       │ │
│                     │  ─────────────────────────────  │               │ │
│                     │  Simulation worksheet · Snapshot│ · Avg hh lost │ │
└─────────────────────┴─────────────────────────────────┴───────────────┘
 Jan 2008 · Fed funds rate: 3.5% · Housing index down 8.4% YoY
 [Left zone: hover for controls]  [Middle: click to pause]  [Right: hover]
```

**Ticker state:** `calm` — barely drifting. Text almost static.
**Sidebar:** Navigation + controls always visible. No article TOC (home screen).
**Featured article:** Normal article that someone found interesting enough to save. Not front-page crisis.

</details>

---

<details>
<summary><strong>Home — Encyclopedia Theme — Era 4 (Crisis, September 2008)</strong></summary>

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [American Pie wordmark]          The Free Financial Encyclopedia       │
│                                   · September 2008                     │
├─────────────────────┬───────────────────────────────────────────────────┤
│  NAVIGATION         │  From American Pie · Era 4 · September 15, 2008  │
│  ─────────────────  │  ─────────────────────────────────────────────── │
│  Main Page          │                                                   │
│  My Situation       │  ┌──────────────────────────┐  ┌───────────────┐ │
│  Simulation         │  │ ★ FEATURED ARTICLE        │  │ IN THE NEWS   │ │
│  Learn              │  │ ─────────────────────────│  │ ────────────  │ │
│  Clarity      [14]  │  │ ┌─────────────────────┐  │  │               │ │
│                     │  │ │  [IMAGE PLACEHOLDER] │  │  │ · Merrill     │ │
│  ─────────────────  │  │ │  BRIEF: 745 Seventh  │  │  │   Lynch Sold  │ │
│  SIMULATION YEAR    │  │ │  Ave exterior, Sept  │  │  │   to Bank of  │ │
│  [2008]  [Present]  │  │ │  15, 2008, 6 AM.     │  │  │   America in  │ │
│                     │  │ │  Normal street.      │  │  │   Weekend     │ │
│  ─────────────────  │  │ │  No drama visible.   │  │  │   Deal        │ │
│  READ IN            │  │ └─────────────────────┘  │  │               │ │
│  Encyclopedia ✓     │  │                           │  │ · AIG Seeks   │ │
│  Newspaper          │  │  Lehman Brothers Holdings  │  │   Emergency   │ │
│                     │  │  Inc. Files for Chapter 11 │  │   Federal     │ │
│  ─────────────────  │  │  Bankruptcy Protection    │  │   Assistance  │ │
│  ♪  Audio  [on]     │  │                           │  │               │ │
│                     │  │  NEW YORK (AP) — Lehman   │  │ · Money Market│ │
│  ─────────────────  │  │  Brothers Holdings Inc.,  │  │   Fund Breaks │ │
│  TOOLS              │  │  the fourth-largest US    │  │   the Buck    │ │
│  Source view        │  │  investment bank...       │  └───────────────┘ │
│  Worksheets         │  │  Read more →              │                   │
│                     │  └──────────────────────────┘  ┌───────────────┐ │
│                     │                                 │ DID YOU KNOW? │ │
│                     │  ON THIS DAY — Sept 15, 2008    │ ────────────  │ │
│                     │  Lehman Brothers filed for      │               │ │
│                     │  Chapter 11 at 1:45 AM. Its     │ · Lehman held │ │
│                     │  25,000 employees learned       │   $639B in    │ │
│                     │  via news reports.              │   assets when │ │
│                     │                                 │   it filed.   │ │
│                     │  ─────────────────────────────  │               │ │
│                     │  Simulation worksheet · Snapshot│ · The filing  │ │
└─────────────────────┴─────────────────────────────────┴───────────────┘
 Sept 15 2008 · Lehman files · AIG seeks rescue · Merrill sold · Markets
 open in 6h · [stutters] Sept 15 2008 · Lehman files · AIG seeks · Sept ↻
```

**Ticker state:** `chaotic` — moving fast, occasional stutter/repeat.
**Featured article:** AP wire front-page piece. This is one the researcher absolutely had to save.

</details>

---

<details>
<summary><strong>Home — Newspaper Theme — Era 1 (Calm, January 2008)</strong></summary>

```
┌──────────────────────────────────────────────────────────────────────────┐
│  North Financial Mail  𝔄𝔪𝔢𝔯𝔦𝔠𝔞𝔫 𝔓𝔦𝔢  No. 1 · JANUARY 2008  · 6 AM   │
│  ──────────────────────────────────────────────────────────────────────  │
│  SIMULATION: [2008] [Present]              Encyclopedia · Newspaper  ♪  │
│  ──────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  FEDERAL RESERVE CUTS RATES FOR THE SECOND TIME IN NINE DAYS            │
│  Emergency inter-meeting action signals stress unseen in public data     │
│  ──────────────────────────────────────────────────────────────────────  │
│  COMMENTARY        │  FEATURED STORY             │  IN THE NEWS          │
│  ──────────────    │  ─────────────────────────  │  ─────────────────── │
│                    │  ┌───────────────────────┐  │                       │
│  DID YOU KNOW?     │  │   [IMAGE PLACEHOLDER] │  │  Fed Cuts Rates       │
│  ─────────────     │  │                        │  │  Second Time in       │
│                    │  │  BRIEF: A quiet 2007   │  │  Nine Days            │
│  The Federal       │  │  suburban street,      │  │                       │
│  Reserve's 2007    │  │  late afternoon.       │  │  Emergency Fund       │
│  consumer survey   │  │  One For Sale sign     │  │  Data Shows Half      │
│  found fewer than  │  │  at end of block,      │  │  of US Households     │
│  half of American  │  │  barely visible.       │  │  Below 30-Day         │
│  households could  │  │  Warm light. Normal.   │  │  Threshold            │
│  cover 3 months    │  └───────────────────────┘  │                       │
│  from liquid       │                             │  Housing Index         │
│  savings alone.    │  Emergency Fund Levels       │  Falls for 14th        │
│                    │  Below 30 Days for Half     │  Consecutive Month     │
│  British           │  of US Households           │                       │
│  households held   │                             │  ─────────────────── │
│  a median of 4     │  The Federal Reserve's own  │  ON THIS DAY          │
│  months. German    │  survey data, published     │  ─────────────────── │
│  households, 6.    │  without announcement in    │                       │
│                    │  December 2007, found that  │  Jan 22, 2008:        │
│  ─────────────     │  fewer than half of         │  Fed cuts 75bps in    │
│  Simulation →      │  American households...     │  emergency action.    │
│  Real life →       │  Read full article →        │  Largest cut since    │
│                    │                             │  1984.                │
└────────────────────┴─────────────────────────────┴───────────────────────┘
 Jan 2008 · Fed: 3.5% · Housing −8.4% YoY                    E · N  ♪ off
```

**Ticker state:** `calm` — almost static.
**Note:** The featured article here is a normal analytical piece. Not front-page drama — dry Fed data that the researcher found significant.

</details>

---

<details>
<summary><strong>Home — Newspaper Theme — Era 4 (Crisis, September 2008)</strong></summary>

```
┌──────────────────────────────────────────────────────────────────────────┐
│  North Financial Mail  𝔄𝔪𝔢𝔯𝔦𝔠𝔞𝔫 𝔓𝔦𝔢  CRISIS EDITION · SEPT 15, 2008  │
│  ──────────────────────────────────────────────────────────────────────  │
│  SIMULATION: [2008] [Present]              Encyclopedia · Newspaper  ♪  │
│  ──────────────────────────────────────────────────────────────────────  │
│                                                                          │
│     LEHMAN BROTHERS COLLAPSES. $639 BILLION.                             │
│     The largest bankruptcy filing in American history was submitted      │
│     at 1:45 AM. Most account holders learned from the morning news.      │
│  ──────────────────────────────────────────────────────────────────────  │
│  COMMENTARY        │  FEATURED STORY             │  IN THE NEWS          │
│  ──────────────    │  ─────────────────────────  │  ─────────────────── │
│                    │  ┌───────────────────────┐  │                       │
│  DID YOU KNOW?     │  │   [IMAGE PLACEHOLDER] │  │  Merrill Lynch Sold   │
│  ─────────────     │  │                        │  │  to Bank of America   │
│                    │  │  BRIEF: Trading floor  │  │  in Weekend Deal      │
│  Lehman held       │  │  photograph, Sept 15,  │  │                       │
│  $639B in assets   │  │  2008. Wide shot.      │  │  AIG Seeks Emergency  │
│  when it filed.    │  │  Traders in foreground.│  │  Federal Assistance   │
│  $236M was what    │  │  Screens showing red.  │  │                       │
│  JPMorgan paid     │  │  One trader with hands │  │  Money Market Fund    │
│  for Bear Stearns  │  │  on head. News wire    │  │  Breaks the Dollar    │
│  six months        │  │  quality.              │  │                       │
│  earlier.          │  └───────────────────────┘  │  Washington Mutual    │
│                    │                             │  Under Regulatory      │
│  The FDIC          │  NEW YORK (AP) — Lehman     │  Scrutiny              │
│  insures deposits  │  Brothers Holdings Inc.,    │                       │
│  to $250,000.      │  the fourth-largest US      │  ─────────────────── │
│  171 institutions  │  investment bank, filed     │  ON THIS DAY          │
│  were on the       │  for Chapter 11 bankruptcy  │  ─────────────────── │
│  problem list      │  protection Monday, listing │                       │
│  as of Sept 30.    │  $639 billion in assets...  │  Sept 15, 2008:       │
│                    │  Read full article →        │  Lehman files at      │
│  ─────────────     │                             │  1:45 AM. Markets     │
│  Simulation →      │  ON THIS DAY — Sept 15      │  open in 6 hours.     │
│  Real life →       │  Markets open in 6 hours.   │                       │
└────────────────────┴─────────────────────────────┴───────────────────────┘
 CRISIS · Sept 15 2008 · Lehman files · AIG rescue · Merrill sold · Sept ↻
```

**Ticker state:** `chaotic` — stuttering, looping fragments, occasional item cut mid-word.

</details>

---

<details>
<summary><strong>Article — Encyclopedia Theme — Screen 1 (Hook, Era 1)</strong></summary>

```
┌─────────────────────┬───────────────────────────────────────────────────┐
│  American Pie       │  American Pie › 2008 › Banking              < >  │
│  ─────────────────  │  ─────────────────────────────────────────────── │
│  IN THIS ARTICLE    │                                                   │
│  ─────────────────  │  Emergency Fund Levels Below 30 Days for Half    │
│  1 · The Survey ←   │  of US Households — Federal Reserve, Dec 2007   │
│  2 · The Mechanics  │  ─────────────────────────────────────────────── │
│  3 · The Scale      │  December 2007 · Banking · 6 sections            │
│  4 · What People    │  Section 1 of 6                                  │
│  5 · Connected To   │                                                   │
│  6 · The Data       │  ┌─────────────────────┐                         │
│                     │  │  [IMAGE PLACEHOLDER] │  WASHINGTON — The      │
│  ─────────────────  │  │                      │  Federal Reserve's      │
│  SEE ALSO           │  │  BRIEF: A plain      │  2007 Survey of        │
│  ─────────────────  │  │  tabular document    │  Consumer Finances,    │
│  · The position     │  │  — a government      │  released without      │
│    one household    │  │  survey cover page.  │  formal announcement   │
│    carried entering │  │  Fed seal visible.   │  in December, found    │
│    2008             │  │  Plain serif type.   │  that fewer than half  │
│                     │  │  Archival quality.   │  of American           │
│  · What the same    │  └─────────────────────┘  households held        │
│    news meant for                               liquid savings          │
│    a second sheet   │  sufficient to cover three months of expenses    │
│                     │  without income.                                  │
│  ─────────────────  │                                                   │
│  [2008]  [Present]  │  The median figure — across all income quartiles  │
│  Encyclopedia ✓     │  — was 47 days.                                  │
│  Newspaper          │                                                   │
│  ♪  Audio  [off]    │  Your estimated coverage: ‾1‾0‾0‾ ‾d‾a‾y‾s‾      │
│                     │                                                   │
│  ─────────────────  │  The survey did not describe this finding as      │
│  TOOLS              │  alarming. It was presented in Table 6, between   │
│  Source view        │  data on vehicle ownership and credit card        │
│  Worksheets         │  balances, without comment.         Next →        │
└─────────────────────┴───────────────────────────────────────────────────┤
 Jan 2008 · Emergency Fund · Section 1 of 6
```

**Notes:**
- `‾1‾0‾0‾ ‾d‾a‾y‾s‾` = underline affordance. Faint gray underline. Same font, same size.
- Article opens as an institutional document (Voice 5) — a normal analytical piece, not a crisis article
- The drama is in the data, not the writing

</details>

---

<details>
<summary><strong>Article — Newspaper Theme — Screen 4 (What People Did + Reveal)</strong></summary>

```
┌──────────────────────────────────────────────────────────────────────────┐
│  𝔄𝔪𝔢𝔯𝔦𝔠𝔞𝔫 𝔓𝔦𝔢  ›  2008  ›  Banking                    Sept 2008  < > │
│  ──────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  THE $10,000 WITHDRAWAL THAT RETURNED $6,500                             │
│  Early 401(k) liquidations during the 2008 financial crisis              │
│  ──────────────────────────────────────────────────────────────────────  │
│  September 2008 · Markets · 6 sections              Section 4 of 6      │
│                                                                          │
│  CONTENTS          │  ┌──────────────────┐  │  What People Did          │
│  ──────────────    │  │ [IMAGE PLACEHOLDER│  │  ────────────────────     │
│                    │  │                   │  │                           │
│  I.  The Policy   │  │  BRIEF: A line at │  │  BETWEEN SEPTEMBER and    │
│  II. The Math     │  │  an unemployment  │  │  December 2008, an        │
│  III. The Data    │  │  office, 2008-09. │  │  estimated 2.4 million    │
│  IV. The Record ← │  │  Three or four    │  │  households made early    │
│  V.  Related      │  │  people waiting.  │  │  withdrawals from         │
│  VI. The Number   │  │  Ordinary clothes.│  │  retirement accounts,     │
│                    │  │  Fluorescent      │  │  according to data from   │
│  ──────────────    │  │  light. Shot from │  │  the Investment Company   │
│  SEE ALSO          │  │  behind. No faces.│  │  Institute.               │
│  ──────────────    │  └──────────────────┘  │                           │
│  · The position    │                        │  A $10,000 withdrawal     │
│    one household   │                        │  triggered a 10 percent   │
│    carried into    │                        │  early distribution       │
│    2008            │                        │  penalty plus income tax  │
│                    │                        │  at the marginal rate.    │
│  · Exhibit 14      │                        │  Net proceeds: $6,500     │
│    [expand ▾]      │                        │  to $7,200 depending on   │
│  ┌──────────────┐  │                        │  the household's bracket. │
│  │ Leveraged    │  │                        │                           │
│  │ pos. filed   │  │                        │  ──────────────────────── │
│  │ March 2008   │  │                        │  ▸ The same $10,000,      │
│  │ $142k → $11k │  │                        │    not withdrawn          │
│  └──────────────┘  │                        │  ──────────────────────── │
│                    │                        │                           │
│  ──────────────    │                        │               ← Back Next →│
│  Sim: [2008] [Now] │                        │                           │
│  Theme: E · N  ♪   │                        │                           │
└────────────────────┴────────────────────────┴───────────────────────────┘
 Sept 2008 · 401k Withdrawals · Section 4 of 6 · [ticker: elevated pace]
```

**Notes:**
- See Also shows the gambler_lost archetype expanded — a single filing entry with a number
- The reveal `▸` is a one-line sentence. What comes after it is data, not advice.
- The newspaper multi-column layout uses the CONTENTS block as the left column in article view

</details>

---

<details>
<summary><strong>My Situation — Encyclopedia Theme</strong></summary>

```
┌─────────────────────┬───────────────────────────────────────────────────┐
│  American Pie       │  American Pie › My Situation                      │
│  ─────────────────  │  ─────────────────────────────────────────────── │
│  Main Page          │                                                   │
│  My Situation  ←    │  Your Financial Snapshot                         │
│  Simulation         │  ─────────────────────────────────────────────── │
│  Learn              │  These numbers are yours. Any value with a        │
│  Clarity      [14]  │  gray underline can be edited. Changes apply      │
│                     │  immediately to all articles.                    │
│  ─────────────────  │                                                   │
│  SIMULATION YEAR    │  LIQUID POSITION                                  │
│  [2008]  [Present]  │  ─────────────────────────────────────────────── │
│                     │  Monthly expenses:    ‾$‾3‾,‾2‾0‾0‾              │
│  ─────────────────  │  Current cash:        ‾$‾7‾,‾0‾0‾0‾              │
│  READ IN            │  Coverage:            100 days                   │
│  Encyclopedia ✓     │  Gap to 90-day min:   0 days (at minimum)        │
│  Newspaper          │  Gap to 180-day rec:  −80 days                   │
│                     │                                                   │
│  ─────────────────  │  INCOME AND REPLACEMENT                          │
│  ♪  Audio  [off]    │  ─────────────────────────────────────────────── │
│                     │  Monthly income:       ‾$‾4‾,‾8‾0‾0‾             │
│  ─────────────────  │  UI replacement est.:  $2,160 (45%)              │
│  TOOLS              │  Monthly gap (if unemployed): $1,040             │
│  Source view        │  Weeks of coverage that gap consumes: 7.5 wks    │
│  Worksheets         │                                                   │
│                     │  RETIREMENT                                       │
│                     │  ─────────────────────────────────────────────── │
│                     │  401(k) balance:      ‾$‾1‾2‾,‾0‾0‾0‾            │
│                     │  Brokerage:           ‾$‾0‾                      │
│                     │                                                   │
│                     │  ┌─────────────────────────────────────────────┐ │
│                     │  │  [IMAGE PLACEHOLDER]                        │ │
│                     │  │  BRIEF: A handwritten personal balance      │ │
│                     │  │  sheet on lined notebook paper. Pencil.     │ │
│                     │  │  Numbers crossed out and revised. Real,     │ │
│                     │  │  not staged. Domestic. Circa 2008.          │ │
│                     │  └─────────────────────────────────────────────┘ │
└─────────────────────┴───────────────────────────────────────────────────┤
 Your numbers · Last edited just now
```

</details>

[↑ Back to top](#table-of-contents)

---

*American Pie — Director's Bible, Volume 2*
*Version 2.0 — March 2026*
*This document supersedes no section of Bible 1. It extends it.*
*Both documents together constitute the complete production standard.*
