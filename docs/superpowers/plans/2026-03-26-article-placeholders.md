# Article Placeholder Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 49 articles in `data.js` with properly structured placeholder shells that exercise every UI and simulation feature while guiding future writers on what each article should become.

**Architecture:** Single file change — `data.js` only. Each article gets full frontmatter, 5-movement section structure, at least one BRIEF block, one reveal block, variable references, and embedded feature checklists in brackets. No code changes. No new files. The placeholder text is inert content — the shell runs on it identically to how it will run on final articles.

**Tech Stack:** Plain text content within existing `data.js` JS template literal format. No dependencies.

---

## Format Specification — Read This Before Any Task

Every article must conform to this spec exactly. Deviations break the UI.

### Frontmatter Fields (all required)

```
---
title: [Publication-style headline — no second person, no "your"]
era: [1–9 or present]
date: [Month Year — the simulation date this article appears]
category: [Topic category]
voice: [One of: WSJ Analysis | AP Wire | Local Newspaper | British Press | Institutional Document | Long-Form Feature]
ticker_state: [calm | elevated | crisis | chaotic | still]
sections: [integer — number of ## headings in body]
concepts: ["slug-one", "slug-two"]
related: ["article-slug-one", "article-slug-two"]
---
```

### Section Structure (5-movement spec)

Every article follows five movements. Section heading names vary by voice — these are the movement names, not required heading text:

1. **Hook** — The opening image or fact. Consequence-first. No preamble.
2. **Mechanics** — How the underlying system works.
3. **Scale** — The numbers that make it real. Variables resolve here.
4. **What People Did** — Behavior data. Contains the `▸` reveal block.
5. **Residue** — What it means now / what it connects to.

Section count: minimum 3, target 5, maximum 7. For placeholder shells, 5 is standard.

### Placeholder Section Format

Each section body follows this pattern:

```markdown
## [Section Heading]

[PLACEHOLDER — Movement name. Final content: one sentence describing what this section should contain, in what voice, with what emotional register. Do not use second person in final content.]

[TEST: Comma-separated list of features to verify on this screen.]

[Optional: variable reference, BRIEF block, or reveal block per spec below]
```

### BRIEF Block Format

At least one per article. Place in the Hook section (section 1) unless the article's subject better suits a later section.

```
BRIEF
Type: [Documentary photograph | Data visualization | Infographic | Court document | Wire photograph]
Subject: [One sentence describing the image — specific, visual, no faces unless required]
Era: [Year range and setting]
Tone: [Emotional register of the image]
Technical: [Camera/production notes]
Source: [Wire archive | Federal document | Commission original | etc.]
What not to show: [Explicit exclusions]
```

### Reveal Block Format

One per article. Place in the What People Did section.

```
▸ [Reveal prompt — the question or turn that separates what most people did from what the households that preserved capital did]
```

After the `▸` line, write one short placeholder paragraph in brackets:

```
[PLACEHOLDER — Reveal content. Final content: what the households that preserved or gained the most did differently. Same events, same timeline, different decisions. The gap is the hidden lesson landing.]

[TEST: Click reveal toggle — content should expand below the ▸ line. Verify reveal state persists on section re-render.]
```

### Variable References

Use existing variable names from the simulation. Include at least two per article in the Scale or Mechanics sections. Standard variables:

- `{{your_cash}}` — liquid savings balance
- `{{your_monthly_income}}` — monthly take-home
- `{{your_monthly_expenses}}` — monthly spending
- `{{coverage_days}}` — cash ÷ daily burn rate
- `{{your_credit_card_debt}}` — credit card balance
- `{{your_investment_value}}` — investment portfolio value
- `{{your_net_worth}}` — net worth
- `{{your_monthly_rent}}` — housing cost
- `{{unemployment_rate}}` — current unemployment rate (era-aware)
- `{{stress_level}}` — subjective stress variable

### Concept Links

Place in the Residue section. Use existing article slugs.

```
→ **[Article Title]** — [one line explaining the connection]
```

---

## Era / Ticker State / Voice Reference Table

| Era | Date | Ticker State | Primary voices |
|-----|------|-------------|----------------|
| 1 | Jan 2008 | calm | WSJ Analysis, British Press, Institutional Document |
| 2 | Mar 2008 | elevated | AP Wire, WSJ Analysis, Institutional Document |
| 3 | Jun 2008 | elevated | WSJ Analysis, Local Newspaper, Institutional Document |
| 4 | Sep 2008 | crisis | AP Wire, WSJ Analysis, Institutional Document |
| 5 | Oct–Nov 2008 | chaotic | WSJ Analysis, Institutional Document, Local Newspaper |
| 6 | Dec 2008–Jan 2009 | elevated | AP Wire, WSJ Analysis, Local Newspaper, Long-Form Feature |
| 7 | Feb–Mar 2009 | still | AP Wire, Long-Form Feature, Institutional Document |
| 8 | Apr–Dec 2009 | elevated | WSJ Analysis, British Press, Institutional Document |
| 9 | 2023–present | calm | WSJ Analysis, Local Newspaper, British Press |
| present | present | calm | British Press |

---

## Article Voice and Ticker State Assignments

| Slug | Voice | Ticker State |
|------|-------|-------------|
| emergency-fund | WSJ Analysis | calm |
| checking-vs-savings | British Press | calm |
| federal-reserve | Institutional Document | calm |
| bear-stearns | AP Wire | elevated |
| burn-rate | WSJ Analysis | elevated |
| mortgage-backed-securities | WSJ Analysis | elevated |
| recession-defined | Institutional Document | elevated |
| bear-market | WSJ Analysis | elevated |
| cobra-insurance | Local Newspaper | elevated |
| taxes-when-laid-off | Local Newspaper | elevated |
| too-big-to-fail | WSJ Analysis | elevated |
| unemployment-insurance | Local Newspaper | elevated |
| buying-the-dip | WSJ Analysis | crisis |
| dollar-cost-averaging | WSJ Analysis | crisis |
| index-funds | British Press | crisis |
| opportunity-cost | WSJ Analysis | crisis |
| sp500 | AP Wire | crisis |
| stimulus | Institutional Document | crisis |
| 401k-matching | WSJ Analysis | chaotic |
| assets-vs-liabilities | WSJ Analysis | chaotic |
| budget-reality | Local Newspaper | chaotic |
| compound-interest | WSJ Analysis | chaotic |
| net-worth | British Press | chaotic |
| roth-ira | WSJ Analysis | chaotic |
| bull-market | WSJ Analysis | elevated |
| crypto-basics | British Press | elevated |
| diversification | Institutional Document | elevated |
| gig-economy-taxes | Local Newspaper | elevated |
| idle-cash-inflation | AP Wire | elevated |
| lifestyle-inflation | Local Newspaper | elevated |
| sequence-of-returns | Long-Form Feature | elevated |
| tax-brackets | WSJ Analysis | elevated |
| eviction-moratorium | Local Newspaper | still |
| market-crash-vs-correction | AP Wire | still |
| panic-selling-cost | WSJ Analysis | still |
| quantitative-easing | Institutional Document | still |
| bonds-and-rates | WSJ Analysis | elevated |
| cpi | Institutional Document | elevated |
| fed-funds-rate | AP Wire | elevated |
| housing-affordability | Local Newspaper | elevated |
| i-bonds | British Press | elevated |
| inflation-mechanics | WSJ Analysis | elevated |
| real-vs-nominal-returns | WSJ Analysis | elevated |
| wage-price-spiral | AP Wire | elevated |
| ai-and-employment | WSJ Analysis | calm |
| high-rates-home-buying | Local Newspaper | calm |
| market-valuation | British Press | calm |
| reading-your-documents | Institutional Document | calm |
| present/getting-started | British Press | calm |

---

## Task 1 — Era 1 Articles (3 articles)

