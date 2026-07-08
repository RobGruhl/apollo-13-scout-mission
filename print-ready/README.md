# Print-Ready Masters — CANONICAL

These are the files to send to the printer. This repo is the canonical home;
any copies elsewhere (e.g. the `apollo-working-materials` archive) are historical.

Every piece exists in **two formats**: the master `.png` and a `.pdf` of the same name
(the PNG embedded losslessly via `img2pdf` with the exact page size stamped — identical
pixels; the PDF exists so the shop's software can't mis-size the raster).

| File (.png / .pdf) | Piece | Print size | Resolution |
|---|---|---|---|
| `poster-1-attract-36x48-300dpi` | Attract poster ("Can YOU bring them home?") | 36″ × 48″ | 10800 × 14400 @ 300 dpi |
| `poster-2-computer-rescue-36x48-300dpi` | Computer Rescue Mission poster | 36″ × 48″ | 10800 × 14400 @ 300 dpi |
| `business-card-invitation-bleed` | Invitation / QR take-home card | 3.5″ × 2″ + ⅛″ bleed | 4080 × 2448 @ 1088 dpi |
| `card-rank-ground-crew` | Rank card — Ground Crew (4 🏆, steel) | 3.5″ × 2″ + ⅛″ bleed | 4080 × 2448 @ 1088 dpi |
| `card-rank-flight-controller` | Rank card — Flight Controller (6 🏆, bronze) | 3.5″ × 2″ + ⅛″ bleed | 4080 × 2448 @ 1088 dpi |
| `card-rank-flight-director` | Rank card — Flight Director (8 🏆, platinum) | 3.5″ × 2″ + ⅛″ bleed | 4080 × 2448 @ 1088 dpi |
| `card-rank-mission-commander` | Rank card — Mission Commander (10 🏆, gold) | 3.5″ × 2″ + ⅛″ bleed | 4080 × 2448 @ 1088 dpi |

Seven print pieces: **2 posters + 5 business cards** (1 invitation + 4 rank cards). The four
rank cards replaced the single "Mission Commander" reward card (Ed's 2026-07-05 note: one
card per rank, trophy counts 4/6/8/10).

**Order (UMD Print Shop / Amy, 2026-07-08):** posters on **poly** (tear-resistant, waterproof,
UV-stable), **2 copies of each**; business cards **1,500 of each of the 5 designs = 7,500**.

## Print notes

- **Bleed (resolved 2026-07-08)**: Amy confirmed **⅛″ bleed on all four sides** for the cards.
  All five card files now include it (supplied 3.75″ × 2.25″, trim to 3.5″ × 2″). The rank cards'
  bleed is an edge-extension of the solid navy field; the art inside the trim is pixel-identical
  to the proofed 2026-07-05 masters. Their dpi metadata was also corrected (300 → 1088).
- **Rank cards**: single-sided, **CMYK color print (no foil)** — the gold/platinum/bronze/steel
  "metal" is printed color, not foil stock. No QR (they are trophies, not ads).
  Trophy count row is composited, always exact.
- **Invitation card**: its QR decodes to `https://apollo13.quest/` — dark-on-white, **never invert.**
- **Cards stock**: 350 gsm+ (14–16 pt), matte or soft-touch preferred.
- **QR codes** (poster 1 + invitation card) decode to `https://apollo13.quest/` —
  zbarimg-verified, error correction Q, dark-on-white. **Never invert colors.**
- **Art refreshed 2026-07-05** (Ed's proof notes): poster 1's Service Module is now a crisp
  high-resolution reimagining (the 1970 NASA photo was too soft to print at 4 ft); poster 2's
  guidance roster reads **"GUIDANCE PRIME → AC ELECTRONICS"** (was "SYSTEM INTEGRATOR").
  Later the same day, poster 1's reward block was re-typeset to the four-card scheme:
  **"Score 4+ trophies. / Earn your rank card."** with the small caption **"One card per rank."**
  (was "Score 8+ trophies. / Earn the Apollo card." + "Earn your rank."). Regen provenance
  lives in the private `apollo-working-materials/poster-regen-2026-07-05/` (incl. `rankcard-line-edit/`).
- Color: RGB masters — most shops convert to their press profile; ask for no color-profile
  surprises on the deep blacks / navy.
- Web previews of every piece: [`../exhibit/`](../exhibit/) (previews show the trim area).

> **Resolved 2026-07-05:** poster 1 now reads "Score 4+ trophies. Earn your rank card." and the
> web app completion banner awards the matching rank card from score 4 — the phone screen
> matches the physical handout.
