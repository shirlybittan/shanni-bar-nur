# BAR NUR — Audit & visual redesign plan

Audited: `bar-nur-review.decentpear262.chatgpt.site` (review build), the logo seal and the printed postcard (Illustrator PDF). Date: 14 Nov 2026.

## 1. Audit

### Stack and structure
- Static site using vanilla ES modules, with no build step. `index.html` holds an empty `#app`, and `src/main.js` injects the components: header, hero, about, services, contact, footer.
- Content lives in `src/content.js`, which says it comes from `docs/approved-copy.md`. The contact logic is in `src/contact-service.js`, and the SVG line art is in `src/botanical.js`.
- Routes: one page, with anchors `#home #about #services #contact`. There are no other routes or third-party integrations.
- SEO: `lang="he" dir="rtl"`, a title, a description and `theme-color`. **`robots=noindex,nofollow`** is set because this is a review build, and it has to be removed at launch. All content is rendered by JS, so crawlers and no-JS visitors only get the `<noscript>` line.

### Visual system (current)
| Token | Value | Note |
|---|---|---|
| wine | `#660828` | Very close to the brand burgundy `#650B2D` |
| ivory | `#FBF6EF` | Background |
| parchment | `#F3E6D8` | Hero gradient |
| pink | `#E8CECA` | Selection and soft glows |
| muted | `#79525D` | Secondary text (6.1:1, OK) |
| line | `#C5A6A4` | Hairlines |

- Typography: Frank Ruhl Libre (400/500) for headings and Heebo (300–600) for body text. Both are self-hosted as **TTF**, with no woff2 and no subsetting. This is a good Hebrew pairing, so I'm keeping it.
- The whole site is one colour. There's no green, and the botanical connection comes only from line art.
- Components: pill buttons, underlined text links, `<details>` accordions, and an arched hero frame with a CSS-cropped logo seal.
- Spacing: 52/70px section padding, a 1120px wrap, and breakpoints at 600 and 1000.

### Page flow
1. Sticky header with a text wordmark and 3 links. Below 1000px the links collapse into a menu.
2. Hero: logo seal, h1 "נטורופתיה | רפואת צמחים | רוקחות טבעית", a subtitle and a contact CTA.
3. About card with a summary and a "קצת על הדרך שלי" accordion.
4. Services: 4 accordions (naturopathy, Bach flowers, aromatherapy, workshops). Each has a "לפנייה בנושא" link that pre-fills the form topic.
5. Personal note, which repeats the last paragraph of About.
6. Contact: the WhatsApp button is **disabled** because no number is configured. The form is in **preview mode**, so nothing is sent. It has validation, a honeypot and consent.
7. Footer with the wordmark, tagline, back-to-top and dev note.

### Products, workshops and contact
- There's no product catalogue, workshop booking or testimonials. Products and workshops are inquiry-only ("אין חנות מקוונת בשלב זה").
- The only contact paths are the demo form and WhatsApp, and both are inactive. The phone number **appears only inside the logo image**, not as text or a link.

### Images and animation
- The only image is `logo-new.png` (313×303, 26 KB). `content.js` refers to a portrait and two stock images, but **none of these files exist** on the deployment, and none are used.
- Animation: only 180ms hover transitions, which are disabled under `prefers-reduced-motion`.

### Mobile and RTL
- RTL is correct throughout. There's no horizontal scroll at 375px.
- On phones the hero is mostly logo, so the CTA sits at the bottom of the first screen. The decorative flowers are hidden below 1000px.

### Accessibility (mostly strong)
- Good: skip link, labelled nav toggle with Esc/outside-click handling, `focus-visible` outlines, real labels, `aria-invalid` with error messages, a polite live region, a forced-colours fallback and 44–48px tap targets.
- Issues:
  - 12px eyebrows and notes are small for Hebrew.
  - The About summary repeats the first paragraph word for word when the accordion is opened.
  - The h1 is a list of disciplines rather than a sentence.

### Performance
- Light: no frameworks, and one image.
- Costs: 6 TTF font files (woff2 would cut them roughly in half), and rendering everything client-side delays first content until the JS runs.

## 2. Redesign plan

**Direction:** modern botanical apothecary. Ivory paper, burgundy ink, and sage and forest green as the "living plant" layer. Burgundy stays the brand voice, and green supports it without competing.

