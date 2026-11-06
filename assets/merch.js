/* Merch Tlapkám: katalog + košík.
   Košík žije jen v prohlížeči zákazníka (localStorage). Objednávka se odesílá
   přes Tally formulář (dbN2bA), platba převodem / QR na stránce /merch-platba.
   Nastavení (spuštění, číslo účtu) je v assets/obchod-config.js.
   Ceny jsou uvedené tady i v Tally (výpočet ceny). Při změně ceny upravit obojí!
   Pole `tally` = do kterého počtu kusů v Tally se položka započítá (damske, panske, set, cepice, chlupy, zvirata). */

const OBJEDNAVKY_SPUSTENY = !!(window.OBCHOD && window.OBCHOD.OBJEDNAVKY_SPUSTENY);

const STRIHY_TRICKO = {
  'Dámské': { velikosti:['XS','S','M','L','XL','2XL'], tabulka:'velikosti-damske', tally:'damske', slug:'damske' },
  'Pánské': { velikosti:['S','M','L','XL','2XL','3XL'], tabulka:'velikosti-panske', tally:'panske', slug:'panske' }
};
const BARVY_TRICKO = { 'Khaki':'khaki', 'Černá':'cerna' };

const PRODUKTY = [
  { id:'tricko-kocka', nazev:'Tričko s výšivkou: srdce s kočkou', cena:690,
    popis:'Prémiová bavlna Hadrkerka, poctivá béžová výšivka anatomického srdce s kočkou.',
    strihy:STRIHY_TRICKO, barvy:Object.keys(BARVY_TRICKO),
    fotky:s => [`tricko-kocka-${STRIHY_TRICKO[s.strih].slug}-${BARVY_TRICKO[s.barva]}`] },
  { id:'tricko-pes', nazev:'Tričko s výšivkou: srdce se psem', cena:690,
    popis:'Prémiová bavlna Hadrkerka, poctivá béžová výšivka anatomického srdce se psem.',
    strihy:STRIHY_TRICKO, barvy:Object.keys(BARVY_TRICKO),
    fotky:s => [`tricko-pes-${STRIHY_TRICKO[s.strih].slug}-${BARVY_TRICKO[s.barva]}`] },
  { id:'set', nazev:'Partnerský set: oversize trička pro páry', cena:1490, stitek:'Výhodnější balíček', tally:'set',
    popis:'2× oversize béžové tričko s výšivkou (volitelně pes / kočka). Těžká organická bavlna Hadrkerka.',
    fotky:() => ['set-1'], tabulka:'velikosti-oversize',
    volby:[ {klic:'motiv', label:'Motiv výšivky', hodnoty:['Pes','Kočka']},
            {klic:'velikost1', label:'Velikost 1. trička', hodnoty:['XS','S','M','L','XL','2XL','3XL']},
            {klic:'velikost2', label:'Velikost 2. trička', hodnoty:['XS','S','M','L','XL','2XL','3XL']} ] },
  { id:'cepice', nazev:'Zimní čepice s výšivkou', cena:590, tally:'cepice',
    popis:'Měkký hřejivý úplet, kvalitní poctivá výšivka. Motiv Pes v mysli / Kočka v mysli.',
    barvy:['Béžová','Černá'],
    fotky:s => [`cepice-${(s.motiv || '').startsWith('Kočka') ? 'kocka' : 'pes'}-${s.barva === 'Černá' ? 'cerna' : 'bezova'}`],
    volby:[ {klic:'motiv', label:'Motiv výšivky', hodnoty:['Pes v mysli','Kočka v mysli']} ] },
  { id:'chlupy', nazev:'Oversize tričko „S chlupy bude láska všude“', cena:690, tally:'chlupy',
    popis:'Béžové oversize tričko, vínový potisk vpředu a vzadu. 100% udržitelná bavlna.',
    fotky:() => ['oversize-chlupy'], bezTabulky:true,
    volby:[ {klic:'velikost', label:'Velikost', hodnoty:['S','M','L','XL','2XL','3XL']} ] },
  { id:'zvirata', nazev:'Oversize tričko „Zvířata milují lidi, respektují je“', cena:690, tally:'zvirata',
    popis:'Béžové oversize tričko s vínovým potiskem. 100% udržitelná bavlna.',
    fotky:() => ['oversize-zvirata'], bezTabulky:true,
    volby:[ {klic:'velikost', label:'Velikost', hodnoty:['S','M','L','XL','2XL','3XL']} ] }
];

