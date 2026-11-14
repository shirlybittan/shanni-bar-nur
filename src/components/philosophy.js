import { content } from '../content.js';
import { escapeHtml } from '../ui.js';
import { divider, petals } from '../art.js';
// NEW — pending approval: Shanni's postcard copy as the ingredients & preparation section.
export function Philosophy() {
  const p = content.philosophy;
  if (!p) return '';
  return `<section id="philosophy" class="philosophy section" aria-labelledby="philosophy-title"><div class="wrap philosophy-inner reveal">
    ${divider('philosophy-divider')}
    <p class="eyebrow">${escapeHtml(p.eyebrow)}</p><h2 id="philosophy-title">${escapeHtml(p.title)}</h2>
    <p class="philosophy-lead">${escapeHtml(p.lead)}</p>
    ${petals('philosophy-petals')}
    <p class="philosophy-body">${escapeHtml(p.body)}</p>
  </div></section>`;
}
