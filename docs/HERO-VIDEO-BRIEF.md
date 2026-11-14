# Hero animation: generation brief & technical requirements

> **Current asset (14 Nov 2026):** Hailuo AI clip, 1344×768 at 24 fps, 6.6 s. Processing for the site:
> - Cropped to 4:5 around the bottle and kept at native resolution (616×770).
> - The last 0.5 s is cross-faded into the first 0.5 s so the loop has no visible jump.
> - Audio removed. Final loop is 6.1 s.
>
> Output: `assets/media/hero-loop.webm` (VP9, 267 KB), `hero-loop.mp4` (H.264, 399 KB) and `hero-poster.webp` (26 KB, first frame).
> To upgrade later, generate at ≥1080 px tall in 4:5 and re-run the commands below.

The site is already wired for this asset. Drop the files into `assets/media/` and fill in `heroMedia` in `src/content.js`. Until then, the hero shows the original BAR NUR lotus on a warm arched ground.

## Recommended route
1. **Generate a still first.** Use an image model (Midjourney v7, Imagen, Flux 1.1 Pro or similar) to make the hero composition at 4:5. Pick the best frame. This becomes the **poster** and the **first/last frame**.
2. **Animate from that still.** Use image-to-video (Runway Gen-4, Kling 2.x, Veo 3 or Luma Ray 2) with *first frame = last frame = the still*, so the loop closes seamlessly.
3. If the model can't produce 12–16 s in one pass, generate two 6–8 s clips. Make each one start and end on the still, and edit them together. Shorten or lengthen the stillness at the start and end to land on 14 s.

## Image prompt (still / poster)
> Editorial still-life photograph, 4:5 vertical. A single small handcrafted amber glass apothecary bottle with a cork stopper stands slightly right of centre on a pale warm-ivory linen surface, in front of a seamless warm ivory background (#F8F5EF to #F3E5D8). Around its base sits a sparse, airy arrangement of real medicinal botanicals: two sprigs of fresh rosemary, three stems of dried lavender, a few loose pale-pink and cream rose petals, and one small white chamomile flower. There is generous negative space in the upper half. Soft, diffused late-morning window light comes from the upper left, with gentle long shadows and a warm honey glow passing through the amber glass. Shallow depth of field at f/4, 100mm macro, true-to-life colour, subtle film grain. Calm, quiet-luxury, natural apothecary mood. No text, no labels, no logos, no hands, no props other than those listed, no sparkles, no smoke, no CGI look.

Negative prompt: *cartoon, illustration, 3D render, glitter, bokeh orbs, magic particles, neon, saturated colours, cluttered, multiple bottles, label text, hands, faces*.

## Video prompt (image-to-video, from the still)
> Locked-off camera, no camera movement, no zoom. The still life begins almost motionless; only a faint breath of air stirs the lavender. Over the next seconds, a few rosemary leaves, two lavender buds and three delicate rose petals slowly lift and drift in soft, curved, unhurried arcs around the amber bottle, as if carried by a gentle breeze. Two of the petals and one rosemary leaf glide toward the bottle's open neck and quietly sink inside. A slow, soft band of warm light passes across the glass from left to right, so the amber glows briefly and then settles. The remaining botanicals come to rest in their original positions and the scene returns to stillness, matching the first frame exactly. Very slow and graceful, natural physics, realistic botanical shapes, soft natural daylight, warm ivory background, premium editorial photography.

Negative: *camera move, spin, fast motion, sparkles, glow particles, magic dust, morphing objects, bottle changing shape, liquid splash, text*.

### Timing (≈14 s loop)
| Time | Action |
|---|---|
| 0–2 s | Almost still, faint movement in the lavender |
| 2–8 s | 4–6 elements drift in curved paths around the bottle |
| 7–10 s | 2–3 elements enter the bottle opening |
| 9–11 s | Soft light sweep through the glass |
| 11–14 s | Elements settle, back to the exact first frame |

## Technical requirements
| Item | Spec |
|---|---|
| Aspect / framing | **4:5** (matches the arched frame). Keep the bottle and all action inside the central 70% width and lower 75% height, because the arch crops the top corners. |
| Master | 1600×2000, 24 or 25 fps, ProRes or high-bitrate MP4 |
| Delivery – WebM | `hero-loop.webm`, VP9 (or AV1), 960×1200, CRF ~34, **≤ 1.8 MB**, no audio track |
| Delivery – MP4 | `hero-loop.mp4`, H.264 High, 960×1200, `-crf 26 -preset slow -movflags +faststart -an`, **≤ 2.5 MB** |
| Mobile (optional) | 720×900 versions, ≤ 1.2 MB |
| Poster | First frame exported as `hero-poster-1200.avif` (≤ 90 KB) + `.webp` fallback, 1200×1500 |
| Loop | First frame = last frame, no fade to black, no audio |
| Colour | Background close to `#F8F5EF`–`#F3E5D8` so the frame blends into the page |

Example encode:
```bash
ffmpeg -i master.mov -vf "scale=960:1200:flags=lanczos,fps=25" -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 hero-loop.webm
ffmpeg -i master.mov -vf "scale=960:1200:flags=lanczos,fps=25" -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart hero-loop.mp4
ffmpeg -i master.mov -frames:v 1 -vf scale=1200:1500 hero-poster-1200.webp
```

## How the site uses it (already built)
- The frame is a fixed 4:5 box, so nothing shifts on load.
- The poster or still renders immediately. The `<video>` is added by `src/motion.js` only when all of these hold: a file is configured, `prefers-reduced-motion` is not set, and Save-Data is off.
- The video is muted, `playsinline`, looped and `preload="metadata"`. It plays only while on screen and pauses when scrolled away. It fades in over the still once it's actually playing.
- If the user switches on reduced motion, the video pauses and the still stays.
