# Cuts every NCS component out of the catalogue (content/flyers/Sygnet NCS Catalog.pdf, pp. 2-3) into transparent
# WebP (build/catalog/ncs-*-cut.webp) for the Nurse Call System page (pages.mjs ncsPage): one picture per component
# in each tier's list, and the three tiers' lead devices in the viewer. All sit on the same Mist ground.
# Sources, in native pixels of each page's embedded image (p2 1054x1492, p3 1060x1484):
#   p2 NCS-Plus row and NCS-Professional rows; p3 NCS-Enterprise grid. Where a part appears on both pages the
#   cleaner or Sygnet-marked shot is used (the p3 bed switch carries "sygnetconnect.io" on its plate).
# Skipped on purpose: the p1 nurse portrait, client and certificate logos, page headers and the key-feature panel.
# Marks to replace (reported to the client, 2026-11-20): the room indicator, bed switch, attend switch, bathroom
# pull-cord and both pendants carry a small red non-Sygnet mark (too low-resolution to read). They are used because
# the client listed them, until clean Sygnet-marked shots arrive. The display/server screens are too small to read.
# The catalogue ground is a pale blue-white (about 242,245,252); white wall plates are only ~12 units from it, so
# the ground is a tight colour-distance flood from the crop's border, not a brightness test. Each cut-out is
# enlarged 2x with Lanczos and a light sharpen; the page caps the display size.
# Usage: py build/tools/cutout_ncs.py "content/flyers"   (after crop_catalog.py; it keeps *-cut entries)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = 'Sygnet NCS Catalog.pdf'
# id: (page, box, tolerance)
PARTS = {
    'ncs-plus-display-cut': (2, (118, 532, 390, 714), 9),     # 8/16/24 room single-service display ("Sygnet" on its face)
    'ncs-room-indicator-cut': (2, (490, 530, 615, 724), 9),   # room indicator with multiple indication
    'ncs-pendant-cut': (2, (745, 540, 915, 708), 9),          # hand-held pendant bed switch
    'ncs-lcd-display-cut': (2, (136, 920, 316, 1074), 9),     # LCD multi-service nursing display unit
    'ncs-bedside-pendant-cut': (2, (745, 920, 905, 1068), 9), # bedside pendant
    'ncs-server-standard-cut': (2, (730, 1134, 910, 1296), 9),
    'ncs-bed-switch-cut': (3, (40, 555, 262, 708), 9),        # bed switch with pendant socket: nurse, housekeeping, Code Blue
    'ncs-pull-cord-cut': (3, (452, 548, 652, 712), 9),        # bathroom pull-cord
    'ncs-code-blue-cut': (3, (645, 562, 815, 712), 9),
    'ncs-station-unit-cut': (3, (818, 556, 1012, 720), 9),    # nurse station display unit (Enterprise)
    'ncs-patient-tracker-cut': (3, (50, 800, 215, 990), 9),
    'ncs-attend-switch-cut': (3, (425, 835, 622, 982), 9),
    'ncs-staff-tracker-cut': (3, (636, 800, 784, 990), 9),
    'ncs-server-enterprise-cut': (3, (806, 826, 1000, 990), 9),
    'ncs-staff-app-cut': (3, (440, 1036, 585, 1276), 9),
}


# flat rectangular wall plates: their white face is close to the ground, so the flood can bite notches into it;
# for these the mask is the device's bounding box (a plate is a rectangle)
RECT = {'ncs-plus-display-cut', 'ncs-bed-switch-cut', 'ncs-code-blue-cut', 'ncs-attend-switch-cut'}


def cut(a, tol):
    """ground = pixels within `tol` of the border's median colour and joined to the border; the device is
    everything else that is large, with its holes filled (white plates and screens sit inside a darker rim)"""
    edge = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    g = np.median(edge, axis=0)
    near = np.sqrt(((a - g) ** 2).sum(-1)) < tol
    lab, _ = ndimage.label(near)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(border))
    fg = ndimage.binary_opening(fg, iterations=1)          # drop specks of paper grain
    lab, n = ndimage.label(fg)
    if n > 1:                                              # keep every piece of real size (a cable and its plug)
        sizes = ndimage.sum(fg, lab, range(1, n + 1))
        fg = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= max(60, sizes.max() * 0.02)])
    return ndimage.binary_fill_holes(fg)


doc = pymupdf.open(os.path.join(SRC, PDF))
pages = {}
meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))
for cid, (pg, box, tol) in PARTS.items():
    if pg not in pages:
        pages[pg] = Image.open(io.BytesIO(doc.extract_image(doc[pg - 1].get_images(full=True)[0][0])['image'])).convert('RGB')
    im = pages[pg].crop(box)
    fg = cut(np.asarray(im, dtype=np.float32), tol)
    if cid in RECT:
        ys, xs = np.nonzero(fg); fg = np.zeros_like(fg); fg[ys.min():ys.max() + 1, xs.min():xs.max() + 1] = True
    mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    out = im.convert('RGBA'); out.putalpha(mask)
    out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
    out = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
    rgb = out.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    rgb.putalpha(out.getchannel('A'))
    rgb.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=90, alpha_quality=100, method=6)
    meta[cid] = {'w': rgb.width, 'h': rgb.height, 'ground': 'clear', 'source': f'{PDF} p{pg} (enlarged 2x)'}
    print(cid, rgb.size)
json.dump(meta, open(meta_path, 'w'), indent=1)
