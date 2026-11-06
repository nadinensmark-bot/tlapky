/* Merch Tlapkám: katalog + košík.
   Košík žije jen v prohlížeči zákazníka (localStorage). Objednávka se odesílá
   přes Tally formulář (dbN2bA), platba převodem / QR na stránce merch-platba.html.
   Nastavení (spuštění, číslo účtu) je v assets/obchod-config.js.
   Ceny jsou uvedené tady i v Tally (výpočet ceny). Při změně ceny upravit obojí! */

const OBJEDNAVKY_SPUSTENY = !!(window.OBCHOD && window.OBCHOD.OBJEDNAVKY_SPUSTENY);
const TALLY_FORM = 'dbN2bA';

const PRODUKTY = [
  { id:'damske', nazev:'Dámské tričko s výšivkou', cena:690,
    popis:'Prémiová bavlna Hadrkerka, poctivá béžová výšivka anatomického srdce se zvířátkem.',
    fotky:{ 'Khaki':['damske-khaki-1','damske-khaki-2'], 'Černá':['damske-cerna-1','damske-cerna-2'] },
    volby:[ {klic:'barva', label:'Barva', hodnoty:['Khaki','Černá']},
            {klic:'velikost', label:'Velikost (dámský střih)', hodnoty:['XS','S','M','L','XL','2XL']} ],
    tabulka:'velikosti-damske' },
  { id:'panske', nazev:'Pánské tričko s výšivkou', cena:690,
    popis:'Prémiová bavlna Hadrkerka, poctivá béžová výšivka anatomického srdce se zvířátkem.',
    fotky:{ 'Khaki':['panske-khaki-1','panske-khaki-2'], 'Černá':['panske-cerna-1','panske-cerna-2'] },
    volby:[ {klic:'barva', label:'Barva', hodnoty:['Khaki','Černá']},
            {klic:'velikost', label:'Velikost (pánský střih)', hodnoty:['S','M','L','XL','2XL','3XL']} ],
    tabulka:'velikosti-panske' },
  { id:'set', nazev:'Partnerský set: oversize trička pro páry', cena:1490, stitek:'Výhodnější balíček',
    popis:'2× oversize béžové tričko s výšivkou (volitelně pes / kočka). Těžká organická bavlna Hadrkerka.',
    fotky:{ '_':['set-1'] },
    volby:[ {klic:'motiv', label:'Motiv výšivky', hodnoty:['Pes','Kočka']},
            {klic:'velikost1', label:'Velikost 1. trička', hodnoty:['XS','S','M','L','XL','2XL','3XL']},
            {klic:'velikost2', label:'Velikost 2. trička', hodnoty:['XS','S','M','L','XL','2XL','3XL']} ],
    tabulka:'velikosti-oversize' },
  { id:'cepice', nazev:'Zimní čepice s výšivkou', cena:590,
    popis:'Měkký hřejivý úplet, kvalitní poctivá výšivka. Motiv Pes v mysli / Kočka v mysli.',
    fotky:{ 'Béžová':['cepice-bezova-1','cepice-bezova-2'], 'Černá':['cepice-cerna-1','cepice-cerna-2'] },
    volby:[ {klic:'barva', label:'Barva', hodnoty:['Béžová','Černá']},
            {klic:'motiv', label:'Motiv výšivky', hodnoty:['Pes v mysli','Kočka v mysli']} ] },
  { id:'chlupy', nazev:'Oversize tričko „S chlupy bude láska všude“', cena:690,
    popis:'Béžové oversize tričko, vínový potisk vpředu a vzadu. 100% udržitelná bavlna.',
    fotky:{ '_':['oversize-chlupy'] },
    volby:[ {klic:'velikost', label:'Velikost', hodnoty:['S','M','L','XL','2XL','3XL']} ] },
  { id:'zvirata', nazev:'Oversize tričko „Zvířata milují lidi, respektují je“', cena:690,
    popis:'Béžové oversize tričko s vínovým potiskem. 100% udržitelná bavlna.',
    fotky:{ '_':['oversize-zvirata'] },
    volby:[ {klic:'velikost', label:'Velikost', hodnoty:['S','M','L','XL','2XL','3XL']} ] }
];

const kc = n => n.toLocaleString('cs-CZ') + ' Kč';
const $ = (s, el=document) => el.querySelector(s);

let kosik = [];
try { kosik = JSON.parse(localStorage.getItem('tlapkam-kosik') || '[]'); } catch (e) { kosik = []; }
const uloz = () => { try { localStorage.setItem('tlapkam-kosik', JSON.stringify(kosik)); } catch (e) {} };

