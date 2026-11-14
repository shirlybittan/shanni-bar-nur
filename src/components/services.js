import { content } from '../content.js';
import { escapeHtml, copyParagraphs, icon } from '../ui.js';
export function Services() {
  return `<section id="services" class="services section" aria-labelledby="services-title"><div class="wrap">
  <div class="section-heading reveal"><p class="eyebrow">הדרך שמתאימה לך</p><h2 id="services-title">טיפול, טבע ויצירה</h2></div>
  <div class="service-list">${content.services.map(s=>`<article class="service reveal"><details><summary><span class="service-number" aria-hidden="true">${s.number}</span><h3 class="service-title">${escapeHtml(s.title)}</h3><span class="service-excerpt">${escapeHtml(s.summary)}</span><span class="service-more">לקריאה נוספת <span class="expand-symbol" aria-hidden="true">+</span></span></summary><div class="service-details reading-copy">${copyParagraphs(s.paragraphs)}<a class="text-link interest-link" href="#contact" data-interest="${s.id}">לפנייה בנושא ${icon('arrow')}</a></div></details></article>`).join('')}</div>
 </div></section>`;
}
