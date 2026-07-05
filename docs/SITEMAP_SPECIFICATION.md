# Apollo 13 Interactive Experience - Sitemap Specification

**Version**: 3.0
**Date**: 2026-07-05
**Purpose**: Standardized navigation structure and scoring system integration for all 36 pages (index + timeline + 34 slides: 30 mission pages + 4 merit badge resource pages, 10 scored decisions).

## Changelog

- **v3.0 (2026-07-05)** — Full regeneration after the chronology reorder. Slides were renumbered into true mission order (e.g., Freeze or Squeeze is now slide 04, Power Conservation is slide 05, CO2 Mailbox is slide 13), ~70 fact errors were fixed, and decisions were relabeled. Every entry below was re-derived from the current HTML/JS files. New in this version: Quick Mission mode, service worker offline precache, decision locking, running tracker score, QR score sharing, `bestScore` personal best, and the Apollo card rule (8+ of 10).
- **v2.x (through 2026-07-04)** — Assumed the **old slide order** (e.g., `02-freeze-squeeze.html`, `13-power-conservation.html`). Do not use v2.x slide numbers, filenames, or decision keys; the localStorage decision keys changed with the renumbering.

---

## Scoring System Overview

The experience tracks user decisions and compares them to NASA's historical choices. Decisions are keyed by **slide number** (the `data-slide-id` of the decision slide).

### Score-Impacting Pages (10 Decision Slides)

- **Slide 04**: Freeze or Squeeze (Correct: `squeeze`)
- **Slide 05**: Power Conservation (Correct: `shutdown`)
- **Slide 06**: Turn Around Decision (Correct: `freereturn`)
- **Slide 09**: Stars or Sun Navigation (Correct: `sunearth`)
- **Slide 11**: PC+2 Burn (Speed Up) (Correct: `burn`)
- **Slide 12**: Water Conservation (Correct: `extreme`)
- **Slide 13**: CO2 Mailbox (Correct: `buildmailbox`)
- **Slide 16**: Comm Power (Correct: `silence`)
- **Slide 17**: Battery Recharge (Correct: `jumpstart`)
- **Slide 18**: SM Jettison Timing (Correct: `early`)

### Score Display Pages

- **Slide 30** (`slides/30-completion.html`): score badge, rank, Apollo card banner, personal best line, comparison table, share form + QR code, replay button. Shows an **empty state** (no fake score) if none of the 10 decisions have been made.

### Score Sharing Pages

- **index.html**: dual mode:
  - **Default mode**: standard landing page with mission CTAs.
  - **Shared score mode**: celebration card when visited via a shared URL with hash parameters (`#name=...&troop=...&score=...&total=...&rank=...`). Default content is hidden; a "🚀 Start My Mission" button calls `startNewMission()`.

---

## Navigation Standards

### Standard Button Text Format

**Previous Button**: `← Previous`
**Next Button**: `Next →`
**Exception - Slide 01**: Previous is `← Home` (links to `../index.html`)
**Exception - Slide 30**: Next is `🏕️ Merit Badges →` (links to `31-merit-badges.html`)
**Exception - Slide 31**: Next is `🏠 Home` (links to `../index.html`)
**Exception - Slides 32-34**: Descriptive labels (`← Merit Badges Hub`, `Digital Technology →`, `← Programming`, `Space Exploration →`, `← Digital Technology`, `Merit Badges Hub →`)

### Link Structure

All pages except `index.html` include:

1. **Top Navigation Bar**:
   - `🏠 Home` → `../index.html` (or `index.html` from root pages)
   - `📅 Timeline` → `../timeline.html` (or `timeline.html` from root pages)
   - Progress indicator (`<span class="nav-progress">`)
2. **Footer Navigation** (slides only, class `slide-nav`):
   - Left: Previous button (`.btn-prev`)
   - Right: Next button (`.btn-next`)

`index.html` has no top nav bar and no slide footer nav.

### Progress Indicator Text

| Pages | Progress text |
|-------|---------------|
| `timeline.html` | `Mission Overview` |
| Slides 01–29 | `Slide N of 30` (hardcoded in HTML; `initProgressTracking()` in app.js also rewrites it to `Slide {slideId} of 30` for slide ids 1–29) |
| Slide 30 | `Mission Complete!` |
| Slide 31 | `Merit Badges` |
| Slide 32 | `Programming Merit Badge` |
| Slide 33 | `Digital Technology Merit Badge` |
| Slide 34 | `Space Exploration Merit Badge` |
| Quick Mission mode (chain slides only) | `⚡ Decision N of 10` (overrides the above at runtime) |

### Decision Tracker (top nav)

Slides 01–29 include `<div class="decision-tracker" id="decisionTracker">` with **10 badges**: `<span class="badge pending" data-decision="ID">⚪</span>` for IDs `4, 5, 6, 9, 11, 12, 13, 16, 17, 18`. Behavior (app.js `initDecisionTracker` / `updateDecisionTracker`):

- Hidden until the first decision is recorded, then `display: flex` on every slide.
- Badge states: `🏆` (`badge matched`) = matched NASA, `📊` (`badge different`) = different choice, `⚪` (`badge pending`) = not yet made.
- A running score span `#trackerScore` (`🏆 N/10`) is appended to the tracker, kept current from `calculateScore()`.

