# Apollo 13 Interactive Experience - Sitemap Specification

**Version**: 1.1
**Date**: 2025-10-04
**Purpose**: Standardized navigation structure and scoring system integration for all pages

---

## Scoring System Overview

The Apollo 13 Interactive Experience includes a scoring system that tracks user decisions and compares them to NASA's historical choices. This sitemap identifies which pages affect scoring and which display score results.

### Score-Impacting Pages (4 Decision Slides)
- **Slide 02**: Freeze or Squeeze (Correct: `squeeze`)
- **Slide 05**: Turn Around Decision (Correct: `freereturn`)
- **Slide 09**: CO2 Mailbox (Correct: `buildmailbox`)
- **Slide 12**: Power Conservation (Correct: `shutdown`)

### Score Display Pages
- **Slide 24**: Completion page (shows score badge, rank, comparison table, share form)

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
**Exception - Slide 24**: `🏠 Home` (links to index.html)

### Link Structure

All pages include:
1. **Top Navigation Bar** (consistent across all pages):
   - `🏠 Home` → `../index.html` (or `index.html` for root pages)
   - `📅 Timeline` → `../timeline.html` (or `timeline.html` for root pages)
   - Progress indicator (e.g., "Slide 5 of 24" or "Mission Complete!")

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
- Slide 06: Meet Crew → `slides/06-meet-crew.html`
- Slide 07: Explosion Cause → `slides/07-explosion-cause.html`
- Slide 08: Lifeboat Moon → `slides/08-lifeboat-moon.html`
- Slide 09: CO2 Mailbox → `slides/09-co2-mailbox.html`
- Slide 10: Navigation → `slides/10-navigation.html`
- Slide 11: Long Journey → `slides/11-long-journey.html`
- Slide 12: Power Conservation → `slides/12-power-conservation.html`
- Slide 13: Passive Thermal → `slides/13-passive-thermal.html`
- Slide 14: Service Module Jettison → `slides/14-service-module-jettison.html`
- Slide 15: LM Jettison → `slides/15-lm-jettison.html`
- Slide 16: Computer Restart → `slides/16-computer-restart.html`
- Slide 17: Reentry Prep → `slides/17-reentry-prep.html`
- Slide 18: The Blackout → `slides/18-the-blackout.html`
- Slide 19: Parachutes → `slides/19-parachutes.html`
- Slide 20: Recovery → `slides/20-recovery.html`
- Slide 21: Heroes → `slides/21-heroes.html`
- Slide 22: Reentry Physics → `slides/22-reentry-physics.html`
- Slide 23: Splashdown → `slides/23-splashdown.html`
- Slide 24: Completion → `slides/24-completion.html`
**Footer**: No slide navigation

---

### Slide 01: Launch & Mission Overview
**File**: `slides/01-launch.html`
**Type**: Narrative
**Data ID**: `data-slide-id="1"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 1 of 24`
**Footer Nav**:
- Previous: `← Home` → `../index.html`
- Next: `Next →` → `02-freeze-squeeze.html`

---

### Slide 02: Freeze or Squeeze?
**File**: `slides/02-freeze-squeeze.html`
**Type**: Decision
**Data ID**: `data-slide-id="2"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (1 of 4)
- **Correct Answer**: `squeeze` (Move to Lunar Module)
- **Decision Tracked**: User choice saved to localStorage as `decisions['2']`
- **Score Weight**: 25% of total score (1 of 4 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 2 of 24`
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
- Progress: `Slide 3 of 24`
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
- Progress: `Slide 4 of 24`
**Footer Nav**:
- Previous: `← Previous` → `03-spacecraft.html`
- Next: `Next →` → `05-turn-around.html`

---

### Slide 05: Turn Around Decision
**File**: `slides/05-turn-around.html`
**Type**: Decision
**Data ID**: `data-slide-id="5"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (2 of 4)
- **Correct Answer**: `freereturn` (Free-Return Trajectory using Moon's gravity)
- **Decision Tracked**: User choice saved to localStorage as `decisions['5']`
- **Score Weight**: 25% of total score (1 of 4 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 5 of 24`
**Footer Nav**:
- Previous: `← Previous` → `04-explosion.html`
- Next: `Next →` → `06-meet-crew.html`

---

### Slide 06: Meet the Crew
**File**: `slides/06-meet-crew.html`
**Type**: Info
**Data ID**: `data-slide-id="6"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 6 of 24`
**Footer Nav**:
- Previous: `← Previous` → `05-turn-around.html`
- Next: `Next →` → `07-explosion-cause.html`

---

