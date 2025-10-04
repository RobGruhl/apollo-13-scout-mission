# Missing Images Requirements Brief
**Project:** Apollo 13 Interactive Experience
**Date:** 2025-10-04
**Purpose:** Locate, acquire, and prepare 6 missing images for HTML slides

---

## Mission Context
This is an educational website for Boy Scouts (ages 11-17) about the Apollo 13 rescue mission. Images must be:
- **Historically accurate** - Real NASA photos preferred
- **Web-optimized** - WebP format with JPG fallback, <500KB per image
- **Public domain or NASA** - Free for educational use
- **High resolution** - Minimum 1200px wide for responsive display

---

## Required Images (6 total)

### 1. **slide11_cold_crew.jpg**
**Slide:** 11 - "The Long Cold Journey Home"
**Context:** Days 4-5 survival in frozen Lunar Module Aquarius
**Required content:**
- Interior of Apollo 13 Lunar Module during the crisis
- Visual evidence of cold conditions (frost, condensation on windows)
- Crew members in survival conditions preferred
- Cramped quarters visible

**Search keywords:**
- "Apollo 13 frost windows"
- "Apollo 13 Lunar Module interior cold"
- "Apollo 13 Aquarius lifeboat interior"
- "Apollo 13 crew survival conditions"

**Fallback options:**
- Generic Apollo Lunar Module interior with crew
- Apollo 13 crew in training with frost/cold visible
- Simulation photos from NASA archives

---

### 2. **slide13_ptc_diagram.png**
**Slide:** 13 - "Passive Thermal Control"
**Context:** Explanation of "barbecue roll" rotation maneuver
**Required content:**
- Diagram showing spacecraft rotating on longitudinal axis
- Illustration of thermal distribution concept
- Sun rays and heat distribution visible
- Clear educational diagram style

**Current wrong image:** `slide13_water_rationing.png` (unrelated topic)

**Search keywords:**
- "Apollo passive thermal control diagram"
- "PTC barbecue roll illustration"
- "Apollo spacecraft rotation thermal control"
- "Apollo 13 PTC maneuver diagram"

**Fallback options:**
- Generic Apollo PTC diagram from any mission
- Create simple diagram showing rotation concept
- NASA technical drawing of PTC procedure

---

### 3. **slide17_reentry_prep.jpg**
**Slide:** 17 - "Preparing for Re-Entry"
**Context:** Final hours before atmospheric re-entry
**Required content:**
- Command Module Odyssey interior during final preparations
- Crew members preparing for re-entry (putting on suits, checking equipment)
- View of Earth through window preferred
- Tension/focus visible in crew actions

**Search keywords:**
- "Apollo 13 re-entry preparation"
- "Apollo 13 Command Module before reentry"
- "Apollo 13 crew suited up"
- "Apollo Command Module Earth view window"

**Fallback options:**
- Apollo 13 crew during any phase showing preparation
- Generic Apollo Command Module interior with Earth visible
- Re-entry training photos from Apollo 13 crew

---

### 4. **slide18_reentry_plasma.jpg**
**Slide:** 18 - "The Re-Entry Blackout"
**Context:** 4-minute communications blackout during re-entry
**Required content:**
- Command Module surrounded by re-entry plasma/fire
- Orange/red glow of atmospheric friction
- Dramatic view of capsule descending through atmosphere
- Could be illustration or real photo

**Search keywords:**
- "Apollo re-entry plasma"
- "Apollo Command Module atmospheric entry fire"
- "Apollo 13 re-entry blackout"
- "Spacecraft re-entry heat shield glow"

**Fallback options:**
- Generic Apollo re-entry photo (any mission)
- Artist illustration of Apollo re-entry
- Similar spacecraft re-entry (Gemini, Mercury) with plasma visible

---

### 5. **slide19_parachutes.jpg**
**Slide:** 19 - "Parachute Deployment"
**Context:** Successful parachute deployment after blackout
**Required content:**
- Apollo 13 Command Module descending under 3 main parachutes
- Three orange-and-white striped parachutes clearly visible
- Ocean or horizon in background
- Capsule visible beneath parachutes

**Search keywords:**
- "Apollo 13 parachutes deployment"
- "Apollo 13 three main chutes"
- "Apollo 13 descent parachutes ocean"
- "Apollo 13 splashdown sequence parachutes"

