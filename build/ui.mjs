// Shared markup helpers. Classes come from the taste-skill kit (system.css, layout.css, motion.css);
// site.css adds the brand layer (cut corners, hexagons, chevrons) and what sits inside visuals.
import { readFileSync, existsSync } from 'node:fs';
import { SITE, PRODUCTS, INDUSTRIES, CATALOG, productBySlug, industryBySlug } from './data.mjs';

// ---------------------------------------------------------------- line icons (Lucide, ISC licence, from the kit)
const ICON_DIR = new URL('../.claude/skills/taste-skill-main/assets/icons/demo/', import.meta.url);
const OWN_ICONS = {
  hospital: '<path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  milk: '<path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/><path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>',
  hexagon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
  recycle: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
  // Textile Connect page (Lucide, ISC licence)
  fuel: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  fan: '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>',
  shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
};
const iconCache = {};
export function icon(name, cls = 'ico') {
  if (!(name in iconCache)) {
    let inner = OWN_ICONS[name];
    if (!inner) {
      const f = new URL(`ui-${name}.svg`, ICON_DIR);
      if (!existsSync(f)) throw new Error(`icon not found: ${name}`);
      inner = readFileSync(f, 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/ stroke-width="2"/g, '');
    }
    iconCache[name] = inner;
  }
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconCache[name]}</svg>`;
}

// ---------------------------------------------------------------- product shots from the client's catalogs
const SIZES = JSON.parse(readFileSync(new URL('./catalog/catalog.json', import.meta.url), 'utf8'));
// a product shot on its own ground (light: the catalog's white; dark: the Profile's renders), never cropped.
// tag: the small "Product render" chip the brief asks for on AI-looking renders (CATALOG[id].render)
export function shot(id, alt, { cls = '', tag = true, eager = false } = {}) {
  const m = SIZES[id], c = CATALOG[id];
  if (!m || !c) throw new Error(`catalog image not found: ${id}`);
  const a = alt === '' ? '' : (alt || c.alt);
  return `<div class="shot shot--${m.ground}${cls ? ' ' + cls : ''}" style="--nw: ${m.w}px"><img src="/assets/catalog/${id}.webp" alt="${esc(a)}" width="${m.w}" height="${m.h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async" data-source="client-catalog">${tag && c.render ? '<span class="shot__tag">Product render</span>' : ''}</div>`;
}

// the eyebrow over a section heading: a hexagon from the logo and a short label
export const eyebrow = t => `<p class="eyebrow">${esc(t)}</p>`;

// a designed tile for subjects with no product image: Indigo to Signal Blue, the logo's hexagons, a line icon
export const brandTile = (ic, label = '', cls = '') =>
  `<div class="btile ${cls}" aria-hidden="true"><span class="btile__ico">${icon(ic)}</span>${label ? `<span class="btile__label">${esc(label)}</span>` : ''}</div>`;

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const url = {
  product: s => `/products/${s}/`,
  industry: s => `/industries/${s}/`,
};

export const ARROW = '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
// the WhatsApp glyph in one colour (currentColor), not WhatsApp green: the bubble outline and handset from the kit's
// icons/demo/whatsapp.svg (gilbarbara/logos). Used by the floating chat button (layout.mjs) and the Solutions CTA.
export const WA_ICON = '<svg class="wa-ico" viewBox="0 0 256 258" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M1.07062531,127.416078 C1.06284837,149.873286 6.93054909,171.796478 18.0839762,191.11958 L18.0839762,191.11958 L0,257.147091 L67.5712334,239.429927 C86.1892261,249.581425 107.15067,254.933255 128.481518,254.941032 L128.481518,254.941032 L128.535957,254.941032 C198.783754,254.941032 255.970181,197.772751 256,127.518474 L256,127.518474 C256.011658,93.4697375 242.763642,61.4533745 218.700495,37.3681934 L218.700495,37.3681934 C194.63346,13.2856047 162.632651,0.0142577221 128.535957,0 L128.535957,0 C58.2751986,0 1.09914076,57.1592078 1.07062531,127.416078 L1.07062531,127.416078 Z M41.3098055,187.792346 L38.7874848,183.787222 C28.1810358,166.922929 22.5829356,147.435216 22.5907045,127.423855 L22.5907045,127.423855 C22.6140434,69.0294095 70.1376234,21.5213834 128.576138,21.5213834 L128.576138,21.5213834 C156.875124,21.5330488 183.472256,32.5646372 203.47584,52.5811829 L203.47584,52.5811829 C223.479424,72.5990247 234.486386,99.2091187 234.478613,127.510697 L234.478613,127.510697 C234.452686,185.906438 186.92781,233.420945 128.535957,233.420945 L128.535957,233.420945 L128.49448,233.420945 C109.481159,233.410576 90.8346512,228.305015 74.571775,218.656426 L74.571775,218.656426 L70.7014515,216.360933 L30.6035524,226.874058 L41.3098055,187.792346 Z"/><path d="M96.6782434,74.1484502 C94.2920192,68.8445776 91.781364,68.7382928 89.5117939,68.6449695 C87.6544015,68.565904 85.5300009,68.5710189 83.4081926,68.5710189 C81.2837921,68.5710189 77.8334233,69.369521 74.9157749,72.5554738 C71.9955342,75.7427228 63.7675324,83.4470773 63.7675324,99.1163139 C63.7675324,114.786847 75.181487,129.928547 76.7718711,132.05554 C78.3648475,134.178645 98.8052363,167.362845 131.176746,180.128691 C158.081068,190.737732 163.556033,188.627589 169.395218,188.096165 C175.234404,187.566037 188.238742,180.394403 190.891975,172.957057 C193.546503,165.521006 193.546503,159.146509 192.750663,157.815356 C191.954823,156.488091 189.830423,155.690955 186.645766,154.099275 C183.459813,152.506298 167.802242,144.800648 164.883297,143.737799 C161.963057,142.676247 159.839952,142.146119 157.715552,145.334664 C155.592447,148.519321 149.492734,155.690955 147.634046,157.815356 C145.776654,159.943645 143.917965,160.209357 140.733309,158.61638 C137.547356,157.018219 127.289573,153.658582 115.121255,142.809751 C105.652831,134.367884 99.2614834,123.942897 97.4027949,120.754351 C95.5454026,117.569695 97.204483,115.84451 98.8013479,114.256719 C100.232305,112.82965 101.987301,110.538045 103.580277,108.679357 C105.169365,106.819372 105.699493,105.492108 106.761045,103.367707 C107.823894,101.242011 107.292469,99.382026 106.496629,97.7890496 C105.699493,96.1960732 99.5103455,80.4464749 96.6782434,74.1484502"/></svg>';
// one-colour social glyphs (currentColor), so they sit in the brand ink on Mist and in white on the Indigo footer
export const SOCIAL_ICONS = {
  facebook: '<svg class="soc-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24 12a12 12 0 1 0-13.875 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385A12.003 12.003 0 0 0 24 12z"/></svg>',
  instagram: '<svg class="soc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.25"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
};
// the social links row (footer and Contact page)
export const socialLinks = (list, cls = 'social') => `<ul class="${cls}" aria-label="Sygnet IoT on social media">${list.map(([k, label, href]) =>
  `<li><a href="${href}" target="_blank" rel="noopener" aria-label="${label} (opens in a new tab)">${SOCIAL_ICONS[k]}<span>${label}</span></a></li>`).join('')}</ul>`;
export const CHEV ='<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const btn = (href, label, kind = 'primary', arrow = kind === 'primary') =>
  `<a class="btn btn--${kind}" href="${href}">${esc(label)}${arrow ? ARROW : ''}</a>`;
export const demoBtn = (label = 'Request a demo') => btn('/contact/', label);
// product pages: opens the brochure form (layout.mjs brochureDialog); the brochure downloads only after the form is filled
export const brochureBtn = () =>
  `<button class="btn btn--secondary btn--brochure" type="button" data-brochure-open aria-haspopup="dialog">${icon('download')}<span>Download brochure</span></button>`;

// one section = one or two screens; h: 1 or 2
export function section({ id, h = 1, cls = '', label, moment, opts }, inner) {
  const extra = [moment ? ` data-moment="${moment}"` : '', opts ? ` data-moment-opts='${opts}'` : ''].join('');
  const style = h === 2 && !cls.includes('g2') ? ' style="--h: 2"' : '';
  return `<section class="section ${cls}" id="${id}" aria-labelledby="${id}-h"${style}${extra}>
