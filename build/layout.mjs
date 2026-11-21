// The page shell shared by every page: head (SEO + share tags), the fixed light header with its mega
// panels, and the closing footer (close row, company line, link groups, legal row with the Vrattiks credit).
import { SITE, PRODUCTS, INDUSTRIES, BROCHURE_URL } from './data.mjs';
import { esc, url, CHEV, btn, icon, WA_ICON, socialLinks } from './ui.mjs';
import { BRAND } from './brand.mjs';

// fonts are self-hosted (build/fonts): Nulshock Bold, the brand kit's primary face, for h1/h2 headings; Jost, the
// secondary face, for all other text; Geist Mono for code samples. Nulshock needs its paid web licence: its file
// (build/fonts/nulshock-bold.woff2) is added once bought, and headings fall back to Jost until then.
const FONTS = `<link rel="preload" href="/assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts/fonts.css">`;

// palette from the client's brand kit: Sygnet Indigo, Signal Blue, Sky, Mist (brand.mjs). Light and airy:
// Mist ground, Indigo ink, Signal Blue for actions, Sky for highlights, one Indigo band per page.
const ROOT = `<style>
:root {
  --p-bg: ${BRAND.mist}; --p-surface: ${BRAND.tint}; --p-ink: #1e2762; --p-muted: #3f4a78;
  --p-accent: ${BRAND.sky}; --p-accent-ink: ${BRAND.indigo}; --p-action: ${BRAND.action}; --p-action-ink: #ffffff;
  --p-inv-bg: ${BRAND.indigo}; --p-inv-surface: #34439a; --p-inv-ink: ${BRAND.mist}; --p-inv-muted: #c6d0f0;
  --p-inv-accent: ${BRAND.sky}; --p-inv-accent-ink: #1e2762; --p-inv-action: ${BRAND.sky}; --p-inv-action-ink: #1e2762;
  --brand-indigo: ${BRAND.indigo}; --brand-blue: ${BRAND.blue}; --brand-sky: ${BRAND.sky}; --brand-mist: ${BRAND.mist}; --brand-tint: ${BRAND.tint};
  --font-brand: "Nulshock", "Jost", system-ui, sans-serif;
  --font-display: "Jost", system-ui, sans-serif;
  --font-text: "Jost", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.012em;
  --display-tracking-xl: -0.018em;
  --display-stretch: 100%;
  --ly-scale: 0.96;
}
</style>`;

const LOGO = `<img src="/img/brand/sygnet-logo.svg" alt="Sygnet IoT Connect" width="230" height="70">`;
const LOGO_WHITE = `<img src="/img/brand/sygnet-logo-white.svg" alt="Sygnet IoT Connect" width="230" height="70">`;

const priority = PRODUCTS.filter(p => p.tier === 'priority');
const secondary = PRODUCTS.filter(p => p.tier === 'secondary');
// a dropdown is one plain column of link names (a small card on desktop, a list in the phone sheet;
// /assets/nav-dropdown.js opens it and keeps aria-expanded and the menu keys)
const menuList = links => links.map(([h, x]) => `<a role="menuitem" href="${h}">${esc(x)}</a>`).join('');

const NAV = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'products', label: 'Products', href: '/products/', menu: menuList([
    ...[...priority, ...secondary].map(p => [url.product(p.slug), p.short]), ['/products/', 'All products']]) },
  { key: 'industries', label: 'Industries', href: '/industries/', menu: menuList([
    ...INDUSTRIES.map(i => [url.industry(i.slug), i.name]), ['/industries/', 'All industries']]) },
  // 2026-11-20: Developer and Resources removed with their pages; "Smart edge hardware" moved from Platform to Solutions
  { key: 'platform', label: 'Platform', href: '/platform/' },
  { key: 'solutions', label: 'Solutions', href: '/solutions/', menu: menuList([
    ['/solutions/', 'All solutions'], ['/hardware/', 'Custom-designed hardware']]) },
  { key: 'partners', label: 'Partners', href: '/partners/' },
  { key: 'company', label: 'Company', href: '/company/', menu: menuList([
    ['/company/', 'About Sygnet IoT'], ['/case-studies/', 'Case studies'], ['/contact/', 'Contact']]) },
];

