// The Sygnet IoT Connect logo and brand art, from the client's brand kit (BrandKit (1).pdf, 2026-11-19).
// build/brand/*.svg are the kit's own vector paths: the hexagon-S mark as drawn in the PDF and the
// SYGNET / IOT CONNECT lettering as glyph outlines of the fonts embedded in it (no font file ships).
// They are made by build/tools/extract_logo.py + make_logo_svgs.py. When the client's designer sends
// master SVGs, drop them into build/brand/ under the same names; nothing else changes.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'brand');

// the four kit colours. Indigo as printed; Signal Blue, Sky and Mist read from the kit's vector swatches
// (the PDF prints #293681 under all four by mistake).
export const BRAND = {
  indigo: '#293681', // Sygnet Indigo, primary
  blue: '#4675d7',   // Signal Blue, secondary
  sky: '#94cddd',    // Sky, accent
  mist: '#f5ffff',   // Mist, tint
  tint: '#e8f4f8',   // the kit's panel tint (cards, icon tiles)
  action: '#3a66c4', // Signal Blue deepened just enough for white button text to pass WCAG AA (5.3:1)
};

const files = {};
for (const f of readdirSync(DIR)) files[f] = readFileSync(join(DIR, f));

// the mark's paths, reused for the kit's soft background chevrons (giant crops of the mark in a tint)
const markSvg = files['sygnet-mark.svg'].toString();
const recolour = (svg, c) => svg.replace(/fill="#[0-9a-f]{6}"/gi, `fill="${c}"`).replace(/ role="img" aria-label="[^"]*"/, ' aria-hidden="true"');
files['bg-mark-tint.svg'] = recolour(markSvg, '#e6f2f6');   // on Mist, as on the kit's cover
files['bg-mark-band.svg'] = recolour(markSvg, '#31408f');   // on the Indigo band

// the hexagon from the logo as a small repeating shape (a honeycomb of outlines)
const hexTile = (stroke, op) => {
  const r = 14, k = Math.sqrt(3) / 2, w = 2 * k * r, h = 3 * r;
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i - Math.PI / 2; return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`; }).join(' ');
  const cells = [[w / 2, r], [0, r + h / 2], [w, r + h / 2], [w / 2, r + h]];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w.toFixed(2)}" height="${h}" viewBox="0 0 ${w.toFixed(2)} ${h}" aria-hidden="true"><g fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1">${cells.map(([x, y]) => `<polygon points="${hex(x, y)}"/>`).join('')}</g></svg>\n`;
};
files['hex-light.svg'] = hexTile('#ffffff', 0.08);
files['hex-ink.svg'] = hexTile('#293681', 0.07);

export const LOGO_FILES = files;
