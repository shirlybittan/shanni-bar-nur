import { content, heroMedia } from '../content.js';
import { escapeHtml, icon } from '../ui.js';
import { lotus, petals } from '../art.js';
// The media frame has a fixed aspect ratio, so the poster, the video and the static
// composition all occupy the same box (no layout shift). The video is attached by motion.js.
function heroStill() {
  if (heroMedia.poster) return `<img class="hero-poster" src="${escapeHtml(heroMedia.poster)}" alt="" width="616" height="770" fetchpriority="high" decoding="async">`;
  return `<div class="hero-still" aria-hidden="true"><span class="hero-glow"></span>${lotus('hero-lotus')}</div>`;
}
export function Hero() {
  return `<section id="home" class="hero" aria-labelledby="hero-title"><div class="wrap hero-grid">
  <div class="hero-copy reveal">
    ${petals('hero-petals')}
    <h1 id="hero-title">${content.intro.split(' | ').map((term,i)=>`${i?'<span class="hero-divider" aria-hidden="true"> | </span>':''}<span class="hero-term">${escapeHtml(term)}</span>`).join('')}</h1>
    <p class="hero-subtitle">${escapeHtml(content.headline.join(' '))}</p>
    <div class="hero-actions"><a class="button primary" href="#contact">ליצירת קשר ${icon('arrow')}</a><a class="text-link" href="#services">תחומי העיסוק</a></div>
  </div>
  <figure class="hero-media" data-hero-media>
    <div class="hero-arch">${heroStill()}</div>
    <figcaption class="sr-only">${escapeHtml(heroMedia.alt)}</figcaption>
  </figure>
 </div></section>`;
}