// glass: the Home variant (site.css "home hero"): it sits inside the hero's glass card at the top of the page
// and turns into a navy glass bar once the page scrolls (the hero's script sets .is-stuck). White logo, the
// words in one glass pill, an outlined button. Every other page keeps the light bar.
function header(current, glass = false) {
  const items = NAV.map(n => {
    const cur = n.key === current ? ' aria-current="page"' : '';
    if (!n.menu) return `<div class="nav__item"><a class="nav__link" href="${n.href}"${cur}>${n.label}</a></div>`;
    return `<div class="nav__item"><a class="nav__link" href="${n.href}"${cur}>${n.label} ${CHEV}</a>
      <div class="nav__menu" id="menu-${n.key}"><div class="menu-col menu-col--list" role="menu" aria-label="${n.label}">${n.menu}</div></div></div>`;
  }).join('\n');
  return `<header class="nav${glass ? ' nav--glass' : ''}">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#top">Skip to content</a>
    <a class="nav__logo" href="/">${glass ? LOGO_WHITE : LOGO}</a>
    <nav class="nav__links" aria-label="Main">
${items}
    </nav>
    <div class="nav__actions">
      <button class="btn btn--secondary nav__login" type="button">Log in</button>
      <a class="btn btn--primary" href="/contact/">${glass ? 'Request a Demo' : 'Request a demo'}</a>
    </div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>`;
}

// footer link groups: <details> so a phone shows four short rows; a wider screen opens them all (script below)
const FOOT = [
  ['Products', [...priority.map(p => [url.product(p.slug), p.short]), ['/products/', 'All products']]],
  ['Industries', INDUSTRIES.map(i => [url.industry(i.slug), i.name])],
  ['Platform & solutions', [['/platform/', 'Sygnet IoT Connect'], ['/solutions/', 'All solutions'], ['/hardware/', 'Custom-designed hardware']]],
  ['Company', [['/company/', 'About us'], ['/case-studies/', 'Case studies'], ['/partners/', 'Partner program'], ['/contact/', 'Contact']]],
];

function footer(close) {
  const c = close || {};
  const h2 = c.h2 || 'See Sygnet running on your site';
  const line = c.line || 'Tell us what you run and we will walk you through it on your own use case.';
  const groups = FOOT.map(([t, links]) => `<details class="footer__group" open><summary>${t}</summary><ul>${links.map(([h, x]) => `<li><a href="${h}">${esc(x)}</a></li>`).join('')}</ul></details>`).join('');
  // close: false (the Solutions page, which ends on its own one-line call to action): the footer without the Sky band
  const band = close === false ? '' : null;
  return `<footer class="footer closing footer--dark ground-inverse${band === '' ? ' closing--plain' : ''}" ${band === '' ? 'aria-label="Footer"' : 'aria-labelledby="close-h"'}>
  <div class="wrap">
    ${band ?? `<div class="closing__cta">
      <div class="cta-band">
        <div class="cta-band__copy">
          <h2 id="close-h">${esc(h2)}</h2>
          <p class="t-lead">${esc(line)}</p>
        </div>
        <div class="cta-band__act">
          ${btn(c.href || '/contact/', c.label || 'Request a demo')}
          <a class="cta-band__row" href="tel:${SITE.tel}">${icon('phone')}<span>${SITE.phone}</span></a>
          <a class="cta-band__row" href="mailto:${SITE.email}">${icon('mail')}<span>${SITE.email}</span></a>
        </div>
      </div>
    </div>`}
    <div class="closing__links">
      <div class="footer__grid grid">
        <div class="footer__brand span-5">
          <a class="nav__logo" href="/">${LOGO_WHITE}</a>
          <p class="footer__line">${esc(SITE.line)}</p>
          <p class="footer__sub">${esc(SITE.subline)}</p>
          <address class="footer__contact"><a href="tel:${SITE.tel}">${SITE.phone}</a><a href="mailto:${SITE.email}">${SITE.email}</a><span class="footer__addr">${SITE.address.map(esc).join('<br>')}</span></address>
          ${socialLinks(SITE.social, 'social social--foot')}
        </div>
        <nav class="footer__groups span-6 start-7" aria-label="Footer">${groups}</nav>
      </div>
      <div class="footer__legal">
        <span>&copy; ${SITE.year} ${SITE.legal}</span>
        <span class="footer__policies"><a href="/privacy-policy/">Privacy policy</a><a href="/terms-and-conditions/">Terms &amp; conditions</a></span>
        <span class="credit">${SITE.credit}</span>
      </div>
    </div>
  </div>
  <script>(function(){var m=matchMedia('(max-width: 767px)');function s(){document.querySelectorAll('.footer__group').forEach(function(d){d.open=!m.matches})}s();m.addEventListener&&m.addEventListener('change',s)})()</script>
</footer>`;
}

