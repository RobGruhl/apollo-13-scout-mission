# Note for the Print Shop

Job: **2 large-format posters (× 2 copies each) + 5 business-card designs (× 1,500 each)**
for a scouting exhibit (2026 Elevate National Jamboree, NASA Tent).
Questions: Rob Gruhl — rob.gruhl@gmail.com

Every piece is supplied in **two formats**: the master **PNG** and a **PDF** with the PNG
embedded losslessly at the exact page size below — same pixels, use whichever preflights
better (the PDF pins the physical dimensions, so it's the recommended one).

All artwork is **flattened raster, RGB (sRGB-intent), 8-bit/channel, no alpha, no
embedded ICC profile**. Please convert to your press profile as usual; the artwork
is dominated by deep navy/black, bright whites, and NASA red — nothing gamut-critical.

---

## Posters (2 designs × **2 copies each** = 4 posters)

| Files (.png /.pdf) | Final size | Pixels | Effective DPI |
|---|---|---|---|
| `poster-1-attract-36x48-300dpi` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |
| `poster-2-computer-rescue-36x48-300dpi` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |

- **Material: poly** (tear-resistant, waterproof, UV-stable) — as discussed with Amy.
- Sized **exactly to the 36 × 48 finished dimension — no bleed included.** Both are dark,
  full-coverage art to the edge: if your workflow needs bleed, scaling to ~100.5% or
  edge-extending is fine.
- Displayed at an outdoor-tent exhibit table, viewed 3–10 ft. **Matte or satin** (gloss glares).
- **Each poster's QR must stay scannable** — dark-on-white as supplied, never inverted; avoid
  heavy dot gain on the QR panel. Verified to decode to `https://apollo13.quest/`.

## Business cards (5 designs × **1,500 each** = 7,500 cards, all standard **3.5 × 2 in**, single-sided)

| Files (.png /.pdf) | Design | Qty |
|---|---|---|
| `business-card-invitation-bleed` | Invitation / QR take-home | **1,500** |
| `card-rank-ground-crew` | Rank — Ground Crew (4 🏆) | **1,500** |
| `card-rank-flight-controller` | Rank — Flight Controller (6 🏆) | **1,500** |
| `card-rank-flight-director` | Rank — Flight Director (8 🏆) | **1,500** |
| `card-rank-mission-commander` | Rank — Mission Commander (10 🏆) | **1,500** |

- **All five files include ⅛″ bleed on all four sides** (per Amy, confirmed 2026-07-08):
  supplied at **3.75 × 2.25 in, trim to 3.5 × 2 in**. Nothing critical near the trim —
  the outer ⅛″+ is solid navy field.
- **All 5 are single-sided** and print in **CMYK color only — NO foil / no special finishes.**
  The gold / platinum / bronze / steel "metal" on the rank cards is ordinary printed color.
- The invitation's QR must stay scannable (dark-on-white, never inverted). The **rank cards have
  no QR** by design — they're trophies.
- Stock: **350 gsm (14–16 pt) or heavier**, matte or soft-touch preferred. Corners square.
- The four rank cards share one design system (navy flight-certificate, corner registration
  ticks, embroidered patch) and differ only by rank name + metal color + trophy count.

---

## Quick sanity checklist (verified on our end)

- ✅ Poster pixel dimensions ÷ 300 = 36 × 48 exactly; all cards 4080 × 2448 ÷ 1088 = 3.75 × 2.25 (bleed size)
- ✅ PDF page boxes verified: posters 2592 × 3456 pt (36 × 48 in), cards 270 × 162 pt (3.75 × 2.25 in)
- ✅ QR codes (poster 1 + invitation) decode to `https://apollo13.quest/` (zbar, incl. reduced-scale)
- ✅ Trophy counts on rank cards are exactly 4 / 6 / 8 / 10 (composited, not hand-set)
- ✅ RGB, flattened, no transparency, no spot colors, fonts rasterized

If anything looks off on preflight — especially the QR panels or the deep navy —
please contact us before running the job.
