# Additional Decision Slides - Image Requirements Brief
**Project:** Apollo 13 Interactive Experience - Expansion
**Date:** 2025-10-04
**Purpose:** Locate images for 6 unimplemented decision slides

---

## Context

The interactive site currently has 4 decision slides (out of 10 planned). This brief covers images needed for the remaining 6 decision points that exist as text files but were never implemented as interactive slides.

**If implemented, these would add 6 more decision slides to the experience.**

---

## Image Status Summary

| Decision | Existing Image? | Status |
|----------|----------------|--------|
| #3 Stars/Sun Navigation | ✅ YES | Have AOT & Earth terminator |
| #5 Water Conservation | ⚠️ PARTIAL | Have water rationing (used elsewhere) |
| #6 PC+2 Burn (Speed Up) | ⚠️ PARTIAL | Have LM engine (unused) |
| #7 Communication Discipline | ❌ NO | Need radio/comms image |
| #8 Battery Jump-Start | ❌ NO | Need battery/electrical diagram |
| #9 SM Jettison Timing | ⚠️ PARTIAL | Have damage, not jettison sequence |
| #10 Computer Restart | ✅ YES | Have AGC computer image |

---

## Images Needed (4 new images)

### 1. ❌ **NEW IMAGE NEEDED: Communication/Radio Equipment**

**Decision Context:** Communication Discipline (slide 7)
- Should crew maintain frequent radio contact with Mission Control?
- Or enforce radio silence to save battery power?

**Required Image:**
- Apollo radio equipment (S-band radio, antennas)
- OR astronaut at radio panel in LM/CM
- OR close-up of communication controls

**Filename:** `decision07_radio_communication.jpg` or `decision07_radio_discipline.jpg`

**Search Keywords:**
- "Apollo 13 S-band radio"
- "Apollo radio communication panel"
- "Apollo spacecraft antenna"
- "Lunar Module radio equipment"
- "Apollo communication system diagram"

**Fallback Options:**
- Generic Apollo radio panel from any mission
- Mission Control communication console
- Diagram of Apollo communication systems

---

### 2. ❌ **NEW IMAGE NEEDED: Battery Jump-Start Procedure**

**Decision Context:** Battery Jump-Start (slide 8)
- Transfer power from LM batteries to CM batteries
- Never tested procedure, could short-circuit both systems

**Required Image:**
- Electrical panel with battery connections
- Wiring harness or cable connections
- Electrical diagram showing LM→CM power transfer
- Battery compartment in spacecraft

**Filename:** `decision08_battery_jumpstart.jpg` or `decision08_electrical_panel.jpg`

**Search Keywords:**
- "Apollo battery panel"
- "Apollo electrical system diagram"
- "Lunar Module power distribution"
- "Apollo 13 battery charging"
- "Apollo electrical connections"
- "Spacecraft battery compartment"

**Fallback Options:**
- Generic Apollo electrical panel
- Battery array from Apollo spacecraft
- Technical diagram of power systems
- NASA engineer diagram/schematic

---

### 3. ⚠️ **REUSE OR NEW: LM Descent Engine Firing**

**Decision Context:** PC+2 Burn - Speed Up (slide 6)
- Fire LM descent engine for 4.5 minutes to speed up return
- Longest burn yet, high stakes

**Existing Image Available:**
- `slide15_lm_descent_engine.jpg` (651KB) - CURRENTLY UNUSED

**Options:**
- **Option A:** Use existing `slide15_lm_descent_engine.jpg`
- **Option B:** Find image showing engine *firing* (not just static)

**If seeking new image:**
- **Filename:** `decision06_engine_burn.jpg` or `decision06_descent_engine_firing.jpg`
- **Search Keywords:**
  - "Lunar Module descent engine firing"
  - "Apollo LM engine burn space"
  - "Apollo 13 PC+2 burn"
  - "LM descent engine plume"

---

### 4. ⚠️ **REUSE OR NEW: Water Rationing**

**Decision Context:** Water Conservation Strategy (slide 5)
- Distribute water equally vs prioritize drinking vs prioritize cooling

**Existing Image Available:**
- `slide13_water_rationing.png` (1.2MB) - ALREADY USED on Slide 13

**Options:**
- **Option A:** Reuse `slide13_water_rationing.png` on both slides
- **Option B:** Find different water-related image

**If seeking new image:**
- **Filename:** `decision05_water_supply.jpg` or `decision05_water_rationing.jpg`
- **Required Content:**
  - Apollo water storage tanks
  - Water dispenser/gun in spacecraft
  - Crew drinking water in cramped conditions
  - Water supply gauge/monitoring

