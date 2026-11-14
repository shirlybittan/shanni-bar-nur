# QA report: redesign, phase 1 (homepage + design system)

Tested with Playwright (Chromium) at 375×812, 768×1024 and 1440×900, with `prefers-reduced-motion` both `no-preference` and `reduce`.

| Check | Result |
|---|---|
| Horizontal scroll (all sizes, menus and accordions open) | None |
| Primary CTA visible in the first viewport (all sizes) | Yes |
| RTL: layout, arrow direction, phone number shown LTR inside RTL | OK |
| Console / page errors | None |
| axe-core (WCAG 2.0/2.1 A + AA) on the full page | **0 violations** |
| Mobile menu: opens, Esc closes, link closes | OK |
| Service accordion opens, "לפנייה בנושא" pre-fills the topic and focuses the name field | OK |
| Form: errors announced, first invalid field focused; valid data → preview message, nothing sent | OK (logic unchanged) |
| Phone link | `tel:+972528619599` |
| Keyboard order | skip link → brand → menu → hero CTA → services link → About accordion → … |
| Scroll reveal | Only with JS and motion allowed; content stays visible otherwise |
| Hero video slot (tested with a dummy MP4) | Attached and playing with motion allowed; **not attached** under reduced motion; frame height identical either way (no layout shift) |

Screenshots: `docs/qa/after-*.png`. The "before" screenshots were taken in the browser pane during the audit, at 1366 px desktop and 375 px mobile, but they couldn't be saved to the repo from there. Re-run `qa/shoot.py` against the old build to file them alongside these.
