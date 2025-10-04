# Apollo 13 Educational Posters - Content Files

This directory contains structured text content for all 24 Apollo 13 educational posters.

## Directory Structure

```
content/
├── decision/     (10 crisis decision point slides)
├── narrative/    (6 story progression slides)
├── info/         (8 background information slides)
└── README.md     (this file)
```

## File Format

All content files use a structured text format with sections marked by `===`:

```
SLIDE TYPE #NUMBER
TITLE
Subtitle/Timestamp

=== SECTION NAME ===
Content here...

=== OPTION 1: TITLE ===
Subtitle: Description

PROS:
• Bullet point
• Bullet point

CONS:
• Bullet point
• Bullet point
```

This format can be easily parsed and converted to HTML posters matching the prototype design in `/posters/02-decision-freeze-or-squeeze.html`.

## Content Inventory

### Decision Slides (10 total)
Crisis decision points with PROS/CONS format:

1. **01-turn-around-or-free-return.txt** - Turn around or loop around Moon?
2. **02-freeze-or-squeeze.txt** - Stay in CM or move to LM?
3. **03-stars-or-sun-earth-navigation.txt** - Star sighting or Sun/Earth terminator?
4. **04-build-co2-mailbox.txt** - Build CO2 scrubber adapter?
5. **05-water-conservation.txt** - How to ration water?
6. **06-speed-up-pc2-burn.txt** - Perform PC+2 burn to speed up?
7. **07-communication-discipline.txt** - Maintain comms or radio silence?
8. **08-battery-jump-start.txt** - Jump-start CM batteries from LM?
9. **09-service-module-jettison-timing.txt** - Early or late SM jettison?
10. **10-computer-restart-or-manual.txt** - Restart frozen computer or manual re-entry?

### Narrative Slides (6 total)
Story progression from launch to splashdown:

1. **01-launch-and-mission-overview.txt** - Mission setup, crew, spacecraft
2. **02-the-explosion.txt** - GET 55:54:53, "Houston, we've had a problem"
3. **03-lifeboat-and-moon-flyby.txt** - Moving to LM, swinging around Moon
4. **04-the-long-cold-journey.txt** - Days 5-6, survival conditions
5. **05-powering-up-and-jettison.txt** - Battery jump-start, SM/LM jettison
6. **06-reentry-and-splashdown.txt** - Final approach, re-entry, safe landing

### Information Slides (8 total)
Technical background and context:

1. **01-meet-the-crew.txt** - Lovell, Swigert, Haise biographies
2. **02-what-caused-the-explosion.txt** - Oxygen tank failure investigation
3. **03-spacecraft-configuration.txt** - CM, SM, LM three-module system
4. **04-navigation-methods.txt** - Star sighting, AOT, COAS, Sun/Earth alignment
5. **05-the-mailbox.txt** - CO2 scrubber adapter assembly
6. **06-survival-conditions.txt** - Temperature, water, power, sleep challenges
7. **07-reentry-corridor-physics.txt** - Re-entry angle, heat, g-forces
8. **08-lessons-learned.txt** - Technical and cultural lessons from Apollo 13

## Content Guidelines

### Tone and Style
- **Direct and engaging** - Written for Boy Scouts ages 11-17
- **Factual accuracy** - All data verified against NASA sources
- **"Cluttered and readable"** - Dense content prioritized over whitespace
- **Action-oriented** - Focus on decisions and consequences

### Formatting Conventions
- **GET timestamps** - Ground Elapsed Time (mission clock from launch)
- **Measurements** - Imperial units (feet, miles, °F) with metric in parentheses
- **Checkmarks** - ✅ for success, ❌ for problems, ⏳ for pending
- **Emojis** - Used sparingly for visual markers (🚀, 🌕, 🏠, etc.)

### Decision Slide Format
All 10 decision slides follow this structure:
1. **THE SITUATION** - Context bullets (3-5 items)
2. **OPTION 1** - Title, subtitle, PROS (3-5), CONS (3-5)
3. **OPTION 2** - Title, subtitle, PROS (3-5), CONS (3-5)
4. **DECISION PROMPT** - "🤔 WHAT SHOULD THE CREW DO?"
5. **HISTORICAL DECISION** - What NASA actually chose and why

### Information Slide Topics
Each info slide covers a specific technical topic with:
- Clear explanations of complex concepts
- Diagrams and visual descriptions
- "Did You Know?" interesting facts
- Connection to mission events

## Usage

### Converting to HTML Posters
1. Parse text file sections using `===` delimiters
2. Apply CSS styles from prototype poster
3. Use side-by-side layout (40% diagrams, 60% PROS/CONS)
4. Export to PDF at 3600×2400px (36" × 24")

### Presentation Order
Recommended flow for Boy Scout presentations:

```
INTRO
01. Narrative: Launch & Mission Overview
02. Info: Meet the Crew

CRISIS BEGINS
03. Narrative: The Explosion
04. Info: What Caused the Explosion?
05. Decision: Turn Around or Free-Return?
06. Decision: Freeze or Squeeze?

SURVIVAL PHASE
07. Info: Spacecraft Configuration
08. Narrative: Lifeboat & Moon Flyby
09. Decision: Stars or Sun/Earth Navigation?
10. Info: Navigation Methods
11. Decision: Build CO2 Mailbox?
12. Info: The Mailbox
13. Decision: Water Conservation
14. Info: Survival Conditions
15. Decision: Speed Up Burn (PC+2)?
16. Narrative: The Long Cold Journey
17. Decision: Communication Discipline?

FINAL APPROACH
18. Decision: Battery Jump-Start?
19. Decision: SM Jettison Timing?
20. Narrative: Powering Up & Jettison
21. Decision: Computer Restart or Manual?
22. Info: Re-Entry Corridor Physics
23. Narrative: Re-Entry & Splashdown
24. Info: Lessons Learned
```

## Source Materials

Content verified against:
- NASA Apollo 13 Flight Journal
- NASA Technical Reports
- Apollo 13 Mission Report
- Crew debriefs and transcripts
- `/MISSION_TIMELINE.md`
- `/corrected-materials.md`

## Future Additions

Potential enhancements:
- Spanish translations for bilingual troops
- Audio narration scripts
- Quiz questions for each slide
- Interactive elements for digital versions

## Credits

**Content Development**: October 2025
**Source Material**: NASA Apollo 13 Flight Journal
**Format**: Structured text for large-format posters (36" × 24")
**Target Audience**: Boy Scouts ages 11-17
**Purpose**: Interactive Apollo 13 educational program

---

**Status**: All 24 content files complete ✅
**Next Step**: Convert to HTML posters using prototype template
