# Crops the clean product shots out of the client's catalog PDFs into build/catalog/*.webp.
# Usage: py build/tools/crop_catalog.py "content/flyers"   (re-run when the client sends new catalogs)
# Boxes are in the native pixels of each page's embedded image. Excluded on purpose (see README):
# room indicator, bathroom pull-cord, bedswitch and attend switch here (they carry a small non-Sygnet mark; the NCS page
# uses them via cutout_ncs.py at the client's request until clean shots arrive),
# reporting-server monitors and every dashboard screen (mock numbers), Water ATM kiosks showing "Waari",
# bell units showing "VIDYALAYA", people and scene photographs, the Resonent thank-you slide.
import sys, os, io, json, pymupdf
from PIL import Image
SRC = sys.argv[1]; OUT = os.path.join(os.path.dirname(__file__), '..', 'catalog')
PDF = {'ncs': 'Sygnet NCS Catalog.pdf', 'bell': 'Sygnet Bell PA Systems.pdf', 'qms': 'Sygnet QMS.pdf',
       'profile': 'Sygnet Profile.pdf', 'water': 'Sygnet_Water ATM_26-1.pdf', 'centre': 'Synget Water Centers_26.pdf',
       'dairy': 'Sygnet Dairy Connect_26-1.pdf'}
CROPS = [  # id, pdf, page, box (x0, y0, x1, y1), ground
  ('ncs-station-display', 'ncs', 2, (120, 535, 385, 710), 'light'),
  ('ncs-pendant-switch', 'ncs', 2, (750, 545, 910, 702), 'light'),
  ('ncs-lcd-display', 'ncs', 2, (140, 925, 310, 1068), 'light'),
  ('ncs-bedside-pendant', 'ncs', 2, (750, 925, 900, 1062), 'light'),
  ('ncs-code-blue-switch', 'ncs', 3, (652, 572, 808, 702), 'light'),
  ('ncs-nurse-station-unit', 'ncs', 3, (822, 562, 1008, 714), 'light'),
  ('ncs-patient-tracker', 'ncs', 3, (62, 812, 203, 978), 'light'),
  ('ncs-staff-tracker', 'ncs', 3, (646, 812, 774, 978), 'light'),
  ('ncs-staff-app', 'ncs', 3, (446, 1042, 579, 1270), 'light'),
  ('bell-tbg', 'bell', 2, (488, 586, 1036, 1128), 'light'),
  ('bell-range-tbg', 'bell', 1, (24, 512, 207, 760), 'light'),
  ('bell-range-tba-wl', 'bell', 1, (222, 512, 398, 760), 'light'),
  ('bell-range-tba-d', 'bell', 1, (396, 540, 624, 762), 'light'),
  ('bell-range-tbw-wl', 'bell', 1, (620, 512, 797, 760), 'light'),
  ('bell-range-tbw-d', 'bell', 1, (786, 540, 1042, 762), 'light'),
  ('bell-speaker', 'bell', 1, (460, 910, 732, 1256), 'light'),
  ('qms-lite', 'qms', 18, (40, 412, 470, 772), 'dark'),
  ('qms-kiosk', 'qms', 18, (500, 368, 672, 780), 'dark'),
  ('qms-counter-display', 'qms', 18, (944, 590, 1080, 780), 'dark'),
  ('qms-family', 'qms', 19, (762, 110, 1662, 818), 'dark'),
  ('hw-industrial-controller', 'profile', 7, (468, 108, 968, 348), 'dark'),
  ('hw-sensor-nodes', 'profile', 7, (428, 412, 708, 562), 'dark'),
  ('hw-wireless-node', 'profile', 7, (748, 342, 978, 566), 'dark'),
  ('hw-bridge-device', 'profile', 7, (422, 618, 642, 792), 'dark'),
  ('hw-industrial-gateway', 'profile', 7, (678, 612, 988, 797), 'dark'),
  ('hw-data-logger', 'profile', 7, (432, 838, 668, 992), 'dark'),
  ('hw-communication-module', 'profile', 7, (722, 852, 962, 978), 'dark'),
  ('hw-edge-computer', 'profile', 7, (532, 1028, 888, 1232), 'dark'),
  ('water-atm-kiosk', 'water', 15, (684, 98, 1182, 766), 'light'),
  ('water-centre', 'centre', 15, (502, 262, 1157, 692), 'light'),
  ('dairy-milk-atm', 'dairy', 14, (466, 278, 794, 708), 'light'),
  ('dairy-mobile-milk-atm', 'dairy', 14, (1140, 410, 1545, 700), 'light'),
]
FIX = {
  'dairy-milk-atm': [((466, 278, 594, 347), (255, 255, 255)), ((636, 278, 680, 347), (255, 255, 255)), ((726, 278, 794, 347), (255, 255, 255)), ((594, 278, 636, 347), 'banner'), ((680, 278, 726, 347), 'banner'), ((466, 340, 794, 351), 'banner'), ((560, 278, 760, 351), 'halo')],
  'qms-family': [((762, 416, 806, 470), (1, 20, 57))],
  'hw-wireless-node': [((748, 342, 782, 370), (5, 12, 27))],
  'bell-range-tbg': [((24, 512, 207, 524), (246, 247, 251))],
  'bell-range-tba-wl': [((222, 512, 398, 524), (246, 247, 251))],
  'bell-range-tbw-wl': [((620, 512, 797, 524), (246, 247, 251)), ((620, 512, 627, 560), (246, 247, 251))],
}
os.makedirs(OUT, exist_ok=True)
pages = {}
# keep the flyer crops made on 2026-11-18 (flyer-*.webp, from the JPG flyers in content/flyers)
# and the product-card cut-outs (*-cut.webp, build/tools/cutout_cards.py)
old = os.path.join(OUT, 'catalog.json')
meta = {k: v for k, v in (json.load(open(old)).items() if os.path.exists(old) else []) if k.startswith('flyer-') or k.endswith('-cut')}
for cid, pdf, page, box, ground in CROPS:
    key = (pdf, page)
    if key not in pages:
        d = pymupdf.open(os.path.join(SRC, PDF[pdf]))
        xref = d[page - 1].get_images(full=True)[0][0]
        pages[key] = Image.open(io.BytesIO(d.extract_image(xref)['image'])).convert('RGB')
    im = pages[key].crop(box)
    px = im.load()
    for (x0, y0, x1, y1), mode in FIX.get(cid, []):   # paint out slide furniture caught in the box
        for y in range(y0 - box[1], y1 - box[1]):
            for x in range(x0 - box[0], x1 - box[0]):
                r, g, b = px[x, y]
                if mode == 'banner' and b > 120 and b - r > 50 and b - g > 20: px[x, y] = (255, 255, 255)
                elif mode == 'banner-text' and r > 200 and g > 200 and b > 200: px[x, y] = (255, 255, 255)
                elif mode == 'halo' and b > 90 and b - r > 35 and b - g > 10: px[x, y] = (232, 236, 240)
                elif isinstance(mode, tuple): px[x, y] = mode
    im.save(os.path.join(OUT, cid + '.webp'), 'WEBP', quality=84, method=6)
    meta[cid] = {'w': im.width, 'h': im.height, 'ground': ground, 'source': f'{PDF[pdf]} p{page}'}
json.dump(meta, open(os.path.join(OUT, 'catalog.json'), 'w'), indent=1)
print(len(meta), 'images ->', os.path.abspath(OUT))