**Search Keywords:**
- "Apollo water supply tank"
- "Apollo spacecraft water dispenser"
- "Apollo 13 water rationing"
- "Lunar Module water system"

---

## Images We Already Have (No Action Needed)

### ✅ Decision #3: Stars or Sun/Earth Navigation

**Existing Images (UNUSED):**
- `slide09_aot.jpg` (91KB) - Alignment Optical Telescope
- `slide09_earth_terminator.jpg` (185KB) - Earth terminator view

**Status:** Ready to use, no new images needed

---

### ✅ Decision #10: Computer Restart vs Manual

**Existing Image (USED on Slide 16):**
- `slide21_computer_restart.png` (156KB) - Apollo Guidance Computer

**Options:**
- Reuse on decision slide
- OR find additional manual re-entry procedure image

**If seeking supplemental image:**
- Manual re-entry checklist
- Crew with paper procedures
- Flight director computing trajectory manually

---

## Priority Ranking

### 🔴 High Priority (Block implementation)
1. **Communication/Radio** - No suitable image exists
2. **Battery Jump-Start** - No suitable image exists

### 🟡 Medium Priority (Can reuse existing)
3. **Water Conservation** - Can reuse existing water rationing image
4. **PC+2 Burn** - Can reuse existing LM engine image

### 🟢 Low Priority (Already have images)
5. Stars/Sun Navigation - Have AOT and Earth terminator
6. Computer Restart - Have AGC computer image

---

## Implementation Notes

**Minimum to implement these 6 decisions:**
- 2 new images (radio + battery)
- 4 reused images (from existing unused assets)

**Ideal implementation:**
- 4 new images (radio, battery, engine firing, water supply)
- 2 new images from existing unused

---

## Image Specifications (Same as Original Brief)

### Technical Requirements:
- **Format:** JPG for photos, PNG for diagrams
- **Size:** 300-500KB optimized
- **Dimensions:** 1200-1600px wide minimum
- **Quality:** Web-optimized, good compression

### Delivery:
- Save to: `/Users/robgruhl/Projects/apollo-mission/assets/images/`
- Naming: `decision[NUMBER]_[description].[ext]`

---

## Decision Slide Content Summary

For reference when searching images:

### Decision #3: Stars or Sun/Earth Navigation
- **Dilemma:** Debris field makes stars invisible
- **Options:** Use star sighting (accurate but blocked) vs Sun/Earth alignment (less accurate but visible)
- **Images needed:** ✅ Have AOT and Earth terminator

### Decision #5: Water Conservation
- **Dilemma:** Not enough water for crew + electronics + breathing
- **Options:** Equal rationing vs prioritize drinking vs prioritize cooling
- **Images needed:** ⚠️ Have water rationing (used elsewhere)

### Decision #6: PC+2 Burn (Speed Up)
- **Dilemma:** Current trajectory lands in wrong ocean, too far from rescue
- **Options:** Coast on free-return vs perform risky engine burn to retarget
- **Images needed:** ⚠️ Have LM engine (unused)

### Decision #7: Communication Discipline
- **Dilemma:** Radio uses precious battery power
- **Options:** Maintain frequent contact (comfort/safety) vs radio silence (save power)
- **Images needed:** ❌ NEED radio/communication equipment

### Decision #8: Battery Jump-Start
- **Dilemma:** CM batteries at 2%, need power for re-entry
- **Options:** Use 2% reserve (certain death) vs jump-start from LM (untested, risky)
- **Images needed:** ❌ NEED battery/electrical panel

### Decision #9: SM Jettison Timing
- **Dilemma:** When to jettison damaged Service Module?
- **Options:** Early jettison (see damage, but risks exposure) vs late jettison (standard but less time to react)
- **Images needed:** ⚠️ Have SM damage image, could use SM jettison sequence

### Decision #10: Computer Restart vs Manual
- **Dilemma:** Frozen computer might not restart
- **Options:** Risk computer restart vs manual re-entry (extremely difficult)
- **Images needed:** ✅ Have AGC computer image

---

## Next Steps

1. **Priority 1:** Find radio/communication image
2. **Priority 2:** Find battery/electrical panel image
3. **Optional:** Find better engine firing and water supply images
4. **Decision:** Whether to implement these 6 additional decision slides

---

## NASA Image Sources

Same sources as original brief:
- NASA Image Gallery: https://images.nasa.gov/
- Apollo 13 Flight Journal: https://history.nasa.gov/ap13fj/
- NASA History Office
- Wikimedia Commons
- Smithsonian Air & Space Museum

Search specifically for:
- Apollo technical diagrams
- Spacecraft interior panels
- Apollo 13 mission-specific photos
- Apollo training/simulator photos
