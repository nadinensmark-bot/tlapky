/* Výběr útulku pro formulář #2 (Máme hotovo!)
   Seznam schválených útulků se načítá živě z Google tabulky publikované jako CSV.
   Do tabulky se útulky dostávají automaticky z formuláře #3 (Registrace útulku),
   Kristýna u nich jen zaškrtne „Schváleno". Na webu se zobrazí jen název a kraj.

   NASTAVENÍ: sem vložit URL publikovaného CSV (viz README, sekce „Seznam útulků").
   Dokud je prázdné, načte se záložní soubor assets/utulky.json (ukázková data). */
var UTULKY_CSV_URL = "";
var UTULKY_FALLBACK = "assets/utulky.json";
var TALLY_FORM_ID = "q55ZEG";

(function () {
  var sel = document.getElementById("utulekSelect");
  var wrap = document.getElementById("tallyWrap");
  var status = document.getElementById("utulekStatus");
  if (!sel) return;

  function parseCSV(text) {
    // jednoduchý CSV parser (uvozovky, čárky, nové řádky)
    var rows = [], row = [], cur = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i], n = text[i + 1];
      if (q) {
        if (c === '"' && n === '"') { cur += '"'; i++; }
        else if (c === '"') { q = false; }
        else cur += c;
      } else {
        if (c === '"') q = true;
        else if (c === ",") { row.push(cur); cur = ""; }
        else if (c === "\n" || c === "\r") {
          if (c === "\r" && n === "\n") i++;
          row.push(cur); rows.push(row); row = []; cur = "";
        } else cur += c;
      }
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    return rows.filter(function (r) { return r.join("").trim().length; });
  }

  function fromCSV(text) {
    var rows = parseCSV(text);
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.toLowerCase().trim(); });
    var iN = head.findIndex(function (h) { return h.indexOf("n") === 0 || h.indexOf("útul") >= 0 || h.indexOf("utul") >= 0; });
    var iK = head.findIndex(function (h) { return h.indexOf("kraj") >= 0; });
    var hasHeader = iN >= 0 || iK >= 0;
    if (iN < 0) iN = 0; if (iK < 0) iK = 1;
    return rows.slice(hasHeader ? 1 : 0).map(function (r) {
      return { nazev: (r[iN] || "").trim(), kraj: (r[iK] || "").trim() };
    }).filter(function (u) { return u.nazev; });
  }

  function render(list) {
    var byKraj = {};
    list.forEach(function (u) { (byKraj[u.kraj || "Ostatní"] = byKraj[u.kraj || "Ostatní"] || []).push(u); });
    var kraje = Object.keys(byKraj).sort(function (a, b) { return a.localeCompare(b, "cs"); });
    sel.innerHTML = '<option value="" disabled selected>Vyberte útulek ze seznamu…</option>';
    kraje.forEach(function (k) {
      var og = document.createElement("optgroup"); og.label = k;
      byKraj[k].sort(function (a, b) { return a.nazev.localeCompare(b.nazev, "cs"); }).forEach(function (u) {
        var o = document.createElement("option");
        o.value = u.nazev; o.dataset.kraj = u.kraj; o.textContent = u.nazev;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    var other = document.createElement("option");
    other.value = "jiny"; other.textContent = "Jiný / vlastní lokální útulek (není v seznamu)";
    sel.appendChild(other);
    sel.disabled = false;
    if (status) status.textContent = list.length ? ("Schválených útulků v nabídce: " + list.length) : "Seznam útulků zatím není k dispozici, zvolte možnost Jiný útulek.";
  }

  function load() {
    var p = UTULKY_CSV_URL
      ? fetch(UTULKY_CSV_URL, { cache: "no-store" }).then(function (r) { return r.text(); }).then(fromCSV)
      : fetch(UTULKY_FALLBACK).then(function (r) { return r.json(); });
    p.then(render).catch(function () {
      // když živý seznam selže, zkusit zálohu, pak alespoň „Jiný"
      fetch(UTULKY_FALLBACK).then(function (r) { return r.json(); }).then(render).catch(function () { render([]); });
    });
  }

  sel.addEventListener("change", function () {
    var opt = sel.options[sel.selectedIndex];
    var utulek = opt.value, kraj = opt.dataset.kraj || "";
    var src = "https://tally.so/embed/" + TALLY_FORM_ID +
      "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" +
      "&utulek=" + encodeURIComponent(utulek) + "&utulek_kraj=" + encodeURIComponent(kraj);
    wrap.innerHTML = '<div class="form-wrap"><iframe src="' + src + '" loading="lazy" width="100%" height="1900" frameborder="0" marginheight="0" marginwidth="0" title="Odevzdání Vánoční tlapkové výzvy"></iframe></div>';
    wrap.hidden = false;
    if (window.Tally && window.Tally.loadEmbeds) window.Tally.loadEmbeds();
    wrap.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  load();
})();
