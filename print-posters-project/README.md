# Print Posters Project - UNFINISHED

**Status:** ⚠️ On hold pending format decision
**Last Updated:** October 2025
**Decision Maker:** Ed Gruhl, Scout District Commissioner

---

## Current Situation

The **interactive web version is COMPLETE** and live at:
🌐 **https://robgruhl.github.io/apollo-mission/**

This directory contains materials for a **print/static version** that was started but not completed.

---

## Ed's Pending Decision

**Format options:**

- **Option A: Binder Format**
  - Print 8.5"×11" copies (20 sets)
  - Distribute in binders to scouts
  - Simpler, lower cost
  - Could print directly from web slides

- **Option B: Poster Format**
  - Print large 2'×3' posters (24 total)
  - Bring easel to jamboree booth
  - More visual impact
  - Higher cost, needs transport

**Status:** Not yet decided. Waiting on Ed's preference and budget.

---

## What's Here

### 📄 `/prototype/`
Contains the **design template** for poster format:
- `02-decision-freeze-or-squeeze.html` - One completed poster layout
- This was the visual/layout prototype for all 24 posters
- Side-by-side design: 40% diagrams, 60% text/PROS/CONS
- Target size: 36"×24" (3600×2400px)

**Status:** Single prototype complete, design not applied to other 23 posters

---

### 📝 `/source-content/`
Contains **text content** for all 24 posters:

```
source-content/
├── decision/     (10 files) - Crisis decision points with PROS/CONS
├── narrative/    (6 files)  - Story progression slides
├── info/         (8 files)  - Technical background slides
├── images/       (27MB)     - Source images (many duplicates of assets/images/)
├── COMPLETE_NARRATIVE.txt   - All content combined for readability
└── README.md     - Content organization guide
```

**⚠️ Problem:** Text is likely **too verbose** for poster format
- Written for detailed reading, not poster scanning
- Needs editing/condensing before layout
- Target: Readable from 6 feet away

---

### 🗂️ `/original-materials/`
Contains **source files** before processing:

- `Apollo_13_Educational_Materials.docx` (22MB) - Complete combined document
- `2026-NSJ-Patch.png` - Jamboree patch
- `apollo_13_scout_cover.png` - Cover image
- `patch.png` - Apollo 13 mission patch
- `generate_docx.py` - Script to generate/export .docx

**Purpose:** Historical archive, human-readable reference

---

## Content Inventory

### Decision Slides (10 total)
Crisis decision points with PROS/CONS format:

1. Turn Around or Free-Return Loop?
2. **Freeze or Squeeze** (prototype completed ✅)
3. Stars or Sun/Earth Navigation?
4. Build CO2 Mailbox?
5. Water Conservation Strategy?
6. Speed Up PC+2 Burn?
7. Communication Discipline?
8. Battery Jump-Start from LM?
9. Service Module Jettison Timing?
10. Computer Restart or Manual Re-Entry?

### Narrative Slides (6 total)
Story progression from launch to splashdown:

1. Launch & Mission Overview
2. The Explosion
3. Lifeboat & Moon Flyby
4. The Long Cold Journey
5. Powering Up & Jettison
6. Re-Entry & Splashdown

### Information Slides (8 total)
Technical background and context:

1. Meet the Crew
2. What Caused the Explosion?
3. Spacecraft Configuration
4. Navigation Methods
5. The Mailbox (CO2 Scrubber)
6. Survival Conditions
7. Re-Entry Corridor Physics
8. Lessons Learned

**Total:** 24 posters/slides

---

## Next Steps (When Ed Decides)

### If Option A: Binder Format (8.5×11)
1. **Easiest approach:** Print directly from web browser
   - Navigate to each slide: `https://robgruhl.github.io/apollo-mission/slides/`
   - Print to PDF or paper
   - Bind in order

2. **Alternative:** Create print-optimized HTML
   - Remove navigation elements
   - Optimize for black & white printing
   - Add page numbers and header/footer

### If Option B: Poster Format (2×3 feet)
1. **Complete poster layouts** (23 remaining)
   - Apply prototype design to all slides
   - Use `/source-content/` text files as source
   - **Condense text** - posters need brevity

2. **Design for distance viewing**
   - Readable from 6 feet away
   - Larger fonts, less text
   - More visual hierarchy

3. **High-resolution graphics**
   - Current images are web-optimized (~1200px wide)
   - Need 300 DPI for 2×3 foot prints
   - May need to re-source images from NASA archives

4. **Export for print**
   - PDF at 3600×2400px (36"×24" at 100 DPI)
   - Or higher resolution for professional printing

---

## Resources

### Interactive Version (Completed)
Can serve as content source:
- `/slides/*.html` - All 24 completed interactive slides
- `/assets/images/` - Web-optimized images (may need higher res for posters)
- `/assets/css/style.css` - Visual design reference

### Image Sources
- `source-content/images/` (27MB) - Original/source images
- `/assets/images/` (27MB) - Web-optimized versions
- **Note:** Likely duplicates, may need consolidation

### Documentation
- `/SITEMAP_SPECIFICATION.md` - Complete site navigation map
- `/SCORING_SYSTEM_DESIGN.md` - Interactive scoring system (not relevant to print)
- `/DEPLOYMENT_GUIDE.md` - GitHub Pages deployment (web only)

---

## Technical Notes

### Poster Prototype Design
File: `prototype/02-decision-freeze-or-squeeze.html`

**Layout:**
- Side-by-side: 40% left (diagram), 60% right (text)
- NASA blue header with mission patch
- "Cluttered and readable" aesthetic
- Dense content prioritized over whitespace

**Typography:**
- Headers: Bold, large
- Body: Readable from distance
- PROS/CONS: Bulleted lists with ✅/❌ markers

**Target Size:** 36"×24" (landscape orientation)

---

## Questions to Resolve

Before continuing this project:

1. **Format decision:** Binders or posters?
2. **Budget:** What's available for printing?
3. **Quantity:** How many scouts expected at booth?
4. **Transport:** Can large posters/easel be transported to venue?
5. **Interactive vs. static:** Should scouts use website instead?

---

## Contact

**Presenter:** Ed Gruhl
**Role:** Scout District Commissioner, Glacial Trails District
**Event:** 2026 Elevate Scout Jamboree - NASA Tent, Apollo Table
**Target Audience:** Scouts ages 11-17

---

## File Sizes

```
prototype/              20KB
source-content/         27MB (mostly images/)
original-materials/     26MB (mostly .docx)
TOTAL:                  ~53MB
```

---

**Last Updated:** October 4, 2025
**Archive Reason:** Awaiting format decision before completing layouts
