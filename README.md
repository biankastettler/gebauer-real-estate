# Gebauer Real Estate – Website

Private Property & Real Estate · Ronny Gebauer · Paradeplatz 5, 8001 Zürich · +41 79 359 36 89
Partner: R&P Business Partners, Kyiv

## Domains & Sprachen
| URL | Sprache |
|---|---|
| https://gebauer-property.com/ | English (Hauptdomain, x-default) |
| https://gebauer-property.com/de/ | Deutsch |
| https://gebauer-property.com/fr/ | Français |
| https://gebauer-property.com/it/ | Italiano |
| https://gebauer-property.ch/ | → 301 auf /de/ (auch /fr/, /it/ werden weitergeleitet) |
| https://gebauer-realestate.com/ | (optional) → 301 auf .com |

Jede Sprachversion hat `canonical`, `hreflang`-Verweise, eigene Meta-Description, Open Graph und Schema.org (RealEstateAgent).
`sitemap.xml` und `robots.txt` liegen im Root.

## Aufbau
- `src/index.html` – **Vorlage** (hier bearbeiten: Texte in `I18N`, Objekte in `const P=[...]`)
- `tools/build_site.py` – erzeugt `index.html`, `de/`, `fr/`, `it/`, `sitemap.xml`, `robots.txt`
- `tools/build_bundle.py` – erzeugt `dist/gebauer-real-estate.html` (eine Offline-Datei mit allen Bildern)
- `images/` – Objektbilder, benannt nach Referenz (z. B. `LU-01.jpg`)
- `netlify.toml` – Weiterleitungen (.ch → .com, www → ohne www)

Nach jeder Änderung an `src/index.html`:
```
python3 tools/build_site.py
python3 tools/build_bundle.py
```

## Leads
Pop-up und Kontaktformular sind für **Netlify Forms** vorbereitet (`form name="lead"`).
Nach dem Deploy erscheinen Anfragen im Netlify-Dashboard unter *Forms* (E-Mail-Benachrichtigung dort einstellbar).

## Deploy (Netlify)
1. Netlify → *Add new site* → *Import from GitHub* → `biankastettler/gebauer-real-estate` (Build command leer, Publish directory `.`)
2. *Domain management* → Primary domain `gebauer-property.com`, Domain-Aliase `gebauer-property.ch` (+ `www.`-Varianten)
3. DNS bei Hostinger: `A @ 75.2.60.5` und `CNAME www <site>.netlify.app` – für beide Domains
