# Specification

## Summary
**Goal:** Remove the bouquet image above the first timed romantic line and replace it with a single larger 🌹 text emoji line, without changing the existing timing/stage flow.

**Planned changes:**
- Remove the bouquet image element from `TimedRomanticLines` and eliminate any references to `/assets/generated/rose-bouquet-sketch.dim_1400x900.png`.
- Add one standalone text line containing exactly `🌹` directly above the first romantic line, styled like the existing bottom emoji line and made slightly larger via `font-size` only.
- Update `frontend/scripts/verify-generated-assets.mjs` to stop requiring the removed bouquet asset while keeping verification for the remaining required assets.

**User-visible outcome:** The bouquet graphic no longer appears above the timed romantic lines; instead, a single larger 🌹 emoji appears directly above “I brought you a rose today…”, with all existing timed line behavior unchanged.