**Files:**
- Modify: `data.js` — articles: `emergency-fund`, `checking-vs-savings`, `federal-reserve`

**Context:** Era 1 is January 2008. Ticker is nearly still. The reader knows what is coming. The articles do not. Emotional register: false calm. Dramatic irony at full strength.

- [ ] **Step 1: Update `emergency-fund`**

Full frontmatter + 5 sections. The emergency-fund article already has V2 content — preserve its structure exactly, only add the `[TEST: ...]` checklist line to each section. Do not alter any existing content.

Checklist line to add to each section:
- Section 1 (Hook): `[TEST: BRIEF block renders at 38% float right. Ticker state is calm — text barely moves. Era gate: visible at Era 1. Section navigator shows 1/5.]`
- Section 2 (Mechanics): `[TEST: Variables resolve — {{coverage_days}} and {{your_cash}} display user values or defaults. Section advance animation fires on click.]`
- Section 3 (Scale): `[TEST: Variable {{your_monthly_expenses}} resolves. No scroll on article canvas — content fits viewport or canvas scrolls internally only.]`
- Section 4 (What People Did): `[TEST: Reveal toggle fires on ▸ click. Reveal content expands below without page jump. BRIEF block 2 renders (if present).]`
- Section 5 (Residue): `[TEST: Concept links → are styled correctly. See Also sidebar populates. Era gate closes article to Era 2+ users correctly.]`

- [ ] **Step 2: Update `checking-vs-savings`**

Replace existing content. Voice: British Press. Era 1. Ticker: calm. 5 sections.

```
---
title: Checking Accounts Pay Almost Nothing While Savers Debate Where Idle Cash Should Sit
era: 1
date: January 2008
category: Savings
voice: British Press
ticker_state: calm
sections: 5
concepts: ["checking", "savings", "yield", "opportunity-cost"]
related: ["emergency-fund", "federal-reserve", "idle-cash-inflation"]
---
## The Quiet Arithmetic

[PLACEHOLDER — Hook movement. Final content: British Press voice — wry, precise, slightly detached. Opens on the yield differential between checking and savings accounts in January 2008. The number is small per dollar but the aggregate over a year is not. No drama. The tone is the tone of someone noting an obvious thing that most people have not noticed.]

[TEST: Ticker state is calm — article renders with Era 1 gate active. Section navigator shows 1/5. BRIEF block renders at 38% float right with monospace font and bordered frame.]

BRIEF
Type: Documentary photograph
Subject: A bank statement printed on thermal paper — checking account, four figures, interest line reads $0.04 for the month. Statement dated January 2008.
Era: January 2008
Tone: Dry irony — the plainness of the number is the point
Technical: Flat lay, overhead, neutral light. No people.
Source: Generic bank statement — any major US retail bank 2007–2008
What not to show: Faces, credit card statements, dramatic underlining or annotation

## How the Yield Gap Works

[PLACEHOLDER — Mechanics movement. Final content: Explain the mechanics of yield differential between demand deposit accounts (checking) and money market savings accounts in plain British Press register. What the Fed funds rate does to savings yields. Why banks do not pass rate increases to checking accounts. Not instructional — documentary.]

[TEST: Section advance animation fires. Canvas slides — no page-level scroll. Variables render if present.]

## The Numbers in January 2008

[PLACEHOLDER — Scale movement. Final content: Specific numbers. The average checking account yield in January 2008. The average money market yield. The differential on a four-figure balance over twelve months. The Federal Reserve had cut rates twice by this point — include that context. Variables: {{your_cash}} and {{your_monthly_expenses}} appear here to ground the arithmetic in the reader's situation.]

[TEST: {{your_cash}} resolves to user value or default. {{your_monthly_expenses}} resolves. No broken variable syntax visible.]

## What Households Did

[PLACEHOLDER — What People Did movement. Final content: Behavior data — what most households with checking accounts containing three to six months of expenses did versus what the households that moved idle cash to savings accounts did. The $315 figure (the approximate annual yield differential on a $5,000 balance at 2007 rates) should appear. No instruction — documentation of what happened.]

▸ What the households that moved idle cash earned on the same balance

[PLACEHOLDER — Reveal content. Final content: The specific dollar difference. Same balance, same year, one decision. No judgment — arithmetic.]

[TEST: Reveal toggle fires on ▸ click. Content expands without layout shift. Reveal state persists on back-navigation.]

## What It Established

[PLACEHOLDER — Residue movement. Final content: What this moment established about the relationship between idle cash and opportunity cost. Connect to the Federal Reserve rate decisions happening simultaneously. British Press register — the tone of someone noting that this was a small and obvious thing that most people got wrong.]

[TEST: Concept links render correctly. See Also sidebar populates with related articles. Era gate functions — article accessible at Era 1.]

→ **Emergency Fund** — the amount that belongs in savings before the yield question matters

→ **Federal Reserve** — the rate decisions that set the yield environment in January 2008

→ **Idle Cash and Inflation** — the same question, six eras later, with different numbers
```

- [ ] **Step 3: Update `federal-reserve`**

Replace existing content. Voice: Institutional Document. Era 1. Ticker: calm. 5 sections.

```
---
title: Federal Reserve Cuts Interest Rates Again as Credit Stress Builds
era: 1
date: January 2008
category: Monetary Policy
voice: Institutional Document
ticker_state: calm
sections: 5
concepts: ["federal-reserve", "fed-funds-rate", "monetary-policy", "interest-rates"]
related: ["checking-vs-savings", "burn-rate", "bear-stearns"]
---
## Statement of the Federal Open Market Committee

[PLACEHOLDER — Hook movement. Final content: Institutional Document voice — official register, no commentary. Opens on the January 22, 2008 emergency inter-meeting rate cut. 75 basis points. The language is the language of an official statement. The gap between what the statement says and what the reader now knows is the entire emotional content of this section.]

[TEST: Ticker state calm. BRIEF block renders. Era 1 gate active. Section 1/5 in navigator.]

BRIEF
Type: Institutional document reproduction
Subject: Facsimile of Federal Open Market Committee statement header — official letterhead, date January 22, 2008, first paragraph only. No handwriting, no annotation.
Era: January 2008
Tone: Bureaucratic calm over institutional panic — the tone of the document is neutral; the reader supplies the dread
Technical: High-contrast scan reproduction quality. Black and white.
Source: Federal Reserve public record — freely available
What not to show: Highlighting, margin notes, dramatic framing

## The Mechanism of Rate Decisions

[PLACEHOLDER — Mechanics movement. Final content: How the Fed funds rate is set, what the FOMC votes on, what the transmission mechanism is from Fed funds rate to consumer savings rates and loan rates. Institutional Document voice — dry, precise, no metaphor. The mechanics are documented, not explained.]

[TEST: Section 2/5 in navigator. Section advance animation functions. No scroll bleed.]

## The January 2008 Sequence

[PLACEHOLDER — Scale movement. Final content: The specific sequence — the January 22 emergency cut (75bp) and the January 30 scheduled cut (50bp). The Fed funds rate moved from 4.25% to 3.0% in eight days. Variables: {{your_cash}} context for what a 125bp rate cut does to savings yields on a specific balance. The specific signal embedded in calling an emergency inter-meeting action.]

[TEST: Variables resolve. {{your_cash}} and {{your_monthly_expenses}} visible with correct values.]

## What the Markets Read Into the Cuts

[PLACEHOLDER — What People Did movement. Final content: Institutional account of how credit markets, equity markets, and household savers responded to the January cuts. The emergency cut signaled something the official statement did not say. Document what market participants read into it. The reveal separates what most people concluded from what the households and institutions that acted correctly on the signal did.]

▸ What the rate sequence signaled that the statement did not say

[PLACEHOLDER — Reveal content. Final content: The specific inference available in the data — two emergency cuts in eight days had not happened since 1984. The households that treated this as a signal rather than noise.]

[TEST: Reveal toggle. Expand animation. State persistence on re-render.]

## What the Record Shows

[PLACEHOLDER — Residue movement. Final content: The January 2008 rate decision as a leading indicator. Seven more cuts would follow across 2008. What the record shows about the relationship between the January cuts and what followed. Institutional Document voice — the tone of a historical review, not a warning.]

[TEST: Concept links render. See Also sidebar. Era gate functions correctly.]

→ **Bear Stearns** — the institutional collapse that followed the rate signal by seven weeks

→ **Checking vs Savings** — what the rate cuts did to household savings yields in real time

→ **Burn Rate** — the coverage days calculation that the rate environment made more urgent
```