// the floating buttons (site.css "floating buttons"), bottom right, 48px, cut corners like the buttons:
//   WhatsApp (every page): Signal Blue with a white glyph and a white rim, so it reads on Mist and on the Indigo bands.
//   Download brochure (product pages only, brFloat): Indigo with a white glyph and rim, 12px above WhatsApp. It is the
//   same kind of button as the in-page "Download brochure" buttons (data-brochure-open): it opens this product's
//   brochure form, and the file downloads only after the form is sent. It is rendered hidden and the form's script
//   shows it, so without script (or without <dialog>) there is no dead button.
// The script below hides each one on its own (.is-hidden) while it would sit over the footer or over anything that can
// be pressed in the page (buttons, links, tabs, fields), so neither ever covers footer text or a call to action; a
// button keeps its place while it has keyboard focus. Without script the footer's last line gets room under WhatsApp (site.css).
const brFloat = p => `<button class="fab br-float" type="button" data-brochure-open data-product="${esc(p.slug)}" aria-haspopup="dialog" aria-label="Download brochure for ${esc(p.name)}" hidden>${icon('download')}</button>`;
const waFloat = `<a class="fab wa-float" href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}</a>
<script>(function(){var fs=[].slice.call(document.querySelectorAll('.fab'));if(!fs.length)return;document.documentElement.classList.add('wa-js');
var q='main a[href], main button, main summary, main select, main input, main textarea, main [role=tab], main .hx-btn, footer',raf=0;
function hit(r,b){return r.bottom>b.top-8&&r.top<b.bottom+8&&r.right>b.left-8&&r.left<b.right+8}
function check(){raf=0;var els=document.querySelectorAll(q);fs.forEach(function(a){if(a.hidden)return;
if(a===document.activeElement){a.classList.remove('is-hidden');return}
var b=a.getBoundingClientRect(),off=false;
for(var i=0;i<els.length&&!off;i++){var r=els[i].getBoundingClientRect();if(r.width&&hit(r,b))off=true}
a.classList.toggle('is-hidden',off)})}
function tick(){if(!raf)raf=requestAnimationFrame(check)}
addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);addEventListener('load',tick);
fs.forEach(function(a){a.addEventListener('blur',tick)});document.addEventListener('fab:shown',tick);tick()})()</script>`;

