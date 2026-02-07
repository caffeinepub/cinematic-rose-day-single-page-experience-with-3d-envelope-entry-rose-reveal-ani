# Specification

## Summary
**Goal:** Fix the single-page content ordering and assets so the dog-with-rose image appears above the romantic lines, and the lip-biting emoji section appears below the final note with the updated caption—without changing any other visuals/copy or breaking the stage flow.

**Planned changes:**
- Render Image 1 (dog holding a rose) directly above the first romantic line (“I brought you a rose today…”) using a local static asset path under `/assets/generated`, and omit the image entirely if it fails to load (no broken-image UI).
- Move the lip-biting emoji image section to appear after the FinalNote text block and before the footer signature, with a visible vertical gap from the final note and no new containers/frames.
- Update the lip-biting caption text to exactly: “This is me when I see you:)”.
- Adjust stage/progression logic to ensure the experience runs end-to-end once per page load (no looping/blinking/restarting) and still reaches the final note + footer even if any image fails to load.

**User-visible outcome:** After opening the envelope, users see the dog-with-rose image above the romantic lines; at the end, the final note is followed by a spaced lip-biting image + the updated caption, then the footer signature—without restarts or broken-image placeholders.
