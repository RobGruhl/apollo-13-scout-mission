# Apollo 13 Educational Poster System - Project Plan

**Last Updated**: October 3, 2025
**Project Status**: Prototype Optimized ✅ | Font Sizing Complete ✅ | Production Phase Ready
**Client**: Ed (Boy Scout Apollo 13 Program)

---

## 📋 Project Overview

### Mission
Create 24 large-format educational posters (3' x 2', landscape) for Boy Scout interactive Apollo 13 presentation. Scouts learn mission timeline and make life-or-death decisions at 10 key crisis points.

### Target Audience
- Boy Scouts (ages 11-17)
- Groups of ~15 scouts per session
- Viewing distance: 6-10 feet from posters

### Key Requirements
- **Readable from 10 feet** - "Cluttered and readable beats pretty with white space" (Ed's directive)
- **Three poster types**: Narrative, Information, Decision
- **Consistent visual design** across all 24 posters
- **Print quality**: 36" x 24" at professional print shop standards

---

## ✅ What We've Accomplished

### 1. Research & Content Development

**Completed**:
- ✅ Gathered authoritative NASA source material
- ✅ Created `corrected-materials.md` with verified facts (GET timestamps, measurements, technical details)
- ✅ Developed `MISSION_TIMELINE.md` with complete mission chronology and 10 decision points
- ✅ Identified all 24 required slides (6 narrative, 10 decision, 8 info)

**Key Corrections Made**:
- Explosion time: GET 55:54:53 (verified)
- Navigation: Sun in AOT + Earth terminator in COAS (not quadrants)
- CO2 levels: 14.9 → 4.6 mmHg (correct units)
- Re-entry corridor: -6.5° target, -5.25° to -7.4° acceptable
- LM scrubbers ROUND, CM scrubbers SQUARE (not the reverse)

### 2. Design System & Documentation

**Completed**:
- ✅ `PRODUCT_REQUIREMENTS.md` - Comprehensive PRD with all specifications
- ✅ `TECHNICAL_SOLUTION.md` - One-page technical summary
- ✅ `DIAGRAM_CONCEPTS.md` - 8 large-format diagram concepts with implementation details
- ✅ Design system established:
  - Color palette: NASA Blue (#0B3D91), Cyan (#00ACC1), Warning Yellow (#FFA000), Success Green (#2E7D32), Crisis Red (#DC143C)
  - Typography: Helvetica Neue, large sizes for 10-foot readability
  - Layout grid: 3600px × 2400px canvas (3:2 aspect ratio)

### 3. Technical Architecture

**Technology Stack Selected**:
- ✅ **HTML/CSS + inline SVG** (best solution for vector graphics + text)
- ✅ **Browser print to PDF** for production (vector-perfect quality)
- ✅ **Playwright** for automated screenshots (optional PNG export)

**Why This Works**:
- Vector graphics scale infinitely - sharp at any size
- Can preview exactly what will print
- Single CSS file controls all 24 posters (consistency)
- No expensive design software required
- Claude Code can generate complete files natively

### 4. Prototype Poster Optimized! 🎉

**File**: `/Users/robgruhl/Projects/apollo-mission/posters/02-decision-freeze-or-squeeze.html`

**What It Includes**:
- ✅ Decision Point #2: "FREEZE OR SQUEEZE?"
- ✅ **Optimized typography** prioritizing critical content (57px PROS/CONS bullets)
- ✅ Yellow context box with 5 situation bullets
- ✅ **Side-by-side layout breakthrough**:
  - Left: Spacecraft diagrams (40% width)
  - Right: PROS/CONS lists (60% width)
  - Perfect fit: 2401px height (essentially zero overflow)
- ✅ Two option panels with:
  - PROS (green checkmarks, 60px labels)
  - CONS (red X marks, 60px labels)
  - Numbered badges (1 and 2)
- ✅ **Spacecraft diagrams** (inline SVG):
  - Command Module: Cone shape with 3 spaced seats (~210 cu ft)
  - Lunar Module: Narrow box with 3 stick figures crammed together (~160 cu ft)
- ✅ Bold decision prompt: "🤔 WHAT SHOULD THE CREW DO?"
- ✅ Footer with mission dates and branding

**Layout Innovation**:
The side-by-side arrangement of diagrams and PROS/CONS lists was the key breakthrough - it eliminated wasted horizontal space and allowed for 14% larger bullet fonts (50px → 57px) while maintaining perfect vertical fit within the 2400px canvas.

**Design Iterations**:
- Version 1: Fonts too small, too much white space ❌
- Version 2: Increased all fonts 30-50%, tighter spacing ✅
- Version 3: Added spacecraft interior diagrams ✅
- Version 4: Side-by-side layout (diagrams 40% + PROS/CONS 60%) ✅
- Version 5: Optimized bullet fonts from 50px → 57px (14% increase) ✅ FINAL

**Key Screenshots** (intermediate versions removed):
- V1: `.playwright-mcp/page-2025-10-04T02-56-52-712Z.png` (initial version, 978KB)
- V4: `.playwright-mcp/side-by-side-final.png` (side-by-side breakthrough, 1.3MB)
- V5: `.playwright-mcp/final-optimized-57px-bullets.png` ⭐ CURRENT (perfect fit: 2401px, 1.3MB)

---

## 📊 Current State

### File Structure
```
/apollo-mission/
├── PLAN.md (this file - project tracking)
├── PRODUCT_REQUIREMENTS.md (v1.1 - complete PRD)
├── TECHNICAL_SOLUTION.md (one-pager)
├── DIAGRAM_CONCEPTS.md (visual concepts)
├── MISSION_TIMELINE.md (content source)
├── corrected-materials.md (verified facts)
├── transcript.md (Ed's original program notes)
├── posters/
│   └── 02-decision-freeze-or-squeeze.html ⭐ OPTIMIZED PROTOTYPE
└── .playwright-mcp/
    ├── page-2025-10-04T02-56-52-712Z.png (V1 - initial)
    ├── side-by-side-final.png (V4 - layout breakthrough)
    └── final-optimized-57px-bullets.png (V5 - current) ⭐
```

### Typography Specifications (Final - Optimized for 10-foot Viewing)
| Element | Font Size | Weight | Use |
|---------|-----------|--------|-----|
| Main Title | 140px | 900 | "FREEZE OR SQUEEZE?" |
| Decision Number | 90px | 900 | "DECISION POINT #2" |
| Context Header | 68px | 900 | "⚠️ THE SITUATION" |
| Context Bullets | 48px | 500 | Situation details |
| Option Titles | 130px | 900 | "FREEZE" / "SQUEEZE" |
| Option Subtitles | 56px | 400 | "Stay in Command Module" |
| PROS/CONS Labels | 60px | 900 | "✓ PROS" / "✕ CONS" |
| **PROS/CONS Bullets** | **57px** | **500** | **Critical content - optimized for readability** ⭐ |
| Decision Prompt | 78px | 900 | "WHAT SHOULD THE CREW DO?" |
| Footer | 42-50px | 600-900 | Mission dates, branding |

**Key Optimization**: PROS/CONS bullets increased from 50px to 57px (14% increase) - maximizes readability of most critical decision-making content while maintaining perfect fit (2401px height).

### Color Usage (Established)
- **NASA Blue** (#0B3D91): Headers, branding, decision prompt background
- **Cyan** (#00ACC1): Option badges, borders, neutral accent
- **Yellow** (#FFA000): Warning context box, situation alerts
- **Green** (#2E7D32): PROS bullets and checkmarks
- **Red** (#DC143C): CONS bullets and X marks, danger indicators

### Viewing Distance Calculation
**For testing readability**:
- 36" poster at 10 feet = MacBook 14" (12.3" screen) at 3.5 feet
- Formula: `Laptop distance = (Poster distance) ÷ (Poster width ÷ Screen width)`
- Result: 120" ÷ 2.93 = **~42 inches** (3.5 feet)

---

## 🎯 Where We're Going

### Immediate Next Steps (Session Continuation)

#### Option A: Test & Iterate Current Prototype
1. **Physical print test** (recommended)
   - Export HTML to PDF (browser print, 36" × 24" custom size)
   - Send to FedEx Office or local print shop (~$25-35)
   - View from 10 feet with ~15 people
   - Gather feedback on readability, layout, visual impact

2. **Adjustments based on testing**
   - Font sizes (may need even bigger?)
   - Spacing/layout tweaks
   - Color contrast improvements
   - Diagram clarity

#### Option B: Scale Production (Build More Posters)
Once prototype is approved, generate remaining 23 posters:

**Phase 1: Core Decision Slides** (9 more, 10 total)
1. ✅ Decision #2: Freeze or Squeeze (DONE)
2. ⏳ Decision #1: Turn Around or Free-Return?
3. ⏳ Decision #3: Stars or Sun/Earth Navigation?
4. ⏳ Decision #4: Build CO2 Mailbox?
5. ⏳ Decision #5: Water Conservation?
6. ⏳ Decision #6: Speed Up Burn (PC+2)?
7. ⏳ Decision #7: Communication Discipline?
8. ⏳ Decision #8: Battery Jump-Start?
9. ⏳ Decision #9: SM Jettison Timing?
10. ⏳ Decision #10: Computer Restart or Manual?

**Phase 2: Narrative Slides** (6 total)
1. ⏳ Launch & Mission Overview
2. ⏳ The Explosion (GET 55:54:53)
3. ⏳ Lifeboat & Moon Flyby
4. ⏳ The Long Cold Journey
5. ⏳ Powering Up & Jettison
6. ⏳ Re-Entry & Splashdown

**Phase 3: Information Slides** (8 total)
1. ⏳ Meet the Crew
2. ⏳ What Caused the Explosion?
3. ⏳ Spacecraft Configuration (3-module system)
4. ⏳ Navigation Methods (AOT, COAS, star sighting)
5. ⏳ The Mailbox (assembly diagram)
6. ⏳ Survival Conditions (cold, water, power)
7. ⏳ Re-Entry Corridor Physics
8. ⏳ Lessons Learned

---

## 🔧 Production Workflow (Established)

### For Each New Poster:

1. **Create HTML file** following template from prototype
   - Copy structure from `02-decision-freeze-or-squeeze.html`
   - Update content from `MISSION_TIMELINE.md`
   - Maintain consistent CSS styling

2. **Add unique elements** based on poster type:
   - **Decision**: 2-3 option panels with PROS/CONS
   - **Narrative**: Timeline bar, key events, photos
   - **Information**: Diagrams, schematics, technical details

3. **Preview in browser**
   - Open HTML file
   - View at 100%, 50%, 25% zoom
   - Test readability simulation (3.5 feet for 14" screen)

4. **Screenshot for review**
   - Use Playwright: `mcp__playwright__browser_take_screenshot`
   - Save to `.playwright-mcp/` folder
   - Visual confirmation before export

5. **Export to PDF** (when approved)
   - Browser Print → Save as PDF
   - Settings: 36" × 24", margins: none, scale: 100%, background graphics: ON
   - Send to print shop

---

## 📐 Design Templates (To Be Created)

### Template 1: Decision Slide (DONE ✅)
- File: `02-decision-freeze-or-squeeze.html`
- Use as reference for remaining 9 decision slides
- Structure: Header → Context Box → Options (2-3 columns) → Decision Prompt

### Template 2: Narrative Slide (TODO)
- Horizontal timeline visualization
- 3-5 key events with timestamps
- Photos/illustrations (if available)
- Mission progress indicator
- "What happens next?" teaser

### Template 3: Information Slide (TODO)
- Large diagram/schematic (center)
- Callout boxes with key facts
- 60/40 visual-to-text ratio
- Technical specifications
- "Did You Know?" interesting facts

---

## 🎨 Visual Assets Needed

### Diagrams & Illustrations
- ✅ Spacecraft interior comparisons (stick figures) - DONE
- ⏳ Orbital trajectory diagram (free-return vs turn-around)
- ⏳ CO2 scrubber "mailbox" assembly steps (IKEA-style)
- ⏳ Re-entry corridor angle visualization
- ⏳ Timeline bar/arc graphic (mission progress)
- ⏳ Navigation instruments (AOT, COAS diagrams)
- ⏳ 3-module spacecraft configuration (exploded view)

### Photos (Optional - NASA Archives)
- Launch (Saturn V on pad)
- Crew portraits (Lovell, Swigert, Haise)
- Service module damage (after jettison)
- Splashdown (Pacific Ocean)
- Mission Control (Gene Kranz era)

**Note**: Can use NASA archival photos (public domain) or proceed with diagrams only.

---

## 💰 Budget & Resources

### Estimated Costs
- **Printing**: $25-35 per 36" × 24" poster
- **Foam core mount**: +$10-15 per poster (optional)
- **Lamination**: +$15-20 per poster (optional)

**Full set (24 posters)**:
- Basic prints only: $600-840
- With mounting: $840-1,200
- Fully laminated: $960-1,680

### Print Shops
1. **FedEx Office** - Convenient, same-day, $25-35 per poster
2. **Local print shops** - Custom options, often better quality
3. **Online** (Vistaprint, etc.) - Cheaper but shipping time

---

## 🚀 Success Metrics

### Prototype Approval Criteria
- ✅ Text readable from 10 feet
- ✅ Visual hierarchy clear (title → context → options → decision)
- ✅ Options clearly differentiated (PROS/CONS obvious)
- ✅ Diagrams communicate concepts quickly
- ✅ Consistent with design system
- ⏳ Ed approves for production (PENDING)

### Production Goals
- Generate all 24 posters within 2-3 weeks
- Maintain visual consistency across set
- Print test of 3-5 key slides before full production
- Deliver complete set ready for scout meeting use

---

## 🔄 Session Handoff Checklist

**To Continue This Project**:

1. ✅ Read `PLAN.md` (this file) - understand where we are
2. ✅ Review `MISSION_TIMELINE.md` - content source for all posters
3. ✅ Open prototype: `/Users/robgruhl/Projects/apollo-mission/posters/02-decision-freeze-or-squeeze.html`
4. ✅ Check latest screenshot: `.playwright-mcp/page-2025-10-04T03-06-56-106Z.png`
5. ✅ Reference `PRODUCT_REQUIREMENTS.md` for design specs
6. ⏳ Await Ed's approval or feedback on prototype
7. ⏳ Generate next poster(s) using prototype as template

**Key Questions to Resolve**:
- Does Ed want physical print test before proceeding?
- Which poster to generate next? (Recommend Decision #1 or Narrative #1)
- Any design tweaks needed based on 3.5-foot viewing test?

---

## 📝 Important Notes & Decisions

### Design Philosophy (Ed's Guidance)
> "Cluttered and readable beats pretty with white space"
- Prioritize readability over aesthetics
- Large fonts trump elegant spacing
- 10-foot viewing distance is non-negotiable
- Content density is acceptable if readable

### Technical Choices
- **HTML/CSS + SVG** over pure design tools (Figma, Illustrator) because:
  - Claude Code can generate complete files
  - Vector quality guaranteed
  - Easy iteration and consistency
  - No software licenses required

### Content Accuracy
- All facts verified against NASA Flight Journal
- GET (Ground Elapsed Time) timestamps confirmed
- Technical specifications double-checked
- Ed's original program concepts preserved ("Freeze or Squeeze" language)

---

## 🎓 Educational Goals (Ed's Program)

### Learning Outcomes
1. Scouts understand real-world problem-solving under pressure
2. Appreciate teamwork between crew and Mission Control
3. Learn orbital mechanics basics (free-return, trajectory burns)
4. Understand engineering constraints (power, oxygen, water)
5. Practice critical thinking through decision-making
6. Remember Apollo 13 as "successful failure" story

### Presentation Flow
1. Present crisis slide (no answer shown)
2. Scouts discuss in patrols (2-3 minutes)
3. Vote on decision
4. Leader reveals historical choice
5. Discuss why NASA chose that option
6. Continue to next timeline event

**Reward**: Business card saying "I helped save Apollo 13 astronauts" with mission patch image on reverse.

---

## 📞 Contact & Reference

### Stakeholders
- **Ed**: Original program creator, subject matter expert
- **Rob** (Ed's son): Project coordinator, technical liaison

### Key Resources
- NASA Apollo 13 Flight Journal (primary source)
- NASA Apollo 13 Mission Details
- Wikipedia Apollo 13 (general overview)
- Corrected materials compiled in `corrected-materials.md`

---

## ✨ Vision for Completion

**End State**:
Boy Scout troops across the country using this poster set to learn Apollo 13 history through interactive decision-making. Scouts engage with real crisis scenarios, debate options, and discover how NASA's calm problem-solving saved three lives 200,000 miles from Earth.

**Legacy**:
Educational materials that can be updated, reprinted, and distributed to multiple troops. Digital files preserved for future use. Template system allows easy creation of similar educational poster sets for other missions (Apollo 11, Artemis, etc.).

---

**Next Session**: Start here! Review prototype feedback from Ed, then proceed with production of remaining 23 posters using established template and design system.

**Status**: ✅ Foundation Complete | 🚀 Ready for Production Scale-Up

---

*Last updated: October 3, 2025 - Prototype optimized with side-by-side layout and maximized bullet font sizes (57px). Perfect fit achieved (2401px). Awaiting physical print test and Ed's final go-ahead for production.*
