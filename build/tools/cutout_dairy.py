# Cuts the Dairy Connect product shots out of the catalogue into transparent WebP for the Dairy Connect page
# (pages.mjs dairyPage): the two models in the viewer and the tank cut-away in "Milk quality assurance".
# Sources (Sygnet Dairy Connect_26-1.pdf, native pixels of each page's embedded 1672x941 image):
#   dairy-kiosk-cut   p14 "Deployment models": the Community Milk ATM with the SYGNET IOT CONNECT mark on its side
#                     and front. Its motor and tap handle stand in front of the slide's blue "Model 1" banner,
#                     so the banner's blue is removed as ground in that band only.
#   dairy-mobile-cut  p14: the Mobile Milk ATM (stainless tanker with two dispensing units). It carries no brand
#                     mark at all. The p6 and p17 trucks are not used: p6 has a maker's badge on the cab, p17 shows
#                     a "milk" logo on the unit screens.
#   dairy-tank-cut    p12 "Milk quality assurance": the cabinet cut open to show the SS 304 tank and agitator. The
#                     slide's four dashed callout lines and their dots are painted out (the page lists the
#                     callouts in HTML). Its side panel shows a "milk" word with unreadable AI lettering under it.
# Skipped on purpose: cows and farm scenes, every RSMS dashboard screen (mock figures), the phone payment photo,
# the p1 and p17 kiosks (they read "milk Now" / "milk Mitra"-like names), p2, p7, p8 and p15 (excluded slides).
# Each cut-out is enlarged 2x with Lanczos and a light sharpen; the viewer caps the display size (pages.mjs).
# Usage: py build/tools/cutout_dairy.py "content/flyers"   (after crop_catalog.py; it keeps *-cut entries)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = 'Sygnet Dairy Connect_26-1.pdf'


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


def finish(im, fg, cid, src):
    mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
    out = im.convert('RGBA'); out.putalpha(mask)
    out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
    big = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
    rgb = big.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    rgb.putalpha(big.getchannel('A'))
    rgb.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=90, alpha_quality=100, method=6)
    meta[cid] = {'w': rgb.width, 'h': rgb.height, 'ground': 'clear', 'source': f'{PDF} {src} (enlarged 2x)'}
    print(cid, rgb.size)


meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))
p14, p12 = page(14), page(12)

# ---- Community Milk ATM (p14). Banner rows: 293-348 (absolute). Banner blue = saturated blue.
box = (466, 252, 794, 708)
im = p14.crop(box); a = np.asarray(im, dtype=np.float32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
band = np.zeros(a.shape[:2], bool); band[293 - box[1]:349 - box[1]] = True
blue = band & (b > 90) & (b - r > 45) & (b - g > 30)
# in the banner band only the motor (x 594-636) and the tap handle (x 680-726) belong to the machine
cols = np.zeros(a.shape[1], bool); cols[594 - box[0]:637 - box[0]] = True; cols[680 - box[0]:727 - box[0]] = True
ground = ground_mask(a, 238, 16) | blue | (band & ~cols[None, :])
# above the banner's bottom edge, near-white is ground too, joined or not (the inside of the handle loop)
top = np.zeros_like(band); top[:352 - box[1]] = True
ground |= top & (lum(a) > 246) & (np.ptp(a, axis=-1) < 12)
fg = largest(~ground)
fg = ndimage.binary_fill_holes(fg & ~top) | (fg & top)
# the tap handle's arc stands on its own in the banner band (thin legs, pale highlights): add it back from its window
hw = np.zeros_like(band); hw[293 - box[1]:372 - box[1], 680 - box[0]:727 - box[0]] = True
fg |= hw & ~blue & ~((lum(a) > 246) & (np.ptp(a, axis=-1) < 12)) & ~ground_mask(a, 238, 16) | (hw & band & ~blue & (lum(a) < 246))
fg = ndimage.binary_erosion(fg, iterations=1)
# blue fringe left on the motor and handle edges in the banner band: turn it to the handle's grey
fr = band & fg & (b - r > 18)
a2 = a.copy(); L = lum(a)[..., None]; a2[fr] = np.repeat(L, 3, axis=-1)[fr]
finish(Image.fromarray(a2.clip(0, 255).astype(np.uint8)), fg, 'dairy-kiosk-cut', 'p14')

# ---- Mobile Milk ATM (p14)
box = (1136, 404, 1550, 704)
im = p14.crop(box); a = np.asarray(im, dtype=np.float32)
fg = largest(~ground_mask(a, 236, 14))
fg = ndimage.binary_erosion(ndimage.binary_fill_holes(fg), iterations=1)
finish(im, fg, 'dairy-mobile-cut', 'p14')

# ---- tank cut-away (p12): paint out the callout lines and dots first, then cut. The box stops at the cabinet's
# right edge, where the lines leave the picture for the slide's labels.
box = (652, 106, 955, 646)
im = p12.crop(box); a = np.asarray(im, dtype=np.float32)
# the five callouts, measured on this crop: (line row, dot x, end x); lines B-E run off the right edge to the labels
CALLOUTS = [(185, 63, 160, 4), (172, 220, None, 4), (269, 188, None, 8), (368, 237, None, 5), (460, 220, None, 5)]   # + half height
callout = np.zeros(a.shape[:2], bool)
for y, dx, x1, h in CALLOUTS:
    callout[y - h:y + h + 1, dx - 8:x1 or a.shape[1]] = True     # the line with its soft edge (C has white dashes in a dark glow)
    callout[y - 6:y + 7, dx - 8:dx + 9] = True               # the dot
px = a.copy()
# fill each masked pixel from the nearest unmasked rows above and below (the lines are horizontal)
H, W = callout.shape
for x in range(W):
    col = callout[:, x]
    y = 0
    while y < H:
        if col[y]:
            y0 = y
            while y < H and col[y]: y += 1
            above = px[y0 - 1, x] if y0 > 0 else px[min(y, H - 1), x]
            below = px[y, x] if y < H else above
            n = y - y0 + 1
            for k in range(y0, y):
                t = (k - y0 + 1) / n
                px[k, x] = above * (1 - t) + below * t
        else:
            y += 1
clean = Image.fromarray(px.clip(0, 255).astype(np.uint8))
a = np.asarray(clean, dtype=np.float32)
fg = largest(~ground_mask(a, 222, 16))
fg = ndimage.binary_erosion(ndimage.binary_fill_holes(fg), iterations=1)
finish(clean, fg, 'dairy-tank-cut', 'p12')

json.dump(meta, open(meta_path, 'w'), indent=1)
