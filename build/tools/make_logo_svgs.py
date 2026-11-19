# Stage 2: turn the paths from extract_logo.py into the site's logo files (build/brand/*.svg + PNG icons).
# Usage: py build/tools/extract_logo.py "content/flyers/BrandKit (1).pdf" logo.json
#        py build/tools/make_logo_svgs.py logo.json build/brand
# When the client's designer sends master SVGs, drop them into build/brand/ with the same names instead.
import json, re, sys, os, pymupdf
INDIGO, BLUE, WHITE = '#293681', '#4675d7', '#ffffff'
data = json.load(open(sys.argv[1])); out = sys.argv[2]
TOK = re.compile(r'[A-Za-z]|-?\d+(?:\.\d+)?')
def coords(d):  # yields (axis, value, index) for every number; absolute commands only (as fontTools/PyMuPDF write them)
    cmd = None; i = 0
    for t in TOK.findall(d):
        if t.isalpha(): cmd = t; i = 0; yield None, t; continue
        axis = 'x' if cmd == 'H' else 'y' if cmd == 'V' else ('x' if i % 2 == 0 else 'y'); i += 1
        yield axis, float(t)
def bbox(paths):
    xs, ys = [], []
    for d in paths:
        for a, v in coords(d):
            if a == 'x': xs.append(v)
            elif a == 'y': ys.append(v)
    return min(xs), min(ys), max(xs), max(ys)
def shift(d, dx, dy):
    o = []
    for a, v in coords(d):
        if a is None: o.append(v); continue
        v += dx if a == 'x' else dy
        o.append(('%.2f' % v).rstrip('0').rstrip('.'))
    return re.sub(r' ?([A-Za-z]) ?', lambda m: m.group(1), ' '.join(o))
def svg(kind, mark_c, word_c, tag_c, pad=2):
    mark, word, tag = data[kind]
    allp = mark + word + tag
    x0, y0, x1, y1 = bbox(allp); w, h = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
    sh = lambda ps: ''.join(shift(d, pad - x0, pad - y0) for d in ps)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="Sygnet IoT Connect">'
            f'<path fill="{mark_c}" d="{sh(mark)}"/><path fill="{word_c}" d="{sh(word)}"/><path fill="{tag_c}" d="{sh(tag)}"/></svg>\n')
def mark_svg(color, tile=None, size=None):
    mark = data['stacked'][0]; x0, y0, x1, y1 = bbox(mark)
    mw, mh = x1 - x0, y1 - y0
    if tile:  # square app icon: mark at ~62% of the tile height, as in the kit's icon row
        S = 64; k = S * 0.62 / mh; dx = (S - mw * k) / 2; dy = (S - mh * k) / 2
        body = ''.join(shift(d, -x0, -y0) for d in mark)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="{S}" height="{S}" role="img" aria-label="Sygnet IoT Connect">'
                f'<rect width="{S}" height="{S}" rx="12" fill="{tile}"/><g transform="translate({dx:.2f} {dy:.2f}) scale({k:.4f})"><path fill="{color}" d="{body}"/></g></svg>\n')
    pad = 1; body = ''.join(shift(d, pad - x0, pad - y0) for d in mark)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {mw + 2*pad:.2f} {mh + 2*pad:.2f}" width="{mw+2*pad:.0f}" height="{mh+2*pad:.0f}" role="img" aria-label="Sygnet IoT Connect"><path fill="{color}" d="{body}"/></svg>\n'
files = {
  'sygnet-logo.svg': svg('horizontal', BLUE, INDIGO, INDIGO),          # light grounds
  'sygnet-logo-white.svg': svg('horizontal', WHITE, WHITE, WHITE),      # Indigo / Signal Blue / Sky grounds
  'sygnet-logo-stacked.svg': svg('stacked', BLUE, INDIGO, INDIGO),
  'sygnet-logo-stacked-white.svg': svg('stacked', WHITE, WHITE, WHITE),
  'sygnet-mark.svg': mark_svg(BLUE),
  'sygnet-mark-indigo.svg': mark_svg(INDIGO),
  'sygnet-mark-white.svg': mark_svg(WHITE),
  'favicon.svg': mark_svg(WHITE, tile=INDIGO),
}
os.makedirs(out, exist_ok=True)
for n, s in files.items(): open(os.path.join(out, n), 'w').write(s)
for n, px in (('favicon-32.png', 32), ('apple-touch-icon.png', 180), ('icon-512.png', 512)):
    doc = pymupdf.open('svg', files['favicon.svg'].encode()); pg = doc[0]
    pg.get_pixmap(matrix=pymupdf.Matrix(px / pg.rect.width, px / pg.rect.width), alpha=True).save(os.path.join(out, n))
print('wrote', len(files) + 3, 'files to', out)