- [ ] **Step 4: Commit**

```bash
git add data.js
git commit -m "content: add Era 1 article placeholder shells (checking-vs-savings, federal-reserve)"
```

---

## Task 2 — Era 2 Articles (4 articles)

**Files:**
- Modify: `data.js` — articles: `bear-stearns`, `burn-rate`, `mortgage-backed-securities`, `recession-defined`

**Context:** Era 2 is March 2008. Ticker is elevated — walking pace, woken up. Bear Stearns collapsed in a weekend. The reader feels the speed of institutional collapse for the first time.

- [ ] **Step 1: Update `bear-stearns`**

Voice: AP Wire. Era 2. Ticker: elevated. 5 sections.

```
---
title: JP Morgan Acquires Bear Stearns for $2 Per Share as Fed Guarantees Deal
era: 2
date: March 2008
category: Banking
voice: AP Wire
ticker_state: elevated
sections: 5
concepts: ["bear-stearns", "liquidity-risk", "counterparty-risk", "bank-run"]
related: ["mortgage-backed-securities", "federal-reserve", "too-big-to-fail"]
---
## NEW YORK (AP) — Bear Stearns Cos. Acquired

[PLACEHOLDER — Hook movement. Final content: AP Wire voice — dateline, inverted pyramid, no editorial commentary. The acquisition at $2 per share. One year earlier the stock traded at $172. The Federal Reserve guaranteed up to $30 billion of Bear Stearns assets to make the acquisition possible. The facts are already the most dramatic text of their genre. No embellishment required or permitted.]

[TEST: Ticker state elevated — text moves at walking pace. Era 2 gate active. BRIEF block renders. Section 1/5 in navigator.]

BRIEF
Type: Wire photograph
Subject: The Bear Stearns headquarters building at 383 Madison Avenue, New York — exterior shot, Sunday March 16 2008. No crowd. Ordinary Sunday-morning quiet in front of a building that will not open the same way on Monday.
Era: March 2008, Sunday evening
Tone: The specific stillness before a Monday that is different from Friday
Technical: Wire photograph quality — slightly underexposed, available light
Source: AP or Reuters wire archive
What not to show: Trading floor, executives, protest, dramatic weather

## How a 72-Hour Bank Run Works

[PLACEHOLDER — Mechanics movement. Final content: The mechanics of a prime brokerage run — how counterparties pulled cash, how repo market access closed, how a firm that appeared solvent on Thursday was insolvent by Friday. AP Wire voice but factual-mechanical, not breaking news. The mechanism, not the drama.]

[TEST: Section 2/5. Canvas slide functions. No scroll at page level.]

## The Numbers Over 72 Hours

[PLACEHOLDER — Scale movement. Final content: Bear Stearns cash reserves — $18 billion on Tuesday, $2 billion on Thursday. The $2-per-share acquisition price against the $172 price one year prior. The $30 billion Fed guarantee. Variables: {{your_investment_value}} context for what a 99% decline means on a specific balance.]

[TEST: {{your_investment_value}} resolves. Variable syntax intact. No broken interpolation.]

## What Happened Over the Weekend

[PLACEHOLDER — What People Did movement. Final content: What the counterparties did on Friday. What JPMorgan's board did over the weekend. What the Federal Reserve did on Sunday night. What ordinary depositors and investors did Monday morning when they learned the price. The reveal separates the people who understood what the price signaled from those who treated it as a buying opportunity.]

▸ What the people who understood the $2 price acted on that week

[PLACEHOLDER — Reveal content. Final content: What the $2 price said about the entire mortgage-backed securities ecosystem. The households and institutions that treated Bear Stearns not as an isolated event but as a stress test result.]

[TEST: Reveal toggle. Expand animation. No layout shift. Persist state.]

## What Bear Stearns Established

[PLACEHOLDER — Residue movement. Final content: Bear Stearns as the first proof that institutions the public assumed were permanent were not. What it established about counterparty risk. What it meant for the six months that followed. AP Wire — dry, factual close.]

[TEST: Concept links render. See Also sidebar. Era 2 gate functions.]

→ **Mortgage-Backed Securities** — the instruments that made the 72-hour run possible

→ **Federal Reserve** — the January rate cuts that preceded the collapse by seven weeks

→ **Too Big to Fail** — the doctrine that Bear Stearns tested and partially failed
```

- [ ] **Step 2: Update `burn-rate`**

Voice: WSJ Analysis. Era 2. Ticker: elevated. 5 sections.

```
---
title: Burn Rate: How Fast Could Your Cash Disappear If Income Stopped Tomorrow
era: 2
date: March 2008
category: Household Finance
voice: WSJ Analysis
ticker_state: elevated
sections: 5
concepts: ["burn-rate", "coverage-days", "emergency-fund", "liquidity"]
related: ["emergency-fund", "unemployment-insurance", "checking-vs-savings"]
---
## The Calculation Most Households Had Not Run

[PLACEHOLDER — Hook movement. Final content: WSJ Analysis voice — consequence-first, no preamble. The specific calculation: total liquid cash divided by daily household burn rate equals coverage days. Most households in January 2008 had not run this calculation. By March 2008, Bear Stearns had made the question less theoretical.]

[TEST: Ticker elevated. Era 2 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Documentary photograph
Subject: A yellow legal pad with handwritten arithmetic — two columns, expenses on the left, a division problem on the right arriving at a number of days. No faces. The handwriting is careful, not panicked.
Era: Early 2008, household setting
Tone: The specific quality of someone doing math they should have done earlier
Technical: Close crop on the paper. Shallow depth of field. Available light.
Source: Commission original or wire archive lifestyle
What not to show: Computers, phones, bank statements, emotional reaction

## How Burn Rate Is Calculated

[PLACEHOLDER — Mechanics movement. Final content: The mechanics of the calculation — what counts as expenses (fixed obligations only versus total spending), what counts as liquid cash (checking plus savings, not retirement accounts), why the number matters more than a savings balance without context. WSJ Analysis — precise, no second person.]

[TEST: Section 2/5. Advance animation. Canvas locked — no scroll.]

## The Numbers in March 2008

[PLACEHOLDER — Scale movement. Final content: Median US household liquid savings in early 2008. Median monthly expenses. The median coverage days number — and what it meant given that the Bear Stearns collapse had just demonstrated that institutional crises move faster than the news cycle. Variables: {{your_cash}}, {{your_monthly_expenses}}, {{coverage_days}} render here.]

[TEST: {{coverage_days}} resolves — verify it's a computed value, not a raw variable string. {{your_cash}} and {{your_monthly_expenses}} visible.]

## What Households Did When They Ran the Number

[PLACEHOLDER — What People Did movement. Final content: Behavior data — the households that ran the burn rate calculation in March 2008 versus those that did not. What the households that ran it did with the result. The reveal separates what most people did (nothing, or one-time adjustment) from what the households with the strongest outcomes over the following eighteen months did.]

▸ What the households that ran the calculation and acted on it changed first

[PLACEHOLDER — Reveal content. Final content: The specific first action — not "build savings" in the abstract, but the specific decision that separated the outcomes. The decision that was available to any household regardless of income level.]

[TEST: Reveal fires. Expands. Persists.]

## What the Number Measures

[PLACEHOLDER — Residue movement. Final content: Coverage days as the single number that contains the most information about household financial resilience. Its relationship to what came next in the simulation. WSJ Analysis close — analytical, no reassurance.]

[TEST: Concept links. See Also. Era gate.]

→ **Emergency Fund** — the target coverage days this calculation is measuring toward

→ **Unemployment Insurance** — the income replacement that extends coverage days if activated immediately

→ **Bear Stearns** — the institutional collapse that made this calculation urgent in March 2008
```