Slides 30–34, index, and timeline have **no** decision tracker.

### Keyboard Navigation

Arrow Left/Right click `.btn-prev`/`.btn-next` on any page that has them (`initKeyboardNav()` in app.js).

---

## Quick Mission Mode

For scouts at the jamboree table: just the 10 decisions (~10 minutes). Implemented in `assets/js/app.js` (`QUICK_CHAIN`, `initQuickMode()`).

**Chain** (verbatim from app.js):

```javascript
const QUICK_CHAIN = [
    '04-freeze-squeeze.html',
    '05-power-conservation.html',
    '06-turn-around.html',
    '09-stars-sun-navigation.html',
    '11-pc2-burn.html',
    '12-water-conservation.html',
    '13-co2-mailbox.html',
    '16-communication-discipline.html',
    '17-battery-jumpstart.html',
    '18-sm-jettison-timing.html',
    '30-completion.html'
];
```

**Entry**: any link with `?mode=quick` sets `sessionStorage.quickMode = '1'`. Entry point on `index.html`: `⚡ Quick Mission — 10 decisions` → `slides/04-freeze-squeeze.html?mode=quick`.

**Exit**:
- Any link with `?mode=full` removes the flag (index.html's `🚀 Full Mission` → `slides/01-launch.html?mode=full`).
- Reaching `30-completion.html` in quick mode clears the flag (mission over, back to full site).

**While active**, on chain slides only:
- `.btn-next` href is rewritten to the next chain entry; `.btn-prev` to the previous chain entry (first chain slide's Previous → `../index.html`).
- Progress text becomes `⚡ Decision N of 10`.
- Non-chain slides (reached via Home/Timeline links) keep their normal navigation; the quick-mode flag persists in sessionStorage until exit.

---

## Offline Support (Service Worker)

`sw.js` at the repo root; registered by `initOfflineCache()` in app.js (`sw.js` from root pages, `../sw.js` from `slides/`). Registration failure is silent — offline caching is a bonus, never a blocker.

- **Cache name**: `apollo13-v1` (`CACHE_VERSION`); old caches are deleted on `activate`.
- **Precache** (39 entries, installed on first visit): `index.html`, `timeline.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/js/qrcode.js`, and all 34 slide pages `slides/01-launch.html` … `slides/34-merit-badge-space-exploration.html`.
- **Fetch strategy**: same-origin GET only; cache-first with `{ ignoreSearch: true }` (so `?mode=quick` / `?mode=full` URLs hit the cached page); successful network responses (including images) are cached at runtime on first view.

---

## Complete Sitemap

### Landing Page
**File**: `index.html`
**Path**: `/index.html`
**Body class**: `landing` (no `data-slide-id`, no top nav bar)
**Scoring Role**: 🎯 **Score Sharing Landing Page**
- **Default Mode**: standard landing page (mission stats, overview, jamboree info, merit badge callout).
- **Shared Score Mode**: `getURLParams()` parses the URL hash; if `name`, `troop`, `score`, and `total` are all present, the celebration card (`#sharedScoreCard`) is shown and `#defaultLandingContent` is hidden. Rank emoji comes from `getScoreRank()` (app.js is the single source of truth for tiers).
- **URL Format**: `/#name=Scout&troop=Troop+123&score=8&total=10&rank=Flight+Director`

**Links**:
- Primary CTA: `🚀 Full Mission` → `slides/01-launch.html?mode=full`
- Secondary CTA: `⚡ Quick Mission — 10 decisions` → `slides/04-freeze-squeeze.html?mode=quick`
- Secondary CTA: `📅 View Timeline` → `timeline.html`
- Merit badges: `Learn more about earning merit badges with this project →` and footer link `🏕️ Earn merit badges with this project` → `slides/31-merit-badges.html`
- Footer: hidden reset button (`#resetButton`, 🔄) — confirms, then `localStorage.clear()` and reloads.

---

### Timeline Page
**File**: `timeline.html`
**Path**: `/timeline.html`
**Top Nav**: `🏠 Home` → `index.html` | `📅 Timeline` → `timeline.html` (highlighted) | Progress: `Mission Overview`

A `⚡ Quick Mission` callout box sits directly under the page title, linking to `slides/04-freeze-squeeze.html?mode=quick` ("just the 10 decisions, ~10 minutes").

Deep links are grouped by mission phase, in slide-number (chronological) order throughout. Decision labels #1–#10 match the slide badges and app.js exactly:

| Phase | Links (in on-page order) |
|-------|--------------------------|
| 🚀 Launch & Outbound Journey | 01-launch, 02-spacecraft |
| ⚡ The Crisis Begins | 03-explosion, 04-freeze-squeeze (*Decision #1*), 05-power-conservation (*Decision #2*), 06-turn-around (*Decision #3*), 07-explosion-cause, 08-meet-crew |
| 🛟 Lifeboat & Moon Flyby | 09-stars-sun-navigation (*Decision #4*), 10-lifeboat-moon, 11-pc2-burn (*Decision #5*) |
| ❄️ Survival Phase | 12-water-conservation (*Decision #6*), 13-co2-mailbox (*Decision #7*), 14-long-journey, 15-passive-thermal, 16-communication-discipline (*Decision #8*) |
| 🔧 Final Preparations | 17-battery-jumpstart (*Decision #9*), 18-sm-jettison-timing (*Decision #10*), 19-computer-restart, 20-reentry-prep, 21-lm-jettison |
| 🔥 Re-Entry & Splashdown | 22-reentry-physics, 23-the-blackout, 24-parachutes, 25-splashdown, 26-recovery |
| 🌟 The People Behind the Mission | 27-heroes, 28-john-aaron, 29-ed-gruhl, 30-completion (labeled "make your decisions first!") |

**Bottom CTAs**: `🚀 Start the Mission` → `slides/01-launch.html?mode=full`, `⚡ Quick Mission — 10 decisions` → `slides/04-freeze-squeeze.html?mode=quick`, `🏕️ Earn Merit Badges` → `slides/31-merit-badges.html`.
The merit badge detail pages (32–34) are not linked from the timeline — scouts reach them through the Merit Badges Hub (31).
**Footer**: no slide navigation.

---

### Slide 01: Launch & Mission Overview
**File**: `slides/01-launch.html`
**Title**: `Apollo 13 - Launch & Mission Overview` | **H1**: `Launch & Mission Overview`
**Type**: Narrative (badge: `Chapter 1: The Journey Begins`)
**Data ID**: `data-slide-id="1"`
**Top Nav**: `🏠 Home` → `../index.html` | `📅 Timeline` → `../timeline.html` | Progress: `Slide 1 of 30`
**Footer Nav**:
- Previous: `← Home` → `../index.html`
- Next: `Next →` → `02-spacecraft.html`

---

### Slide 02: Spacecraft Configuration
**File**: `slides/02-spacecraft.html`
**Title**: `Apollo 13 - Spacecraft Configuration` | **H1**: `Spacecraft Configuration`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="2"`
**Top Nav**: standard | Progress: `Slide 2 of 30`
**Footer Nav**:
- Previous: `← Previous` → `01-launch.html`
- Next: `Next →` → `03-explosion.html`

---

### Slide 03: The Explosion
**File**: `slides/03-explosion.html`
**Title**: `Apollo 13 - The Explosion` | **H1**: `The Explosion`
**Type**: Narrative (badge: `Chapter 2: Crisis`)
**Data ID**: `data-slide-id="3"`
**Top Nav**: standard | Progress: `Slide 3 of 30`
**Footer Nav**:
- Previous: `← Previous` → `02-spacecraft.html`
- Next: `Next →` → `04-freeze-squeeze.html`

---

### Slide 04: Freeze or Squeeze?
**File**: `slides/04-freeze-squeeze.html`
**Title**: `Apollo 13 - Decision: Freeze or Squeeze?` | **H1**: `Freeze or Squeeze?`
**Type**: Decision (badge: `🚨 Decision Point #1`)
**Data ID**: `data-slide-id="4"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (1 of 10)
- **Options**: `squeeze`, `freeze` — **Correct**: `squeeze` (move to the Lunar Module)
- **Tracked as**: `decisions['4']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 4 of 30`
**Footer Nav**:
- Previous: `← Previous` → `03-explosion.html`
- Next: `Next →` → `05-power-conservation.html`

---

### Slide 05: Shut Down the Command Module?
**File**: `slides/05-power-conservation.html`
**Title**: `Apollo 13 - Decision: Power Down the CM?` | **H1**: `Shut Down the Command Module?`
**Type**: Decision (badge: `🚨 Decision Point #2`)
**Data ID**: `data-slide-id="5"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (2 of 10)
- **Options**: `keeprunning`, `shutdown` — **Correct**: `shutdown` (preserve the CM batteries for re-entry)
- **Tracked as**: `decisions['5']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 5 of 30`
**Footer Nav**:
- Previous: `← Previous` → `04-freeze-squeeze.html`
- Next: `Next →` → `06-turn-around.html`

---

### Slide 06: Turn Around or Free-Return?
**File**: `slides/06-turn-around.html`
**Title**: `Apollo 13 - Decision: Turn Around or Free-Return?` | **H1**: `Turn Around or Free-Return?`
**Type**: Decision (badge: `🚨 Decision Point #3`)
**Data ID**: `data-slide-id="6"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (3 of 10)
- **Options**: `turnaround`, `freereturn` — **Correct**: `freereturn` (use the Moon's gravity)
- **Tracked as**: `decisions['6']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 6 of 30`
**Footer Nav**:
- Previous: `← Previous` → `05-power-conservation.html`
- Next: `Next →` → `07-explosion-cause.html`

---

### Slide 07: What Caused the Explosion?
**File**: `slides/07-explosion-cause.html`
**Title**: `Apollo 13 - What Caused the Explosion?` | **H1**: `What Caused the Explosion?`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="7"`
**Top Nav**: standard | Progress: `Slide 7 of 30`
**Footer Nav**:
- Previous: `← Previous` → `06-turn-around.html`
- Next: `Next →` → `08-meet-crew.html`

---

### Slide 08: Meet the Crew
**File**: `slides/08-meet-crew.html`
**Title**: `Apollo 13 - Meet the Crew` | **H1**: `Meet the Crew`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="8"`
**Top Nav**: standard | Progress: `Slide 8 of 30`
**Footer Nav**:
- Previous: `← Previous` → `07-explosion-cause.html`
- Next: `Next →` → `09-stars-sun-navigation.html`

---

### Slide 09: Stars or Sun/Earth Navigation?
**File**: `slides/09-stars-sun-navigation.html`
**Title**: `Apollo 13 - Decision: Stars or Sun Navigation?` | **H1**: `Stars or Sun/Earth Navigation?`
**Type**: Decision (badge: `🚨 Decision Point #4`)
**Data ID**: `data-slide-id="9"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (4 of 10)
- **Options**: `sunearth`, `stars` — **Correct**: `sunearth` (manual alignment on Sun/Earth terminator)
- **Tracked as**: `decisions['9']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 9 of 30`
**Footer Nav**:
- Previous: `← Previous` → `08-meet-crew.html`
- Next: `Next →` → `10-lifeboat-moon.html`

---

### Slide 10: Lifeboat & Moon Flyby
**File**: `slides/10-lifeboat-moon.html`
**Title**: `Apollo 13 - Lifeboat & Moon Flyby` | **H1**: `Lifeboat & Moon Flyby`
**Type**: Narrative (badge: `Chapter 3: Lifeboat`)
**Data ID**: `data-slide-id="10"`
**Top Nav**: standard | Progress: `Slide 10 of 30`
**Footer Nav**:
- Previous: `← Previous` → `09-stars-sun-navigation.html`
- Next: `Next →` → `11-pc2-burn.html`

---

### Slide 11: Speed Up or Coast?
**File**: `slides/11-pc2-burn.html`
**Title**: `Apollo 13 - Decision: Speed Up or Coast?` | **H1**: `Speed Up or Coast?`
**Type**: Decision (badge: `🚨 Decision Point #5`)
**Data ID**: `data-slide-id="11"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (5 of 10)
- **Options**: `burn`, `coast` — **Correct**: `burn` (perform the PC+2 burn to speed up the return)
- **Tracked as**: `decisions['11']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 11 of 30`
**Footer Nav**:
- Previous: `← Previous` → `10-lifeboat-moon.html`
- Next: `Next →` → `12-water-conservation.html`

---

### Slide 12: Water Conservation Strategy
**File**: `slides/12-water-conservation.html`
**Title**: `Apollo 13 - Decision: Water Conservation` | **H1**: `Water Conservation Strategy`
**Type**: Decision (badge: `🚨 Decision Point #6`)
**Data ID**: `data-slide-id="12"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (6 of 10)
- **Options**: `extreme`, `equal`, `drinking` (three options) — **Correct**: `extreme` (extreme rationing)
- **Tracked as**: `decisions['12']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 12 of 30`
**Footer Nav**:
- Previous: `← Previous` → `11-pc2-burn.html`
- Next: `Next →` → `13-co2-mailbox.html`

---

### Slide 13: Build the CO2 Mailbox?
**File**: `slides/13-co2-mailbox.html`
**Title**: `Apollo 13 - Decision: Build the Mailbox?` | **H1**: `Build the CO2 Mailbox?`
**Type**: Decision (badge: `🚨 Decision Point #7`)
**Data ID**: `data-slide-id="13"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (7 of 10)
- **Options**: `donothing`, `buildmailbox` — **Correct**: `buildmailbox` (improvise the scrubber adapter)
- **Tracked as**: `decisions['13']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 13 of 30`
**Footer Nav**:
- Previous: `← Previous` → `12-water-conservation.html`
- Next: `Next →` → `14-long-journey.html`

---

### Slide 14: The Long Cold Journey Home
**File**: `slides/14-long-journey.html`
**Title**: `Apollo 13 - The Long Cold Journey` | **H1**: `The Long Cold Journey Home`
**Type**: Narrative (badge: `Chapter 4: Endurance`)
**Data ID**: `data-slide-id="14"`
**Top Nav**: standard | Progress: `Slide 14 of 30`
**Footer Nav**:
- Previous: `← Previous` → `13-co2-mailbox.html`
- Next: `Next →` → `15-passive-thermal.html`

---

### Slide 15: Passive Thermal Control
**File**: `slides/15-passive-thermal.html`
**Title**: `Apollo 13 - Passive Thermal Control` | **H1**: `Passive Thermal Control`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="15"`
**Top Nav**: standard | Progress: `Slide 15 of 30`
**Footer Nav**:
- Previous: `← Previous` → `14-long-journey.html`
- Next: `Next →` → `16-communication-discipline.html`

---

### Slide 16: Comm Power: Loud or Lean?
**File**: `slides/16-communication-discipline.html`
**Title**: `Apollo 13 - Decision: Comm Power` | **H1**: `Comm Power: Loud or Lean?`
**Type**: Decision (badge: `🚨 Decision Point #8`)
**Data ID**: `data-slide-id="16"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (8 of 10)
- **Options**: `regular` (full-power comms), `silence` (low-power config) — **Correct**: `silence`
- **Tracked as**: `decisions['16']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 16 of 30`
**Footer Nav**:
- Previous: `← Previous` → `15-passive-thermal.html`
- Next: `Next →` → `17-battery-jumpstart.html`

---

### Slide 17: Recharge for Re-Entry?
**File**: `slides/17-battery-jumpstart.html`
**Title**: `Apollo 13 - Decision: Battery Jump-Start` | **H1**: `Recharge for Re-Entry?`
**Type**: Decision (badge: `🚨 Decision Point #9`)
**Data ID**: `data-slide-id="17"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (9 of 10)
- **Options**: `jumpstart` (LM-to-CM recharge, the GET 112 procedure), `reserve` (CM reserve batteries only) — **Correct**: `jumpstart`
- **Tracked as**: `decisions['17']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 17 of 30`
**Footer Nav**:
- Previous: `← Previous` → `16-communication-discipline.html`
- Next: `Next →` → `18-sm-jettison-timing.html`

---

### Slide 18: Service Module Jettison Timing
**File**: `slides/18-sm-jettison-timing.html`
**Title**: `Apollo 13 - Decision: SM Jettison Timing` | **H1**: `Service Module Jettison Timing`
**Type**: Decision (badge: `🚨 Decision Point #10`)
**Data ID**: `data-slide-id="18"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (10 of 10)
- **Options**: `late`, `early` — **Correct**: `early` (jettison early and photograph the damage)
- **Tracked as**: `decisions['18']`; locks on first tap; includes 📚 Sources for Skeptics block

**Top Nav**: standard | Progress: `Slide 18 of 30`
**Footer Nav**:
- Previous: `← Previous` → `17-battery-jumpstart.html`
- Next: `Next →` → `19-computer-restart.html`

---

### Slide 19: Restarting the Computer
**File**: `slides/19-computer-restart.html`
**Title**: `Apollo 13 - Computer Restart Challenge` | **H1**: `Restarting the Computer`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="19"`
**Top Nav**: standard | Progress: `Slide 19 of 30`
**Footer Nav**:
- Previous: `← Previous` → `18-sm-jettison-timing.html`
- Next: `Next →` → `20-reentry-prep.html`

---

### Slide 20: Preparing for Re-Entry
**File**: `slides/20-reentry-prep.html`
**Title**: `Apollo 13 - Re-Entry Preparation` | **H1**: `Preparing for Re-Entry`
**Type**: Narrative (badge: `Chapter 5: Final Countdown`)
**Data ID**: `data-slide-id="20"`
**Top Nav**: standard | Progress: `Slide 20 of 30`
**Footer Nav**:
- Previous: `← Previous` → `19-computer-restart.html`
- Next: `Next →` → `21-lm-jettison.html`

---

### Slide 21: Saying Goodbye to Aquarius
**File**: `slides/21-lm-jettison.html`
**Title**: `Apollo 13 - LM Jettison: Farewell Aquarius` | **H1**: `Saying Goodbye to Aquarius`
**Type**: Narrative (badge: `Chapter 5: Farewell`)
**Data ID**: `data-slide-id="21"`
**Top Nav**: standard | Progress: `Slide 21 of 30`
**Footer Nav**:
- Previous: `← Previous` → `20-reentry-prep.html`
- Next: `Next →` → `22-reentry-physics.html`

---

### Slide 22: Re-Entry Corridor Physics
**File**: `slides/22-reentry-physics.html`
**Title**: `Apollo 13 - Re-Entry Corridor Physics` | **H1**: `Re-Entry Corridor Physics`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="22"`
**Top Nav**: standard | Progress: `Slide 22 of 30`
**Footer Nav**:
- Previous: `← Previous` → `21-lm-jettison.html`
- Next: `Next →` → `23-the-blackout.html`

---

### Slide 23: The Re-Entry Blackout
**File**: `slides/23-the-blackout.html`
**Title**: `Apollo 13 - The Re-Entry Blackout` | **H1**: `The Re-Entry Blackout`
**Type**: Narrative (badge: `Chapter 6: The Silence`)
**Data ID**: `data-slide-id="23"`
**Top Nav**: standard | Progress: `Slide 23 of 30`
**Footer Nav**:
- Previous: `← Previous` → `22-reentry-physics.html`
- Next: `Next →` → `24-parachutes.html`

---

### Slide 24: Parachute Deployment
**File**: `slides/24-parachutes.html`
**Title**: `Apollo 13 - Parachute Deployment` | **H1**: `Parachute Deployment`
**Type**: Narrative (badge: `Chapter 6: Final Moments`)
**Data ID**: `data-slide-id="24"`
**Top Nav**: standard | Progress: `Slide 24 of 30`
**Footer Nav**:
- Previous: `← Previous` → `23-the-blackout.html`
- Next: `Next →` → `25-splashdown.html`

---

### Slide 25: Splashdown
**File**: `slides/25-splashdown.html`
**Title**: `Apollo 13 - Splashdown` | **H1**: `Splashdown`
**Type**: Narrative (badge: `Chapter 6: Home`)
**Data ID**: `data-slide-id="25"`
**Top Nav**: standard | Progress: `Slide 25 of 30`
**Footer Nav**:
- Previous: `← Previous` → `24-parachutes.html`
- Next: `Next →` → `26-recovery.html`

---

### Slide 26: Recovery Operations
**File**: `slides/26-recovery.html`
**Title**: `Apollo 13 - Recovery Operations` | **H1**: `Recovery Operations`
**Type**: Narrative (badge: `Chapter 6: Home`)
**Data ID**: `data-slide-id="26"`
**Top Nav**: standard | Progress: `Slide 26 of 30`
**Footer Nav**:
- Previous: `← Previous` → `25-splashdown.html`
- Next: `Next →` → `27-heroes.html`

---

### Slide 27: The Unsung Heroes
**File**: `slides/27-heroes.html`
**Title**: `Apollo 13 - The Unsung Heroes` | **H1**: `The Unsung Heroes`
**Type**: Info (badge: `Background Information`)
**Data ID**: `data-slide-id="27"`
**Top Nav**: standard | Progress: `Slide 27 of 30`
**Footer Nav**:
- Previous: `← Previous` → `26-recovery.html`
- Next: `Next →` → `28-john-aaron.html`

---

### Slide 28: John Aaron: Steely-Eyed Missile Man
**File**: `slides/28-john-aaron.html`
**Title**: `Apollo 13 - John Aaron: Steely-Eyed Missile Man` | **H1**: `John Aaron: Steely-Eyed Missile Man`
**Type**: Info (badge: `Mission Control Hero`)
**Data ID**: `data-slide-id="28"`
**Top Nav**: standard | Progress: `Slide 28 of 30`
**Footer Nav**:
- Previous: `← Previous` → `27-heroes.html`
- Next: `Next →` → `29-ed-gruhl.html`

---

### Slide 29: The Engineer at Your Table (Ed Gruhl)
**File**: `slides/29-ed-gruhl.html`
**Title**: `Apollo 13 - Meet Your Presenter` | **H1**: `The Engineer at Your Table`
**Type**: Presenter (badge: `Meet Your Presenter`)
**Data ID**: `data-slide-id="29"`
**Top Nav**: standard | Progress: `Slide 29 of 30`
**Footer Nav**:
- Previous: `← Previous` → `28-john-aaron.html`
- Next: `Next →` → `30-completion.html`

---

### Slide 30: Mission Complete (A Successful Failure)
**File**: `slides/30-completion.html`
**Title**: `Apollo 13 - Mission Complete!` | **H1**: `A Successful Failure`
**Type**: Completion (badge: `🎉 Mission Complete`)
**Data ID**: `data-slide-id="30"`
**Scoring Role**: 🏆 **Score Display & Sharing Page**
- **Empty state**: if none of the 10 decision keys (`4, 5, 6, 9, 11, 12, 13, 16, 17, 18`) are in localStorage, shows "You haven't made your decisions yet" with CTAs `▶️ Make Your First Decision` → `04-freeze-squeeze.html` and `🏠 Mission Home` → `../index.html` (page is deep-linkable from the timeline).
- **Score badge**: rank emoji, rank title, `correct/total`, message, rank-colored gradient (all from `calculateScore()` / `getScoreRank()`).
- **Personal best**: `Best so far: N/10` line shown only when stored `bestScore` exceeds the current run.
- **🎖️ Apollo card banner**: `correct >= 8` → "You earned the Apollo card!" (show screen at the Apollo Table in the NASA Tent); otherwise "Go for the Apollo card!" — match NASA on **8 of 10** calls, with a replay nudge.
- **Replay**: `🔁 Fly the Mission Again` button (`flyAgain()`): saves `bestScore = max(current, stored)`, clears `decisions` + `visitedSlides`, clears the URL hash, redirects to `01-launch.html`. (Defined locally because app.js's `startNewMission()` hardcodes `slides/01-launch.html`, which 404s from inside `slides/`.)
- **Comparison table**: your choice vs NASA's for all 10 decisions, human-readable labels via the page's `formatChoice()` map, ✅/❌ per row.
- **Share**: name + troop form → `generateShareURL()` link, `📋 Copy Link` (clipboard API with select-text fallback), and a **QR code** of the link rendered by the vendored `assets/js/qrcode.js` (`qrcode(0, 'M')`, `createImgTag(4, 8)`); QR failure is silent — the copyable link still works.
- Quick Mission mode ends here (sessionStorage flag cleared).

**Top Nav**: standard | Progress: `Mission Complete!` (no decision tracker)
**Footer Nav**:
- Previous: `← Previous` → `29-ed-gruhl.html`
- Next: `🏕️ Merit Badges →` → `31-merit-badges.html`

---

### Slide 31: Merit Badges Hub
**File**: `slides/31-merit-badges.html`
**Title**: `Apollo 13 - Earn Merit Badges!` | **H1**: `Earn Merit Badges with This Project!`
**Type**: Merit Badge (badge: `🏕️ For Scouts`)
**Data ID**: `data-slide-id="31"`
**Purpose**: hub page explaining how the open-source project (MIT) counts toward Programming, Digital Technology, and Space Exploration merit badges; links to detail pages 32-34 and the GitHub repository.

**Top Nav**: standard | Progress: `Merit Badges` (no decision tracker)
**Footer Nav**:
- Previous: `← Previous` → `30-completion.html`
- Next: `🏠 Home` → `../index.html`

---

### Slide 32: Programming Merit Badge Guide
**File**: `slides/32-merit-badge-programming.html`
**Title**: `Apollo 13 - Programming Merit Badge Guide` | **H1**: `Programming Merit Badge`
**Type**: Merit Badge (badge: `💻 Merit Badge Guide`)
**Data ID**: `data-slide-id="32"`
**Top Nav**: standard | Progress: `Programming Merit Badge`
**Footer Nav**:
- Previous: `← Merit Badges Hub` → `31-merit-badges.html`
- Next: `Digital Technology →` → `33-merit-badge-digital-technology.html`

---

### Slide 33: Digital Technology Merit Badge Guide
**File**: `slides/33-merit-badge-digital-technology.html`
**Title**: `Apollo 13 - Digital Technology Merit Badge Guide` | **H1**: `Digital Technology Merit Badge`
**Type**: Merit Badge (badge: `🌐 Merit Badge Guide`)
**Data ID**: `data-slide-id="33"`
**Top Nav**: standard | Progress: `Digital Technology Merit Badge`
**Footer Nav**:
- Previous: `← Programming` → `32-merit-badge-programming.html`
- Next: `Space Exploration →` → `34-merit-badge-space-exploration.html`

---

### Slide 34: Space Exploration Merit Badge Guide
**File**: `slides/34-merit-badge-space-exploration.html`
**Title**: `Apollo 13 - Space Exploration Merit Badge Guide` | **H1**: `Space Exploration Merit Badge`
**Type**: Merit Badge (badge: `🚀 Merit Badge Guide`)
**Data ID**: `data-slide-id="34"`
**Top Nav**: standard | Progress: `Space Exploration Merit Badge`
**Footer Nav**:
- Previous: `← Digital Technology` → `33-merit-badge-digital-technology.html`
- Next: `Merit Badges Hub →` → `31-merit-badges.html`

---

## Deep Link Summary

1. **Timeline Page**: phase-grouped links to slides 01-30 (see table above); 32-34 reached only via the Merit Badges Hub.
2. **Sequential Navigation**: Previous/Next follows slide order 01 → 02 → … → 30, then `🏕️ Merit Badges →` to 31; 31 → Home; 32 → 33 → 34 → back to 31.
3. **Quick Mission chain**: 04 → 05 → 06 → 09 → 11 → 12 → 13 → 16 → 17 → 18 → 30 (rewritten at runtime; see Quick Mission Mode).
4. **Top Navigation**: Home and Timeline available from every page except `index.html`.
5. **Merit Badges Hub (31)**: linked from index.html (2 places), slide 30, timeline bottom CTA.

---

## Navigation Validation Checklist

For each page, verify:
- [ ] Top nav links are correct (`../index.html`, `../timeline.html` from slides; no `../` from root pages)
- [ ] Progress indicator matches the table in "Progress Indicator Text"
- [ ] Previous button links to the correct slide with standard text
- [ ] Next button links to the correct slide with standard text
- [ ] `data-slide-id` matches the filename's slide number
- [ ] Decision slides: `data-option` values match `CORRECT_ANSWERS` keys/values in app.js
- [ ] New/renamed slides are added to `PRECACHE` in `sw.js` (and decision slides to `QUICK_CHAIN` in app.js)
- [ ] `./scripts/verify-navigation.sh` and `./scripts/verify-button-text.sh` pass

---

## Scoring System Quick Reference

### CORRECT_ANSWERS (verbatim from `assets/js/app.js`)

```javascript
// Correct NASA decisions (10 total)
const CORRECT_ANSWERS = {
    '4': 'squeeze',           // Decision #1: Freeze or Squeeze → SQUEEZE (move to LM)
    '5': 'shutdown',          // Decision #2: CM Power → SHUTDOWN (preserve batteries)
    '6': 'freereturn',        // Decision #3: Turn Around → FREE-RETURN (use Moon's gravity)
    '9': 'sunearth',          // Decision #4: Navigation → SUN/EARTH (manual alignment)
    '11': 'burn',             // Decision #5: PC+2 Burn → PERFORM BURN (speed up return)
    '12': 'extreme',          // Decision #6: Water Conservation → EXTREME RATIONING
    '13': 'buildmailbox',     // Decision #7: CO2 Mailbox → BUILD (improvise adapter)
    '16': 'silence',          // Decision #8: Comm Power → LOW-POWER CONFIG
    '17': 'jumpstart',        // Decision #9: Battery Recharge → ATTEMPT LM-TO-CM CHARGE
    '18': 'early'             // Decision #10: SM Jettison → EARLY JETTISON (photograph damage)
};
```

### Decision Slides (Score Impact)

| # | Slide | File | Decision Name (`DECISION_NAMES`) | Options (`data-option`) | Correct |
|---|-------|------|----------------------------------|-------------------------|---------|
| 1 | 04 | `04-freeze-squeeze.html` | Freeze or Squeeze | `squeeze`, `freeze` | `squeeze` |
| 2 | 05 | `05-power-conservation.html` | Power Conservation | `keeprunning`, `shutdown` | `shutdown` |
| 3 | 06 | `06-turn-around.html` | Turn Around Decision | `turnaround`, `freereturn` | `freereturn` |
| 4 | 09 | `09-stars-sun-navigation.html` | Stars or Sun Navigation | `sunearth`, `stars` | `sunearth` |
| 5 | 11 | `11-pc2-burn.html` | PC+2 Burn (Speed Up) | `burn`, `coast` | `burn` |
| 6 | 12 | `12-water-conservation.html` | Water Conservation | `extreme`, `equal`, `drinking` | `extreme` |
| 7 | 13 | `13-co2-mailbox.html` | CO2 Mailbox | `donothing`, `buildmailbox` | `buildmailbox` |
| 8 | 16 | `16-communication-discipline.html` | Comm Power | `regular`, `silence` | `silence` |
| 9 | 17 | `17-battery-jumpstart.html` | Battery Recharge | `jumpstart`, `reserve` | `jumpstart` |
| 10 | 18 | `18-sm-jettison-timing.html` | SM Jettison Timing | `late`, `early` | `early` |

Each decision is worth 1 point (10% of the total).

### Score Ranks (from `getScoreRank()` in app.js)

| Percentage | Score (of 10) | Rank | Emoji | Color |
|------------|---------------|------|-------|-------|
| 100% | 10 | Mission Commander | 🏆 | `#FFD700` (Gold) |
| ≥ 80% | 8-9 | Flight Director | ⭐ | `#C0C0C0` (Silver) |
| ≥ 60% | 6-7 | Flight Controller | 🎯 | `#CD7F32` (Bronze) |
| < 60% | 0-5 | Ground Crew | 📡 | `#666666` (Gray) |

### 🎖️ Apollo Card Rule

The physical Apollo reward card is earned at **8 or more correct decisions out of 10** (Flight Director or better). Implemented on `slides/30-completion.html` (`if (correct >= 8)` → `.card-banner.earned`, else `.card-banner.tryagain` telling the scout to match NASA on 8 of 10). Scouts show the earned banner at the Apollo Table in the NASA Tent to pick up the card.

> ⚠️ Known discrepancy: the printed poster masters say "Score 5+". The app awards at 8+ (decided 2026-07-05); see `exhibit/README.md` for the reprint/briefing plan.

### Decision Locking

Decisions lock in on the **first tap** (`initDecisions()` / `lockDecision()` in app.js):
- All `.btn-choose` buttons are disabled; the chosen option gets `.selected` and its button reads `✅ Your Call — Locked In`.
- The `#result` section is revealed and `#alignmentIndicator` shows `✅ Your choice matches NASA!` or `⚠️ NASA chose differently` (with a pointer to the 📚 Sources for Skeptics block).
- On revisit, the locked state and alignment feedback are restored from localStorage. There are no do-overs short of a full reset/replay.

### Score-Related Pages

| Page | Role | Functionality |
|------|------|---------------|
| **index.html** | Score Sharing Landing | Dual mode: default landing OR celebration card for shared scores; hidden full-reset button |
| **slides/30-completion.html** | Score Display & Generation | Score, rank, Apollo card banner, best score, comparison table, share link + QR, replay |

### Storage Keys

**localStorage** (persists across sessions):

| Key | Data Type | Purpose |
|-----|-----------|---------|
| `decisions` | Object | User choices: `{slideId: {choice, timestamp}}` — keys are `'4'`, `'5'`, `'6'`, `'9'`, `'11'`, `'12'`, `'13'`, `'16'`, `'17'`, `'18'` |
| `visitedSlides` | Array | Progress: `["1", "2", "3", ...]` (slide ids as strings) |
| `bestScore` | String (number) | Personal best across replays; written by `flyAgain()` on the completion page before clearing progress |

**sessionStorage** (per browser tab):

| Key | Purpose |
|-----|---------|
| `quickMode` | `'1'` while Quick Mission mode is active |
| `previousPage` | Last page pathname, set on internal link clicks |

### Shared URL Format (from `generateShareURL()` in app.js)

```
https://apollo13.quest/#name=Scout&troop=Troop+123&score=8&total=10&rank=Flight+Director
```

- Base URL = `location.origin` + `location.pathname` with the `slides/...` suffix stripped; parameters are appended after `#` via `URLSearchParams` (spaces encode as `+`).
- **Parameters**: `name` (scout name), `troop` (troop number/name), `score` (correct decisions, 0-10), `total` (always 10), `rank` (rank title).
- `getURLParams()` on index.html requires `name`, `troop`, `score`, and `total`; `rank` is optional. The rank emoji is recomputed from `getScoreRank(score, total)`.
- On the completion page the same URL is also rendered as a QR code (vendored `assets/js/qrcode.js`, Kazuhiko Arase, MIT) so scouts can share phone-to-phone.

---

## Known Discrepancies (as of 2026-07-05)

1. **Poster threshold.** Printed poster masters say the Apollo card is earned at "5+"; the app awards it at 8+. Documented in `exhibit/README.md`.

(Resolved 2026-07-05: timeline decision numbering now matches slide badges; chapter badges renumbered sequentially 1–9; `startNewMission()` is now path-aware and safe from any page.)

---

**End of Sitemap Specification**
