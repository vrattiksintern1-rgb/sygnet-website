// Every page of the site, rendered from data.mjs through the shared shell (layout.mjs).
import { readFileSync } from 'node:fs';
import { SITE, PRODUCTS, INDUSTRIES, SOLUTIONS, SOLUTION_COUNT, SOLUTION_GROUP_ICONS, SOLUTION_ICONS, LAYERS, DEV, SECURITY, HARDWARE, HW_QUALITIES, ENGINEERING, TIERS, WHY, CERTS, CERTS_NOTE, HOSPITALS, productBySlug, industryBySlug } from './data.mjs';
import { esc, url, btn, demoBtn, section, head, card, productGrid, slot, chipSoon, checks, faq, specs, productLinks, industryLinks, WINDOWS, ARROW, icon, shot, eyebrow, brandTile } from './ui.mjs';
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
const productVisual = p => p.img && SIZE[p.img].w >= 360 ? shotVisual(p.img) : winVisual(p.window, !p.soon);
// an industry's hero: its icon on the brand ground with the shots of its products
function industryVisual(i) {
  const shots = i.products.map(s => productBySlug[s]).filter(p => p.img).slice(0, 3);
  return `<div class="hero-visual brandpanel span-6 start-7">
  <div class="brandpanel__head"><span class="brandpanel__ico">${icon(i.icon)}</span><span class="t-label">${esc(i.suite)}</span></div>
  <div class="brandpanel__shots brandpanel__shots--${shots.length || 0}">${shots.map(p => shot(p.img, p.name + ': ' + productBySlug[p.slug].one)).join('') || brandTile(i.icon)}</div>
</div>`;
}

// ---------------------------------------------------------------- shared blocks
const certBadges = () => `<ul class="badges">${CERTS.map(c => `<li class="badge">${icon('shield-check')}${esc(c)}</li>`).join('')}<li class="badge">${icon('hospital')}NCS: NABH compliant</li></ul>`;
const hospitalList = () => `<ul class="names">${HOSPITALS.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`;
function trustBlock(id, title = 'Hospitals using Sygnet nurse call.', muted = 'Named in our NCS catalog.') {
  return section({ id, cls: 'trust' }, `${head(id, title, muted)}
<div class="grid grid--top">
  <div class="span-6 stack-4">${hospitalList()}<p class="t-small muted">And three more institutions shown in the catalog by their seal only.</p></div>
  <div class="span-6 start-7 stack-4"><p class="t-label muted">Certifications. ${esc(CERTS_NOTE)}</p>${certBadges()}</div>
</div>`);
}
const layersList = (list = LAYERS) => `<ol class="layers">${list.map(([n, t]) => `<li><b>${n}</b><span>${esc(t)}</span></li>`).join('')}</ol>`;

// the five layers as cut-corner cards on the Indigo band, linked by a Signal Blue line on desktop (site.css .lcards)
const LAYER_ICONS = ['cpu', 'router', 'cloud', 'smartphone', 'brain'];
const HEX = '<svg class="lcard__hex" viewBox="0 0 52 56" aria-hidden="true"><path d="M26 2 48 14.5v27L26 54 4 41.5v-27z"/></svg>';
const layerCards = () => `<ol class="lcards" data-fade>${LAYERS.map(([n, t], k) => `<li class="lcard"><span class="lcard__ico">${HEX}${icon(LAYER_ICONS[k])}</span><span class="lcard__n">0${k + 1}</span><b class="lcard__t">${n}</b><span class="lcard__x">${esc(t)}</span></li>`).join('')}</ol>`;

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
//   line 2, typed ........... 500-1620, 40 ms a character, caret follows, blinks 3 times and goes
//   tiles ................... 300-1100 fade only, to 55 % (decoration)
//   industry + button ....... 700  fade, 10px rise (support)
//   node 1 .................. 820  fade, rise, blur 4px
//   "Connect" line, chip .... 1250 line draws 520 ms; chip at 1480
//   node 2 / arrow / node 3 . 2000 / 2150 / 2400
//   "Act" line, chip, node 4  2560 / 2780 / 2950
//   scroll cue .............. 3100 fade
//   light pulse ............. from 3400, one segment after the other, 4.8 s a round, linear
// Reduced motion or motion off: no animation, the final frame. Without script: the same CSS timeline, no parallax.
const HX_LINE1 = ['IoT', 'systems', 'for', 'hospitals,', 'schools,'];
const HX_LINE2 = 'factories and water projects';
const HX_GRAD = 'water projects';
const HX_WORD_D = [0, 70, 130, 180, 220];
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

