import { content } from '../content.js';
import { escapeHtml } from '../ui.js';
import { lotus } from '../art.js';
export function Note() {
  return `<section class="note" aria-label="מילה אישית"><div class="wrap note-inner reveal">${lotus('note-lotus')}<blockquote><p>${escapeHtml(content.about.paragraphs.at(-1))}</p><footer>שני</footer></blockquote></div></section>`;
}
