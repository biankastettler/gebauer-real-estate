"""Baut die mehrsprachige, SEO-optimierte Website aus src/index.html.

Hauptdomain: gebauer-property.com (alle Sprachen). gebauer-property.ch leitet per 301 weiter (siehe .htaccess).
Ausgabe (im Repo-Root, direkt von Netlify / GitHub Pages ausgeliefert):
  /index.html      Deutsch   -> https://gebauer-property.com/      (Standard, gebauer-property.ch landet hier)
  /en/index.html   English   -> https://gebauer-property.com/en/
  /fr/index.html   Français  -> https://gebauer-property.com/fr/
  /it/index.html   Italiano  -> https://gebauer-property.com/it/
  /sitemap.xml, /robots.txt
Aufruf: python3 tools/build_site.py
"""
import json, os, re, subprocess, html as H
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = open(os.path.join(ROOT, 'src', 'index.html'), encoding='utf-8').read()

DOMAIN = 'https://gebauer-property.com'
URLS = {
    'de': DOMAIN + '/',
    'en': DOMAIN + '/en/',
    'fr': DOMAIN + '/fr/',
    'it': DOMAIN + '/it/',
}
X_DEFAULT = URLS['de']
OUT = {'de': 'index.html', 'en': 'en/index.html', 'fr': 'fr/index.html', 'it': 'it/index.html'}
LOCALE = {'de': 'de_CH', 'en': 'en_GB', 'fr': 'fr_CH', 'it': 'it_CH'}

META = {
    'de': ('Gebauer Property – Luxusimmobilien in Europa | Ronny Gebauer, Zürich',
           'Ausgewählte Villen, Penthouses und Anlageobjekte in Zürich, Luzern, Tessin, Ibiza, München, Berlin, Budapest und mehr – persönlich betreut von Ronny Gebauer. Off-Market-Zugang auf Anfrage.'),
    'en': ('Gebauer Property – Luxury Property in Europe | Ronny Gebauer, Zurich',
           'Selected villas, penthouses and investment properties in Zurich, Lucerne, Ticino, Ibiza, Munich, Berlin, Budapest and more – personally represented by Ronny Gebauer. Off-market access on request.'),
    'fr': ('Gebauer Property – Immobilier de prestige en Europe | Ronny Gebauer, Zurich',
           'Villas, penthouses et biens de placement sélectionnés à Zurich, Lucerne, au Tessin, à Ibiza, Munich, Berlin, Budapest et plus – accompagnés personnellement par Ronny Gebauer. Accès off-market sur demande.'),
    'it': ('Gebauer Property – Immobili di prestigio in Europa | Ronny Gebauer, Zurigo',
           'Ville, attici e immobili da investimento selezionati a Zurigo, Lucerna, in Ticino, a Ibiza, Monaco, Berlino, Budapest e altro – seguiti personalmente da Ronny Gebauer. Accesso off-market su richiesta.'),
}


def load_i18n():
    js = re.findall(r'<script>(.*?)</script>', SRC, re.S)[0]
    i = js.index('const I18N='); j = js.index('let LANG=')
    code = js[i:j] + ';process.stdout.write(JSON.stringify(I18N))'
    return json.loads(subprocess.check_output(['node', '-e', code]).decode())


def prefill(doc, I, li):
    """Schreibt die Übersetzungen bereits ins statische HTML (für Google & ohne JS)."""
    def rep(m):
        key = m.group(3)
        val = I.get(key)
        if not val:
            return m.group(0)
        return m.group(1) + (val[li] or val[1]) + m.group(5)
    pat = re.compile(r'(<(\w+)\b[^>]*\bdata-i18n="([\w-]+)"[^>]*>)(.*?)(</\2>)', re.S)
    doc = pat.sub(rep, doc)
    doc = re.sub(r'(data-i18n-ph="([\w-]+)"[^>]*?placeholder=")[^"]*(")',
                 lambda m: m.group(1) + H.escape(I[m.group(2)][li], quote=True) + m.group(3), doc)
    return doc


