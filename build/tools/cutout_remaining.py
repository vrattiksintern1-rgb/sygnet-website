# Cut-outs for the last product pages (pages.mjs simplePage / rwcPage), on a transparent ground for the Mist viewer.
#   rwc-centre-cut        Synget Water Centers_26.pdf p15 ("Success metrics"): the Rural Water Center building front-on,
#                         on the slide's plain white ground, nothing overlapping it. It carries only the SYGNET IOT
#                         CONNECT mark. Not used on purpose: the cover (p1) and pp. 4-7, 9-14, 18, 20, whose renders sit
#                         in a scene (sky, trees, people, signage) or carry the slide's ping@ contact strip; p14's dashboard
#                         (figures); p8's delivery truck (a vehicle maker's badge) and institution photographs.
#   smart-milk-vending-clean-cut
#                         the existing smart-milk-vending-cut (from the flyer) with the "Powered by Paytm" sticker on the
#                         side panel painted out: the panel's own blue, fitted as a smooth gradient from the pixels
#                         around the sticker. The "milk" panel logo and the other stickers are kept.
# Usage: py build/tools/cutout_remaining.py "content/flyers"   (after crop_catalog.py and cutout_cards.py)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))


def lum(a):
    return a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114


def largest(fg):
    lab, n = ndimage.label(fg)
    return lab == (1 + int(np.argmax(ndimage.sum(fg, lab, range(1, n + 1))))) if n > 1 else fg


def ground_mask(a, lum_min, chroma):
    """pale, grey (low-chroma) pixels joined to the crop's border"""
    g = (lum(a) > lum_min) & (np.ptp(a, axis=-1) < chroma)
    lab, _ = ndimage.label(g)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    return np.isin(lab, list(border))


def save(cid, img, source):
    img.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=86, method=6)
    meta[cid] = {'w': img.width, 'h': img.height, 'ground': 'clear', 'source': source}
    print(cid, img.size)


# ---- Rural Water Center (p15)
d = pymupdf.open(os.path.join(SRC, 'Synget Water Centers_26.pdf'))
page = Image.open(io.BytesIO(d.extract_image(d[14].get_images(full=True)[0][0])['image'])).convert('RGB')
im = page.crop((502, 248, 1172, 690)); a = np.asarray(im, dtype=np.float32)   # inside the slide's panel borders (green left, purple below)
fg = largest(~ground_mask(a, 238, 14))
fg = ndimage.binary_fill_holes(fg)
fg = ndimage.binary_opening(fg, iterations=1)
fg = ndimage.binary_erosion(fg, iterations=1)
mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
out = im.convert('RGBA'); out.putalpha(mask)
out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
big = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
rgb = big.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
rgb.putalpha(big.getchannel('A'))
save('rwc-centre-cut', rgb, 'Synget Water Centers_26.pdf p15 (enlarged 2x)')

# ---- Smart Milk Vending without the Paytm sticker
src = Image.open(os.path.join(OUT, 'smart-milk-vending-cut.webp')).convert('RGBA')
a = np.asarray(src, dtype=np.float32).copy()
x0, y0, x1, y1 = 384, 141, 446, 240          # the sticker, kept left of the milk stream that runs down the panel's edge
yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
box = (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1)
rgb_ = a[..., :3]
blue = (rgb_[..., 2] - rgb_[..., 0] > 70) & (lum(rgb_) < 150)           # the panel's own blue
paint = box & ~blue
lab, n = ndimage.label(paint)                 # drop what touches the box's right or bottom edge: the milk stream
edge_ids = set(np.unique(np.concatenate([lab[y0:y1, x1 - 1], lab[y1 - 1, x0:x1]]))) - {0}
paint = paint & ~np.isin(lab, list(edge_ids))
paint = ndimage.binary_dilation(paint, iterations=2) & box & ~ndimage.binary_dilation(np.isin(lab, list(edge_ids)), iterations=1)
ring = (xx >= x0 - 10) & (xx < x1) & (yy >= y0 - 10) & (yy < y1 + 10) & ~paint & blue
# fit each channel as a plane c = p0 + p1*x + p2*y over the surrounding panel, then fill the sticker with it
A = np.stack([np.ones(ring.sum()), xx[ring], yy[ring]], 1)
fill = np.zeros((paint.sum(), 3))
B = np.stack([np.ones(paint.sum()), xx[paint], yy[paint]], 1)
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, rgb_[..., c][ring], rcond=None)
    fill[:, c] = B @ coef
rng = np.random.default_rng(7)
fill += rng.normal(0, 1.4, fill.shape)   # the render's fine grain, so the patch does not read as flat
a[..., :3][paint] = np.clip(fill, 0, 255)
cleaned = Image.fromarray(a.astype(np.uint8), 'RGBA')
# soften the patch edge only
soft = cleaned.filter(ImageFilter.GaussianBlur(0.8))
edge = ndimage.binary_dilation(paint, iterations=1) & ~ndimage.binary_erosion(paint, iterations=1)
c2 = np.asarray(cleaned).copy(); s2 = np.asarray(soft)
c2[edge] = s2[edge]
save('smart-milk-vending-clean-cut', Image.fromarray(c2, 'RGBA'), 'smart-milk-vending-flyer.jpg (Paytm sticker painted out)')

json.dump(meta, open(meta_path, 'w'), indent=1)
