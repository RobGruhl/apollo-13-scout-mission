# Note for the Print Shop

Job: 2 large-format posters + 2 business card designs for a scouting exhibit
(2026 Elevate National Jamboree, NASA Tent). Questions: Rob Gruhl — rob.gruhl@gmail.com

All files are **flattened PNG, RGB (sRGB-intent), 8-bit/channel, no alpha, no
embedded ICC profile**. Please convert to your press profile as usual; the artwork
is dominated by deep blacks, bright whites, and NASA red/blue — nothing gamut-critical.

---

## Posters (2 designs, quantity per order form)

| File | Final size | Pixels | Effective DPI |
|---|---|---|---|
| `poster-1-attract-36x48-300dpi.png` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |
| `poster-2-computer-rescue-36x48-300dpi.png` | **36 × 48 in, portrait** | 10800 × 14400 | 300 |

- Files are sized **exactly to the 36 × 48 finished dimension — no bleed included.**
  Both designs have dark, full-coverage art to the very edge: if your workflow needs
  bleed, scaling to ~100.5% or edge-extending is fine. (On poster 1, the mission-patch
  artwork sits ~0.3″ from the bottom-left edges — prefer edge-extension over heavy
  cropping if you must trim.)
- Intended mounting: foam board / easel display, indoor tent, viewed from 3–10 ft.
- Matte or satin finish preferred over gloss (tent lighting causes glare).
- **Each poster contains a QR code that must remain scannable**: print dark-on-white
  exactly as supplied (never invert), and please avoid heavy dot gain on the QR
  panel. Codes were verified to decode to `https://apollo13.quest/` at ⅓ scale, so
  normal large-format output has generous margin.

## Business cards (2 designs, quantity per order form)

| File | Trim size | File includes | Pixels | Effective DPI |
|---|---|---|---|---|
| `business-card-invitation-bleed.png` | **3.5 × 2 in** | ⅛″ bleed each side (3.75 × 2.25 in total) | 4080 × 2448 | 1088 |
| `business-card-reward-bleed.png` | **3.5 × 2 in** | ⅛″ bleed each side (3.75 × 2.25 in total) | 4080 × 2448 | 1088 |

- **Trim to 3.5 × 2 in.** All text, logos, and the QR code sit well inside the safe
  area (≥ ¼″ from trim).
- These are **single-sided** designs (backs blank, or shop-standard plain black if
  double-sided is cheaper — nothing prints on the back).
- Stock: **350 gsm (14–16 pt) or heavier**, matte or soft-touch preferred.
- The invitation card's QR code must remain scannable — dark-on-white as supplied,
  never inverted. The reward card intentionally has **no** QR.
- Corners: square (no radius) unless rounded is free — either is fine.
- **Cut accuracy notes**: on the *invitation* card, the white QR panel runs close to
  the right trim line — please favor centered cuts on that edge (the code stays
  scannable regardless). On the *reward* card, the thin gold frame sits ~1/32–1/16″
  inside trim, i.e. within normal cutter tolerance — a slightly uneven frame is
  acceptable; scannability/text are unaffected.

---

## Quick sanity checklist (what we already verified on our end)

- ✅ Pixel dimensions ÷ DPI = ordered physical sizes exactly
- ✅ QR codes decode to `https://apollo13.quest/` (zbar, including reduced-scale stress test)
- ✅ Poster 1 reads "Score 8+ trophies. Earn the Apollo card." (current wording — supersedes any older proof that said 5+)
- ✅ RGB, flattened, no transparency, no spot colors, fonts rasterized

If anything looks off on your preflight — especially around the QR panels or the
deep blacks — please contact us before running the job.
