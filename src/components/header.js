import { icon } from '../ui.js';
export function Header() {
  return `<header class="site-header"><div class="header-inner wrap">
    <a class="brand-link" href="#home" aria-label="BAR NUR — לראש העמוד"><span class="brand-seal" aria-hidden="true"><img src="./assets/images/logo-new.png" alt="" width="313" height="303"></span><span class="brand-words"><span class="brand-name">בר נור</span><span class="brand-sub" lang="en" dir="ltr">BAR NUR</span></span></a>
    <nav id="navigation" class="navigation" aria-label="ניווט ראשי"><a href="#about">נעים להכיר</a><a href="#services">תחומי העיסוק</a><a class="nav-contact" href="#contact">ליצירת קשר ${icon('arrow')}</a></nav>
    <div class="header-actions"><a class="button primary header-cta" href="#contact">ליצירת קשר</a>
    <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" aria-label="פתיחת תפריט">${icon('menu')}</button></div>
  </div></header>`;
}
export function initHeader() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const header = document.querySelector('.site-header');
  function close() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'פתיחת תפריט'); nav.classList.remove('is-open'); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'סגירת תפריט' : 'פתיחת תפריט'); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); } });
  document.addEventListener('click', (e) => { if (!e.target.closest('.site-header')) close(); });
  // Hairline appears once the page scrolls; purely visual.
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
}