### Design tokens (Phase 2)
| Role | Token | Hex | Use |
|---|---|---|---|
| Canvas | `--ivory` | `#F8F5EF` | Default background |
| Paper | `--cream` | `#F3E5D8` | Cards and the philosophy band (from the brand) |
| Brand | `--burgundy` | `#650B2D` | Logo, h1/h2, primary buttons |
| Accent | `--sage` | `#87977B` | **Decoration only** (line art, dividers, number rings) |
| Wash | `--sage-wash` | `#E7EBE1` | Soft section background for services |
| Support | `--forest` | `#344C3D` | Eyebrows, h3, nav hover, secondary buttons, footer |
| Detail | `--sand` | `#C6A98D` | **Decoration only** (hairlines, ornaments) |
| Text | `--ink` | `#393B32` | Body text |
| Text 2 | `--ink-soft` | `#5F6156` | Secondary text |

Contrast checked:
- Ink on ivory 10.5:1, burgundy 11.8:1, forest 8.6:1, ink-soft 5.8:1, and ink on sage-wash 9.4:1.
- Sage (2.9:1) and sand (2.0:1) **never carry text**.
- In the footer, ivory on forest is 8.6:1 and `#B9C4AE` on forest is 5.2:1.

### Homepage architecture (Phase 4)
| # | Section | Content source |
|---|---|---|
| 1 | Header: original logo seal + wordmark, nav, contact pill always visible | Existing |
| 2 | Hero: arched media (botanical animation slot), h1, subtitle, CTA + secondary link | Existing copy |
| 3 | About Shanni: framed card using the postcard frame motif, accordion kept, duplicate paragraph removed | Existing |
| 4 | Services: 4 cards on a sage wash, details expand, topic pre-fill kept | Existing |
| 5 | Ingredients & preparation philosophy: cream band, the card's scroll divider | **Postcard copy** (Shanni's printed text) |
| 6 | Personal note: quote band with the original lotus | Existing |
| 7 | Contact: copy, WhatsApp, phone, form (logic unchanged) | Existing + phone from the logo (needs approval) |
| 8 | Dark forest footer with lotus, nav and back-to-top | Existing |

**Waiting on real content** (not invented):
- Selected products: needs the real catalogue items and photos.
- Testimonials: needs approved quotes.
- Portrait: the file is referenced but missing.

The layout leaves a natural slot for each, between sections 5 and 6.

### Visual details
- The **original lotus and ornaments are extracted as vectors** from the postcard PDF (`assets/art/`), so every motif is genuinely BAR NUR rather than generic leaf icons.
- Fine double-rule frames echo the postcard. Radii are 4–8px on cards and an arch on the hero media.
- Shadows are minimal. Reveal-on-scroll is a 12px fade-up, only with JS and only when motion is allowed.

### Hero animation (Phase 3)
- The media slot has a fixed `aspect-ratio`, so nothing shifts when it loads.
- A static poster shows immediately, and `<video>` is attached only if a file is configured, motion is allowed and Save-Data is off. It plays only while on screen.
- Until the filmed or AI asset exists, the poster is the original lotus on a warm arched ground, not a fake animation.
- Generation prompt and specs: `docs/HERO-VIDEO-BRIEF.md`.

### Changes that need approval
1. Show the phone number **052-8619599** as a text/`tel:` link in contact. It's printed on the logo but isn't on the current page.
2. Use the postcard text as section 5.
3. Show only paragraphs 2–5 when the About accordion opens, so the summary doesn't repeat.
4. Microcopy for new section labels:
   - Hero secondary link "תחומי העיסוק" (the existing nav label)
   - Section 5 eyebrow "מן הצמח אל העור"
   - Footer heading "ניווט"

### Not changed
All copy, routes and anchors, form validation and preview/live logic, the WhatsApp config, the honeypot, consent, meta tags and `noindex` (still a review build).

### Recommended at launch
- Convert fonts to woff2 with a Hebrew + Latin subset.
- Pre-render the HTML (or move the content into `index.html`) for SEO.
- Remove `noindex`, add Open Graph tags and a `LocalBusiness` schema.
- Configure the WhatsApp number and the form endpoint.
