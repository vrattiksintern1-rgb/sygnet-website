// Every page of the site, rendered from data.mjs through the shared shell (layout.mjs).
import { readFileSync } from 'node:fs';
import { SITE, CATALOG, PRODUCTS, INDUSTRIES, SOLUTIONS, SOLUTION_COUNT, SOLUTION_GROUP_ICONS, SOLUTION_ICONS, LAYERS, DEV, SECURITY, HARDWARE, HW_QUALITIES, ENGINEERING, TIERS, CERTS, CERTS_NOTE, HOSPITALS, COMPANY, HOME, productBySlug, industryBySlug } from './data.mjs';
import { esc, url, btn, demoBtn, section, head, card, productGrid, productCard, slot, chipSoon, checks, faq, specs, productLinks, industryLinks, WINDOWS, SCENES, ARROW, icon, shot, eyebrow, brandTile } from './ui.mjs';
import { page } from './layout.mjs';

const priority = PRODUCTS.filter(p => p.tier === 'priority');
const secondary = PRODUCTS.filter(p => p.tier === 'secondary');
const spanFor = n => (n % 3 === 0 ? 4 : n % 4 === 0 ? 3 : n === 2 ? 6 : 4);
// a row of cards whose rows are all full: 5 = 3 + 2, 7 = 4 + 3, else one span for all
function cardRow(items) {
  const n = items.length;
  const spans = n === 5 ? [4, 4, 4, 6, 6] : n === 7 ? [3, 3, 3, 3, 4, 4, 4] : n === 10 ? [4, 4, 4, 4, 4, 4, 3, 3, 3, 3] : items.map(() => spanFor(n));
  return `<div class="grid grid--cards">${items.map((it, i) => card({ ...it, span: spans[i] })).join('')}</div>`;
}
// product cards: one family (ui.mjs productCard); chips are the card's category labels
const industryChips = (p, n = 2) => p.industries.map(sl => industryBySlug[sl].name).slice(0, n);

// ---------------------------------------------------------------- heroes
function heroSplit({ notice, h1, lead, actions, visual, cls = '' }) {
  return `<section class="hero hero--split hero--brand ${cls}" data-enter aria-labelledby="hero-h">
<div class="wrap"><div class="hero-text grid hero-split">
  <div class="hero-copy span-6">
    ${notice ? `<p class="eyebrow">${notice}</p>` : ''}
    <h1 id="hero-h">${esc(h1)}</h1>
    <p class="t-lead">${esc(lead)}</p>
    <div class="btn-row">${actions || `${demoBtn()}${btn('/contact/', 'Talk to our experts', 'secondary')}`}</div>
  </div>
  ${visual}
</div></div>
</section>`;
}
const shotVisual = (id, alt) => `<div class="hero-visual frame--shot span-6 start-7">${shot(id, alt, { eager: true })}</div>`;
const winVisual = (w, loop = true) => `<div class="hero-visual frame frame--win span-6 start-7">${WINDOWS[w](loop)}</div>`;
import { createRequire } from 'node:module';
const SIZE = createRequire(import.meta.url)('./catalog/catalog.json');
// a product with a hero scene (ui.mjs SCENES) shows it; else its catalog shot when large enough, else its screen
const productVisual = p => SCENES[p.window] && !p.soon ? `<div class="hero-visual frame frame--win frame--scene span-6 start-7">${SCENES[p.window]()}</div>`
  : p.img && SIZE[p.img].w >= 360 ? shotVisual(p.img) : winVisual(p.window, !p.soon);
// ---------------------------------------------------------------- shared blocks
// company credentials as text badges only (client rule 2026-11-20: no hospital accreditation or compliance claim anywhere)
const certBadges = () => `<ul class="badges">${CERTS.map(c => `<li class="badge">${icon('shield-check')}${esc(c)}</li>`).join('')}</ul>`;
const hospitalList = () => `<ul class="names">${HOSPITALS.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`;
function trustBlock(id, title = 'Hospitals using Sygnet nurse call.', muted = 'Named in our NCS catalog.') {
  return section({ id, cls: 'trust' }, `${head(id, title, muted)}
<div class="grid grid--top">
  <div class="span-6 stack-4">${hospitalList()}<p class="t-small muted">And three more institutions shown in the catalog by their seal only.</p></div>
  <div class="span-6 start-7 stack-4"><p class="t-label muted">Certifications. ${esc(CERTS_NOTE)}</p>${certBadges()}</div>
</div>`);
}
const layersList = (list = LAYERS) => `<ol class="layers">${list.map(([n, t]) => `<li><b>${n}</b><span>${esc(t)}</span></li>`).join('')}</ol>`;

// the five layers on the Indigo band: Home (layerFlow) and the RSMS modules use the hexagon
const LAYER_ICONS = ['cpu', 'router', 'cloud', 'smartphone', 'brain'];
const HEX = '<svg class="lcard__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg>';
// Home's reveal (site.css "home intro sections"): an element marked data-rv rises 12px and fades in once, its delay
// 50 ms a step within its group (at most 250 ms). Nothing is hidden in the HTML or the CSS: the script hides only the
// elements still below the screen, and only after a person scrolls (wheel, touch, keys), so a page that is not scrolled
// by hand (no script, a full-page capture, print, reduced motion, motion off) shows everything.
const rv = (k = 0) => ` data-rv style="--rv-d: ${Math.min(k, 5) * 50}ms"`;

// Connect. Monitor. Automate. Scale.: a bold Jost heading whose two lines rise once when it comes into view
const statement = (sub) => `<section class="section" id="statement" aria-labelledby="statement-h"><div class="wrap">
  <h2 class="statement__h" id="statement-h" data-rise><span class="rise__l">Connect. Monitor.</span> <span class="rise__l">Automate. Scale.</span></h2>
  <p class="statement__sub">${sub}</p>
</div></section>`;
// marks [data-rise] and [data-fade] .is-in once they are in view; without it (no script, reduced motion, motion off) nothing is hidden
const revealScript = `<script>(function(){var d=document.documentElement,els=document.querySelectorAll('[data-rise],[data-fade]');if(!els.length||!('IntersectionObserver' in window)||d.dataset.motion==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('rv');var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting||e.boundingClientRect.top<0){e.target.classList.add('is-in');io.unobserve(e.target)}})},{threshold:0.2});els.forEach(function(el){io.observe(el)})})()</script>`;

// ---------------------------------------------------------------- home hero (site.css "home hero")
// A dark navy hero holding one glass card; the glass header (layout.mjs) sits in its top. It builds once in
// about 3 s, then only the tiles' float and the light on the connectors move. Timeline (ms from first paint):
//   card, header ............ static: they are the stage
//   badge ................... 0     fade only (decoration)
//   line 1, word by word .... 0-600 fade, 14px rise, blur 8px to 0 (lead); gaps shrink 70, 60, 50, 40
//   line 2, typed ........... 500-1300, 40 ms a character, caret follows, blinks 3 times and goes
//   tiles ................... 300-1100 fade only, to 55 % (decoration)
//   lead + button ........... 700  fade, 10px rise (support)
//   node 1 .................. 820  fade, rise, blur 4px
//   "Connect" line, chip .... 1250 line draws 520 ms; chip at 1480
//   node 2 / arrow / node 3 . 2000 / 2150 / 2400
//   "Act" line, chip, node 4  2560 / 2780 / 2950
//   scroll cue .............. 3100 fade
//   light pulse ............. from 3400, one segment after the other, 4.8 s a round, linear
// Reduced motion or motion off: no animation, the final frame. Without script: the same CSS timeline, no parallax.
const HX_LINE1 = ['Smart', 'IoT', 'systems,', 'built'];
const HX_LINE2 = 'from circuit to cloud';
const HX_GRAD = 'circuit to cloud';
const HX_WORD_D = [0, 70, 130, 180];
const mixHex = (a, b, t) => '#' + [0, 2, 4].map(i => Math.round(parseInt(a.slice(1 + i, 3 + i), 16) * (1 - t) + parseInt(b.slice(1 + i, 3 + i), 16) * t).toString(16).padStart(2, '0')).join('');
function hxHeadline() {
  const l1 = HX_LINE1.map((w, i) => `<span class="hx-w" style="--d:${HX_WORD_D[i]}ms">${esc(w)}</span>`).join(' ');
  // line 2: one span a character (the text stays whole in the DOM, so the h1 reads and indexes as written);
  // the key words take Sky to Signal Blue, one step a letter
  const g0 = HX_LINE2.indexOf(HX_GRAD), n = HX_LINE2.length;
  const chars = [...HX_LINE2].map((c, i) => {
    const t = 500 + i * 40, last = i === n - 1 ? ' hx-c--last' : '';
    const col = i >= g0 ? `;color:${mixHex('#94cddd', '#4675d7', (i - g0) / (HX_GRAD.length - 1))}` : '';
    return `<span class="hx-c${last}" style="--t:${t}ms${col}">${c === ' ' ? ' ' : esc(c)}</span>`;
  });
  // keep each word together: the characters of a word sit in one no-break group, the spaces between groups
  const words = []; let cur = [];
  [...HX_LINE2].forEach((c, i) => { if (c === ' ') { words.push(`<span class="hx-wg">${cur.join('')}</span>`, chars[i]); cur = []; } else cur.push(chars[i]); });
  words.push(`<span class="hx-wg">${cur.join('')}</span>`);
  return `<h1 class="hx-h1" id="hero-h"><span class="hx-l1">${l1}</span> <span class="hx-l2">${words.join('')}</span></h1>`;
}
// the workflow under the headline: four glass nodes, dotted connectors that draw in, two labelled steps
// labels break by hand on a desktop so each node hugs its words and the connectors keep their length
const HX_NODES = [['gauge', 'Devices &amp; sensors', 820], ['cloud', 'Edge &amp; cloud<br> platform', 2000], ['layout-dashboard', 'Live dashboards<br> &amp; alerts', 2400], ['smartphone', 'Reports &amp; decisions<br> on mobile', 2950]];
// on a desktop the row steps: node 1 high, nodes 2 and 3 lower, node 4 high; the outer connectors curve down and up
const HX_LINKS = [{ chip: 'Connect', d: 1250, c: 1480, shape: 'down' }, { arrow: true, d: 2150, shape: 'flat' }, { chip: 'Act', d: 2560, c: 2780, shape: 'up' }];
const HX_CURVE = { down: 'M0 0C50 0 50 100 100 100', flat: 'M0 50H100', up: 'M0 100C50 100 50 0 100 0' };
function hxFlow() {
  const node = ([ic, t, d]) => `<div class="hx-node" role="listitem" style="--d:${d}ms"><span class="hx-node__ico">${icon(ic)}</span><span class="hx-node__t">${t}</span></div>`;
  // the dots twice: once drawn in, once lit by the light that runs along them (a window that slides over a still copy)
  const art = shape => `<span class="hx-link__art"><svg class="hx-link__curve" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${HX_CURVE[shape]}"/></svg><span class="hx-link__dots"></span></span>`;
  const link = (l, k) => `<div class="hx-link hx-link--${l.shape}${l.arrow ? ' hx-link--arrow' : ''}" aria-hidden="true" style="--d:${l.d}ms;--k:${k}">
      <span class="hx-link__track"><span class="hx-link__line">${art(l.shape)}</span><span class="hx-link__pulse">${art(l.shape)}</span></span>${l.arrow ? '<svg class="hx-link__head" viewBox="0 0 10 10"><path d="M3 1.5 7 5l-4 3.5"/></svg>' : ''}${l.chip ? `<span class="hx-chip" style="--c:${l.c}ms">${l.chip}</span>` : ''}
    </div>`;
  return `<div class="hx-flow" role="list" aria-label="How Sygnet works: devices and sensors connect to the edge and cloud platform, which feeds live dashboards and alerts, so your team acts on reports and decisions on mobile">
    ${HX_NODES.map((n, k) => node(n) + (HX_LINKS[k] ? link(HX_LINKS[k], k) : '')).join('\n    ')}
  </div>`;
}
// six dim tiles for the industries served; float slowly, follow the mouse a little (not on touch)
const HX_TILES = [['heart-pulse', 1.2, 7.2], ['graduation-cap', 0.7, 8.4], ['droplet', 1.0, 9.0], ['factory', 0.8, 7.8], ['bell', 1.3, 8.8], ['cpu', 0.6, 9.6]];
const hxTiles = () => HX_TILES.map(([ic, depth, dur], i) => `<span class="hx-tile hx-tile--${i + 1}" data-depth="${depth}" style="--d:${300 + [0, 140, 260, 360, 440, 500][i]}ms"><span class="hx-tile__in" style="--fd:${dur}s;--fo:-${(i * 1.7).toFixed(1)}s">${icon(ic)}</span></span>`).join('');
// header state, the parallax and resting the loops while the hero is off screen
const hxScript = `<script>(function(){var hx=document.querySelector('.hx');if(!hx)return;var d=document.documentElement,nav=document.querySelector('.nav--glass');
if(nav){var st=function(){nav.classList.toggle('is-stuck',scrollY>8)};st();addEventListener('scroll',st,{passive:true})}
if('IntersectionObserver' in window)new IntersectionObserver(function(es){hx.classList.toggle('hx--still',!es[0].isIntersecting)}).observe(hx);
if(d.dataset.motion==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
var tiles=[].slice.call(hx.querySelectorAll('.hx-tile')),tx=0,ty=0,x=0,y=0,raf=0;
function step(){x+=(tx-x)*.08;y+=(ty-y)*.08;tiles.forEach(function(t){var k=+t.dataset.depth*14;t.style.transform='translate3d('+(x*k).toFixed(2)+'px,'+(y*k).toFixed(2)+'px,0)'});raf=Math.abs(tx-x)+Math.abs(ty-y)>.002?requestAnimationFrame(step):0}
hx.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=hx.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;if(!raf)raf=requestAnimationFrame(step)});
hx.addEventListener('pointerleave',function(){tx=ty=0;if(!raf)raf=requestAnimationFrame(step)})})()</script>`;

// ---------------------------------------------------------------- home intro sections (site.css "home intro sections")
const HMC_HEX = '<svg class="hmc__hex" viewBox="0 0 40 44" aria-hidden="true"><path d="M20 1.5 38 11.75v20.5L20 42.5 2 32.25v-20.5z"/></svg>';
// One section per main page, in the header menu's order (data.mjs HOME). Every section keeps its eyebrow (the page's
// name), H2, intro line(s), its items and one "Explore <page>" button (48px), but each has its own layout so no two
// neighbours look alike, and only Products is a card grid:
//   Products     card grid (the product card family) + the rest of the range as a plain link list    white
//   Industries   tabbed viewer (the industry explorer, the /industries/ component)                     Mist
//   Platform     horizontal flow: five hexagon steps joined by chevrons                                Indigo band
//   Hardware     image-led feature row: the controller render bleeds to the left edge, list beside     white
//   Developer    icon strip: six capabilities in one row, no borders                                   Mist
//   Solutions    editorial two-column: sticky heading left, hairline rows right                        white
//   Resources    slim strip: one line, one button                                                      Mist
//   Partners     numbered list rows: 01 to 04, hairline dividers                                       white
//   Company      full-bleed Indigo statement, the mark's chevrons behind it                            Indigo band
//   Case studies centred statement                                                                     white
//   Contact      split: words left, a cut-corner contact sheet right                                   Mist
const exploreBtn = (href, name) => `<a class="btn btn--secondary hs__btn" href="${href}">Explore ${esc(name)}${ARROW}</a>`;
const hsAct = s => `<div class="hs__act">${exploreBtn(s.href, s.act || s.eyebrow)}</div>`;
const hsHead = (id, s) => `<div class="hs__text"${rv()}>${eyebrow(s.eyebrow)}<h2 id="${id}-h">${esc(s.h2)}${s.muted ? ` <span class="muted">${esc(s.muted)}</span>` : ''}</h2><p class="hs__intro">${esc(s.intro)}</p></div>`;
const hsNote = s => s.note ? `<p class="hs__note">${esc(s.note)}</p>` : '';
const hexIco = (ic, cls = 'hmc__ico') => `<span class="${cls}" aria-hidden="true">${HMC_HEX}${icon(ic)}</span>`;
const hsOpen = (s, cls) => `<section class="section hs hs--${s.layout} hs--${s.ground}${cls ? ' ' + cls : ''}" id="${s.id}" aria-labelledby="${s.id}-h"><div class="wrap">`;
const hsClose = '</div></section>';
// an item is [icon, title, small line, link]; linked ones carry the arrow
const linkOr = (href, cls, inner) => href ? `<a class="${cls}" href="${href}">${inner}${ARROW}</a>` : `<div class="${cls}">${inner}</div>`;