def head_block(lang):
    title, desc = META[lang]
    canon = URLS[lang]
    alts = '\n'.join(f'<link rel="alternate" hreflang="{l}" href="{u}">' for l, u in URLS.items())
    alts += f'\n<link rel="alternate" hreflang="x-default" href="{X_DEFAULT}">'
    host = canon.split('/')[2]
    og_img = f'https://{host}/images/TI-01.jpg'
    ld = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Gebauer Property",
        "url": canon,
        "logo": f"https://{host}/logo.png?v=3",
        "image": og_img,
        "telephone": "+41 79 359 36 89",
        "email": "info@gebauer-property.com",
        "address": {"@type": "PostalAddress", "streetAddress": "Paradeplatz 5", "postalCode": "8001",
                    "addressLocality": "Zürich", "addressCountry": "CH"},
        "founder": {"@type": "Person", "name": "Ronny Gebauer"},
        "employee": {"@type": "Person", "name": "Ronny Gebauer", "jobTitle": "Founder & Principal",
                     "image": f"https://{host}/ronny-luzern.jpg"},
        "areaServed": ["Zürich", "Luzern", "Tessin", "Ibiza", "München", "Frankfurt", "Berlin", "Dresden",
                       "Bratislava", "Warschau", "Budapest", "Kyiv"],
        "knowsLanguage": ["de", "en", "fr", "it"],
        "sameAs": ["https://gebauer-property.ch/"],
    }
    langs_js = json.dumps(URLS)
    return f'''<title>{H.escape(title)}</title>
<meta name="description" content="{H.escape(desc, quote=True)}">
<link rel="canonical" href="{canon}">
{alts}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gebauer Property">
<meta property="og:title" content="{H.escape(title, quote=True)}">
<meta property="og:description" content="{H.escape(desc, quote=True)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{og_img}">
<meta property="og:locale" content="{LOCALE[lang]}">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index,follow,max-image-preview:large">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<script>window.PAGE_LANG="{lang}";window.LANG_URLS={langs_js};window.BASE="{'' if lang == 'de' else '../'}";</script>'''


ASSET_RE = re.compile(r'((?:src|href)=")(?!https?:|data:|#|mailto:|tel:|/|\.\./|\$\{)([^"]+\.(?:png|jpe?g|ico|webmanifest|webp|svg)(?:\?[^"]*)?)"')


def build(lang, I):
    li = ['de', 'en', 'fr', 'it'].index(lang)
    doc = SRC
    doc = doc.replace('<html lang="de">', f'<html lang="{lang}">', 1)
    doc = re.sub(r'<title>.*?</title>', head_block(lang), doc, count=1, flags=re.S)
    doc = doc.replace('<meta name="robots" content="noindex"><!-- Vorlage: nicht indexieren, wird beim Build entfernt -->\n', '')
    doc = prefill(doc, I, li)
    # Sprachumschalter: aktive Sprache markieren
    doc = doc.replace('<button data-lang="de" class="on">DE</button>', '<button data-lang="de">DE</button>')
    doc = doc.replace(f'<button data-lang="{lang}">', f'<button data-lang="{lang}" class="on">', 1)
    if lang != 'de':
        doc = ASSET_RE.sub(lambda m: m.group(1) + '../' + m.group(2) + '"', doc)
    path = os.path.join(ROOT, OUT[lang])
    os.makedirs(os.path.dirname(path) or ROOT, exist_ok=True)
    open(path, 'w', encoding='utf-8').write(doc)
    print('built', OUT[lang], len(doc))


def sitemap():
    today = date.today().isoformat()
    alts = ''.join(f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{u}"/>' for l, u in URLS.items())
    alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{X_DEFAULT}"/>'
    items = ''.join(f'''
  <url>
    <loc>{u}</loc>
    <lastmod>{today}</lastmod>{alts}
  </url>''' for u in URLS.values())
    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">{items}
</urlset>
'''
    open(os.path.join(ROOT, 'sitemap.xml'), 'w').write(xml)
    open(os.path.join(ROOT, 'robots.txt'), 'w').write(
        'User-agent: *\nAllow: /\n\nSitemap: https://gebauer-property.com/sitemap.xml\n')
    print('built sitemap.xml, robots.txt')


if __name__ == '__main__':
    I = load_i18n()
    for l in ['de', 'en', 'fr', 'it']:
        build(l, I)
    sitemap()
