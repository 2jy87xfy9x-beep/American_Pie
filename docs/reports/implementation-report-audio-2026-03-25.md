# Implementation Report — Procedural Audio Backing Track

**Date:** 2026-03-25  
**Branch:** `feature/audio-backing-track`

## Part timestamps (approximate)

| Part | Started | Completed |
|------|---------|-----------|
| Part 1 — Audio file / decode | 2026-03-25 | 2026-03-25 |
| Part 2 — Web Audio chain | 2026-03-25 | 2026-03-25 |
| Part 3 — Era parameter map | 2026-03-25 | 2026-03-25 |
| Part 4 — Crossfade loop | 2026-03-25 | 2026-03-25 |
| Part 5 — Behaviors A/B/C | 2026-03-25 | 2026-03-25 |
| Part 6 — iOS / visibility | 2026-03-25 | 2026-03-25 |
| Part 7 — ♪ toggle | 2026-03-25 | 2026-03-25 |
| Part 8 — Config panel | 2026-03-25 | 2026-03-25 |
| Part 9 — Styles | 2026-03-25 | 2026-03-25 |
| Part 10 — Persistence | 2026-03-25 | 2026-03-25 |

## Files created or modified

| File | Change (from `git diff --stat`) |
|------|----------------------------------|
| `app.js` | +811 lines |
| `index.html` | +5 lines |
| `style.css` | +90 lines |

No new source files; audio logic lives in `app.js`.

## Verification results

| # | Check | Result |
|---|--------|--------|
| 1 | Complete one article → silent fade-in | **Not verified in automation** (requires manual run with `audio/Pie.m4a` + folder permission) |
| 2 | Idle 60s → gain drop; interaction → recovery | **Not verified in automation** |
| 3 | Manual era 3 → distortion/filter in 5s | **Not verified in automation** |
| 4 | Playback to 502s → seamless crossfade | **Not verified** (requires ~8.5 min listening or dev clock manipulation) |
| 5 | Long press ♪ → config; volume 30% | **Not verified in automation** |
| 6 | Toggle off/on → near-zero then restore | **Logic implemented**; not browser-tested here |
| 7 | iOS Safari autoplay / background / interrupt | **Not verified** (no iOS device in this run) |
| 8 | Both themes → ♪ renders | **CSS reviewed**; not visual QA |
| 9 | `node build.js` | **Pass** (exit 0) |

## Browser compatibility matrix (Web Audio features used)

| Feature | Chrome / Edge | Firefox | Safari / iOS Safari |
|---------|---------------|---------|---------------------|
| `AudioContext` / `decodeAudioData` | Yes | Yes | Yes (webkit prefix may apply) |
| `OfflineAudioContext` decode (preload) | Yes | Yes | Yes (typical) |
| `GainNode`, `BiquadFilterNode`, `WaveShaperNode`, `ConvolverNode` | Yes | Yes | Yes |
| `AudioBufferSourceNode.start/stop` scheduling | Yes | Yes | Yes |
| `suspend` / `resume` | Yes | Yes | Yes (iOS requires user gesture to start) |
| `state === "interrupted"` | Varies | Varies | iOS may use; not universal |

## Deviations from spec (and why)

1. **Reverb mix** — Spec lists a single linear chain ending in `ConvolverNode`. A convolver is fully wet unless dry/wet mixing is added. Implementation uses **one split from `filterNode`**: dry path → `reverbDryGain` and wet path → `convolver` → `reverbWetGain`, summed at `masterGainNode`, so `reverb` in the era table controls dry/wet balance.

2. **`audio_unlocked` / booleans** — Spec mentions boolean storage; app uses the same string pattern as other keys (`"1"` / `"0"`) for consistency with existing `localStorage` usage.

3. **`audio_last_position`** — Updated on an interval using a coarse estimate (`currentTime % 512`). This is **not sample-accurate** but satisfies “best effort” resume without extra bookkeeping.

4. **`audio_first_play_done` (localStorage)** — Not listed in the persistence summary. Used to distinguish **first-ever** playback (Era 1 intro, 3s gain ramp from zero) from **returning** sessions (current era / present baseline, shorter ramp). Aligns with “first article” vs “subsequent loads” behavior.

5. **Distortion automation** — Four ramped `AudioParam`s are `playbackRate`, `gainNode.gain`, `filter.frequency`, and reverb dry/wet gains. **WaveShaper curve** is not automatable; distortion amount is **stepped** over the transition via `setInterval` (~120 ms steps).

6. **Crossfade follow-up** — Web Audio schedules the fade; the **next** segment’s `scheduleCrossfadeFromSegmentStart` is armed with `setTimeout` from calculated context delay. Small **timer drift** is possible vs pure `currentTime` callbacks.

7. **Config “inline editing”** — Volume and fade delay use `<input type="number">`; effects/momentum use row tap to cycle, with bracket labels matching the spec shape.

## Known limitations

- **iOS autoplay** — `AudioContext` is only created after a user gesture when unlocked; edge cases remain if the OS denies or delays `resume()` after backgrounding.
- **`interrupted` state** — Not all engines expose it; `onstatechange` recovery is best-effort.
- **Timer-based crossfade chain** — Long sessions rely on `setTimeout`; clock drift could theoretically desynchronize the *next* scheduled crossfade from ideal `currentTime` (mitigated by using wall-clock delay from `audioContext.currentTime`).
- **No automated test** for 502 s loop or file presence.

## Recommended follow-up work

1. Replace `setTimeout` crossfade chaining with a **pure `AudioContext` clock** callback or repeated `schedule` from `currentTime` only.
2. Track **per-source segment start time** for exact `audio_last_position` persistence.
3. Add **automated smoke test** (e.g. headless) or manual QA checklist in repo for audio.
4. Consider **AudioWorklet** if distortion ramp smoothness must match `linearRampToValueAtTime` quality exactly.
