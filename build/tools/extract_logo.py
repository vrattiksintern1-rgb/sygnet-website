# Extract the Sygnet logo from the brand kit PDF as clean vector paths:
# mark = the kit's own filled polygons; SYGNET / IOT CONNECT = glyph outlines from the fonts embedded in the PDF.
import pymupdf, sys, io, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
d = pymupdf.open(sys.argv[1]); p = d[0]
fonts = {}
for xref, ext, typ, name, *_ in p.get_fonts(full=True):
    buf = d.extract_font(xref)[3]
    fonts[name.split('+')[1]] = TTFont(io.BytesIO(buf))
dr = p.get_drawings()
def poly(i):
    segs, pts, last = [], [], None
    F = lambda q: '%.2f %.2f' % (q.x, q.y)
    for it in dr[i]['items']:
        if last is None or abs(it[1].x-last.x) > .01 or abs(it[1].y-last.y) > .01:
            segs.append('M' + F(it[1])); pts.append(it[1])
        if it[0] == 'l': segs.append('L' + F(it[2])); last = it[2]
        elif it[0] == 'c': segs.append('C' + ' '.join(F(q) for q in it[2:5])); last = it[4]
        else: raise Exception(it[0])
        pts.append(last)
    return pts, ' '.join(segs) + ' Z'

def chars_in(y0, y1, x0, x1):
    out = []
    for b in p.get_text('rawdict')['blocks']:
        for l in b.get('lines', []):
            for s in l['spans']:
                if y0 <= s['bbox'][1] <= y1 and x0 <= s['bbox'][0] <= x1:
                    for c in s['chars']: out.append((c['c'], c['origin'], s['size'], s['font']))
    return out
def glyph_d(ch, origin, size, fontname):
    f = fonts[fontname]; upm = f['head'].unitsPerEm
    cmap = f.getBestCmap() or {}
    gname = cmap.get(ord(ch))
    if gname is None:  # symbolic subset: try (3,0) cmap 0xF000 range
        for t in f['cmap'].tables:
            gname = t.cmap.get(0xF000 + ord(ch)) or t.cmap.get(ord(ch))
            if gname: break
    if gname is None or ch == ' ': return ''
    gs = f.getGlyphSet(); pen = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
    k = size / upm
    gs[gname].draw(TransformPen(pen, (k, 0, 0, -k, origin[0], origin[1])))
    return pen.getCommands()
def lockup(mark_ids, ty0, ty1, tx0, tx1):
    paths, xs, ys = [], [], []
    for i in mark_ids:
        pts, dd = poly(i); paths.append(dd)
    word, tag = [], []
    for ch, o, size, fn in chars_in(ty0, ty1, tx0, tx1):
        dd = glyph_d(ch, o, size, fn)
        if dd: (word if 'Nulshock' in fn else tag).append(dd)
    return paths, word, tag
out = {
  'stacked': lockup([53, 54, 55], 300, 400, 300, 800),
  'horizontal': lockup([13, 14, 15], 980, 1030, 130, 300),
}
json.dump(out, open(sys.argv[2], 'w'), indent=0)
print({k: (len(v[0]), len(v[1]), len(v[2])) for k, v in out.items()})
