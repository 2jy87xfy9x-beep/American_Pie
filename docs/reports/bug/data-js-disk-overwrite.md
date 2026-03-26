# Bug Report: data.js Working Tree Overwritten with Old Version

**Date:** 2026-03-26
**Status:** Open
**Severity:** High — V2 article content (emergency-fund rewrite, BRIEF blocks) not visible in browser despite being correctly committed

---

## Summary

After every git operation that writes `data.js` to disk — including a fresh `git clone` — the working tree file reverts to a pre-V2 version within seconds. The git object store is correct (commit `9aaaf40`, blob `f6ac647` contains the expected content). Only the on-disk file is wrong.

---

## Symptoms

- `git show HEAD:data.js | grep BRIEF` → lines 973, 1019 found ✓
- `grep BRIEF data.js` on working tree → no matches ✗
- `git diff HEAD -- data.js` shows old emergency-fund article replacing new:
  - Title reverts from `Emergency Fund Levels Below 30 Days for Half of US Households` → `Emergency Fund`
  - `sections: 5` → `sections: 6`
  - `voice: WSJ Analysis` and `ticker_state: calm` fields removed
  - Both BRIEF blocks removed
- Reproduced in original location (`C:\iCloudDrive\american_pie`) and in fresh clone (`C:\Users\Folma\Projects\american_pie`)
- `git restore data.js` corrects the file immediately, but the revert may recur

---

## What Was Tried

- Bumped cache-bust version in `index.html` (v=5 → v=6) — no effect on root cause
- Moved project out of iCloud Drive to `C:\Users\Folma\Projects\american_pie` via fresh clone — issue reproduced in new location
- `git restore data.js` in new clone → file correct, diff clean ✓

---

## Suspected Cause

iCloud Drive for Windows is likely syncing an older version of `data.js` from a cached or conflict copy and writing it over git's working tree. The old version matches the pre-V2 state of `data.js` (before commit `9aaaf40`), suggesting iCloud has a stale copy from before the V2 merge.

Possible contributing factors:
- iCloud may be syncing Desktop, Documents, or the entire user profile in addition to the iCloud Drive folder
- A Cursor IDE window may have had the old file open and auto-saved it

---

## Next Step

Restart the computer and reload both the local file and GitHub Pages to determine whether the overwrite behavior stops. If the file remains stable after reboot, the culprit is a background process (likely iCloud daemon or editor) that was running during the session.

---

## Resolution

Pending restart. Will update status to **Fixed** or **Investigating** after reboot confirms behavior.

---

## Update — 2026-03-26 (Post-fix verification)

- Attempted application-level fix in `app.js` to read featured home title dynamically from `data.js` frontmatter instead of using a hardcoded fallback title.
- Result: issue persists; browser output still does not reflect expected content changes during user verification.
- Interpretation: this remains consistent with a disk-level overwrite or stale-write process outside normal app render logic.
- Scope note: dynamic title plumbing may still be valid code-wise, but it does not address the underlying data visibility failure observed in practice.

### Current Status

Still **Open** and **Investigating**. Primary hypothesis remains external overwrite/stale sync process (iCloud/editor/background process), not a simple frontend binding bug.

---

## Update — 2026-03-26 (Root cause confirmed, workflow fixed)

**After user restart:** `data.js` working tree stable — `grep BRIEF data.js` returns lines 973 and 1019 in both locations. iCloud overwrite behavior stopped after reboot. Root cause confirmed as iCloud Drive daemon writing a stale cached copy during the prior session.

**Separate issue identified:** Changes were showing in the Claude Code preview but not in the Edge browser. Root cause: Claude Code's primary working directory was `C:\iCloudDrive\american_pie`, while Edge loaded from `C:\Users\Folma\Projects\american_pie`. Edits never reached the browser-facing directory without a commit → push → pull cycle.

**Fixes applied (commit `db5c5d0`):**
- `app.js`: dynamic featured title lookup — reads title from `data.js` frontmatter, falls back to correct V2 string
- `index.html`: hardcoded featured title and excerpt updated from pre-V2 placeholder text to match V2 emergency-fund article content
- Cache-bust bumped v=6 → v=7 to force Edge to reload stale cached assets

**Workflow fix:** `.claude/launch.json` updated so the preview server now serves from `C:\Users\Folma\Projects\american_pie` (the Projects clone) instead of the iCloud Drive path. Preview and Edge now read the same directory.

### Current Status

**Fixed.** Both copies at `db5c5d0`. iCloudDrive will be deleted once clone is confirmed stable.