const kc = n => n.toLocaleString('cs-CZ') + ' Kč';
const $ = (s, el=document) => el.querySelector(s);
const produkt = id => PRODUKTY.find(x => x.id === id);

let kosik = [];
try { kosik = JSON.parse(localStorage.getItem('tlapkam-kosik') || '[]'); } catch (e) { kosik = []; }
kosik = Array.isArray(kosik) ? kosik.filter(r => r && produkt(r.id)) : []; // starší položky z dřívější verze zahodit
const uloz = () => { try { localStorage.setItem('tlapkam-kosik', JSON.stringify(kosik)); } catch (e) {} };

/* Aktuální výběr na kartě produktu */
function stavKarty(card){
  const s = {};
  const aktivniStrih = $('.seg button.on', card); if (aktivniStrih) s.strih = aktivniStrih.dataset.strih;
  card.querySelectorAll('select').forEach(el => s[el.dataset.klic] = el.value);
  return s;
}

function selectHtml(klic, label, hodnoty){
  return `<label class="pv"><span>${label}</span><select data-klic="${klic}">${hodnoty.map(h => `<option>${h}</option>`).join('')}</select></label>`;
}

function kartaHtml(p){
  const strihy = p.strihy ? Object.keys(p.strihy) : null;
  const vychozi = { strih: strihy && strihy[0], barva: p.barvy && p.barvy[0] };
  (p.volby || []).forEach(v => vychozi[v.klic] = v.hodnoty[0]);
  const fotky = p.fotky(vychozi);
  const volby = [
    p.barvy ? selectHtml('barva', 'Barva', p.barvy) : '',
    strihy ? selectHtml('velikost', 'Velikost', p.strihy[strihy[0]].velikosti) : '',
    ...(p.volby || []).map(v => selectHtml(v.klic, v.label, v.hodnoty))
  ].join('');
  const tabulkaBtn = (strihy || p.tabulka)
    ? `<button type="button" class="linkbtn" data-tabulka>Tabulka velikostí</button>`
    : (p.bezTabulky ? `<span class="muted small">Tabulku velikostí doplníme</span>` : '');
  return `
  <article class="prod" data-id="${p.id}">
    <div class="prod-foto"><img src="assets/merch/${fotky[0]}.jpg" alt="${p.nazev}" loading="lazy">
      ${p.stitek ? `<span class="prod-stitek">${p.stitek}</span>` : ''}
    </div>
    <div class="prod-thumbs-wrap">${thumbsHtml(fotky)}</div>
    <div class="prod-body">
      <h3>${p.nazev}</h3>
      <div class="prod-cena">${kc(p.cena)}</div>
      <p>${p.popis}</p>
      ${strihy ? `<div class="seg" role="group" aria-label="Střih">${strihy.map((s,i) => `<button type="button" data-strih="${s}" class="${i?'':'on'}" aria-pressed="${i?'false':'true'}">${s}</button>`).join('')}</div>` : ''}
      <div class="prod-volby">${volby}
        <label class="pv pv-ks"><span>Počet</span><input type="number" min="1" max="20" value="1" data-klic="ks"></label>
      </div>
      <div class="prod-akce">
        <button type="button" class="btn sm" data-pridat>Přidat do košíku</button>
        ${tabulkaBtn}
      </div>
    </div>
  </article>`;
}

function thumbsHtml(fotky){
  if (fotky.length < 2) return '';
  return `<div class="prod-thumbs">${fotky.map((f,i) => `<button type="button" data-foto="${f}" class="${i?'':'on'}" aria-label="Fotka ${i+1}"><img src="assets/merch/${f}.jpg" alt=""></button>`).join('')}</div>`;
}

/* Překreslí fotku (a u triček nabídku velikostí) podle výběru */
function aktualizujKartu(card){
  const p = produkt(card.dataset.id); const s = stavKarty(card);
  const fotky = p.fotky(s);
  $('.prod-foto img', card).src = `assets/merch/${fotky[0]}.jpg`;
  $('.prod-thumbs-wrap', card).innerHTML = thumbsHtml(fotky);
}