<div class="wrap">${inner}</div>
</section>`;
}

export const head = (id, main, muted, p) =>
  `<div class="section-head"><h2 id="${id}-h">${esc(main)}${muted ? ` <span class="muted">${esc(muted)}</span>` : ''}</h2>${p ? `<p>${p}</p>` : ''}</div>`;

// a linked card lifts (motion layer); an unlinked one takes .m-nolift
// img: a catalog product shot on top; ico: a line icon in a tile; go: the link's words
export function card({ href, title, text, label, span = 4, extra = '', img, ico, go = 'Learn more', cls = '' }) {
  const top = img ? shot(img, '', { cls: 'card__shot' }) : ico ? `<span class="card__ico">${icon(ico)}</span>` : '';
  const body = `${top}${label ? `<p class="t-label muted">${esc(label)}</p>` : ''}<h3>${esc(title)}</h3>${text ? `<p>${esc(text)}</p>` : ''}${extra}`;
  const k = `${img ? ' card--img' : ''}${cls ? ' ' + cls : ''}`;
  return href
    ? `<a class="card span-${span} card--link${k}" href="${href}">${body}<span class="card__go link">${esc(go)}</span></a>`
    : `<article class="card span-${span} m-nolift${k}">${body}</article>`;
}

// ---------------------------------------------------------------- product cards (Home "Products", Products page)
// One family: white cut-corner card, a 4:3 Mist image area with the device alone on it (p.card, a transparent
// cut-out from build/tools/cutout_cards.py), category chips, name, one line, "See the product". A product with
// no picture yet gets the same area as a Sky-to-Mist ground with the logo's hexagon and its line icon.
// The whole card is the link; site.css .pcard*.
const PHEX = '<svg class="pcard__hex" viewBox="0 0 104 112" aria-hidden="true"><path d="M52 3 100 30.5v51L52 109 4 81.5v-51z"/><path d="M52 15 89.6 36.6v38.8L52 97 14.4 75.4V36.6z"/></svg>';
export function productCard(p, chips = []) {
  const cid = p.card, c = cid && CATALOG[cid], m = cid && SIZES[cid];
  if (cid && (!c || !m)) throw new Error(`product card image not found: ${cid}`);
  const note = p.soon ? 'Coming soon' : 'Image awaited';
  const media = c
    ? `<div class="pcard__media"><img src="/assets/catalog/${cid}.webp" alt="${esc(c.alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" data-source="client-catalog">${c.render ? '<span class="pcard__tag">Product render</span>' : ''}</div>`
    : `<div class="pcard__media pcard__media--none" role="img" aria-label="${esc(`${p.name}: product image ${p.soon ? 'to follow, product coming soon' : 'awaited from Sygnet'}`)}">${PHEX}<span class="pcard__ico">${icon(p.icon)}</span><span class="pcard__tag pcard__tag--soon">${esc(note)}</span></div>`;
  return `<li><a class="pcard" href="${url.product(p.slug)}">${media}
  <span class="pcard__body">${chips.length ? `<span class="pcard__chips">${chips.map(t => `<span class="pcard__chip">${esc(t)}</span>`).join('')}</span>` : ''}<h3 class="pcard__name">${esc(p.short)}</h3><p class="pcard__one">${esc(p.one)}</p></span>
  <span class="pcard__go"><span class="pcard__go-t">See the product</span>${ARROW}</span></a></li>`;
}
export const productGrid = (list, chipsOf = () => []) =>
  `<ul class="pgrid pgrid--${list.length}" role="list">${list.map(p => productCard(p, chipsOf(p))).join('')}</ul>`;

// the one marked placeholder a section may carry (Sky chip, honest wording): a slim block, never a hatched box
export const slot = (what, note = 'Awaiting from client', cls = '') =>
  `<div class="soon ${cls}"><span class="chip-soon">${esc(note)}</span><span class="soon__what">${esc(what)}</span></div>`;
export const chipSoon = (note = 'Awaiting from client') => `<span class="chip-soon">${esc(note)}</span>`;

export const tag = (t, cls = '') => `<span class="tagline ${cls}">${esc(t)}</span>`;

export function checks(items) {
  return `<ul class="checks">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

