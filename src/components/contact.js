import { content, contactConfig } from '../content.js';
import { escapeHtml, icon } from '../ui.js';
import { validateInquiry, sendInquiry, whatsappUrl } from '../contact-service.js';
import { petals } from '../art.js';
export function Contact() {
  const live=contactConfig.mode==='live' && Boolean(contactConfig.endpoint);
  const whatsapp=whatsappUrl(contactConfig.whatsappNumber,contactConfig.whatsappMessage);
  const phone=contactConfig.phoneDisplay&&contactConfig.phoneTel?`<a class="contact-phone" href="tel:${escapeHtml(contactConfig.phoneTel)}">${icon('phone')}<span><span class="contact-phone-label">שני</span> <span class="contact-phone-number" dir="ltr">${escapeHtml(contactConfig.phoneDisplay)}</span></span></a>`:'';
  return `<section id="contact" class="contact section" aria-labelledby="contact-title"><div class="wrap contact-grid">
    <div class="contact-copy reveal">${petals('contact-petals')}<p class="eyebrow">יצירת קשר</p><h2 id="contact-title">נתחיל בשיחה</h2><p class="contact-lead">אשמח לשמוע מה הביא אותך לכאן —<br>טיפול, מוצר אישי או מפגש של יצירה.</p>
      <div class="contact-direct">${phone}
      ${whatsapp?`<a class="button secondary whatsapp" href="${escapeHtml(whatsapp)}" target="_blank" rel="noopener noreferrer">${icon('chat')} לפנייה בוואטסאפ <span class="sr-only">(נפתח בחלון חדש)</span></a>`:`<button class="button secondary whatsapp" type="button" disabled aria-describedby="whatsapp-note">${icon('chat')} לפנייה בוואטסאפ</button><p id="whatsapp-note" class="contact-note">קישור הוואטסאפ אינו פעיל עדיין.</p>`}</div>
    </div>
    <div class="form-panel reveal"><div class="form-notice" id="form-notice">${live?'פרטי הפנייה ישמשו לחזרה אליך בלבד.':'טופס הדגמה — הפרטים אינם נשלחים או נשמרים.'}</div>
    <form id="inquiry-form" novalidate aria-describedby="form-notice privacy-note">
      <div class="form-row"><div class="field"><label for="name">שם מלא <span>(חובה)</span></label><input id="name" name="name" autocomplete="name" maxlength="80" required aria-describedby="name-error"><p class="field-error" id="name-error"></p></div>
      <div class="field"><label for="phone">טלפון <span>(חובה)</span></label><input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="24" required aria-describedby="phone-error"><p class="field-error" id="phone-error"></p></div></div>
      <div class="field"><label for="interest">נושא הפנייה <span>(חובה)</span></label><select id="interest" name="interest" required aria-describedby="interest-error"><option value="">בחירת תחום עניין</option>${content.services.map(s=>`<option value="${s.id}">${escapeHtml(s.title)}</option>`).join('')}<option value="general">פנייה כללית</option></select><p class="field-error" id="interest-error"></p></div>
      <div class="field"><label for="message">כמה מילים <span>(לא חובה)</span></label><textarea id="message" name="message" rows="3" maxlength="500" aria-describedby="privacy-note message-error" placeholder="אפשר לציין את נושא הפנייה בלבד"></textarea><p id="privacy-note" class="field-hint">נא לא לכתוב מידע רפואי או מידע אישי רגיש. עד 500 תווים.</p><p class="field-error" id="message-error"></p></div>
      <div class="honeypot" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
      <div class="consent-field"><label class="consent-label" for="consent"><input id="consent" name="consent" type="checkbox" required aria-describedby="consent-error"><span>אני מסכימ/ה ש־BAR NUR יצרו איתי קשר בנוגע לפנייה זו. <span class="required-label">(חובה)</span></span></label><p class="field-error" id="consent-error"></p></div>
      <button class="button primary form-submit" type="submit">${live?'שליחת פנייה':'בדיקת הטופס בלבד'} ${icon('arrow')}</button><p id="form-status" class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
    </form></div>
  </div></section>`;
}
export function initContact() {
  const form=document.querySelector('#inquiry-form');
  const status=document.querySelector('#form-status');
  let busy=false;
  const ids=['name','phone','interest','message','consent'];
  form.addEventListener('submit',async e=>{
    e.preventDefault(); if(busy)return;
    const values=Object.fromEntries(new FormData(form)); values.consent=form.elements.consent.checked;
    const errors=validateInquiry(values,[...content.services.map(s=>s.id),'general']);
    ids.forEach(id=>{ form.elements[id].setAttribute('aria-invalid',String(Boolean(errors[id])));document.querySelector(`#${id}-error`).textContent=errors[id]||''; });
    if(Object.keys(errors).length){status.textContent='יש לתקן את השדות המסומנים.';form.elements[Object.keys(errors)[0]].focus();return;}
    if(contactConfig.mode!=='live'||!contactConfig.endpoint){status.textContent='השדות תקינים. זו בדיקה מקומית בלבד — לא נשלחה פנייה ולא נשמרו פרטים.';status.focus();return;}
    const button=form.querySelector('[type="submit"]');busy=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='הפנייה נשלחת…';
    try{await sendInquiry(values,contactConfig);form.reset();status.textContent='הפנייה התקבלה. תודה על יצירת הקשר.';}
    catch{status.textContent='לא התקבל אישור שהפנייה נשלחה. אפשר לנסות שוב מאוחר יותר או לפנות בוואטסאפ, אם הקישור פעיל.';}
    finally{busy=false;button.disabled=false;form.removeAttribute('aria-busy');status.focus();}
  });
  ids.forEach(id=>form.elements[id].addEventListener('input',()=>{form.elements[id].removeAttribute('aria-invalid');document.querySelector(`#${id}-error`).textContent='';status.textContent='';}));
  document.querySelectorAll('.interest-link').forEach(a=>a.addEventListener('click',()=>{form.elements.interest.value=a.dataset.interest;form.elements.interest.dispatchEvent(new Event('input'));requestAnimationFrame(()=>form.elements.name.focus({preventScroll:true}));}));
}