**Fallback options:**
- Apollo 13 recovery sequence photos with parachutes
- Similar Apollo mission parachute deployment (Apollo 11, 12, 14)
- NASA training photos of parachute systems

---

### 6. **slide20_recovery.jpg**
**Slide:** 20 - "Recovery Operations"
**Context:** USS Iwo Jima retrieval operations
**Required content:**
- Apollo 13 Command Module in Pacific Ocean
- Navy recovery operations (swimmers, helicopter, or ship visible)
- Crew extraction or capsule being hoisted preferred
- USS Iwo Jima carrier visible in background if possible

**Search keywords:**
- "Apollo 13 recovery operations"
- "Apollo 13 USS Iwo Jima pickup"
- "Apollo 13 splashdown navy divers"
- "Apollo 13 crew extraction ocean"

**Fallback options:**
- Apollo 13 floating in ocean before pickup
- Crew on deck of USS Iwo Jima after recovery
- Generic Apollo recovery operations (similar missions)

---

## Image Processing Requirements

Once images are located:

### 1. **Filename Format:**
```
slide[NUMBER]_[description].[extension]
```
Examples: `slide11_cold_crew.jpg`, `slide13_ptc_diagram.png`

### 2. **Optimization:**
- **Preferred format:** JPG for photos, PNG for diagrams
- **Target size:** 300-500KB per image
- **Dimensions:** 1200-2000px wide (maintain aspect ratio)
- **Compression:** 80-85% quality for JPG

### 3. **Delivery:**
Save to: `/Users/robgruhl/Projects/apollo-mission/assets/images/`

### 4. **Attribution:**
Document image sources in a separate file for credits/licensing.

---

## Image Sources to Check

### Primary Sources (Free/Public Domain):
1. **NASA Image Gallery** - https://images.nasa.gov/
   - Search: "Apollo 13"
   - Filter: Public domain images

2. **Apollo 13 Flight Journal** - https://history.nasa.gov/ap13fj/
   - Mission photos embedded throughout

3. **NASA History Office** - https://www.nasa.gov/history/
   - Apollo program archives

4. **Wikimedia Commons** - Apollo 13 category
   - Many NASA photos already uploaded

5. **Smithsonian Air & Space Museum** - Digital collections

### Secondary Sources:
- Project Apollo Archive (Flickr)
- NASA Johnson Space Center Digital Image Collection
- Apollo Lunar Surface Journal (for LM interior references)

---

## Success Criteria

✅ **All 6 images acquired** and placed in `/assets/images/`
✅ **Filenames match** requirements exactly
✅ **File sizes** under 500KB each
✅ **Historically accurate** - Real NASA imagery or approved educational diagrams
✅ **Licensing clear** - Public domain or NASA images only
✅ **Resolution adequate** - 1200px+ wide minimum

---

## Notes for AI Agent

- **Prioritize NASA official images** over fan art or movie stills
- **Apollo 13 specific photos preferred** but similar Apollo missions acceptable
- **If exact match not found,** use closest equivalent from Apollo program
- **Document uncertainties** - Note if image is from different mission
- **Keep quality high** - Better to use Apollo 12 official photo than Apollo 13 low-res image

---

## Existing Assets (For Reference)

**Working images in `assets/images/`:**
- `slide01_launch.jpg` - Saturn V liftoff
- `slide02_meet_the_crew.jpg` - Lovell, Swigert, Haise
- `slide03_explosion.jpg` - Damaged Service Module
- `slide19_sm_damage.jpg` - Service Module damage closeup
- `slide20_lm_jettison.jpg` - Aquarius LM separation
- `slide17_mission_control.jpg` - Mission Control room

**Unused images** (may be repurposed):
- `slide09_aot.jpg` - Alignment Optical Telescope
- `slide09_earth_terminator.jpg` - Earth from space
- `slide15_lm_descent_engine.jpg` - Lunar Module engine

---

**Agent Instructions:**
1. Search NASA archives using keywords provided
2. Download highest resolution version available
3. Optimize images to specifications above
4. Save with exact filenames to `/assets/images/`
5. Create `IMAGE_SOURCES.md` documenting origin of each image
6. Flag any images that are substitutes (e.g., Apollo 12 used for Apollo 13)