### Slide 07: Explosion Cause
**File**: `slides/07-explosion-cause.html`
**Type**: Info
**Data ID**: `data-slide-id="7"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 7 of 24`
**Footer Nav**:
- Previous: `← Previous` → `06-meet-crew.html`
- Next: `Next →` → `08-lifeboat-moon.html`

---

### Slide 08: Lifeboat to the Moon
**File**: `slides/08-lifeboat-moon.html`
**Type**: Narrative
**Data ID**: `data-slide-id="8"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 8 of 24`
**Footer Nav**:
- Previous: `← Previous` → `07-explosion-cause.html`
- Next: `Next →` → `09-co2-mailbox.html`

---

### Slide 09: CO2 Mailbox Decision
**File**: `slides/09-co2-mailbox.html`
**Type**: Decision
**Data ID**: `data-slide-id="9"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (3 of 4)
- **Correct Answer**: `buildmailbox` (Build improvised CO2 scrubber adapter)
- **Decision Tracked**: User choice saved to localStorage as `decisions['9']`
- **Score Weight**: 25% of total score (1 of 4 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 9 of 24`
**Footer Nav**:
- Previous: `← Previous` → `08-lifeboat-moon.html`
- Next: `Next →` → `10-navigation.html`

---

### Slide 10: Navigation Challenge
**File**: `slides/10-navigation.html`
**Type**: Narrative
**Data ID**: `data-slide-id="10"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 10 of 24`
**Footer Nav**:
- Previous: `← Previous` → `09-co2-mailbox.html`
- Next: `Next →` → `11-long-journey.html`

---

### Slide 11: The Long Journey Home
**File**: `slides/11-long-journey.html`
**Type**: Narrative
**Data ID**: `data-slide-id="11"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 11 of 24`
**Footer Nav**:
- Previous: `← Previous` → `10-navigation.html`
- Next: `Next →` → `12-power-conservation.html`

---

### Slide 12: Power Conservation Decision
**File**: `slides/12-power-conservation.html`
**Type**: Decision
**Data ID**: `data-slide-id="12"`
**Scoring Impact**: ⭐ **DECISION SLIDE** (4 of 4)
- **Correct Answer**: `shutdown` (Shutdown Command Module to preserve batteries)
- **Decision Tracked**: User choice saved to localStorage as `decisions['12']`
- **Score Weight**: 25% of total score (1 of 4 decisions)

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 12 of 24`
**Footer Nav**:
- Previous: `← Previous` → `11-long-journey.html`
- Next: `Next →` → `13-passive-thermal.html`

---

### Slide 13: Passive Thermal Control
**File**: `slides/13-passive-thermal.html`
**Type**: Info
**Data ID**: `data-slide-id="13"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 13 of 24`
**Footer Nav**:
- Previous: `← Previous` → `12-power-conservation.html`
- Next: `Next →` → `14-service-module-jettison.html`

---

### Slide 14: Service Module Jettison
**File**: `slides/14-service-module-jettison.html`
**Type**: Narrative
**Data ID**: `data-slide-id="14"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 14 of 24`
**Footer Nav**:
- Previous: `← Previous` → `13-passive-thermal.html`
- Next: `Next →` → `15-lm-jettison.html`

---

### Slide 15: Lunar Module Jettison
**File**: `slides/15-lm-jettison.html`
**Type**: Narrative
**Data ID**: `data-slide-id="15"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 15 of 24`
**Footer Nav**:
- Previous: `← Previous` → `14-service-module-jettison.html`
- Next: `Next →` → `16-computer-restart.html`

---

### Slide 16: Computer Restart
**File**: `slides/16-computer-restart.html`
**Type**: Info
**Data ID**: `data-slide-id="16"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 16 of 24`
**Footer Nav**:
- Previous: `← Previous` → `15-lm-jettison.html`
- Next: `Next →` → `17-reentry-prep.html`

---

### Slide 17: Reentry Preparation
**File**: `slides/17-reentry-prep.html`
**Type**: Narrative
**Data ID**: `data-slide-id="17"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 17 of 24`
**Footer Nav**:
- Previous: `← Previous` → `16-computer-restart.html`
- Next: `Next →` → `18-the-blackout.html`

---

### Slide 18: The Blackout
**File**: `slides/18-the-blackout.html`
**Type**: Narrative
**Data ID**: `data-slide-id="18"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 18 of 24`
**Footer Nav**:
- Previous: `← Previous` → `17-reentry-prep.html`
- Next: `Next →` → `19-parachutes.html`

---

### Slide 19: Parachutes Deploy
**File**: `slides/19-parachutes.html`
**Type**: Narrative
**Data ID**: `data-slide-id="19"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 19 of 24`
**Footer Nav**:
- Previous: `← Previous` → `18-the-blackout.html`
- Next: `Next →` → `20-recovery.html`

---

### Slide 20: Recovery Operations
**File**: `slides/20-recovery.html`
**Type**: Narrative
**Data ID**: `data-slide-id="20"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 20 of 24`
**Footer Nav**:
- Previous: `← Previous` → `19-parachutes.html`
- Next: `Next →` → `21-heroes.html`

---

### Slide 21: Heroes Return
**File**: `slides/21-heroes.html`
**Type**: Narrative
**Data ID**: `data-slide-id="21"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 21 of 24`
**Footer Nav**:
- Previous: `← Previous` → `20-recovery.html`
- Next: `Next →` → `22-reentry-physics.html`

---

### Slide 22: Reentry Physics
**File**: `slides/22-reentry-physics.html`
**Type**: Info
**Data ID**: `data-slide-id="22"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 22 of 24`
**Footer Nav**:
- Previous: `← Previous` → `21-heroes.html`
- Next: `Next →` → `23-splashdown.html`

---

### Slide 23: Splashdown!
**File**: `slides/23-splashdown.html`
**Type**: Narrative
**Data ID**: `data-slide-id="23"`
**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Slide 23 of 24`
**Footer Nav**:
- Previous: `← Previous` → `22-reentry-physics.html`
- Next: `Next →` → `24-completion.html`

