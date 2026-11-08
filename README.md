# Gebauer Real Estate – Website

Private Property & Real Estate · Ronny Gebauer · Paradeplatz 5, 8001 Zürich
Partner: R&P Business Partners, Kyiv

## Inhalt
- `index.html` – komplette Website (DE/EN, Filter, Lead-Pop-up, Über uns, Impressum)
- `images/` – Objektbilder, benannt nach Objekt-Referenz (z. B. `LU-01.jpg`)
- `logo.png`, `mark.png`, `favicon.png` – Gebauer-Logo (freigestellt)
- `rp-partners.png` – Logo R&P Business Partners
- `ronny-luzern.jpg`, `ronny-face-luzern.jpg` – Portrait Ronny Gebauer
- `tools/build_bundle.py` – erzeugt `dist/gebauer-real-estate.html` (eine Datei, alle Bilder eingebettet, offline lauffähig)

## Objekte bearbeiten
Alle Objekte stehen in `index.html` im Array `const P=[...]` (Titel/Beschreibung DE/EN, Preis, Fläche, Zimmer, Tags `featured` / `new` / `reduced` / `offmarket`).
Bild: Datei `images/<REF>.jpg` ablegen – wird automatisch verwendet.

## Leads
Das Pop-up-Formular ist für **Netlify Forms** vorbereitet (`form name="lead"`). Nach dem Deploy auf Netlify erscheinen die Leads unter *Forms* im Netlify-Dashboard.

## Deploy (Netlify)
Repository mit Netlify verbinden → Build command leer, Publish directory `/`.
