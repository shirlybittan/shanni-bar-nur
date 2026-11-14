import { content, heroMedia } from '../content.js';
import { escapeHtml, icon } from '../ui.js';
import { lotus, petals } from '../art.js';
// Desktop: the video fills the whole hero behind the copy. Mobile: copy first, then the video
// edge to edge, cropped around the bottle. The poster, the video and the static composition
// share one box, so nothing shifts on load. The video is attached by motion.js.
function heroStill() {
  if (heroMedia.poster) return `<img class="hero-poster" src="${escapeHtml(heroMedia.poster)}" alt="" width="1344" height="768" fetchpriority="high" decoding="async">`;
  return `<div class="hero-still" aria-hidden="true"><span class="hero-glow"></span>${lotus('hero-lotus')}</div>`;
}
export function Hero() {
  return `<section id="home" class="hero" aria-labelledby="hero-title">
  <figure class="hero-media" data-hero-media>
    <div class="hero-frame">${heroStill()}</div>
    <figcaption class="sr-only">${escapeHtml(heroMedia.alt)}</figcaption>
  </figure>
  <div class="wrap hero-grid">
  <div class="hero-copy reveal">
    ${petals('hero-petals')}
    <h1 id="hero-title">${content.intro.split(' | ').map((term,i)=>`${i?'<span class="hero-divider" aria-hidden="true"> | </span>':''}<span class="hero-term">${escapeHtml(term)}</span>`).join('')}</h1>
    <p class="hero-subtitle">${escapeHtml(content.headline.join(' '))}</p>
    <div class="hero-actions"><a class="button primary" href="#contact">ליצירת קשר ${icon('arrow')}</a><a class="text-link" href="#services">תחומי העיסוק</a></div>
  </div>
 </div></section>`;
}