// ---------------------------------------------------------------- brochure form (every product page)
// Each "Download brochure" button (ui.mjs brochureBtn) opens this dialog. The visitor fills name, email, mobile and
// organisation; only then does the brochure download. The file is the product's BROCHURE_URL (data.mjs), one per
// product (tiers and models share it). While it is empty, or a site path does not answer (checked with HEAD first),
// nothing downloads: the form says "Thank you. We will send the brochure to you shortly." (no 404, no empty file).
// data-endpoint: the client's form address (POST, FormData), same as the Contact form; empty = nothing is sent yet.
// site.css "brochure dialog".
const brochureDialog = p => `<dialog class="bdlg" id="brochure" aria-labelledby="bdlg-h">
<form class="form--card bform" method="dialog" novalidate data-endpoint="" data-file="${esc((BROCHURE_URL[p.slug] || '').trim())}" data-product="${esc(p.name)}">
  <button class="bdlg__x" type="button" data-brochure-close aria-label="Close">${icon('x')}</button>
  <div class="bdlg__head field--full">
    <p class="eyebrow">Brochure</p>
    <h2 id="bdlg-h">${esc(p.name)}</h2>
    <p class="t-small muted">Tell us who you are and the brochure downloads straight away.</p>
  </div>
  <input type="hidden" name="product" value="${esc(p.slug)}">
  <div class="field"><label for="b-name">Your name</label><input id="b-name" name="name" type="text" autocomplete="name" required aria-describedby="b-name-err"><p class="field__error" id="b-name-err" hidden>Write your name.</p></div>
  <div class="field"><label for="b-email">Work email</label><input id="b-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="b-email-err"><p class="field__error" id="b-email-err" hidden>Write an email address with an @, like name@company.com.</p></div>
  <div class="field"><label for="b-phone">Mobile number</label><input id="b-phone" name="mobile" type="tel" autocomplete="tel" inputmode="tel" pattern="[+]?[0-9][0-9 \\-]{8,16}[0-9]" required aria-describedby="b-phone-err"><p class="field__error" id="b-phone-err" hidden>Write a mobile number of at least 10 digits, like +91 98765 43210.</p></div>
  <div class="field"><label for="b-org">Organisation</label><input id="b-org" name="organisation" type="text" autocomplete="organization" required aria-describedby="b-org-err"><p class="field__error" id="b-org-err" hidden>Write the hospital, school or company name.</p></div>
  <div class="form__actions field--full"><button class="btn btn--primary" type="submit">${icon('download')}<span>Download brochure</span></button></div>
  <p class="form__status field--full" role="status" data-brochure-status></p>
</form>
</dialog>
<script>(function(){var d=document.getElementById('brochure');if(!d||!d.showModal)return;var f=d.querySelector('form'),st=d.querySelector('[data-brochure-status]'),
fs=[].slice.call(f.querySelectorAll('input:not([type=hidden])')),sub=f.querySelector('[type=submit]'),K='syg-brochure-lead';
function chk(el){var ok=el.checkValidity(),e=document.getElementById(el.id+'-err');if(ok){el.removeAttribute('aria-invalid');if(e)e.hidden=true}else{el.setAttribute('aria-invalid','true');if(e)e.hidden=false}return ok}
fs.forEach(function(el){el.addEventListener('input',function(){if(el.getAttribute('aria-invalid')==='true')chk(el)})});
function open(){st.textContent='';sub.disabled=false;try{var s=JSON.parse(localStorage.getItem(K)||'{}');fs.forEach(function(el){if(!el.value&&s[el.name])el.value=s[el.name]})}catch(e){}
d.showModal();var first=fs.filter(function(el){return !el.value})[0]||sub;first.focus()}
var pid=f.querySelector('[name=product]');
document.querySelectorAll('[data-brochure-open]').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.product)pid.value=b.dataset.product;open()});
if(b.hidden){b.hidden=false;document.dispatchEvent(new Event('fab:shown'))}});
d.querySelector('[data-brochure-close]').addEventListener('click',function(){d.close()});
d.addEventListener('click',function(e){if(e.target===d)d.close()});
f.addEventListener('submit',function(e){e.preventDefault();var bad=fs.filter(function(el){return !chk(el)});
if(bad.length){st.textContent=bad.length===1?'1 field to fix.':bad.length+' fields to fix.';bad[0].focus();return}
var data={};fs.forEach(function(el){data[el.name]=el.value.trim()});try{localStorage.setItem(K,JSON.stringify(data))}catch(e){}
var ep=(f.dataset.endpoint||'').trim();if(/^https?:\\/\\//.test(ep)||ep.charAt(0)==='/'){try{fetch(ep,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'},keepalive:true})}catch(e){}}
var file=(f.dataset.file||'').trim();
function later(){st.textContent='Thank you. We will send the brochure to you shortly.';sub.disabled=true}
function get(){var a=document.createElement('a');a.href=file;a.download='';document.body.appendChild(a);a.click();a.remove();
st.textContent='Thank you, '+data.name+'. Your brochure is downloading.';setTimeout(function(){d.close()},2200)}
if(!file)return later();
if(file.charAt(0)==='/'&&file.charAt(1)!=='/'){sub.disabled=true;fetch(file,{method:'HEAD'}).then(function(r){sub.disabled=false;r.ok?get():later()},function(){sub.disabled=false;later()})}
else get()})})()</script>`;

