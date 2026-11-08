"""Erzeugt eine einzelne, eigenständige HTML-Datei (alle Bilder eingebettet) für Dropbox/Offline."""
import base64, io, json, os, sys
from PIL import Image
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out=os.path.join(root,'dist','gebauer-real-estate.html')
def enc(path,maxw,q):
    im=Image.open(os.path.join(root,path)); im.thumbnail((maxw,maxw*2))
    b=io.BytesIO(); im.save(b,'WEBP',quality=q,method=6)
    return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
assets={}
for f in sorted(os.listdir(os.path.join(root,'images'))):
    assets['images/'+f]=enc('images/'+f,1100,68)
for f,w in [('logo.png',600),('mark.png',260),('rp-partners.png',700),('ronny-luzern.jpg',900),('ronny-about.jpg',900),('ronny-face-luzern.jpg',160),('favicon.png',64),('favicon-32.png',32),('favicon-16.png',16),('apple-touch-icon.png',180)]:
    assets[f]=enc(f,w,80)
html=open(os.path.join(root,'src','index.html'),encoding='utf-8').read()
html=html.replace('<script>\n','<script>window.ASSET='+json.dumps(assets)+';</script>\n<script>\n',1)
os.makedirs(os.path.dirname(out),exist_ok=True)
open(out,'w',encoding='utf-8').write(html)
print(out, round(os.path.getsize(out)/1e6,2),'MB')
