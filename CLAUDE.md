# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apollo 13 Interactive Experience - A complete mobile-first web application for the 2026 Elevate Scout Jamboree. This is a static HTML/CSS/JavaScript site that tells the story of NASA's Apollo 13 rescue mission through 24 interactive slides with scoring and social sharing features.

**Status**: ✅ Complete (24 slides implemented)
**Live Site**: https://robgruhl.github.io/apollo-mission/
**Branch**: `interactive-game` (auto-deploys to GitHub Pages)
**Target**: Zero dependencies, static deployment, QR code accessible

---

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript ES6+ (NO frameworks)
- **Hosting**: GitHub Pages (free, auto-deploy from `interactive-game` branch)
- **Storage**: localStorage for progress tracking (client-side only)
- **Images**: WebP with PNG/JPG fallbacks, lazy loaded
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
git push origin interactive-game

# Site deploys automatically in 1-2 minutes
# Live at: https://robgruhl.github.io/apollo-mission/
```

### Testing

```bash
# Verify all navigation links
./verify-navigation.sh

# Verify button text format
./verify-button-text.sh
```

---

## Architecture

### File Structure

```
/
├── index.html              # Landing page (with score sharing)
├── timeline.html           # Timeline navigator
├── assets/
│   ├── css/style.css      # Single stylesheet (~580 lines)
│   ├── js/app.js          # Core interactions (~370 lines)
│   └── images/            # Web-optimized images
├── slides/
│   └── 01-24.html         # All 24 interactive slides
├── docs/archive/          # Historical planning documents
├── CLAUDE.md              # This file
├── README.md              # Project overview
├── DEPLOYMENT_GUIDE.md    # GitHub Pages setup
├── SITEMAP_SPECIFICATION.md    # Navigation map
└── SCORING_SYSTEM_DESIGN.md    # Scoring system docs
```

### Slide Types

1. **Narrative** (6 slides) - Story-driven, chronological events
2. **Decision** (4 slides) - Interactive choices with scoring
3. **Info** (14 slides) - Background information, expandable content

### JavaScript Architecture (app.js)

**Core Functions**:
- `initNavigation()` - Page transitions, smooth scrolling
- `initDecisions()` - Decision slide interactivity (choice selection, result reveal)
- `initProgressTracking()` - Saves visited slides to localStorage
- `initKeyboardNav()` - Arrow key navigation
- `calculateScore()` - Compares user decisions to NASA's actual choices (4 decisions)
- `generateShareURL()` - Creates shareable URL with scout name, troop, and score

**Decision Tracking** (localStorage keys):
- `decisions` - Object: `{slideId: {choice, timestamp}}`
- `visitedSlides` - Array: `["1", "2", "3", ...]`

**Scoring System** (4 critical decisions):
```javascript
const CORRECT_ANSWERS = {
    '2': 'squeeze',      // Freeze or Squeeze
    '5': 'freereturn',   // Turn Around Decision
    '9': 'buildmailbox', // CO2 Mailbox
    '12': 'shutdown'     // Power Conservation
};
```

**Ranks** (based on percentage):
- 100% → Mission Commander 🏆
- 75-99% → Flight Director ⭐
- 50-74% → Flight Controller 🎯
- 0-49% → Ground Crew 📡

### CSS Architecture (style.css)

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
   - Next: `Next →` (except slide 24: `🏠 Home`)
4. Test locally, then commit and push

### Modifying Decision Logic

Edit `CORRECT_ANSWERS` in `assets/js/app.js`:
```javascript
const CORRECT_ANSWERS = {
    '2': 'squeeze',      // Match data-option value in HTML
    '5': 'freereturn',
    '9': 'buildmailbox',
    '12': 'shutdown'
};
```

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
- **Test on actual devices**, not just DevTools (especially Safari iOS)

### Navigation Standards
- All navigation follows SITEMAP_SPECIFICATION.md
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
- First Contentful Paint: <1.5s
- Time to Interactive: <3s on 3G

---

## Git Workflow

**Main branch**: Contains original project materials (not used for website)
**interactive-game branch**: Live website (GitHub Pages serves from here)

Always work in `interactive-game` branch for website changes.

**Commit Format**:
Use github noreply email for commits. Include co-authoring footer:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Documentation

### Current Documentation (root folder)
- **README.md** - Project overview, quick start, features
- **DEPLOYMENT_GUIDE.md** - GitHub Pages setup and troubleshooting
- **SITEMAP_SPECIFICATION.md** - Complete navigation map (26 pages)
- **SCORING_SYSTEM_DESIGN.md** - Scoring system, localStorage, URL sharing

### Archived Documentation (docs/archive/)
- Historical planning docs from development phase
- Reference only - may contain outdated information

---

## Testing Checklist

Before deploying changes:
- [ ] Test in Chrome (desktop + mobile view)
- [ ] Test in Safari (iOS critical for scouts)
- [ ] Verify all navigation links work
- [ ] Check images load (WebP with fallbacks)
- [ ] Test keyboard navigation (Arrow keys)
- [ ] Run `./verify-navigation.sh` (all links)
- [ ] Run `./verify-button-text.sh` (button format)
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

**Live Site**: https://robgruhl.github.io/apollo-mission/
**Total Slides**: 24 (6 narrative, 4 decision, 14 info/support)
**Decisions Tracked**: 4 (slides 2, 5, 9, 12)
**Ranks**: 4 tiers (Ground Crew → Mission Commander)
**File Size**: ~370 lines JS, ~580 lines CSS, 24 HTML pages
**Dependencies**: Zero (pure HTML/CSS/JS)
