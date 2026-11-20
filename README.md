# Sygnet IoT website (first draft)

Static, multi-page site for Sygnet IoT. Built by Vrattiks.

## Preview locally

```bash
node build/build.mjs     # rebuilds ./site from ./build (Node 18+, no dependencies)
node serve.mjs           # serves ./site at http://localhost:8080 with clean URLs
```

Use a different port with `PORT=3000 node serve.mjs` (bash) or `$env:PORT=3000; node serve.mjs` (PowerShell).
Open over http, not by double-clicking the HTML files: pages use root paths (`/assets/...`).

## Where things live

| Path | What |
|---|---|
| `build/data.mjs` | All content: products, industries, solutions, platform, partner tiers, contacts |
| `build/pages.mjs` | Every page's sections |
| `build/layout.mjs` | Shared head (SEO tags), header with mega menus, footer |
| `build/ui.mjs` | Components and the illustrative product screens |
| `build/brand.mjs` | Brand colours and art (hexagon tile, background chevrons); copies `build/brand/` logo files to `site/img/brand/` |
| `build/brand/` | Logo SVGs and icons extracted from the brand kit PDF (`build/tools/extract_logo.py`, `make_logo_svgs.py`). Drop the designer's master SVGs here under the same names |
| `build/catalog/` | Product shots cropped from the client catalogs as WebP (`py build/tools/crop_catalog.py content/flyers`); the product cards use transparent cut-outs, `*-cut.webp` (`py build/tools/cutout_cards.py content/flyers`, run after the crop script); the School Bell & PA viewer's model and speaker cut-outs come from `py build/tools/cutout_bell.py content/flyers` (catalogue page 1, the only page where every model carries the Sygnet name); the Dairy Connect page's kiosk, mobile and tank cut-outs come from `py build/tools/cutout_dairy.py content/flyers` (catalogue pages 14 and 12) |
| `build/fonts/` | Self-hosted Jost and Geist Mono (OFL). Nulshock Bold (brand primary, used for h1/h2) goes here as `nulshock-bold.woff2` once its web licence is bought; headings fall back to Jost until then |
| `build/site.css` | Site styles on top of the taste-skill kit |
| `build/legal/` | Privacy and Terms text carried over from the old site |
| `site/` | Built output, ready to upload to any static host |
| `site/img/brand/` | Logo files and brand art, written fresh by every build |

## Deploy

Upload the contents of `site/` to any static host (Netlify, Cloudflare Pages, GitHub Pages, cPanel).
`404.html`, `sitemap.xml` and `robots.txt` are generated.
On Vercel, `vercel.json` runs the build and serves `site/` (the repo root has no `index.html`, so without it every URL is a 404).

## Still to come from the client

Designer's master logo SVGs (the site uses vector paths extracted from BrandKit (1).pdf), confirmation of the four colour values (the kit prints #293681 under every swatch),
a Nulshock web licence if the display face should appear on the site, written permission to name the hospitals from the NCS catalog, certificate copies,
model-wise specifications, product photographs to replace the catalog renders, case studies, team, founding year, social links, the street address,
confirmation of the NCS tier-to-bed-size mapping and the "Formerly Resonent" line, legal review of Privacy and Terms, and a form service account (the demo form falls back to email).
