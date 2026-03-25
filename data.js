export const data = {
  articles: {
    "_template": `---
title: Article Title
era: 1
date: Month Year
category: Topic
sections: 6
concepts: ["concept-key"]
related: ["related-article-slug"]
---
## What It Is
Plain language definition. No jargon.

## Your Number
Your number: **{{your_cash}}**

## The Math
Step by step with **{{your_monthly_expenses}}**.

## What People Did
**What most people did**
Short paragraph.

**What financially stable people did**
Short paragraph.

## What It Connects To
→ **Related** — one line.

## Your Next Step
One concrete action today.
`,
    "bear-stearns": `---
title: Bear Stearns
era: 2
date: March 2008
category: Markets
sections: 6
concepts: ["shadow-banks"]
related: ["mortgage-backed-securities", "too-big-to-fail"]
---
## What It Is
Bear Stearns was a major investment bank—far from most people’s day-to-day life, yet tightly wired into credit that touched ordinary households.

## Your Number
Stress in funding markets shows up in your life as tighter credit, volatile jobs, and slower hiring—not only in stock tickers.

## The Math
When a large dealer struggles, the cost of borrowing and the willingness to lend can shift quickly across the economy.

## What People Did
**What most people did**

They learned the name only when headlines turned scary.

**What financially stable people did**

They treated job and cash-runway decisions as if funding markets can freeze—even when “it looks contained.”

## What It Connects To
→ **Mortgage-backed securities** — the plumbing behind the headlines.

## Your Next Step
Read one plain-English explainer on repo markets and dealer funding—enough to know why size and speed matter.
`,
    "bull-market": `---
title: Bull Market
era: 6
date: 2013
category: Markets
sections: 6
concepts: ["bull-market"]
related: ["sequence-of-returns", "diversification"]
---
## What It Is
A bull market is an extended period of generally rising prices. It can make passive decisions look like genius—and noise look like skill.

## Your Number
Your plan should survive a bad decade, not only a good one—start from **{{your_monthly_expenses}}** of real monthly needs.

## The Math
Long average returns coexist with deep drawdowns. Your sequence matters as much as the average.

## What People Did
**What most people did**

They increased lifestyle spending as portfolios grew.

**What financially stable people did**

They rebalanced and kept contributions automatic through discomfort.

## What It Connects To
→ **Sequence of returns** — why timing near retirement changes outcomes.

## Your Next Step
Write down one rule you will follow *before* the next 20% drawdown arrives.
`,
    "burn-rate": `---
title: Burn Rate
era: 2
date: March 2008
category: Cash Flow
sections: 6
concepts: ["burn-rate"]
related: ["emergency-fund", "checking-vs-savings"]
---
## What It Is
Burn rate is what you spend to live each month—the cash that actually leaves your accounts—before any optional choices.

## Your Number
Your monthly spending baseline: **{{your_monthly_expenses}}**

## The Math
With **{{your_monthly_expenses}}** leaving each month, a **{{your_cash}}** cushion is about **{{coverage_days}} days** at that pace.

## What People Did
**What most people did**

They estimated spending from memory and were usually low by double digits.

**What financially stable people did**

They used three months of statements and averaged the outflows.

## What It Connects To
→ **Emergency Fund** — burn rate turns cash into days of runway.

## Your Next Step
Average your last three months of total outflows. That single average is your burn rate until you refine categories.
`,
    "emergency-fund": `---
title: Emergency Fund
era: 1
date: March 2008
category: Banking
sections: 6
concepts: ["emergency-fund", "burn-rate", "coverage-days"]
related: ["burn-rate", "checking-vs-savings", "unemployment-insurance"]
---
## What It Is
An emergency fund is money set aside specifically to cover unexpected expenses or loss of income without disrupting your regular financial life. It is not an investment. It is not savings toward a goal. It is a buffer between you and the decisions people make when they are desperate.

In March 2008, the median American household had $6,800 in liquid savings. This sounds like a cushion. For most households, it covered less than 47 days of expenses. Many did not know that number until they needed it.

Your estimated coverage: **{{coverage_days}} days**

## Your Number
Your emergency fund coverage is calculated from two numbers you already know: how much cash you have and how much you spend each month.

Monthly expenses: **{{your_monthly_expenses}}**

Current cash: **{{your_cash}}**

Coverage: {{your_cash}} ÷ {{your_monthly_expenses}} × 30 = **{{coverage_days}} days**

The standard recommendation is 90 to 180 days. Most financial advisors consider anything under 30 days a critical gap. Not because catastrophe is certain, but because you are one event away from choices you do not want to make.

## The Math
Why does 90 days matter specifically?

The average job search in 2008 took 5 months for someone with marketable skills in a normal economy. In a recession, that extended to 7 to 9 months. Unemployment insurance, if applied for immediately, replaces approximately 40 to 50 percent of prior income. The gap between what unemployment pays and what you actually spend must come from somewhere.

At **{{your_monthly_expenses}}** per month with unemployment covering 45 percent:

Monthly gap: {{your_monthly_expenses}} × 0.55 = approximately **{{income_gap}}**

At that gap rate, your **{{your_cash}}** covers approximately **{{covered_months_with_ui}}** with unemployment assistance, or **{{coverage_days}}** without it.

This is your number. Knowing it is the entire point of this section.

## What People Did
**What most people did**

In 2008, 61 percent of Americans who lost their job waited more than three weeks to reduce spending. By then, the average household had used $1,400 of savings unnecessarily.

Most did not calculate their burn rate until the third or fourth week of unemployment. By then, the decisions became harder.

The second most common mistake: withdrawing from a 401k. Early withdrawal costs 10 percent penalty plus income tax on the amount withdrawn. A $10,000 withdrawal might net $6,500 after penalties and taxes. Most people who did this in 2008 called it the most expensive mistake of their financial lives.

**What financially stable people did**

They calculated their exact burn rate within 48 hours of job loss and cut non-essential spending immediately. Not because they panicked. Because the math was clear. They knew their number. They knew how long they had. They did not guess.

They also filed for unemployment insurance immediately. Not three weeks later. Immediately. The first check takes three to four weeks to arrive regardless of when you file. Waiting to file means waiting longer for the first check.

▸ If you had known this before 2008

The average person who calculated their burn rate and filed for unemployment within 48 hours of job loss in 2008 preserved $2,300 more of their savings over the following six months than someone who waited. That $2,300, invested in March 2009 during the market bottom, would be worth approximately $15,700 by 2024.

The lesson is not about the money. The lesson is that knowing your number in advance removes the paralysis that causes the delay that causes the unnecessary spending.

## What It Connects To
This concept touches three others directly:

→ **Burn Rate** — the monthly expense number that powers all emergency fund calculations. Knowing your burn rate precisely makes this number real instead of estimated.

→ **Checking vs Savings** — where your emergency fund lives matters. Cash sitting in checking earns nothing. The same cash in a high-yield savings account earned 4.5 percent in early 2008. On $7,000 that is $315 per year for doing nothing differently.

→ **Unemployment Insurance** — how UI payments interact with your emergency fund changes the calculation significantly. Understanding both together gives you a far more accurate picture of your actual runway.

## Your Next Step
Find your last three months of bank statements. Add the total spending for each month. Divide by three. That is your burn rate. Divide your current cash by that number and multiply by 30.

That is how many days you have. Write it down. It is the most important number in your financial life right now and most people have never calculated it.

If you are using mock data, your number is **{{coverage_days}} days**. To see your real number, tap any value above and enter your actual figures.
`,
    "federal-reserve": `---
title: Federal Reserve
era: 1
date: March 2008
category: Policy
sections: 6
concepts: ["federal-reserve", "rates"]
related: ["interest-rates", "inflation"]
---
## What It Is
The Federal Reserve sets short-term interest-rate expectations and acts as a backstop in stress. Its tools reach savings yields, loan rates, credit availability, and employment indirectly.

## Your Number
The policy rate you can track in the app: **{{fed_funds_rate}}**

## The Math
When the Fed cuts, the pass-through to your savings is not instant or complete—but the direction matters for cash held at banks and for debt service on variable products.

## What People Did
**What most people did**

They heard “the Fed cut” without connecting it to their savings APY or their credit card margin.

**What financially stable people did**

They rechecked what their cash earned and what their variable debt cost within the same month.

## What It Connects To
→ **Interest rates** — how policy ripples to you.

## Your Next Step
Open your bank’s rate page and write down what cash actually earns today next to **{{fed_funds_rate}}** as a benchmark.
`,
    "inflation": `---
title: Inflation
era: 2
date: 2008
category: Prices
sections: 6
concepts: ["inflation"]
related: ["interest-rates", "idle-cash"]
---
## What It Is
Inflation is a sustained rise in the general level of prices. Even calm-looking years can chip away at purchasing power—especially for cash that earns nothing.

## Your Number
Cash on hand: **{{your_cash}}** — its *real* footprint depends on what it earns versus prices around you.

## The Math
Small differences in annual erosion compound over years. The point is not precision on day one—it is noticing the drag early.

## What People Did
**What most people did**

They measured success by account balance, not by what that balance buys.

**What financially stable people did**

They separated “safe” from “earning enough not to lose to inflation after tax.”

## What It Connects To
→ **Interest rates** — one channel policy uses to steer inflation.

## Your Next Step
Pick one recurring bill and track its line-item cost for three months to feel price stickiness firsthand.
`,
    "present/getting-started": `---
title: Getting Started With Your Real Numbers
era: present
date: Present
category: Your Situation
sections: 4
concepts: ["real-data", "first-steps", "document-organization"]
related: ["emergency-fund"]
---
## The First Number That Matters
Before anything else in this app becomes personal, you need one number: your monthly burn rate.

This is not your income. It is not your rent. It is the total amount of money you spend in an average month on everything. Rent, food, transportation, subscriptions, utilities, everything.

You do not need to know this precisely to start. An estimate within $200 is close enough for now. You will refine it as you use the app.

To find it: open your last three bank statements. Add the total money that left your account each month. Divide by three. That is your burn rate.

Tap the value below to enter your number:

Your monthly burn rate: **{{your_monthly_expenses}}**

## What To Enter Next
With your burn rate entered, two things become real:

Your coverage days with current cash: **{{coverage_days}} days**

Your monthly income gap if you lost income today: **{{income_gap}}** (what expenses exceed unemployment)

These two numbers determine everything else in this app. Every article, every calculation, every "did you know" item will become personal once these are set.

Enter your current cash next. It is on your bank app right now. Just the checking and savings total. Not investments yet.

Your current cash: **{{your_cash}}**

## How To Organize Your Documents
You do not need to upload anything. You do not need to scan anything. You need to know where things are when the app asks for a specific number.

Create one folder on your computer: **Documents → finances → bank-statements → pay-stubs → tax-returns → other**

When the app asks for a number, it will tell you exactly which document has it and exactly where on the document to look. Your job is to have the document in the right folder so you can find it in under 30 seconds.

That is the entire organization system. Simple enough to actually use. Structured enough to actually work.

## Your First Watch List Item
The first thing to monitor in your real financial life is the Federal Reserve interest rate. Not because you are investing. Because the rate affects your savings account, any debt you carry, and the job market you are navigating.

Check it once a month at: **federalreserve.gov → Monetary Policy → Target Rate**

Current rate as you have entered it: **{{fed_funds_rate}}**

When it changes, update that value in your variables file. The app will show you exactly what the change means for your specific situation.
`,
    "unemployment-insurance": `---
title: Unemployment Insurance
era: 3
date: 2008
category: Safety Net
sections: 6
concepts: ["unemployment-insurance"]
related: ["emergency-fund", "burn-rate"]
---
## What It Is
Unemployment insurance replaces only part of prior wages for a limited time—rules vary by state, but filing delay costs real money.

## Your Number
With expenses at **{{your_monthly_expenses}}**, a 45% replacement rate leaves roughly **{{income_gap}}** per month to cover from savings or cuts.

## The Math
The math is simple and brutal: monthly gap × months of job search = burn from the fund you could have preserved by acting fast.

## What People Did
**What most people did**

They waited to file because the process felt embarrassing or confusing.

**What financially stable** people did

They filed immediately, then built a spend plan against the known benefit amount.

## What It Connects To
→ **Emergency fund** — fills the gap UI does not cover.

## Your Next Step
Look up your state’s filing URL and the documents you need before you need them.
`,
  },
  simulations: {
    "2008/did-you-know": [{"hook":"net-worth-drop","text":"The average American household lost 39% of their net worth between 2007 and 2010."},{"hook":"no-ef","text":"57% of Americans had no emergency fund in 2008."},{"hook":"seven-k","text":"A person who invested {{your_cash}} in March 2009 would have grown it materially by 2024—the figure seeds from your cash variable."},{"hook":"mbs","text":"Most people learned what a mortgage-backed security was only after losing money because of one."},{"on_this_day":"March 14, 2008","text":"JP Morgan acquired Bear Stearns for $2 per share. One year earlier the stock traded at $172. People who understood what this meant acted within hours.","body":"JP Morgan acquired Bear Stearns for $2 per share. One year earlier the stock traded at $172. People who understood what this meant acted within hours."},{"on_this_day":"January 2008","text":"The Fed opened the year still cutting rates as housing stress spread through credit markets.","body":"The Fed opened the year still cutting rates as housing stress spread through credit markets."}],
    "2008/events": [{"id":"2008-01","date":"January 2008","era":1,"headline":"Federal Reserve cuts interest rates again as credit stress builds","ticker_text":"FED CUTS RATES · CREDIT CONDITIONS TIGHTEN","track":"economy","article":"federal-reserve","stress_level":12,"variables_affected":["fed_funds_rate"],"ghost_track_updates":{}},{"id":"2008-03-bear","date":"March 2008","era":2,"headline":"Bear Stearns reports heavy losses tied to mortgage-backed securities","full_headline":"Bear Stearns reports $1.9B loss tied to mortgage-backed securities","ticker_text":"BEAR STEARNS · MBS LOSSES","track":"markets","article":"bear-stearns","stress_level":38,"variables_affected":[],"ghost_track_updates":{}},{"id":"2008-03-unemployment","date":"March 2008","era":2,"headline":"US unemployment reaches multi-year highs","ticker_text":"UNEMPLOYMENT CLIMBS · SENTIMENT WEAK","article":"unemployment-insurance","stress_level":38,"variables_affected":[],"ghost_track_updates":{}},{"id":"2008-oil","date":"March 2008","era":2,"headline":"Oil prices touch triple digits for the first time","ticker_text":"OIL · $100","article":"inflation","stress_level":38,"variables_affected":[],"ghost_track_updates":{}},{"id":"2008-confidence","date":"March 2008","era":2,"headline":"Consumer confidence weakens to a multi-year low","ticker_text":"CONSUMER CONFIDENCE · WEAK","article":"bull-market","stress_level":38,"variables_affected":[],"ghost_track_updates":{}},{"id":"2008-fed-2","date":"March 2008","era":2,"headline":"Federal Reserve cuts interest rates for the fourth time in six months","ticker_text":"FED CUTS RATES 25BPS · FOURTH CUT IN SIX MONTHS","article":"federal-reserve","stress_level":38,"variables_affected":["fed_funds_rate"],"ghost_track_updates":{}}],
    "2008/ghost-tracks": {"winner":{"color":"#2D6A4F","label":"The Winner","philosophy":"Smart, boring, consistent decisions made early.","log":[{"date":"January 2008","cash":7000,"monthly_burn":2100,"coverage_days":100,"credit_card_debt":0,"net_worth":7000,"action":"Moved two months of expenses to a high-yield savings account.","thinking":"If it sits in checking, it earns nothing."},{"date":"March 2008","cash":7000,"monthly_burn":2100,"coverage_days":100,"credit_card_debt":0,"net_worth":7120,"action":"Calculated monthly burn rate for the first time. Result: $2,100/month.","thinking":"I need to know exactly where I stand."}]},"weatherer":{"color":"#1D3557","label":"The Weatherer","philosophy":"Never got ahead. Never collapsed.","log":[{"date":"January 2008","action":"Saw the Fed cuts. Did not change where cash sat.","thinking":"Headlines are noisy."},{"date":"March 2008","action":"Tracked account balances weekly but avoided big moves.","thinking":"Steady as it goes."}]},"unaware":{"color":"#E9C46A","label":"The Unaware","philosophy":"Did not know the rules. Most common outcome.","log":[{"date":"January 2008","action":"Did not see the news about rates.","thinking":"Things feel normal."},{"date":"March 2008","action":"Paid rent from checking; did not compute runway.","thinking":"Things will pick up soon."}]},"gambler_lost":{"color":"#E63946","label":"The Gambler Who Lost","philosophy":"Knew everything. Acted on it badly.","log":[{"date":"January 2008","action":"Increased short exposure to financials.","thinking":"The stress is tradable."},{"date":"March 2008","action":"Shorted Lehman. Position up 40% (then variance hits later).","thinking":"Volatility is the product."}]},"gambler_won":{"color":"#6A994E","label":"The Gambler Who Won","philosophy":"Same knowledge. Better timing.","log":[{"date":"January 2008","action":"Increased short exposure to financials.","thinking":"The stress is tradable."},{"date":"March 2008","action":"Shorted Lehman. Position up 40%.","thinking":"Same trade — for now identical to the other track."}]}},
    "2008/variables": {"fed_funds_rate":{"value":3,"unit":"percent","confirmed":true,"source":"federalreserve.gov","last_checked":"2008-03-01","notes":"Target rate after early-2008 cuts (mock trajectory)"},"your_monthly_expenses":{"value":2100,"unit":"dollars","confirmed":true,"source":"mock data","last_checked":"2008-01-01","notes":"Rent 950, food 400, car 300, other 450"},"your_cash":{"value":7000,"unit":"dollars","confirmed":true,"source":"mock data","last_checked":"2008-01-01","notes":"Starting position — checking and savings"},"your_monthly_income":{"value":2100,"unit":"dollars","confirmed":true,"source":"mock data","last_checked":"2008-01-01","notes":"Take-home used in baseline ghost tracks"},"stress_level":{"value":38,"unit":"number","confirmed":true,"source":"simulation","last_checked":"2008-03-01","notes":"Era 2 baseline for UI"}},
    "present/did-you-know": [{"text":"Enter your cash and burn rate in Getting Started to personalize every hook here."},{"text":"The app never pulls data for you — you bring the numbers, it teaches the meaning."}],
    "present/events": [{"id":"present-1","date":"Present","headline":"Curate your own headlines in simulations/present/events.json","article":"getting-started","stress_level":10}],
    "present/ghost-tracks": {"winner":{"color":"#2D6A4F","label":"Future You (disciplined)","log":[{"date":"Present","action":"Placeholder — your real-app log grows as you use the app.","thinking":"Start by entering real numbers once."}]},"weatherer":{"color":"#1D3557","label":"Steady profile","log":[{"date":"Present","action":"No simulation entries yet.","thinking":""}]},"unaware":{"color":"#E9C46A","label":"Baseline","log":[{"date":"Present","action":"No simulation entries yet.","thinking":""}]},"gambler_lost":{"color":"#E63946","label":"High risk","log":[{"date":"Present","action":"No simulation entries yet.","thinking":""}]},"gambler_won":{"color":"#6A994E","label":"High risk + luck","log":[{"date":"Present","action":"No simulation entries yet.","thinking":""}]}},
    "present/variables": {"your_cash":{"value":null,"unit":"dollars","confirmed":false,"source":"","last_checked":"","notes":"Total liquid cash — checking + savings (from your bank app)."},"your_monthly_expenses":{"value":null,"unit":"dollars","confirmed":false,"source":"","last_checked":"","notes":"Average monthly spending — last three statements, sum outflows ÷ 3."},"your_monthly_income":{"value":null,"unit":"dollars","confirmed":false,"source":"","last_checked":"","notes":"Take-home pay per month (net on pay stub)."},"fed_funds_rate":{"value":null,"unit":"percent","confirmed":false,"source":"federalreserve.gov","last_checked":"","notes":"Monetary Policy → Target Range."},"stress_level":{"value":10,"unit":"number","confirmed":false,"source":"user","last_checked":"","notes":"Personal stress index you maintain manually (0–100)."}},
    "present/watch-list": [{"variable":"fed_funds_rate","label":"Federal funds target rate","source":"federalreserve.gov","cadence":"monthly"},{"variable":"your_cash","label":"Liquid cash total","source":"Bank app","cadence":"monthly"},{"variable":"your_monthly_expenses","label":"Burn rate","source":"Statements","cadence":"monthly"}],
  },
  worksheets: {
    "real-life-snapshot": `# Real Life Snapshot

One-page printable snapshot. Fill from \`simulations/present/variables.json\` as you progress.

- **Monthly burn rate (outflows):** _______________
- **Liquid cash (checking + savings):** _______________
- **Coverage (days):** _______________
- **Monthly take-home:** _______________
- **Credit card balances:** _______________
- **Fed funds rate (as you track it):** _______________
`,
    "simulation-research": `# Simulation Research Worksheet

Use this when building a year-by-year simulation. For each variable in \`simulations/[year]/variables.json\`, record where you found the number, the date checked, and whether it is confirmed or estimated.

| Variable | Your value | Unit | Source URL or document | Last checked | Confirmed? | Notes |
|----------|------------|------|-------------------------|--------------|------------|-------|
|          |            |      |                         |              |            |       |
`,
  },
  sources: {
    "where-to-find-things": `# Where To Find Things

Master reference for locating numbers the app asks for.

| Topic | Typical source | Notes |
|-------|----------------|-------|
| Liquid cash | Bank mobile app — accounts | Exclude brokerage until the article asks for investments |
| Monthly spending | Last 3 months statements — total outflows | Not income — cash leaving accounts |
| Fed funds target | federalreserve.gov — Monetary Policy | Monthly check is enough for learning |
| Unemployment rules | Your state workforce / labor site | Filing requirements change |

Add per-year notes under \`sources/[year]/\` as you research simulations.
`,
  },
};
