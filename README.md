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

Formulář #2 má upload 1 až 6 souborů (fotky, PDF, ZIP, max 10 MB/soubor) a dva souhlasy (fotky dětí + GDPR). **Útulek se ve výzvě nevybírá** (upřesnění klienta 25. 10.: příjemce pomoci z výzvy vybírá Tlapkám z.s. interně). Útulek si škola volí jen ve formuláři #1 (sbírka), kde ho zadává textem.

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
## Obsah od klienta (stav 30. 10. 2026)

Zapracováno: kontakty spolku (Tlapkám z. s., IČO 30204941, Svobodova 205/16, 362 25 Nová Role, info@tlapkam.cz), O nás „Příběh, který začal u katedry", hero „Školy pomáhají útulkům" s fotkou sbírky, Pro školy (A: sbírka do 15. 1. + soutěž o 5 000 Kč, B: výzva do 16. 12.), Pro útulky, nová stránka PetBoxy (připravujeme), diplom zrušen.

Formuláře: #1 sbírka = škola, adresa, učitel, kontakt, vybraný útulek, upload až 3 fotek + souhlas se zveřejněním. #2 výzva = škola, kontakt, upload až 6 souborů + souhlas se zveřejněním. #3 útulky = doplněn bankovní účet (nepovinné) a druh přijímané pomoci.

Fotky z formulářů: Tally je ukládá u odpovědi a při napojení na Google Sheets zapíše do sloupce klikatelný odkaz na soubor. Žádné vlastní úložiště není potřeba.

Stále chybí: soubory ke stažení (4 položky, slíbeno do 8. 11.), loga partnerů (do 8. 11.), funkční odkazy na Google tabulky (v podkladech přišly zkrácené), logo ve vektoru, doména.

## Změny 3. 11. 2026

- Ke stažení jen 2 PDF: `assets/downloads/skoly-tlapkam-vanocni-sbirka.pdf` (balíček ke sbírce) a `assets/downloads/skoly-tlapkam-to-do-list.pdf`.
- Výzva přejmenována na **Učíme se pro útulky**, 4 adventní úkoly (místo 6), nový náhled To-Do listu.
- Formulář #2 (Tally `q55ZEG`): nahrává se **jen 1 soubor** (fotka nebo PDF vyplněného To-Do listu), publikováno.
- Partner DogMama (`assets/partneri/dogmama.png`) na úvodu a u výzvy. Instagram @skolytlapkam v patičce, kontaktu a galerii.
- Úvod: sekce **Fotografie ze sbírek** (`#fotky`). Fotky přidávat do `assets/galerie/` a do `index.html` místo placeholderů.

## Merch e-shop (6. 11. 2026)

- `merch.html`: 6 produktů z podkladů 4. 11. (dámské / pánské tričko s výšivkou, partnerský set, čepice, 2× oversize s potiskem), fotky v `assets/merch/`, tabulky velikostí Hadrkerka (dámské XS–2XL, pánské S–3XL, oversize set XS–3XL).
- Košík: `assets/merch.js` (jen v prohlížeči). Tlačítko vede na `merch-objednavka.html`, která vloží Tally formulář `dbN2bA` a předá počty kusů + popis položek jako hidden fields.
- Tally `dbN2bA` počítá cenu sám (690 / 690 / 1490 / 590 / 690 / 690 Kč) a platbu bere kartou přes Stripe. **Ceny jsou na dvou místech: `merch.js` a výpočet v Tally.**
- Spuštění: v Tally připojit Stripe účet spolku k platebnímu bloku, publikovat formulář, v `merch.js` přepnout `OBJEDNAVKY_SPUSTENY = true`.
- Chybí: obchodní podmínky + reklamační řád (formulář na ně odkazuje), cena a způsob dopravy, tabulka velikostí oversize s potiskem, termín dodání předprodeje.

## Obchod: převod + QR (6. 11. 2026, večer)

- Platba kartou (Stripe) odložena. Formulář `dbN2bA` už platbu neobsahuje, po odeslání přesměruje na `merch-platba.html?vs=…&castka=…`.
- `assets/obchod-config.js`: `OBJEDNAVKY_SPUSTENY` (zapíná tlačítko Objednat) a `UCET` (číslo účtu spolku). Bez účtu stránka ukáže „pošleme e-mailem“.
- Variabilní symbol = číslo objednávky (10 číslic), vzniká v košíku a ukládá se v Tally jako hidden field `vs`. Bez VS formulář nejde odeslat.
- QR Platba (SPD) se generuje v prohlížeči (`assets/qrcode.js`, MIT, Kazuhiko Arase).
- Doprava: jen osobní převzetí. Volba „Zaslat na adresu“ je v Tally skrytá, odkrýt po doplnění ceny.
- `obchodni-podminky.html`: NÁVRH s místy [DOPLNIT], před spuštěním odsouhlasit spolkem.
- Hosting: WEDOS webhosting tlapkam.cz, soubory v `/www` (nahrávání přes WebFTP, zip se rozbalí).
