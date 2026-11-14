import { content } from '../content.js';
import { escapeHtml, copyParagraphs, icon } from '../ui.js';
import { lotus, divider } from '../art.js';
export function About() {
  // The summary already equals the first paragraph, so the expanded story starts from the second.
  const story = content.about.paragraphs[0] === content.about.summary ? content.about.paragraphs.slice(1) : content.about.paragraphs;
  return `<section id="about" class="about section" aria-labelledby="about-title"><div class="wrap about-grid">
  <div class="about-art reveal" aria-hidden="true">${lotus('about-lotus')}</div>
  <div class="about-card reveal"><div class="card-frame">
    ${divider('about-divider')}<p class="eyebrow">קצת עליי</p><h2 id="about-title">נעים להכיר, אני שני</h2>
    <p class="about-lead">${escapeHtml(content.about.summary)}</p>
    <details class="about-story"><summary><span>קצת על הדרך שלי</span><span class="expand-symbol" aria-hidden="true">+</span></summary><div class="reading-copy">${copyParagraphs(story)}</div></details>
    <a class="text-link" href="#contact">אפשר להתחיל בשיחה ${icon('arrow')}</a>
  </div></div>
 </div></section>`;
}