function vykresliKatalog(){
  const grid = $('#produkty');
  grid.innerHTML = PRODUKTY.map(p => {
    const prvniFotky = Object.values(p.fotky)[0];
    const volby = p.volby.map(v => `
      <label class="pv"><span>${v.label}</span>
        <select data-klic="${v.klic}">${v.hodnoty.map(h => `<option>${h}</option>`).join('')}</select>
      </label>`).join('');
    return `
    <article class="prod" data-id="${p.id}">
      <div class="prod-foto"><img src="assets/merch/${prvniFotky[0]}.jpg" alt="${p.nazev}" loading="lazy">
        ${p.stitek ? `<span class="prod-stitek">${p.stitek}</span>` : ''}
        ${prvniFotky.length > 1 ? `<div class="prod-thumbs">${prvniFotky.map((f,i)=>`<button type="button" data-foto="${f}" aria-label="Fotka ${i+1}" class="${i?'':'on'}"></button>`).join('')}</div>` : ''}
      </div>
      <div class="prod-body">
        <h3>${p.nazev}</h3>
        <div class="prod-cena">${kc(p.cena)}</div>
        <p>${p.popis}</p>
        <div class="prod-volby">${volby}
          <label class="pv pv-ks"><span>Počet</span><input type="number" min="1" max="20" value="1" data-klic="ks"></label>
        </div>
        <div class="prod-akce">
          <button type="button" class="btn sm" data-pridat>Přidat do košíku</button>
          ${p.tabulka ? `<button type="button" class="linkbtn" data-tabulka="${p.tabulka}">Tabulka velikostí</button>` : (p.volby.some(v => v.klic === 'velikost') ? `<span class="muted small">Tabulku velikostí doplníme</span>` : '')}
        </div>
      </div>
    </article>`;
  }).join('');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.prod'); if (!card) return;
    const p = PRODUKTY.find(x => x.id === card.dataset.id);
    if (e.target.dataset.foto){
      $('.prod-foto img', card).src = `assets/merch/${e.target.dataset.foto}.jpg`;
      card.querySelectorAll('.prod-thumbs button').forEach(b => b.classList.toggle('on', b === e.target));
    }
    if (e.target.dataset.tabulka){ otevriTabulku(e.target.dataset.tabulka); }
    if (e.target.hasAttribute('data-pridat')){
      const vyber = {}; card.querySelectorAll('select').forEach(s => vyber[s.dataset.klic] = s.value);
      const ks = Math.max(1, Math.min(20, parseInt($('[data-klic="ks"]', card).value, 10) || 1));
      kosik.push({ id:p.id, vyber, ks }); uloz(); vykresliKosik();
      e.target.textContent = 'Přidáno ✓'; setTimeout(() => e.target.textContent = 'Přidat do košíku', 1400);
    }
  });

  grid.addEventListener('change', e => {
    if (e.target.dataset.klic !== 'barva') return;
    const card = e.target.closest('.prod'); const p = PRODUKTY.find(x => x.id === card.dataset.id);
    const f = p.fotky[e.target.value]; if (!f) return;
    $('.prod-foto img', card).src = `assets/merch/${f[0]}.jpg`;
    card.querySelectorAll('.prod-thumbs button').forEach((b,i) => { b.dataset.foto = f[i]; b.classList.toggle('on', i === 0); });
  });
}

function popisPolozky(r){
  const p = PRODUKTY.find(x => x.id === r.id);
  return `${p.nazev} (${Object.values(r.vyber).join(', ')})`;
}

function vykresliKosik(){
  const box = $('#kosik'); const celkem = kosik.reduce((s, r) => s + PRODUKTY.find(x => x.id === r.id).cena * r.ks, 0);
  $('#kosik-pocet').textContent = kosik.reduce((s,r) => s + r.ks, 0);
  if (!kosik.length){ box.innerHTML = '<p class="muted">Košík je zatím prázdný.</p>'; return; }
  box.innerHTML = `
    <ul class="kosik-list">${kosik.map((r,i) => `
      <li><span>${r.ks}× ${popisPolozky(r)}</span><b>${kc(PRODUKTY.find(x => x.id === r.id).cena * r.ks)}</b>
      <button type="button" data-odebrat="${i}" aria-label="Odebrat">×</button></li>`).join('')}</ul>
    <div class="kosik-celkem"><span>Celkem za zboží</span><b>${kc(celkem)}</b></div>
    <p class="muted small">Způsob doručení zvolíte v objednávce.</p>
    ${OBJEDNAVKY_SPUSTENY
      ? `<a class="btn" href="#" data-objednat>Objednat</a>`
      : `<span class="btn disabled" aria-disabled="true">Předprodej brzy spustíme</span>`}`;
}

function objednavkaUrl(){
  const pocty = { damske:0, panske:0, set:0, cepice:0, chlupy:0, zvirata:0 };
  kosik.forEach(r => pocty[r.id] += r.ks);
  const polozky = kosik.map(r => `${r.ks}× ${popisPolozky(r)}`).join('\n');
  const vs = String(Date.now()).slice(-10); // číslo objednávky = variabilní symbol
  const q = new URLSearchParams({ ...pocty, polozky, vs });
  return `merch-objednavka.html?${q.toString()}`;
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
