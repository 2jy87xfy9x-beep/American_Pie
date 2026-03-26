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