export function faq(items) {
  return `<div class="faq">${items.map(([q, a]) => `<div class="faq__item"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join('')}</div>`;
}

// model rows with the "specifications coming soon" marker in place of figures
export function specs(models, title = 'Model-wise specifications') {
  const rows = models.map(([n, d, x]) => `<li><span class="specs__name">${esc(n)}</span><span class="specs__desc">${esc([d, x].filter(Boolean).join(' · '))}</span><span class="specs__soon">Specifications coming soon</span></li>`).join('');
  return `<div class="specs"><div class="specs__head"><span>${esc(title)}</span><span class="chip-soon">Awaiting catalogue</span></div><ul>${rows}</ul></div>`;
}

export function productLinks(slugs) {
  return `<ul class="plist">${slugs.map(s => {
    const p = productBySlug[s];
    return `<li><a class="plist__a" href="${url.product(s)}"><span class="plist__name">${esc(p.name)}</span><span class="plist__one">${esc(p.one)}</span>${ARROW}</a></li>`;
  }).join('')}</ul>`;
}

export function industryLinks(slugs) {
  return slugs.map(s => `<a class="chip" href="${url.industry(s)}">${esc(industryBySlug[s].name)}</a>`).join('');
}

// ---------------------------------------------------------------- illustrative screens
const bar = (title, dark) => `<div class="win__bar"><span class="win__dots"><i></i><i></i><i></i></span><span class="win__title">${esc(title)}</span><span class="win__tag">Illustrative screen</span></div>`;
const win = (key, title, label, body, { dark = false, loop = false } = {}) =>
  `<div class="win win--${key}${dark ? ' win--dark' : ''}" role="img" aria-label="${esc(label)}"${loop ? ' data-m-loop' : ''}>${bar(title, dark)}<div class="win__body">${body}</div></div>`;

// one call on the nurse station: status edge, source icon, bed and where the call came from, status pill
const ncsRow = (st, ic, bed, from, pill) => `<li class="ncs__row ncs__row--${st}"><span class="ncs__ico">${icon(ic)}</span><span class="ncs__who"><b>${bed}</b><span>${from}</span></span>${pill}</li>`;

export const WINDOWS = {
  ncs: (loop) => win('ncs', 'Nurse station · Ward B', 'Nurse station display listing open calls by bed: a Code Blue in ICU, a bathroom pull-cord call, and a bed call being attended', `
