# Cuts the QMS tier pictures out of the catalogue (content/flyers/Sygnet QMS.pdf) into transparent WebP for the
# Queue Management System page (pages.mjs qmsPage). All come from p18 "Product Portfolio", the one slide that
# shows the three tiers side by side (native pixels of its embedded 1672x941 image):
#   qms-lite-cut   QMS Lite: two red segment token displays and the Sygnet call pad
#   qms-pro-cut    QMS Professional: the Sygnet touch kiosk, the operator console monitor and the Sygnet token display.
#                  The console's sample figures (average time, "days pending", the waiting minutes and the small
#                  red counts) are painted out with their own row colour; tokens, buttons and "Jump Token" stay.
#   qms-ent-cut    QMS Enterprise: the laptop and phone. Their screens were a mock dashboard full of figures
#                  (1,248 / 1,028 / 18 Min / 4.6/5 / 124), so both screens are redrawn here as a plain layout with
#                  no figures and no words: sidebar, four tiles, a trend line and a ring.
#   qms-kiosk-lg   the kiosk alone (for the token section), the same p18 kiosk enlarged
#   qms-callpad    the call pad alone (counter console section), from p19 where it stands clear and larger
# Ground: the slide's navy (blue well above red); devices are neutral greys, blacks and whites. The ground is
# what passes that test and touches the crop's border; the device is every large piece left, holes filled.
# Skipped on purpose: every dashboard, report and feedback screen (mock figures, sample names), every stock photo
# of people, the p2 "Challenge" and p16 "Why Sygnet" slides, the p19 contact block (it has the wrong email).
# Each cut-out is enlarged 2x with Lanczos and a light sharpen; the page caps the display size.
# Usage: py build/tools/cutout_qms.py "content/flyers"   (after crop_catalog.py; it keeps *-cut entries)
import sys, os, io, json
import numpy as np, pymupdf
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = 'Sygnet QMS.pdf'


def page(n):
    d = pymupdf.open(os.path.join(SRC, PDF))
    xref = d[n - 1].get_images(full=True)[0][0]
    return Image.open(io.BytesIO(d.extract_image(xref)['image'])).convert('RGB')


def lum(a):
    return a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114


def navy(a):
    return (a[..., 2] - a[..., 0] > 18) & (a[..., 2] - a[..., 1] > 8) & (lum(a) < 170)


def cut(im, keep=1, min_frac=.02, erode=1):
    a = np.asarray(im, dtype=np.float32)
    lab, n = ndimage.label(navy(a))
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(border))
    fg = ndimage.binary_opening(fg, iterations=1)
    lab, n = ndimage.label(fg)
    sizes = ndimage.sum(fg, lab, range(1, n + 1))
    order = np.argsort(sizes)[::-1][:keep]
    fg = np.isin(lab, [i + 1 for i in order if sizes[i] > min_frac * fg.size])
    fg = ndimage.binary_fill_holes(fg)
    return ndimage.binary_erosion(fg, iterations=erode) if erode else fg


def erase(im, box, tol=34):
    """paint out text inside box: each row takes the colour found just left and right of the box on that row"""
    a = np.asarray(im).copy()
    x0, y0, x1, y1 = box
    for y in range(y0, y1):
        side = np.concatenate([a[y, x0 - 5:x0], a[y, x1:x1 + 5]]).astype(int)
        a[y, x0:x1] = np.median(side, axis=0).astype(np.uint8)
    return Image.fromarray(a)


def fill(im, box, colour):
    im = im.copy(); ImageDraw.Draw(im).rectangle(box, fill=colour); return im


def screen_box(im, box, thr=200):
    """the bright screen inside a device: bounding box of the largest bright region in box"""
    a = np.asarray(im.crop(box), dtype=np.float32)
    lab, n = ndimage.label(lum(a) > thr)
    i = 1 + int(np.argmax(ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))))
    ys, xs = np.nonzero(lab == i)
    return (box[0] + xs.min(), box[1] + ys.min(), box[0] + xs.max(), box[1] + ys.max())


