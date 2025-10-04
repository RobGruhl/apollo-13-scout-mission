# Apollo 13 Educational Poster System - Product Requirements Document

**Version**: 1.1
**Date**: October 3, 2025 (Updated with optimized typography)
**Target Audience**: Boy Scouts (ages 11-17)
**Use Case**: Interactive mission timeline presentation at scout meetings/jamborees

---

## Executive Summary

Create a series of large-format educational posters (3' x 2', landscape) that tell the Apollo 13 story through narrative slides, background information, and interactive crisis decision points. Posters will be displayed on easels for groups of ~15 scouts, requiring large, readable typography and clear visual hierarchy.

---

## 1. Product Overview

### 1.1 Purpose
- Present Apollo 13 mission timeline as interactive educational experience
- Engage scouts in decision-making at key crisis points
- Teach problem-solving, teamwork, and critical thinking through historical events

### 1.2 Presentation Format
- **Physical Dimensions**: 36" W x 24" H (3 feet x 2 feet)
- **Orientation**: Landscape
- **Display Method**: Mounted on easels
- **Viewing Distance**: 6-10 feet
- **Audience Size**: ~15 scouts per session
- **Environment**: Indoor scout meeting rooms, outdoor jamboree tents

---

## 2. Poster Types & Requirements

### 2.1 Type 1: NARRATIVE Slides
**Purpose**: Tell the chronological story of mission events

**Content Requirements**:
- Clear timeline progression (GET timestamps)
- Key events with 2-3 sentence descriptions
- Visual timeline element showing mission progress
- Photos or illustrations when available
- Connection to next decision point

**Layout Requirements**:
- Large heading: Mission phase/event name
- Timeline visualization (horizontal bar or arc)
- 3-5 key events per slide maximum
- Visual breathing room (not text-heavy)
- Next slide preview/teaser

**Examples**:
- "Launch to Crisis" (Day 1-3)
- "Swinging Around the Moon" (Day 4)
- "The Long Journey Home" (Day 5-6)

### 2.2 Type 2: ADDITIONAL INFORMATION Slides
**Purpose**: Provide technical background and context

**Content Requirements**:
- Deep dive into specific technical topics
- Diagrams and schematics
- "How it works" explanations
- Safety for non-critical learning (optional content)

**Layout Requirements**:
- Large title with clear topic
- Mix of text and visuals (60/40 visual/text ratio)
- Callout boxes for key facts
- Simplified technical diagrams
- "Did You Know?" interesting facts

**Examples**:
- "What Caused the Explosion?" (oxygen tank history, damaged Teflon)
- "How Spacecraft Navigate in Space" (star sighting, IMU)
- "The Apollo Command Module" (cutaway diagram)
- "Life Support Systems" (oxygen, CO2, water, power)

### 2.3 Type 3: CRISIS DECISION Slides
**Purpose**: Interactive decision-making scenarios

**Content Requirements** (MOST IMPORTANT):
- **Situation Header**: Clear crisis statement (1-2 sentences)
- **Context Box**: 3-5 bullet points of critical information
- **Options Section**: 2-3 clearly delineated choices
  - Each option has:
    - Clear title
    - PRO bullets (2-3 items)
    - CON bullets (2-3 items)
    - Visual icon or color coding
- **Decision Prompt**: "What should the crew do?"
- NO reveal of historical decision (saved for follow-up slide)

**Layout Requirements**:
- Bold crisis statement at top
- Context in distinct colored box
- Options in equal-sized columns/panels
- **Side-by-side content layout** (proven pattern):
  - Diagram/visual: 40% width (left)
  - PROS/CONS lists: 60% width (right)
  - Maximizes horizontal space, enables larger fonts
