import { heroMedia } from './content.js';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

// Delicate scroll reveals. Content is visible by default; the hidden start state applies
// only when JS runs, motion is allowed and IntersectionObserver exists.
export function initReveal() {
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  const items = document.querySelectorAll('.reveal');
  document.documentElement.classList.add('has-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
}

// Hero loop: attached only when a file is configured, motion is allowed and Save-Data is off.
// Plays only while on screen; the still/poster stays underneath as the fallback.
export function initHeroMedia() {
  const frame = document.querySelector('[data-hero-media] .hero-frame');
  if (!frame || !(heroMedia.videoWebm || heroMedia.videoMp4)) return;
  if (reduce.matches || navigator.connection?.saveData) return;
  const video = document.createElement('video');
  Object.assign(video, { muted: true, loop: true, playsInline: true, preload: 'metadata' });
  video.className = 'hero-video';
  video.setAttribute('aria-hidden', 'true');
  if (heroMedia.poster) video.poster = heroMedia.poster;
  [['videoWebm', 'video/webm'], ['videoMp4', 'video/mp4']].forEach(([key, type]) => {
    if (!heroMedia[key]) return;
    const source = document.createElement('source'); source.src = heroMedia[key]; source.type = type; video.append(source);
  });
  video.addEventListener('playing', () => frame.classList.add('is-playing'), { once: true });
  frame.append(video);
  const io = new IntersectionObserver(([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); }, { threshold: 0.2 });
  io.observe(frame);
  reduce.addEventListener?.('change', (e) => { if (e.matches) { video.pause(); frame.classList.remove('is-playing'); } });
}