- [ ] **Step 3: Update `mortgage-backed-securities`**

Voice: WSJ Analysis. Era 2. Ticker: elevated. 5 sections.

```
---
title: Trillions in Mortgage Bonds: What Wall Street Packaged and Main Street Barely Named
era: 2
date: March 2008
category: Financial Instruments
voice: WSJ Analysis
ticker_state: elevated
sections: 5
concepts: ["mortgage-backed-securities", "securitization", "tranches", "systemic-risk"]
related: ["bear-stearns", "too-big-to-fail", "recession-defined"]
---
## The Instrument Nobody Had to Understand Until It Was Everywhere

[PLACEHOLDER — Hook movement. Final content: WSJ Analysis voice — opens on the size of the MBS market in 2008, not on an explanation of what an MBS is. The number comes first. Then the observation that most of the households whose mortgages were inside these instruments had no idea. The instrument is described through its consequences, not its structure.]

[TEST: Ticker elevated. Era 2 gate. BRIEF block renders at 38% float. Section 1/5.]

BRIEF
Type: Data visualization placeholder
Subject: Diagram showing the securitization chain — mortgage origination to pooling to tranching to sale — presented as a plain flowchart, no color, no icons. Labels only.
Era: 2005–2008
Tone: Clinical — the plainness of the diagram is not reassuring once the reader understands each step
Technical: Black ink on white. Newspaper-reproduction quality.
Source: Produce original from public domain financial education materials
What not to show: Dollar signs as decoration, smiling icons, simplified cartoon metaphors

## How Securitization Works

[PLACEHOLDER — Mechanics movement. Final content: The mechanics of mortgage securitization — origination, pooling, tranching, rating, sale. How a mortgage in Ohio ended up inside a pension fund in Norway. WSJ Analysis voice — precise, no metaphor required, no simplification. The mechanics are describable in plain language without losing accuracy.]

[TEST: Section 2/5. Canvas advance. No overflow scroll.]

## The Scale in 2008

[PLACEHOLDER — Scale movement. Final content: The size of the MBS market in 2008 — $6.6 trillion in outstanding agency MBS alone. What percentage of US mortgages were securitized by 2007. The AAA rating distribution across tranches that turned out to be wrong. Variables: {{your_investment_value}} as context for what exposure to this market meant for retirement accounts.]

[TEST: Variables resolve. {{your_investment_value}} visible with correct value or default.]

## What Happened When the Ratings Were Wrong

[PLACEHOLDER — What People Did movement. Final content: What the rating agencies did with the correlation assumptions. What the banks that packaged and sold the instruments did when they learned the assumptions were wrong. What ordinary households with 401(k) exposure did — most did nothing because they did not know. The reveal separates the institutional participants who understood the instrument from those who held it without comprehension.]

▸ What the institutional participants who understood the instrument structure did in Q1 2008

[PLACEHOLDER — Reveal content. Final content: The specific actions of the institutions and funds that had reverse-engineered the correlation assumptions and positioned accordingly. Not investment advice — historical documentation.]

[TEST: Reveal fires and expands. State persists. No layout shift.]

## What the Instrument Left Behind

[PLACEHOLDER — Residue movement. Final content: MBS as the mechanism through which a housing correction became a systemic crisis. What understanding this instrument retroactively explains about what happened in 2008. WSJ Analysis close.]

[TEST: Concept links. See Also. Era gate.]

→ **Bear Stearns** — the first major institution whose MBS exposure triggered a run

→ **Too Big to Fail** — the doctrine that the MBS market made necessary

→ **Recession Defined** — the official dating of the recession that MBS losses helped cause
```

- [ ] **Step 4: Update `recession-defined`**

Voice: Institutional Document. Era 2. Ticker: elevated. 5 sections.

```
---
title: Economists Debate a Recession. Kitchen Tables Feel It Months Earlier in Hours and Invoices.
era: 2
date: March 2008
category: Economics
voice: Institutional Document
ticker_state: elevated
sections: 5
concepts: ["recession", "gdp", "nber", "leading-indicators"]
related: ["federal-reserve", "bear-stearns", "unemployment-insurance"]
---
## Technical Definition, Operational Reality

[PLACEHOLDER — Hook movement. Final content: Institutional Document voice — opens on the NBER definition of recession (two consecutive quarters of negative GDP growth is the popular definition; the NBER's actual definition is broader). The gap between the technical definition and when households experience a recession is the subject of this article. No drama — the gap is documented, not lamented.]

[TEST: Ticker elevated. Era 2 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Institutional document reproduction
Subject: Header of NBER Business Cycle Dating Committee announcement — plain text, no commentary. The specific language of how a recession start date is determined retroactively.
Era: 2008
Tone: Bureaucratic precision — the neutrality of the language is not neutral in context
Technical: Document reproduction quality. Black and white.
Source: NBER public record
What not to show: Charts, graphs, editorial annotation

## How a Recession Is Officially Dated

[PLACEHOLDER — Mechanics movement. Final content: The NBER Business Cycle Dating Committee — who they are, what data they use, how long after the fact they make the call. The December 2007 recession start date was not announced until December 2008 — twelve months later. The institutional document of a recession declaration is always historical, never real-time.]

[TEST: Section 2/5. Canvas advance. No page scroll.]

## The Lag Between Data and Experience

[PLACEHOLDER — Scale movement. Final content: The twelve-month lag between recession start (December 2007) and official NBER declaration (December 2008). What household data showed in early 2008 versus what the official indicators showed. Variables: {{your_monthly_income}} and {{your_monthly_expenses}} as the household-level indicators that move before GDP does.]

[TEST: {{your_monthly_income}} and {{your_monthly_expenses}} resolve correctly.]

## What the Declaration Told Households That Had Already Felt It

[PLACEHOLDER — What People Did movement. Final content: Behavior data — what households that used leading indicators (hours worked, invoice delays, overtime availability) knew before the official declaration. What the households that waited for official confirmation did. The reveal separates the households that responded to the data they could observe from those that waited for authoritative confirmation.]

▸ What the households that acted on their own household data knew before December 2008

[PLACEHOLDER — Reveal content. Final content: The specific leading indicators available to any household — hours offered, invoice payment delays, discretionary purchase requests from clients — and what the households that read them correctly did in Q1 2008.]

[TEST: Reveal fires. State persists.]

## What the Official Record Established

[PLACEHOLDER — Residue movement. Final content: The recession as officially dated — December 2007 to June 2009. What the declaration meant for the households that were already inside it by March 2008. Institutional Document close.]

[TEST: Concept links. See Also. Era gate.]

→ **Federal Reserve** — the institution whose rate decisions preceded the recession declaration by twelve months

→ **Unemployment Insurance** — the program whose claims data is one of the leading indicators the NBER watches

→ **Bear Stearns** — the institutional event that occurred while the recession was already underway but undeclared
```

- [ ] **Step 5: Commit**

```bash
git add data.js
git commit -m "content: add Era 2 article placeholder shells (bear-stearns, burn-rate, mortgage-backed-securities, recession-defined)"
```

---

## Task 3 — Era 3 Articles (5 articles)

**Files:**
- Modify: `data.js` — articles: `bear-market`, `cobra-insurance`, `taxes-when-laid-off`, `too-big-to-fail`, `unemployment-insurance`

