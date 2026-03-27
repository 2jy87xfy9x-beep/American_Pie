# American Pie — Architecture Discussion Document
*A full audit of decisions, open questions, and deferred choices from the architecture thread.*
*March 2026*

---

## Table of Contents

- [1. The Save System](#1-the-save-system)
- [2. The Plugin & Schema Contract System](#2-the-plugin--schema-contract-system)
- [3. Partial Loading & Graceful Degradation](#3-partial-loading--graceful-degradation)
- [4. Offline First & Zero Dependencies](#4-offline-first--zero-dependencies)
- [5. The Validator as a Standalone Product](#5-the-validator-as-a-standalone-product)
- [6. The Browser Extension](#6-the-browser-extension)
- [7. User-Built Maps — Single User Experience](#7-user-built-maps--single-user-experience)
- [8. The Extension as a Consumer Privacy Product](#8-the-extension-as-a-consumer-privacy-product)
- [9. Identity & The Keypair Login System](#9-identity--the-keypair-login-system)
- [10. Project-Agnostic Architecture](#10-project-agnostic-architecture)
- [11. American Pie Specifically — No Extension Needed](#11-american-pie-specifically--no-extension-needed)
- [12. Single File Distribution](#12-single-file-distribution)
- [13. Local Version Control](#13-local-version-control)
- [14. Music & Audio](#14-music--audio)
- [15. Open Questions & Deferred Decisions](#15-open-questions--deferred-decisions)

---

## 1. The Save System

<details>
<summary>Expand</summary>

### What was decided

The user's saved state is a file they hold. Not a server record. Not a cloud backup. A file that downloads to their machine when they save and uploads when they return. The app never stores anything on a server unless explicitly extended to do so.

### How saving works

A save action — one button, no modal, no wizard — serializes the entire session state into a structured JSON object and triggers a browser download. The file is named after the simulation's current era date, not the real-world date:

```
american-pie-january-2008.pie
```

The `.pie` extension is a custom extension that is still plain JSON underneath. It signals to the user that this file belongs to something specific. It is not a generic export. It is a save.

### What the save file contains

```json
{
  "type": "checkpoint",
  "schema": "1.0",
  "saved": "jan-2008",
  "data": {
    "article": "emergency-fund",
    "screen": 3,
    "era": 1,
    "variables": { "your_cash": 7000, "your_monthly_expenses": 3200 },
    "revealed": ["s4", "gambler_exhibit14"],
    "expanded": ["see-also-link-3"],
    "theme": "encyclopedia"
  }
}
```

### How restoring works

The user returns to the app. They drop their `.pie` file onto the restore target — a drag zone styled to the active theme, invisible until a file is dragged near it — or use the sidebar entry `Resume from checkpoint` which opens a file picker. The app validates the file, checks schema compatibility, and opens exactly where they left off. Same article. Same screen. Same variable values. Same expanded margin entries.

### The restore target UX

The language never exposes the file mechanics. It does not say "upload your JSON checkpoint." It says `Drop your save here to continue`. The interaction feels like the app remembering you, not like a file system operation.

### Double-click behavior

A `.pie` file sitting in the user's downloads folder can be associated with a URL handler so that double-clicking it opens the browser directly to the app with the state loaded. The user double-clicks their save file and American Pie opens to exactly where they left off. No manual navigation to the site. No drag-and-drop required.

*This requires registering a custom URL protocol handler — a deferred implementation decision. See [Section 15](#15-open-questions--deferred-decisions).*

### What the save interaction looks like in the app

Fits naturally as a sidebar tool entry or ticker zone control. The label is `Download checkpoint`. No fanfare. No modal. Just a download. The filename is era-stamped to the simulation's current date, not the real date. That detail is free and fits the archive's character.

### The version problem — solved

If the app updates after a user has saved, the checkpoint schema version handles the mismatch. Old saves load in new app versions via migration functions. If a schema version is no longer supported, the app says so in plain language and tells the user exactly what changed. The save is never silently broken.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 2. The Plugin & Schema Contract System

<details>
<summary>Expand</summary>

### What was decided

Every uploadable thing — theme, checkpoint, variable set, custom article, era configuration — is a JSON file with a typed manifest header. The app reads the `type` field first, routes the file to the correct validator, checks schema version compatibility, validates all required fields, then either loads the plugin completely or returns a structured plain-language error report. It never partially loads silently. It either works completely or tells you exactly what is wrong.

### The manifest header

Every plugin file begins with:

```json
{
  "type": "theme",
  "schema": "1.0",
  "name": "Broadsheet",
  "requires": {
    "app": ">=2.0",
    "tokens": ["--color-bg", "--color-ink", "--ticker-bg", "--margin-bg"]
  },
  "data": { }
}
```

The `type` field determines which validator runs. The `schema` field determines which version of that validator runs. The `requires` field declares what the plugin needs from the app. The `data` field contains the actual plugin content.

### Plugin types defined

| Type | Purpose |
|---|---|
| `theme` | CSS token overrides, font declarations, ticker behavior overrides |
| `checkpoint` | Saved session state — article, screen, era, variables, revealed state |
| `variable-set` | A named collection of starting economic variables |
| `article` | A custom markdown article with variable references and screen delimiters |
| `era-config` | Ticker behavior, glitch settings, speed multipliers for a historical period |
| `identity` | Display name, preferences, permissions, optional keypair for signing |

### The validator

One function: `validate(file) → { ok, errors }`. Runs before any render, any state write, any side effect. If `ok` is false, the app returns a structured report in plain language:

```
✗ Theme could not be loaded

  Missing required token: --ticker-bg
  Expected type string for --color-ink, got number
  Schema version 0.8 is no longer supported (app requires >=1.0)

  Fix: Update your theme file to schema 1.0.
  Reference: americanpie.app/schema/theme/1.0
```

No crash. No console error. The app continues running whatever was loaded before.

### Schema versioning

Schemas are versioned. Old schemas stay valid as long as the app supports them. When the app changes, the schema version for affected types is bumped. Migration functions handle the upgrade automatically — `0.8 → 1.0` runs silently. If a migration is not possible automatically, the error report tells the user exactly which fields changed and what to update.

### The theme system specifically

Themes are pure CSS token overrides — no logic, no JavaScript. The app defines a canonical token list. A theme only needs to supply the tokens it overrides. Everything else inherits from the base. A minimal theme is five lines. A full theme is fifty. Creating one requires no knowledge of the app's internals — just the published token reference.

The validator checks that every token a theme declares exists in the app's token registry. If a theme references `--ticker-speed` and the app renamed it `--ticker-rate` in a new version, the error report says exactly that.

### Folder structure this implies

```
/schemas/
  theme.1.0.json
  checkpoint.1.0.json
  variable-set.1.0.json
  article.1.0.json
  era-config.1.0.json
  identity.1.0.json
/plugins/
  validator.js
  loader.js
  migrations/
    checkpoint.0.8-to-1.0.js
```

### One drop target

One drop target in the UI. Any plugin type. The app identifies what it is, validates it, loads it or reports the problem. No file type selection. No wizard. No steps.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 3. Partial Loading & Graceful Degradation

<details>
<summary>Expand</summary>

### What was decided

Partial loading is supported for specific plugin types where a fallback is visually intentional. The rule is: partial load only when the fallback looks designed, not broken. A half-loaded theme that looks broken is worse than a clear error. A half-loaded theme that renders base tokens with marked gaps is useful.

### Which types support partial loading

**Checkpoint** — if a checkpoint has valid position data but corrupted or missing variable values, the app loads the position and falls back to default variables. It then tells the user exactly which variables were missing and what defaults replaced them. The user is exactly where they were in the simulation. Their numbers need re-entering.

**Theme** — if a theme is missing tokens, the app renders using base tokens for every missing value. Missing regions are visually marked — a subtle indicator, not a crash banner — and the report lists exactly which tokens need to be added. The app is usable. The theme is incomplete.

**Variable-set** — if some variables are valid and some are malformed, the valid ones load. The malformed ones fall back to defaults. The report lists each one.

### Types that do not support partial loading

**Article** — an article either loads completely or not at all. A partial article with missing screens or broken variable references would render a misleading simulation. The error report is shown and the previous article remains loaded.

**Era-config** — same. A partial era configuration could corrupt the emotional calendar. Full load or nothing.

### The "what changed" report

Not a modal. Not a toast. A quiet panel — in the sidebar in encyclopedia theme, in the left column in newspaper theme. It lists what loaded, what fell back, and what needs updating. Dismissible. Persistent until dismissed. The app runs normally underneath it.

The language is plain. Not "schema validation error: field era_id type mismatch." Just: "This file was saved with an older version of the app. Your progress is intact. One setting changed — here is what it was and what it defaulted to."

### Fallback states are designed, not accidental

The base token set is designed to look intentional as a standalone theme — not like a broken version of something else. This means the fallback for a missing theme token is never an unstyled element. It is always a considered default. This requires deliberate design work when building the token system.

*Designing the fallback visual states is a deferred decision. See [Section 15](#15-open-questions--deferred-decisions).*

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 4. Offline First & Zero Dependencies

<details>
<summary>Expand</summary>

### What was decided

The app works with no internet connection, no server, no account, no subscription, no external service of any kind. It runs in a browser. Browsers are built into every operating system. The HTML and JavaScript specs have never broken backward compatibility. The app will work in twenty years on a machine that has never been connected to the internet.

### The philosophical position

The app teaches financial autonomy. An app teaching you to own your decisions while storing your data on someone else's server would be a contradiction. The file-based architecture is the honest version of what the app is saying. Architecture reflects thesis.

### The one current exception

The current HTML file makes network calls to Google Fonts servers on load:

```html
<link href="https://fonts.googleapis.com/css2?family=Linux+Libertine+O...">
```

This is the only external dependency. If Google's servers are unreachable the app falls back to Georgia and Arial. It still functions. It looks different.

**The fix:** Embed all fonts as base64 directly in the CSS. The file grows from ~58KB to approximately 200-400KB depending on which font weights are included. It becomes completely independent. No network calls. Works on a USB drive with no connection.

*Font embedding is a deferred implementation task. See [Section 15](#15-open-questions--deferred-decisions).*

### What zero dependencies means in practice

- Open the HTML file in any browser. The app runs.
- Copy the file to a USB drive. Give it to someone. They open it. The app runs.
- The internet goes down. The app runs.
- The hosting server goes down. Users who have the file still have the app.
- The app is acquired or discontinued. Users who have the file still have the app.
- Five years pass. No updates. The app still runs because HTML and JavaScript still run.

### The security posture

There is no server to breach. There is no database containing user information. There is no company holding user data that could be hacked, subpoenaed, acquired, or shut down. The only attack surface is the user's machine, which they are responsible for regardless.

The one real risk is file loss. The user loses their `.pie` file and loses their progress. This is managed by reminding users to copy the file — the app can prompt this without doing it for them, which preserves the local-only architecture.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 5. The Validator as a Standalone Product

<details>
<summary>Expand</summary>

### What was decided

The validator system is general-purpose and could be packaged as a standalone library usable by any project. It is not inherently tied to American Pie. The American Pie plugin types are one set of registered types. Any project can define its own.

### What the library does

One job: you give it a schema definition and a blob of incoming data, it gives you back either a clean validated object or a structured plain-language report of exactly what is wrong and why. Framework agnostic. No opinion on how the host app is built.

### What an existing app needs to adopt it

Three things only:

1. **A state schema** — a JSON description of what valid state looks like. If the app already has TypeScript types or a database schema this is mostly already written.

2. **A load/save boundary** — a single place in the code where state enters and exits the app. Most apps have this: a login function, a fetch call that populates the store, a localStorage read on startup. The validator sits at that boundary. Nothing else changes.

3. **Fallback values** — what the app renders when a field is missing. Most apps handle this inconsistently. Defining fallbacks explicitly is the only part requiring real design thought.

### Who can adopt it easily

Apps with clean architecture — Redux stores, defined API contracts, anything with a clear data layer — could integrate in an afternoon. The load/save boundary already exists. The state shape is already defined somewhere.

### Who needs more work

Apps built without separation between state and UI — data mutations scattered across components and event handlers — need the load/save boundary established first. Not a full refactor. A week of work on a medium-sized codebase.

### The product gap this fills

Existing validation libraries are built for API contracts between servers. This is built for the boundary between a user's file and their app. Incoming data that may have been authored by a human, may be from a different app version, may be partially valid, and must produce output readable by a non-developer. That specific problem has not been packaged cleanly by anyone.

### Two depths of adoption

**Shallow** — use only the validator at the load/save boundary. State is protected. Error reporting is clean. No plugin system required.

**Deep** — define plugin types with typed manifest headers. Users can now create and share themes, configurations, and saves as typed files. Full plug-and-play experience.

Same library. Two levels of commitment.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 6. The Browser Extension

<details>
<summary>Expand</summary>

### What was decided

A browser extension can retrofit the file-based save system onto apps that were not built with it. The extension sits outside the app and intercepts state at the browser storage layer. No app cooperation required.

### How it works

The extension watches everything the site writes to browser storage — localStorage, sessionStorage, cookies, IndexedDB. It captures the state, packages it into the portable file format, and saves it locally. On return, it injects the state back before the page finishes loading. The site wakes up, finds its tokens and state exactly where it expects them, and behaves as if the user never left.

### Dumb mode vs smart mode

**Dumb mode** — captures and restores any app's browser storage verbatim. Works for all apps. Fragile across app updates because the state blob is opaque. Essentially a local backup tool. Useful immediately, not elegant.

**Smart mode** — for apps where the state shape has been mapped, the extension translates the captured state into the clean typed file format. Portable, readable, version-aware. Requires per-app mapping work either by the user or from a community library.

### What the extension can and cannot capture

**Can capture:**
- localStorage
- sessionStorage
- Cookies (session tokens, preferences)
- IndexedDB
- Any state the site wrote to the browser

**Cannot capture:**
- State that only exists on the app's server and was never written to the browser
- State that only existed in JavaScript memory and was never persisted
- Encrypted or obfuscated state that has no readable structure

### The server-side hard wall

Apps that store everything server-side and nothing locally are essentially opaque. The extension can capture the session token — which logs the user in automatically on return — but cannot capture content state, feed position, or anything the server holds. The user gets their account back instantly. They do not get their exact position back.

### The pre-mapping inspection

Before the user starts mapping, the extension performs a ten-second passive inspection of the site's behavior on load. It checks whether the site writes to localStorage, how much, whether it syncs state to a server on every interaction. It then reports in plain language before the user commits to mapping:

- *"This site stores almost nothing in your browser. Login only is likely. Mapping is low value."*
- *"This site stores moderately locally. Login plus preferences and some content state is likely."*
- *"This site stores heavily in your browser. Full or near-full restore is likely."*

This sets expectations before any time is spent.

### The fidelity report

After mapping — or when loading a community map — the extension shows a plain-language summary of what is and is not captured for that specific site:

- *"Notion — your login, your last open document, your cursor position, your unsaved drafts."*
- *"TikTok — your login only. Feed position is not available."*

Three effective tiers: full restore, partial restore, login only.

### The TikTok case — the important distinction

TikTok is a useful stress test. Almost nothing important lives in the browser. The specific video being watched and position within it live in JavaScript memory and die when the tab closes — they were never written to any storage the extension can see. The feed algorithm's current state lives on TikTok's server. The extension captures the session token and restores the logged-in account instantly. It cannot restore the exact video or position.

What would make it work exactly: if TikTok wrote the current video ID and timestamp to localStorage every few seconds — which some video players do — the extension would capture and restore it. The extension's fidelity is a mirror of the app's own carefulness about persisting state.

### The extension does not eliminate the first login

The site still needs to recognize the user. An account is created once, the normal way. After that first login the extension captures everything and the user never types a password again. The file is the login from that point forward.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 7. User-Built Maps — Single User Experience

<details>
<summary>Expand</summary>

### What was decided

For a single user building their own maps, the experience is entirely personal. No community library. No directory. No crowd. Just the user's own mapped sites and their own fidelity knowledge.

### The mapping session

The user hits "start mapping" on an unmapped site. The extension watches every storage write triggered by their interactions. They use the app normally for a few minutes. The extension builds a live picture of the state shape from actual behavior. It shows them what it found — not raw code, a readable list:

- *"When you changed your display name, this field updated."*
- *"When you saved a draft, these three fields changed."*
- *"When you logged in, this token was set."*

The user confirms what each thing is, names it, marks which fields are theirs to own and which are internal plumbing to ignore. That confirmation pass is the map. Two minutes of work once. Invisible forever after.

### The personal library

One screen in the extension. A list of every mapped site, its fidelity summary, and when state was last saved from it. The user glances at it before revisiting something they have not used in a while.

### The icon states

Three states. Nothing to learn. Immediately readable:

| State | Meaning |
|---|---|
| Dim | This site has not been mapped |
| Lit | This site is mapped. State will be captured and restored. |
| Warning indicator | Something changed since the last save. Check what still works. |

### Re-mapping after an app update

If a site updates and something in the state shape changes, the warning indicator appears on the next visit. One tap starts a targeted re-mapping session for only the thing that changed. Everything else in the map stays intact. The session takes seconds, not minutes.

### What the user never has to think about

- Which file type to select
- What format the state is in
- Whether the restore worked
- Whether the site updated

The icon tells them everything they need to know before the page finishes loading.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 8. The Extension as a Consumer Privacy Product

<details>
<summary>Expand</summary>

### What was decided

The extension can be built as a consumer privacy product that requires no cooperation from the apps it works with. Apps do not need to opt in. Apps do not need to be aware it exists. It operates entirely at the browser storage layer which is always accessible to extensions.

### Why apps do not cooperate with this model

Two honest reasons:

1. **Business model conflict.** If user data lives on the user's machine in a file they hold, the company cannot store it, analyze it, use it for retention, charge for access to it, or lock users into their platform. The file-as-identity model is architecturally incompatible with the engagement loop that funds most consumer software. Companies know this architecture exists. They choose not to build it.

2. **Support cost.** When a user loses their file there is no recovery path. No "forgot your password." No server backup. The file is gone and so is the session. Most companies consider this unacceptable support volume.

### The community map library

When multiple users map the same app, their maps can be merged into a community-maintained library — similar to how ad blockers maintain community filter lists. No single user has to map every feature. The crowd fills gaps. Maps are flagged when an app updates and breaks them. Community members confirm fixes. The library stays current without central maintenance.

### The directory

A searchable site where any user can look up an app before mapping to see its fidelity tier, what is specifically captured, how many users have mapped it, and when the map was last verified. Entries show:

- Fidelity tier (full / partial / login only)
- Specific capabilities ("captures unsaved drafts, last open document, cursor position")
- Map verification count and recency

### Obfuscated state

Some apps use minified keys or encrypted localStorage deliberately. The extension can still watch network traffic and identify patterns even without readable field names. It captures the shape of state changes even when the names are opaque. Users assign human-readable names to fields they recognize by behavior: "when I changed my theme this value flipped from 0 to 1 — I will call that theme-preference." The map works on observed behavior, not on the app's internal naming.

### The one hard wall that cannot be worked around

Server-side state that never touches the browser is not accessible to the extension regardless of approach. This is a genuine technical limit, not an engineering gap. Some apps are designed this way deliberately to prevent exactly this kind of interception. The extension reports this clearly in the pre-mapping inspection rather than letting the user discover it after mapping.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 9. Identity & The Keypair Login System

<details>
<summary>Expand</summary>

### What was decided

Identity in this architecture is a file. The user's identity file contains their display name, preferences, permissions, and optionally a cryptographic private key. No username. No password. No server. No account. The file is the login.

### How the keypair works

When an identity is first created, the app generates a cryptographic keypair in the browser using the Web Crypto API — the same cryptography standard that has been in every modern browser for years. This happens locally, in milliseconds, with no network call.

The private key goes into the identity file. The public key stays in the app's memory during the session. Every checkpoint the user saves is signed with their private key — a mathematical seal that only their specific key can produce. When a checkpoint is loaded, the app verifies the seal against the public key. If it matches, the file is genuine and unmodified. If it does not match — the file was edited, corrupted, or came from a different identity — the app says so in plain language.

### The identity file

```json
{
  "type": "identity",
  "schema": "1.0",
  "data": {
    "display_name": "Ziyah",
    "created": "2026-03-27",
    "preferences": { "theme": "newspaper" },
    "permissions": ["author", "reader"],
    "public_key": "..."
  }
}
```

The private key is stored separately — either in the identity file itself in an encrypted form or in the browser's secure key storage. This is a decision with security tradeoffs that needs resolution before implementation.

*Private key storage method is a deferred decision. See [Section 15](#15-open-questions--deferred-decisions).*

### Three tiers of verification

| Tier | Description | Infrastructure required |
|---|---|---|
| No verification | Identity file is preferences and display name only. No signing. Anyone can load any file. | None |
| Local keypair | Checkpoints are signed. The file proves it was created by the same person who created the identity. Tamper-evident. | None |
| Server-anchored | Identity file contains a user ID and token issued by an auth server. App verifies token on load. Enables multi-device sync and shared sessions. | Auth server required |

### For American Pie specifically

The keypair model is the right tier. The app is private and local by design. The user's identity travels with their files. No account, no password, no server, but their simulation is cryptographically theirs. Losing the identity file means losing the ability to verify authorship of checkpoints — but the checkpoints still load, they just load without signature verification.

### Permissions and the authoring overlay

The `permissions` field in the identity file controls access to the authoring overlay. A `reader` identity sees the simulation. An `author` identity gets the authoring overlay. No separate login for that distinction. No admin panel. Just a field in the file the user holds.

### Why nobody else does this

Two reasons, both honest:

1. **Business model.** Described in detail in [Section 8](#8-the-extension-as-a-consumer-privacy-product). The file-based identity model removes the company's leverage over user data and retention.

2. **Support cost.** There is no password recovery. No "forgot your password." No server backup. If the identity file is lost, verification capability is lost. Most companies consider this unacceptable. For American Pie it is a feature — the identity is yours the way a physical key is yours. Nobody holds a copy.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 10. Project-Agnostic Architecture

<details>
<summary>Expand</summary>

### What was decided

The entire system — the validator, the loader, the schema versioning, the migration pipeline, the manifest format, the error reporting, the plugin type registry — is project-agnostic. It can be packaged as a standalone library and used by any project.

### What "project-agnostic" means concretely

The American Pie specifics are one configuration of the runtime. To use the runtime for a different project:

**Replace:**
- The plugin type registry (what types exist and their schemas)
- The layer definitions (what the app's state looks like)
- The fallback designs (what partial loads look like in this app)

**Keep verbatim:**
- The validator
- The loader
- The migration system
- The manifest format
- The error reporting
- The file drop/restore UX pattern

### What to call it

In conversation this has been referred to as a "file-contract runtime" or `plug-runtime`. The name is not decided. The concept is: any app that defines its layer contracts and plugin schemas gets the whole system for free.

### Potential use cases beyond American Pie

Any app where:
- Users create configurations, saves, or customizations worth keeping
- Portability between devices matters
- Privacy from the developer is desirable
- The user relationship with their data should feel like ownership
- The app should work without a server

Examples: creative tools, educational simulations, personal finance tools, games with persistent state, configuration-heavy productivity apps.

*Packaging this as a standalone library is a separate product decision outside the scope of American Pie's build. Noted here because the architecture should be built with extraction in mind — no American Pie specifics hardcoded into the generic layer.*

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 11. American Pie Specifically — No Extension Needed

<details>
<summary>Expand</summary>

### What was decided

American Pie does not need the browser extension. The extension is for retrofitting apps that were not built with this system. American Pie is built with this system natively. Saving and restoring state is a built-in feature, not a workaround layered on top.

### The experience from the user's perspective

They visit the site. No download required. No extension required. No account required. They start using the app and at some point — naturally, when it makes sense in the flow — the app offers to save their progress. One button. A file downloads. That is it.

On return they drop the file onto the restore target or use the sidebar entry. The app opens exactly where they were. It feels like the app remembered them. The file mechanics are invisible.

### Language that hides the mechanics

The copy never exposes the technical layer:

| Do not say | Say instead |
|---|---|
| "Upload your JSON checkpoint" | "Drop your save here to continue" |
| "Export state" | "Download checkpoint" |
| "Restore from file" | "Continue where you left off" |
| "Schema version mismatch" | "This save is from an earlier version. Your progress is intact." |

### The `.pie` extension as product feature

A custom file extension makes the save feel like a native app artifact rather than a generic JSON export. The file sits in the downloads folder looking like it belongs to something — because it does. It has a name. It has an era date. It is a thing, not a blob.

### What the save file is named

```
american-pie-january-2008.pie
```

Named after the simulation's current era date, not the real-world date. This is a small detail that is completely free and completely right for what the app is.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 12. Single File Distribution

<details>
<summary>Expand</summary>

### What was decided

American Pie ships as a single HTML file. Everything — CSS, JavaScript, both themes, the schema definitions, the validator, the article renderer, the variable substitution system — lives in one file. Open it in a browser, it runs. No installation. No build step for the end user. No dependencies to resolve.

### Current state of the file

The existing `american_pie_home.html` is approximately 58KB. It already contains:
- Complete CSS for both themes (encyclopedia and newspaper) in one `<style>` block
- Full HTML structure for both themes
- The theme toggle JavaScript
- Tooltips via `data-tip` attributes
- All placeholder content for both themes

It is structurally correct. Both themes switch with one toggle. No external stylesheets. No external scripts. The only external dependency is Google Fonts (see [Section 4](#4-offline-first--zero-dependencies)).

### What still needs to be added to reach a complete file

| System | Estimated size | Status |
|---|---|---|
| Font embedding (base64) | ~200-400KB | Not yet done |
| Validator & loader | ~5-10KB JS | Not yet written |
| Checkpoint save/restore | ~5KB JS | Not yet written |
| Article renderer (screen delimiter parser) | ~5KB JS | Not yet written |
| Variable substitution engine | ~3KB JS | Not yet written |
| Schema definitions (all plugin types) | ~10KB JSON | Not yet written |
| Article content (one era) | ~20-50KB | Not yet written |
| `reality.json` embedded | ~5-10KB | Not yet written |

### Honest size estimate for a complete file

One era of content, all fonts embedded, all systems built: **500KB to 1MB**. Smaller than one photograph. Loads in under a second on any connection. Works instantly with no connection.

### Development mode vs distributable

Two modes, one codebase:

**Development mode** — loads article files, `reality.json`, and variable definitions from relative paths. Easier to edit and author. Requires a local file server or browser that allows local file access.

**Distributable mode** — a build step inlines all external files as JavaScript objects directly in the HTML. The output is one self-contained file. The build step is simple string concatenation, not a complex pipeline.

*The build step is a deferred implementation task. See [Section 15](#15-open-questions--deferred-decisions).*

### The dual access model

The same file that runs locally also sits at a URL. Visiting the URL and saving the page (`File → Save As`) gives the user the local version. They are identical. One codebase. Two access methods. Zero difference in behavior.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 13. Local Version Control

<details>
<summary>Expand</summary>

### What was decided

Version control for the user's progress is implicit in the save system. Every `.pie` file is a complete snapshot. The user's version history is their folder of save files. No additional tooling. No git. No versioning system to learn.

### Save files as version history

```
american-pie-january-2008.pie
american-pie-august-2009.pie
american-pie-march-2011.pie
american-pie-december-2012.pie
```

Each file is a complete, independent snapshot of exactly where the user was at that moment. Loading any of them returns the simulation to that exact state. The user can go back to 2009 and make a different decision. The previous state is never destroyed. Every save is additive.

### App versioning by filename

The app itself versions by filename:

```
american-pie-v1.0.html
american-pie-v1.2.html
american-pie-v2.0.html
```

Old versions are kept. If a new version changes something the user does not want, they open the old file. The app works because it is a self-contained file — no server to update, no forced upgrade, no deprecation notice that breaks things.

### Cross-version save compatibility

Old saves load in new app versions via schema migration functions. The schema version number in every `.pie` file tells the app exactly what to expect and how to translate it. New saves load in old app versions with a quiet note about what features are not available in the older app. Nothing silently breaks in either direction.

### What this means for the user

They cannot accidentally lose their progress through an app update. They cannot be forced into a new version they do not want. They can experiment — make a save, try a different path, restore the save if they want to go back. The simulation is reversible. The decisions inside it are not — that is the emotional architecture. But the reader's position in it always is.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 14. Music & Audio

<details>
<summary>Expand</summary>

### The problem with audio and a single file

Audio files are large. A single song as an MP3 is 3-8MB. Nine eras with one song each is 50-70MB embedded in the HTML file. That defeats the primitive-but-modern goal. The file becomes unwieldy to share, slow to load, and too large to feel light.

### Three options assessed

**Option 1 — Separate audio files, same folder**

The HTML file stays lean. Audio files sit next to it in a folder. Distribution is a zip: one HTML file, one folder of audio files. The app loads audio from relative paths. Works completely offline. Nothing streamed. Nothing external.

*Verdict: Probably the right answer for an offline-first distribution. The zip is the unit instead of the file. Still self-contained. Still needs nothing.*

**Option 2 — Audio is optional and streamed**

The app works completely without audio. When online, it fetches songs from an external URL — a streaming service embed, a hosted audio file, anything. When offline, the audio element shows a placeholder that fits the archive aesthetic. The simulation never breaks. Audio is an enhancement, not a dependency.

This fits the existing spec: the Director's Bible already states audio is loosely coupled. The song reference and audio file are separate fields deliberately. The simulation does not need music to function.

*Verdict: Correct for the architecture. Clean. No storage cost. The simulation is never dependent on it.*

**Option 3 — Generated audio, no files at all**

The Web Audio API can synthesize sound entirely in the browser with no files and no network calls. Not music — ambient tone. Low-frequency presence that changes the emotional register without announcing itself. Pure JavaScript.

For American Pie this may be more honest than licensed songs anyway. The emotional texture of each era rendered as generated tone rather than a cultural artifact the user already associates with something else. 2008 does not sound like a song they know. It sounds like what 2008 felt like.

*Verdict: Most architecturally pure option. No files. No network. No licensing. Requires the most design and engineering work.*

### Recommended approach

**Option 2 as default with Option 3 as offline fallback.**

- Online: real songs, streamed, zero storage cost in the app file
- Offline: generated ambient tone calibrated to the era's emotional temperature
- The transition between them is automatic. The app checks connectivity once on load and routes accordingly. The user makes no choice about it.

### What the save file stores

The `.pie` checkpoint stores the user's audio preference (on or off) but never stores audio data. Audio state is a preference. It is not content. The song itself is never part of the user's saved state.

### Open questions on audio

The Director's Bible (V2, gap_6) explicitly flags the audio system as unresolved:

- How are songs served?
- Do they loop?
- What happens when a song ends?
- Can the reader skip?
- How do browser autoplay restrictions affect behavior?
- Does the generated ambient tone approach replace licensed songs entirely or complement them?

*These are unresolved decisions that must be made before the audio feature is built. See [Section 15](#15-open-questions--deferred-decisions).*

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

## 15. Open Questions & Deferred Decisions

<details>
<summary>Expand</summary>

These are decisions that arose in this discussion that are not yet resolved. They do not block current development but must be decided before the relevant system is built.

---

### A — Double-click file handler
**What it is:** Registering a custom URL protocol so double-clicking a `.pie` file opens the browser directly to the app with the state loaded.

**What needs deciding:** Whether this is worth implementing given it requires OS-level registration and behaves differently across operating systems and browsers. May be unnecessary if the drag-to-restore UX is smooth enough.

**Blocks:** Final `.pie` file UX spec.

---

### B — Font embedding
**What it is:** Replacing the Google Fonts network calls with base64-encoded fonts embedded directly in the CSS.

**What needs deciding:** Which font weights to include (affects file size significantly), whether to embed all six families or reduce the font stack.

**Blocks:** True offline capability and final file size estimate.

---

### C — Private key storage method
**What it is:** Where the cryptographic private key lives in the keypair identity system.

**Options:**
- In the identity file itself, encrypted with a passphrase the user provides
- In the browser's secure key storage (Web Crypto subtle.generateKey with non-extractable flag) — means the key never leaves the browser but is lost if the browser profile is cleared
- Both — key stored in browser, backup encrypted copy in the identity file

**What needs deciding:** Which option balances security, recoverability, and user experience for American Pie's specific use case.

**Blocks:** Identity system implementation.

---

### D — Fallback visual state design
**What it is:** The base token set needs to be designed so it looks intentional as a standalone theme, not like a broken version of something else. Every missing token must have a considered default.

**What needs deciding:** The complete base token set and its visual design as a standalone state.

**Blocks:** Theme plugin type implementation and partial load behavior.

---

### E — Development mode vs distributable build step
**What it is:** The mechanism that inlines external files (articles, reality.json, variable definitions) into the single HTML file for distribution.

**What needs deciding:** Whether this is a manual process, a simple script, or something more structured. How the development workflow handles the two modes without friction.

**Blocks:** Article authoring workflow and final distribution file.

---

### F — Audio system
**What it is:** All unresolved audio decisions — serving, looping, end behavior, skip controls, autoplay restrictions, generated tone architecture, licensing.

**What needs deciding:** Everything in gap_6 of the Director's Bible V2 plus the decision between licensed songs, generated tone, or both.

**Blocks:** Audio feature implementation. Does not block anything else.

---

### G — plug-runtime extraction
**What it is:** Whether and when to package the validator/loader/schema system as a standalone library separate from American Pie.

**What needs deciding:** Whether this is a product priority, when extraction happens relative to American Pie's build, and whether the American Pie implementation is built with clean extraction in mind from the start (recommended: yes).

**Blocks:** Nothing in American Pie's build. A separate product decision.

---

### H — Browser extension relationship to American Pie
**What it is:** Whether the extension is ever bundled with or marketed alongside American Pie, or whether it is a fully separate product.

**What needs deciding:** Product positioning. American Pie does not need the extension technically. The question is whether they share a brand, a distribution channel, or a user base.

**Blocks:** Nothing in American Pie's build.

</details>

[↑ Back to Table of Contents](#table-of-contents)

---

*American Pie — Architecture Discussion Document*
*Produced from architecture thread, March 2026*
*All decisions reflect the Director's Bible and Design Specification V2 as authoritative references on emotional architecture and production standards.*
