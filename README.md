# TLAPKÁM / Školy Tlapkám: web

Web pro projekt **TLAPKÁM** (Tlapkám z.s.): udržitelná pomoc zvířatům v nouzi, propojení škol, veřejnosti, B2B partnerů a útulků.

Stav: **prototyp Fáze 1** (statický frontend bez backendu). Klient: Kristýna, Tlapkám z.s. Realizace: Nadine Sokolová.

## Co tu je

| Cesta | Obsah |
|---|---|
| `index.html` | Klikací prototyp podle zadání v1 (homepage, modul Školy s mapou a formulářem, PET Box, Merch, galerie, kontakt). Čistý HTML/CSS/JS, žádné závislosti kromě Google Fonts. |
| `assets/` | Brand assety od klienta (hlavní logo, loga modulů, render PET Boxu). Pouze rastry, vektor zatím nedodán. |
| `docs/zadani-v1-tlapkam.md` | Původní zadání (celý web TLAPKÁM: mapa, automatizace, PET Box, Merch). |
| `docs/zadani-v2-skoly-tlapkam.md` | Nové zadání z 25. 10. 2026 (pouze Školy Tlapkám: download centrum, 3 formuláře, soukromá databáze). **Aktuálně platné.** |
| `docs/zadani-v2-email-kristyna.txt` | Původní e-mail od klientky (zdroj zadání v2). |
| `docs/co-chybi-od-klienta.md` | Checklist podkladů, které musí dodat klient, otevřené otázky a doporučený stack. |
| `docs/mockupy/` | Vizuály od klienta (v1 i v2). |

## Důležité: zadání se změnilo

Zadání v2 (25. 10.) je **užší a technicky jednodušší** než v1: žádná automatická mapa, žádné automatické maily s PDF, žádný našeptávač adres, žádný PET Box ani Merch. Místo toho: volně stažitelné podklady, 3 formuláře (přihláška do sbírky, odevzdání výzvy s nahráním fotek, registrace útulku) a soukromá databáze v Google Sheets / Airtable.

Prototyp v `index.html` odpovídá v1 a bude potřeba ho přestavět podle v2. Zatím slouží jako vizuální reference (barvy, typografie, layout).

## Doporučený stack (rozpočet 0)

- **Web:** statický (HTML/CSS/JS nebo Astro), hosting Vercel / Cloudflare Pages / GitHub Pages zdarma.
- **Formuláře:** formulářový nástroj s nahráváním souborů, podmíněnou logikou a nativním napojením na Google Sheets (např. Tally, free tier). Embed do webu. Žádný vlastní backend.
- **Databáze:** Google Sheets (nebo Airtable) na účtu Tlapkám z.s., dvě záložky: ŠKOLY a ÚTULKY. Export do CSV je nativní.
- **Fotky z formuláře #2:** Google Drive (přes formulářový nástroj) nebo přílohy v Airtable.
- **Admin:** žádný custom admin. Mockup „Databáze škol / útulků" je přesně to, co dává Airtable / Sheets zadarmo.

## Lokální spuštění

Otevřít `index.html` v prohlížeči. Nic se nebuildí.

## Nasazení

Zatím nenasazeno. Plán: připojit repo na Vercel (nebo zapnout GitHub Pages), později přesměrovat doménu klienta.
