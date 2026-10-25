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

Formulář #2 má podmíněná pole (volba „Jiný / vlastní lokální útulek" rozbalí název, adresu, kontakt), upload 1 až 6 souborů (fotky, PDF, ZIP, max 10 MB/soubor) a dva souhlasy (fotky dětí + GDPR). Seznam útulků v dropdownu je zatím **ukázkový**, nahradí se skutečným seznamem od klienta.

### Co je potřeba kliknout ručně v Tally (nejde přes API)

1. **Integrations → Google Sheets** u každého ze tří formulářů: propojit s tabulkou na Google účtu Tlapkám z.s. (ne na soukromém účtu). Formuláře #1 a #2 do listu ŠKOLY, #3 do listu ÚTULKY.
2. **Settings → Notifications**: e-mail, kam chodí upozornění na nové odpovědi (adresu dodá klient).
3. Až klient dodá seznam útulků: přepsat položky dropdownu ve formuláři #2 (zatím 3 ukázkové).
4. Formuláře leží ve workspace Nadine. Před ostrým provozem převést / nasdílet do účtu klienta, aby data vlastnil Tlapkám z.s.

## Jak doplnit soubory ke stažení

1. Nahrát PDF/Word do `assets/downloads/` (složku vytvořit).
2. V `ke-stazeni.html` u příslušné položky nahradit `<div class="dl pending">…<span class="btn sm">Soubor doplníme</span>` za `<div class="dl">…<a class="btn sm" href="assets/downloads/nazev.pdf" download>Stáhnout</a>`.

## Nasazení

GitHub Pages: Settings → Pages → Source „Deploy from a branch", branch `main`, folder `/ (root)`. Web poběží na `https://nadinensmark-bot.github.io/tlapky/`. Vlastní doména klienta se přidá tamtéž (Custom domain) + CNAME v DNS.

## Lokálně

Otevřít `index.html` v prohlížeči. Vložené formuláře potřebují internet.