- Color coding: Blue/Green for options, Yellow/Orange for decision prompt
- Large checkboxes or numbers for voting
- Prioritize readability over whitespace (Ed's directive: "Cluttered and readable beats pretty with white space")

**Decision Flow**:
1. Present crisis slide
2. Scouts discuss and vote
3. Leader reveals answer on separate reveal slide or verbally
4. Continue to narrative showing outcome

**Examples** (10 decision slides from MISSION_TIMELINE.md):
1. Turn Around or Free-Return?
2. Freeze or Squeeze?
3. Stars or Sun/Earth Terminator?
4. CO2 Scrubber - Build the Mailbox?
5. Water Conservation Strategy
6. Speed Up Burn (PC+2)?
7. Communication Discipline
8. Battery Jump-Start?
9. Service Module Jettison Timing
10. Computer Restart or Manual Flight?

---

## 3. Visual Design System

### 3.1 Typography (Readable from 6-10 feet)

**Font Stack** (web-safe, widely available):
- **Primary**: "Helvetica Neue", Helvetica, Arial, sans-serif (clean, readable)
- **Monospace** (for timestamps/data): "Courier New", Courier, monospace
- **Display** (optional, for titles): "Impact", "Arial Black", sans-serif

**Font Sizes** (optimized for 10-foot viewing - Decision Slide tested):
| Element | Size (px) | Size (pt) | Use Case |
|---------|-----------|-----------|----------|
| Main Heading | 140px | ~105pt | "FREEZE OR SQUEEZE?" |
| Decision Number | 90px | ~68pt | "DECISION POINT #2" |
| Section Heading | 68px | ~51pt | "⚠️ THE SITUATION" |
| Option Titles | 130px | ~98pt | "FREEZE" / "SQUEEZE" |
| **PROS/CONS Bullets** | **57px** | **~43pt** | **Critical content - optimized** ⭐ |
| Body Text | 48-56px | ~36-42pt | Context bullets, subtitles |
| Section Labels | 60px | ~45pt | "✓ PROS" / "✕ CONS" |
| Decision Prompt | 78px | ~59pt | "WHAT SHOULD THE CREW DO?" |
| Small Text | 42-52px | ~32-39pt | Footer, timestamps |

**Note**: Sizes tested and optimized on Decision Slide prototype. PROS/CONS bullets prioritized as most critical content for readability - increased from 50px to 57px (14% gain) via side-by-side layout optimization.

**Text Hierarchy**:
- Use **bold** for emphasis
- Use color for importance (red = danger, green = safe, yellow = caution)
- Maximum 3 font sizes per slide
- Line height: 1.4-1.6 for readability

### 3.2 Color Palette

**Primary Colors** (NASA/Space theme):
- **Deep Space Blue**: `#0B3D91` (NASA blue)
- **Mission White**: `#FFFFFF` (backgrounds, text)
- **Apollo Black**: `#000000` (text, accents)

**Accent Colors**:
- **Crisis Red**: `#DC143C` (danger, critical decisions)
- **Success Green**: `#2E7D32` (positive outcomes, pro bullets)
- **Caution Yellow**: `#FFA000` (warnings, important info)
- **Info Cyan**: `#00ACC1` (technical info, data)

**Backgrounds**:
- **Primary**: White or very light gray (`#F5F5F5`)
- **Accent panels**: Light blue (`#E3F2FD`), Light yellow (`#FFF9C4`)
- **Dark mode option**: Deep space blue with white text

**Usage Rules**:
- High contrast ratios (WCAG AAA: 7:1 minimum)
- Color + icon/shape (don't rely on color alone)
- Consistent color meaning across all slides

### 3.3 Layout Grid

**Canvas Dimensions**:
- **Width**: 3600 pixels (36" @ 100 DPI base, scalable)
- **Height**: 2400 pixels (24" @ 100 DPI base, scalable)
- **Aspect Ratio**: 3:2 (landscape)

**Margins & Padding**:
- **Outer margin**: 120px all sides (3.3% of width)
- **Content area**: 3360px x 2160px
- **Column gutter**: 60px
- **Section spacing**: 80-120px vertical

**Grid System**:
- 12-column grid
- Column width: ~265px
- Flexible for 2-column (decision options) or 3-column (info panels)

### 3.4 Visual Elements

**Icons & Symbols**:
- Large, simple icons (128px minimum)
- Line art style (matches NASA technical drawing aesthetic)
- Consistent stroke weight (3-4px)

**Diagrams**:
- Clean, schematic style
- High contrast
- Labeled clearly
- Arrows for flow/direction

**Photos** (if used):
- High resolution (minimum 2000px on long edge)
- Black & white or slightly desaturated for consistency
- With captions/context

**Dividers & Boxes**:
- 3-4px borders for emphasis
- Rounded corners (8-12px radius) for modern feel
- Drop shadows sparingly (for depth on decision boxes)

---

## 4. Technical Solution

### 4.1 Recommended Technology: **SVG + HTML/CSS**

**Why This Stack**:
1. **SVG (Scalable Vector Graphics)**:
   - ✅ Infinitely scalable (perfect for large format)
   - ✅ Crisp text and lines at any size
   - ✅ Can embed in HTML or export standalone
   - ✅ Easy to convert to PDF or high-res PNG
   - ✅ Precise control over layout

2. **HTML/CSS**:
   - ✅ Rapid layout development
   - ✅ Consistent styling via CSS
   - ✅ Can render to PDF via browser print
   - ✅ Can capture to PNG via Puppeteer/Playwright
   - ✅ Preview in browser at actual size

**Alternative Considered**:
- Pure SVG: Good, but more verbose for text layout
- Canvas/PNG: ❌ Raster format, quality loss at scale
- Mermaid: ❌ Limited layout control, best for flowcharts only

### 4.2 Production Workflow

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: DESIGN & CODE                                   │
│ - Create HTML file with embedded SVG + CSS              │
│ - Use viewport: 3600x2400px                             │
│ - Test in browser at 100%, 50%, 25% zoom                │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ STEP 2: PREVIEW & ITERATE                               │
│ - Open in browser (Chrome/Firefox)                      │
│ - View at actual size (browser zoom)                    │
│ - Test readability from distance                        │
│ - Adjust typography/spacing                             │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ STEP 3: EXPORT OPTIONS                                  │
│                                                          │
│ OPTION A: Browser Print to PDF                          │
│ - Set page size to 36" x 24"                            │
│ - Margins: None                                          │
│ - Scale: 100%                                            │
│ - Background graphics: ON                                │
│ - Export as PDF (vector, perfect quality)               │
│                                                          │
│ OPTION B: Playwright Screenshot                         │
│ - Use Claude Code's Playwright MCP                      │
│ - Set viewport: 3600x2400                                │
│ - Screenshot full page to PNG                            │
│ - Upscale to 10800x7200 for 300 DPI print if needed     │
│                                                          │
│ OPTION C: SVG Direct Export                             │
│ - Extract inline SVG from HTML                          │
│ - Save as .svg file                                      │
│ - Open in Inkscape/Illustrator                          │
│ - Export to PDF or high-res PNG                         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ STEP 4: PRINT                                            │
│ - Send PDF to print shop (FedEx Office, local printer)  │
│ - Specify: 36" x 24", color, matte/glossy finish        │
│ - Optional: Mount on foam core or laminate              │
│ - Cost: ~$20-40 per poster                              │
└─────────────────────────────────────────────────────────┘
```

### 4.3 File Structure

```
/apollo-mission/
├── posters/
│   ├── templates/
│   │   ├── narrative-template.html
│   │   ├── info-template.html
│   │   └── decision-template.html
│   ├── styles/
│   │   ├── common.css (shared styles)
│   │   ├── typography.css
│   │   └── colors.css
│   ├── 01-narrative-launch-to-crisis.html
│   ├── 02-decision-turn-around-or-free-return.html
│   ├── 03-info-what-caused-explosion.html
│   ├── 04-decision-freeze-or-squeeze.html
│   ├── ... (more slides)
│   └── exports/
│       ├── 01-narrative-launch-to-crisis.pdf
│       ├── 02-decision-turn-around-or-free-return.pdf
│       └── ... (exported files)
└── PRODUCT_REQUIREMENTS.md (this file)
```

### 4.4 HTML/SVG Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=3600, height=2400">
    <title>Apollo 13 - [Slide Title]</title>
    <link rel="stylesheet" href="styles/common.css">
    <style>
        /* Slide-specific styles */
        body {
            margin: 0;
            padding: 0;
            width: 3600px;
            height: 2400px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .poster {
            width: 3600px;
            height: 2400px;
            background: white;
            position: relative;
        }
    </style>
</head>
<body>
    <div class="poster">
        <!-- Content using HTML + SVG inline -->
        <svg viewBox="0 0 3600 2400" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG elements for precise graphics -->
        </svg>

        <!-- OR use HTML divs for text-heavy layouts -->
        <div class="content">
            <h1>Slide Title</h1>
            <!-- More content -->
        </div>
    </div>
</body>
</html>
```

### 4.5 Print Quality Specifications

**For Professional Printing**:
- **File Format**: PDF (vector preferred) or PNG
- **Resolution** (if PNG): 300 DPI minimum
  - 36" x 24" @ 300 DPI = 10,800 x 7,200 pixels
  - Our base (100 DPI) can be upscaled or exported at 300 DPI
- **Color Mode**: RGB (for digital print) or CMYK (for offset print)
- **Bleed**: Add 0.125" bleed if print shop requires
- **Fonts**: Embed all fonts in PDF

**Print Shop Options**:
1. **FedEx Office**: $25-35 per 36x24 poster, same-day
2. **Local Print Shop**: $20-40, custom mounting options
3. **Online** (Vistaprint, etc.): $15-25, shipping time
4. **DIY Large Format Printer**: If available at school/scout facility

**Mounting Options**:
- **Foam Core**: Rigid, lightweight (~$10-15 extra)
- **Lamination**: Protective, glossy or matte (~$15-20 extra)
- **Gator Board**: Professional, sturdy (~$25-35 extra)

---

## 5. Content Inventory

### 5.1 Required Slides (Minimum Viable Product)

**NARRATIVE Slides** (6 total):
1. Mission Overview & Launch
2. The Explosion (GET 55:54:53)
3. Lifeboat Configuration & Moon Flyby
4. The Long Cold Journey
5. Powering Up & Jettison
6. Re-Entry & Splashdown

**CRISIS DECISION Slides** (10 total - from MISSION_TIMELINE.md):
1. ⚡ Turn Around or Free-Return?
2. 🥶 Freeze or Squeeze?
3. ✨ Stars or Sun/Earth Terminator Navigation?
4. 💨 Build CO2 Scrubber Mailbox?
5. 💧 Water Conservation Strategy?
6. 🚀 Speed Up Burn (PC+2)?
7. 📻 Communication Discipline?
8. 🔋 Battery Jump-Start?
9. 🛸 Service Module Jettison Timing?
10. 🎯 Computer Restart or Manual Flight?

**ADDITIONAL INFO Slides** (8 total):
1. 💥 What Caused the Explosion?
2. 🛰️ Spacecraft Configuration (3-module system)
3. 🌌 Navigation Methods (star sighting, AOT, COAS)
4. 🔧 The Mailbox (assembly diagram)
5. 🌡️ Survival Conditions (cold, water, food)
6. 🎯 Re-Entry Corridor Physics
7. 👨‍🚀 Meet the Crew (Lovell, Swigert, Haise)
8. 🏆 Lessons Learned

**TOTAL**: 24 slides minimum

### 5.2 Suggested Presentation Order

```
INTRO
├─ 01. Narrative: Mission Overview & Launch
├─ 02. Info: Meet the Crew
├─ 03. Narrative: The Explosion
├─ 04. Info: What Caused the Explosion?
│
CRISIS SEQUENCE
├─ 05. Decision: Turn Around or Free-Return?
├─ 06. Decision: Freeze or Squeeze?
├─ 07. Info: Spacecraft Configuration
├─ 08. Narrative: Lifeboat & Moon Flyby
├─ 09. Decision: Stars or Sun/Earth Navigation?
├─ 10. Info: Navigation Methods
├─ 11. Decision: Build CO2 Mailbox?
├─ 12. Info: The Mailbox Assembly
├─ 13. Decision: Water Conservation?
├─ 14. Decision: Speed Up Burn (PC+2)?
├─ 15. Narrative: The Long Cold Journey
├─ 16. Info: Survival Conditions
├─ 17. Decision: Communication Discipline?
├─ 18. Decision: Battery Jump-Start?
├─ 19. Decision: SM Jettison Timing?
├─ 20. Narrative: Powering Up & Jettison
├─ 21. Decision: Computer Restart or Manual?
├─ 22. Info: Re-Entry Corridor Physics
├─ 23. Narrative: Re-Entry & Splashdown
└─ 24. Info: Lessons Learned
```

---

## 6. Success Criteria

### 6.1 Functional Requirements
- ✅ All text readable from 10 feet away
- ✅ Decision options clearly delineated
- ✅ Consistent visual style across all slides
- ✅ Accurate technical information (NASA sources)
- ✅ Print quality at 36" x 24" (sharp, no pixelation)

### 6.2 User Experience Goals
- Scouts can understand crisis within 30 seconds
- Options are clear enough to debate (2-3 minutes discussion)
- Visual hierarchy guides eye naturally
- Engaging enough to hold attention for 30-45 minute session

### 6.3 Educational Outcomes
- Scouts learn 10 key decision points
- Understand cause-effect relationships
- Appreciate teamwork and problem-solving
- Remember "successful failure" lesson

---

## 7. Production Timeline

### Phase 1: Design & Prototype (Week 1) ✅ COMPLETE
- [x] Create design system/style guide
- [x] Build decision slide template
- [x] Prototype Decision Slide #2: "Freeze or Squeeze?"
- [x] Review and iterate (5 iterations completed)
- [x] Optimize typography for 10-foot viewing
- [x] Achieve perfect fit (2401px height, zero overflow)
- [ ] Build narrative template (pending)
- [ ] Build info template (pending)

### Phase 2: Content Creation (Week 2-3)
- [ ] Create 6 narrative slides
- [ ] Create 10 decision slides
- [ ] Create 8 info slides
- [ ] Internal review

### Phase 3: Testing & Refinement (Week 4)
- [ ] Print test slide at full size
- [ ] Test readability from distance
- [ ] Test with sample scout group
- [ ] Refine based on feedback

### Phase 4: Production (Week 5)
- [ ] Export all slides to PDF
- [ ] Send to print shop
- [ ] Receive and inspect prints
- [ ] Prepare presentation guide for leaders

---

## 8. Next Steps

1. **Review and Approve PRD** ✅
2. **Select Prototype Slide** - Recommend: "Decision: Freeze or Squeeze?" (iconic, simple, clear trade-offs)
3. **Generate Prototype HTML/SVG**
4. **Preview in Browser**
5. **Export to PDF/PNG**
6. **Review and Provide Feedback**
7. **Iterate on Design**
8. **Proceed with Full Set**

---

## 9. Technical Constraints & Considerations

### 9.1 Claude Code Capabilities
**Can Generate**:
- ✅ HTML/CSS files
- ✅ Inline SVG graphics
- ✅ Complete poster layouts
- ✅ Can use Playwright to render and screenshot

**Cannot Generate Directly**:
- ❌ High-res raster images (but can code HTML to be rendered)
- ❌ Advanced photo editing
- ❌ 3D renderings

**Recommendation**: Stick to HTML/SVG with clean typography and diagrams. Use NASA archival photos sparingly (sourced separately).

### 9.2 Font Licensing
- Use web-safe fonts (Helvetica, Arial, Impact) - no licensing issues
- If custom fonts needed, user must acquire license
- Google Fonts option: Roboto, Open Sans (free, commercial-safe)

### 9.3 Browser Compatibility
- Test in Chrome (recommended for Playwright export)
- Ensure consistent rendering across browsers
- Use CSS prefixes if needed (-webkit-, -moz-)

---

## 10. Appendix

### A. Readability Reference

**Font Size from Distance**:
| Viewing Distance | Minimum Font Size |
|------------------|-------------------|
| 5 feet          | 24pt             |
| 6-8 feet        | 32pt             |
| 10-12 feet      | 48pt             |
| 15+ feet        | 72pt             |

For our 6-10 foot target: **32-48pt body, 72-96pt headings**

### B. Color Contrast Checker
- Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Minimum ratio: 4.5:1 (normal text)
- Minimum ratio: 3:1 (large text 24pt+)
- Our target: 7:1 (AAA standard)

### C. Print Shop Specifications Template

```
JOB SPECIFICATIONS
──────────────────
Project: Apollo 13 Educational Posters
Quantity: 24 posters
Size: 36" W x 24" H (landscape)
Format: PDF (vector) or PNG (300 DPI)
Color: Full color (RGB or CMYK)
Paper: 100lb gloss text or 10pt card stock
Finish: Optional lamination (matte or gloss)
Mounting: Optional foam core
Turnaround: [Specify deadline]
Delivery: [Pickup or ship]
```

### D. Accessibility Notes
While these are physical posters, consider:
- High contrast for visibility
- Color + text labels (not color alone)
- Simple language (avoid jargon)
- Diagrams with clear labels
- Large touch points for interactive elements

---

**Document prepared for**: Ed's Apollo 13 Boy Scout Educational Program
**Technology stack**: HTML/CSS + SVG, exported via browser or Playwright
**Target output**: 24 posters @ 36" x 24" landscape, professional print quality

---

## Revision History

**v1.1 - October 3, 2025**:
- ✅ Decision slide prototype completed and optimized
- ✅ Side-by-side layout pattern established (diagrams 40% + PROS/CONS 60%)
- ✅ Typography optimized: PROS/CONS bullets 57px (14% increase from initial 50px)
- ✅ Perfect vertical fit achieved: 2401px (1px rounding tolerance)
- ✅ Updated font size specifications based on tested prototype
- ✅ Added layout pattern documentation for decision slides
- 📁 Prototype file: `/Users/robgruhl/Projects/apollo-mission/posters/02-decision-freeze-or-squeeze.html`
- 📸 Screenshot: `.playwright-mcp/final-optimized-57px-bullets.png`

**v1.0 - October 3, 2025**:
- Initial PRD with design system, requirements, and technical approach

*Status: Decision slide template complete and optimized. Ready to scale production.*
