# BAR NUR redesign: what's in this folder

Drop-in replacement for the current review build. It uses the same stack (vanilla ES modules, no build step) and the same anchors, form logic and config.

- `src/styles.css`: new design system (tokens at the top) and all component styles.
- `src/components/*`: header, hero, about and services restyled. **New:** `philosophy.js` (postcard copy) and `note.js` (the personal note moved out of services).
- `src/art.js`: the original lotus, scroll divider and petal ornament, extracted as vectors from the postcard PDF.
- `src/motion.js`: scroll reveals and the hero video loader.
- `src/content.js`: unchanged copy, plus `philosophy`, `contactConfig.phoneDisplay/phoneTel` and `heroMedia` (all marked NEW).
- `assets/fonts.css` + `assets/fonts/`: Heebo and Frank Ruhl Libre as self-hosted woff2 (Hebrew + Latin subsets, OFL), 132 KB total. These replace the old TTFs.
- `assets/images/logo-new.png`: a preview copy made from the WhatsApp image. **Keep your original file.**
- `docs/`: audit and plan, hero video brief, QA report and screenshots.
- `qa/`: Playwright scripts (`python3 qa/shoot.py`, `python3 qa/func.py`, with the site served on :8765).