**Context:** Era 3 is June 2008 — the quiet summer. The market bounced after Bear Stearns. Commentators suggested the worst was over. The reader knows they were wrong. Ticker: elevated, steady.

- [ ] **Step 1: Update `bear-market`**

Voice: WSJ Analysis. Era 3. Ticker: elevated. 5 sections.

```
---
title: US Housing Market: Peak to Trough — The Gap Between Data and Public Knowledge
era: 3
date: June 2008
category: Markets
voice: WSJ Analysis
ticker_state: elevated
sections: 5
concepts: ["bear-market", "housing", "leading-indicators", "price-discovery"]
related: ["mortgage-backed-securities", "recession-defined", "panic-selling-cost"]
---
## The Peak Nobody Announced

[PLACEHOLDER — Hook movement. Final content: WSJ Analysis. Opens on July 2006 — the peak of the US housing market as later determined by Case-Shiller. Nobody announced it at the time. The peak is only identifiable in retrospect. In June 2008 the market had been declining for two years and most public commentary was still describing it as a correction. The gap between data and public knowledge is the subject.]

[TEST: Ticker elevated. Era 3 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Data visualization placeholder
Subject: A simple line chart — US home price index 2000–2008, peak at July 2006 clearly visible, current position (June 2008) marked. No forecast line. No shading. Black ink on white.
Era: 2000–2008
Tone: Clinical — the shape of the line requires no annotation
Technical: Newspaper-reproduction quality. Single axis. Clear peak label.
Source: S&P/Case-Shiller Home Price Index — public data
What not to show: Color fills, trend arrows, forecasts, emotional framing

## How a Housing Bear Market Is Measured

[PLACEHOLDER — Mechanics. Final content: How home price indices work, what Case-Shiller measures, why the lag between transaction and index publication means the data is always looking backward. The mechanics of leading vs lagging indicators in a housing market.]

[TEST: Section 2/5. Canvas advance. No overflow.]

## The Numbers Through June 2008

[PLACEHOLDER — Scale. Final content: Case-Shiller peak (July 2006) to June 2008 — approximately 18% national decline, with regional variation. The ten-city composite. What the data showed that public commentary was still debating. Variables: {{your_monthly_rent}} context for housing cost exposure.]

[TEST: {{your_monthly_rent}} resolves.]

## What Market Participants Did With the Data

[PLACEHOLDER — What People Did. Final content: What institutional participants who had the data did versus what retail participants who relied on public commentary did. The June 2008 pause — markets had stabilized from Bear Stearns lows — and what that pause meant to each group. Reveal: the separation between the people who read the housing data and those who read the equity market as a proxy for housing health.]

▸ What the participants who treated housing data and equity markets as separate questions concluded in June 2008

[PLACEHOLDER — Reveal content. Final content: The specific inference from the housing data that was available in June 2008 — the stabilization in equities had not stabilized housing, and housing losses had not yet fully transmitted to the credit instruments that held them.]

[TEST: Reveal fires. State persists.]

## What the Quiet Summer Meant

[PLACEHOLDER — Residue. Final content: June 2008 as the false recovery. What the data that was public showed to those who read it. The three months before September 2008. WSJ Analysis close.]

[TEST: Concept links. See Also. Era gate.]

→ **Mortgage-Backed Securities** — the instruments whose value tracked the housing data with a lag

→ **Recession Defined** — the recession that was already underway during the quiet summer

→ **Panic Selling Cost** — what the September correction cost the households who sold in the quiet summer
```

- [ ] **Step 2: Update `cobra-insurance`**

Voice: Local Newspaper. Era 3. Ticker: elevated. 5 sections.

```
---
title: When the Health Coverage Stops: COBRA's Thirty-Day Window and What Happens After
era: 3
date: June 2008
category: Benefits
voice: Local Newspaper
ticker_state: elevated
sections: 5
concepts: ["cobra", "health-insurance", "layoff", "benefits"]
related: ["unemployment-insurance", "taxes-when-laid-off", "burn-rate"]
---
## The Letter Arrives After the Last Day

[PLACEHOLDER — Hook movement. Final content: Local Newspaper voice — human scale, specific setting. Opens on the COBRA election notice — the document that arrives after employment ends. The thirty-day window. The premium cost (which is the full premium plus 2% administrative fee, often three to four times what the employee paid while employed). Specific to a real household situation without naming names.]

[TEST: Ticker elevated. Era 3 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Documentary photograph
Subject: An envelope on a kitchen counter, unopened, marked with a benefits administrator return address. The envelope is not dramatic — it is ordinary. The kitchen is ordinary.
Era: 2008, American suburb
Tone: The specific weight of an unopened administrative letter
Technical: Available light. Shallow depth of field. No faces.
Source: Commission original
What not to show: Dramatic staging, opened letter with visible text, emotional reaction

## How COBRA Works

[PLACEHOLDER — Mechanics. Final content: The Consolidated Omnibus Budget Reconciliation Act — what it requires employers to offer, what the employee pays (full premium plus 2% administrative), the election window (60 days, not 30 — correct this from common misconception), the coverage continuation period (18 months standard). Local Newspaper voice — accessible, specific, no jargon without explanation.]

[TEST: Section 2/5. Canvas advance.]

## The Cost in 2008

[PLACEHOLDER — Scale. Final content: Average employer-sponsored health insurance premium in 2008 — employee contribution while employed versus COBRA cost. The delta. On a {{your_monthly_expenses}} budget, where COBRA fits or does not. Variables: {{your_monthly_expenses}} and {{your_cash}} as the budget context.]

[TEST: {{your_monthly_expenses}} and {{your_cash}} resolve.]

## What People Did When the Letter Arrived

[PLACEHOLDER — What People Did. Final content: Behavior data from 2008 layoffs — what most people did when the COBRA letter arrived (waited, elected near the end of the 60-day window, or declined). What the households that managed the transition most effectively did first. The reveal: the specific decision point that separated outcomes.]

▸ What the households that maintained coverage continuity did in the first week

[PLACEHOLDER — Reveal content. Final content: The first-week action that was available to everyone — the specific decision that was not about having more money but about making a decision faster.]

[TEST: Reveal fires. State persists.]

## What the Coverage Gap Costs

[PLACEHOLDER — Residue. Final content: A 2008 medical event without insurance coverage. What the gap cost the households that experienced it. Local Newspaper close — human scale, no abstraction.]

[TEST: Concept links. See Also. Era gate.]

→ **Unemployment Insurance** — the income replacement that runs concurrently with COBRA decision

→ **Burn Rate** — the coverage days calculation that COBRA premium dramatically shortens

→ **Taxes When Laid Off** — the tax implications that compound the benefits transition
```

- [ ] **Step 3: Update `taxes-when-laid-off`**

Voice: Local Newspaper. Era 3. Ticker: elevated. 5 sections.

