import { lotus } from '../art.js';
export function Footer() {
  return `<footer class="site-footer"><div class="wrap footer-inner">
    <div class="footer-brand-block">${lotus('footer-lotus')}<a href="#home" class="footer-brand">בר נור <span lang="en" dir="ltr">BAR NUR</span></a><p>נטורופתיה · רפואת צמחים · רוקחות טבעית</p></div>
    <nav class="footer-nav" aria-label="ניווט בתחתית העמוד"><a href="#about">נעים להכיר</a><a href="#services">תחומי העיסוק</a><a href="#contact">ליצירת קשר</a></nav>
    <div class="footer-meta"><a href="#home" class="back-top">בחזרה למעלה ↑</a><p class="development-note">גרסת סקירה · טופס הפנייה בהדגמה</p></div>
  </div></footer>`;
}