<div class="ncs">
  <ul class="ncs__list">
    ${ncsRow('blue', 'siren', 'Bed 21', 'ICU · Code Blue switch', '<em class="st st--blue"><i>Code Blue</i></em>')}
    ${ncsRow('call', 'bath', 'Bath 3', 'Ward B · Pull-cord', '<em class="st st--call"><i>Calling</i></em>')}
    ${ncsRow('call ncs__row--new', 'bed-double', 'Bed 12', 'Ward B · Bed switch', '<em class="st st--call"><i>Calling</i><i>Attended</i></em>')}
    ${ncsRow('done', 'bed-double', 'Bed 7', 'Ward A · Bed switch', '<em class="st st--ok"><i>Attended</i></em>')}
  </ul>
  <div class="ncs__foot"><span><span class="dot"></span>Staff app connected</span><span>${icon('server')}Reporting on local server</span></div>
</div>`, { loop }),

  qms: (loop) => win('qms', 'OPD · Token display', 'Token display showing the token now being served and the next tokens', `
<div class="qms">
  <div class="qms__now"><p>Now serving</p><b>A-104</b><span>Counter 3</span></div>
  <div class="qms__next"><p>Next</p>
    <div><b>A-105</b><span>OPD registration</span></div>
    <div><b>B-022</b><span>Billing</span></div>
    <div><b>P-031</b><span>Pharmacy</span></div>
    <div class="qms__wa"><span class="dot"></span>Turn alert sent on WhatsApp</div>
  </div>
</div>`, { loop }),

  bell: (loop) => win('bell', 'School bell · Today', 'School bell app showing the day timetable and a live classroom announcement', `
<div class="bell">
  <div class="bell__row"><time>07:50</time><b>Prayer</b><span>All rooms</span></div>
  <div class="bell__row is-now"><time>08:10</time><b>Period 1</b><span>Bell</span></div>
  <div class="bell__row"><time>08:50</time><b>Period 2</b><span>Bell</span></div>
  <div class="bell__row"><time>10:10</time><b>Short break</b><span>Bell</span></div>
  <div class="bell__ann"><span class="dot"></span><b>Announcement</b><span>Class 7B only</span></div>
</div>`, { loop }),

  water: (loop) => win('water', 'Water ATM · Panel 1', 'Water ATM panel with two taps, payment options and a rate set from mobile', `
