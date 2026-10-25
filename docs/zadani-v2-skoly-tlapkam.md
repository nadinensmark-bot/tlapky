# Zadání v2: web Školy Tlapkám (platné)

Zdroj: e-mail od Kristýny (Tlapkám z.s. / Školy Tlapkám), 25. 10. 2026. Originál v `zadani-v2-email-kristyna.txt`, vizuál v `mockupy/v2-skoly-tlapkam.png`.

## Logika projektu

Zjednodušeno tak, aby bylo pro učitele co nejméně administrativně náročné: podklady a To-Do listy si vyučující **stáhnou volně bez registrace**, formulář vyplní až po splnění úkolů se třídou. V jednom kroku zadají údaje, vyberou útulek a nahrají fotky.

## 1. Ke stažení (download centrum, bez registrace)

**Sekce Vánoční sbírka**
- Plakát na školní nástěnku (PDF k tisku)
- Informační dopis pro rodiče (Word / PDF)
- Šablony a cedulky na sběrné krabice

**Sekce Vánoční tlapková výzva (Učíme se pro útulky)**
- Pracovní list / To-Do list s 6 edukačními úkoly (PDF k tisku)
- Návod na výrobu čichacího koberečku pro psy
- Diplom / Certifikát pro zapojenou třídu

## 2. Formuláře (3 hlavní)

### Formulář #1: Přihlášení do Vánoční sbírky
Účel: škola se hlásí do fyzické sbírky krmiva a potřeb.

Pole: název školy · adresa školy (ulice, město, PSČ) · kontaktní osoba (jméno a příjmení) · e-mail · telefon · název vybraného útulku · adresa vybraného útulku · kontaktní osoba v útulku (jméno, e-mail, telefon).

### Formulář #2: Odevzdání Vánoční tlapkové výzvy („Máme hotovo!")
Účel: učitel splnil To-Do list se třídou, v jednom kroku vyplní údaje, vybere útulek a nahraje fotky.

Pole: název školy · adresa školy · kontaktní osoba (učitel/ka) · e-mail · telefon.

**Výběr obdarovaného útulku:**
- Select z databáze schválených útulků (seřazeno dle krajů).
- Položka „Jiný / Vlastní lokální útulek" → rozbalí doplňující pole: název, adresa, kontaktní osoba, telefon / e-mail.

**Nahrání podkladů:** hromadné nahrání až 6 fotek nebo 1 souboru (PDF / ZIP) se splněným To-Do listem a fotodokumentací.

Vzkaz od dětí / poznámka pro útulek.

### Formulář #3: Registrace pro útulky (žádost o materiální pomoc)
Účel: registrace útulků, azylů a depozit do databáze a příjem pomoci od škol.

Pole: název útulku / spolku / azylu · IČO (je-li) · adresa (pro doručení / předání) · kontaktní osoba (jméno, příjmení, pozice) · e-mail · telefon · o jaká zvířata se primárně starají (psi / kočky / jiná) · aktuální kapacita / počet zvířat · krátká poznámka (co akutně chybí).

## 3. Interní databáze (privátní)

Všechna data z formulářů musí zůstat veřejnosti skrytá a automaticky se ukládat do soukromé databáze přístupné jen klientovi.

**Požadovaná integrace:** automatické odesílání dat do Google Sheets nebo Airtable (přes Make.com / webhook / plugin formuláře), případně databáze redakčního systému s exportem do CSV / Excel.

**Struktura:**
- **ŠKOLY:** seznam škol, kontakty, typ akce (sbírka vs. výzva), přiřazený útulek, odkazy na nahrané fotky.
- **ÚTULKY:** registrované útulky, kapacity, kontakty, stav doručení pomoci.

## Ostatní

- Loga partnerů: klient doplní do 14 dnů.
- Klient se ptá, zda je zadání srozumitelné a jaký je **časový odhad realizace**.

## Co v2 oproti v1 neobsahuje (nutno potvrdit, že je to záměr)

Interaktivní mapa, našeptávač adres přes API, automatický e-mail s PDF po registraci, PET Box, Merch, fotogalerie, CMS pro úpravu textů.
