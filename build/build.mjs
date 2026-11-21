// Builds the static site into ./site: copies the taste-skill kit files the pages use, writes every
// page as <path>/index.html (clean URLs), plus sitemap.xml, robots.txt and 404.html.
// Run: node build/build.mjs   (Node 18+, no dependencies)
import { mkdirSync, writeFileSync, copyFileSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPages } from './pages.mjs';
import { SITE, PRODUCTS, BROCHURE_URL } from './data.mjs';
import { LOGO_FILES } from './brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'site');
const KIT = join(ROOT, '.claude', 'skills', 'taste-skill-main', 'assets');

function copyDir(src, dst, skip = () => false) {
  mkdirSync(dst, { recursive: true });
  for (const f of readdirSync(src)) {
    const s = join(src, f), d = join(dst, f);
    if (skip(f, s)) continue;
    statSync(s).isDirectory() ? copyDir(s, d, skip) : copyFileSync(s, d);
  }
}
const cp = (rel) => { const d = join(OUT, 'assets', rel); mkdirSync(dirname(d), { recursive: true }); copyFileSync(join(KIT, rel), d); };

// fresh assets (site/img is kept: it holds the old site's downloaded images)
rmSync(join(OUT, 'assets'), { recursive: true, force: true });
['system.css', 'system.js', 'motion/motion.css', 'motion/motion.js', 'layout/layout.css', 'layout/layout.js',
 'backgrounds/backgrounds.css', 'backgrounds/backgrounds.js', 'icons/icon.css',
 'moments/moments.js', 'moments/lib.js'].forEach(cp);
copyDir(join(KIT, 'ui'), join(OUT, 'assets', 'ui'), f => f === '_lab' || f.endsWith('.html'));
copyFileSync(join(ROOT, 'build', 'site.css'), join(OUT, 'assets', 'site.css'));
copyFileSync(join(ROOT, 'build', 'nav-dropdown.js'), join(OUT, 'assets', 'nav-dropdown.js'));
copyDir(join(ROOT, 'build', 'fonts'), join(OUT, 'assets', 'fonts'));
// product shots cropped from the client's catalogs (build/tools/crop_catalog.py)
copyDir(join(ROOT, 'build', 'catalog'), join(OUT, 'assets', 'catalog'), f => f.endsWith('.json'));

// logo files and brand art from the brand kit, written fresh every build
rmSync(join(OUT, 'img', 'brand'), { recursive: true, force: true });
mkdirSync(join(OUT, 'img', 'brand'), { recursive: true });
for (const [name, data] of Object.entries(LOGO_FILES)) writeFileSync(join(OUT, 'img', 'brand', name), data);
// the old site's AI stock pictures and low-resolution logo are no longer used anywhere
rmSync(join(OUT, 'img', 'old'), { recursive: true, force: true });
rmSync(join(OUT, 'img', 'products'), { recursive: true, force: true });   // the flyer crops now live in assets/catalog as WebP

// pages
const pages = allPages();
for (const [path, html] of pages) {
  const file = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
// pages no longer built (a slug that was renamed) are removed so no stale copy is served
const live = new Set(pages.map(([p]) => p));
for (const dir of ['products', 'industries']) {
  const base = join(OUT, dir);
  if (!existsSync(base)) continue;
  for (const f of readdirSync(base)) if (statSync(join(base, f)).isDirectory() && !live.has(`/${dir}/${f}/`)) rmSync(join(base, f), { recursive: true, force: true });
}

// removed pages (2026-11-20): the old URL keeps a small redirect stub (never in the sitemap) so links and bookmarks
// still land somewhere; vercel.json sends the same paths as real HTTP redirects on the live host
const REDIRECTS = [['/resources/', '/'], ['/developer/', '/platform/']];
for (const [from, to] of REDIRECTS) {
  const dir = join(OUT, from);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moved: Sygnet IoT</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE.domain}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash)</script>
</head>
<body><p>This page has moved. <a href="${to}">Continue to ${SITE.domain.replace('https://', '')}${to}</a>.</p></body>
</html>
`);
}

// brochures (data.mjs BROCHURE_URL): one entry per product; a site path must point at a file that is there, so a
// "Download brochure" button can never lead to a 404 (an empty value is fine: the form then says it will be sent)
for (const p of PRODUCTS) if (!(p.slug in BROCHURE_URL)) throw new Error(`BROCHURE_URL has no entry for "${p.slug}"`);
for (const [slug, v] of Object.entries(BROCHURE_URL)) {
  const f = (v || '').trim();
  if (!PRODUCTS.some(p => p.slug === slug)) throw new Error(`BROCHURE_URL "${slug}" is not a product slug`);
  if (f && !/^(\/[^/]|https:\/\/)/.test(f)) throw new Error(`BROCHURE_URL "${slug}" must be a site path (/...) or an https:// URL: ${f}`);
  if (f.startsWith('/') && !existsSync(join(OUT, decodeURI(f.split(/[?#]/)[0])))) throw new Error(`BROCHURE_URL "${slug}" points at ${f}, which is not in site/`);
}
const noBrochure = Object.entries(BROCHURE_URL).filter(([, v]) => !(v || '').trim()).map(([k]) => k);

// sitemap and robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(([p]) => !p.endsWith('.html')).map(([p]) => `  <url><loc>${SITE.domain}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);

console.log(`built ${pages.length} pages into ${OUT}`);
if (noBrochure.length) console.log(`brochure files still to add (${noBrochure.length}): ${noBrochure.join(', ')}`);
