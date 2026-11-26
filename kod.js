// Gramermatik erişim kodu: GM-XXXX-YYYY
// XXXX rastgele, YYYY = XXXX'in imzası. Böylece uygulama kod listesi tutmadan kodu doğrulayabilir.
// Karışan harfler yok (0/O, 1/I).
const KOD_ALFABE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function kodImza(govde) {
  let h = 2166136261;
  for (const c of "GRAMERMATIK|" + govde + "|5400") { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
  let s = "";
  for (let i = 0; i < 4; i++) { s += KOD_ALFABE[h & 31]; h >>>= 5; }
  return s;
}
function kodTemizle(girdi) {
  let k = String(girdi || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (k.startsWith("GM")) k = k.slice(2);
  return k;
}
function kodGecerli(girdi) {
  const k = kodTemizle(girdi);
  if (k.length !== 8 || [...k].some(c => !KOD_ALFABE.includes(c))) return false;
  return kodImza(k.slice(0, 4)) === k.slice(4);
}
function kodBicim(k) { k = kodTemizle(k); return `GM-${k.slice(0, 4)}-${k.slice(4)}`; }
function kodUret() {
  const r = new Uint32Array(4); crypto.getRandomValues(r);
  const govde = [...r].map(x => KOD_ALFABE[x % 32]).join("");
  return kodBicim(govde + kodImza(govde));
}
