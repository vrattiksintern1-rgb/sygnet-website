# Cuts the product-card shots out of their catalog grounds into transparent WebP (build/catalog/*-cut.webp),
# so every product card shows its device alone on the same Mist ground (site.css .pcard__media).
# Usage: py build/tools/cutout_cards.py "content/flyers"   (run after crop_catalog.py; it keeps *-cut entries)
#
# Sources and boxes are in the native pixels of each source image (same boxes as crop_catalog.py):
#   qms-kiosk-cut         Sygnet QMS.pdf p18, the QMS Professional touch kiosk alone, lifted off the dark slide
#   water-atm-panel-cut   water-atm-panel-flyer.jpg, the panel without the "Save the Water" kiosk artwork;
#                         cut just below the yellow buttons, where the flyer's water splash starts
#   ncs-station-display-cut, bell-tbg-cut   the light catalog crops with their off-white ground removed
#   napkin-vending-cut, smart-milk-vending-cut, dairy-milk-atm-cut   from their existing catalog crops
# Alt text for each lives in build/data.mjs CATALOG; products point at them with `card:`.
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')


def pdf_page(name, page):
    d = pymupdf.open(os.path.join(SRC, name))
    xref = d[page - 1].get_images(full=True)[0][0]
    return Image.open(io.BytesIO(d.extract_image(xref)['image'])).convert('RGB')


def lum(a):
    return a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114


def rrect(size, box, r):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle(box, r, fill=255)
    return np.asarray(m) > 127


def finish(im, fg, feather=0.7):
    mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather))
    out = im.convert('RGBA'); out.putalpha(mask)
    return out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())


def cut(im, is_ground, *, erode=1):
    """ground = pixels passing is_ground that connect to the image border; the device is the largest
    remaining piece with its holes filled (screens, white faces). The edge is pulled in by `erode` px
    and feathered so no ground colour fringes the device."""
    a = np.asarray(im, dtype=np.float32)
    lab, n = ndimage.label(is_ground(a))
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(border))
    lab, n = ndimage.label(fg)
    if n > 1:
        fg = lab == (1 + int(np.argmax(ndimage.sum(fg, lab, range(1, n + 1)))))
    fg = ndimage.binary_fill_holes(fg)
    return ndimage.binary_erosion(fg, iterations=erode) if erode else fg


def panel_shape(fg, r):
    """a flat panel cut straight across its bottom: the panel's own rounded rectangle (its new bottom
    corners rounded like the top ones), plus whatever stands above it (the antenna)"""
    h, w = fg.shape
    xs = np.nonzero(fg[int(h * .6)])[0]; x0, x1 = int(xs.min()), int(xs.max())
    top = int(np.argmax(fg[:, x0:x1 + 1].sum(1) > .8 * (x1 - x0)))
    body = rrect((w, h), (x0, top, x1, h - 1), r)
    above = fg.copy(); above[top + r:] = False
    return body | above


def edge_box(im, r, drop=18):
    """a pale device on a pale ground: find its drawn outline (pixels darker than the ground) and
    take the rounded rectangle it encloses"""
    a = np.asarray(im, dtype=np.float32); L = lum(a)
    dark = L < np.median(np.concatenate([L[0], L[-1], L[:, 0], L[:, -1]])) - drop
    h, w = dark.shape
    rows = np.nonzero(dark.sum(1) > .4 * w)[0]; cols = np.nonzero(dark.sum(0) > .4 * h)[0]
    return rrect((w, h), (int(cols.min()), int(rows.min()), int(cols.max()), int(rows.max())), r)


jobs = []
# QMS Professional kiosk: light grey device on the slide's dark blue
qms = pdf_page('Sygnet QMS.pdf', 18).crop((494, 362, 676, 786))
jobs.append(('qms-kiosk-cut', finish(qms, cut(qms, lambda a: (lum(a) < 120) & (a[..., 2] >= a[..., 0]), erode=2)), 'Sygnet QMS.pdf p18'))
# Water ATM panel: dark blue panel and antenna on a light grey wall; stop above the water splash
panel = Image.open(os.path.join(SRC, 'water-atm-panel-flyer.jpg')).convert('RGB').crop((535, 25, 985, 737))
jobs.append(('water-atm-panel-cut', finish(panel, panel_shape(cut(panel, lambda a: lum(a) > 128), 14)), 'water-atm-panel-flyer.jpg'))
# NCS-Plus station display: a white panel on an off-white page; its outline gives the shape
ncs = pdf_page('Sygnet NCS Catalog.pdf', 2).crop((120, 535, 385, 710))
jobs.append(('ncs-station-display-cut', finish(ncs, edge_box(ncs, 4), 0.5), 'Sygnet NCS Catalog.pdf p2'))
# TBG bell timer: remove the off-white ground (its soft contact shadow stays)
bell = pdf_page('Sygnet Bell PA Systems.pdf', 2).crop((488, 586, 1036, 1128))
jobs.append(('bell-tbg-cut', finish(bell, cut(bell, lambda a: (lum(a) > 205) & (np.ptp(a, axis=-1) < 22))), 'Sygnet Bell PA Systems.pdf p2'))
# the three secondary products, from their existing catalog crops (the dairy crop has the slide banners painted out)
def crop_of(cid):
    return Image.open(os.path.join(OUT, cid + '.webp')).convert('RGB')
napkin = crop_of('flyer-napkin-vending')   # the machine fills the frame; only the wall in its corners goes
jobs.append(('napkin-vending-cut', finish(napkin, cut(napkin, lambda a: (lum(a) < 150) & ~((a[..., 0] > a[..., 2] + 5) & (a[..., 0] > 150)))), 'napkin-vending-flyer.jpg'))
milk = crop_of('flyer-smart-milk-vending')
jobs.append(('smart-milk-vending-cut', finish(milk, cut(milk, lambda a: (lum(a) > 215) & (np.ptp(a, axis=-1) < 24))), 'smart-milk-vending-flyer.jpg'))
dairy = crop_of('dairy-milk-atm')
jobs.append(('dairy-milk-atm-cut', finish(dairy, cut(dairy, lambda a: (lum(a) > 238) & (np.ptp(a, axis=-1) < 16))), 'Sygnet Dairy Connect_26-1.pdf p14'))

meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))
for cid, im, source in jobs:
    im.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=88, alpha_quality=100, method=6)
    meta[cid] = {'w': im.width, 'h': im.height, 'ground': 'clear', 'source': source}
    print(cid, im.size)
json.dump(meta, open(meta_path, 'w'), indent=1)
