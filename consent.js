/* Gebauer Property – Google Analytics 4, Cookie-Banner & Datenschutz (DE/EN/FR/IT)
   - Besucher aus der Schweiz (Zeitzone Europe/Zurich): GA4 aktiv ohne Banner (Opt-out, revDSG/FMG),
     Widerspruch jederzeit über "Cookie-Einstellungen" im Footer.
   - Alle anderen Besucher (EU usw.): GA4 erst nach Zustimmung (Opt-in, DSGVO).
   - Lead-Event "generate_lead" bei erfolgreicher Anfrage (Pop-up / Kontaktformular).
   - Fügt im Footer die Links "Datenschutz" und "Cookie-Einstellungen" ein. */
(function () {
  var GA_ID = 'G-XJEC4BGGRY';
  var KEY = 'gp_consent_v1';
  var MAX_AGE = 365 * 24 * 3600 * 1000;

  var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var SWISS = tz === 'Europe/Zurich';

  var T = {
    de: {
      txt: 'Wir verwenden Cookies von Google Analytics, um zu verstehen, wie unsere Website genutzt wird. Sie entscheiden, ob Sie dies zulassen.',
      ok: 'Akzeptieren', no: 'Ablehnen', privacy: 'Datenschutz', settings: 'Cookie-Einstellungen', close: 'Schliessen',
      chTxt: 'Wir verwenden Google Analytics, um unsere Website zu verbessern. Sie können dies jederzeit ablehnen.'
    },
    en: {
      txt: 'We use Google Analytics cookies to understand how our website is used. You decide whether to allow this.',
      ok: 'Accept', no: 'Decline', privacy: 'Privacy policy', settings: 'Cookie settings', close: 'Close',
      chTxt: 'We use Google Analytics to improve our website. You can opt out at any time.'
    },
    fr: {
      txt: 'Nous utilisons des cookies Google Analytics pour comprendre comment notre site est utilisé. Vous décidez si vous les acceptez.',
      ok: 'Accepter', no: 'Refuser', privacy: 'Confidentialité', settings: 'Paramètres des cookies', close: 'Fermer',
      chTxt: 'Nous utilisons Google Analytics pour améliorer notre site. Vous pouvez le refuser à tout moment.'
    },
    it: {
      txt: 'Utilizziamo i cookie di Google Analytics per capire come viene utilizzato il nostro sito. Sta a lei decidere se consentirli.',
      ok: 'Accetta', no: 'Rifiuta', privacy: 'Privacy', settings: 'Impostazioni cookie', close: 'Chiudi',
      chTxt: 'Utilizziamo Google Analytics per migliorare il nostro sito. Può opporsi in qualsiasi momento.'
    }
  };

  var P = {
    de: '<h2>Datenschutzerklärung</h2>'
      + '<h3>Verantwortlich</h3><p>Gebauer Property, Ronny Gebauer, Paradeplatz 5, 8001 Zürich, Schweiz · <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a> · +41 79 359 36 89</p>'
      + '<h3>Hosting und Server-Logs</h3><p>Die Website wird bei Hostinger gehostet. Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) kurzfristig in Server-Logs gespeichert, um den sicheren Betrieb zu gewährleisten.</p>'
      + '<h3>Anfragen über Formulare</h3><p>Wenn Sie uns über das Pop-up oder das Kontaktformular kontaktieren, verarbeiten wir die angegebenen Daten (z. B. Name, E-Mail, Telefon, Nachricht, Interesse) ausschliesslich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme zu passenden Immobilien. Ihre Einwilligung können Sie jederzeit widerrufen.</p>'
      + '<h3>Google Analytics</h3><p>Wir nutzen Google Analytics 4 (Google Ireland Ltd. / Google LLC, USA), um die Nutzung der Website statistisch auszuwerten. Dabei werden Cookies gesetzt und Nutzungsdaten (z. B. besuchte Seiten, Verweildauer, ungefährer Standort, Gerät) erhoben; IP-Adressen werden gekürzt. Eine Übermittlung in die USA ist möglich; Google stützt sich auf das EU-US/Swiss-US Data Privacy Framework und Standardvertragsklauseln. Besucher aus der EU/dem EWR: Google Analytics wird nur mit Ihrer Einwilligung aktiviert. Besucher aus der Schweiz: Sie können der Analyse jederzeit über die Cookie-Einstellungen widersprechen.</p>'
      + '<h3>WhatsApp</h3><p>Wenn Sie uns über WhatsApp kontaktieren, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp (Meta).</p>'
      + '<h3>Ihre Rechte</h3><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung sowie Widerspruch. Wenden Sie sich dazu an <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a>. Sie können sich zudem beim EDÖB (Schweiz) bzw. bei Ihrer zuständigen Datenschutzaufsichtsbehörde (EU) beschweren.</p>',
    en: '<h2>Privacy policy</h2>'
      + '<h3>Controller</h3><p>Gebauer Property, Ronny Gebauer, Paradeplatz 5, 8001 Zurich, Switzerland · <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a> · +41 79 359 36 89</p>'
      + '<h3>Hosting and server logs</h3><p>This website is hosted by Hostinger. When you visit it, technically necessary data (IP address, date and time, page requested, browser) is briefly stored in server logs to ensure secure operation.</p>'
      + '<h3>Enquiries via forms</h3><p>If you contact us via the pop-up or the contact form, we process the data you provide (e.g. name, email, phone, message, interest) solely to handle your enquiry and to contact you about suitable properties. You can withdraw your consent at any time.</p>'
      + '<h3>Google Analytics</h3><p>We use Google Analytics 4 (Google Ireland Ltd. / Google LLC, USA) to analyse how the website is used. Cookies are set and usage data (e.g. pages visited, time on site, approximate location, device) is collected; IP addresses are truncated. Data may be transferred to the USA; Google relies on the EU-US/Swiss-US Data Privacy Framework and standard contractual clauses. Visitors from the EU/EEA: Google Analytics is only activated with your consent. Visitors from Switzerland: you can object to the analysis at any time via the cookie settings.</p>'
      + '<h3>WhatsApp</h3><p>If you contact us via WhatsApp, the privacy policy of WhatsApp (Meta) also applies.</p>'
      + '<h3>Your rights</h3><p>You have the right to access, rectification, erasure, restriction of processing and objection. Please contact <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a>. You may also lodge a complaint with the FDPIC (Switzerland) or your competent data protection authority (EU).</p>',
    fr: '<h2>Politique de confidentialité</h2>'
      + '<h3>Responsable</h3><p>Gebauer Property, Ronny Gebauer, Paradeplatz 5, 8001 Zurich, Suisse · <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a> · +41 79 359 36 89</p>'
      + '<h3>Hébergement et journaux du serveur</h3><p>Ce site est hébergé par Hostinger. Lors de votre visite, des données techniquement nécessaires (adresse IP, date et heure, page consultée, navigateur) sont brièvement enregistrées dans les journaux du serveur afin d’en garantir le fonctionnement sécurisé.</p>'
      + '<h3>Demandes via les formulaires</h3><p>Si vous nous contactez via le pop-up ou le formulaire de contact, nous traitons les données fournies (p. ex. nom, e-mail, téléphone, message, intérêt) uniquement pour traiter votre demande et vous contacter au sujet de biens adaptés. Vous pouvez retirer votre consentement à tout moment.</p>'
      + '<h3>Google Analytics</h3><p>Nous utilisons Google Analytics 4 (Google Ireland Ltd. / Google LLC, États-Unis) pour analyser l’utilisation du site. Des cookies sont déposés et des données d’utilisation (p. ex. pages consultées, durée de visite, localisation approximative, appareil) sont collectées ; les adresses IP sont tronquées. Un transfert vers les États-Unis est possible ; Google s’appuie sur le Data Privacy Framework UE-US/Suisse-US et des clauses contractuelles types. Visiteurs de l’UE/EEE : Google Analytics n’est activé qu’avec votre consentement. Visiteurs de Suisse : vous pouvez vous opposer à l’analyse à tout moment via les paramètres des cookies.</p>'
      + '<h3>WhatsApp</h3><p>Si vous nous contactez via WhatsApp, la politique de confidentialité de WhatsApp (Meta) s’applique également.</p>'
      + '<h3>Vos droits</h3><p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation du traitement et d’opposition. Contactez-nous à <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a>. Vous pouvez également déposer une plainte auprès du PFPDT (Suisse) ou de votre autorité de protection des données compétente (UE).</p>',
    it: '<h2>Informativa sulla privacy</h2>'
      + '<h3>Titolare</h3><p>Gebauer Property, Ronny Gebauer, Paradeplatz 5, 8001 Zurigo, Svizzera · <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a> · +41 79 359 36 89</p>'
      + '<h3>Hosting e log del server</h3><p>Il sito è ospitato da Hostinger. Durante la visita, i dati tecnicamente necessari (indirizzo IP, data e ora, pagina richiesta, browser) vengono memorizzati brevemente nei log del server per garantirne il funzionamento sicuro.</p>'
      + '<h3>Richieste tramite moduli</h3><p>Se ci contatta tramite il pop-up o il modulo di contatto, trattiamo i dati forniti (ad es. nome, e-mail, telefono, messaggio, interesse) esclusivamente per gestire la sua richiesta e contattarla in merito a immobili adatti. Può revocare il consenso in qualsiasi momento.</p>'
      + '<h3>Google Analytics</h3><p>Utilizziamo Google Analytics 4 (Google Ireland Ltd. / Google LLC, USA) per analizzare l’utilizzo del sito. Vengono impostati cookie e raccolti dati di utilizzo (ad es. pagine visitate, durata della visita, posizione approssimativa, dispositivo); gli indirizzi IP vengono abbreviati. È possibile un trasferimento negli USA; Google si basa sul Data Privacy Framework UE-USA/Svizzera-USA e su clausole contrattuali standard. Visitatori dall’UE/SEE: Google Analytics viene attivato solo con il suo consenso. Visitatori dalla Svizzera: può opporsi all’analisi in qualsiasi momento tramite le impostazioni dei cookie.</p>'
      + '<h3>WhatsApp</h3><p>Se ci contatta tramite WhatsApp, si applica anche l’informativa sulla privacy di WhatsApp (Meta).</p>'
      + '<h3>I suoi diritti</h3><p>Ha il diritto di accesso, rettifica, cancellazione, limitazione del trattamento e opposizione. Scriva a <a href="mailto:info@gebauer-property.com">info@gebauer-property.com</a>. Può inoltre presentare reclamo all’IFPDT (Svizzera) o all’autorità di protezione dei dati competente (UE).</p>'
  };

  var t = T[lang] || T.en;
  var ptext = P[lang] || P.en;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  var loaded = false;

  function loadGA() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    gtag('config', GA_ID, { anonymize_ip: true });
  }
  function disableGA() {
    window['ga-disable-' + GA_ID] = true;
    try {
      document.cookie.split(';').forEach(function (c) {
        var n = c.split('=')[0].trim();
        if (n.indexOf('_ga') === 0) {
          var h = location.hostname.replace(/^www\./, '');
          document.cookie = n + '=; Max-Age=0; path=/';
          document.cookie = n + '=; Max-Age=0; path=/; domain=.' + h;
        }
      });
    } catch (e) {}
  }

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && Date.now() - v.t < MAX_AGE) return v.c;
    } catch (e) {}
    return null;
  }
  function save(c) {
    try { localStorage.setItem(KEY, JSON.stringify({ c: c, t: Date.now() })); } catch (e) {}
  }

  /* Lead-Tracking: erfolgreiche Anfragen an contact.php */
  if (window.fetch) {
    var _f = window.fetch;
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var p = _f.apply(this, arguments);
      if (url.indexOf('contact.php') !== -1) {
        p.then(function (r) {
          if (r && r.ok && loaded && !window['ga-disable-' + GA_ID]) {
            gtag('event', 'generate_lead', { form_location: document.querySelector('.modal.open') ? 'popup' : 'page', language: lang });
          }
        }).catch(function () {});
      }
      return p;
    };
  }

  var CSS = '#gp-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:560px;margin:0 auto;background:#0f1114;color:#e9e4da;border:1px solid rgba(201,169,110,.35);border-radius:10px;padding:16px 18px;font-size:14px;line-height:1.5;box-shadow:0 10px 30px rgba(0,0,0,.35)}'
    + '#gp-cookie p{margin:0 0 12px}#gp-cookie a{color:#c9a96e;cursor:pointer;text-decoration:underline}'
    + '#gp-cookie .gp-b{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}'
    + '#gp-cookie button,#gp-privacy button{cursor:pointer;border-radius:6px;padding:9px 18px;font:inherit;font-weight:600;border:1px solid #c9a96e}'
    + '#gp-cookie .gp-no{display:inline-block!important;background:transparent;color:#e9e4da}#gp-cookie .gp-ok{display:inline-block!important;background:#c9a96e;color:#0f1114}'
    + '#gp-privacy{position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px}'
    + '#gp-privacy .gp-in{background:#0f1114;color:#e9e4da;border:1px solid rgba(201,169,110,.35);border-radius:10px;max-width:760px;width:100%;max-height:85vh;overflow:auto;padding:28px;font-size:14px;line-height:1.6}'
    + '#gp-privacy h2{margin:0 0 14px;font-size:22px;color:#c9a96e}#gp-privacy h3{margin:18px 0 6px;font-size:15px;color:#c9a96e}#gp-privacy p{margin:0}#gp-privacy a{color:#c9a96e}'
    + '#gp-privacy .gp-x{display:inline-block!important;margin-top:22px;background:#c9a96e;color:#0f1114}'
    + '.gp-flinks a{cursor:pointer;margin-left:14px}';
  var cssDone = false;
  function css() {
    if (cssDone) return;
    cssDone = true;
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function privacy() {
    css();
    if (document.getElementById('gp-privacy')) return;
    var d = document.createElement('div');
    d.id = 'gp-privacy';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.innerHTML = '<div class="gp-in">' + ptext + '<button class="gp-x" type="button">' + t.close + '</button></div>';
    d.addEventListener('click', function (e) { if (e.target === d || e.target.className === 'gp-x') d.remove(); });
    document.body.appendChild(d);
  }

  function banner() {
    css();
    if (document.getElementById('gp-cookie')) return;
    var d = document.createElement('div');
    d.id = 'gp-cookie';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-live', 'polite');
    d.innerHTML = '<p>' + (SWISS ? t.chTxt : t.txt) + ' <a data-gp="privacy">' + t.privacy + '</a></p><div class="gp-b"><button class="gp-no" type="button">' + t.no + '</button><button class="gp-ok" type="button">' + t.ok + '</button></div>';
    d.querySelector('[data-gp="privacy"]').onclick = privacy;
    d.querySelector('.gp-ok').onclick = function () { save('granted'); d.remove(); window['ga-disable-' + GA_ID] = false; loadGA(); };
    d.querySelector('.gp-no').onclick = function () { save('denied'); d.remove(); disableGA(); };
    document.body.appendChild(d);
  }

  function footerLinks() {
    var f = document.querySelector('.fbot') || document.querySelector('footer');
    if (!f || f.querySelector('.gp-flinks')) return;
    css();
    var s = document.createElement('span');
    s.className = 'gp-flinks';
    s.innerHTML = '<a data-gp="privacy">' + t.privacy + '</a><a data-gp="settings">' + t.settings + '</a>';
    s.querySelector('[data-gp="privacy"]').onclick = privacy;
    s.querySelector('[data-gp="settings"]').onclick = banner;
    f.appendChild(s);
  }

  window.gpCookieSettings = banner;
  window.gpPrivacy = privacy;

  function init() {
    footerLinks();
    var c = read();
    if (c === 'granted' || (c === null && SWISS)) loadGA();
    else if (c === 'denied') disableGA();
    if ((c === null && !SWISS) || location.hash === '#cookie-settings') banner();
    if (location.hash === '#datenschutz' || location.hash === '#privacy') privacy();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