```
---
title: Taxes When Laid Off: The Withholding Gap and the April Bill Nobody Planned For
era: 3
date: June 2008
category: Tax
voice: Local Newspaper
ticker_state: elevated
sections: 5
concepts: ["taxes", "withholding", "unemployment-income", "severance"]
related: ["unemployment-insurance", "cobra-insurance", "burn-rate"]
---
## The W-2 That Arrives After the Job Is Gone

[PLACEHOLDER — Hook movement. Final content: Local Newspaper voice. Opens on the specific tax situation of a household laid off mid-year in 2008 — severance is taxable, unemployment benefits are taxable (in 2008), withholding on severance is often miscalculated, and the W-2 from the former employer will show income that requires reconciliation. The April bill that arrives after the hardest year.]

[TEST: Ticker elevated. Era 3 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Documentary photograph
Subject: A kitchen table with a tax form, a calculator, and a severance letter — three documents that belong to three different moments in the same year. No faces. The documents are partially visible but not legible.
Era: Early 2009 (tax filing season for 2008 income)
Tone: The specific weight of administrative complexity arriving at the worst time
Technical: Available light. Flat lay. Neutral.
Source: Commission original
What not to show: Dramatic expression, visible numbers, IRS letterhead that implies audit

## How Withholding Works When Employment Ends Mid-Year

[PLACEHOLDER — Mechanics. Final content: The mechanics of W-4 withholding — calibrated for full-year employment. When employment ends mid-year, withholding is often over or under. Severance withholding at supplemental rate (25% in 2008). Unemployment benefits: taxable federal income in 2008, state varies. The mechanics, not the advice.]

[TEST: Section 2/5. Canvas advance.]

## The Tax Math in 2008

[PLACEHOLDER — Scale. Final content: A specific scenario — six months of employment plus six months of unemployment benefits plus severance. The withholding gap. The April reconciliation amount. Variables: {{your_monthly_income}} as the income basis for the calculation.]

[TEST: {{your_monthly_income}} resolves correctly.]

## What People Did With the April Bill

[PLACEHOLDER — What People Did. Final content: What most households laid off in 2008 did about tax planning (nothing, or nothing proactively). What the households that managed the tax year effectively did differently — not because they had an accountant, but because they made one decision early. Reveal: the specific early decision.]

▸ What the households that avoided the April surprise did before December 31

[PLACEHOLDER — Reveal content. Final content: The specific end-of-year action that was available to any household and cost nothing except attention.]

[TEST: Reveal fires. State persists.]

## What the Tax Year Looked Like in Retrospect

[PLACEHOLDER — Residue. Final content: The 2008 tax year as a specific administrative challenge for displaced households. What the record shows about the households that navigated it well versus those that were surprised in April 2009. Local Newspaper close.]

[TEST: Concept links. See Also. Era gate.]

→ **Unemployment Insurance** — the income source whose tax treatment most people got wrong

→ **COBRA Insurance** — the premium that was potentially deductible and often missed

→ **Burn Rate** — the coverage days that the April tax bill unexpectedly shortened
```

- [ ] **Step 4: Update `too-big-to-fail`**

Voice: WSJ Analysis. Era 3. Ticker: elevated. 5 sections.

```
---
title: Too Big to Fail: The Doctrine That Bear Stearns Tested and September Would Define
era: 3
date: June 2008
category: Banking Policy
voice: WSJ Analysis
ticker_state: elevated
sections: 5
concepts: ["too-big-to-fail", "systemic-risk", "moral-hazard", "federal-guarantee"]
related: ["bear-stearns", "mortgage-backed-securities", "recession-defined"]
---
## The Doctrine Before It Had That Name

[PLACEHOLDER — Hook movement. Final content: WSJ Analysis. Opens on the implicit doctrine — before "too big to fail" was a phrase in common use, the Federal Reserve had just guaranteed $30 billion of Bear Stearns assets to make a $2 acquisition possible. The doctrine existed before the name did. This article is about the doctrine, not its application — that comes in September.]

[TEST: Ticker elevated. Era 3 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Documentary photograph
Subject: The exterior of the New York Federal Reserve Bank building, Liberty Street, New York — stone facade, no signage visible except architectural detail. Ordinary business day.
Era: 2008
Tone: Institutional permanence — the building looks like it has always been there and will always be there
Technical: Available light, street level, no dramatic angle
Source: Wire archive
What not to show: Protesters, signage, dramatic weather, unusual activity

## The Mechanics of Systemic Risk

[PLACEHOLDER — Mechanics. Final content: What makes an institution systemically important — size, interconnection, counterparty exposure. Why letting Bear Stearns fail without intervention was analyzed as potentially catastrophic. The mechanics of contagion. WSJ Analysis — precise, no second person.]

[TEST: Section 2/5. Canvas advance.]

## The Scale of Interconnection in 2008

[PLACEHOLDER — Scale. Final content: Bear Stearns as prime broker to approximately 5,000 hedge funds. The counterparty exposure. What a disorderly failure would have meant for those counterparties. Variables: {{your_investment_value}} context for what exposure to these counterparties meant for retirement accounts.]

[TEST: {{your_investment_value}} resolves.]

## What Policymakers Decided and What It Cost

[PLACEHOLDER — What People Did. Final content: The specific decisions made over the Bear Stearns weekend — the Federal Reserve, JPMorgan, Treasury. What those decisions established about future interventions. The moral hazard argument. The reveal: what the March intervention told the institutions that paid attention about what September might bring.]

▸ What the institutions that read the March intervention correctly positioned for in September

[PLACEHOLDER — Reveal content. Final content: The specific inference from the Bear Stearns guarantee — that the government had revealed its preference for intervention over disorderly failure — and how the institutions that acted on this inference positioned.]

[TEST: Reveal fires. State persists.]

## The Doctrine in June 2008

[PLACEHOLDER — Residue. Final content: Too big to fail as an implicit doctrine in June 2008 — not yet tested at the scale it would be tested in September. What was known and what was not. WSJ Analysis close.]

[TEST: Concept links. See Also. Era gate.]

→ **Bear Stearns** — the institution whose intervention defined the doctrine in March

→ **Mortgage-Backed Securities** — the instruments that made the interconnection systemic

→ **Recession Defined** — the recession that was already underway as the doctrine was being tested
```

- [ ] **Step 5: Update `unemployment-insurance`**

Voice: Local Newspaper. Era 3. Ticker: elevated. 5 sections.

```
---
title: Unemployment Insurance: The Filing Date That Changes the Math
era: 3
date: June 2008
category: Benefits
voice: Local Newspaper
ticker_state: elevated
sections: 5
concepts: ["unemployment-insurance", "filing-date", "benefit-week", "job-search"]
related: ["cobra-insurance", "taxes-when-laid-off", "burn-rate"]
---
## The Four-Week Processing Window Nobody Mentioned

[PLACEHOLDER — Hook movement. Final content: Local Newspaper voice — human scale. Opens on the mechanics of UI claims processing — the one-week waiting period in most states plus three to four weeks of processing before first payment. The household that filed the week after layoff versus the household that waited three weeks. The difference: three to four weeks of additional coverage in the first payment. Nobody told them this.]

[TEST: Ticker elevated. Era 3 gate. BRIEF block renders. Section 1/5.]

BRIEF
Type: Documentary photograph
Subject: A state unemployment office waiting room — plastic chairs, numbered tickets, fluorescent light. 2008. Ordinary morning. Not crowded yet. The emptiness is temporary.
Era: Early 2008, any US state
Tone: Institutional waiting — the specific quality of bureaucratic process when it matters most
Technical: Available light, wide angle, no people faces visible
Source: Wire archive or commission original
What not to show: Dramatic crowding, distressed individuals, signs or paperwork legible enough to identify state

## How Unemployment Insurance Works

[PLACEHOLDER — Mechanics. Final content: The mechanics — eligibility requirements, base period wages, benefit calculation formula (varies by state), the waiting week, the weekly certification requirement. Why the filing date matters to the first payment date. Local Newspaper voice — accessible without condescension.]

[TEST: Section 2/5. Canvas advance.]

## The Filing Date Math

[PLACEHOLDER — Scale. Final content: A specific calculation — a household that files on Day 1 of layoff versus Day 22. The difference in first payment date. The benefit amount on a specific income. Variables: {{your_monthly_income}} as the basis for the benefit calculation.]

[TEST: {{your_monthly_income}} resolves. {{coverage_days}} context.]

## What People Did When They Were Laid Off

[PLACEHOLDER — What People Did. Final content: Behavior data from 2008 — what most households did about UI filing (waited, uncertain about eligibility, embarrassment as a factor). What the households that filed immediately did. The reveal: the specific first-day action that was available to everyone and that most people did not take.]

▸ What the households that maximized their benefit window did in the first 48 hours

[PLACEHOLDER — Reveal content. Final content: The specific first-48-hour actions — filing date, document gathering, waiting week start — that determined the coverage window, regardless of whether the household ultimately needed the full benefit period.]

[TEST: Reveal fires. State persists.]

## What the Four-Week Window Costs When Missed

[PLACEHOLDER — Residue. Final content: The dollar cost of a three-week filing delay on a specific income. What that amount meant in terms of coverage days. Local Newspaper close — human scale, specific without being instructional.]

[TEST: Concept links. See Also. Era gate.]

→ **COBRA Insurance** — the decision that runs concurrently with the UI filing window

→ **Taxes When Laid Off** — the tax treatment of UI benefits that most people got wrong

→ **Burn Rate** — the coverage days that immediate filing extends without increasing savings
```

