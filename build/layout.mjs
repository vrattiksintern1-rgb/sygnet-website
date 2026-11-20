// The page shell shared by every page: head (SEO + share tags), the fixed light header with its mega
// panels, and the closing footer (close row, company line, link groups, legal row with the Vrattiks credit).
import { SITE, PRODUCTS, INDUSTRIES } from './data.mjs';
import { esc, url, CHEV, btn, icon } from './ui.mjs';
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
  { key: 'platform', label: 'Platform', href: '/platform/', menu: menuList([
    ['/platform/', 'Sygnet IoT Connect'], ['/hardware/', 'Smart edge hardware'], ['/developer/', 'Developer'],['/resources/', 'Resources']]) },
  { key: 'solutions', label: 'Solutions', href: '/solutions/' },
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
      <a class="btn btn--primary" href="/contact/#demo">${glass ? 'Request a Demo' : 'Request a demo'}</a>
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
  ['Platform', [['/platform/', 'Sygnet IoT Connect'], ['/hardware/', 'Smart edge hardware'], ['/developer/', 'Developer'], ['/solutions/', 'Solutions'], ['/resources/', 'Resources']]],
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
          ${btn(c.href || '/contact/#demo', c.label || 'Request a demo')}
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
          <address class="footer__contact"><a href="tel:${SITE.tel}">${SITE.phone}</a><a href="mailto:${SITE.email}">${SITE.email}</a><span>${SITE.city}</span></address>
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

export function page({ path, title, desc, type = 'product', nav, body, moments = [], close, noindex = false, glassNav = false }) {
  const canonical = SITE.domain + path;
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
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: SITE.legal, alternateName: SITE.platform, slogan: SITE.line, url: SITE.domain, logo: `${SITE.domain}/img/brand/icon-512.png`, email: SITE.email, telephone: SITE.phone, address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressRegion: 'Gujarat', addressCountry: 'IN' } })}</script>
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
<script type="module" src="/assets/system.js"></script>
<script type="module" src="/assets/nav-dropdown.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
</body>
</html>
`;
}
