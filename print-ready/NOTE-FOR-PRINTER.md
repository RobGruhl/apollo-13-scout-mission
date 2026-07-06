# Note for the Print Shop

Job: **2 large-format posters + 5 business-card designs** for a scouting exhibit
(2026 Elevate National Jamboree, NASA Tent). Questions: Rob Gruhl — rob.gruhl@gmail.com

All files are **flattened PNG, RGB (sRGB-intent), 8-bit/channel, no alpha, no
embedded ICC profile**. Please convert to your press profile as usual; the artwork
is dominated by deep navy/black, bright whites, and NASA red — nothing gamut-critical.

---

## Posters (2 designs, quantity per order form)

| File | Final size | Pixels | Effective DPI |
|---|---|---|---|
| `poster-1-attract-36x48-300dpi.png` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |
| `poster-2-computer-rescue-36x48-300dpi.png` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |

- Sized **exactly to the 36 × 48 finished dimension — no bleed included.** Both are dark,
  full-coverage art to the edge: if your workflow needs bleed, scaling to ~100.5% or
  edge-extending is fine.
- Mounting: foam board / easel, indoor tent, viewed 3–10 ft. **Matte or satin** (gloss glares).
- **Each poster's QR must stay scannable** — dark-on-white as supplied, never inverted; avoid
  heavy dot gain on the QR panel. Verified to decode to `https://apollo13.quest/`.

## Business cards (5 designs — all standard **3.5 × 2 in**, single-sided)

| File | Design | Qty | Bleed status |
|---|---|---|---|
| `business-card-invitation-bleed.png` | Invitation / QR take-home | **500** | includes ⅛″ bleed (3.75 × 2.25) |
| `card-rank-ground-crew.png` | Rank — Ground Crew (4 🏆) | **1,500** | **trim only — needs bleed** |
| `card-rank-flight-controller.png` | Rank — Flight Controller (6 🏆) | **1,500** | **trim only — needs bleed** |
| `card-rank-flight-director.png` | Rank — Flight Director (8 🏆) | **1,500** | **trim only — needs bleed** |
| `card-rank-mission-commander.png` | Rank — Mission Commander (10 🏆) | **1,500** | **trim only — needs bleed** |

Total cards: **500 invitation + 6,000 rank = 6,500.**

- **All 5 are single-sided**, standard North-American business-card size **3.5 × 2 in**, and
  print in **CMYK color only — NO foil / no special finishes.** The gold / platinum / bronze /
  steel "metal" on the rank cards is ordinary printed color.
- **Bleed:** the *invitation* file already includes ⅛″ bleed (trim to 3.5 × 2). The **four rank
  cards are supplied at exact 3.5 × 2 trim with no bleed yet** — please tell us your required
  bleed amount and we'll send bled versions (the navy field + corner-tick frame extend cleanly).
- The invitation's QR must stay scannable (dark-on-white, never inverted). The **rank cards have
  no QR** by design — they're trophies.
- Stock: **350 gsm (14–16 pt) or heavier**, matte or soft-touch preferred. Corners square.
- The four rank cards share one design system (navy flight-certificate, corner registration
  ticks, embroidered patch) and differ only by rank name + metal color + trophy count.

---

## Quick sanity checklist (verified on our end)

- ✅ Poster pixel dimensions ÷ 300 = 36 × 48 exactly; rank cards 3808 × 2176 = 3.5 × 2 at trim
- ✅ QR codes (poster 1 + invitation) decode to `https://apollo13.quest/` (zbar, incl. reduced-scale)
- ✅ Trophy counts on rank cards are exactly 4 / 6 / 8 / 10 (composited, not hand-set)
- ✅ RGB, flattened, no transparency, no spot colors, fonts rasterized

If anything looks off on preflight — especially the QR panels, the deep navy, or the missing
bleed on the four rank cards — please contact us before running the job.
