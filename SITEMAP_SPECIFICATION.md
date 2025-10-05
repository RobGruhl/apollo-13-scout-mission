# Apollo 13 Interactive Experience - Sitemap Specification

**Version**: 2.0
**Date**: 2025-10-04
**Purpose**: Standardized navigation structure and scoring system integration for all pages (Updated for 29 slides, 10 decisions)

---

## Scoring System Overview

The Apollo 13 Interactive Experience includes a scoring system that tracks user decisions and compares them to NASA's historical choices. This sitemap identifies which pages affect scoring and which display score results.

### Score-Impacting Pages (10 Decision Slides)
- **Slide 02**: Freeze or Squeeze (Correct: `squeeze`)
- **Slide 05**: Turn Around Decision (Correct: `freereturn`)
- **Slide 06**: PC+2 Burn (Speed Up) (Correct: `burn`)
- **Slide 10**: CO2 Mailbox (Correct: `buildmailbox`)
- **Slide 11**: Stars or Sun Navigation (Correct: `sunearth`)
- **Slide 13**: Power Conservation (Correct: `shutdown`)
- **Slide 14**: Water Conservation (Correct: `extreme`)
- **Slide 15**: Communication Discipline (Correct: `silence`)
- **Slide 17**: Battery Jump-Start (Correct: `jumpstart`)
- **Slide 18**: SM Jettison Timing (Correct: `early`)

### Score Display Pages
- **Slide 29**: Completion page (shows score badge, rank, comparison table, share form)

### Score Sharing Pages
- **index.html**: Landing page with dual mode:
  - **Default mode**: Standard landing page with "Start Mission" CTA
  - **Shared score mode**: Displays celebration card when visited via shared URL with hash parameters (`#name=...&troop=...&score=...&total=...&rank=...`)

---

## Navigation Standards

### Standard Button Text Format

**Previous Button**: `← Previous`
**Next Button**: `Next →`
**Exception - Slide 01**: `← Home` (links to index.html)
**Exception - Slide 29**: `🏠 Home` (links to index.html)

### Link Structure

All pages include:
1. **Top Navigation Bar** (consistent across all pages):
   - `🏠 Home` → `../index.html` (or `index.html` for root pages)
   - `📅 Timeline` → `../timeline.html` (or `timeline.html` for root pages)
   - Progress indicator (e.g., "Slide 5 of 29" or "Mission Complete!")

2. **Footer Navigation** (bottom of page):
   - Left: Previous button
   - Right: Next button

---

## Complete Sitemap

### Landing Page
**File**: `index.html`
**Path**: `/index.html`
**Scoring Role**: 🎯 **Score Sharing Landing Page**
- **Default Mode**: Standard landing page for new users
- **Shared Score Mode**: Displays celebration card when URL contains score parameters
- **URL Format**: `/#name=Scout&troop=Troop%20123&score=3&total=4&rank=Flight%20Director`
- **Functionality**: Parses hash parameters to display another scout's achievement and challenge visitors to match or beat their score

**Links**:
- Top Nav: N/A (no nav bar on landing page)
- Primary CTA: `🚀 Start Mission` → `slides/01-launch.html`
- Secondary CTA: `📅 View Timeline` → `timeline.html`
- Footer: No slide navigation

---

