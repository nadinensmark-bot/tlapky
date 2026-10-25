# Zadání v1: web TLAPKÁM (celý projekt)

Zdroj: zip od klienta (11 obrázků zadání + loga), říjen 2026. **Nahrazeno zadáním v2 z 25. 10. 2026**, ponecháno pro kontext a pro budoucí moduly (PET Box, Merch, mapa).

## 1. Vizuální styl a identita

- Design: minimalistický, čistý, moderní, městský / skandinávský styl. Bez kýče a přezdobených ilustrací.
- Barevnost: tmavě modrá (hlavní kontrastní barva pro texty, tlačítka, ikonky). Světlounce žlutá / jemná béžová až do bíla jako teplý podklad webu místo sterilní bílé.
- Logo: hlavní logo s motivem rodiny / komunity (dodáno jako JPG/PNG, viz `assets/`).

## 2. Navigace (sitemap)

Úvod · Školy TLAPKÁM (aktivní modul) · PET Box TLAPKÁM („PŘIPRAVUJEME") · Merch TLAPKÁM („PŘIPRAVUJEME") · O nás & Kontakt

## 3. Funkční požadavky

### A) Homepage
- Hero: úderné vysvětlení myšlenky, moderní vizuál, CTA na zapojení školy do sbírky.
- Stručný přehled „Jak projekt funguje": Školy & sběr → Podpora útulků → B2B / PET Boxy do budoucna.

### B) Modul Školy TLAPKÁM (registrace + mapa + automatizace)
1. **Registrační formulář:** název zařízení, typ (MŠ / ZŠ / SŠ / Gymnázium / VŠ / Dětský domov), kontaktní osoba (jméno, e-mail, telefon), výběr útulku přes našeptávač (Google Places / Mapy.cz API, automatické doplnění adresy a GPS), termín / cyklus sbírky.
2. **Automatické odeslání podkladů:** po odeslání okamžitý e-mail kontaktní osobě s PDF podklady a uvítacím textem; notifikace adminovi.
3. **Interaktivní mapa ČR:** dva typy špendlíků (školy / útulky), filtrování, automatické propsání nové registrace po schválení, karta po rozkliknutí (název, město, komu pomáhají / kdo jim pomáhá).

### C) Modul PET Box TLAPKÁM
Představení sběrných boxů v nákupních centrech, štítek „PŘIPRAVUJEME", kontaktní formulář pro B2B partnery.

### D) Modul Merch TLAPKÁM
Ukázka chystané kolekce (streetwear, doplňky pro venčení, printy), štítek „PŘIPRAVUJEME", sběr e-mailů na první drop.

### Fotogalerie
Samostatná sekce s filtrací podle větví projektu (školní sbírky, útulky, PET Boxy, merch), správa fotek s popisem a štítkem v administraci.

## 4. Technické požadavky

- 100% responzivita.
- Spolehlivý mailing (SMTP / nástroj) s PDF přílohami bez padání do spamu.
- CMS: úprava textů, export registrovaných škol do CSV/Excel, ruční úprava bodů v mapě.
- GDPR souhlas u formulářů.
- Připravenost na rozšíření (překlopení PET Boxů a Merche do plného provozu).
