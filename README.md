# Gebauer Property – Website

Private Property & Real Estate · Ronny Gebauer · Paradeplatz 5, 8001 Zürich · +41 79 359 36 89
Partner: R&P Business Partners, Kyiv

## Domains & Sprachen
| URL | Sprache |
|---|---|
| https://gebauer-property.com/ | Deutsch (Standard, x-default) |
| https://gebauer-property.com/en/ | English |
| https://gebauer-property.com/fr/ | Français |
| https://gebauer-property.com/it/ | Italiano |
| https://gebauer-property.ch/ | → 301 auf / (Deutsch; /fr/, /it/ werden weitergeleitet) |
| https://gebauer-realestate.com/ | (optional) → 301 auf .com |

Jede Sprachversion hat `canonical`, `hreflang`-Verweise, eigene Meta-Description, Open Graph und Schema.org (RealEstateAgent).
`sitemap.xml` und `robots.txt` liegen im Root.

## Aufbau
- `src/index.html` – **Vorlage** (hier bearbeiten: Texte in `I18N`, Objekte in `const P=[...]`)
- `tools/build_site.py` – erzeugt `index.html` (DE), `en/`, `fr/`, `it/`, `sitemap.xml`, `robots.txt`
- `tools/build_bundle.py` – erzeugt `dist/gebauer-real-estate.html` (eine Offline-Datei mit allen Bildern)
- `images/` – Objektbilder, benannt nach Referenz (z. B. `LU-01.jpg`)
- `.htaccess` – Weiterleitungen (.ch → .com/, /de/ → /, www → ohne www, https), Sperre interner Ordner
- `contact.php` – empfängt Pop-up/Kontakt-Anfragen → `leads/leads.csv` (+ E-Mail, wenn `LEAD_TO` gesetzt)

Nach jeder Änderung an `src/index.html`:
```
python3 tools/build_site.py
python3 tools/build_bundle.py
```

## Leads
Pop-up und Kontaktformular senden an `contact.php`. Jede Anfrage landet in `leads/leads.csv` (öffentlich gesperrt, im Hostinger-Dateimanager herunterladbar).
E-Mail-Benachrichtigung: in `contact.php` bei `LEAD_TO` die Empfängeradresse eintragen.

## Hosting (Hostinger)
- hPanel → Website `gebauer-property.com` → *Erweitert → GIT*: Repository `https://github.com/biankastettler/gebauer-real-estate.git`, Branch `main`, Verzeichnis leer (= public_html). *Auto-Deployment* aktivieren und die Webhook-URL in GitHub (Settings → Webhooks) eintragen → jeder Push geht automatisch live.
- `gebauer-property.ch` als *Parked Domain / Alias* auf dieselbe Website legen – die `.htaccess` leitet auf `/` (Deutsch) weiter.
- SSL in hPanel für beide Domains aktivieren.