function home() {
  const body = `
<section class="hero hx" aria-labelledby="hero-h">
  <div class="hx__card">
    <div class="hx__art" aria-hidden="true"><span class="hx__hex"></span><span class="hx__arch"></span><span class="hx__arch hx__arch--2"></span>${hxTiles()}</div>
    <div class="hx__main">
      <a class="hx-badge" href="/platform/"><span>Own hardware, cloud and apps</span><span class="hx-badge__chip">One platform</span></a>
      ${hxHeadline()}
      <div class="hx-ask"><a class="hx-btn" href="/contact/#demo">Request a Demo${ARROW}</a></div>
    </div>
    ${hxFlow()}
  </div>
</section>
${hxScript}

${section({ id: 'products', h: 2 }, `${eyebrow('Products')}${head('products', 'Six products for work that cannot wait.', 'Each one runs on Sygnet IoT Connect.')}
${productGrid(priority, p => industryChips(p))}`)}

${trustBlock('trust')}

${section({ id: 'why', h: 2 }, `<div class="grid grid--top">
  <div class="span-6 stack-5">${eyebrow('Why Sygnet')}<div class="section-head"><h2 id="why-h">Circuit to cloud, in one company. <span class="muted">Hardware, firmware, cloud and apps, built in-house.</span></h2></div>
    <p class="t-lead">Most IoT projects stall between vendors: the sensor from one, the gateway from another, the dashboard from a third. We design all four layers ourselves, so one team answers for the whole system.</p>
    <div class="inhouse">${[['Hardware', 'cpu'], ['Firmware', 'settings'], ['Cloud', 'cloud'], ['Apps', 'smartphone']].map(([t, ic]) => `<span>${icon(ic)}${t}</span>`).join('')}</div>
    <div class="btn-row">${btn('/company/', 'About Sygnet IoT', 'secondary', false)}</div>
  </div>
  <ul class="why span-6 start-7">${WHY.map(([t, x, ic]) => `<li>${icon(ic)}<b>${esc(t)}</b><span>${esc(x)}</span></li>`).join('')}</ul>
</div>`)}

${statement(`${esc(SITE.subline)} Sygnet IoT Connect links devices, sensors and machines to one secure platform and turns their data into apps your teams use every day.`)}

<section class="section ground-inverse band" id="platform" aria-labelledby="platform-h">
  <div class="wrap">
    ${eyebrow('The platform')}${head('platform', 'One platform under every product.', 'Five layers, from the device to AI.')}
    ${layerCards()}
    <p style="margin-top: var(--s-5)"><a class="link" href="/platform/">Explore Sygnet IoT Connect</a></p>
  </div>
</section>

${section({ id: 'industries', h: 2 }, `${head('industries', 'Nine industries, one platform.', 'Pick yours to see the products and solutions for it.')}
<div class="grid grid--cards grid--icons">${INDUSTRIES.map(i => card({ href: url.industry(i.slug), ico: i.icon, title: i.name, text: i.products.map(s => productBySlug[s].short).join(', '), span: 4, go: `See ${i.suite}` })).join('')}${card({ href: '/industries/', ico: 'boxes', title: 'All industries', text: 'Every suite on one page.', span: 4, go: 'See all', cls: 'card--phone' })}</div>`)}
${revealScript}
`;
  return page({ path: '/', nav: 'home', glassNav: true, title: 'Sygnet IoT: nurse call, queue, school bell and water ATM systems', desc: `Sygnet IoT builds IoT products for hospitals, schools, mills and water projects: nurse call, queue management, school bells and water ATMs, on the Sygnet IoT Connect platform. ${SITE.line}.`, body });
}

