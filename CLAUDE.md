# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apollo 13 Interactive Experience — a mobile-first static web app built for the **2026 Elevate Scout Jamboree** (NASA Tent, Apollo Table, presented by Ed Gruhl). Scouts scan a QR code on the exhibit posters, open the site on their phones, and relive NASA's Apollo 13 rescue by making the same 10 critical decisions the real mission faced.

The repo is also **itself an exhibit**: it's intentionally simple (zero dependencies, pure HTML/CSS/JS) so scouts pursuing the Programming, Digital Technology, and Space Exploration merit badges can read, run, and modify it.

**Status**: ✅ Complete (34 slides, 10 scored decisions)
**Live Site**: https://robgruhl.github.io/apollo-13-scout-mission/
**Branch**: `main` (auto-deploys to GitHub Pages from root)

---

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript ES6+ (NO frameworks)
- **Hosting**: GitHub Pages (free, auto-deploy from `main` branch root)
- **Storage**: localStorage for progress tracking (client-side only)
- **Design**: Mobile-first responsive, WCAG 2.1 AA compliant

---

## Key Commands

### Local Development

```bash
# Simple HTTP server (Python)
python3 -m http.server 8000
# Visit: http://localhost:8000

# Or use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Deployment

```bash
# All changes auto-deploy to GitHub Pages
git add .
git commit -m "Description of changes"
git push origin main

# Site deploys automatically in 1-2 minutes
# Live at: https://robgruhl.github.io/apollo-13-scout-mission/
```

### Testing

```bash
# Verify all navigation links
./scripts/verify-navigation.sh