### Timeline Page
**File**: `timeline.html`
**Path**: `/timeline.html`
**Top Nav**:
- `🏠 Home` → `index.html`
**Links** (deep links to all slides):
- Slide 01: Launch → `slides/01-launch.html`
- Slide 02: Freeze or Squeeze → `slides/02-freeze-squeeze.html`
- Slide 03: Spacecraft → `slides/03-spacecraft.html`
- Slide 04: Explosion → `slides/04-explosion.html`
- Slide 05: Turn Around → `slides/05-turn-around.html`
- Slide 06: PC+2 Burn → `slides/06-pc2-burn.html`
- Slide 07: Meet Crew → `slides/07-meet-crew.html`
- Slide 08: Explosion Cause → `slides/08-explosion-cause.html`
- Slide 09: Lifeboat Moon → `slides/09-lifeboat-moon.html`
- Slide 10: CO2 Mailbox → `slides/10-co2-mailbox.html`
- Slide 11: Stars or Sun Navigation → `slides/11-stars-sun-navigation.html`
- Slide 12: Long Journey → `slides/12-long-journey.html`
- Slide 13: Power Conservation → `slides/13-power-conservation.html`
- Slide 14: Water Conservation → `slides/14-water-conservation.html`
- Slide 15: Communication Discipline → `slides/15-communication-discipline.html`
- Slide 16: Passive Thermal → `slides/16-passive-thermal.html`
- Slide 17: Battery Jump-Start → `slides/17-battery-jumpstart.html`
- Slide 18: SM Jettison Timing → `slides/18-sm-jettison-timing.html`
- Slide 19: Service Module Jettison → `slides/19-service-module-jettison.html`
- Slide 20: LM Jettison → `slides/20-lm-jettison.html`
- Slide 21: Computer Restart → `slides/21-computer-restart.html`
- Slide 22: The Blackout → `slides/22-the-blackout.html`
- Slide 23: Parachutes → `slides/23-parachutes.html`
- Slide 24: Recovery → `slides/24-recovery.html`
- Slide 25: Heroes → `slides/25-heroes.html`
- Slide 26: John Aaron → `slides/26-john-aaron.html`
- Slide 27: Reentry Physics → `slides/27-reentry-physics.html`
- Slide 28: Splashdown → `slides/28-splashdown.html`
- Slide 29: Completion → `slides/29-completion.html`
**Footer**: No slide navigation

---

### Slide 01: Launch & Mission Overview
**File**: `slides/01-launch.html`
**Type**: Narrative
**Data ID**: `data-slide-id="1"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 1 of 29`
**Footer Nav**:
- Previous: `← Home` → `../index.html`
- Next: `Next →` → `02-freeze-squeeze.html`

---

