# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apollo 13 Interactive Experience - A mobile-first web application for the 2026 Elevate Scout Jamboree. This is a static HTML/CSS/JavaScript site that tells the story of NASA's Apollo 13 rescue mission through 24 interactive slides, including narrative content, decision points, and educational information.

**Status**: All 24 slides complete (branch: `interactive-game`)
**Hosting**: GitHub Pages
**Target**: Zero dependencies, static deployment, QR code accessible

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript ES6+ (no frameworks)
- **Hosting**: GitHub Pages (serves from `interactive-game` branch)
- **Images**: WebP with PNG/JPG fallbacks, optimized for mobile
- **Design**: Mobile-first responsive, WCAG 2.1 AA compliant

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

### Image Optimization

```bash
# Resize large images (macOS)
sips -Z 1200 image.jpg

# Convert to WebP (requires cwebp)
cwebp -q 80 input.jpg -o output.webp
```

## Architecture

### File Structure

```
/
├── index.html              # Landing page
├── timeline.html           # Timeline navigator
├── assets/
│   ├── css/style.css      # Single stylesheet with CSS variables
│   ├── js/app.js          # Core interactions (navigation, decisions, progress)
│   └── images/            # Web-optimized images (WebP + fallbacks)
└── slides/
    ├── 01-launch.html     # Narrative slide example
    ├── 02-freeze-squeeze.html  # Decision slide example
    ├── 03-spacecraft.html # Info slide example
    └── [21 more slides...]
```

### Slide Types

1. **Narrative Slides** (6 total) - Story-driven, chronological events with images
2. **Decision Slides** (10 total) - Interactive choices with pros/cons, reveals NASA's actual decision
3. **Info Slides** (8 total) - Background information with expandable accordion sections

### JavaScript Architecture (app.js)

Core functions:
- `initNavigation()` - Handles page transitions and smooth scrolling
- `initDecisions()` - Powers decision slide interactivity (choice selection, result reveal)
- `initProgressTracking()` - Saves visited slides to localStorage
- `initKeyboardNav()` - Arrow key navigation between slides
- `calculateScore()` - Compares user decisions to NASA's actual choices
- `generateShareURL()` - Creates shareable results with scout name/troop

**Important**: Decision tracking uses localStorage with keys:
- `decisions` - Object mapping slideId → {choice, timestamp}
- `visitedSlides` - Array of visited slide IDs

### CSS Architecture (style.css)

Single stylesheet organized with:
- CSS Variables (`:root`) for colors, spacing, typography
- Mobile-first responsive design
- Component classes: `.option`, `.timeline`, `.slide`, etc.
- No external dependencies or frameworks

## Common Development Tasks

### Adding a New Slide

1. Copy appropriate template from existing slide (narrative/decision/info)
2. Update `data-slide-id` in `<body>` tag
3. Update navigation links (prev/next) in footer
4. Add optimized images to `assets/images/`
5. Test locally, then commit and push

### Modifying Decision Logic

Correct answers defined in `app.js`:
```javascript
const CORRECT_ANSWERS = {
    '2': 'squeeze',      // Freeze or Squeeze
    '5': 'freereturn',   // Turn Around Decision
    '9': 'buildmailbox', // CO2 Mailbox
    '12': 'shutdown'     // Power Conservation
};
```

Match `data-option` values in decision slide HTML.

### Updating Styles

All styles in single `assets/css/style.css` file. Uses CSS variables for consistency:
- Colors: `--nasa-blue`, `--crisis-red`, `--success-green`, etc.
- Spacing: `--space-xs` through `--space-xl`
- Typography: `--text-xs` through `--text-2xl`

## Important Implementation Notes

### Progressive Enhancement
- Site works without JavaScript (basic HTML navigation)
- JavaScript adds: smooth scrolling, decision interactions, progress tracking, keyboard shortcuts
- All content accessible with JS disabled

### Mobile Optimization
- Touch-friendly buttons (min 44×44px)
- Lazy loading images (`loading="lazy"`)
- Responsive breakpoints: 320px (mobile), 768px (tablet), 1024px+ (desktop)
- Test on actual devices, not just DevTools

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- Alt text on all informative images
- Keyboard navigable (Tab, Arrow keys)
- WCAG 2.1 AA color contrast (4.5:1 minimum)
- Screen reader tested with VoiceOver

### Performance Budget
- Target: <500KB per page
- Lighthouse score: >90 all categories
- First Contentful Paint: <1.5s
- Time to Interactive: <3s on 3G

## Git Workflow

**Main branch**: Contains original project materials
**Interactive-game branch**: Live website (GitHub Pages serves from here)

Always work in `interactive-game` branch for website changes.

## Documentation

Key planning docs (for reference):
- `README.md` - Project overview and deployment instructions
- `DEPLOYMENT_GUIDE.md` - GitHub Pages setup and troubleshooting
- `INTERACTIVE_TECHNICAL_PLAN.md` - Detailed technical architecture
- `INTERACTIVE_REQUIREMENTS.md` - Feature requirements and specifications

## Testing Checklist

Before deploying changes:
- [ ] Test in Chrome (desktop + mobile view)
- [ ] Test in Safari (iOS critical for scouts)
- [ ] Verify all navigation links work
- [ ] Check images load (WebP with fallbacks)
- [ ] Test keyboard navigation (Arrow keys)
- [ ] Validate HTML (validator.w3.org)
- [ ] Run Lighthouse audit (target >90)

## Contact & Presentation

**Presenter**: Ed Gruhl, Scout District Commissioner, Glacial Trails District
**Event**: 2026 Elevate Scout Jamboree - NASA Tent, Apollo Table
**Target Audience**: Scouts ages 11-17
**Email**: Use noreply github email for commits
