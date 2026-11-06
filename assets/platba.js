/* Platební stránka: z URL vezme VS a částku (předá je Tally po odeslání objednávky)
   a ukáže údaje k převodu + QR Platbu (formát SPD). */
(function(){
  const $ = s => document.querySelector(s);
  const q = new URLSearchParams(location.search);
  const vs = (q.get('vs') || '').replace(/\D/g, '').slice(0, 10);
  const castka = Math.round(parseFloat(String(q.get('castka') || '').replace(',', '.')) * 100) / 100;
  const cfg = window.OBCHOD || {};

  function ucetNaIban(ucet){
    const m = String(ucet).replace(/\s/g, '').match(/^(?:(\d{1,6})-)?(\d{2,10})\/(\d{4})$/);
    if (!m) return null;
    const bban = m[3] + (m[1] || '').padStart(6, '0') + m[2].padStart(10, '0');
    const kontrola = 98n - (BigInt(bban + '123500') % 97n); // C=12, Z=35, 00
    return 'CZ' + String(kontrola).padStart(2, '0') + bban;
  }

  if (!vs || !(castka > 0)){
    $('#platba').innerHTML = '<p>Údaje k platbě se nenačetly. Napište nám prosím na <a href="mailto:info@tlapkam.cz">info@tlapkam.cz</a>, pošleme je e-mailem.</p>';
    return;
  }
  $('#p-castka').textContent = castka.toLocaleString('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' Kč';
  $('#p-vs').textContent = vs;
  $('#p-splatnost').textContent = (cfg.SPLATNOST_DNI || 7) + ' dní';

  const iban = cfg.UCET ? ucetNaIban(cfg.UCET) : null;
  if (!iban){
    $('#p-ucet').textContent = 'pošleme e-mailem';
    $('#qr').innerHTML = '<p class="muted small">QR kód vám pošleme e-mailem spolu s číslem účtu.</p>';
    return;
  }
  $('#p-ucet').textContent = cfg.UCET;
  const spd = `SPD*1.0*ACC:${iban}*AM:${castka.toFixed(2)}*CC:CZK*X-VS:${vs}*MSG:MERCH TLAPKAM ${vs}`;
  const qr = qrcode(0, 'M'); qr.addData(spd); qr.make();
  $('#qr').innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
})();