### Slide 02: Freeze or Squeeze?
**File**: `slides/02-freeze-squeeze.html`
**Type**: Decision
**Data ID**: `data-slide-id="2"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (1 of 10)
- **Correct Answer**: `squeeze` (Move to Lunar Module)
- **Decision Tracked**: User choice saved to localStorage as `decisions['2']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 2 of 29`
**Footer Nav**:
- Previous: `← Previous` → `01-launch.html`
- Next: `Next →` → `03-spacecraft.html`

---

### Slide 03: Spacecraft Configuration
**File**: `slides/03-spacecraft.html`
**Type**: Info
**Data ID**: `data-slide-id="3"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 3 of 29`
**Footer Nav**:
- Previous: `← Previous` → `02-freeze-squeeze.html`
- Next: `Next →` → `04-explosion.html`

---

### Slide 04: The Explosion
**File**: `slides/04-explosion.html`
**Type**: Narrative
**Data ID**: `data-slide-id="4"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 4 of 29`
**Footer Nav**:
- Previous: `← Previous` → `03-spacecraft.html`
- Next: `Next →` → `05-turn-around.html`

---

### Slide 05: Turn Around Decision
**File**: `slides/05-turn-around.html`
**Type**: Decision
**Data ID**: `data-slide-id="5"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (2 of 10)
- **Correct Answer**: `freereturn` (Free-Return Trajectory using Moon's gravity)
- **Decision Tracked**: User choice saved to localStorage as `decisions['5']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 5 of 29`
**Footer Nav**:
- Previous: `← Previous` → `04-explosion.html`
- Next: `Next →` → `06-pc2-burn.html`

---

### Slide 06: PC+2 Burn (Speed Up)
**File**: `slides/06-pc2-burn.html`
**Type**: Decision
**Data ID**: `data-slide-id="6"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (3 of 10)
- **Correct Answer**: `burn` (Execute PC+2 burn to speed up return)
- **Decision Tracked**: User choice saved to localStorage as `decisions['6']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 6 of 29`
**Footer Nav**:
- Previous: `← Previous` → `05-turn-around.html`
- Next: `Next →` → `07-meet-crew.html`

---

### Slide 07: Meet the Crew
**File**: `slides/07-meet-crew.html`
**Type**: Info
**Data ID**: `data-slide-id="7"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 7 of 29`
**Footer Nav**:
- Previous: `← Previous` → `06-pc2-burn.html`
- Next: `Next →` → `08-explosion-cause.html`

---

### Slide 08: Explosion Cause
**File**: `slides/08-explosion-cause.html`
**Type**: Info
**Data ID**: `data-slide-id="8"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 8 of 29`
**Footer Nav**:
- Previous: `← Previous` → `07-meet-crew.html`
- Next: `Next →` → `09-lifeboat-moon.html`

---

### Slide 09: Lifeboat to the Moon
**File**: `slides/09-lifeboat-moon.html`
**Type**: Narrative
**Data ID**: `data-slide-id="9"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 9 of 29`
**Footer Nav**:
- Previous: `← Previous` → `08-explosion-cause.html`
- Next: `Next →` → `10-co2-mailbox.html`

---

### Slide 10: CO2 Mailbox Decision
**File**: `slides/10-co2-mailbox.html`
**Type**: Decision
**Data ID**: `data-slide-id="10"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (4 of 10)
- **Correct Answer**: `buildmailbox` (Build improvised CO2 scrubber adapter)
- **Decision Tracked**: User choice saved to localStorage as `decisions['10']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 10 of 29`
**Footer Nav**:
- Previous: `← Previous` → `09-lifeboat-moon.html`
- Next: `Next →` → `11-stars-sun-navigation.html`

---

### Slide 11: Stars or Sun Navigation
**File**: `slides/11-stars-sun-navigation.html`
**Type**: Decision
**Data ID**: `data-slide-id="11"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (5 of 10)
- **Correct Answer**: `sunearth` (Use Sun and Earth for navigation)
- **Decision Tracked**: User choice saved to localStorage as `decisions['11']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 11 of 29`
**Footer Nav**:
- Previous: `← Previous` → `10-co2-mailbox.html`
- Next: `Next →` → `12-long-journey.html`

---

### Slide 12: The Long Journey Home
**File**: `slides/12-long-journey.html`
**Type**: Narrative
**Data ID**: `data-slide-id="12"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 12 of 29`
**Footer Nav**:
- Previous: `← Previous` → `11-stars-sun-navigation.html`
- Next: `Next →` → `13-power-conservation.html`

---

### Slide 13: Power Conservation Decision
**File**: `slides/13-power-conservation.html`
**Type**: Decision
**Data ID**: `data-slide-id="13"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (6 of 10)
- **Correct Answer**: `shutdown` (Shutdown Command Module to preserve batteries)
- **Decision Tracked**: User choice saved to localStorage as `decisions['13']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 13 of 29`
**Footer Nav**:
- Previous: `← Previous` → `12-long-journey.html`
- Next: `Next →` → `14-water-conservation.html`

---

### Slide 14: Water Conservation Decision
**File**: `slides/14-water-conservation.html`
**Type**: Decision
**Data ID**: `data-slide-id="14"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (7 of 10)
- **Correct Answer**: `extreme` (Extreme water rationing - 6 ounces per day)
- **Decision Tracked**: User choice saved to localStorage as `decisions['14']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 14 of 29`
**Footer Nav**:
- Previous: `← Previous` → `13-power-conservation.html`
- Next: `Next →` → `15-communication-discipline.html`

---

### Slide 15: Communication Discipline Decision
**File**: `slides/15-communication-discipline.html`
**Type**: Decision
**Data ID**: `data-slide-id="15"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (8 of 10)
- **Correct Answer**: `silence` (Radio silence to conserve power)
- **Decision Tracked**: User choice saved to localStorage as `decisions['15']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 15 of 29`
**Footer Nav**:
- Previous: `← Previous` → `14-water-conservation.html`
- Next: `Next →` → `16-passive-thermal.html`

---

### Slide 16: Passive Thermal Control
**File**: `slides/16-passive-thermal.html`
**Type**: Info
**Data ID**: `data-slide-id="16"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 16 of 29`
**Footer Nav**:
- Previous: `← Previous` → `15-communication-discipline.html`
- Next: `Next →` → `17-battery-jumpstart.html`

---

### Slide 17: Battery Jump-Start Decision
**File**: `slides/17-battery-jumpstart.html`
**Type**: Decision
**Data ID**: `data-slide-id="17"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (9 of 10)
- **Correct Answer**: `jumpstart` (Use LM power to jump-start Command Module)
- **Decision Tracked**: User choice saved to localStorage as `decisions['17']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 17 of 29`
**Footer Nav**:
- Previous: `← Previous` → `16-passive-thermal.html`
- Next: `Next →` → `18-sm-jettison-timing.html`

---

### Slide 18: SM Jettison Timing Decision
**File**: `slides/18-sm-jettison-timing.html`
**Type**: Decision
**Data ID**: `data-slide-id="18"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (10 of 10)
- **Correct Answer**: `early` (Jettison early to photograph damage)
- **Decision Tracked**: User choice saved to localStorage as `decisions['18']`
- **Score Weight**: 10% of total score (1 of 10 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 18 of 29`
**Footer Nav**:
- Previous: `← Previous` → `17-battery-jumpstart.html`
- Next: `Next →` → `19-service-module-jettison.html`

---

### Slide 19: Service Module Jettison
**File**: `slides/19-service-module-jettison.html`
**Type**: Narrative
**Data ID**: `data-slide-id="19"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 19 of 29`
**Footer Nav**:
- Previous: `← Previous` → `18-sm-jettison-timing.html`
- Next: `Next →` → `20-lm-jettison.html`

---

### Slide 20: Lunar Module Jettison
**File**: `slides/20-lm-jettison.html`
**Type**: Narrative
**Data ID**: `data-slide-id="20"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 20 of 29`
**Footer Nav**:
- Previous: `← Previous` → `19-service-module-jettison.html`
- Next: `Next →` → `21-computer-restart.html`

---

### Slide 21: Computer Restart
**File**: `slides/21-computer-restart.html`
**Type**: Info
**Data ID**: `data-slide-id="21"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 21 of 29`
**Footer Nav**:
- Previous: `← Previous` → `20-lm-jettison.html`
- Next: `Next →` → `22-the-blackout.html`

---

### Slide 22: The Blackout
**File**: `slides/22-the-blackout.html`
**Type**: Narrative
**Data ID**: `data-slide-id="22"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 22 of 29`
**Footer Nav**:
- Previous: `← Previous` → `21-computer-restart.html`
- Next: `Next →` → `23-parachutes.html`

---

### Slide 23: Parachutes Deploy
**File**: `slides/23-parachutes.html`
**Type**: Narrative
**Data ID**: `data-slide-id="23"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 23 of 29`
**Footer Nav**:
- Previous: `← Previous` → `22-the-blackout.html`
- Next: `Next →` → `24-recovery.html`

---

### Slide 24: Recovery Operations
**File**: `slides/24-recovery.html`
**Type**: Narrative
**Data ID**: `data-slide-id="24"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 24 of 29`
**Footer Nav**:
- Previous: `← Previous` → `23-parachutes.html`
- Next: `Next →` → `25-heroes.html`

---

### Slide 25: Heroes Return
**File**: `slides/25-heroes.html`
**Type**: Narrative
**Data ID**: `data-slide-id="25"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 25 of 29`
**Footer Nav**:
- Previous: `← Previous` → `24-recovery.html`
- Next: `Next →` → `26-john-aaron.html`

---

### Slide 26: John Aaron - Steely-Eyed Missile Man
**File**: `slides/26-john-aaron.html`
**Type**: Info (Hero Page)
**Data ID**: `data-slide-id="26"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 26 of 29`
**Footer Nav**:
- Previous: `← Previous` → `25-heroes.html`
- Next: `Next →` → `27-reentry-physics.html`

---

### Slide 27: Reentry Physics
**File**: `slides/27-reentry-physics.html`
**Type**: Info
**Data ID**: `data-slide-id="27"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 27 of 29`
**Footer Nav**:
- Previous: `← Previous` → `26-john-aaron.html`
- Next: `Next →` → `28-splashdown.html`

---

### Slide 28: Splashdown!
**File**: `slides/28-splashdown.html`
**Type**: Narrative
**Data ID**: `data-slide-id="28"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 28 of 29`
**Footer Nav**:
- Previous: `← Previous` → `27-reentry-physics.html`
- Next: `Next →` → `29-completion.html`

---

### Slide 29: Mission Complete
**File**: `slides/29-completion.html`
**Type**: Completion
**Data ID**: `data-slide-id="29"`
**Scoring Role**: 🏆 **Score Display & Sharing Page**
- **Score Calculation**: Compares user's 10 decisions to NASA's historical choices
- **Rank Assignment**: Assigns rank based on percentage (Mission Commander, Flight Director, Flight Controller, Ground Crew)
- **Score Display**: Shows rank emoji, title, score (X/10), and personalized message
- **Comparison Table**: Shows user's choice vs NASA's choice for each decision with color coding
- **Share Functionality**:
  - Input form for scout name and troop number
  - Generates shareable URL with hash parameters
  - Copy to clipboard or native share API
  - Example URL: `/#name=Scout&troop=Troop%20123&score=8&total=10&rank=Flight%20Director`

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Mission Complete!`
**Footer Nav**:
- Previous: `← Previous` → `28-splashdown.html`
- Next: `🏠 Home` → `../index.html`

---

## Deep Link Summary

All slides accessible from:
1. **Timeline Page**: Direct links to any slide
2. **Sequential Navigation**: Previous/Next buttons follow slide order (01→02→03...→29)
3. **Top Navigation**: Home and Timeline available from every slide

---

## Navigation Validation Checklist

For each page, verify:
- [ ] Top nav links are correct (`../index.html`, `../timeline.html`)
- [ ] Progress indicator shows correct slide number
- [ ] Previous button links to correct slide
- [ ] Next button links to correct slide
- [ ] Previous/Next button text follows standard format
- [ ] `data-slide-id` matches slide number

---

## Scoring System Quick Reference

### Decision Slides (Score Impact)

| Slide | File | Decision Name | Correct Answer | Weight |
|-------|------|---------------|----------------|--------|
| 02 | `02-freeze-squeeze.html` | Freeze or Squeeze | `squeeze` | 10% |
| 05 | `05-turn-around.html` | Turn Around Decision | `freereturn` | 10% |
| 06 | `06-pc2-burn.html` | PC+2 Burn (Speed Up) | `burn` | 10% |
| 10 | `10-co2-mailbox.html` | CO2 Mailbox | `buildmailbox` | 10% |
| 11 | `11-stars-sun-navigation.html` | Stars or Sun Navigation | `sunearth` | 10% |
| 13 | `13-power-conservation.html` | Power Conservation | `shutdown` | 10% |
| 14 | `14-water-conservation.html` | Water Conservation | `extreme` | 10% |
| 15 | `15-communication-discipline.html` | Communication Discipline | `silence` | 10% |
| 17 | `17-battery-jumpstart.html` | Battery Jump-Start | `jumpstart` | 10% |
| 18 | `18-sm-jettison-timing.html` | SM Jettison Timing | `early` | 10% |

### Score Ranks

| Score | Rank | Emoji | Description |
|-------|------|-------|-------------|
| 10/10 (100%) | Mission Commander | 🏆 | Perfect score - matched all NASA decisions |
| 8-9/10 (80-99%) | Flight Director | ⭐ | Excellent - strong NASA-like instincts |
| 6-7/10 (60-79%) | Flight Controller | 🎯 | Good - helped bring crew home |
| 0-5/10 (0-59%) | Ground Crew | 📡 | Review mission to learn NASA's decisions |

### Score-Related Pages

| Page | Role | Functionality |
|------|------|---------------|
| **index.html** | Score Sharing Landing | Dual mode: Default landing OR celebration card for shared scores |
| **slides/29-completion.html** | Score Display & Generation | Shows score, rank, comparison table, generates shareable URL |

### localStorage Keys

| Key | Data Type | Purpose |
|-----|-----------|---------|
| `decisions` | Object | Stores user choices: `{slideId: {choice, timestamp}}` |
| `visitedSlides` | Array | Tracks progress: `["1", "2", "3", ...]` |

### Shared URL Format

```
https://robgruhl.github.io/apollo-mission/#name=Scout&troop=Troop%20123&score=8&total=10&rank=Flight%20Director
```

**Parameters**:
- `name` - Scout's first name (URL encoded)
- `troop` - Troop number/name (URL encoded)
- `score` - Correct decisions (0-10)
- `total` - Total decisions (always 10)
- `rank` - Achieved rank (URL encoded)

---

**End of Sitemap Specification**