function vykresliKatalog(){
  const grid = $('#produkty');
  grid.innerHTML = PRODUKTY.map(kartaHtml).join('');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.prod'); if (!card) return;
    const p = produkt(card.dataset.id);
    const thumb = e.target.closest('[data-foto]');
    if (thumb){
      $('.prod-foto img', card).src = `assets/merch/${thumb.dataset.foto}.jpg`;
      card.querySelectorAll('.prod-thumbs button').forEach(b => b.classList.toggle('on', b === thumb));
      return;
    }
    const seg = e.target.closest('[data-strih]');
    if (seg){
      card.querySelectorAll('.seg button').forEach(b => { const on = b === seg; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      const sel = $('select[data-klic="velikost"]', card); const puvodni = sel.value;
      const velikosti = p.strihy[seg.dataset.strih].velikosti;
      sel.innerHTML = velikosti.map(v => `<option${v === puvodni ? ' selected' : ''}>${v}</option>`).join('');
      aktualizujKartu(card); return;
    }
    if (e.target.closest('[data-tabulka]')){
      const s = stavKarty(card);
      otevriTabulku(p.strihy ? p.strihy[s.strih].tabulka : p.tabulka); return;
    }
    if (e.target.closest('[data-pridat]')){
      const btn = e.target.closest('[data-pridat]');
      const vyber = stavKarty(card);
      const ks = Math.max(1, Math.min(20, parseInt($('[data-klic="ks"]', card).value, 10) || 1));
      kosik.push({ id:p.id, vyber, ks }); uloz(); vykresliKosik();
      btn.textContent = 'Přidáno ✓'; setTimeout(() => btn.textContent = 'Přidat do košíku', 1400);
    }
  });

  grid.addEventListener('change', e => {
    if (['barva','motiv'].includes(e.target.dataset.klic)) aktualizujKartu(e.target.closest('.prod'));
  });
}

function popisPolozky(r){
  const p = produkt(r.id); const v = r.vyber || {};
  const casti = [v.strih, v.barva, v.velikost, v.motiv, v.velikost1 && `1. tričko ${v.velikost1}`, v.velikost2 && `2. tričko ${v.velikost2}`].filter(Boolean);
  return `${p.nazev} (${casti.join(', ')})`;
}

function tallyKlic(r){
  const p = produkt(r.id);
  return p.strihy ? p.strihy[r.vyber.strih].tally : p.tally;
}

function vykresliKosik(){
  const box = $('#kosik'); const celkem = kosik.reduce((s, r) => s + produkt(r.id).cena * r.ks, 0);
  $('#kosik-pocet').textContent = kosik.reduce((s,r) => s + r.ks, 0);
  if (!kosik.length){ box.innerHTML = '<p class="muted">Košík je zatím prázdný.</p>'; return; }
  box.innerHTML = `
    <ul class="kosik-list">${kosik.map((r,i) => `
      <li><span>${r.ks}× ${popisPolozky(r)}</span><b>${kc(produkt(r.id).cena * r.ks)}</b>
      <button type="button" data-odebrat="${i}" aria-label="Odebrat">×</button></li>`).join('')}</ul>
    <div class="kosik-celkem"><span>Celkem za zboží</span><b>${kc(celkem)}</b></div>
    <p class="muted small">Způsob doručení zvolíte v objednávce.</p>
    ${OBJEDNAVKY_SPUSTENY
      ? `<a class="btn" href="#" data-objednat>Objednat</a>`
      : `<span class="btn disabled" aria-disabled="true">Předprodej brzy spustíme</span>`}`;
}

function objednavkaUrl(){
  const pocty = { damske:0, panske:0, set:0, cepice:0, chlupy:0, zvirata:0 };
  kosik.forEach(r => pocty[tallyKlic(r)] += r.ks);
  const polozky = kosik.map(r => `${r.ks}× ${popisPolozky(r)}`).join('\n');
  const vs = String(Date.now()).slice(-10); // číslo objednávky = variabilní symbol
  const q = new URLSearchParams({ ...pocty, polozky, vs });
  return `/merch-objednavka?${q.toString()}`;
}

function otevriTabulku(t){
  const d = $('#tabulka-dialog'); $('img', d).src = `assets/merch/${t}.jpg`; d.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
  vykresliKatalog(); vykresliKosik();
  $('#kosik').addEventListener('click', e => {
    if (e.target.dataset.odebrat !== undefined){ kosik.splice(+e.target.dataset.odebrat, 1); uloz(); vykresliKosik(); }
    if (e.target.hasAttribute('data-objednat')){ e.preventDefault(); location.href = objednavkaUrl(); }
  });
  $('#tabulka-dialog').addEventListener('click', e => { if (e.target.matches('dialog, [data-zavrit]')) e.currentTarget.close(); });
});