- [ ] **Step 6: Commit**

```bash
git add data.js
git commit -m "content: add Era 3 article placeholder shells (bear-market, cobra, taxes-laid-off, too-big-to-fail, ui)"
```

---

## Task 4 — Era 4 Articles (6 articles)

**Files:**
- Modify: `data.js` — articles: `buying-the-dip`, `dollar-cost-averaging`, `index-funds`, `opportunity-cost`, `sp500`, `stimulus`

**Context:** Era 4 is September 2008 — the floor disappears. Lehman files. AIG requires government intervention. Ticker: crisis — fast and erratic. The gambler archetypes diverge here permanently.

- [ ] **Step 1: Update each article following the format spec above**

For each article: voice per assignment table, ticker_state: crisis, era: 4, 5 sections, BRIEF in section 1, reveal in section 4 (What People Did), feature checklist in each section, appropriate variables, concept links in section 5.

Content brief for each:

**buying-the-dip** — WSJ Analysis. The specific psychology of buying falling assets — when it is rational and when it is not. Opens on September 2008 as the moment that separated the two gambler archetypes. The households that bought the dip in September 2008 versus March 2009 had dramatically different outcomes.

**dollar-cost-averaging** — WSJ Analysis. The mechanics of DCA as a strategy that functioned correctly in 2008–2009 for the households that had the resources and the discipline to continue. Not a recommendation — a documentation of what actually happened to the households that continued automated contributions versus those that stopped.

**index-funds** — British Press. The specific irony of passive investing in 2008 — the index held everything including the worst-performing components, and the total return from March 2009 forward was the argument for holding. British Press: wry precision about a strategy that was correct despite being uncomfortable.

**opportunity-cost** — WSJ Analysis. Opens on a specific decision — September 2008, a household with $7,000 in cash, three options (pay down credit card, hold, invest). Each choice had a measurable opportunity cost by 2013. The article documents the calculation available at the time, not the hindsight version.

**sp500** — AP Wire. The S&P 500 index as a number — dateline, factual, inverted pyramid. The September–November 2008 decline. The specific close prices that marked the crisis stages. The index as documentation, not recommendation.

**stimulus** — Institutional Document. The Emergency Economic Stabilization Act (TARP) — what it authorized, what it cost, what it was designed to prevent. Institutional Document voice: official register, the scale of the intervention described in the language of the institution that authorized it.

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 4 article placeholder shells (buying-dip, dca, index-funds, opp-cost, sp500, stimulus)"
```

---

## Task 5 — Era 5 Articles (6 articles)

**Files:**
- Modify: `data.js` — articles: `401k-matching`, `assets-vs-liabilities`, `budget-reality`, `compound-interest`, `net-worth`, `roth-ira`

**Context:** Era 5 is October–November 2008 — the machinery of rescue. Ticker: chaotic — text cuts off, items repeat, fragments appear. TARP has passed. The government is an active participant. The scale of the numbers is surreal.

Content brief for each:

**401k-matching** — WSJ Analysis. The 401k match as an instrument that continued paying its guaranteed return (the match) regardless of what markets did. Opens on October 2008 — the market is in freefall and the match still returns 50–100% on the contributed dollar. The households that stopped contributions to protect cash versus those that continued.

**assets-vs-liabilities** — WSJ Analysis. The balance sheet as the document that reveals what the crisis actually cost each household. Opens on October 2008 — the specific question of whether the household's assets were liquid or illiquid at the moment liquidity mattered most.

**budget-reality** — Local Newspaper. A specific household in October 2008 — the budget revision triggered by a layoff notice or income reduction. The gap between estimated and actual monthly expenses when documented for the first time. The specific items that were larger than expected.

**compound-interest** — WSJ Analysis. Compound interest as the mechanism that made the October 2008 entry point valuable in 2013 and transformative by 2024 — for the households that had cash to deploy or continued contributions. The mathematics of the recovery period documented without hindsight framing.

**net-worth** — British Press. The net worth calculation in October 2008 — a number that most households had not calculated before the crisis, and that was lower than expected when they did. British Press: the specific wryness of an obvious arithmetic that produced an uncomfortable number.

**roth-ira** — WSJ Analysis. The Roth IRA as the instrument whose tax structure made contributions in October–November 2008 specifically valuable in a way that was not obvious at the time. The after-tax contribution on depreciated assets. The recovery that occurred inside the tax shelter.

- [ ] **Step 1: Update all six articles following the format spec**

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 5 article placeholder shells (401k, assets-liabilities, budget, compound-interest, net-worth, roth)"
```

---

## Task 6 — Era 6 Articles (8 articles)

**Files:**
- Modify: `data.js` — articles: `bull-market`, `crypto-basics`, `diversification`, `gig-economy-taxes`, `idle-cash-inflation`, `lifestyle-inflation`, `sequence-of-returns`, `tax-brackets`

**Context:** Era 6 is December 2008–January 2009 — the long winter. Ticker: elevated but heavy, the pace of accumulating loss. Unemployment is rising. The crisis has moved from institutional to human.

Content brief for each:

**bull-market** — WSJ Analysis. The definition of a bull market documented from inside what was not one. Opens on December 2008 — the S&P's October–November decline. What a bull market requires to be declared. What the households that understood they were in a bear market did differently.

**crypto-basics** — British Press. Bitcoin's first transaction occurred in January 2009 — this article is a British Press piece about what digital currency was at the bottom of the financial crisis. The specific irony of a currency born from institutional distrust, documented with the detachment of someone who has no idea what it will become.

**diversification** — Institutional Document. Diversification as a documented strategy — what it protected in 2008, what it did not protect, what the research showed about correlation during crisis. The institutional document of a strategy that was correct in principle and insufficient in practice during September–November 2008.

**gig-economy-taxes** — Local Newspaper. The household that moved to freelance or gig income during the 2008–2009 recession — the tax implications of self-employment income, quarterly estimated payments, the first April bill as a self-employed person. Local Newspaper: specific household, human scale.

**idle-cash-inflation** — AP Wire. CPI data for December 2008 — deflation was occurring while households were holding cash. The specific paradox of idle cash gaining real purchasing power during a deflationary moment. AP Wire: dateline, the numbers, no editorial.

**lifestyle-inflation** — Local Newspaper. The 2008–2009 recession as the event that documented lifestyle inflation in reverse — the household expenses that were optional when the income dropped. The specific items that turned out to be adjustable when the choice was forced.

**sequence-of-returns** — Long-Form Feature. The households retiring in 2008–2009 versus those retiring in 2012. The sequence of returns risk documented in real time. A narrative that follows two fictional households — same savings, different retirement dates — through the same market events. Long-Form Feature: the highest human register.

**tax-brackets** — WSJ Analysis. The marginal tax rate as a documented fact that most households misunderstood in 2008 — the confusion between marginal rate and effective rate, and what that confusion cost in financial decisions. WSJ Analysis: the arithmetic of a common misunderstanding.