def dashboard(size, phone=False):
    """a plain dashboard with no figures or words, drawn at 4x and reduced (brand colours)"""
    w, h = size; k = 4
    im = Image.new('RGB', (w * k, h * k), (247, 250, 253)); d = ImageDraw.Draw(im)
    W, H = w * k, h * k
    ink, tint, line, blue, sky = (41, 54, 129), (232, 244, 248), (214, 226, 236), (70, 117, 215), (148, 205, 221)
    r = lambda b, c, rad=6: d.rounded_rectangle([int(v) for v in b], rad * k // 2, fill=c)
    if not phone:
        r((0, 0, W * .17, H), ink, 0)
        for i in range(6):
            r((W * .03, H * (.16 + i * .1), W * .14, H * (.16 + i * .1) + 2.2 * k), (90, 104, 180) if i else (148, 205, 221), 1)
        x0 = W * .2; cw = (W * .97 - x0 - 3 * W * .02) / 4
        r((x0, H * .05, x0 + W * .28, H * .05 + 3 * k), (190, 202, 222), 1)
        for i in range(4):
            cx = x0 + i * (cw + W * .02)
            r((cx, H * .14, cx + cw, H * .34), (255, 255, 255))
            r((cx + cw * .1, H * .19, cx + cw * .6, H * .19 + 2 * k), (200, 210, 228), 1)
            r((cx + cw * .1, H * .25, cx + cw * .42, H * .25 + 4.5 * k), (blue if i == 0 else ink), 1)
        r((x0, H * .39, x0 + W * .44, H * .95), (255, 255, 255))
        pts = [(x0 + W * .03 + j * W * .38 / 8, H * (.82 - .3 * v)) for j, v in enumerate([.1, .3, .22, .5, .38, .62, .55, .8, .7])]
        d.line(pts, fill=blue, width=int(1.6 * k), joint='curve')
        rx = x0 + W * .47
        r((rx, H * .39, W * .97, H * .95), (255, 255, 255))
        cx, cy, rr = rx + (W * .97 - rx) * .32, H * .67, min(W * .09, H * .2)
        d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), outline=tint, width=int(rr * .34))
        d.arc((cx - rr, cy - rr, cx + rr, cy + rr), -90, 150, fill=blue, width=int(rr * .34))
        d.arc((cx - rr, cy - rr, cx + rr, cy + rr), 150, 230, fill=sky, width=int(rr * .34))
        for i, c in enumerate((blue, sky, ink)):
            ly = H * (.55 + i * .1)
            r((cx + rr * 1.5, ly, cx + rr * 1.5 + 2.4 * k, ly + 2.4 * k), c, 1)
            r((cx + rr * 1.5 + 4 * k, ly, cx + rr * 1.5 + W * .07, ly + 2.2 * k), line, 1)
    else:
        r((0, 0, W, H * .1), ink, 0)
        for i in range(4):
            y = H * (.15 + i * .2)
            r((W * .08, y, W * .92, y + H * .16), (255, 255, 255))
            r((W * .16, y + H * .035, W * .5, y + H * .035 + 1.6 * k), (200, 210, 228), 1)
            r((W * .16, y + H * .085, W * .4, y + H * .085 + 3 * k), blue if i == 0 else ink, 1)
            pts = [(W * (.56 + j * .05), y + H * (.1 - .05 * v)) for j, v in enumerate([.2, .6, .3, .8, .5, .9, .7])]
            d.line(pts, fill=blue, width=int(1 * k))
    return im.resize(size, Image.LANCZOS)


def finish(im, fg, cid, src, scale=2, feather=.7):
    mask = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather))
    out = im.convert('RGBA'); out.putalpha(mask)
    out = out.crop(mask.point(lambda v: 255 if v > 8 else 0).getbbox())
    out = out.resize((out.width * scale, out.height * scale), Image.LANCZOS)
    rgb = out.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    rgb.putalpha(out.getchannel('A'))
    rgb.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=88, alpha_quality=100, method=6)
    meta[cid] = {'w': rgb.width, 'h': rgb.height, 'ground': 'clear', 'source': f'{PDF} {src} (enlarged {scale}x)'}
    print(cid, rgb.size)


meta_path = os.path.join(OUT, 'catalog.json')
meta = json.load(open(meta_path))
p18 = page(18)

# QMS Lite: two segment displays and the call pad
lite = p18.crop((30, 398, 480, 790))
finish(lite, cut(lite, keep=3), 'qms-lite-cut', 'p18')

# QMS Professional: kiosk, console monitor, token display; the console's figures painted out first
# (boxes in the crop's pixels: average time in the header, "3/7 Days Pending", the red counts, the waiting minutes)
pro = p18.crop((503, 362, 1086, 794))
for b in [(262, 63, 325, 83), (194, 99, 257, 112), (332, 158, 343, 190), (350, 156, 381, 288)]:
    pro = erase(pro, b)
finish(pro, cut(pro, keep=2, erode=2), 'qms-pro-cut', 'p18')

# QMS Enterprise: laptop and phone, both screens redrawn without figures
ent = p18.copy()
ent.paste(dashboard((375, 234)), (1120, 407))
ph = dashboard((91, 192), phone=True)
m = Image.new('L', ph.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, ph.width - 1, ph.height - 1), 12, fill=255)
ent.paste(ph, (1520, 506), m)
ImageDraw.Draw(ent).rounded_rectangle((1550, 509, 1582, 518), 5, fill=(8, 10, 16))   # the phone's camera notch
ent = ent.crop((1082, 392, 1625, 716))   # laptop and phone; the "Cloud powered" words above the phone drop out (small pieces)
finish(ent, cut(ent, keep=2), 'qms-ent-cut', 'p18, screens redrawn')

# the kiosk alone (token section)
kiosk = p18.crop((494, 362, 676, 786))
finish(kiosk, cut(kiosk, keep=1, erode=2), 'qms-kiosk-lg', 'p18')

# the call pad alone (counter console section): p19, where it stands larger; a white rounded slab, so its own
# rounded rectangle is the mask (the laptop behind it is the same grey as its left edge)
pad = page(19).crop((1468, 308, 1658, 610))
mk = Image.new('L', pad.size, 0); ImageDraw.Draw(mk).rounded_rectangle((6, 6, 182, 296), 21, fill=255)
finish(pad, np.asarray(mk) > 127, 'qms-callpad', 'p19')

json.dump(meta, open(meta_path, 'w'), indent=1)
