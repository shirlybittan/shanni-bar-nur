export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
// Format only the approved copy's bold labels, after escaping all text.
export const copyParagraphs = (paragraphs) => paragraphs.map(p=>`<p>${escapeHtml(p).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')}</p>`).join('');
export function photo(name, alt, { eager = false, sizes = '(min-width: 850px) 33vw, 100vw', className = '' } = {}) {
  return `<img class="${className}" src="./assets/images/${name}-640.webp" srcset="./assets/images/${name}-640.webp 640w, ./assets/images/${name}-1280.webp 1280w" sizes="${sizes}" alt="${escapeHtml(alt)}" width="1280" height="1920" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async">`;
}
export function icon(name, className = '') {
  const paths = {
    arrow: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    leaf: '<path d="M12 22V10M12 17C3 17 3 8 3 8s9 0 9 9Zm0-5C12 4 21 2 21 2s1 9-9 10Z"/>',
    flower: '<path d="M12 22v-9m0 6c6 0 7-4 7-4s-6-1-7 4Zm0-5c-5 0-7-3-7-3"/><path d="M9 10C2 12 2 5 7 5 6-1 14-1 14 4c6-4 9 4 4 6 3 5-6 7-6 2-2 4-7 2-3-2Z"/>',
    bottle: '<path d="M9 2h6v5H9zM10 7v3c-4 1-5 3-5 6v5h14v-5c0-3-1-5-5-6V7M5 15h14M11 18h2"/>',
    bouquet: '<path d="m6 10 6 12 6-12M4 14l8 8 8-8M12 7v15M8 20h8"/><path d="M9 4c-3-5-7 0-3 2-5 2 0 6 2 2 2 4 6-1 2-2 4-2 1-6-1-2Zm9 1c-2-3-5 0-2 2-3 2 0 4 2 2 1 3 4 0 2-2 3-2 0-4-2-2Z"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
    chat: '<path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 7 7 7l1-2-3-1-1 1-2-2 1-1-1-3Z"/>'
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.leaf}</svg>`;
}