---

### Slide 24: Mission Complete
**File**: `slides/24-completion.html`
**Type**: Completion
**Data ID**: `data-slide-id="24"`
**Scoring Role**: 🏆 **Score Display & Sharing Page**
- **Score Calculation**: Compares user's 4 decisions to NASA's historical choices
- **Rank Assignment**: Assigns rank based on percentage (Mission Commander, Flight Director, Flight Controller, Ground Crew)
- **Score Display**: Shows rank emoji, title, score (X/4), and personalized message
- **Comparison Table**: Shows user's choice vs NASA's choice for each decision with color coding
- **Share Functionality**:
  - Input form for scout name and troop number
  - Generates shareable URL with hash parameters
  - Copy to clipboard or native share API
  - Example URL: `/#name=Scout&troop=Troop%20123&score=3&total=4&rank=Flight%20Director`

**Top Nav**:
- `🏠 Home` → `../index.html`
- `📅 Timeline` → `../timeline.html`
- Progress: `Mission Complete!`
**Footer Nav**:
- Previous: `← Previous` → `23-splashdown.html`
- Next: `🏠 Home` → `../index.html`

---

## Deep Link Summary

All slides accessible from:
1. **Timeline Page**: Direct links to any slide
2. **Sequential Navigation**: Previous/Next buttons follow slide order (01→02→03...→24)
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
| 02 | `02-freeze-squeeze.html` | Freeze or Squeeze | `squeeze` | 25% |
| 05 | `05-turn-around.html` | Turn Around Decision | `freereturn` | 25% |
| 09 | `09-co2-mailbox.html` | CO2 Mailbox | `buildmailbox` | 25% |
| 12 | `12-power-conservation.html` | Power Conservation | `shutdown` | 25% |

### Score Ranks

| Score | Rank | Emoji | Description |
|-------|------|-------|-------------|
| 4/4 (100%) | Mission Commander | 🏆 | Perfect score - matched all NASA decisions |
| 3/4 (75-99%) | Flight Director | ⭐ | Excellent - strong NASA-like instincts |
| 2/4 (50-74%) | Flight Controller | 🎯 | Good - helped bring crew home |
| 0-1/4 (0-49%) | Ground Crew | 📡 | Review mission to learn NASA's decisions |

### Score-Related Pages

| Page | Role | Functionality |
|------|------|---------------|
| **index.html** | Score Sharing Landing | Dual mode: Default landing OR celebration card for shared scores |
| **slides/24-completion.html** | Score Display & Generation | Shows score, rank, comparison table, generates shareable URL |

### localStorage Keys

| Key | Data Type | Purpose |
|-----|-----------|---------|
| `decisions` | Object | Stores user choices: `{slideId: {choice, timestamp}}` |
| `visitedSlides` | Array | Tracks progress: `["1", "2", "3", ...]` |

### Shared URL Format

```
https://robgruhl.github.io/apollo-13-scout-mission/#name=Scout&troop=Troop%20123&score=3&total=4&rank=Flight%20Director
```

**Parameters**:
- `name` - Scout's first name (URL encoded)
- `troop` - Troop number/name (URL encoded)
- `score` - Correct decisions (0-4)
- `total` - Total decisions (always 4)
- `rank` - Achieved rank (URL encoded)

---

**End of Sitemap Specification**
