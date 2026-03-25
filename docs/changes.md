## Remove

**Pressure gauge** — agreed to remove entirely. No replacement.

**Ghost track labels, colors, and profile pages** — agreed to remove entirely. No named tracks. No colored dots in the margin. No separate pages for each character.

**Section structure labels** — "What It Is", "Your Number", "The Math", "What People Did", "What It Connects To", "Your Next Step" — these make it feel like a curriculum. Agreed to remove as visible headers.

**All scroll inside article screens** — every article screen must be exactly one viewport tall. No overflow. No scrolling within a screen.

**"Read in: Encyclopedia · Newspaper" as a separate block** — agreed to fold these controls into the ticker as pauseable, cycleable controls.

---

## Change

**The ticker behavior** — not just a scrolling display. It creates tension through behavior. Speeds up as economic stress increases. Glitches — repeats a line, stutters, cuts off mid-word — to signal that something has changed without announcing it. The `⏸ ‹ ›` controls fold into the ticker itself in monospace, looking like part of the data feed not a UI element.

**The ghost tracks** — disguised entirely as "See also" reference links in the margin. No names. No colors. Just behavior described in dry factual language. You tap one to expand it. More detail appears. You piece together who they are through repeated encounters across articles, not through introduction. They evolve across eras — starting as two quiet links and slowly becoming a full interactive panel by Era 6 onward. That evolution is how the app reveals itself gradually.

**The article text tone** — not educational, not entertainment. Dry authoritative journalism with a current running underneath it. Scandalous where the facts are scandalous. The kind of writing where you forget you weren't interested in the subject. Clickbait headlines that lead into writing that earns them.

**The home screen** — can scroll. Has the "Did You Know" hooks, featured article, in the news headlines, on this day strip. This part of the original spec was correct and stays. The scroll restriction only applies inside article screens.

**The "Did You Know" hooks** — rewritten to be genuinely grabby. Legal crimes, big money made, small actions with outsized consequences, things that were done to ordinary people without their knowledge. The three directions agreed on were withholding hooks, personal accusation hooks, and true crime tone hooks.

**Content length per article screen** — two to four short paragraphs maximum per screen. Written to fit one viewport. This is a writing constraint, not just a CSS fix.

**The margin** — feels like a Wikipedia reference column. Quiet. Slim. Never draws attention to itself. Contains only "See also" entries and relevant data panels like the Fed rate table or the BSC price history. Nothing that looks like app navigation.

**The navigation shell** — still appears after the first complete article is read. Still slides in from the left on desktop, bottom bar on mobile. Still has five icons. Still shows clarity score next to the icon. This was not changed but was not visible in the broken build.

**The source view** — `< >` link in the breadcrumb row. Barely visible. Opens an overlay from the bottom showing exactly which file powers the current screen, which variables are in use, and how each calculation works. Agreed and working in mockup. Needs to carry into real app.

---

## Add

**Branching narrative structure** — one continuous story that branches based on what you tap. Not separate articles. Not a curriculum. A single narrative thread moving from 2008 to 2026 where the path you take depends on which inline links you follow. Every branch converges at fixed points — the Lehman collapse, the market bottom, the final screen.

**Inline links that withhold** — phrases in the article text that function as clickbait by withholding just enough to make the tap feel inevitable. Not "Learn about mortgage-backed securities." The phrase "had a name that most Americans had never heard before" as the link.

**The reveal mechanic** — a single tap-to-expand element per screen. Not a section. Just one line that says something like "▸ What the other four had instead of a number." Expands one paragraph. Collapses when you advance. Never more than one per screen.

**Variable numbers as inline editable elements** — monospace numbers in the article text with a barely-visible `▸` indicator. Tapping opens the margin editor. You type your real number. The article updates in place. The margin closes when you tap anywhere in the article body. No save button. Writes immediately.

**The "See also" evolution arc** — Era 1 has two quiet links with no dates. Era 2 adds dates and one line of context. Era 3 adds numbers that are starting to feel familiar. Era 4 drops the label entirely, entries get longer. Era 5 adds a tap-to-expand detail. Era 6 adds a spark line in monospace characters. Era 7 onward is a full interactive panel. The transition is never announced.

**Branch chips at the bottom of some screens** — two or three monospace chips that offer alternate directions into the narrative. Not navigation. Feels like "related reading" that you choose. Only appears on screens where there are meaningful branches available.

**The static-to-live illusion arc** — the ticker appears first as a flat illustration inside the Federal Reserve article. It looks like a screenshot. It becomes live two sections later without announcement. The margin "See also" entries start as static text and become interactive over time. Nothing introduces itself.

**The accuracy game layer** — after the simulation you can build your own simulation for any year. The app gives you a variable template. You research and fill it in. Your accuracy is scored against actual historical data. This is the long-term game mechanic. The shell for this exists but is undeveloped until you finish the 2008 simulation.

---

## Confirmed Unchanged From Original Spec

**The two themes** — Encyclopedia and Newspaper. Both still apply. Theme switch at the bottom of every screen as a plain text selector.

**The iCloud sync** — all data lives at `C:\iCloudDrive\american_pie`. Files are plain JSON and markdown. The app reads and writes to this folder. Changes sync across desktop and mobile.

**The file structure** — articles as markdown files with `{{variable}}` tags, variables as JSON, events and ghost track logs as JSON. All still applies.

**The clarity score** — always visible in the top right of every article screen. Goes up as you read and engage. Never goes down in simulation. In the real app it can reflect whether understanding has been applied to real life.

**The undeveloped section behavior** — every section of the app exists and navigates correctly. Undeveloped sections load their header and breadcrumb and then show a quiet honest message pointing somewhere that is built. Never "coming soon." Never locked.

**The final simulation screen** — no fanfare. No score. Just: "The simulation is complete. The real app is waiting. Your numbers are different. The concepts are the same." Two options: start over or switch to Present.