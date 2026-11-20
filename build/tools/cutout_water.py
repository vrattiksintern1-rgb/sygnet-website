# Cuts the community Water ATM kiosk out of the Water ATM catalogue into a transparent WebP for the Water ATM page
# (pages.mjs waterPage): the viewer's "Water ATM (community kiosk)" panel, on the same Mist ground as the panel.
# Source (Sygnet_Water ATM_26-1.pdf, native pixels of the page's embedded 1672x941 image):
#   water-atm-kiosk-cut   p15 "Project implementation model": the kiosk front-on, on the slide's plain white ground,
#                         with nothing overlapping it. It carries only the SYGNET IOT CONNECT mark and generic
#                         "Save The Water / Save The Future" globe artwork (no third-party brand).
# Not used on purpose: the cover (p1) and pp. 11-14, whose kiosks carry the "Waari" brand; pp. 5, 8-10 (same render,
# but water splashes run behind the kiosk); p16 (icons and a dotted ring overlap it); p13/p14 dashboards and report
# mock-ups (figures); p3, p6, p7, p18 (excluded slides). The panel uses water-atm-panel-cut (cutout_cards.py).
# The cut-out is enlarged 2x with Lanczos and a light sharpen; the viewer caps the display size (pages.mjs).
# Usage: py build/tools/cutout_water.py "content/flyers"   (after crop_catalog.py; it keeps *-cut entries)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = 'Sygnet_Water ATM_26-1.pdf'


def lum(a):
    return a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114


def page(n):
    d = pymupdf.open(os.path.join(SRC, PDF))
    return Image.open(io.BytesIO(d.extract_image(d[n - 1].get_images(full=True)[0][0])['image'])).convert('RGB')


def largest(fg):
    lab, n = ndimage.label(fg)
    return lab == (1 + int(np.argmax(ndimage.sum(fg, lab, range(1, n + 1))))) if n > 1 else fg


def ground_mask(a, lum_min, chroma):
    """pale, grey (low-chroma) pixels joined to the crop's border"""
    g = (lum(a) > lum_min) & (np.ptp(a, axis=-1) < chroma)
    lab, _ = ndimage.label(g)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    return np.isin(lab, list(border))


meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))

box = (676, 84, 1192, 772)
im = page(15).crop(box); a = np.asarray(im, dtype=np.float32)
LUM = float(sys.argv[2]) if len(sys.argv) > 2 else 244
fg = largest(~ground_mask(a, LUM, 10))
fg = ndimage.binary_fill_holes(fg)
fg = ndimage.binary_opening(fg, iterations=1)
fg = ndimage.binary_erosion(fg, iterations=1)

mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
out = im.convert('RGBA'); out.putalpha(mask)
out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
big = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
rgb = big.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
rgb.putalpha(big.getchannel('A'))
cid = 'water-atm-kiosk-cut'
rgb.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=90, alpha_quality=100, method=6)
meta[cid] = {'w': rgb.width, 'h': rgb.height, 'ground': 'clear', 'source': f'{PDF} p15 (enlarged 2x)'}
print(cid, rgb.size)
json.dump(meta, open(meta_path, 'w'), indent=1)