// ---------------------------------------------------------------- products
function productsIndex() {
  const body = `${heroSplit({ notice: 'Products', h1: 'Sygnet products for hospitals, schools, mills and water', lead: 'Ten products, each carrying the Sygnet name, each running on Sygnet IoT Connect. Six lead the range; four more serve dairies, retail and recycling.', visual: shotVisual('qms-family') })}
${section({ id: 'priority', h: 2 }, `${head('priority', 'Priority products.', 'Where most of our work is today.')}${productGrid(priority, p => [p.code])}`)}
${section({ id: 'more' }, `${head('more', 'More Sygnet products.', 'Vending and dairy, on the same platform.')}${productGrid(secondary, p => industryChips(p))}
<div class="tbc" style="margin-top: var(--s-6)"><b>Need something we do not list?</b><p>We design custom IoT hardware, firmware and apps. <a class="link" href="/hardware/">See custom engineering</a></p></div>`)}`;
  return page({ path: '/products/', nav: 'products', title: 'Sygnet IoT products: nurse call, queue management, bells, water ATM and vending', desc: 'All ten Sygnet IoT products: NCS nurse call, QMS queue management, school bell and PA, Water ATM, Textile Connect, Energy Monitoring, Dairy Connect and vending machines.', body });
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

// ---------------------------------------------------------------- industries
function industriesIndex() {
  const body = `${heroSplit({ notice: 'Industries', h1: 'Industry suites for hospitals, mills, water and cities', lead: 'Nine suites built on Sygnet IoT Connect. Each one bundles the Sygnet products and monitoring solutions that industry asks for most.', visual: `<div class="hero-visual brandgrid span-6 start-7" aria-hidden="true">${INDUSTRIES.map(i => `<span>${icon(i.icon)}<b>${esc(i.name)}</b></span>`).join('')}</div>`, actions: `${demoBtn()}${btn('/solutions/', 'All solutions', 'secondary')}` })}
${section({ id: 'all', h: 2 }, `${head('all', 'Choose your industry.', 'Each page lists the products and solutions for it.')}
<div class="grid grid--cards grid--icons">${INDUSTRIES.map(i => card({ href: url.industry(i.slug), ico: i.icon, label: i.suite, title: i.name, text: i.who, span: 4, go: 'See the suite' })).join('')}${card({ href: '/contact/?topic=industry#demo', ico: 'message-circle', title: 'Not listed?', text: 'Tell us about your site.', span: 4, go: 'Talk to us', cls: 'card--phone' })}</div>
<div class="ind-strip"><span class="t-small muted">Also serving</span><span class="chip chip--static">Logistics</span><span class="chip chip--static">Hospitality</span></div>`)}`;
  return page({ path: '/industries/', nav: 'industries', title: 'Industries: IoT suites for healthcare, manufacturing, water, energy and more', desc: 'Sygnet IoT industry suites for healthcare, manufacturing, water, energy, retail, buildings, agriculture, smart cities and education.', body });
}

function industryPage(i) {
  const grp = SOLUTIONS.find(g => g.group === i.group);
  const extra = i.slug === 'agriculture' ? SOLUTIONS.find(g => g.group === 'Dairy') : null;
  const sol = [...(grp ? grp.items : []), ...(extra ? extra.items : [])].map(s => s.split('|')[0]);
  const bundle = i.slug === 'healthcare' ? `<div class="tbc" style="margin-top: var(--s-6)"><b>The healthcare bundle</b><p>Install Sygnet NCS and Sygnet QMS together: one platform, one support team, one dashboard for wards and counters.</p></div>` : '';
  const body = `${heroSplit({ notice: esc(i.suite), h1: i.h1, lead: i.lead, visual: industryVisual(i) })}
${section({ id: 'products' }, `${head('products', `Sygnet products for ${i.name.toLowerCase()}.`, i.who + '.')}${productLinks(i.products)}${bundle}`)}
${section({ id: 'uses', cls: 'uses' }, `${head('uses', `What ${i.suite} covers.`)}${checks(i.uses)}
<div class="stack-4" style="margin-top: var(--s-7)"><p class="t-label muted">Monitoring solutions</p>${sol.length ? `<div class="chips">${sol.map(s => `<a class="chip" href="/solutions/#${esc((grp || extra).group.toLowerCase().replace(/[^a-z]+/g, '-'))}">${esc(s)}</a>`).join('')}</div>` : `<p>${esc(i.uses.join(', '))}, on Sygnet IoT Connect.</p>`}<a class="link" href="/solutions/">All ${SOLUTION_COUNT} solutions</a></div>`)}
${i.slug === 'healthcare' ? trustBlock('proof') : section({ id: 'proof' }, `${head('proof', `Installations in ${i.name.toLowerCase()}.`, 'Case studies are being prepared with our clients.')}
<div class="grid grid--top"><div class="span-6">${slot(`${i.name} case study: client, problem, what we installed, result`)}</div>
<div class="span-6 start-7 stack-5"><p class="t-lead">We publish a case study only with the client's permission. Ask us for references in ${esc(i.name.toLowerCase())} when you request a demo.</p><div class="btn-row">${btn('/case-studies/', 'See case studies', 'secondary', false)}</div></div></div>`)}`;
  return page({ path: url.industry(i.slug), nav: 'industries', title: `${i.suite}: ${i.h1}`, desc: `${i.suite} by Sygnet IoT for ${i.who.toLowerCase()}: ${i.products.map(s => productBySlug[s].short).join(', ')}, on the Sygnet IoT Connect platform.`, body,
    close: { h2: `Talk to us about ${i.name.toLowerCase()}`, href: `/contact/?industry=${i.slug}#demo` } });
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

function solutions() {
  const slug = g => g.toLowerCase().replace(/[^a-z]+/g, '-');
  const gIcon = SOLUTION_GROUP_ICONS;
  // one tile per solution: its own icon; a tile that is part of a Sygnet product links to it and names it
  const tile = s => {
    const [n, l] = s.split('|'), ic = `<span class="stile__ico">${icon(SOLUTION_ICONS[n] || 'circle-dot')}</span>`;
    return l
      ? `<li><a class="stile stile--link" href="${url.product(l)}">${ic}<span class="stile__t"><b>${esc(n)}</b><small>Sygnet ${esc(productBySlug[l].short)}${ARROW}</small></span></a></li>`
      : `<li><div class="stile">${ic}<span class="stile__t"><b>${esc(n)}</b></span></div></li>`;
  };
  // columns per group so rows come out full (10 -> 5, 8 -> 4); a short last row stretches to the right edge, never one tile alone
  const cols = (n, list) => list.find(c => n % c === 0) || list.find(c => n % c !== 1) || list[0];
  const group = g => `<div class="sgroup" id="${slug(g.group)}" style="--cl: ${cols(g.items.length, [4, 5, 3])}; --cm: ${cols(g.items.length, [3, 4])}"><div class="sgroup__head"><span class="sgroup__ico">${icon(gIcon[g.group])}</span><h3>${esc(g.group)} solutions</h3><span class="sgroup__n">${g.items.length}</span></div>
<ul class="stiles">${g.items.map(tile).join('')}</ul></div>`;
  const groups = names => `<div class="sgroups">${SOLUTIONS.filter(g => names.includes(g.group)).map(group).join('')}</div>`;
  const body = `${heroSplit({ notice: 'Solutions', h1: `${SOLUTION_COUNT} IoT monitoring solutions on one platform`, lead: 'Water, energy, buildings, factories, hospitals, dairies, farms and fleets. Each solution runs on Sygnet IoT Connect, and many come as part of a Sygnet product.', visual: `<nav class="hero-visual brandgrid brandgrid--8 span-6 start-7" aria-label="Solution groups">${SOLUTIONS.map(g => `<a href="#${slug(g.group)}">${icon(gIcon[g.group])}<span class="brandgrid__foot"><b>${esc(g.group)}</b><span class="brandgrid__n">${g.items.length}</span></span></a>`).join('')}</nav>`, actions: `${demoBtn()}${btn('/industries/', 'Browse by industry', 'secondary')}` })}
${section({ id: 'utilities', h: 2 }, `${head('utilities', 'Water, energy, buildings and factories.', 'Linked tiles open the Sygnet product they ship with.')}
${groups(['Water', 'Energy', 'Building & Utility', 'Industrial'])}`)}
${section({ id: 'sectors', h: 2 }, `${head('sectors', 'Hospitals, dairies, farms and fleets.', 'Every one runs on Sygnet IoT Connect.')}
${groups(['Healthcare', 'Dairy', 'Agriculture', 'Cross-industry'])}`)}
${section({ id: 'custom' }, `${head('custom', 'Not on the list?', 'We build custom IoT, circuit to cloud.')}
<div class="grid grid--top"><div class="span-6 stack-5"><p class="t-lead">If the device you need does not exist yet, our engineers design the board, write the firmware, connect it to the platform and build the app.</p><div class="btn-row">${btn('/hardware/', 'See custom engineering', 'secondary', false)}</div></div>
<div class="span-6 start-7">${productLinks(['textile-connect', 'water-atm', 'dairy-connect'])}</div></div>`)}`;
  return page({ path: '/solutions/', nav: 'solutions', title: `Solutions: ${SOLUTION_COUNT} IoT monitoring solutions for every industry`, desc: `${SOLUTION_COUNT} IoT monitoring solutions from Sygnet IoT: water, energy, building and utility, industrial, healthcare, dairy, agriculture and cross-industry.`, body });
}

function hardware() {
  const body = `${heroSplit({ notice: 'Smart edge hardware', h1: 'Industrial IoT hardware, and custom boards built to order', lead: 'Controllers, sensor nodes, gateways and edge devices made for Sygnet IoT Connect, plus custom engineering from PCB design and firmware to certification and production.', visual: shotVisual('hw-industrial-gateway'), actions: `${demoBtn('Talk to an engineer')}${btn('/developer/', 'Developer details', 'secondary')}` })}
${section({ id: 'range', h: 2 }, `${head('range', 'The hardware range.', 'Built for reliability, scalability and rapid deployment.')}
<div class="grid grid--cards">${HARDWARE.map(([n, img]) => `<article class="card card--img span-3 m-nolift">${shot(img, '', { cls: 'card__shot' })}<h3>${esc(n)}</h3></article>`).join('')}</div>
<div class="chips" style="margin-top: var(--s-6)">${HW_QUALITIES.map(q => `<span class="chip chip--static">${q}</span>`).join('')}</div>
<div style="margin-top: var(--s-6)">${slot('Model-wise specifications for each category', 'Specifications coming soon')}</div>`)}
${section({ id: 'engineering' }, `${head('engineering', 'Custom engineering, circuit to cloud.', 'One team from the first schematic to production.')}${layersList(ENGINEERING)}`)}
${section({ id: 'certs' }, `${head('certs', 'Certifications.', 'As listed in our NCS catalog.')}
<p class="t-label muted" style="margin-bottom: var(--s-4)">${esc(CERTS_NOTE)} The nurse call system is described as NABH compliant.</p>${certBadges()}</div>`)}`;
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

function company() {
  const logoPanel = `<div class="hero-visual span-6 start-7 company-logo" role="img" aria-label="The Sygnet IoT Connect logo"><img src="/img/brand/sygnet-logo-stacked.svg" alt="" width="356" height="306"></div>`;
  const body = `${heroSplit({ notice: SITE.legal, h1: 'Sygnet IoT: circuit to cloud, one company', lead: `${SITE.line}. We design IoT hardware, write its firmware, connect it to our cloud and build the apps on top, all in Surat.`, visual: logoPanel, actions: `${demoBtn('Talk to our experts')}${btn('/products/', 'See our products', 'secondary')}` })}
${section({ id: 'name' }, `<div class="grid grid--top"><div class="span-6 stack-5"><div class="section-head"><h2 id="name-h">Signal plus network. <span class="muted">That is the name.</span></h2></div>
<p class="t-lead">Sygnet joins signal and network, or internet: what every device we make sends, and what carries it. We renamed the company so that every product carries the same name, from the nurse call on a ward to the water ATM in a village.</p>
<p class="t-small muted">Formerly Resonent TechnoLabs Pvt. Ltd.</p></div>
<div class="span-6 start-7">${slot('Team or workshop photograph')}</div></div>`)}
${section({ id: 'inhouse' }, `${head('inhouse', 'Everything in-house.', 'Four disciplines, one team.')}${cardRow([['Hardware', 'Circuits and PCBs designed for the job and the site.', 'cpu'], ['Firmware', 'Embedded code written for our own boards.', 'settings'], ['Cloud', 'Sygnet IoT Connect, the platform under every product.', 'cloud'], ['Apps', 'Dashboards, staff apps and reports people use daily.', 'smartphone']].map(([t, x, ic]) => ({ title: t, text: x, ico: ic })))}`)}
${section({ id: 'facts' }, `${head('facts', 'Company facts.', 'Being confirmed with the client before publishing.')}
<div class="grid grid--top"><div class="span-6">${slot('Founding year, team, leadership and office photographs')}</div>
<div class="span-6 start-7"><dl class="contact-list"><div><dt>Where we are</dt><dd>${SITE.legal}, ${SITE.city}</dd></div></dl></div></div>`)}`;
  return page({ path: '/company/', nav: 'company', title: 'About Sygnet IoT: operational intelligence for connected enterprises', desc: `Sygnet IoT (formerly Resonent TechnoLabs) designs IoT hardware, firmware, cloud and apps in Surat, Gujarat. ${SITE.line}.`, body });
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
  <div class="field"><label for="f-org">Organisation</label><input id="f-org" name="organisation" type="text" autocomplete="organization" required aria-describedby="f-org-err"><p class="field__error" id="f-org-err" hidden>Write the hospital, school or company name.</p></div>
  <div class="field"><label for="f-product">Interested in</label><select id="f-product" name="product"><option value="">Not sure yet</option>${opts}<option value="custom">Custom IoT engineering</option><option value="partner">Partner program</option></select></div>
  <div class="field"><label for="f-msg">What do you need?</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
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
  return page({ path: '/contact/', nav: 'company', title: 'Contact Sygnet IoT: request a demo or talk to our experts', desc: `Request a demo of Sygnet IoT products or talk to our experts in Surat: ${SITE.phone}, ${SITE.email}.`, body, close: { h2: 'Prefer to call?', line: `Call ${SITE.phone} or write to ${SITE.email}.`, label: 'Call our team', href: `tel:${SITE.tel}` } });
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
    ...PRODUCTS.map(p => [url.product(p.slug), productPage(p)]),
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