# Verify button text format
./scripts/verify-button-text.sh
```

---

## Repository Layout

```
/
├── index.html              # Landing page (with score sharing)
├── timeline.html           # Timeline navigator
├── slides/                 # 34 slides: 01-launch.html … 34-merit-badge-space-exploration.html
├── assets/
│   ├── css/style.css      # Single stylesheet (~1,050 lines)
│   ├── js/app.js          # All interactivity (~580 lines)
│   └── images/            # Web-optimized images (only referenced files)
├── exhibit/               # The physical jamboree table: poster/card previews, QR codes
├── docs/
│   ├── DEPLOYMENT_GUIDE.md         # GitHub Pages setup
│   ├── SITEMAP_SPECIFICATION.md    # Navigation map for every page
│   └── SCORING_SYSTEM_DESIGN.md    # Scoring, localStorage, URL sharing
├── scripts/               # Verification scripts (navigation, button text)
├── CLAUDE.md              # This file
├── README.md              # Project overview (scout/merit-badge oriented)
└── LICENSE                # MIT
```

**Not in this repo**: print masters (~170 MB of 300 dpi poster/card PNGs), design drafts, and planning notes live in the private local archive repo `~/Projects/apollo-working-materials/` (see `exhibit/README.md`).

### Page inventory (36 pages)

- `index.html` + `timeline.html`
- Slides 01–28: the mission story — narrative, info, and 10 decision slides
- Slide 29: Meet Ed Gruhl (presenter page)
- Slide 30: Mission completion (score, rank, share)
- Slides 31–34: Merit badge hub + Programming / Digital Technology / Space Exploration detail pages

---

## JavaScript Architecture (assets/js/app.js)

**Core Functions**:
- `initNavigation()` - Page transitions, smooth scrolling
- `initDecisions()` - Decision slide interactivity (choice selection, result reveal)
- `initProgressTracking()` - Saves visited slides to localStorage
- `initKeyboardNav()` - Arrow key navigation
- `calculateScore()` - Compares user decisions to NASA's actual choices
- `getScoreRank()` - Maps score percentage to rank
- `generateShareURL()` - Creates shareable URL with scout name, troop, and score

**Decision Tracking** (localStorage keys):
- `decisions` - Object: `{slideId: {choice, timestamp}}`
- `visitedSlides` - Array: `["1", "2", "3", ...]`

**Scoring System** (10 critical decisions):
```javascript
const CORRECT_ANSWERS = {
    '2': 'squeeze',           // Decision #1: Freeze or Squeeze → move to LM
    '5': 'freereturn',        // Decision #2: Turn Around → free-return around the Moon
    '6': 'burn',              // Decision #3: PC+2 Burn → speed up return
    '10': 'buildmailbox',     // Decision #4: CO2 Mailbox → build the adapter
    '11': 'sunearth',         // Decision #5: Navigation → Sun/Earth alignment
    '13': 'shutdown',         // Decision #6: CM Power → shut down to save batteries
    '14': 'extreme',          // Decision #7: Water → extreme rationing
    '15': 'silence',          // Decision #8: Communication → radio silence
    '17': 'jumpstart',        // Decision #9: Battery → LM-to-CM jump-start
    '18': 'early'             // Decision #10: SM Jettison → early, to photograph damage
};
```

**Ranks** (percentage of 10 decisions correct):
- 100% (10/10) → Mission Commander 🏆
- 80–99% (8–9) → Flight Director ⭐
- 60–79% (6–7) → Flight Controller 🎯
- <60% (0–5) → Ground Crew 📡

Scouts scoring 5+ correct earn the physical **Apollo reward card** at the jamboree table (its artwork reads "Mission Commander — earned, not given"; see `exhibit/`).

### CSS Architecture (assets/css/style.css)

Single stylesheet with:
- CSS Variables (`:root`) for colors, spacing, typography
- Mobile-first responsive design (320px → 1920px+)
- Component classes: `.option`, `.timeline`, `.slide`, etc.
- No external dependencies

---

## Common Development Tasks

### Adding/Modifying a Slide

1. Edit the HTML file in `slides/`
2. Ensure `data-slide-id` matches slide number
3. Update navigation links (prev/next) following standard format:
   - Previous: `← Previous` (except slide 01: `← Home`)
   - Next: `Next →` (except the last slide in the flow: `🏠 Home`)
4. Test locally, then commit and push

### Modifying Decision Logic

Edit `CORRECT_ANSWERS` in `assets/js/app.js` — keys are slide numbers, values must match the `data-option` attributes in that slide's HTML.

### Updating Styles

All styles in `assets/css/style.css`. Uses CSS variables:
- Colors: `--nasa-blue`, `--crisis-red`, `--success-green`, etc.
- Spacing: `--space-xs` through `--space-xl`
- Typography: `--text-xs` through `--text-2xl`

---

## Important Implementation Notes

### Progressive Enhancement
- Site works without JavaScript (basic HTML navigation)
- JavaScript adds: smooth scrolling, decision interactions, progress tracking, keyboard shortcuts
- All content accessible with JS disabled

### Mobile Optimization
- Touch-friendly buttons (min 44×44px)
- Lazy loading images (`loading="lazy"`)
- Responsive breakpoints: 320px (mobile), 768px (tablet), 1024px+ (desktop)
- **Test on actual devices**, not just DevTools (especially Safari iOS — scouts will overwhelmingly be on phones)

### Navigation Standards
- All navigation follows docs/SITEMAP_SPECIFICATION.md
- Top nav: `🏠 Home` | `📅 Timeline` | Progress indicator
- Footer nav: `← Previous` | `Next →` (with exceptions for first/last)
- Keyboard: Arrow keys work on all slides

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- Alt text on all informative images
- WCAG 2.1 AA color contrast (4.5:1 minimum)
- Keyboard navigable, screen reader tested

### Performance Budget
- Target: <500KB per page
- Lighthouse score: >90 all categories
- Works on spotty jamboree cell coverage — keep pages lean

---

## Git Workflow

**Main branch**: Live website (GitHub Pages serves from root of main branch). All website changes are committed to `main`.

Use github noreply email for commits. Include co-authoring footer:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Keep this repo small**: never commit print masters, drafts, or large binaries here — they belong in `~/Projects/apollo-working-materials/`. The repo history already carries old poster binaries; don't add more.

---

## Testing Checklist

Before deploying changes:
- [ ] Test in Chrome (desktop + mobile view)
- [ ] Test in Safari (iOS critical for scouts)
- [ ] Run `./scripts/verify-navigation.sh` (all links)
- [ ] Run `./scripts/verify-button-text.sh` (button format)
- [ ] Check images load and every `src`/`href` resolves
- [ ] Test keyboard navigation (Arrow keys)
- [ ] Validate HTML (validator.w3.org)
- [ ] Run Lighthouse audit (target >90)

---

## Contact & Presentation

**Presenter**: Ed Gruhl, Scout District Commissioner, Glacial Trails District
**Event**: 2026 Elevate Scout Jamboree - NASA Tent, Apollo Table
**Target Audience**: Scouts ages 11-17
**Email**: Use noreply github email for commits

---

## Quick Reference

**Live Site**: https://robgruhl.github.io/apollo-13-scout-mission/
**Total Pages**: 36 (index + timeline + 34 slides)
**Decisions Tracked**: 10 (slides 2, 5, 6, 10, 11, 13, 14, 15, 17, 18)
**Ranks**: 4 tiers (Ground Crew → Mission Commander)
**Code Size**: ~580 lines JS, ~1,050 lines CSS
**Dependencies**: Zero (pure HTML/CSS/JS)
