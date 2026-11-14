// No storage, tracking, email-provider credentials or direct email integration in the browser.
export function validateInquiry(data, allowedInterests) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 80) errors.name = 'יש להזין שם באורך 2–80 תווים.';
  const digits = String(data.phone || '').replace(/\D/g, '');
  if (!/^[+\d\s()-]+$/.test(data.phone || '') || digits.length < 9 || digits.length > 15) errors.phone = 'יש להזין מספר טלפון תקין (9–15 ספרות).';
  if (!allowedInterests.includes(data.interest)) errors.interest = 'יש לבחור תחום עניין.';
  if ((data.message || '').length > 500) errors.message = 'ההודעה יכולה להכיל עד 500 תווים.';
  if (!data.consent) errors.consent = 'נדרשת הסכמה ליצירת קשר בנוגע לפנייה.';
  return errors;
}
export function makePayload(data) {
  return { name: data.name.trim(), phone: data.phone.trim(), interest: data.interest, message: data.message.trim(), consent: data.consent === true, consentVersion: 'contact-v1', website: data.website || '' };
}
export async function sendInquiry(data, config) {
  if (config.mode !== 'live' || !config.endpoint) throw new Error('PREVIEW_ONLY');
  const url = new URL(config.endpoint, location.origin);
  if (url.origin !== location.origin || url.protocol !== 'https:') throw new Error('INVALID_ENDPOINT');
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type':'application/json' }, credentials:'same-origin', body:JSON.stringify(makePayload(data)), signal:AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('SEND_FAILED');
  const result = await response.json();
  if (result.accepted !== true) throw new Error('NOT_ACCEPTED');
  return true;
}
export function whatsappUrl(number, message) {
  if (!/^[1-9]\d{8,14}$/.test(number)) return '';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
