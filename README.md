# Školy Tlapkám: web

Web pro projekt **Školy Tlapkám** (Tlapkám z.s.): propojení škol a útulků, Vánoční sbírka a Vánoční tlapková výzva.

Stav: **pracovní verze podle zadání v2 (25. 10. 2026)**. Struktura, design a všechny tři formuláře fungují. Chybí obsah od klienta (soubory ke stažení, seznam útulků, texty, kontakty, vektorové logo), viz `docs/co-chybi-od-klienta.md`.

Klient: Kristýna, Tlapkám z.s. Realizace: Nadine Sokolová.

## Stack (rozpočet 0)

| Vrstva | Řešení | Poznámka |
|---|---|---|
| Web | Statické HTML + CSS, bez buildu | Hosting GitHub Pages / Vercel / Cloudflare Pages zdarma |
| Formuláře | [Tally](https://tally.so) (free), vložené do stránek | Upload souborů do 10 MB, podmíněná pole, GDPR, EU |
| Databáze | Google Sheets (nebo Airtable) napojené na Tally | Dvě tabulky: ŠKOLY a ÚTULKY; export do CSV/Excel nativně |
| Fotky z formuláře #2 | Uložené v Tally u odpovědi, odkaz se propíše do Sheets | Případně Google Drive přes integraci |
| Admin | Žádný vlastní | Google Sheets / Airtable dělá přesně to, co mockup „Databáze škol / útulků" |

## Struktura webu

| Stránka | Obsah |
|---|---|
| `index.html` | O projektu: hero, 3 karty (Pro školy / Pro útulky / Ke stažení), Jak to funguje, dvě aktivity, partneři |
| `pro-skoly.html` | Vánoční sbírka a Tlapková výzva pro školy, odkazy na formuláře a podklady |
| `pro-utulky.html` | Registrace útulku (vložený formulář #3) |
| `ke-stazeni.html` | Download centrum: 2 sekce × 3 soubory (zatím bez souborů, viz níže) |
| `formular-sbirka.html` | Formulář #1: Přihlášení do Vánoční sbírky |
| `formular-vyzva.html` | Formulář #2: Máme hotovo! (výběr útulku, upload fotek) |
| `kontakt.html` | O nás & Kontakt (kontaktní údaje doplní klient) |
| `assets/style.css` | Společný design systém (navy + krémová, Poppins + Inter) |
| `assets/` | Brand assety od klienta (loga, render PET Boxu) |
| `docs/` | Zadání v1 a v2, checklist podkladů, mockupy, archiv prototypu v1 |

## Formuláře (Tally)

| # | Formulář | ID | Odkaz |
|---|---|---|---|
| 1 | Přihlášení do Vánoční sbírky | `rDDydN` | https://tally.so/r/rDDydN |
| 2 | Máme hotovo! Odevzdání Tlapkové výzvy | `q55ZEG` | https://tally.so/r/q55ZEG |
| 3 | Registrace útulku | `KppQB8` | https://tally.so/r/KppQB8 |

Formulář #2 má upload 1 až 6 souborů (fotky, PDF, ZIP, max 10 MB/soubor), dva souhlasy (fotky dětí + GDPR) a **výběr útulku řešený na webu** (viz níže). Útulek přichází do formuláře jako skrytá pole `utulek` a `utulek_kraj`; při hodnotě `jiny` (nebo prázdné) se rozbalí pole pro ruční zadání útulku.

### Seznam útulků: automaticky z registrací, bez ručního přepisování

Tally dropdown se neumí sám plnit, proto výběr útulku dělá stránka `formular-vyzva.html` (`assets/utulky.js`). Tok:

1. Útulek se zaregistruje formulářem #3 → Tally ho zapíše do Google tabulky, list **ÚTULKY**.
2. V listu ÚTULKY je sloupec **Schváleno** (zaškrtávací políčko). Kristýna ho u ověřeného útulku zaškrtne. To je jediný ruční krok a zadání ho chce („schválené útulky").
3. Druhý list **verejny_seznam** obsahuje jen název a kraj schválených útulků, vzorec v buňce A1:
   `=FILTER({ÚTULKY!B:B; ÚTULKY!F:F}; ÚTULKY!M:M=TRUE)` (písmena sloupců upravit podle skutečné tabulky: název, kraj, Schváleno).
4. Soubor → Sdílet → **Publikovat na web** → vybrat list `verejny_seznam` → formát **CSV** → zkopírovat URL.
5. URL vložit do `assets/utulky.js` do `UTULKY_CSV_URL`. Hotovo: web načítá seznam živě při každém otevření stránky. Veřejně je vidět jen název a kraj, kontakty a kapacity zůstávají v soukromé tabulce.

Dokud URL není vyplněná, načítá se záložní `assets/utulky.json` s ukázkovými daty.

### Co je potřeba kliknout ručně v Tally (nejde přes API)

1. **Integrations → Google Sheets** u každého ze tří formulářů: propojit s tabulkou na Google účtu Tlapkám z.s. (ne na soukromém účtu). Formuláře #1 a #2 do listu ŠKOLY, #3 do listu ÚTULKY.
2. **Settings → Notifications**: e-mail, kam chodí upozornění na nové odpovědi (adresu dodá klient).
3. Formuláře leží ve workspace Nadine. Před ostrým provozem převést / nasdílet do účtu klienta, aby data vlastnil Tlapkám z.s.

## Jak doplnit soubory ke stažení

1. Nahrát PDF/Word do `assets/downloads/` (složku vytvořit).
2. V `ke-stazeni.html` u příslušné položky nahradit `<div class="dl pending">…<span class="btn sm">Soubor doplníme</span>` za `<div class="dl">…<a class="btn sm" href="assets/downloads/nazev.pdf" download>Stáhnout</a>`.

## Nasazení

GitHub Pages: Settings → Pages → Source „Deploy from a branch", branch `main`, folder `/ (root)`. Web poběží na `https://nadinensmark-bot.github.io/tlapky/`. Vlastní doména klienta se přidá tamtéž (Custom domain) + CNAME v DNS.

## Lokálně

Otevřít `index.html` v prohlížeči. Vložené formuláře potřebují internet.