export function page({ path, title, desc, type = 'product', nav, body, moments = [], close, noindex = false, glassNav = false }) {
  const canonical = SITE.domain + path;
  const product = PRODUCTS.find(p => path === url.product(p.slug));
  const pre = moments.length ? `<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<link rel="modulepreload" href="/assets/moments/moments.js">
<link rel="modulepreload" href="/assets/moments/lib.js">
${moments.map(m => `<link rel="modulepreload" href="/assets/moments/${m}/moment.js">`).join('\n')}` : '';
  return `<!doctype html>
<html lang="en" data-type="${type}" data-radius="soft" data-ground="sky" data-buttons="solid" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow">'}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.platform}">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE.domain}/img/brand/icon-512.png">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/img/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/img/brand/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/img/brand/apple-touch-icon.png">
<meta name="theme-color" content="${BRAND.indigo}">
<meta name="site-kind" content="tech">
<meta name="page-type" content="${type}">
${FONTS}
<link rel="stylesheet" href="/assets/system.css">
<link rel="stylesheet" href="/assets/ui/cards.css">
<link rel="stylesheet" href="/assets/motion/motion.css">
<link rel="stylesheet" href="/assets/backgrounds/backgrounds.css">
<link rel="stylesheet" href="/assets/layout/layout.css">
<link rel="stylesheet" href="/assets/icons/icon.css">
${ROOT}
<link rel="stylesheet" href="/assets/site.css">
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
<script src="/assets/backgrounds/backgrounds.js"></script>
${pre}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: SITE.legal, alternateName: SITE.platform, slogan: SITE.line, url: SITE.domain, logo: `${SITE.domain}/img/brand/icon-512.png`, email: SITE.email, telephone: SITE.phone, address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Surat', addressRegion: 'Gujarat', postalCode: SITE.postcode, addressCountry: 'IN' }, sameAs: SITE.social.map(s => s[2]) })}</script>
</head>
<body>
<!-- type: tech (hardware + platform). Brand kit (BrandKit (1).pdf): Mist ground, Indigo ink, Signal Blue actions, Sky highlights,
     cut-corner cards and buttons, the logo's hexagon as a repeating shape, the mark's soft chevrons behind the hero, one Indigo band.
     Header light (Indigo-on-white logo), footer on Indigo (white logo). -->
${header(nav, glassNav)}
<main id="top">
${body}
</main>
${footer(close)}
${product ? brFloat(product) + '\n' + brochureDialog(product) : ''}
${waFloat}
<script type="module" src="/assets/system.js"></script>
<script type="module" src="/assets/nav-dropdown.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
</body>
</html>
`;
}
