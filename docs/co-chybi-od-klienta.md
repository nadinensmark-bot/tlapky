# Co chybí od klienta (Tlapkám z.s.) a otevřené otázky

Stav k 25. 10. 2026, po doručení zadání v2. Bez položek označených **[BLOKUJE]** nejde web spustit.

## A) Infrastruktura a vlastnictví účtů

1. **Doména** [BLOKUJE spuštění na vlastní adrese]: mají doménu (tlapkam.cz / skolytlapkam.cz / jiná)? Kdo ji vlastní, u jakého registrátora, kdo má přístup do DNS. Do té doby jedeme na dočasné adrese (`*.vercel.app` / `*.github.io`).
2. **Webhosting**: pro statický web žádný placený hosting nepotřebujeme (Vercel / Cloudflare Pages / GitHub Pages zdarma). Musí být ale jasné, **pod čím účtem to poběží**: ideálně účet Tlapkám z.s., Nadine jako spolupracovník. Zeptat se, jestli už nějaký hosting platí (pak ho lze využít).
3. **Google účet Tlapkám z.s.** (nebo Airtable): databáze ŠKOLY / ÚTULKY musí ležet na jejich účtu, ne na účtu Nadine. Sdílený přístup pro Nadine. Totéž Google Drive pro nahrané fotky.
4. **E-mail pro notifikace**: na jakou adresu chodí upozornění na nový formulář? Má škola / útulek dostat automatické potvrzení? (V zadání není.)
5. **Make.com** účet jen pokud bude potřeba; při formulářovém nástroji s nativním napojením na Sheets ho nepotřebujeme.

## B) Obsah, bez kterého web nemá co zobrazit

6. **Soubory ke stažení** [BLOKUJE]: zadání jich jmenuje šest (plakát, dopis rodičům, šablony cedulek, pracovní list se 6 úkoly, návod na čichací kobereček, diplom). **Žádný soubor zatím nepřišel.** Potřebujeme finální PDF/Word.
7. **Seznam schválených útulků** [BLOKUJE formulář #2]: výchozí data pro select „podle krajů": název, adresa, kraj, kontakt, zvířata. Bez něj je select prázdný.
8. **Texty webu**: O projektu, Pro školy, Pro útulky, Kontakt (IČO, sídlo spolku, e-mail, telefon, případně číslo účtu). Mockup má jen placeholdery.
9. **Logo ve vektoru** (SVG / PDF / AI): hlavní i varianty. Zatím jen JPG/PNG, na webu bude rozmazané.
10. **Loga partnerů** (klient slíbil do 14 dnů) + odkazy na jejich weby + pořadí.
11. **Fotky** (reálné, z útulků / škol), pokud nechtějí jen ilustrace a render.

## C) Právní a GDPR (kritické, jde o děti)

12. **Fotky dětí ve formuláři #2** [BLOKUJE #2]: učitelé nahrávají fotky ze splněných úkolů se třídou, tj. fotky nezletilých. Kdo řeší souhlas rodičů? Doporučení: do To-Do listu / dopisu rodičům přidat souhlas s fotodokumentací, nebo instrukci „fotky bez obličejů dětí". Web musí u uploadu mít checkbox „potvrzuji, že mám souhlas zákonných zástupců".
13. **Text GDPR souhlasu** u všech tří formulářů + stránka Zásady ochrany osobních údajů: správce (Tlapkám z.s., IČO, kontakt), účel, doba uložení, kdo má přístup. Buď dodá klient, nebo schválí náš návrh.
14. **Kde se ukládají fotky a jak dlouho**: Google Sheets soubory neukládá. Varianty: Google Drive (přes formulářový nástroj) nebo Airtable přílohy (free tier má limit). Klient musí schválit úložiště, protože je to jeho odpovědnost.

## D) Rozsah a termíny (nejasnosti v zadání)

15. **Je „Školy Tlapkám" celý web, nebo sekce?** Zadání v2 vůbec nezmiňuje mapu, automatické maily, PET Box, Merch ani galerii ze zadání v1. Potřebujeme potvrdit, že platí v2 a v1 je pryč (nebo odloženo). Jinak stavíme dvě různé věci.
16. **Termín spuštění** [BLOKUJE plánování]: jde o **Vánoční sbírku** a dnes je 25. 10. Klient se ptá na náš odhad, ale neřekl deadline. Realisticky musí být web živý nejpozději v polovině listopadu, aby školy stihly sbírku. Potřebujeme jejich datum.
17. **„Databáze" v hlavním menu mockupu**: veřejná, nebo jen admin? Zadání říká „data skrytá veřejnosti". Ujasnit, jestli má být veřejný seznam / mapa zapojených škol a útulků (marketingově dává smysl), nebo nic.
18. **Admin rozhraní z mockupu** (Databáze škol / útulků s filtry, stavy, CSV): to je přesně to, co dává Airtable / Google Sheets zadarmo. **Nestavíme custom admin.** Potvrdit, že jim stačí Sheets / Airtable.
19. **Správa po spuštění**: kdo bude přidávat nové soubory ke stažení, nové útulky do selectu, mazat data, hlídat GDPR lhůty. Zdarma to nikdo dělat napořád nebude.
20. **Limity uploadu**: max 6 fotek nebo 1 PDF/ZIP; jaká max. velikost? (Free tier formulářových nástrojů mívá ~10 MB / soubor.) Učitelé budou posílat fotky z mobilu, 6 × 5 MB je realita.
21. **Jazyk**: pouze čeština? (Předpokládáme ano.)

## Doporučený stack a odhad

**Stack (rozpočet 0):** statický web (Vercel / Cloudflare Pages) + formulářový nástroj s uploadem, podmíněnou logikou a napojením na Google Sheets (Tally, free tier) + Google Sheets / Drive na účtu klienta. Žádný backend, žádný custom admin.

**Hrubý odhad práce** (při dodaných podkladech z bodů 6 až 9 a 12 až 14):
- Web + download centrum + 3 formuláře napojené na Sheets + GDPR: řádově **1 až 2 týdny čisté práce**, při práci po večerech reálně 2 až 3 týdny kalendářně.
- Největší riziko není stavba, ale **dodání obsahu klientem** (soubory, seznam útulků, texty, GDPR). To je mimo naši kontrolu.
- Partnerská loga za 14 dnů se do tohoto rámce vejdou.

**Co se dá dělat hned, bez podkladů:** struktura webu, design, formuláře s testovacími daty, napojení na testovací Sheet.
