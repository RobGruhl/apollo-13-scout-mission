# Apollo Trail

An **Oregon Trail-style remake** of the Apollo 13 Interactive Experience — the same
10 real NASA decisions as the classic slide mission, played as a 1985 trail game.
Lives on branch `trail-game` as a deploy-ready **secret**: reachable only by
typing the direct URL — `apollo13.quest/trail/` — with deliberately no links
anywhere on the site. The only breadcrumbs are the privacy page's
"hidden retro mini-game" disclosure and the service-worker cache a curious
scout might inspect (both very much in the spirit of the exhibit). Share it
by word of mouth at the Apollo Table.

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

## Production wiring (done on this branch — deploys when merged to main)

- **Offline + freshness**: all 18 trail files are in the `sw.js` precache
  (`CACHE_VERSION` bumped to v10), and `trail.js` registers the service worker
  itself, so a scout who lands straight on `/trail/` still gets the offline
  download. Precaching also keeps trail updates atomic — the root-scoped
  cache-first SW would otherwise freeze trail files at first-visit versions.
  **Any future trail change needs a `CACHE_VERSION` bump**, same as the slides.
- **View census**: one anonymous `/ping/view/trail` per device, using the same
  `viewPings` queue as the classic pages (offline pings retry later).
- **Score census**: one anonymous `/ping/trail-completion/<score>` per new
  score per device (key `trailScorePinged`) — Cloudflare counts by path,
  exactly like the classic `/ping/completion/<score>`.
- **Privacy**: both beacons are disclosed on `privacy.html` (which now also
  hints that the hidden game exists — full-transparency rule kept).
- Before pushing: test on a real iPhone (Safari), run Lighthouse.

**Local dev note:** if you've opened a classic page on your local port, its
service worker is registered for the whole origin and will serve *stale trail
files* cache-first. When trail edits don't show up: DevTools → Application →
Service Workers → Unregister (or use a fresh port).

**One number beyond the slides:** the travel odometer peaks at 248,655 statute
miles from Earth near pericynthion — that's the documented Apollo 13 record
distance (Mission Report MSC-02680), included as an easter egg for the scout
who watches the odometer.