const HOME_LAYOUTS = {
  // the industry explorer under a two-column head (H2 left, intro right), the button after it
  tabs: s => `${hsOpen(s, 'hs--ix')}
  ${hsHead(s.id, s)}
  <div class="hs__body">${industryExplorer()}${hsNote(s)}</div>
  ${hsAct(s)}
${hsClose}\n${ixScript}`,
  // a large render on the render's own dark ground, bleeding to the left edge on a desktop; DOM: words, picture, list
  feature: s => `${hsOpen(s)}<div class="hwf">
  ${hsHead(s.id, s)}
  <div class="hwf__visual"${rv(1)}>${shot(s.img, undefined, { cls: 'hwf__shot' })}<svg class="hwf__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg></div>
  <div class="hwf__rest">
    <ul class="hwf__list" aria-label="${esc(s.eyebrow)} range">${s.items.map(([ic, t], k) => `<li${rv(k + 1)}>${hexIco(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
    ${hsNote(s)}
    ${hsAct(s)}
  </div>
</div>${hsClose}`,
  // one row of icons with a short label and line each, no borders
  strip: s => `${hsOpen(s)}<div class="hs__grid">
  ${hsHead(s.id, s)}
  <div class="hs__body">
    <ul class="dstrip" aria-label="${esc(s.eyebrow)} on Sygnet">${s.items.map(([ic, t, x], k) => `<li${rv(k)}>${hexIco(ic, 'dstrip__ico')}<b>${esc(t)}</b><span class="dstrip__x">${esc(x)}</span></li>`).join('')}</ul>
    ${hsNote(s)}
  </div>
  ${hsAct(s)}
</div>${hsClose}`,
  // heading and button stick on the left while the hairline rows scroll on the right
  editorial: s => `${hsOpen(s)}<div class="ed">
  <div class="ed__aside">${hsHead(s.id, s)}${hsAct(s)}</div>
  <ul class="ed__rows" aria-label="${esc(s.eyebrow)} by group">${s.items.map(([ic, t, x, href], k) => `<li${rv(k)}>${linkOr(href, 'ed__row', `<span class="ed__ico">${icon(ic)}</span><b>${esc(t)}</b><span class="ed__x">${esc(x)}</span>`)}</li>`).join('')}</ul>
</div>${hsClose}`,
  // one slim line: icon, words, button
  slim: s => `${hsOpen(s)}<div class="slim">
  ${hexIco(s.icon || 'file-text', 'slim__ico')}
  ${hsHead(s.id, s)}
  ${hsAct(s)}
</div>${hsClose}`,
  // large numerals, the name left, the detail right, a hairline between rows
  numbered: s => `${hsOpen(s)}<div class="hs__grid">
  ${hsHead(s.id, s)}
  <ol class="nrows hs__body" aria-label="${esc(s.eyebrow)} tiers">${s.items.map(([ic, t, x], k) => `<li${rv(k)}><span class="nrows__n" aria-hidden="true">0${k + 1}</span><span class="nrows__t">${icon(ic)}<b>${esc(t)}</b></span><span class="nrows__x">${esc(x)}</span></li>`).join('')}</ol>
  ${hsAct(s)}
</div>${hsClose}`,
  // a bold statement on Indigo, the strengths as one line of hexagon-marked words
  statement: s => `${hsOpen(s, 'ground-inverse band hs--band')}<div class="stm">
  ${hsHead(s.id, s)}
  <ul class="stm__list" aria-label="${esc(s.eyebrow)} strengths">${s.items.map(([ic, t], k) => `<li${rv(k)}>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
  ${hsAct(s)}
</div>${hsClose}`,
  // a short centred statement
  centre: s => `${hsOpen(s)}<div class="ctr">
  ${hsHead(s.id, s)}
  ${hsAct(s)}
</div>${hsClose}`,
  // words left; right, a cut-corner sheet of contact lines in large type
  split: s => `${hsOpen(s)}<div class="csplit">
  <div class="csplit__aside">${hsHead(s.id, s)}${hsAct(s)}</div>
  <ul class="csheet"${rv(1)} aria-label="${esc(s.eyebrow)} details">${s.items.map(([ic, t, x, href]) => `<li>${linkOr(href, 'csheet__row', `<span class="csheet__ico">${icon(ic)}</span><span class="csheet__t"><small>${esc(t)}</small><b>${esc(x)}</b></span>`)}</li>`).join('')}</ul>
</div>${hsClose}`,
};
const homeSection = s => HOME_LAYOUTS[s.layout](s);

// the five layers as one flow on the Indigo band: hexagon node, number, name, line; chevrons between (across on a
// desktop, down on a phone or tablet)
const LAYER_HEX = '<svg class="pflow__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg>';
const layerFlow = () => `<ol class="pflow">${LAYERS.map(([n, t], k) => `<li class="pflow__step"${rv(k)}><span class="pflow__node" aria-hidden="true">${LAYER_HEX}${icon(LAYER_ICONS[k])}</span><span class="pflow__n">0${k + 1}</span><b class="pflow__t">${n}</b><span class="pflow__x">${esc(t)}</span></li>`).join('')}</ol>`;

function homeIntros() {
  const P = HOME.products, L = HOME.platform;
  const products = `<section class="section hs hs--grid hs--white" id="products" aria-labelledby="products-h"><div class="wrap"><div class="hs__grid">
  ${hsHead('products', P)}
  <div class="hs__body">
    <ul class="pgrid pgrid--${priority.length}" role="list">${priority.map((p, k) => productCard(p, industryChips(p)).replace('<li>', `<li${rv(k % 3)}>`)).join('')}</ul>
    <div class="hrange"><p class="hrange__label" id="range-l">${esc(P.moreLabel)}</p>
    <ul class="hrange__list" aria-labelledby="range-l">${secondary.map((p, k) => `<li${rv(k)}><a href="${url.product(p.slug)}">${icon(p.icon)}<span>${esc(p.short)}</span>${ARROW}</a></li>`).join('')}</ul></div>
  </div>
  ${hsAct(P)}
</div></div></section>`;
  const platform = `<section class="section hs hs--flow ground-inverse band hs--band" id="platform" aria-labelledby="platform-h"><div class="wrap"><div class="hs__grid">
  ${hsHead('platform', L)}
  <div class="hs__body">${layerFlow()}</div>
  ${hsAct(L)}
</div></div></section>`;
  const [industries, ...rest] = HOME.sections.map(homeSection);
  return [products, industries, platform, ...rest].join('\n');
}
const homeRevealScript = `<script>(function(){var d=document.documentElement;
if(d.dataset.motion==='off'||!window.matchMedia||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var ev=['wheel','touchmove','keydown'],o={passive:true},armed=0,wait=[],raf=0;
function show(el){el.classList.add('rv-in');setTimeout(function(){el.classList.remove('rv-wait','rv-in')},900)}
function check(){raf=0;var h=innerHeight*.94;wait=wait.filter(function(el){if(el.getBoundingClientRect().top<h){show(el);return false}return true});if(!wait.length)removeEventListener('scroll',tick)}
function tick(){if(!raf)raf=requestAnimationFrame(check)}
function arm(){if(armed)return;armed=1;ev.forEach(function(t){removeEventListener(t,arm,o)});var h=innerHeight;
wait=[].filter.call(document.querySelectorAll('[data-rv]'),function(el){return el.getBoundingClientRect().top>h});
wait.forEach(function(el){el.classList.add('rv-wait')});addEventListener('scroll',tick,o);tick()}
ev.forEach(function(t){addEventListener(t,arm,o)});
addEventListener('beforeprint',function(){wait.forEach(function(el){el.classList.remove('rv-wait')});wait=[]})})()</script>`;

function home() {
  const body = `
<section class="hero hx" aria-labelledby="hero-h">
  <div class="hx__card">
    <div class="hx__art" aria-hidden="true"><span class="hx__hex"></span><span class="hx__arch"></span><span class="hx__arch hx__arch--2"></span>${hxTiles()}</div>
    <div class="hx__main">
      ${hxHeadline()}
      <div class="hx-ask"><a class="hx-btn" href="/contact/#demo">Request a Demo${ARROW}</a></div>
    </div>
    ${hxFlow()}
  </div>
</section>
${hxScript}

${homeIntros()}
${homeRevealScript}
`;
  return page({ path: '/', nav: 'home', glassNav: true, title: 'Sygnet IoT: nurse call, queue, school bell and water ATM systems', desc: `Sygnet IoT builds IoT products for hospitals, schools, mills and water projects: nurse call, queue management, school bells and water ATMs, on the Sygnet IoT Connect platform. ${SITE.line}.`, body });
}

// ---------------------------------------------------------------- products
// All products: a short centred intro and one grid of every product card, in the header menu's order (ui.mjs productCard:
// picture or hexagon, name, one line, link). No filters, no chips, no related-products block.
const NUM_WORD = { 10: 'Ten', 11: 'Eleven', 12: 'Twelve' };
function productsIndex() {
  const all = [...priority, ...secondary];
  const n = NUM_WORD[all.length] || String(all.length);
  const body = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">Products</p>
  <h1 id="hero-h">All Sygnet products</h1>
  <p class="t-lead">${n} products for hospitals, schools, mills, water projects, dairies and retail. Each carries the Sygnet name and runs on Sygnet IoT Connect.</p>
</div></section>
${section({ id: 'all', cls: 'pall' }, `<h2 id="all-h" class="sr-only">Every Sygnet product</h2>${productGrid(all)}`)}`;
  return page({ path: '/products/', nav: 'products', title: 'Sygnet IoT products: nurse call, queue management, bells, water ATM and vending', desc: `All ${n.toLowerCase()} Sygnet IoT products: NCS nurse call, QMS queue management, school bell and PA, Water ATM, Rural Water Center, Textile Connect, Energy Monitoring, Dairy Connect and vending machines.`, body });
}

function productPage(p) {
  const notice = `${p.soon ? 'Coming soon · ' : ''}${esc(p.code)} · for ${esc(p.industries.map(s => industryBySlug[s].name.toLowerCase()).slice(0, 3).join(', '))}`;
  const models = p.models.length ? p.models : [['All models', '', '']];
  const tiers = p.tiers ? `<div class="tbc"><p class="t-label muted">Tier names, to be confirmed</p><div class="chips">${p.tiers.map(t => `<span class="chip chip--static">${t}</span>`).join('')}</div><p class="t-small">${esc(p.tiersNote)}</p></div>` : '';

  const sections = [];
  sections.push(section({ id: 'parts' }, `${head('parts', p.partsHead[0], p.partsHead[1])}${cardRow(p.parts.map(([t, x]) => ({ title: t, text: x })))}`));
  if (!p.soon) {
    sections.push(section({ id: 'models' }, `${head('models', p.modelsHead ? p.modelsHead[0] : 'Models and specifications.', p.modelsHead ? p.modelsHead[1] : 'Catalogue in preparation.')}
<div class="grid grid--top"><div class="span-6 stack-5">${specs(models)}${tiers}</div><div class="span-6 start-7"><div class="panel-win">${WINDOWS[p.window](false)}</div></div></div>`));
  } else {
    sections.push(section({ id: 'interest' }, `${head('interest', 'Be first to hear when it launches.', 'Tell us what you want to measure.')}
<div class="grid grid--top"><div class="span-6 stack-5"><p class="t-lead">Write to us with the site and the equipment you want monitored, and we will come back when the catalogue is ready.</p><div class="btn-row">${btn('/contact/?product=energy-monitoring#demo', 'Register interest')}</div></div><div class="span-6 start-7">${specs([['Energy Monitoring', 'Catalogue in preparation', '']], 'Specifications')}</div></div>`));
  }
  sections.push(`<section class="section ground-inverse band" id="platform" aria-labelledby="platform-h"><div class="wrap">
${head('platform', `${p.name.replace('Sygnet ', '')} runs on Sygnet IoT Connect.`, 'The same platform under every Sygnet product.')}
<div class="grid grid--top"><div class="span-6 stack-5">${layersList(LAYERS.slice(0, 3))}<a class="link" href="/platform/">How the platform works</a></div>
<div class="span-6 start-7 stack-5"><p class="t-label muted">Used in</p><div class="chips">${industryLinks(p.industries)}</div><p class="t-label muted">Related products</p>${productLinks(PRODUCTS.filter(o => o.slug !== p.slug && o.industries.some(s => p.industries.includes(s))).slice(0, 2).map(o => o.slug))}</div></div>
</div></section>`);
  sections.push(section({ id: 'benefits' }, `${head('benefits', p.benefitsHead[0], p.benefitsHead[1])}${cardRow(p.benefits.map(([t, x]) => ({ title: t, text: x })))}`));
  if (p.faq.length) sections.push(section({ id: 'faq' }, `<div class="grid grid--top"><div class="span-5"><div class="section-head"><h2 id="faq-h">Questions about ${esc(p.short)}. <span class="muted">Answered from what we build today.</span></h2></div></div><div class="span-6 start-7">${faq(p.faq)}</div></div>`));


  const body = `${heroSplit({ notice, h1: p.h1, lead: p.lead, visual: productVisual(p), actions: p.soon ? `${btn('/contact/?product=energy-monitoring#demo', 'Register interest')}${btn('/industries/energy/', 'See Energy Connect', 'secondary')}` : undefined })}
${sections.join('\n')}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: p.soon ? { h2: 'Tell us what you want to measure', label: 'Register interest', href: '/contact/?product=energy-monitoring#demo' } : { h2: `See ${p.short} working on your site`, label: 'Request a demo', href: `/contact/?product=${p.slug}#demo` } });
}

// ---------------------------------------------------------------- School Bell & PA (p.viewer): a model viewer
// Short intro, then one viewer: product detail left, the device on Mist right (4:3). All five panels are in the
// HTML, stacked, so search engines and visitors without script read every model; the script (bellScript) turns
// them into tabs: one panel shown, a row of five model cards under it (role=tablist), a 200 ms opacity
// cross-fade, the URL hash (#tbg ... #tbw-d) kept in step, arrow keys between cards. Then the ecosystem, the
// range's benefits and the comparison, whose column heads open that model in the viewer. site.css "bell page".
const BHEX = '<svg class="bv__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg>';
function bellImg(id, { alt, eager = false, cls = '' } = {}) {
  const m = SIZE[id], c = CATALOG[id];
  if (!m || !c) throw new Error(`catalog image not found: ${id}`);
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/catalog/${id}.webp" alt="${esc(alt ?? c.alt)}" width="${m.w}" height="${m.h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async" data-source="client-catalog">`;
}
// the page-1 cut-outs are enlarged 2x from small catalogue crops: show them at most 1.6x their source pixels;
// the TBG (page 2, larger) at most 400 px tall, so the five sit at a like size
const bellCap = id => { const m = SIZE[id], k = /enlarged/.test(m.source || '') ? 0.8 : 400 / m.h; return `--capw: ${Math.round(m.w * k)}px; --caph: ${Math.round(m.h * k)}px`; };
// the bell app's home screen, drawn in HTML from the catalogue's phone (p. 1, p. 8); times and file names are examples
const BAPP_ROWS = [['07:00 AM', 'Prayer_1.mp3'], ['08:00 AM', 'Bell01.mp3'], ['09:00 AM', 'Bell01.mp3'], ['09:30 AM', 'Bell01.mp3'], ['10:30 AM', 'Bell01.mp3'], ['11:30 AM', 'Bell01.mp3']];
const bellApp = () => `<div class="bapp" role="img" aria-label="Illustration of the Sygnet bell app home screen: today's bell times, each with the audio file it plays, and Home, Announce and Settings tabs">
  <div class="bapp__phone"><div class="bapp__screen">
    <div class="bapp__status"><span>9:41</span><span class="bapp__sig">${icon('wifi')}</span></div>
    <p class="bapp__h">Home</p>
    <div class="bapp__days">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => `<span${i === 2 ? ' class="is-on"' : ''}>${i === 2 ? 'Today' : d}</span>`).join('')}</div>
    <ul class="bapp__list">${BAPP_ROWS.map(([t, f]) => `<li><span class="bapp__bell">${icon('bell')}</span><b>${t}</b><span class="bapp__file">${icon('music')}${f}</span></li>`).join('')}</ul>
    <div class="bapp__nav"><span class="is-on">${icon('house')}Home</span><span>${icon('megaphone')}Announce</span><span>${icon('settings')}Settings</span></div>
  </div></div>
  <span class="shot__tag">Illustrative screen</span>
</div>`;
// the viewer's behaviour; without it the five panels stay stacked and the model row stays hidden
const bellScript = `<script>(function(){
var root=document.querySelector('[data-bv]');if(!root)return;
var list=root.querySelector('[role=tablist]'),tabs=[].slice.call(list.querySelectorAll('[role=tab]'));
var panels=tabs.map(function(t){return document.getElementById(t.getAttribute('aria-controls'))});
var ids=panels.map(function(p){return p.id}),stage=root.querySelector('.bv__stage'),cur=-1;
var narrow=matchMedia('(max-width: 1023px)'),still=matchMedia('(prefers-reduced-motion: reduce)');
function calm(){return still.matches||document.documentElement.dataset.motion==='off'}
root.classList.add('bv--js');list.hidden=false;
panels.forEach(function(p,i){p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',tabs[i].id)});
function navH(){var n=document.querySelector('.nav');return n?n.getBoundingClientRect().height:0}
function bring(force){var r=stage.getBoundingClientRect(),m=panels[cur].querySelector('.bv__media').getBoundingClientRect();
 if(force||m.top<navH()||m.top>innerHeight-120){root.scrollIntoView({behavior:calm()?'auto':'smooth',block:'start'})}}
function show(i,o){o=o||{};if(i<0||i>=tabs.length)return;
 if(o.instant||calm())root.classList.add('bv--instant');
 tabs.forEach(function(t,k){var on=k===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;t.classList.toggle('is-active',on);
  panels[k].classList.toggle('is-active',on);if(on)panels[k].removeAttribute('inert');else panels[k].setAttribute('inert','')});
 cur=i;if(o.hash&&location.hash!=='#'+ids[i])history.replaceState(null,'','#'+ids[i]);
 if(o.instant||calm())requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove('bv--instant')})});}
tabs.forEach(function(t,i){t.addEventListener('click',function(e){e.preventDefault();var same=i===cur;show(i,{hash:true});if(!same&&narrow.matches)bring(false)})});
list.addEventListener('keydown',function(e){var k=e.key,n=tabs.length,i=cur;
 if(k==='ArrowRight'||k==='ArrowDown')i=(cur+1)%n;else if(k==='ArrowLeft'||k==='ArrowUp')i=(cur-1+n)%n;else if(k==='Home')i=0;else if(k==='End')i=n-1;else return;
 e.preventDefault();show(i,{hash:true});tabs[i].focus();tabs[i].scrollIntoView({block:'nearest',inline:'nearest',behavior:calm()?'auto':'smooth'})});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-bv-go]');if(!a)return;var i=ids.indexOf(a.getAttribute('data-bv-go'));if(i<0)return;
 e.preventDefault();show(i,{hash:true});bring(true);tabs[i].focus({preventScroll:true})});
function fromHash(){var i=ids.indexOf(location.hash.slice(1));return i}
var start=fromHash();show(start<0?0:start,{instant:true});
addEventListener('hashchange',function(){var i=fromHash();if(i>=0&&i!==cur){show(i);bring(true)}});
})()</script>`;

function bellPage(p) {
  const notice = `${esc(p.code)} · for ${esc(p.industries.map(s => industryBySlug[s].name.toLowerCase()).slice(0, 3).join(', '))}`;
  const demo = `/contact/?product=${p.slug}#demo`;
  const M = p.range;

  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${notice}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      <p class="bv__p">${esc(m.text)}</p>
      <h3 class="bv__label">Features</h3>
      ${checks(m.features)}
      ${m.apps ? `<h3 class="bv__label">Applications</h3><ul class="bv__apps">${m.apps.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
      <div class="bv__best"><span class="bv__best-ico">${BHEX}${icon('school')}</span><div><h3 class="bv__label">Best for</h3><p>${esc(m.best)}</p></div></div>
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media" style="${bellCap(m.img)}">${bellImg(m.img, { eager: i === 0 })}<span class="shot__tag">Product render</span></div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      <span class="bv__thumb">${bellImg(m.img, { alt: '' })}</span><span class="bv__tcode">${esc(m.code)}</span><span class="bv__tname">${esc(m.name)}</span></a>`;
  const viewer = `<section class="section bv-sec" id="models" aria-label="The five models">
<div class="wrap"><div class="bv" data-bv>
  <div class="bv__stage">
  ${M.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs" role="tablist" aria-label="Choose a model" hidden>
    ${M.map(tab).join('\n    ')}
  </div>
</div></div>
</section>`;

  const [speaker, app] = p.ecosystem;
  const ecoCard = (e, media) => `<article class="card span-6 m-nolift beco">${media}<h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${checks(e.features)}</article>`;
  const ecosystem = section({ id: 'ecosystem' }, `${head('ecosystem', 'Complete ecosystem.', 'Speakers and an app that work across the range.')}
<div class="grid grid--cards">${ecoCard(speaker, `<div class="beco__media beco__media--shot">${bellImg(speaker.img)}<span class="shot__tag">Product render</span></div>`)}${ecoCard(app, `<div class="beco__media beco__media--app">${bellApp()}</div>`)}</div>`);

  const benefits = section({ id: 'benefits' }, `${head('benefits', 'Benefits of the whole range.', 'What every school gets from Sygnet bells.')}
<ul class="bben">${p.benefits.map(([ic, t, x]) => `<li><span class="bben__ico">${icon(ic)}</span><span><b>${esc(t)}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>
<ul class="bstr" aria-label="Strengths of the range">${p.strengths.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
<p class="bline">One system. <span>Complete campus communication.</span></p>`);

  const c = p.compare;
  const yes = `<span class="cmp cmp--y">${icon('check')}<span class="sr-only">Yes</span></span>`;
  const no = `<span class="cmp-no">No</span>`;
  const compare = section({ id: 'compare' }, `${head('compare', 'Compare the five models.', 'Select a model to open it above.')}
<div class="compare compare--bell" tabindex="0" role="region" aria-labelledby="compare-h"><table>
<thead><tr><th scope="col">Feature</th>${M.map(m => `<th scope="col"><a class="cmp-h" href="#${m.id}" data-bv-go="${m.id}"><span class="cmp-h__code">${esc(m.code)}</span><span class="cmp-h__name">${esc(m.name)}</span></a></th>`).join('')}</tr></thead>
<tbody>${c.rows.map(([f, v]) => `<tr><th scope="row">${esc(f)}</th>${v.map(b => `<td>${b ? yes : no}</td>`).join('')}</tr>`).join('')}
<tr class="cmp-best"><th scope="row">Best for</th>${M.map(m => `<td>${esc(m.bestShort)}</td>`).join('')}</tr></tbody></table></div>
<p class="compare__note">${esc(c.note)}</p>
<p class="babout">${esc(p.about)}</p>`);

  const body = `${intro}\n${viewer}\n${bellScript}\n${ecosystem}\n${benefits}\n${compare}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: `See ${p.short} working on your site`, label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- Dairy Connect (p.layout 'dairy')
// Built from the School Bell & PA page's parts: the centred intro (.bintro), the model viewer (.bv, bellScript:
// two panels, #community and #mobile, both in the HTML so the page reads in full without script), the benefit list
// (.bben), the strip (.bstr), the closing line (.bline) and the comparison (.compare--bell). Then the catalogue's
// sections in its order. Screens are drawn in HTML and tagged "Illustrative screen": states only, no figures.
// site.css "dairy page".
const DHEX = '<svg class="dfut__hex" viewBox="0 0 104 112" aria-hidden="true"><path d="M52 3 100 30.5v51L52 109 4 81.5v-51z"/></svg>';
const dItems = (list, cls = '') => `<ul class="bben${cls ? ' ' + cls : ''}">${list.map(([ic, t, x]) => `<li><span class="bben__ico">${icon(ic)}</span><span><b>${esc(t)}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>`;
const dStrip = (list, label, cls = '') => `<ul class="bstr${cls ? ' ' + cls : ''}" aria-label="${esc(label)}">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>`;
const winBar = title => `<div class="win__bar"><span class="win__dots"><i></i><i></i><i></i></span><span class="win__title">${esc(title)}</span><span class="win__tag">Illustrative screen</span></div>`;
// a status written out with its own icon, so it never rests on colour
const ATM_ST = { ok: ['circle-check', 'Online'], low: ['triangle-alert', 'Low milk'], door: ['lock-open', 'Door open'] };
const atmSt = k => `<em class="atm__st atm__st--${k}">${icon(ATM_ST[k][0])}${ATM_ST[k][1]}</em>`;
const ATM_ROWS = [['store', 'Society gate kiosk', 'Community Milk ATM', 'ok'], ['store', 'Village centre kiosk', 'Community Milk ATM', 'low'],
  ['truck', 'East colonies route', 'Mobile Milk ATM', 'ok'], ['store', 'Collection centre kiosk', 'Community Milk ATM', 'door']];
const atmBoard = () => `<div class="win win--atm" role="img" aria-label="Illustration of the Milk ATM network screen: four machines, two online, one low on milk and one with its door open, and a low milk alert sent to the operator">
  ${winBar('Milk ATM network · Today')}
  <div class="win__body"><ul class="atm">${ATM_ROWS.map(([ic, n, k, st]) => `<li class="atm__row atm__row--${st}"><span class="atm__ico">${icon(ic)}</span><span class="atm__who"><b>${n}</b><span>${k}</span></span>${atmSt(st)}</li>`).join('')}</ul>
  <p class="atm__foot">${icon('bell-ring')}Low milk alert sent to the operator</p></div>
</div>`;
// one machine's detail on the operator's phone (p. 11), as words: the catalogue's readings are not used
const MDET = [['thermometer', 'Milk temperature', 'Normal'], ['gauge', 'Tank level', 'Low'], ['lock', 'Door', 'Closed'], ['plug-zap', 'Power', 'Normal'], ['antenna', 'GSM', 'Connected'], ['activity', 'Machine health', 'Good']];
const machinePhone = () => `<div class="bapp" role="img" aria-label="Illustration of a machine detail screen on the operator's phone: the village centre kiosk is online with a low milk alert; temperature, power and machine health normal, door closed, GSM connected">
  <div class="bapp__phone"><div class="bapp__screen">
    <div class="bapp__status"><span>9:41</span><span class="bapp__sig">${icon('signal')}</span></div>
    <p class="bapp__h">Village centre kiosk</p>
    <p class="mdet__on">${icon('circle-check')}Online</p>
    <p class="mdet__alert">${icon('triangle-alert')}Low milk stock</p>
    <ul class="mdet">${MDET.map(([ic, t, v]) => `<li>${icon(ic)}<span>${t}</span><b>${v}</b></li>`).join('')}</ul>
  </div></div>
  <span class="shot__tag">Illustrative screen</span>
</div>`;

function dairyPage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const M = p.range;

  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      <p class="bv__p">${esc(m.text)}</p>
      <h3 class="bv__label">Key benefits</h3>
      ${checks(m.benefits)}
      <h3 class="bv__label">Ideal for</h3>
      <ul class="bv__apps">${m.ideal.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      <div class="bv__best"><span class="bv__best-ico">${BHEX}${icon('map-pin')}</span><div><h3 class="bv__label">Locations</h3><p>${esc(m.where)}</p></div></div>
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media" style="${bellCap(m.img)}">${bellImg(m.img, { eager: i === 0 })}<span class="shot__tag">Product render</span></div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      <span class="bv__thumb">${bellImg(m.img, { alt: '' })}</span><span class="bv__ttext"><span class="bv__tcode">${esc(m.code)}</span><span class="bv__tname">${esc(m.tab)}</span></span></a>`;
  const viewer = `<section class="section bv-sec" id="models" aria-label="The two Milk ATM models">
<div class="wrap"><div class="bv" data-bv>
  <div class="bv__stage">
  ${M.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--2" role="tablist" aria-label="Choose a model" hidden>
    ${M.map(tab).join('\n    ')}
  </div>
</div></div>
</section>`;

  const how = section({ id: 'how' }, `${head('how', 'How it works.', 'From the tap to the report.')}
<ol class="dsteps">${p.how.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>
<div class="dmon">
  <div class="dmon__copy"><h3>Central monitoring with Sygnet IoT Connect</h3><p>Monitor all your Milk ATMs, sales, inventory and performance from a single dashboard.</p></div>
  <div class="dmon__screen">${atmBoard()}</div>
</div>
<p class="bline">One system. Complete control. <span>Anywhere. Anytime.</span></p>`);

  const pay = section({ id: 'payments' }, `${head('payments', 'Cashless dairy distribution.', 'A digital payment ecosystem.')}
<h3 class="dlabel">Payment methods</h3>
<ul class="dpay">${p.payMethods.map(([ic, t, x]) => `<li><span class="dpay__ico">${icon(ic)}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>
<h3 class="dlabel">Benefits</h3>
${dItems(p.payBenefits, 'bben--4')}
<h3 class="dlabel">The platform also supports</h3>
${dItems(p.paySupports)}`);

  const listCard = (label, list, cls) => `<div class="dcard ${cls}"><h3 class="dlabel">${label}</h3><ul class="dlist">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul></div>`;
  const monitor = section({ id: 'monitoring' }, `${head('monitoring', 'IoT smart monitoring.', 'Every machine, every moment.')}
<div class="dmon3">
  ${listCard('Monitor', p.monitor, 'dcard--mon')}
  <div class="dcard dcard--phone">${machinePhone()}</div>
  ${listCard('Alerts', p.alerts, 'dcard--alert')}
</div>
${dStrip(p.monitorHi, 'What monitoring gives you')}`);

  const command = `<section class="section ground-inverse band" id="command" aria-labelledby="command-h"><div class="wrap">
${head('command', 'Centralized command center.', 'The RSMS dashboard.')}
<h3 class="dlabel">Management can monitor</h3>
<ul class="dwatch">${p.rsmsWatch.map(t => `<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}</ul>
<h3 class="dlabel">Five modules</h3>
<ol class="lcards">${p.rsmsModules.map(([ic, t, x], k) => `<li class="lcard"><span class="lcard__ico">${HEX}${icon(ic)}</span><span class="lcard__n">0${k + 1}</span><b class="lcard__t">${esc(t)}</b><span class="lcard__x">${esc(x)}</span></li>`).join('')}</ol>
<p class="bline">One platform. <span>Complete control. Smarter decisions.</span></p>
</div></section>`;

  const quality = section({ id: 'quality' }, `${head('quality', 'Milk quality assurance.', 'Designed to keep milk fresh.')}
<div class="dq">
  <div class="dq__media">${bellImg('dairy-tank-cut')}<span class="shot__tag">Product render</span></div>
  ${dItems(p.quality, 'bben--2')}
</div>`);

  const env = section({ id: 'environment' }, `${head('environment', 'Environmental benefits.', 'Less plastic, less waste.')}
${dItems(p.environment)}`);

  const fItem = ([ic, t, x, road]) => `<li class="dfut__i"><span class="dfut__ico">${icon(ic)}</span><span class="dfut__txt"><b>${esc(t)}</b>${road ? '<span class="chip-soon">Roadmap</span>' : ''}<span class="dfut__x">${esc(x)}</span></span></li>`;
  const future = section({ id: 'future' }, `${head('future', 'A future-ready dairy ecosystem.', 'On Sygnet IoT Connect.')}
<div class="dfut">
  <ul class="dfut__col dfut__col--l" aria-label="Available">${p.future.filter(f => !f[3]).map(fItem).join('')}</ul>
  <div class="dfut__hub" aria-hidden="true">${DHEX}<img src="/img/brand/sygnet-mark.svg" alt="" width="148" height="186"><span>Sygnet IoT Connect</span></div>
  <ul class="dfut__col dfut__col--r" aria-label="On the roadmap">${p.future.filter(f => f[3]).map(fItem).join('')}</ul>
</div>
<p class="compare__note">Items marked Roadmap are planned and not live yet.</p>`);

  const c = p.compare;
  const cell = (t, y) => `<td><span class="dcmp dcmp--${y ? 'y' : 'n'}">${icon(y ? 'check' : 'minus')}<span>${esc(t)}</span></span></td>`;
  const compare = section({ id: 'compare' }, `${head('compare', 'Traditional milk distribution vs Sygnet Milk ATM.', 'Side by side.')}
<div class="compare compare--bell compare--dairy" tabindex="0" role="region" aria-labelledby="compare-h"><table>
<thead><tr><th scope="col">Parameter</th><th scope="col"><span class="cmp-h cmp-h--static"><span class="cmp-h__code">Traditional</span><span class="cmp-h__name">Booths, vendors, home delivery</span></span></th><th scope="col"><span class="cmp-h cmp-h--static"><span class="cmp-h__code">Sygnet Milk ATM</span><span class="cmp-h__name">Automated, connected</span></span></th></tr></thead>
<tbody>${c.rows.map(([f, t, s]) => `<tr><th scope="row">${esc(f)}</th>${cell(t, false)}${cell(s, true)}</tr>`).join('')}</tbody></table></div>
<p class="compare__note">${esc(c.note)}</p>
<p class="babout">${esc(p.about)}</p>`);

  const body = `${intro}\n${viewer}\n${bellScript}\n${how}\n${pay}\n${monitor}\n${command}\n${quality}\n${env}\n${future}\n${compare}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'See Dairy Connect working for your dairy', line: 'Tell us how your dairy sells milk today and we will show you the Milk ATMs on your own use case.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- Nurse Call System (p.layout 'ncs')
// The School Bell & PA page's structure: centred intro (.bintro), the viewer (.bv, bellScript) with three tiers
// (#plus, #professional, #enterprise; all three panels in the HTML so the page reads in full without script),
// then typical set-ups, how a call works (.dsteps), shared benefits (.bben), trust as text, and the comparison
// last (.compare--bell; its column heads open that tier above). Each tier lists its components as small cards,
// one catalogue picture each (build/tools/cutout_ncs.py). Client rules: no accreditation or compliance claim, set-ups never mapped
// to a tier, no invented figures. site.css "nurse call page".
// the viewer's lead device: shown at up to its 2x cut-out size (sources are small catalogue crops)
const ncsCap = id => { const m = SIZE[id]; return `--capw: ${m.w}px; --caph: ${m.h}px`; };
function ncsPage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const M = p.range;

  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  const wired = `<p class="nwire">${icon('cable')}<span>Available in wired and wireless options</span></p>`;
  const features = `<ul class="nkf">${p.features.map(([ic, t, x]) => `<li><span class="nkf__ico">${icon(ic)}</span><span><b>${esc(t)}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>`;
  const part = key => {
    const [name, img] = p.parts[key];
    return `<li class="npart"><span class="npart__media">${bellImg(img)}${CATALOG[img].render ? '<span class="npart__tag">Render</span>' : ''}</span><span class="npart__t">${esc(name)}</span></li>`;
  };
  const cols = n => (n % 4 === 0 || n === 7 ? 4 : 3);
  const groups = m => m.groups.map(([label, keys]) => `<h3 class="bv__label">${esc(label)}</h3>
      <ul class="nparts__grid" style="--n: ${cols(keys.length)}">${keys.map(part).join('')}</ul>`).join('\n      ');

  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      ${wired}
      <h3 class="bv__label">Key features</h3>
      ${features}
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media" style="${ncsCap(m.img)}">${bellImg(m.img, { eager: i === 0 })}<span class="shot__tag">Product render</span></div>
    <div class="nparts">
      ${groups(m)}
      ${m.note ? `<p class="compare__note">${esc(m.note)}</p>` : ''}
    </div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      <span class="bv__thumb">${bellImg(m.img, { alt: '' })}</span><span class="bv__ttext"><span class="bv__tcode">${esc(m.code)}</span><span class="bv__tname">${esc(m.name)}</span></span></a>`;
  const viewer = `<section class="section bv-sec" id="tiers" aria-label="The three NCS tiers">
<div class="wrap"><div class="bv bv--ncs" data-bv>
  <div class="bv__stage">
  ${M.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--3" role="tablist" aria-label="Choose a tier" hidden>
    ${M.map(tab).join('\n    ')}
  </div>
</div></div>
</section>`;

  const setups = section({ id: 'setups' }, `${head('setups', 'Typical set-ups.', 'Four reference wards.')}
<ul class="nset">${p.setups.map(([ic, t, beds, x]) => `<li><span class="bben__ico">${icon(ic)}</span><span class="nset__t">${esc(t)}</span><b>${esc(beds)}</b><span class="nset__x">${esc(x)}</span></li>`).join('')}</ul>
<p class="compare__note">Which tier suits which ward size is confirmed with you during the demo.</p>`);

  const how = section({ id: 'how' }, `${head('how', 'How a call works.', 'From the bed to the record.')}
<ol class="dsteps dsteps--4">${p.how.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>`);

  const benefits = section({ id: 'benefits' }, `${head('benefits', 'Benefits on every ward.', 'What the hospital gets from Sygnet nurse call.')}
<ul class="bben">${p.benefits.map(([ic, t, x, only]) => `<li><span class="bben__ico">${icon(ic)}</span><span><b>${esc(t)}${only ? ` <span class="nonly">${esc(only)}</span>` : ''}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>`);

  const trust = section({ id: 'trust', cls: 'trust' }, `${head('trust', 'Hospitals using Sygnet nurse call.')}
<div class="grid grid--top">
  <div class="span-7 stack-4">${hospitalList()}<p class="t-small muted">Client list as provided by Sygnet. Logos shown with permission once received.</p></div>
  <div class="span-4 start-9 stack-4"><h3 class="bv__label">Company credentials</h3>${certBadges()}<p class="t-small muted">As listed in the Sygnet catalog.</p></div>
</div>`);

  const c = p.compare;
  const cell = v => v === false
    ? `<td><span class="dcmp dcmp--n">${icon('minus')}<span>No</span></span></td>`
    : `<td><span class="dcmp dcmp--y">${icon('check')}<span>${esc(v === true ? 'Yes' : v)}</span></span></td>`;
  const compare = section({ id: 'compare' }, `${head('compare', 'Compare the three tiers.', 'Select a tier to open it above.')}
<div class="compare compare--bell compare--ncs" tabindex="0" role="region" aria-labelledby="compare-h"><table>
<thead><tr><th scope="col">Component</th>${M.map(m => `<th scope="col"><a class="cmp-h" href="#${m.id}" data-bv-go="${m.id}"><span class="cmp-h__code">${esc(m.name)}</span><span class="cmp-h__name">${esc(m.code)}</span></a></th>`).join('')}</tr></thead>
<tbody>${c.rows.map(([f, v]) => `<tr><th scope="row">${esc(f)}</th>${v.map(cell).join('')}</tr>`).join('')}</tbody></table></div>
<p class="compare__note">${esc(c.note)}</p>
<p class="babout">${esc(p.about)}</p>`);

  const body = `${intro}\n${viewer}\n${bellScript}\n${setups}\n${how}\n${benefits}\n${trust}\n${compare}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'See Sygnet nurse call on your ward', line: 'Tell us about your wards and we will walk you through the three tiers.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- Queue Management System (p.layout 'qms')
// The School Bell & PA page's structure: centred intro (.bintro), the viewer (.bv, bellScript) with three tiers
// (#lite, #professional, #enterprise; all three panels in the HTML so the page reads in full without script), the
// customer journey (.dsteps), the feature blocks (.qf: words beside a device picture or a small screen drawn in HTML
// and tagged "Illustrative screen"), where it is used, and the comparison last (.compare--bell; its column heads
// open that tier above). Screens carry sample tokens only: no waiting times, counts, ratings or names.
// Client rules: three tiers only; no "Challenge" or "Why Sygnet" slide; no related products; no invented figures.
// site.css "queue management page".
const TK = ['C-27', 'C-28', 'C-29', 'C-30', 'C-31', 'C-19'];   // sample tokens for the drawn screens
const qItems = (list, cls = '') => `<ul class="qi${cls ? ' ' + cls : ''}">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>`;
const qPoints = list => `<ul class="nkf">${list.map(([ic, t, x]) => `<li><span class="nkf__ico">${icon(ic)}</span><span><b>${esc(t)}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>`;
const qLabel = t => `<h4 class="qf__label">${esc(t)}</h4>`;
const qPhone = (label, inner) => `<div class="bapp qph" role="img" aria-label="${esc(label)}">
  <div class="bapp__phone"><div class="bapp__screen">
    <div class="bapp__status"><span>9:41</span><span class="bapp__sig">${icon('wifi')}</span></div>
    ${inner}
  </div></div>
  <span class="shot__tag">Illustrative screen</span>
</div>`;
const qWin = (key, title, label, inner, dark = false) => `<div class="win win--${key}${dark ? ' win--dark' : ''}" role="img" aria-label="${esc(label)}">${winBar(title)}<div class="win__body">${inner}</div></div>`;
// one feature block: words left, picture or screen right (flip swaps them on wide screens)
const qBlock = ({ id, n, title, lead, body, media, flip = false, cls = '' }) => `<article class="qf${flip ? ' qf--flip' : ''}${cls ? ' ' + cls : ''}" id="${id}" aria-labelledby="${id}-h">
  <div class="qf__text"><p class="bv__code">${n}</p><h3 class="qf__h" id="${id}-h">${esc(title)}</h3><p class="qf__lead">${esc(lead)}</p>${body}</div>
  <div class="qf__media">${media}</div>
</article>`;

const QS = {
  ticket: () => qPhone('Illustration of a digital token on a phone: token C-27 for OPD, with the estimated waiting time and a note that the visitor will be notified', `
    <p class="bapp__h">Your token</p>
    <div class="qph__tok"><span>Token</span><b>${TK[0]}</b><span>OPD</span></div>
    <div class="qph__row">${icon('clock')}<span>Estimated waiting time</span><em>Live</em></div>
    <div class="qph__note">${icon('bell-ring')}<span>We will notify you when your turn is near.</span></div>`),
  virtual: () => qPhone('Illustration of the virtual queue on a phone: token C-27 has joined and is waiting, with near you and served still to come', `
    <p class="bapp__h">Live queue</p>
    <div class="qph__tok"><span>Your token</span><b>${TK[0]}</b><span>OPD</span></div>
    <ol class="qph__steps"><li class="is-done">${icon('check')}<span>Joined</span></li><li class="is-now">${icon('clock')}<span>Waiting</span></li><li>${icon('map-pin')}<span>Near you</span></li><li>${icon('circle-check')}<span>Served</span></li></ol>
    <div class="qph__note">${icon('bell-ring')}<span>Come in when we tell you your turn is near.</span></div>`),
  booking: () => qWin('qbook', 'Book an appointment', 'Illustration of appointment booking: steps service, doctor, slot and confirm; General medicine chosen; a morning, afternoon or evening slot; a Confirm appointment button', `
    <ol class="qbook__steps"><li class="is-done">Service</li><li class="is-done">Doctor</li><li class="is-now">Slot</li><li>Confirm</li></ol>
    <ul class="qbook__list"><li class="is-on">${icon('stethoscope')}<span>General medicine</span>${icon('check')}</li><li>${icon('heart-pulse')}<span>Cardiology</span></li><li>${icon('baby')}<span>Paediatrics</span></li></ul>
    <p class="qbook__p">Choose a slot</p>
    <div class="qbook__slots"><span>Morning</span><span class="is-on">Afternoon</span><span>Evening</span></div>
    <span class="qbook__btn">Confirm appointment</span>`),
  notify: () => `<div class="qnote" role="img" aria-label="Illustration of three alerts for token C-27: an SMS that the token is issued, a WhatsApp message that the turn is near, and an email that the counter has called the token">
    <div class="qnote__m"><span class="qnote__ico">${icon('message-square-text')}</span><span><b>SMS · Token issued</b><span>Your token ${TK[0]} for OPD is confirmed.</span></span></div>
    <div class="qnote__m"><span class="qnote__ico qnote__ico--wa">${icon('message-circle')}</span><span><b>WhatsApp · Queue position</b><span>Your turn is near. Please come to the waiting area.</span></span></div>
    <div class="qnote__m"><span class="qnote__ico">${icon('mail')}</span><span><b>Email · Counter called</b><span>Token ${TK[0]} has been called. Please go to your counter.</span></span></div>
    <span class="shot__tag">Illustrative screen</span>
  </div>`,
  display: () => qWin('qdisp', 'Waiting hall · Display', 'Illustration of a queue display: now serving C-27 at counter 2, next C-28, missed C-19, waiting C-29 to C-31, and a space for your own video or message', `
    <div class="qdisp">
      <div class="qdisp__now"><p>Now serving</p><b>${TK[0]}</b><span>Counter 2</span></div>
      <div class="qdisp__side">
        <div><p>Next</p><b>${TK[1]}</b></div>
        <div class="qdisp__miss"><p>${icon('circle-alert')}Missed</p><b>${TK[5]}</b></div>
        <div class="qdisp__wait"><p>Waiting</p><b>${TK[2]} · ${TK[3]} · ${TK[4]}</b></div>
      </div>
      <div class="qdisp__promo">${icon('circle-play')}<span>Your videos, health messages or branding here</span></div>
    </div>`, true),
  console: () => qWin('qcon', 'Counter console · Counter 2', 'Illustration of the operator console: token C-27 is being served with buttons for call next, recall, forward, skip, absent and attended; C-28 and C-29 wait; a jump token button', `
    <div class="qcon__now"><span><p>Serving</p><b>${TK[0]}</b></span>
      <ul class="qcon__acts">${[['phone', 'Call next'], ['rotate-ccw', 'Recall'], ['arrow-right', 'Forward'], ['skip-forward', 'Skip'], ['user', 'Absent'], ['circle-check', 'Attended']].map(([ic, t], k) => `<li${k === 0 ? ' class="is-main"' : ''}>${icon(ic)}<span>${t}</span></li>`).join('')}</ul></div>
    <ul class="qcon__list"><li><b>${TK[1]}</b><span>Waiting</span></li><li><b>${TK[2]}</b><span>Waiting</span></li></ul>
    <span class="qcon__jump">Jump token ${icon('arrow-up')}</span>`),
  branches: () => qWin('qbr', 'All branches · Live', 'Illustration of the multi-branch view: main branch and city branch live, east branch busy, each with its departments', `
    <ul class="qbr">${[['Main branch', 'OPD · Billing · Pharmacy', 'ok', 'Live'], ['City branch', 'OPD · Laboratory', 'ok', 'Live'], ['East branch', 'Billing · Pharmacy', 'busy', 'Busy']].map(([n, d, s, w]) => `<li><span class="qbr__ico">${icon('building-2')}</span><span class="qbr__who"><b>${n}</b><span>${d}</span></span><em class="qbr__st qbr__st--${s}">${icon(s === 'ok' ? 'circle-check' : 'triangle-alert')}${w}</em></li>`).join('')}</ul>
    <p class="qbr__foot">${icon('settings')}Queues, counters and settings changed from here</p>`),
  reports: (p) => qWin('qrep', 'Reports', 'Illustration of the reports screen: report types listed, filters by date, branch and department, and export to PDF, Excel or CSV', `
    <div class="qrep__filters">${['Date', 'Branch', 'Department'].map(t => `<span>${icon('filter')}${t}</span>`).join('')}</div>
    <ul class="qrep__list">${p.reports.map((t, k) => `<li${k === 3 ? ' class="is-on"' : ''}>${icon(k < 3 ? 'calendar' : 'chart-column')}<span>${esc(t)}</span></li>`).join('')}</ul>
    <div class="qrep__exp"><p>Export</p>${['PDF', 'Excel', 'CSV'].map(t => `<span>${icon('download')}${t}</span>`).join('')}</div>`),
  feedback: () => qPhone('Illustration of the feedback screen: a five-star rating with four stars chosen, an optional comment box and a submit button', `
    <p class="bapp__h">How was your visit?</p>
    <div class="qph__stars">${[1, 2, 3, 4, 5].map(i => `<span class="${i < 5 ? 'is-on' : ''}">${icon('star')}</span>`).join('')}</div>
    <div class="qph__field">Tell us more (optional)</div>
    <span class="qph__btn">Submit</span>
    <p class="qph__link">${icon('external-link')}Leave a Google review</p>`),
};

function qmsPage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const M = p.range;

  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      <p class="bv__p">${esc(m.text)}</p>
      <h3 class="bv__label">What it includes</h3>
      ${checks(m.points)}
      <div class="bv__best"><span class="bv__best-ico">${BHEX}${icon('target')}</span><div><h3 class="bv__label">Best for</h3><p>${esc(m.best)}</p></div></div>
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media" style="${bellCap(m.img)}">${bellImg(m.img, { eager: i === 0 })}<span class="shot__tag">Product render</span></div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      <span class="bv__thumb">${bellImg(m.img, { alt: '' })}</span><span class="bv__ttext"><span class="bv__tcode">${esc(m.name)}</span><span class="bv__tname">${esc(m.tab)}</span></span></a>`;
  const viewer = `<section class="section bv-sec" id="tiers" aria-label="The three QMS tiers">
<div class="wrap"><div class="bv bv--qms" data-bv>
  <div class="bv__stage">
  ${M.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--3" role="tablist" aria-label="Choose a tier" hidden>
    ${M.map(tab).join('\n    ')}
  </div>
</div>
${dStrip(p.strengths, 'Across all three tiers')}
</div>
</section>`;

  const journey = section({ id: 'journey' }, `${head('journey', 'The complete customer journey.', 'Seven steps, one platform.')}
<ol class="dsteps dsteps--7">${p.journey.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>`);

  const shotBox = (id, cls = '') => `<div class="qf__shot${cls ? ' ' + cls : ''}">${bellImg(id)}<span class="shot__tag">Product render</span></div>`;

  const join = section({ id: 'join' }, `${head('join', 'Join the queue, any way.', 'Tokens, a virtual queue and appointments.')}
<div class="qfs">
${qBlock({ id: 'tokens', n: '01', title: 'Smart token generation', lead: 'Multiple ways to join the queue, and a token at once.',
    body: `${qLabel('Ways to join')}${qItems(p.joinWays, 'qi--chips')}${qPoints(p.tokenPoints)}`,
    media: `<div class="qf__duo">${shotBox('qms-kiosk-lg', 'qf__shot--kiosk')}${QS.ticket()}</div>` })}
${qBlock({ id: 'virtual', n: '02', title: 'Virtual queue: wait anywhere', lead: 'Visitors join from wherever they are and come in when it is their turn.', flip: true,
    body: `${qLabel('Visitors can')}${qItems(p.virtualCan)}${qLabel('Benefits')}${qItems(p.virtualBenefits)}`,
    media: QS.virtual() })}
${qBlock({ id: 'appointments', n: '03', title: 'Appointment management', lead: 'Book before the visit; booked visits and walk-ins share one queue.',
    body: `${qLabel('Features')}${qItems(p.appointments)}`,
    media: QS.booking() })}
</div>`);

  const inform = section({ id: 'inform' }, `${head('inform', 'Keep every visitor informed.', 'Alerts, displays and feedback.')}
<div class="qfs">
${qBlock({ id: 'notifications', n: '04', title: 'Smart notifications', lead: 'Visitors never miss their turn, on the channel they already use.',
    body: `${qLabel('Sent through')}${qItems(p.notifyVia, 'qi--chips')}${qLabel('Alerts include')}${qItems(p.notifyAlerts)}`,
    media: QS.notify() })}
${qBlock({ id: 'display', n: '05', title: 'Queue display system', lead: 'Clear screens in the waiting area that keep visitors informed.', flip: true,
    body: `${qLabel('On the display')}${qPoints(p.displayShows)}${qLabel('Optional content')}${qItems(p.displayOptional, 'qi--chips')}<p class="qf__p">A customisable layout for any screen, and it works with your existing digital signage.</p>`,
    media: QS.display() })}
${qBlock({ id: 'feedback', n: '06', title: 'Customer feedback', lead: 'Understand visitors better and improve the service.',
    body: qPoints(p.feedback),
    media: QS.feedback() })}
</div>`);

  const counter = section({ id: 'counter' }, `${head('counter', 'Run counters and branches.', 'The console, the branches and the reports.')}
<div class="qfs">
${qBlock({ id: 'console', n: '07', title: 'Counter console', lead: 'The operator dashboard that runs each counter, with a jump token for exceptions.',
    body: `${qPoints(p.console)}<div class="qf__pad"><span class="qf__shot qf__shot--pad">${bellImg('qms-callpad')}</span><p><b>QMS Lite</b> counters use the Sygnet call pad.<small>Product render</small></p></div>`,
    media: QS.console() })}
${qBlock({ id: 'branches', n: '08', title: 'Multi-branch management', lead: 'Centralised control of every site from one platform.', flip: true,
    body: `${qLabel('Manage')}${qPoints(p.branches)}${qItems(p.branchTools, 'qi--chips')}`,
    media: QS.branches() })}
${qBlock({ id: 'reports', n: '09', title: 'Reports and analytics', lead: 'Daily, weekly and monthly reports to measure performance and decide better.',
    body: `${qLabel('Reports')}${qItems(p.reports.map(t => ['chart-column', t]), 'qi--chips')}${qLabel('Custom reports')}<p class="qf__p">Filter by date, branch and department. Export in PDF, Excel or CSV.</p>`,
    media: QS.reports(p) })}
</div>`);

  const more = section({ id: 'connect' }, `${head('connect', 'Speak every visitor’s language.', 'And connect the systems you already run.')}
<div class="qcards">
  <article class="qcard" aria-labelledby="lang-h"><p class="bv__code">10</p><h3 class="qf__h" id="lang-h">Multilingual support</h3><p class="qf__lead">Kiosks, displays and messages in the language each visitor reads.</p>
    <ul class="qlang">${p.languages.map(([en, nat]) => `<li><b>${esc(en)}</b>${nat !== en ? `<span lang="${{ Hindi: 'hi', Gujarati: 'gu', Marathi: 'mr', Tamil: 'ta', Telugu: 'te' }[en]}">${esc(nat)}</span>` : ''}</li>`).join('')}<li class="qlang--add"><b>Custom languages</b><span>Add your own</span></li></ul></article>
  <article class="qcard" aria-labelledby="int-h"><p class="bv__code">11</p><h3 class="qf__h" id="int-h">Integrations</h3><p class="qf__lead">Works with your existing systems.</p>
    ${qItems(p.integrations, 'qi--grid')}</article>
</div>`);

  const sectors = section({ id: 'sectors' }, `${head('sectors', 'Where it is used.', 'Built for every sector with a counter.')}
<ul class="qsec">${p.sectors.map(([ic, t, x]) => `<li><span class="bben__ico">${icon(ic)}</span><span><b>${esc(t)}</b><span>${esc(x)}</span></span></li>`).join('')}</ul>`);

  const c = p.compare;
  const cell = v => v === null
    ? `<td><span class="dcmp dcmp--n">${icon('hourglass')}<span>To be confirmed</span></span></td>`
    : `<td><span class="dcmp dcmp--y">${icon('check')}<span>${esc(v)}</span></span></td>`;
  const compare = section({ id: 'compare' }, `${head('compare', 'Compare the three tiers.', 'Select a tier to open it above.')}
<div class="compare compare--bell compare--ncs compare--qms" tabindex="0" role="region" aria-labelledby="compare-h"><table>
<thead><tr><th scope="col">Tier</th>${M.map(m => `<th scope="col"><a class="cmp-h" href="#${m.id}" data-bv-go="${m.id}"><span class="cmp-h__code">${esc(m.name)}</span><span class="cmp-h__name">${esc(m.tab)}</span></a></th>`).join('')}</tr></thead>
<tbody>${c.rows.map(([f, v]) => `<tr><th scope="row">${esc(f)}</th>${v.map(cell).join('')}</tr>`).join('')}
<tr class="cmp-tbc"><th scope="row">${esc(c.pending[0])}</th><td colspan="3"><span class="chip-soon">To be confirmed with the client</span><span class="cmp-tbc__x">${esc(c.pending[1])}</span></td></tr></tbody></table></div>
<p class="compare__note">${esc(c.note)}</p>
<p class="babout">${esc(p.about)}</p>`);

  const body = `${intro}\n${viewer}\n${bellScript}\n${journey}\n${join}\n${inform}\n${counter}\n${more}\n${sectors}\n${compare}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'See Sygnet QMS on your counters', line: 'Tell us how your visitors wait today and we will walk you through the three tiers.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- Textile Connect (p.layout 'textile')
// The School Bell & PA page's structure: centred intro (.bintro), a viewer (.bv) for the four intelligence layers
// (#production, #energy, #utility, #business), the twelve solutions, a second viewer for the seven value-chain stages
// (#spinning ... #garment) with the factory utilities, ERP and BI, the ROI levers, why choose, and the focus-area
// table last. Both viewers keep every panel in the HTML (stacked without script). All visuals are screens drawn in
// HTML and tagged "Illustrative screen": states and shapes only, never a figure. Client rules in data.mjs.
// site.css "textile page".
// a status written out with its icon, so it never rests on colour alone
const TC_ST = { ok: 'circle-check', warn: 'triangle-alert', stop: 'circle-x', off: 'minus' };
const tcSt = (k, t) => `<em class="tcst tcst--${k}">${icon(TC_ST[k])}${esc(t)}</em>`;
const TC_RUN = [['ok', 'Running'], ['ok', 'Running'], ['warn', 'Idle'], ['ok', 'Running'], ['stop', 'Stopped'], ['ok', 'Running'], ['ok', 'Running'], ['warn', 'Idle']];
const tcTiles = list => `<ul class="tcm">${list.map(([n, k, t]) => `<li><b>${esc(n)}</b>${tcSt(k, t)}</li>`).join('')}</ul>`;
const spark = (pts, cls = '') => `<svg class="tcspark${cls ? ' ' + cls : ''}" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}"/></svg>`;
const TC_SCREENS = {
  production: () => qWin('tcprod', 'Weaving shed · Machine status', 'Illustration of the machine status screen: eight looms for shift A, most running, two idle and one stopped, and the OEE parts availability, performance and quality', `
    <div class="tcseg"><span class="is-on">Shift A</span><span>Shift B</span><span>Shift C</span></div>
    ${tcTiles(['L-01', 'L-02', 'L-03', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08'].map((n, i) => [n, ...TC_RUN[i]]))}
    <div class="tcoee"><p>OEE this shift</p>${['Availability', 'Performance', 'Quality'].map((t, i) => `<span><i>${t}</i><s style="--v: ${[78, 64, 90][i]}%"></s></span>`).join('')}</div>`),
  energy: () => qWin('tcen', 'Main incomer · Energy', 'Illustration of the energy screen: a demand curve for today under a limit line, with power quality, harmonics and load balance normal and power factor flagged for a check', `
    <div class="tcchart"><p>Demand · Today</p>
      <svg viewBox="0 0 300 96" preserveAspectRatio="none" aria-hidden="true"><line class="tcchart__lim" x1="0" y1="18" x2="300" y2="18"/><polyline class="tcchart__ln" points="0,74 25,70 50,62 75,48 100,40 125,36 150,44 175,30 200,26 225,34 250,46 275,58 300,62"/></svg>
      <span class="tcchart__key"><i class="tcchart__k1"></i>Demand<i class="tcchart__k2"></i>Limit</span></div>
    <ul class="tcrows">${[['activity', 'Power quality', 'ok', 'Normal'], ['gauge', 'Power factor', 'warn', 'Check'], ['waves', 'Harmonics', 'ok', 'Normal'], ['scale', 'Load balance', 'ok', 'Balanced']].map(([ic, t, k, s]) => `<li>${icon(ic)}<span>${t}</span>${tcSt(k, s)}</li>`).join('')}</ul>`),
  utility: () => qWin('tcut', 'Utilities · Live', 'Illustration of the utilities screen: air compressor, solar, water tank, water meter and pump normal or running, DG set on standby, borewell off and RO plant flagged for a check', `
    <ul class="tcrows tcrows--2">${[['wind', 'Air compressor', 'ok', 'Running'], ['fuel', 'DG set', 'off', 'Standby'], ['sun', 'Solar', 'ok', 'Generating'], ['droplet', 'Water tank', 'ok', 'Normal'],
      ['waves', 'Borewell', 'off', 'Off'], ['gauge', 'Water meter', 'ok', 'Live'], ['refresh-cw', 'Pump', 'ok', 'Running'], ['filter', 'RO plant', 'warn', 'Check']].map(([ic, t, k, s]) => `<li>${icon(ic)}<span>${t}</span>${tcSt(k, s)}</li>`).join('')}</ul>`),
  business: () => qPhone('Illustration of live monitoring on a phone: machine status running, energy, water tank and compressor normal, and solar generating, RO plant normal, DG set on standby, and a new alert that loom L-05 has stopped', `
    <p class="bapp__h">Live monitoring</p>
    <ul class="mdet">${[['cpu', 'Machine status', 'Running'], ['zap', 'Energy', 'Normal'], ['droplet', 'Water tank', 'Normal'], ['wind', 'Compressor', 'Normal'], ['sun', 'Solar', 'Generating'], ['filter', 'RO plant', 'Normal'], ['fuel', 'DG set', 'Standby']].map(([ic, t, v]) => `<li>${icon(ic)}<span>${t}</span><b>${v}</b></li>`).join('')}</ul>
    <p class="mdet__alert tcph__alert">${icon('bell-ring')}<span>New alert: loom <b>L-05</b> stopped</span></p>`),
};
// a value-chain stage on its own status screen: the stage's machines, with sample states
const tcStage = s => qWin('tcstage', `${s.name} · Machine status`, `Illustration of the ${s.name.toLowerCase()} machine status screen: ${s.machines.join(', ').toLowerCase()}, each with a sample running, idle or stopped state`,
  tcTiles(s.machines.map((m, i) => [m, ...TC_RUN[i % TC_RUN.length]])));
// the executive dashboard (ERP section): shapes only, no figures
const tcDash = () => qWin('tcdash', 'Executive dashboard', 'Illustration of an executive dashboard: trend lines for OEE, production, energy cost per unit and downtime; production against energy cost by month; and three plants, two on target and one to review', `
  <ul class="tcd__kpis">${[['OEE', '0,24 20,20 40,22 60,14 80,12 100,8'], ['Production', '0,26 20,22 40,18 60,20 80,12 100,10'], ['Energy cost per unit', '0,8 20,12 40,10 60,16 80,18 100,22'], ['Downtime', '0,10 20,14 40,12 60,20 80,22 100,26']].map(([t, p]) => `<li><span>${t}</span>${spark(p)}</li>`).join('')}</ul>
  <div class="tcd__row">
    <div class="tcd__card"><p>Production vs energy cost</p>
      <svg class="tcd__bars" viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">${[40, 52, 46, 60, 64, 56, 70, 66, 74, 62, 78, 72].map((h, i) => `<rect x="${i * 20 + 4}" y="${90 - h}" width="12" height="${h}" rx="2"/>`).join('')}<polyline points="${[38, 44, 40, 48, 46, 50, 52, 48, 54, 50, 56, 52].map((v, i) => `${i * 20 + 10},${90 - v - 18}`).join(' ')}"/></svg>
      <span class="tcchart__key"><i class="tcd__k1"></i>Production<i class="tcd__k2"></i>Energy cost</span></div>
    <div class="tcd__card"><p>Plant-wise KPIs</p>
      <ul class="tcrows">${[['Plant 1', 'ok', 'On target'], ['Plant 2', 'ok', 'On target'], ['Plant 3', 'warn', 'Review']].map(([t, k, s]) => `<li>${icon('factory')}<span>${t}</span>${tcSt(k, s)}</li>`).join('')}</ul></div>
  </div>`);

// the viewer behaviour for a page with more than one viewer: each [data-bv] is its own tab set; the URL hash opens
// the panel it names in whichever viewer holds it. Same behaviour as bellScript otherwise.
const tcViewerScript = `<script>(function(){
var reg=[],still=matchMedia('(prefers-reduced-motion: reduce)'),narrow=matchMedia('(max-width: 1023px)');
function calm(){return still.matches||document.documentElement.dataset.motion==='off'}
function navH(){var n=document.querySelector('.nav');return n?n.getBoundingClientRect().height:0}
function init(root){if(!root)return;
 var list=root.querySelector('[role=tablist]'),tabs=[].slice.call(list.querySelectorAll('[role=tab]'));
 var panels=tabs.map(function(t){return document.getElementById(t.getAttribute('aria-controls'))});
 var ids=panels.map(function(p){return p.id}),cur=-1;
 root.classList.add('bv--js');list.hidden=false;
 panels.forEach(function(p,i){p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',tabs[i].id)});
 function bring(force){var m=panels[cur].querySelector('.bv__media').getBoundingClientRect();
  if(force||m.top<navH()||m.top>innerHeight-120){root.scrollIntoView({behavior:calm()?'auto':'smooth',block:'start'})}}
 function show(i,o){o=o||{};if(i<0||i>=tabs.length)return;
  if(o.instant||calm())root.classList.add('bv--instant');
  tabs.forEach(function(t,k){var on=k===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;t.classList.toggle('is-active',on);
   panels[k].classList.toggle('is-active',on);if(on)panels[k].removeAttribute('inert');else panels[k].setAttribute('inert','')});
  cur=i;if(o.hash&&location.hash!=='#'+ids[i])history.replaceState(null,'','#'+ids[i]);
  if(o.instant||calm())requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove('bv--instant')})});}
 tabs.forEach(function(t,i){t.addEventListener('click',function(e){e.preventDefault();var same=i===cur;show(i,{hash:true});if(!same&&narrow.matches)bring(false)})});
 list.addEventListener('keydown',function(e){var k=e.key,n=tabs.length,i=cur;
  if(k==='ArrowRight'||k==='ArrowDown')i=(cur+1)%n;else if(k==='ArrowLeft'||k==='ArrowUp')i=(cur-1+n)%n;else if(k==='Home')i=0;else if(k==='End')i=n-1;else return;
  e.preventDefault();show(i,{hash:true});tabs[i].focus();tabs[i].scrollIntoView({block:'nearest',inline:'nearest',behavior:calm()?'auto':'smooth'})});
 reg.push({ids:ids,show:show,bring:bring,tabs:tabs,cur:function(){return cur}});
 var s=ids.indexOf(location.hash.slice(1));show(s<0?0:s,{instant:true});}
function find(id){for(var k=0;k<reg.length;k++){var i=reg[k].ids.indexOf(id);if(i>=0)return [reg[k],i]}return null}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-bv-go]');if(!a)return;var f=find(a.getAttribute('data-bv-go'));if(!f)return;
 e.preventDefault();f[0].show(f[1],{hash:true});f[0].bring(true);f[0].tabs[f[1]].focus({preventScroll:true})});
addEventListener('hashchange',function(){var f=find(location.hash.slice(1));if(f&&f[1]!==f[0].cur()){f[0].show(f[1]);f[0].bring(true)}});
window.sygBv=init;init(document.querySelector('[data-bv="layers"]'));
})()</script>`;
const TC_HEX = '<svg class="tchex__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg>';
const tcHex = ic => `<span class="tchex">${TC_HEX}${icon(ic)}</span>`;

function textilePage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;

  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <ol class="tcflow" aria-label="${esc(p.chips.join(', '))}">${p.chips.map((c, k) => `<li>${k ? icon('chevron-right', 'ico tcflow__sep') : ''}<span>${esc(c)}</span></li>`).join('')}</ol>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  // the four layers: detail left, a drawn screen on Mist right
  const L = p.layers;
  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      <p class="bv__p">${esc(m.text)}</p>
      <h3 class="bv__label">What it covers</h3>
      ${checks(m.points)}
      <p class="tcclose">${esc(m.close)}</p>
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media tcmedia">${TC_SCREENS[m.screen]()}</div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      ${tcHex(m.icon)}<span class="bv__ttext"><span class="bv__tcode">${esc(m.code)}</span><span class="bv__tname">${esc(m.tab)}</span></span></a>`;
  const viewer = `<section class="section bv-sec" id="layers" aria-label="The four intelligence layers">
<div class="wrap"><div class="bv bv--tc" data-bv="layers">
  <div class="bv__stage">
  ${L.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--4" role="tablist" aria-label="Choose an intelligence layer" hidden>
    ${L.map(tab).join('\n    ')}
  </div>
</div></div>
</section>`;

  const solutions = section({ id: 'solutions' }, `${head('solutions', 'Our solutions.', 'Twelve ways in, one platform.')}
<ul class="tcsol">${p.solutions.map(([ic, t, x]) => `<li>${tcHex(ic)}<b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>`);

  // the value chain: the same viewer, one panel per stage
  const C = p.chain;
  const cpanel = (s, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${s.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(s.code)}</p>
      <h3 class="bv__name" id="${s.id}-h">${esc(s.name)}</h3>
      <p class="bv__line">${esc(s.line)}</p>
      <h4 class="bv__label">Machines and lines connected</h4>
      ${checks(s.machines)}
    </div>
    <div class="bv__media tcmedia">${tcStage(s)}</div>
  </article>`;
  const ctab = s => `<a class="bv__tab" href="#${s.id}" id="tab-${s.id}" role="tab" aria-controls="${s.id}" aria-selected="false" tabindex="-1">
      ${tcHex(s.icon)}<span class="bv__ttext"><span class="bv__tcode">${esc(s.code)}</span><span class="bv__tname">${esc(s.tab)}</span></span></a>`;
  const chain = section({ id: 'value-chain' }, `${head('value-chain', 'Designed for the complete textile value chain.', 'One platform. Every process. Every factory.', 'Whether you run a standalone unit or an integrated textile facility, Sygnet Textile Connect gives operational visibility across the whole value chain.')}
<div class="bv bv--tc bv--chain" data-bv="chain">
  <div class="bv__stage">
  ${C.map(cpanel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--7" role="tablist" aria-label="Choose a stage of the value chain" hidden>
    ${C.map(ctab).join('\n    ')}
  </div>
</div>
<script>window.sygBv&&window.sygBv(document.querySelector('[data-bv="chain"]'))</script>
<h3 class="dlabel">Factory utilities</h3>
${dStrip(p.utilities, 'Factory utilities', 'tcutil')}
<p class="bline">From fibre to finished garment, <span>one platform.</span></p>`);

  const listCard = (label, list) => `<div class="dcard"><h3 class="dlabel">${label}</h3><ul class="dlist">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul></div>`;
  const erp = section({ id: 'erp' }, `${head('erp', 'ERP integration and business intelligence.', 'Connect your shop floor with your business systems.', 'Sygnet Textile Connect integrates with leading ERP solutions and turns operational data into actionable business intelligence.')}
<div class="tcerp">
  <div class="dcard"><h3 class="dlabel">Compatible with</h3><ul class="tcerp__names">${p.erps.map(t => `<li>${esc(t)}</li>`).join('')}</ul><p class="tcerp__note">Product names are trademarks of their owners.</p></div>
  ${listCard('Integrated data', p.erpData)}
  ${listCard('Executive business intelligence', p.erpBi)}
</div>
<div class="dmon">
  <div class="dmon__copy"><h3>One view for management</h3><p>Production, energy, utilities and plant KPIs side by side, on the web and on the phone.</p></div>
  <div class="dmon__screen">${tcDash()}</div>
</div>
${dItems(p.erpTrio, 'tctrio')}`);

  const roi = section({ id: 'roi' }, `${head('roi', 'Return on investment.', 'Where the value comes from.', 'Sygnet Textile Connect converts real-time operational data into actionable insights that drive efficiency, reduce costs and maximise profitability.')}
<div class="tcroi">${p.roi.map(r => `<article class="tcroi__c" aria-labelledby="roi-${r.icon}-h"><span class="bben__ico">${icon(r.icon)}</span><h3 id="roi-${r.icon}-h">${esc(r.title)}</h3>${checks(r.points)}</article>`).join('')}</div>`);

  const why = section({ id: 'why' }, `${head('why', 'Why choose Sygnet Textile Connect.', 'Built for the way textile factories work.')}
<ul class="tcwhy">${p.why.map(([ic, t]) => `<li>${tcHex(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>`);

  const compare = section({ id: 'compare' }, `${head('compare', 'From focus area to benefit.', 'What each solution is for.')}
<div class="compare compare--tc" role="region" aria-labelledby="compare-h"><table role="table">
<thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Focus area</th><th scope="col" role="columnheader">Sygnet solution</th><th scope="col" role="columnheader">Business benefit</th></tr></thead>
<tbody role="rowgroup">${p.focus.map(([a, s, b]) => `<tr role="row"><th scope="row" role="rowheader">${esc(a)}</th><td role="cell" data-label="Sygnet solution"><span class="tcsolc">${icon('hexagon')}${esc(s)}</span></td><td role="cell" data-label="Business benefit"><span class="dcmp dcmp--y">${icon('check')}<span>${esc(b)}</span></span></td></tr>`).join('')}</tbody></table></div>
<p class="babout">${esc(p.about)}</p>`);

  const body = `${intro}\n${viewer}\n${tcViewerScript}\n${solutions}\n${chain}\n${erp}\n${roi}\n${why}\n${compare}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'Schedule a live demonstration', line: 'Tell us about your mill and we will show Textile Connect on your own machines, energy and utilities.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- Water ATM (p.layout 'water')
// The School Bell & PA page's structure: centred intro (.bintro), the viewer (.bv, bellScript) with the community kiosk
// (#kiosk) and the Water ATM Panel (#panel), both in the HTML so the page reads in full without script; then the
// catalogue's sections in its order and the roles table last (.compare--tc, one card per row on a phone). Parts reused:
// .tcsol/.tchex cards, .bben lists, .dsteps, .dwatch pills and .lcards on the Indigo band, .tcroi cards, .dmon panel,
// .dcard, .tcst status pills, .plist. The monitoring screen is drawn in HTML, tagged "Illustrative screen", states
// only. Client rules: no pricing, no SDG icons or colours, no catalogue figures except the p10 planning estimate shown
// with its assumption. site.css "water ATM page".
const waList = list => `<ul class="walist">${list.map(([ic, t, x]) => `<li>${icon(ic)}<b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>`;
const WA_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const waDash = () => qWin('wadash', 'Water ATM overview', 'Illustration of the Water ATM monitoring screen: the ATM online; trend lines for water dispensed, users served and revenue collected; water quality good, device health healthy, maintenance log up to date; and a bar chart of water dispensed this week. Sample states only, no figures', `
  <div class="wadash__top"><p>Community kiosk</p>${tcSt('ok', 'Online')}</div>
  <ul class="wadash__tiles">
    ${[['droplet', 'Water dispensed', '0,24 14,18 28,22 42,14 56,16 70,9 84,12 100,6'], ['users', 'Users served', '0,22 14,24 28,16 42,18 56,12 70,14 84,8 100,10'], ['wallet-cards', 'Revenue collected', '0,26 14,20 28,22 42,16 56,18 70,12 84,10 100,8']]
      .map(([ic, t, pts]) => `<li><span class="wadash__k">${icon(ic)}${t}</span>${spark(pts)}<span class="wadash__s">Today</span></li>`).join('')}
    ${[['test-tube', 'Water quality', 'TDS and pH', 'ok', 'Good'], ['activity', 'Device health', 'Status and uptime', 'ok', 'Healthy'], ['wrench', 'Maintenance', 'Service and filter log', 'ok', 'Up to date']]
      .map(([ic, t, s, k, v]) => `<li><span class="wadash__k">${icon(ic)}${t}</span>${tcSt(k, v)}<span class="wadash__s">${s}</span></li>`).join('')}
  </ul>
  <div class="wadash__chart"><p>Water dispensed · This week</p>
    <svg class="wadash__bars" viewBox="0 0 280 80" preserveAspectRatio="none" aria-hidden="true">${[46, 58, 40, 64, 70, 56, 74].map((h, i) => `<rect x="${i * 40 + 8}" y="${80 - h}" width="24" height="${h}" rx="3"/>`).join('')}</svg>
    <span class="wadash__days">${WA_DAYS.map(d => `<i>${d}</i>`).join('')}</span></div>`);

function waterPage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const M = p.range;

  const intro = `<section class="section bintro wa-intro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  <ul class="wachips" aria-label="Key qualities">${p.chips.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
  <p class="watag">${esc(p.tagline[0])}<span>${esc(p.tagline[1])}</span></p>
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;

  // the two products: detail left, the device on Mist right (4:3)
  const panel = (m, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${m.id}">
    <div class="bv__text">
      <p class="bv__code">${esc(m.code)}</p>
      <h2 class="bv__name" id="${m.id}-h">${esc(m.name)}</h2>
      <p class="bv__line">${esc(m.line)}</p>
      <p class="bv__p">${esc(m.text)}</p>
      <h3 class="bv__label">Key features</h3>
      ${qPoints(m.points)}
      ${m.for ? `<h3 class="bv__label">${esc(m.forLabel)}</h3><ul class="bv__apps">${m.for.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
      ${m.monitor ? `<h3 class="bv__label">${esc(m.monitorLabel)}</h3>${checks(m.monitor)}` : ''}
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>
    </div>
    <div class="bv__media" style="${ncsCap(m.img)}">${bellImg(m.img, { eager: i === 0 })}<span class="shot__tag">Product render</span></div>
  </article>`;
  const tab = m => `<a class="bv__tab" href="#${m.id}" id="tab-${m.id}" role="tab" aria-controls="${m.id}" aria-selected="false" tabindex="-1">
      <span class="bv__thumb">${bellImg(m.img, { alt: '' })}</span><span class="bv__ttext"><span class="bv__tcode">${esc(m.code)}</span><span class="bv__tname">${esc(m.tab)}</span></span></a>`;
  const viewer = `<section class="section bv-sec" id="models" aria-label="The Water ATM and the Water ATM Panel">
<div class="wrap"><div class="bv bv--wa" data-bv>
  <div class="bv__stage">
  ${M.map(panel).join('\n  ')}
  </div>
  <div class="bv__tabs bv__tabs--2" role="tablist" aria-label="Choose a product" hidden>
    ${M.map(tab).join('\n    ')}
  </div>
</div></div>
</section>`;

  const about = section({ id: 'about' }, `${head('about', 'About Sygnet Water Connect.', 'A smart water infrastructure and utility technology platform.')}
<ul class="tcsol">${p.about.map(([ic, t, x]) => `<li>${tcHex(ic)}<b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>
<p class="bline">Safe water. Smart technology. <span>Sustainable communities.</span></p>`);

  const benefitCard = (label, list) => `<div class="dcard"><h3 class="dlabel">${label}</h3>${dItems(list, 'bben--1')}</div>`;
  const matters = section({ id: 'why-it-matters' }, `${head('why-it-matters', 'Why this initiative matters.', 'Healthier communities, lasting impact.', 'Access to safe drinking water is a basic need that improves health, supports productivity and uplifts communities.')}
<div class="wa2">
  ${benefitCard('Benefits to communities', p.forCommunities)}
  ${benefitCard('Benefits to sponsors', p.forSponsors)}
</div>`);

  const how = section({ id: 'how' }, `${head('how', 'How the system works.', 'Five steps, every time.')}
<ol class="dsteps">${p.how.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>
<p class="bline">Every transaction is <span>digitally recorded.</span></p>`);

  const csr = `<section class="section ground-inverse band" id="csr-model" aria-labelledby="csr-model-h"><div class="wrap">
${head('csr-model', 'A sustainable CSR model.', 'Every drop creates impact.', 'Revenue from each Water ATM goes back into keeping it running well.')}
<h3 class="dlabel">Revenue supports</h3>
<ul class="dwatch">${p.revenue.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
<h3 class="dlabel">Result</h3>
<p class="bline wa-result">Long-term, <span>sustainable community infrastructure.</span></p>
<ol class="lcards lcards--4">${p.csrResults.map(([ic, t, x], k) => `<li class="lcard"><span class="lcard__ico">${HEX}${icon(ic)}</span><span class="lcard__n">0${k + 1}</span><b class="lcard__t">${esc(t)}</b><span class="lcard__x">${esc(x)}</span></li>`).join('')}</ol>
</div></section>`;

  const I = p.impact;
  const impact = section({ id: 'impact' }, `${head('impact', 'Expected annual impact.', `Planning estimate per Water ATM, based on an assumed ${I.users} users per day.`)}
<div class="waimp">
  <div class="waimp__in"><span class="waimp__k">Assumption</span><b class="waimp__big">${esc(I.users)}</b><span class="waimp__u">users per day</span><span class="waimp__fix">Fixed for this estimate</span></div>
  <span class="waimp__arr" aria-hidden="true">${icon('arrow-right')}</span>
  <div class="waimp__outw"><span class="waimp__k">Estimated outputs per year</span>
    <ul class="waimp__out">${I.outputs.map(([ic, n, t]) => `<li>${icon(ic)}<b>${esc(n)}</b><span>${esc(t)}</span></li>`).join('')}</ul></div>
</div>
<p class="wanote">${icon('info')}<span><b>Planning estimate, not measured results.</b> Worked out from ${esc(I.users)} users a day over 365 days. Actual use depends on the site.</span></p>`);

  const esg = section({ id: 'esg' }, `${head('esg', 'ESG and CSR impact.', 'Clean water, stronger communities.')}
<h3 class="dlabel">Supports the Sustainable Development Goals</h3>
<ul class="wasdg">${p.sdgs.map(([n, t]) => `<li><span class="wasdg__n">SDG ${esc(n)}</span><span>${esc(t)}</span></li>`).join('')}</ul>
<h3 class="dlabel">ESG alignment</h3>
<div class="tcroi">${p.esg.map(([ic, t, list]) => `<article class="tcroi__c" aria-labelledby="esg-${t.toLowerCase()}-h"><span class="bben__ico">${icon(ic)}</span><h4 id="esg-${t.toLowerCase()}-h">${esc(t)}</h4>${checks(list)}</article>`).join('')}</div>`);

  const transparency = section({ id: 'transparency' }, `${head('transparency', 'Transparency through technology.', 'A real-time monitoring dashboard.')}
<div class="dmon wamon">
  <div class="dmon__copy"><h3>What the dashboard shows</h3>${waList(p.dashboard)}</div>
  <div class="dmon__screen">${waDash()}</div>
</div>
${dItems(p.trust, 'bben--4 watrust')}
<p class="bline">Every litre is <span>accounted for.</span></p>`);

  const recognition = section({ id: 'recognition' }, `${head('recognition', 'Sponsor recognition and visibility.', 'Your support, recognised at every touchpoint.')}
<div class="wa2">
  <div class="dcard"><h3 class="dlabel">Physical branding</h3>${waList(p.physical)}</div>
  <div class="dcard"><h3 class="dlabel">Digital recognition</h3>${waList(p.digital)}</div>
</div>`);

  const flowItem = ([ic, t, x], k) => `<li>${k ? `<span class="waflow__arr" aria-hidden="true">${icon('arrow-right')}</span>` : ''}<div class="waflow__c${ic ? '' : ' waflow__c--sy'}">
    ${ic ? `<span class="bben__ico">${icon(ic)}</span>` : '<img class="waflow__mark" src="/img/brand/sygnet-mark-white.svg" alt="" width="44" height="48">'}
    <b>${esc(t)}</b>${Array.isArray(x) ? `<ul class="waflow__does" aria-label="What Sygnet Water Connect does">${x.map(d => `<li>${esc(d)}</li>`).join('')}</ul>` : `<span class="waflow__x">${esc(x)}</span>`}</div></li>`;
  const implementation = section({ id: 'implementation' }, `${head('implementation', 'Project implementation model.', 'From sponsor to community.')}
<ol class="waflow">${p.flow.map(flowItem).join('')}</ol>
<div class="wa2">
  <div class="dcard"><h3 class="dlabel">Our commitment</h3>${waList(p.commitment)}</div>
  <div class="dcard"><h3 class="dlabel">Fund utilization</h3>${waList(p.funds)}</div>
</div>
<p class="bline">Transparent fund allocation <span>and reporting.</span></p>`);

  const why = section({ id: 'why-sygnet' }, `${head('why-sygnet', 'Why Sygnet Water Connect.', 'Technology. Transparency. Trust.')}
<ul class="tcsol wawhy">${p.why.map(([ic, t, x]) => `<li>${tcHex(ic)}<b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>`);

  const cols = ['CSR sponsor', 'Sygnet Water Connect', 'Community'];
  const [rName, rOne, rHref] = p.rwc;
  const roles = section({ id: 'roles' }, `${head('roles', 'Who does what in a Water ATM project.', 'Sponsor, Sygnet and community.')}
<div class="compare compare--tc compare--wa" role="region" aria-labelledby="roles-h"><table role="table">
<thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Area</th>${cols.map(c => `<th scope="col" role="columnheader">${c}</th>`).join('')}</tr></thead>
<tbody role="rowgroup">${p.roles.map(([a, ...v]) => `<tr role="row"><th scope="row" role="rowheader">${esc(a)}</th>${v.map((t, k) => `<td role="cell" data-label="${cols[k]}">${k === 1 ? `<span class="tcsolc">${icon('hexagon')}${esc(t)}</span>` : esc(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
<div class="warwc"><h3 class="dlabel">Also from Sygnet Water Connect</h3>
<ul class="plist"><li><a class="plist__a" href="${rHref}"><span class="plist__name">${esc(rName)}</span><span class="plist__one">${esc(rOne)}</span>${ARROW}</a></li></ul></div>`);

  const body = `${intro}\n${viewer}\n${bellScript}\n${about}\n${matters}\n${how}\n${csr}\n${impact}\n${esg}\n${transparency}\n${recognition}\n${implementation}\n${why}\n${roles}`;
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'Bring safe drinking water to a community', line: 'Tell us about the community you want to serve and we will walk you through the Water ATM, the panel and the reporting.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- the last product pages (p.layout 'simple' and 'rwc')
// The School Bell & PA page's order: centred intro (.bintro), the product view (.bv), the feature sections, a table only
// where the source has real rows to compare (the Rural Water Center), else a "How it works" strip or a "Where it fits"
// list, then the closing "Request a demo" band (layout.mjs). Each of these pages has ONE product, so the view is a single
// large panel with no selector cards and no script (it reads the same without JS). A product with no clean picture shows
// the brand's hexagon illustration instead, with one tag. Screens are drawn in HTML, tagged "Illustrative screen", and
// carry sample states only (Online, Good, Healthy), never figures. site.css "last product pages".
const ILLHEX = '<svg class="bvill__hex" viewBox="0 0 104 112" aria-hidden="true"><path d="M52 3 100 30.5v51L52 109 4 81.5v-51z"/><path d="M52 15 89.6 36.6v38.8L52 97 14.4 75.4V36.6z"/></svg>';
const centredIntro = (p, demo) => `<section class="section bintro wa-intro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">${esc(p.eyebrow)}</p>
  <h1 id="hero-h">${esc(p.h1)}</h1>
  <p class="t-lead">${esc(p.lead)}</p>
  ${p.chips ? `<ul class="wachips" aria-label="Key qualities">${p.chips.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>` : ''}
  ${p.tagline ? `<p class="watag">${esc(p.tagline[0])}<span>${esc(p.tagline[1])}</span></p>` : ''}
  <div class="btn-row">${btn(demo, 'Request a demo')}</div>
</div></section>`;
// the picture: the product's cut-out on Mist with its "Product render" tag, or the hexagon illustration with one tag
// ("Awaiting from client" as the Sky chip, any other word as the plain tag)
const oneMedia = v => v.img
  ? `<div class="bv__media" style="${ncsCap(v.img)}">${bellImg(v.img, { eager: true })}<span class="shot__tag">Product render</span></div>`
  : `<div class="bv__media bv__media--ill" role="img" aria-label="${esc(v.illLabel)}">${ILLHEX}<span class="bvill__ico">${icon(v.ill)}</span><span class="${/^Awaiting/.test(v.illTag) ? 'chip-soon bvill__tag' : 'shot__tag'}">${esc(v.illTag)}</span></div>`;
const oneView = (label, inner, media) => `<section class="section bv-sec" id="product" aria-label="${esc(label)}">
<div class="wrap"><div class="bv bv--one">
  <div class="bv__stage"><article class="bv__panel is-active">
    <div class="bv__text">${inner}</div>
    ${media}
  </article></div>
</div></div>
</section>`;
const viewHead = v => `<p class="bv__code">${esc(v.code)}</p>
      <h2 class="bv__name" id="product-h">${esc(v.name)}</h2>
      <p class="bv__line">${esc(v.line)}</p>
      <p class="bv__p">${esc(v.text)}</p>`;
// "Where it fits": white cut cards with the hexagon icon; a line under the name where the source has one
const fitCards = items => `<ul class="tcsol tcsol--${items.length}">${items.map(([ic, t, x]) => `<li>${tcHex(ic)}<b>${esc(t)}</b>${x ? `<span>${esc(x)}</span>` : ''}</li>`).join('')}</ul>`;
const dList = list => `<ul class="dlist">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>`;
const stateTile = ([ic, t, s, v]) => `<li><span class="wadash__k">${icon(ic)}${esc(t)}</span>${tcSt('ok', v)}<span class="wadash__s">${esc(s)}</span></li>`;
const sparkTile = ([ic, t, pts, s]) => `<li><span class="wadash__k">${icon(ic)}${esc(t)}</span>${spark(pts)}<span class="wadash__s">${esc(s)}</span></li>`;
const weekBars = (title, hs) => `<div class="wadash__chart"><p>${esc(title)}</p>
    <svg class="wadash__bars" viewBox="0 0 280 80" preserveAspectRatio="none" aria-hidden="true">${hs.map((h, i) => `<rect x="${i * 40 + 8}" y="${80 - h}" width="24" height="${h}" rx="3"/>`).join('')}</svg>
    <span class="wadash__days">${WA_DAYS.map(d => `<i>${d}</i>`).join('')}</span></div>`;
const SP = ['0,24 14,18 28,22 42,14 56,16 70,9 84,12 100,6', '0,22 14,24 28,16 42,18 56,12 70,14 84,8 100,10', '0,26 14,20 28,22 42,16 56,18 70,12 84,10 100,8'];
const ONE_SCREENS = {
  milk: () => qWin('wadash', 'Milk vending · Machine', 'Illustration of the Smart Milk Vending dashboard: the machine online; trend lines for revenue, recharges and milk dispensed; chiller good, hot water cleaning good, battery backup healthy; and a bar chart of sales this week. Sample states only, no figures', `
  <div class="wadash__top"><p>Society gate machine</p>${tcSt('ok', 'Online')}</div>
  <ul class="wadash__tiles">
    ${[['wallet-cards', 'Revenue', SP[0], 'This week'], ['refresh-cw', 'Recharges', SP[1], 'This week'], ['milk', 'Milk dispensed', SP[2], 'Today']].map(sparkTile).join('')}
    ${[['snowflake', 'Chiller', 'Milk temperature', 'Good'], ['droplet', 'Auto-cleaning', 'Hot water cycle', 'Good'], ['battery-full', 'Battery backup', 'Power', 'Healthy']].map(stateTile).join('')}
  </ul>
  ${weekBars('Sales · This week', [40, 52, 46, 60, 66, 72, 58])}`),
  napkin: () => qWin('wadash', 'Napkin vending · Impact view', 'Illustration of the napkin vending impact screen: machines online; trend lines for napkins dispensed and beneficiaries; machine health healthy; and location-wise consumption for five sample places, shown as bars without figures', `
  <div class="wadash__top"><p>All machines</p>${tcSt('ok', 'Online')}</div>
  <ul class="wadash__tiles">
    ${[['package', 'Napkins dispensed', SP[0], 'This month'], ['users', 'Beneficiaries', SP[1], 'This month']].map(sparkTile).join('')}
    ${stateTile(['activity', 'Machine health', 'All locations', 'Healthy'])}
  </ul>
  <div class="wadash__chart"><p>Location-wise consumption · This month</p>
    <ul class="nvloc">${[['School A', 92], ['College B', 74], ['Community centre', 58], ['Office C', 44], ['Public toilet D', 30]].map(([n, v]) => `<li><span>${n}</span><s style="--v: ${v}%"></s></li>`).join('')}</ul></div>`),
  rwc: () => qWin('wadash', 'Rural Water Center overview', 'Illustration of the Rural Water Center monitoring screen: the centre online; trend lines for water produced, water dispensed and beneficiaries served; plant health healthy, water quality good and tank level good; and a bar chart of water dispensed this week. Sample states only, no figures', `
  <div class="wadash__top"><p>Village water centre</p>${tcSt('ok', 'Online')}</div>
  <ul class="wadash__tiles">
    ${[['droplet', 'Water produced', SP[0], 'Today'], ['waves', 'Water dispensed', SP[1], 'Today'], ['users', 'Beneficiaries served', SP[2], 'This week']].map(sparkTile).join('')}
    ${[['activity', 'Plant health', 'Treatment plant', 'Healthy'], ['test-tube', 'Water quality', 'Quality reports', 'Good'], ['container', 'Tank level', 'Purified storage', 'Good']].map(stateTile).join('')}
  </ul>
  ${weekBars('Water dispensed · This week', [46, 58, 40, 64, 70, 56, 74])}`),
};
const monitorBlock = m => `<div class="dmon wamon">
  <div class="dmon__copy"><h3>${esc(m.label)}</h3>${dList(m.items)}</div>
  <div class="dmon__screen">${ONE_SCREENS[m.screen]()}</div>
</div>`;

// Energy Monitoring, Smart Milk Vending, Napkin Vending, Reverse Vending: each section only when its data exists
function simplePage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const v = p.view;
  const inner = `${viewHead(v)}
      <h3 class="bv__label">${esc(v.pointsLabel)}</h3>
      ${qPoints(v.points)}
      ${v.awaiting ? slot(v.awaiting) : ''}${v.note ? `<p class="bvone__note">${esc(v.note)}</p>` : ''}
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>`;
  const parts = [centredIntro(p, demo), oneView(p.name, inner, oneMedia(v))];
  if (p.empower) parts.push(section({ id: 'impact' }, `${head('impact', p.empower.head[0], p.empower.head[1])}${dItems(p.empower.items, 'bben--4')}`));
  if (p.monitor) parts.push(section({ id: 'monitoring' }, `${head('monitoring', p.monitor.head[0], p.monitor.head[1])}${monitorBlock(p.monitor)}`));
  if (p.why) parts.push(section({ id: 'why-sygnet' }, `${head('why-sygnet', p.why.head[0], p.why.head[1])}${dStrip(p.why.items, p.why.head[0], p.why.items.length === 5 ? 'bstr--5' : '')}`));
  if (p.how) parts.push(section({ id: 'how' }, `${head('how', p.how.head[0], p.how.head[1])}
<ol class="dsteps dsteps--${p.how.items.length}">${p.how.items.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>`));
  if (p.where) parts.push(section({ id: 'where' }, `${head('where', p.where.head[0], p.where.head[1])}${fitCards(p.where.items)}`));
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body: parts.join('\n'),
    close: { h2: p.close.h2, line: p.close.line, label: 'Request a demo', href: demo } });
}

// Rural Water Center (Synget Water Centers_26.pdf): the PDF's sections in its order, the comparison table last
function rwcPage(p) {
  const demo = `/contact/?product=${p.slug}#demo`;
  const v = p.view;
  const inner = `${viewHead(v)}
      <h3 class="bv__label">Services offered</h3>
      <ul class="qi">${v.services.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
      <h3 class="bv__label">Designed for</h3>
      <ul class="bv__apps">${v.for.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      <h3 class="bv__label">On every centre</h3>
      ${checks(v.marks)}
      <div class="btn-row">${btn(demo, 'Request a demo')}</div>`;

  const how = section({ id: 'how' }, `${head('how', 'How a Rural Water Center works.', 'Simple, sustainable and scalable.')}
<ol class="dsteps dsteps--6">${p.process.map(([ic, t, x], k) => `<li><span class="bben__ico">${icon(ic)}</span><span class="dsteps__n">0${k + 1}</span><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ol>
<h3 class="dlabel">Water sources supported</h3>
${dStrip(p.sources, 'Water sources supported', 'rwsrc')}`);

  const architecture = section({ id: 'architecture' }, `${head('architecture', 'Solution architecture.', 'From source to safe water for all.')}
<ol class="tcflow" aria-label="From source to community">${p.chain.map((c, k) => `<li>${k ? `<svg class="tcflow__sep" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}<span>${esc(c)}</span></li>`).join('')}</ol>
<h3 class="dlabel">Infrastructure components</h3>
<div class="tcroi">${p.components.map(([ic, t, list]) => `<article class="tcroi__c"><span class="bben__ico">${icon(ic)}</span><h4>${esc(t)}</h4>${checks(list)}</article>`).join('')}</div>`);

  const access = section({ id: 'access-models' }, `${head('access-models', 'Community access models.', 'Flexible ways to get water to people.')}
<div class="tcroi rwacc">${p.access.map((m, k) => `<article class="tcroi__c"><span class="rwacc__n">Model ${k + 1}</span><span class="bben__ico">${icon(m.ic)}</span><h4>${esc(m.name)}</h4><p class="rwacc__label">${esc(m.label)}</p>${checks(m.list)}<p class="rwacc__close">${esc(m.close)}</p></article>`).join('')}</div>
${dStrip(p.accessStrip, 'What the access models bring')}`);

  const monitoring = section({ id: 'monitoring' }, `${head('monitoring', 'Technology powered by Sygnet Water Connect.', 'A smart water management platform.')}
<div class="dmon wamon">
  <div class="dmon__copy"><h3>Real-time monitoring</h3>${checks(p.monitoring)}</div>
  <div class="dmon__screen">${ONE_SCREENS.rwc()}</div>
</div>
<h3 class="dlabel">Stakeholder dashboards</h3>
${dItems(p.stakeholders, 'bben--4')}
${dStrip(p.platform, 'What the platform gives you')}
<p class="bline">Every drop <span>accounted for.</span></p>`);

  const matters = section({ id: 'why-it-matters' }, `${head('why-it-matters', 'Why safe drinking water matters.', 'Water is not just a utility. It is a human right.')}
<div class="tcroi">${p.impact.map(([ic, t, list]) => `<article class="tcroi__c"><span class="bben__ico">${icon(ic)}</span><h4>${esc(t)}</h4>${checks(list)}</article>`).join('')}</div>`);

  const benefits = section({ id: 'benefits' }, `${head('benefits', 'Benefits for NGOs and institutions.', 'Transparent today. Sustainable tomorrow.')}
<div class="wa2">
  <div class="dcard"><h3 class="dlabel">NGOs: complete transparency</h3>${dList(p.ngo.transparency)}<h3 class="dlabel rwlabel">NGOs: long-term sustainability</h3>${dList(p.ngo.sustainability)}</div>
  <div class="dcard"><h3 class="dlabel">Institutions: suitable for</h3><ul class="bv__apps rwapps">${p.institutions.suitable.map(a => `<li>${esc(a)}</li>`).join('')}</ul><h3 class="dlabel rwlabel">Institutions: benefits</h3>${dList(p.institutions.benefits)}</div>
</div>`);

  const csr = section({ id: 'csr' }, `${head('csr', 'CSR alignment.', 'A fit for CSR programmes.')}
<h3 class="dlabel">Supports CSR objectives under</h3>
${dStrip(p.csr, 'CSR objectives', 'rwcsr')}
<h3 class="dlabel">Supports the Sustainable Development Goals</h3>
<ul class="wasdg wasdg--5">${p.sdgs.map(([n, t]) => `<li><span class="wasdg__n">SDG ${esc(n)}</span><span>${esc(t)}</span></li>`).join('')}</ul>`);

  const metrics = section({ id: 'metrics' }, `${head('metrics', 'Success metrics.', 'What each centre measures.', 'The key performance indicators reported for every Rural Water Center.')}
<div class="tcroi">${p.kpis.map(([ic, t, list]) => `<article class="tcroi__c"><span class="bben__ico">${icon(ic)}</span><h4>${esc(t)}</h4>${checks(list)}</article>`).join('')}</div>`);

  const partners = `<section class="section ground-inverse band" id="partners" aria-labelledby="partners-h"><div class="wrap">
${head('partners', 'Partnership opportunities.', 'Let’s build sustainable water access together.', 'We equip NGOs, foundations, trusts, government bodies and institutions with a complete technology ecosystem to manage, scale and sustain Rural Water Centers.')}
<ol class="lcards lcards--3">${p.partners.map(([ic, t, list], k) => `<li class="lcard"><span class="lcard__ico">${HEX}${icon(ic)}</span><span class="lcard__n">0${k + 1}</span><b class="lcard__t">${esc(t)}</b><ul class="rwpl">${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ol>
<h3 class="dlabel">Who we partner with</h3>
<ul class="dwatch">${p.partnerWith.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
<p class="bline">We provide the technology. <span>You create impact.</span></p>
</div></section>`;

  const why = section({ id: 'why-sygnet' }, `${head('why-sygnet', 'Why Sygnet Water Connect.', 'A complete water technology partner.')}
<h3 class="dlabel">Expertise across the water ecosystem</h3>
${fitCards(p.expertise)}
<div class="dcard rwvision"><h3 class="dlabel">Our vision</h3><p class="rwvision__p">${esc(p.vision)}</p><h3 class="dlabel rwlabel">Together we can</h3>${dStrip(p.together, 'Together we can', 'rwtog')}</div>`);

  const c = p.compare;
  const cols = ['Traditional water projects', 'Rural Water Center model'];
  const compare = section({ id: 'compare' }, `${head('compare', 'Moving beyond donation-dependent projects.')}
<div class="compare compare--tc compare--rw" role="region" aria-labelledby="compare-h"><table role="table">
<thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Area</th>${cols.map(t => `<th scope="col" role="columnheader">${t}</th>`).join('')}</tr></thead>
<tbody role="rowgroup">${c.rows.map(([a, t, r]) => `<tr role="row"><th scope="row" role="rowheader">${esc(a)}</th><td role="cell" data-label="${cols[0]}"><span class="dcmp dcmp--n">${icon('x')}<span>${esc(t)}</span></span></td><td role="cell" data-label="${cols[1]}"><span class="dcmp dcmp--y">${icon('check')}<span>${esc(r)}</span></span></td></tr>`).join('')}</tbody></table></div>
<p class="compare__note">${esc(c.note)}</p>`);

  const body = [centredIntro(p, demo), oneView(p.name, inner, oneMedia(v)), how, architecture, access, monitoring, matters, benefits, csr, metrics, partners, why, compare].join('\n');
  return page({ path: url.product(p.slug), nav: 'products', title: p.title, desc: p.desc, body,
    close: { h2: 'Bring safe drinking water to every village', line: 'Tell us about the villages or institutions you want to serve and we will walk you through the Rural Water Center, the access models and the reporting.', label: 'Request a demo', href: demo } });
}

// ---------------------------------------------------------------- industries (site.css "industry explorer")
// One component for Home and /industries/ (data.mjs INDUSTRIES): a selector row of nine cut-corner industry cards,
// then one panel: H3 and the intro, "Where Sygnet helps" (use-case cards), "Sygnet solutions for <industry>" (chips to
// the product pages and the /solutions/ group), one "Request a demo" button and "Explore <industry>" (its own page).
// The selector cards are plain links to #<slug>, so without script they jump to the panels, which all stack in the
// HTML. ixScript turns them into tabs: one panel at a time, the hash follows the choice (#healthcare ...), arrow keys,
// Home and End move between tabs; a short fade only when motion is allowed. Each industry page reuses the parts.
const solGroupLink = i => i.group ? `/solutions/#${i.group.toLowerCase().replace(/[^a-z]+/g, '-')}` : '';
const ixHex = (ic, cls = 'ix__hex') => `<span class="${cls}">${HMC_HEX}${icon(ic)}</span>`;
// use-case cards: the hexagon icon, the use case, its line when the source has one
const ixCards = (i, cls = '') => `<ul class="ix__cards${cls}">${i.helps.map(([ic, t, x]) => `<li class="ix__card">${ixHex(ic, 'hmc__ico')}<span class="hmc__t"><b>${esc(t)}</b>${x ? `<small>${esc(x)}</small>` : ''}</span></li>`).join('')}</ul>`;
// solution chips: each product page that lists the industry, then its /solutions/ group
function ixChips(i) {
  const prods = i.products.map(s => productBySlug[s]).map(p => `<li><a class="ix__chip" href="${url.product(p.slug)}">${icon(p.icon)}<span>${esc(p.short)}</span>${p.soon ? '<em>Coming soon</em>' : ''}</a></li>`);
  const grp = i.group ? [`<li><a class="ix__chip ix__chip--sol" href="${solGroupLink(i)}">${icon('layers')}<span>${esc(i.group)} solutions</span></a></li>`] : [];
  return `<ul class="ix__chips">${[...prods, ...grp].join('')}</ul>`;
}
const ixDemo = i => `/contact/?industry=${i.slug}#demo`;
function ixPanel(i, k) {
  return `<article class="ix__panel${k === 0 ? ' is-active' : ''}" id="${i.slug}" aria-labelledby="${i.slug}-h">
    <div class="ix__head">${ixHex(i.icon)}<div><p class="ix__suite">${esc(i.suite)}</p><h3 id="${i.slug}-h">${esc(i.name)}</h3></div></div>
    <p class="ix__intro">${esc(i.intro)}</p>
    <div class="ix__helps"><h4 class="ix__label">Where Sygnet helps</h4>${ixCards(i)}</div>
    <div class="ix__sols"><h4 class="ix__label">Sygnet solutions for ${esc(i.name.toLowerCase())}</h4>${ixChips(i)}</div>
    <div class="ix__act">${btn(ixDemo(i), 'Request a demo')}<a class="ix__more" href="${url.industry(i.slug)}">Explore ${esc(i.name)}${ARROW}</a></div>
  </article>`;
}
const ixTab = i => `<a class="ix__tab" href="#${i.slug}" id="ixt-${i.slug}" aria-controls="${i.slug}">${ixHex(i.icon, 'ix__tico')}<span class="ix__tname">${esc(i.name)}</span></a>`;
function industryExplorer() {
  return `<div class="ix" data-ix>
  <div class="ix__tabs" aria-label="Choose an industry">
    ${INDUSTRIES.map(ixTab).join('\n    ')}
  </div>
  <div class="ix__stage">
  ${INDUSTRIES.map(ixPanel).join('\n  ')}
  </div>
</div>`;
}
const ixScript = `<script>(function(){[].forEach.call(document.querySelectorAll('[data-ix]'),function(root){
var list=root.querySelector('.ix__tabs'),tabs=[].slice.call(list.querySelectorAll('.ix__tab'));
var panels=tabs.map(function(t){return document.getElementById(t.getAttribute('aria-controls'))}),ids=panels.map(function(p){return p.id}),cur=-1;
var d=document.documentElement,still=matchMedia('(prefers-reduced-motion: reduce)');
function calm(){return still.matches||d.dataset.motion==='off'}
root.classList.add('ix--js');list.setAttribute('role','tablist');
tabs.forEach(function(t,i){t.setAttribute('role','tab');panels[i].setAttribute('role','tabpanel');panels[i].setAttribute('aria-labelledby',t.id)});
function reveal(t,smooth){var l=t.offsetLeft,r=l+t.offsetWidth,x=list.scrollLeft,w=list.clientWidth,to=x;
 if(l<x)to=l-12;else if(r>x+w)to=r-w+12;if(to!==x)list.scrollTo({left:to,behavior:smooth&&!calm()?'smooth':'auto'})}
function show(i,o){o=o||{};if(i<0||i>=tabs.length)return;
 tabs.forEach(function(t,k){var on=k===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;t.classList.toggle('is-active',on);
  panels[k].hidden=!on;panels[k].classList.toggle('is-active',on);panels[k].classList.remove('ix-in')});
 if(cur>=0&&i!==cur&&!calm()){void panels[i].offsetWidth;panels[i].classList.add('ix-in')}
 cur=i;reveal(tabs[i],!o.instant);if(o.hash&&location.hash!=='#'+ids[i])history.replaceState(null,'','#'+ids[i])}
function bring(){root.scrollIntoView({behavior:calm()?'auto':'smooth',block:'start'})}
tabs.forEach(function(t,i){t.addEventListener('click',function(e){e.preventDefault();show(i,{hash:true})})});
list.addEventListener('keydown',function(e){var k=e.key,n=tabs.length,i=cur;
 if(k==='ArrowRight'||k==='ArrowDown')i=(cur+1)%n;else if(k==='ArrowLeft'||k==='ArrowUp')i=(cur-1+n)%n;else if(k==='Home')i=0;else if(k==='End')i=n-1;else return;
 e.preventDefault();show(i,{hash:true});tabs[i].focus({preventScroll:true})});
var start=ids.indexOf(location.hash.slice(1));show(start<0?0:start,{instant:true});
if(start>=0){var land=function(){root.scrollIntoView({block:'start'})};requestAnimationFrame(land);addEventListener('load',land,{once:true})}
addEventListener('hashchange',function(){var i=ids.indexOf(location.hash.slice(1));if(i>=0){show(i);bring()}});
})})()</script>`;

function industriesIndex() {
  const body = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">Industries</p>
  <h1 id="hero-h">Industry suites for hospitals, mills, water and cities</h1>
  <p class="t-lead">Nine suites built on Sygnet IoT Connect. Each one bundles the Sygnet products and monitoring solutions that industry asks for most.</p>
  <div class="btn-row">${demoBtn()}${btn('/solutions/', 'All solutions', 'secondary')}</div>
</div></section>
<section class="section ix-sec" id="explore" aria-labelledby="explore-h"><div class="wrap">
${head('explore', 'Choose your industry.', 'See where Sygnet helps.')}
${industryExplorer()}
<p class="ix__note">Also serving logistics and hospitality.</p>
</div></section>
${ixScript}`;
  return page({ path: '/industries/', nav: 'industries', title: 'Industries: IoT suites for healthcare, manufacturing, water, energy and more', desc: 'Sygnet IoT industry suites for healthcare, manufacturing, water, energy, retail, buildings, agriculture, smart cities and education.', body,
    close: { h2: 'Talk to us about your industry', line: 'Tell us what you run and we will walk you through the Sygnet products for it, on your own use case.', href: '/contact/?topic=industry#demo' } });
}

// an industry's own page: the same parts as its panel, at full width, then the other eight as links
function industryPage(i) {
  const others = INDUSTRIES.filter(o => o.slug !== i.slug);
  const prods = i.products.map(s => productBySlug[s]);
  const body = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  ${ixHex(i.icon, 'ix__hex ix__hex--hero')}
  <p class="eyebrow">${esc(i.suite)}</p>
  <h1 id="hero-h">${esc(i.h1)}</h1>
  <p class="t-lead">${esc(i.intro)}</p>
  <div class="btn-row">${btn(ixDemo(i), 'Request a demo')}${btn('/industries/', 'All industries', 'secondary')}</div>
</div></section>
${section({ id: 'helps', cls: 'ix-sec' }, `${head('helps', 'Where Sygnet helps.', `${i.who}.`)}${ixCards(i, ' ix__cards--page')}`)}
${section({ id: 'solutions', cls: 'ix-sec' }, `${head('solutions', `Sygnet solutions for ${i.name.toLowerCase()}.`)}${productGrid(prods)}
${i.group ? `<p class="ix__grp"><a class="ix__more" href="${solGroupLink(i)}">See the ${esc(i.group.toLowerCase())} monitoring solutions${ARROW}</a></p>` : ''}`)}
${i.slug === 'healthcare' ? trustBlock('proof') : ''}
${section({ id: 'more', cls: 'ix-sec' }, `${head('more', 'Other industries.')}<nav class="ix__tabs ix__tabs--links" aria-label="Other industries">${others.map(o => `<a class="ix__tab" href="${url.industry(o.slug)}">${ixHex(o.icon, 'ix__tico')}<span class="ix__tname">${esc(o.name)}</span></a>`).join('')}</nav>`)}`;
  return page({ path: url.industry(i.slug), nav: 'industries', title: `${i.suite}: ${i.h1}`, desc: `${i.suite} by Sygnet IoT for ${i.who.toLowerCase()}: ${prods.map(p => p.short).join(', ')}, on the Sygnet IoT Connect platform.`, body,
    close: { h2: `Talk to us about ${i.name.toLowerCase()}`, href: ixDemo(i) } });
}

// ---------------------------------------------------------------- core pages
// the five layers as a stack of cut-corner bars: the platform's hero picture
const layerStack = () => `<div class="hero-visual stackvis span-6 start-7" role="img" aria-label="The five layers of Sygnet IoT Connect: device, edge, cloud, applications and AI">${[...LAYERS].reverse().map(([n], k) => `<span class="stackvis__l stackvis__l--${k}">${icon(['brain', 'smartphone', 'cloud', 'router', 'cpu'][k])}<b>${n}</b></span>`).join('')}</div>`;

function platform() {
  const body = `${heroSplit({ notice: 'Sygnet IoT Connect', h1: 'One IoT platform from device to AI', lead: 'Connect any device, collect its data, automate at the edge and run industry apps on top, in the cloud or on your own servers. Every Sygnet product runs on it.', visual: layerStack(), actions: `${demoBtn()}${btn('/developer/', 'Developer details', 'secondary')}` })}
${section({ id: 'layers' }, `${head('layers', 'Every layer connected.', 'From devices to AI, everything works together.')}${layersList()}`)}
${statement('The four jobs the platform does for every device you connect, whether it is a bed switch, a loom or a water tap.')}
<section class="section ground-inverse band" id="security" aria-labelledby="security-h"><div class="wrap">
${head('security', 'Security built in.', 'From the device to the dashboard.')}
<div class="grid grid--top"><div class="span-6 stack-5">${checks(SECURITY)}</div>
<div class="span-6 start-7">${slot('Security certifications and compliance details')}</div></div>
</div></section>
${section({ id: 'build' }, `${head('build', 'Built for developers, ready for enterprises.', 'Open interfaces and flexible deployment.')}${cardRow(DEV.map(([t, x]) => ({ title: t, text: x })))}
<div class="stack-4" style="margin-top: var(--s-6)"><p class="t-label muted">Industry suites on the platform</p><div class="chips">${industryLinks(INDUSTRIES.map(i => i.slug))}</div><a class="link" href="/solutions/">See all ${SOLUTION_COUNT} solutions</a></div>`)}
${revealScript}
`;
  return page({ path: '/platform/', nav: 'platform', title: 'Sygnet IoT Connect: IoT platform from device to cloud to AI', desc: 'Sygnet IoT Connect: device, edge, cloud, applications and AI layers, REST, MQTT and Webhooks, SDKs, multi-tenant SaaS, white label, secure OTA, cloud or on-premise.', body });
}

// ---------------------------------------------------------------- Solutions (/solutions/, site.css "solutions page")
// A plain page (client, 2026-11-20): a centred header with a row of jump chips (one a section, plain #links); one hairline row per solution group (name and count left;
// right, the group's solutions as its description, the Sygnet product pages it uses as text links,
// and a small render only where a clean Sygnet-branded one exists); the custom-build row; then the footer without
// its Sky band (layout.mjs close: false; the closing "Request a demo" line was removed at the client's request,
// 2026-11-20). No script, no animation but the links' hover. The header wears the Platform hero's ground
// (.hero--brand: the mark's chevrons and hexagon in a faint tint on Mist). No count in the H1: 52 was our
// own tally of the cleaned old-site list, in no client document. Row ids are the anchors Home and the industry pages link to (#water ... #cross-industry).
const solSlug = g => g.toLowerCase().replace(/[^a-z]+/g, '-');
const solItem = s => { const [n, l] = s.split('|'); return { n, p: l ? productBySlug[l] : null }; };
// the Sygnet products a group's solutions link to, in order, each once
const solProducts = g => [...new Map(g.items.map(solItem).filter(i => i.p).map(i => [i.p.slug, i.p])).values()];
// renders that show the Sygnet name cleanly (Water ATM panel, NCS station display, QMS kiosk, Community Milk ATM)
const SOL_RENDERS = { Water: ['water-atm-panel-cut'], Healthcare: ['ncs-station-display-cut', 'qms-kiosk-cut'], Dairy: ['dairy-milk-atm-cut'] };
const SOL_ROWS = [['utilities', 'Water, energy, buildings and factories', ['Water', 'Energy', 'Building & Utility', 'Industrial']],
  ['sectors', 'Hospitals, dairies, farms and fleets', ['Healthcare', 'Dairy', 'Agriculture', 'Cross-industry']]];
const solLink = (href, text, cls = 'solp-a') => `<a class="${cls}" href="${href}">${text}</a>`;
const solProdList = list => `<ul class="solp-prods">${list.map(p => `<li>${solLink(url.product(p.slug), esc(p.name))}${p.soon ? ' <span class="solp-soon">(coming soon)</span>' : ''}</li>`).join('')}</ul>`;
const solPics = ids => ids ? `<figure class="solp-pics">${ids.map(id => bellImg(id)).join('')}<figcaption>Product render</figcaption></figure>` : '';

function solRow(g, hTag = 'h3') {
  const id = solSlug(g.group), prods = solProducts(g), pics = SOL_RENDERS[g.group];
  return `<li class="solp-row" id="${id}">
    <div class="solp-row__name"><${hTag} id="${id}-h">${esc(g.group)} solutions</${hTag}><p class="solp-row__n">${g.items.length} solutions</p></div>
    <div class="solp-row__body${pics ? ' solp-row__body--pic' : ''}">
      <div class="solp-row__text">
        <p class="solp-row__desc">${g.items.map(s => esc(solItem(s).n)).join(', ')}.</p>
        ${prods.length ? `<div class="solp-row__prods"><span class="solp-label">Products it uses</span>${solProdList(prods)}</div>` : ''}
      </div>
      ${solPics(pics)}
    </div>
  </li>`;
}

function solutions() {
  const byName = Object.fromEntries(SOLUTIONS.map(g => [g.group, g]));
  const head = `<section class="section solp-head hero--brand" aria-labelledby="hero-h"><div class="wrap">
  <p class="solp-eyebrow">Solutions</p>
  <h1 id="hero-h">IoT monitoring solutions on one platform</h1>
  <p class="solp-lead">Water, energy, buildings, factories, hospitals, dairies, farms and fleets. Each solution runs on Sygnet IoT Connect, and many come as part of a Sygnet product.</p>
  <nav class="solp-jump" aria-label="Jump to a solution"><ul>${SOL_ROWS.flatMap(r => r[2]).map(n => `<li><a href="#${solSlug(n)}">${esc(n)}</a></li>`).join('')}<li><a href="#custom">Not on the list?</a></li></ul></nav>
</div></section>`;
  const list = `<section class="section solp-list" aria-label="All solutions"><div class="wrap">
  ${SOL_ROWS.map(([k, label, names]) => `<h2 class="solp-group" id="g-${k}">${esc(label)}</h2>
  <ul class="solp-rows" aria-labelledby="g-${k}">
  ${names.map(n => solRow(byName[n])).join('\n  ')}
  </ul>`).join('\n  ')}
  <div class="solp-rows solp-rows--custom">
    <div class="solp-row" id="custom">
      <div class="solp-row__name"><h2 id="custom-h">Not on the list?</h2><p class="solp-row__n">We build custom IoT, circuit to cloud.</p></div>
      <div class="solp-row__body"><div class="solp-row__text">
        <p class="solp-row__desc">If the device you need does not exist yet, our engineers design the board, write the firmware, connect it to the platform and build the app.</p>
        <div class="solp-row__prods">${solProdList(['textile-connect', 'water-atm', 'dairy-connect'].map(s => productBySlug[s]))}</div>
        <a class="solp-a solp-more" href="/hardware/">See custom engineering${ARROW}</a>
      </div></div>
    </div>
  </div>
</div></section>`;
  const body = `${head}\n${list}`;
  return page({ path: '/solutions/', nav: 'solutions', title: 'Solutions: IoT monitoring solutions for every industry', desc: `IoT monitoring solutions from Sygnet IoT: water, energy, building and utility, industrial, healthcare, dairy, agriculture and cross-industry.`, body, close: false });
}

function hardware() {
  const body = `${heroSplit({ notice: 'Smart edge hardware', h1: 'Industrial IoT hardware, and custom boards built to order', lead: 'Controllers, sensor nodes, gateways and edge devices made for Sygnet IoT Connect, plus custom engineering from PCB design and firmware to certification and production.', visual: shotVisual('hw-industrial-gateway'), actions: `${demoBtn('Talk to an engineer')}${btn('/developer/', 'Developer details', 'secondary')}` })}
${section({ id: 'range', h: 2 }, `${head('range', 'The hardware range.', 'Built for reliability, scalability and rapid deployment.')}
<div class="grid grid--cards">${HARDWARE.map(([n, img]) => `<article class="card card--img span-3 m-nolift">${shot(img, '', { cls: 'card__shot' })}<h3>${esc(n)}</h3></article>`).join('')}</div>
<div class="chips" style="margin-top: var(--s-6)">${HW_QUALITIES.map(q => `<span class="chip chip--static">${q}</span>`).join('')}</div>
<div style="margin-top: var(--s-6)">${slot('Model-wise specifications for each category', 'Specifications coming soon')}</div>`)}
${section({ id: 'engineering' }, `${head('engineering', 'Custom engineering, circuit to cloud.', 'One team from the first schematic to production.')}${layersList(ENGINEERING)}`)}
${section({ id: 'certs' }, `${head('certs', 'Certifications.', 'As listed in our NCS catalog.')}
<p class="t-label muted" style="margin-bottom: var(--s-4)">${esc(CERTS_NOTE)}</p>${certBadges()}</div>`)}`;
  return page({ path: '/hardware/', nav: 'platform', title: 'Smart edge hardware: controllers, gateways, sensor nodes and custom engineering', desc: 'Sygnet smart edge hardware: industrial controllers, sensor nodes, wireless nodes, bridge devices, industrial gateways, data loggers, communication modules and edge computing devices.', body });
}

function developer() {
  const code = `<div class="win win--dark" role="img" aria-label="Illustrative code showing a device publishing telemetry over MQTT">
<div class="win__bar"><span class="win__dots"><i></i><i></i><i></i></span><span class="win__title">device.py</span><span class="win__tag">Illustrative screen</span></div>
<pre class="code"><span class="c"># Illustrative only.</span>
<span class="c"># The API reference is coming soon.</span>
client.connect(broker)
client.publish(
  "devices/&lt;device-id&gt;/telemetry",
  payload
)
<span class="c"># A webhook fires on your server.</span>
<span class="c"># REST reads history for your app.</span></pre></div>`;
  const body = `${heroSplit({ notice: 'REST · MQTT · Webhooks', h1: 'Build on Sygnet IoT Connect', lead: 'Open APIs, SDKs for Flutter, Python, Node.js and embedded devices, secure OTA firmware updates, and white label for your own brand.', visual: `<div class="hero-visual frame frame--win span-6 start-7">${code}</div>`, actions: `${btn('/contact/?topic=developer#demo', 'Request API access')}${btn('/platform/', 'Platform overview', 'secondary')}` })}
${section({ id: 'apis' }, `${head('apis', 'Three ways to talk to the platform.', 'Use the one that fits your system.')}${cardRow([['REST', 'Read and manage devices and data from any app or server.', 'database'], ['MQTT', 'Light, real-time messaging for devices in the field.', 'radio'], ['Webhooks', 'Events pushed to your server as they happen.', 'workflow']].map(([t, x, ic]) => ({ title: t, text: x, ico: ic })))}
<div style="margin-top: var(--s-6)" class="stack-4"><p class="t-label muted">SDKs</p><div class="chips">${['Flutter', 'Python', 'Node.js', 'Embedded'].map(s => `<span class="chip chip--static">${s}</span>`).join('')}</div></div>`)}
${section({ id: 'features' }, `${head('features', 'What else is in the box.', 'For products you build and brand.')}${cardRow(DEV.slice(2).map(([t, x]) => ({ title: t, text: x })))}`)}
${section({ id: 'docs' }, `${head('docs', 'Documentation.', 'The API reference is being prepared.')}
<div class="grid grid--top"><div class="span-6">${slot('API reference and SDK documentation', 'Coming soon')}</div>
<div class="span-6 start-7 stack-5"><p class="t-lead">Until the docs are public, our engineers share the API details directly with your team.</p><div class="btn-row">${btn('/contact/?topic=developer#demo', 'Request API access')}</div></div></div>`)}`;
  return page({ path: '/developer/', nav: 'platform', type: 'software', title: 'Developer: APIs, SDKs and OTA for Sygnet IoT Connect', desc: 'Build on Sygnet IoT Connect: REST, MQTT and Webhooks, SDKs for Flutter, Python, Node.js and embedded, multi-tenant, white label, secure OTA, cloud or on-premise.', body, close: { h2: 'Get API access for your team', label: 'Request API access', href: '/contact/?topic=developer#demo' } });
}

function resources() {
  const lib = [['Product flyers', 'Napkin Vending, Water ATM Panel and Smart Milk Vending. Reverse Vending to come.', 'file-text'], ['Product catalogues', 'Nurse call, queue management, school bell, water, textile and dairy catalogues.', 'clipboard-list'], ['API reference', 'REST, MQTT and Webhooks documentation.', 'database'], ['Company profile', 'Sygnet IoT capabilities in one document.', 'building']];
  const body = `${heroSplit({ notice: 'Resources', h1: 'Brochures, catalogues and documentation', lead: 'Product flyers, catalogues and technical documents for Sygnet products. Ask our team and we will send the one you need while the download library is prepared.', visual: shotVisual('bell-range-tbw-d'), actions: `${btn('/contact/?topic=brochure#demo', 'Ask for a brochure')}${btn('/case-studies/', 'Case studies', 'secondary')}` })}
${section({ id: 'library' }, `${head('library', 'The library.', 'Downloads go live as each document is approved.')}
${cardRow(lib.map(([t, x, ic]) => ({ title: t, text: x, ico: ic })))}
<div style="margin-top: var(--s-6)">${slot('Downloadable PDF versions of each document', 'Coming soon')}</div>`)}
${section({ id: 'questions' }, `${head('questions', 'Common questions.', 'Answered from what we do today.')}${faq([
    ['Do you build custom hardware?', 'Yes. Custom IoT engineering covers PCB design, firmware, cloud, apps and certification through to production.'],
    ['Can the platform run on our own servers?', 'Yes. Sygnet IoT Connect runs in the cloud or on-premise.'],
    ['Can we put our own brand on it?', 'Yes. The platform supports white label.'],
    ['Where are you based?', 'In Surat, Gujarat, India.'],
  ])}`)}`;
  return page({ path: '/resources/', nav: 'platform', title: 'Resources: Sygnet IoT brochures, catalogues and documentation', desc: 'Sygnet IoT resources: product flyers, catalogues, API reference and company profile, with answers to common questions.', body });
}

function partners() {
  const tierPanel = `<div class="hero-visual frame frame--win span-6 start-7"><div class="win" role="img" aria-label="The four partner tiers"><div class="win__bar"><span class="win__dots"><i></i><i></i><i></i></span><span class="win__title">Partner tiers</span></div><div class="win__body">
<table class="tiers"><thead><tr><th scope="col">Tier</th><th scope="col">Partner level</th></tr></thead><tbody>${TIERS.map(([m, r]) => `<tr><th scope="row"><span class="tier__dot tier--${m.toLowerCase()}"></span>${m}</th><td>${r}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  const body = `${heroSplit({ notice: 'Partner program', h1: 'Partner program for integrators and resellers', lead: 'Sell, install and support Sygnet products in your region. Four tiers, from Authorized Partner to Strategic Partner, each with training and support.', visual: tierPanel, actions: `${btn('/contact/?topic=partner#demo', 'Apply to partner')}${btn('/products/', 'See the products', 'secondary')}` })}
${section({ id: 'who' }, `${head('who', 'Who we partner with.', 'Businesses that already serve our industries.')}${cardRow([['System integrators', 'Add Sygnet products to the projects you already deliver.', 'workflow'], ['Resellers', 'Sell the Sygnet range to hospitals, schools, mills and utilities.', 'store'], ['OEMs', 'Build Sygnet hardware or the platform into your own products, under white label.', 'cpu']].map(([t, x, ic]) => ({ title: t, text: x, ico: ic })))}`)}
${section({ id: 'tiers' }, `${head('tiers', 'Four tiers.', 'Grow from Bronze to Platinum.')}
<div class="grid grid--cards">${TIERS.map(([m, r, b]) => `<article class="card span-3 m-nolift tier tier--${m.toLowerCase()}"><span class="tier__swatch"></span><span class="tier__metal">${m}</span><p class="t-label muted">${r}</p><ul class="checks">${b.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div>
<div style="margin-top: var(--s-6)">${slot('Tier requirements, partner terms and partner logos')}</div>`)}`;
  return page({ path: '/partners/', nav: 'partners', title: 'Partner program: Bronze, Silver, Gold and Platinum Sygnet partners', desc: 'Become a Sygnet IoT partner: Bronze (Authorized), Silver (Solution), Gold (Advanced) and Platinum (Strategic) tiers for system integrators, resellers and OEMs.', body, close: { h2: 'Apply to become a Sygnet partner', label: 'Apply to partner', href: '/contact/?topic=partner#demo' } });
}

// ---------------------------------------------------------------- Company / About (/company/)
// Rebuilt 2026-11-20 from the Sygnet Profile (data.mjs COMPANY) on the bell page's parts: the centred intro (.bintro),
// the viewer (.bv, bellScript) for the four industry applications (#healthcare, #manufacturing, #retail, #utilities;
// all four panels are in the HTML, so without script they stack and read in full), the lists (.bben, .bstr, .bline),
// the Indigo band (.lcards) and the Sky placeholder (slot). The profile's Solution, Platform, Hardware and Contact
// pages are not used here; one link row points to the site's own pages. "Formerly Resonent" appears on this page only.
// site.css "company page".
const coHex = (ic, cls = 'cohex') => `<span class="${cls}">${HEX}${icon(ic)}</span>`;
const coPills = (list, label) => `<ul class="copills" aria-label="${esc(label)}">${list.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>`;
const coHl = ([a, b, c]) => `${esc(a)}<span class="cvm__hl">${esc(b)}</span>${esc(c)}`;
function company() {
  const C = COMPANY;
  const intro = `<section class="section bintro hero--brand" data-enter aria-labelledby="hero-h"><div class="wrap">
  <p class="eyebrow">About Sygnet IoT</p>
  <h1 id="hero-h">Engineering the future of connected operations</h1>
  <p class="t-lead">${esc(SITE.line)}.</p>
  <div class="btn-row">${demoBtn()}${btn('/products/', 'See our products', 'secondary')}</div>
  <p class="bintro__former">Formerly ${esc(SITE.formerly)}</p>
</div></section>`;

  const about = section({ id: 'about' }, `${head('about', 'About Sygnet IoT.', 'A full stack Industrial IoT platform company.')}
<ul class="cocards">${C.about.map(([ic, t, x]) => `<li class="cocard">${coHex(ic)}<h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join('')}</ul>
${coPills(C.strengths, 'Our strengths')}`);

  const purpose = `<section class="section ground-inverse band" id="purpose" aria-labelledby="purpose-h"><div class="wrap">
${head('purpose', 'Vision, mission and purpose.', 'What Sygnet works towards.')}
<div class="cvm">
  <article class="cvm__card">${coHex('telescope', 'cvm__ico')}<h3 class="cvm__label">Vision</h3><p class="cvm__q">${coHl(C.vision)}</p></article>
  <article class="cvm__card">${coHex('target', 'cvm__ico')}<h3 class="cvm__label">Mission</h3><p class="cvm__q">${coHl(C.mission)}</p></article>
</div>
<h3 class="dlabel">Our core purpose: helping organizations</h3>
<ul class="lcards lcards--short">${C.purpose.map(([ic, t]) => `<li class="lcard"><span class="lcard__ico">${HEX}${icon(ic)}</span><b class="lcard__t">${esc(t)}</b></li>`).join('')}</ul>
<h3 class="dlabel">Our values</h3>
${dStrip(C.values, 'Our values', 'bstr--6')}
</div></section>`;

  const challenge = section({ id: 'challenge' }, `${head('challenge', 'Why Industrial IoT projects struggle.', 'Too many parts to join up.')}
<p class="cochal__lead">To connect one operation, organizations must integrate all of these:</p>
<ul class="coparts">${C.stack.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
<p class="cochal__lead">This complexity increases project cost, delays deployment and impacts ROI.</p>
${dStrip(C.impact, 'What the complexity does')}
<p class="bline">Sygnet brings the hardware, firmware, cloud and apps together <span>under one company.</span></p>`);

  // the industry viewer: a selector of four, then one panel; the picture side is a designed card (the profile's
  // device pictures on p. 8 carry no Sygnet mark), so it repeats the list as hexagon tiles and is hidden from screen readers
  const appPanel = (a, i) => `<article class="bv__panel${i === 0 ? ' is-active' : ''}" id="${a.id}">
    <div class="bv__text">
      <p class="bv__code">Industry application</p>
      <h3 class="bv__name" id="${a.id}-h">${esc(a.name)}</h3>
      <p class="bv__line">${esc(a.line)}</p>
      <h4 class="bv__label">Applications</h4>
      ${checks(a.items.map(([, t]) => t))}
      <div class="bv__best"><span class="bv__best-ico">${BHEX}${icon('cloud')}</span><div><h4 class="bv__label">Platform</h4><p>Built on Sygnet IoT Connect.</p></div></div>
      <h4 class="bv__label">Sygnet products</h4>
      <ul class="coprods">${a.products.map(s => `<li><a href="${url.product(s)}"><span>${esc(productBySlug[s].name)}</span>${ARROW}</a></li>`).join('')}</ul>
    </div>
    <div class="bv__media coapp" aria-hidden="true">
      <div class="coapp__head">${coHex(a.icon, 'coapp__hex')}<span><b>${esc(a.name)}</b><span>On Sygnet IoT Connect</span></span></div>
      <ul class="coapp__grid coapp__grid--${a.items.length}">${a.items.map(([ic, t]) => `<li>${coHex(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
    </div>
  </article>`;
  const appTab = a => `<a class="bv__tab" href="#${a.id}" id="tab-${a.id}" role="tab" aria-controls="${a.id}" aria-selected="false" tabindex="-1">
      ${coHex(a.icon, 'cohex bv__thumb cotab__hex')}<span class="bv__ttext"><span class="bv__tcode">${a.items.length} applications</span><span class="bv__tname">${esc(a.name)}</span></span></a>`;
  const apps = `<section class="section" id="applications" aria-labelledby="applications-h"><div class="wrap">
${head('applications', 'Industry applications.', 'Ready to deploy.', 'Smart solutions for four industries, built on Sygnet IoT Connect. Choose one to see its applications.')}
<div class="bv bv--apps" data-bv>
  <div class="bv__tabs bv__tabs--4" role="tablist" aria-label="Choose an industry" hidden>
    ${C.apps.map(appTab).join('\n    ')}
  </div>
  <div class="bv__stage">
  ${C.apps.map(appPanel).join('\n  ')}
  </div>
</div>
${dStrip(C.appsClose, 'How the applications are delivered')}
</div></section>`;

  const why = section({ id: 'why' }, `${head('why', 'Why Sygnet: ten reasons.', 'A complete technology partner.', 'Unlike traditional vendors, Sygnet provides everything under one ecosystem.')}
<ol class="coten">${C.reasons.map(([ic, t, x], k) => `<li><span class="coten__top"><span class="coten__n">${String(k + 1).padStart(2, '0')}</span>${icon(ic)}</span><b>${esc(t)}</b><span class="coten__x">${esc(x)}</span></li>`).join('')}</ol>
<h3 class="dlabel">Our solutions help organizations</h3>
<ul class="coout">${C.outcomes.map(([ic, t]) => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('')}</ul>
${dStrip(C.promise, 'What we stand for')}`);

  const partnersSec = section({ id: 'partners' }, `${head('partners', 'Partner ecosystem.', 'Sygnet works with:')}
<ul class="cocards cocards--partners">${C.partners.map(([ic, t, x]) => `<li class="cocard">${coHex(ic)}<h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join('')}</ul>
<div class="copart__close"><p class="bline">Together, we deliver <span>scalable digital transformation solutions.</span></p><div class="btn-row">${btn('/partners/', 'Become a partner', 'secondary')}</div></div>`);

  const together = `<section class="section" id="together" aria-labelledby="together-h"><div class="wrap"><div class="cotog">
  <div class="cotog__copy"><div class="section-head"><h2 id="together-h">Let’s build smarter operations together.</h2></div>
  <p>Whether you’re looking to digitize a hospital, factory, commercial building, warehouse or utility infrastructure, Sygnet provides the technology foundation to accelerate your digital transformation journey.</p></div>
  <div class="cotog__act">${coPills(C.sites, 'Places we connect')}<div class="btn-row">${demoBtn()}</div></div>
</div></div></section>`;

  const end = `<section class="section coend" aria-label="Explore and company facts"><div class="wrap">
<nav class="coexp" aria-label="Explore"><span class="coexp__t">Explore:</span><a class="chip" href="/platform/">Platform</a><a class="chip" href="/hardware/">Hardware</a><a class="chip" href="/contact/">Contact</a></nav>
${slot('Company facts: founding year, team, locations.')}
</div></section>`;

  const body = `${intro}\n${about}\n${purpose}\n${challenge}\n${apps}\n${bellScript}\n${why}\n${partnersSec}\n${together}\n${end}`;
  return page({ path: '/company/', nav: 'company', title: 'About Sygnet IoT: operational intelligence for connected enterprises',
    desc: `${SITE.legal} (formerly Resonent TechnoLabs) is an Industrial IoT platform company: intelligent hardware, cloud software, mobile apps and operational intelligence on Sygnet IoT Connect.`, body });
}

function caseStudies() {
  // one card per product line, each named once (Water ATM and Water Centers are separate lines)
  const stories = [['Healthcare', 'Sygnet NCS Nurse Call System'], ['Education', 'Sygnet School Bell & PA System'], ['Water', 'Sygnet Water ATM'], ['Rural water', 'Sygnet Water Centers'], ['Manufacturing', 'Sygnet Textile Connect'], ['Dairy', 'Sygnet Dairy Connect']];
  const body = `${heroSplit({ notice: 'Case studies', h1: 'Case studies and clients', lead: 'Installations of Sygnet products in hospitals, schools, mills and water projects. Each story is published with the client’s permission and is being prepared now.', visual: shotVisual('water-centre'), actions: `${demoBtn('Ask for references')}${btn('/industries/', 'Browse industries', 'secondary')}` })}
${trustBlock('clients')}
${section({ id: 'stories' }, `${head('stories', 'Case studies.', 'One story per product line, written with each client.')}
<div class="grid grid--cards">${stories.map(([ind, name]) => `<article class="card span-4 m-nolift"><p class="t-label muted">${esc(ind)}</p><h3>${esc(name)}</h3><p>Client, problem, what we installed and the result.</p></article>`).join('')}</div>
<div style="margin-top: var(--s-6)">${slot('Case study text and installation photographs, with client permission')}</div>`)}`;
  return page({ path: '/case-studies/', nav: 'company', title: 'Case studies: Sygnet IoT installations and clients', desc: 'Sygnet IoT clients and case studies: hospitals using Sygnet nurse call, and installations in education, water, manufacturing and dairy.', body });
}

function contact() {
  const opts = PRODUCTS.map(p => `<option value="${p.slug}">${esc(p.name)}</option>`).join('');
  const form = `<div class="hero-visual span-6 start-7" id="demo">
<form class="form form--card" action="mailto:${SITE.email}" method="post" enctype="text/plain" data-endpoint="" data-sent="Your demo request is in. Our team will get back to you." novalidate aria-label="Request a demo">
  <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err"><p class="field__error" id="f-name-err" hidden>Write your name.</p></div>
  <div class="field"><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="f-email-err"><p class="field__error" id="f-email-err" hidden>Write an email address with an @, like name@company.com.</p></div>
  <div class="field"><label for="f-phone">Mobile number</label><input id="f-phone" name="mobile" type="tel" autocomplete="tel" inputmode="tel" pattern="[+]?[0-9][0-9 \\-]{8,16}[0-9]" required aria-describedby="f-phone-err"><p class="field__error" id="f-phone-err" hidden>Write a mobile number of at least 10 digits, like +91 98765 43210.</p></div>
  <div class="field"><label for="f-org">Organisation</label><input id="f-org" name="organisation" type="text" autocomplete="organization" required aria-describedby="f-org-err"><p class="field__error" id="f-org-err" hidden>Write the hospital, school or company name.</p></div>
  <div class="field field--full"><label for="f-product">Interested in</label><select id="f-product" name="product"><option value="">Not sure yet</option>${opts}<option value="custom">Custom IoT engineering</option><option value="partner">Partner program</option></select></div>
  <div class="field field--full"><label for="f-msg">What do you need?</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
  <div class="form__actions"><button class="btn btn--primary" type="submit">Request a demo</button></div>
  <p class="form__status" role="status" data-form-status></p>
</form></div>`;
  const body = `<section class="hero hero--split hero--brand hero--form" data-enter aria-labelledby="hero-h">
<div class="wrap"><div class="hero-text grid hero-split">
  <div class="hero-copy span-5">
    <p class="eyebrow">Contact</p>
    <h1 id="hero-h">Request a demo or talk to our experts</h1>
    <p class="t-lead">Tell us about your site and what you want to connect. Our team in Surat will reply by email or phone.</p>
    <dl class="contact-list"><div><dt>Phone</dt><dd><a href="tel:${SITE.tel}">${SITE.phone}</a></dd></div><div><dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div><div><dt>Office</dt><dd>${SITE.city}</dd></div></dl>
  </div>
  ${form}
</div></div>
</section>
${section({ id: 'routes', h: 2 }, `${head('routes', 'Not sure where to start?', 'Pick the product closest to your problem.')}${productGrid(priority)}`)}
<script>
  // pre-select the product when a page links here with ?product=<slug>
  (function () { try { var p = new URLSearchParams(location.search), s = document.getElementById('f-product'), v = p.get('product') || p.get('topic');
    if (s && v) { for (var i = 0; i < s.options.length; i++) if (s.options[i].value === v) s.value = v; } } catch (e) {} })();
</script>`;
  return page({ path: '/contact/', nav: 'company', title: 'Contact Sygnet IoT: request a demo or talk to our experts', desc: `Request a demo of Sygnet IoT products or talk to our experts in Surat: ${SITE.phone}, ${SITE.email}.`, body, close: { h2: 'Prefer to talk it through?', line: `Our team is in ${SITE.city}. Call or write and we will get back to you.`, label: 'Call our team', href: `tel:${SITE.tel}` } });
}

function legal(kind) {
  const isP = kind === 'privacy';
  let html = readFileSync(new URL(`./legal/${isP ? 'privacy' : 'terms'}.html`, import.meta.url), 'utf8');
  html = html.replace('<h2>AGREEMENT TO OUR LEGAL TERMS</h2>', '<h2>Agreement to our legal terms</h2>');
  if (!isP) html += `<p>Email: <a class="link" href="mailto:${SITE.email}">${SITE.email}</a> · Phone: <a class="link" href="tel:${SITE.tel}">${SITE.phone}</a></p>\n`;
  const title = isP ? 'Privacy policy' : 'Terms & conditions';
  const body = `<section class="section legal" id="doc" aria-labelledby="doc-h"><div class="wrap"><div class="doc">
<h1 id="doc-h">${title}</h1>
<p class="doc-meta">${SITE.legal}, ${SITE.city}. Carried over from the previous website; to be reviewed by the client before launch.</p>
${html}</div></div></section>`;
  return page({ path: isP ? '/privacy-policy/' : '/terms-and-conditions/', nav: null, title: `${title}: ${SITE.legal}`, desc: isP ? 'How Sygnet IoT collects, uses and protects personal data on its website and services.' : 'The terms and conditions for using Sygnet IoT websites, products and services.', body, close: { h2: 'Questions about this page?', line: `Write to ${SITE.email}.`, label: 'Contact us', href: '/contact/' } });
}

function notFound() {
  const body = `<section class="section" id="missing" aria-labelledby="missing-h"><div class="wrap"><div class="section-head"><h1 id="missing-h">This page is not here</h1><p class="t-lead">It may have moved when the site was rebuilt. Start from one of these.</p></div>${productLinks(priority.map(p => p.slug))}</div></section>`;
  return page({ path: '/404.html', nav: null, title: 'Page not found: Sygnet IoT', desc: 'The page you are looking for is not on the Sygnet IoT website.', body, noindex: true });
}

export function allPages() {
  return [
    ['/', home()],
    ['/products/', productsIndex()],
    ...PRODUCTS.map(p => [url.product(p.slug), p.layout === 'ncs' ? ncsPage(p) : p.layout === 'qms' ? qmsPage(p) : p.layout === 'dairy' ? dairyPage(p) : p.layout === 'textile' ? textilePage(p) : p.layout === 'water' ? waterPage(p) : p.layout === 'simple' ? simplePage(p) : p.layout === 'rwc' ? rwcPage(p) : p.viewer ? bellPage(p) : productPage(p)]),
    ['/industries/', industriesIndex()],
    ...INDUSTRIES.map(i => [url.industry(i.slug), industryPage(i)]),
    ['/platform/', platform()],
    ['/solutions/', solutions()],
    ['/hardware/', hardware()],
    ['/developer/', developer()],
    ['/resources/', resources()],
    ['/partners/', partners()],
    ['/company/', company()],
    ['/case-studies/', caseStudies()],
    ['/contact/', contact()],
    ['/privacy-policy/', legal('privacy')],
    ['/terms-and-conditions/', legal('terms')],
    ['/404.html', notFound()],
  ];
}