<div class="water">
  <div class="water__taps"><div class="tap is-on"><p>Tap 1</p><b>Dispensing</b></div><div class="tap"><p>Tap 2</p><b>Ready</b></div></div>
  <div class="water__pay"><p>Pay by</p><span>RFID card</span><span>Coin</span><span>UPI</span></div>
  <div class="water__foot"><span class="dot"></span>Online · rate set from mobile</div>
</div>`, { loop }),

  textile: (loop) => win('textile', 'Mill floor · Shed 2', 'Mill dashboard showing machine states and utilities', `
<div class="tex">
  <div class="tex__grid">${['r', 'r', 'r', 's', 'r', 'i', 'r', 'r', 'r', 'r', 's', 'r'].map((s, i) => `<span class="m m--${s}">L-${String(i + 1).padStart(2, '0')}</span>`).join('')}</div>
  <div class="tex__side"><p>Utilities</p><span><i class="m--r"></i>Compressor</span><span><i class="m--i"></i>DG set</span><span><i class="m--r"></i>Solar</span><span><i class="m--r"></i>RO plant</span><span><i class="m--s"></i>Borewell</span></div>
  <div class="tex__key"><span><i class="m--r"></i>Running</span><span><i class="m--i"></i>Idle</span><span><i class="m--s"></i>Stopped</span></div>
</div>`, { loop }),

  energy: () => win('energy', 'Energy · Site view', 'Planned energy monitoring screen for AC, lifts, pumps and VFDs', `
<div class="en">${['AC', 'Lifts', 'Pumps', 'VFDs', 'Water'].map(x => `<div class="en__row"><b>${x}</b><span class="en__line"></span><em>Coming soon</em></div>`).join('')}</div>`),

  dairy: () => win('dairy', 'Dairy route · Today', 'Dairy route from collection centre to tanker, each point online', `
<div class="dairy">${['Collection centre', 'Bulk milk cooler', 'Chilling centre', 'Milk tanker'].map((x, i) => `<div class="dairy__pt"><span class="dairy__n">${i + 1}</span><b>${x}</b><em><span class="dot"></span>Online</em></div>`).join('')}</div>`),

  milk: () => win('milk', 'Milk vending · Screen', 'Milk vending screen with milk choice and payment options', `
<div class="vend"><p>Choose milk</p><div class="vend__opts"><span class="is-on">Cow</span><span>Buffalo</span></div><p>Pay by</p><div class="vend__opts"><span>Card</span><span>Paytm</span></div><div class="water__foot"><span class="dot"></span>Chiller on · hot water auto-clean</div></div>`),

  napkin: () => win('napkin', 'Napkin vending · Block A', 'Napkin vending machine status on the platform', `
<div class="vend"><p>Machine</p><div class="vend__opts"><span class="is-on">Girls’ washroom, Block A</span></div><p>Status</p><div class="vend__opts"><span>Online</span><span>Stock OK</span></div><div class="water__foot"><span class="dot"></span>Dispensing recorded on Sygnet IoT Connect</div></div>`),

  rvm: () => win('rvm', 'Reverse vending · Point 4', 'Reverse vending machine screen asking for a bottle or can', `
<div class="vend"><p>Insert</p><div class="vend__opts"><span class="is-on">Bottle</span><span>Can</span></div><p>Status</p><div class="vend__opts"><span>Collection logged</span></div><div class="water__foot"><span class="dot"></span>Online</div></div>`),
};


// the NCS product hero: the nurse station screen with the staff app phone in front of it, so the
// picture shows the lead's promise (station and app know at once). The Bath 3 call lands on the phone
// inside the same 3.2 s loop that turns Bed 12 to Attended on the station.
export const SCENES = {
  ncs: () => `<div class="ncs-scene" data-m-loop>
  ${WINDOWS.ncs(false)}
  <div class="phone" role="img" aria-label="Sygnet staff app on a nurse's phone showing the Bath 3 pull-cord call with an Accept button">
    <div class="phone__screen">
      <div class="phone__top"><span>Staff app</span><span class="phone__live"><span class="dot"></span>On shift</span></div>
      <p class="phone__h">Calls for you</p>
      <div class="phone__call phone__call--blue"><span class="phone__ico">${icon('siren')}</span><span><b>Bed 21</b><span>ICU · Code Blue</span></span></div>
      <div class="phone__call phone__call--new"><span class="phone__ico">${icon('bath')}</span><span><b>Bath 3</b><span>Ward B · Pull-cord</span></span><span class="phone__btn">Accept</span></div>
    </div>
  </div>
</div>`,
};
