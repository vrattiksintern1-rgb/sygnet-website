# Cuts four bell models out of the catalogue's page-1 "Product range" strip into transparent WebP
# (build/catalog/bell-range-*-cut.webp) for the School Bell & PA model viewer, where every model sits on the
# same Mist ground. Page 1 is the only place the TBA-WL, TBA-D, TBW-WL and TBW-D show the Sygnet name:
# their own pages (pp. 3-6) and the comparison page (p. 7) show a third-party "VIDYALAYA" mark, so they are
# not used. The TBG uses bell-tbg-cut (page 2, larger and Sygnet-branded; cutout_cards.py): on page 1 the
# "Product range" rule runs across its top edge. The strip is small (about 180-260 px a unit), so each cut-out is enlarged 2x with Lanczos and a
# light sharpen; the viewer still caps the display size (site.css .bv__media).
# Usage: py build/tools/cutout_bell.py "content/flyers"   (after crop_catalog.py; it keeps *-cut entries)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = 'Sygnet Bell PA Systems.pdf'
# page 1, native pixels of the page image; tops start under the "Product range" rule (y 522)
BOXES = {
    'bell-range-tba-wl-cut': (222, 528, 398, 760),
    'bell-range-tba-d-cut': (400, 540, 624, 762),
    'bell-range-tbw-wl-cut': (627, 528, 797, 760),
    'bell-range-tbw-d-cut': (790, 540, 1042, 762),
    'bell-speaker-cut': (450, 895, 750, 1270),   # the addressable speaker, for the ecosystem card (not enlarged)
}
GROUND = {'bell-speaker-cut': (240, 14)}   # a white unit on a light grey ground: a tighter test (lum, chroma)
NO_ENLARGE = {'bell-speaker-cut'}


def lum(a):
    return a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114


def cut(im, lum_min=214, chroma=20):
    """ground = pale, grey (low-chroma) pixels joined to the crop's border; the device is the largest piece
    left, with its holes filled (white faces and screens sit inside the blue or black housing)"""
    a = np.asarray(im, dtype=np.float32)
    ground = (lum(a) > lum_min) & (np.ptp(a, axis=-1) < chroma)
    lab, _ = ndimage.label(ground)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(border))
    lab, n = ndimage.label(fg)
    if n > 1:
        fg = lab == (1 + int(np.argmax(ndimage.sum(fg, lab, range(1, n + 1)))))
    return ndimage.binary_erosion(ndimage.binary_fill_holes(fg), iterations=1)


d = pymupdf.open(os.path.join(SRC, PDF))
page = Image.open(io.BytesIO(d.extract_image(d[0].get_images(full=True)[0][0])['image'])).convert('RGB')
meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))
for cid, box in BOXES.items():
    im = page.crop(box)
    mask = Image.fromarray((cut(im, *GROUND.get(cid, (214, 20))) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
    out = im.convert('RGBA'); out.putalpha(mask)
    out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
    if cid in NO_ENLARGE:
        rgb = out
    else:
        out = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
        rgb = out.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
        rgb.putalpha(out.getchannel('A'))
    rgb.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=90, alpha_quality=100, method=6)
    meta[cid] = {'w': rgb.width, 'h': rgb.height, 'ground': 'clear', 'source': f'{PDF} p1' + ('' if cid in NO_ENLARGE else ' (enlarged 2x)')}
    print(cid, rgb.size)
json.dump(meta, open(meta_path, 'w'), indent=1)