- [ ] **Step 1: Update all eight articles following the format spec**

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 6 article placeholder shells (bull-market through tax-brackets)"
```

---

## Task 7 — Era 7 Articles (4 articles)

**Files:**
- Modify: `data.js` — articles: `eviction-moratorium`, `market-crash-vs-correction`, `panic-selling-cost`, `quantitative-easing`

**Context:** Era 7 is February–March 2009 — the bottom. Ticker: eerily still. S&P at 676 on March 9. Nobody knew it was the bottom.

Content brief for each:

**eviction-moratorium** — Local Newspaper. The households in foreclosure or eviction proceedings in Q1 2009. The specific timeline — notice to eviction — documented from inside a household that received notice in February 2009. The moratorium discussions that were happening in state legislatures. Local Newspaper: specific, human.

**market-crash-vs-correction** — AP Wire. The technical definitions — a correction (10%+ decline) versus a crash (20%+ rapid decline). The 2008–2009 decline as documented in AP Wire register. The specific percentages from peak to trough. Dry, factual, dateline.

**panic-selling-cost** — WSJ Analysis. The measurable cost of selling equities in October 2008 versus holding through to March 2009 and beyond. The specific dollar difference on a $10,000 position. Variables: {{your_investment_value}} as the basis for the calculation. The households that sold at the bottom versus those that held.

**quantitative-easing** — Institutional Document. The Federal Reserve's first round of quantitative easing (QE1) announced November 2008 and expanded March 2009 — what it was, what it was designed to do, what it did to interest rates and asset prices. Institutional Document voice: the language of a Federal Reserve statement.

- [ ] **Step 1: Update all four articles following the format spec**

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 7 article placeholder shells (eviction, crash-vs-correction, panic-selling, qe)"
```

---

## Task 8 — Era 8 Articles (8 articles)

**Files:**
- Modify: `data.js` — articles: `bonds-and-rates`, `cpi`, `fed-funds-rate`, `housing-affordability`, `i-bonds`, `inflation-mechanics`, `real-vs-nominal-returns`, `wage-price-spiral`

**Context:** Era 8 is April–December 2009 — the first breath. Ticker: elevated, finding its pace. The market is rising from the March 9 bottom but the recovery does not feel like one.

Content brief for each:

**bonds-and-rates** — WSJ Analysis. The inverse relationship between bond prices and interest rates documented from the 2009 rate environment — near-zero Fed funds rate, what that meant for bond yields, what households holding bond funds experienced as rates stayed low for the next decade.

**cpi** — Institutional Document. The Consumer Price Index release for 2009 — the specific numbers, what deflation looked like in the data, what the methodology captures and does not capture. Institutional Document: official register, the index as a documented artifact.

**fed-funds-rate** — AP Wire. The Fed funds rate at the zero lower bound — announced December 2008, maintained through 2009. What that meant for savings rates, loan rates, the household balance sheet. AP Wire: dateline, the number, the implications in plain language.

**housing-affordability** — Local Newspaper. The housing market in late 2009 — prices declining, rates near-zero, but credit tightening. The first-time buyer in Q3 2009 — the affordability math when the purchase price had fallen but the mortgage qualification requirements had risen. Local Newspaper: specific household, the arithmetic of the application.

**i-bonds** — British Press. Series I savings bonds in 2009 — inflation protection instruments in a deflationary year. The specific irony of an inflation-linked instrument during deflation. British Press: precise, wry, the full absurdity of the timing acknowledged without drama.

**inflation-mechanics** — WSJ Analysis. How inflation is generated and destroyed — the mechanics that were the subject of intense Federal Reserve focus in 2009. What deflation meant for household debt in real terms. The mechanism, documented.

**real-vs-nominal-returns** — WSJ Analysis. The difference between the nominal S&P return from March 2009 and the real return adjusted for the inflation that came later. What the 2009 investment return actually returned in purchasing power terms by 2013 and 2024. The arithmetic of real returns.

**wage-price-spiral** — AP Wire. The wage-price spiral as a documented economic risk — the fear of deflation anchoring wages in 2009. AP Wire: the fear as it appeared in the data, not as it was later understood. The specific economic language of 2009 commentary.

- [ ] **Step 1: Update all eight articles following the format spec**

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 8 article placeholder shells (bonds, cpi, fed-funds, housing through wage-price)"
```

---

## Task 9 — Era 9 Articles (4 articles)

**Files:**
- Modify: `data.js` — articles: `ai-and-employment`, `high-rates-home-buying`, `market-valuation`, `reading-your-documents`

**Context:** Era 9 is present mode — the rearview mirror. Ticker: calm but present tense, different register. The content shifts to current data. The reader's own situation in the current year.

Content brief for each:

**ai-and-employment** — WSJ Analysis. AI displacement risk documented with the same analytical tools used to document 2008 employment risk. The household employment buffer (coverage days) as the appropriate response to any employment risk, whether from recession or automation. The 2008 playbook applied to the present moment.

**high-rates-home-buying** — Local Newspaper. The first-time buyer in 2023–2024 — the affordability math when prices had recovered from 2009 lows and rates had risen from zero. The same household arithmetic as 2009 (housing-affordability) but with inverted rate environment. Local Newspaper: specific household, specific numbers.

**market-valuation** — British Press. The tools for evaluating whether equity markets are expensive — P/E ratios, CAPE, the Buffett indicator — described with British Press precision and appropriate skepticism about each metric's predictive value.

**reading-your-documents** — Institutional Document. The financial documents a household should be able to read — brokerage statement, 401k statement, mortgage statement, insurance declaration page. What each document says and where the important numbers are. Institutional Document: the language of financial disclosure, translated.

- [ ] **Step 1: Update all four articles following the format spec**

- [ ] **Step 2: Commit**

```bash
git add data.js
git commit -m "content: add Era 9 article placeholder shells (ai-employment, high-rates, market-valuation, reading-docs)"
```

---

## Task 10 — Present Article (1 article)

**Files:**
- Modify: `data.js` — article: `present/getting-started`

**Context:** Present mode — the simulation's exit. The reader's own situation in the current year, with the concepts from the simulation translated to present-tense numbers.

Content brief:

**getting-started** — British Press. The article that closes the simulation and opens the reader's present situation. Not a summary — a start. The same five-movement structure, but the numbers are the reader's numbers, the era is now, and the emotional register is the specific quality of understanding something fully that you did not understand while it was happening. Variables are central — this article is designed to resolve {{your_cash}}, {{coverage_days}}, {{your_monthly_expenses}}, and {{your_investment_value}} in every section.

- [ ] **Step 1: Update `present/getting-started` following the format spec**

- [ ] **Step 2: Final commit**

```bash
git add data.js
git commit -m "content: add Present article placeholder shell (getting-started) — full simulation shell complete"
```

---

## Verification Checklist (run after all tasks complete)

- [ ] All 49 articles have `voice` and `ticker_state` in frontmatter
- [ ] All 49 articles have `sections:` count matching actual `##` heading count
- [ ] Every article has exactly one BRIEF block
- [ ] Every article has exactly one `▸` reveal line
- [ ] Every article has at least two variable references (`{{...}}`)
- [ ] Every article has at least two `→ **concept**` links in the Residue section
- [ ] No article uses second-person "you" outside of bracket checklist items
- [ ] `[PLACEHOLDER —` and `[TEST:` markers appear in every section
- [ ] No JS syntax errors in `data.js` (template literals properly closed with backtick)
- [ ] All article slugs in `related:` fields are valid slugs that exist in `data.js`

---

## Notes for the Implementer

- **Tasks 1–3** provide complete article text. **Tasks 4–10** provide content briefs — the implementer writes the placeholder sections using the format from Tasks 1–3 as the exact template.
- The `emergency-fund` article in Task 1 is a special case — add TEST lines only, do not replace existing content.
- Do not change `_template` — it is a structural reference, not a live article.
- The `data.js` file uses JS template literals. Every article string opens with a backtick after the slug key and closes with a backtick-comma. Do not break this syntax.
- Commit after each era batch. If a commit fails, check for unclosed template literals.
