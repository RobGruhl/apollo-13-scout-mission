# Apollo Trail

An **Oregon Trail-style remake** of the Apollo 13 Interactive Experience — the same
10 real NASA decisions as the classic slide mission, played as a 1985 trail game.
Built for local assessment on branch `trail-game`; **not deployed**.

Play locally (service worker not required for this page, but HTTP is):

```bash
python3 -m http.server 8000     # from the repo root
# → http://localhost:8000/trail/
```

## Style guide

**The Oregon Trail (MECC, Apple II, 1985)** — the canonical version people picture:

- Black screen, scene panel on the top half, teletype text + **numbered menus** below
- A status strip (date/weather/health/food → **GET clock / miles from Earth /
  PWR / H2O / CO2 / crew condition**)
- The rolling-wagon travel screen → the **CSM+LM stack coasting** across a
  starfield, Earth shrinking behind, Moon growing ahead (and swapping after
  pericynthion)
- The hunting minigame → the **PC+2 manual attitude hold** (the real crew
  hand-flew burns keeping the Earth in the window reticle) and the
  **CO2 mailbox build**
- Landmark panels → 14 scene panels in the Apple II hi-res palette
- "You have died of dysentery" → deliberately absent: wrong calls get
  **`HOUSTON OVERRIDES YOUR CALL`** and the mission continues, because the
  classic app's rule is generous hints, not punishment — and because the crew
  really did come home

## Same game underneath

Everything that counts is identical to the classic mission (see `assets/js/app.js`):

- Same 10 decisions, same correct answers (`CORRECT_ANSWERS`), locked on first tap
- Same rank thresholds and names: 10 Mission Commander 🏆 / 8–9 Flight Director ⭐ /
  6–7 Flight Controller 🎯 / 0–5 Ground Crew 📡
- Same physical rank-card call-outs at 4+ correct (tiers 4/6/8/10)
- Same "Sources for Skeptics" primary-source links on the end screen
- Decisions play in **true GET order** (slide 16's own timestamp puts comm power
  at ~GET 65, between the free-return burn and the sun check)

Gauges, travel and minigames are **flavor** — the score is only the 10 decisions.

Separate storage keys (`trailBestScore`, `trailSound`, session `trailRun`) so the
two games never touch each other's progress.

## Content provenance

`trail-data.js` is condensed from the fact-checked slides in `slides/` (extraction
done per-slide with the repo's content rules: real quotes only, exact GETs and
numbers, sources copied verbatim). If a fact looks wrong here, check the slide —
and if the slide disagrees, the slide wins.

## Sprite pipeline

Scene panels are **gpt-image-2 renders pixel-aligned into real pixel art**:

1. `tools/gen-scenes.js` / `tools/gen-scenes-extra.js` — prompt gpt-image-2 for
   "1985 Apple II Oregon Trail" panels (1536×1024, raw output in
   `working/trail-sprites/raw/`, gitignored)
2. `tools/pixelize.py` — downscale to the game's logical **240×160** with a BOX
   filter (averages each implied fake-pixel cell) and snap every pixel to an
   8-color Apple II-ish palette → 2–6 KB PNGs in `sprites/`
3. CSS scales them back up with `image-rendering: pixelated`

The travel-screen stack, Earth/Moon, starfield and burn reticle are drawn
procedurally in `trail.js` at integer pixel positions.

## If this ever goes to production (deliberately not done)

- Add `trail/` files to the `sw.js` precache list and bump `CACHE_VERSION`
- Link it from `index.html` (e.g. as a third mission mode)
- No analytics beacons here — if any are added, update `privacy.html` first
- Test on a real iPhone (Safari), run Lighthouse, re-check touch targets
