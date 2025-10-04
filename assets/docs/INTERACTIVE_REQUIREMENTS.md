# Apollo 13 Interactive Web Experience - Product Requirements Document

**Version**: 1.0
**Date**: October 4, 2025
**Target Audience**: Boy Scouts (ages 11-17) - Self-guided digital experience
**Use Case**: QR code accessible walkthrough for individual or small group exploration
**Branch**: `interactive-game`

---

## Executive Summary

Create a lightweight, mobile-friendly interactive web experience that guides scouts through the Apollo 13 mission story. This digital version complements the physical poster system by providing an accessible, self-paced walkthrough that can be accessed via QR code, used as a leave-behind, or explored independently.

---

## 1. Product Overview

### 1.1 Purpose
- Provide accessible digital version of Apollo 13 story
- Enable self-guided exploration via QR code
- Offer interactive decision-making experience without requiring physical posters
- Create shareable, archivable educational resource

### 1.2 Key Differences from Static Posters
| Feature | Static Posters | Interactive Web |
|---------|---------------|-----------------|
| Audience | Groups of 15, leader-facilitated | Individual/small groups, self-guided |
| Access | Physical posters at scout meetings | QR code, web link, any device |
| Content Density | High - optimized for 10-foot viewing | Moderate - optimized for screen reading |
| Interaction | Discussion-based voting | Click-through navigation, expandable details |
| Navigation | Linear, leader-controlled | Non-linear, user-controlled with suggested path |
| Images | High-res for printing | Web-optimized for fast loading |

### 1.3 Access Method
- **Primary**: QR code printed on handout cards or poster
- **Secondary**: Direct URL link
- **Tertiary**: Offline HTML files on USB drive

---

## 2. User Experience

### 2.1 User Journey

```
ENTRY
├─ QR Code Scan → Landing Page
│  └─ Mission Overview + "Start Mission" CTA
│
NAVIGATION
├─ Linear Story Mode (default)
│  ├─ Intro → Crisis → Decisions → Resolution → Lessons
│  └─ "Next" / "Previous" navigation
│
├─ Explore Mode
│  ├─ Timeline view - jump to any moment
│  ├─ Decisions - see all 10 crisis points
│  └─ Learn More - background information
│
INTERACTION
├─ Decision Points (10 slides)
│  ├─ Read situation
│  ├─ Click option to reveal PROS/CONS
│  ├─ Make choice (button click)
│  └─ See historical decision + outcome
│
└─ EXIT
   ├─ Summary screen with key lessons
   ├─ "Share" button (copy link)
   └─ "Start Over" option
```

### 2.2 Core Pages

**Essential Pages (Minimum Viable Product)**:
1. **Landing/Home** - Mission overview, start button
2. **Timeline Navigator** - Visual mission timeline with clickable moments
3. **Story Slides** - 6 narrative slides (simplified from posters)
4. **Decision Slides** - 10 interactive decision points
5. **Info Slides** - 8 background information pages (collapsible/expandable)
6. **Completion** - Summary, share, replay

**Content Strategy**:
- Narrative slides: 40% of poster content, focus on key events
- Decision slides: Full PROS/CONS but with expandable details
- Info slides: Accordion-style expandable sections

---

## 3. Technical Requirements

### 3.1 Platform Constraints

**Must Haves**:
- ✅ 100% static HTML/CSS/JavaScript (no server required)
- ✅ Works on mobile (responsive design, 320px to 1920px)
- ✅ Fast loading (<3 seconds on 3G)
- ✅ Works offline (progressive web app optional)
- ✅ Accessible (WCAG AA minimum)

**Cannot Have**:
- ❌ No backend server
- ❌ No databases
- ❌ No user accounts/authentication
- ❌ No data collection/tracking
- ❌ No complex build processes (keep it simple)

### 3.2 Hosting Requirements

**Cost Constraints**:
- **Target**: $0/month (free tier)
- **Maximum**: $5/month with hard spending cap
- **Usage estimate**: 100-500 visits/month (scout troops)

**Hosting Options** (Ranked by recommendation):

1. **GitHub Pages** (Recommended)
   - ✅ Free forever for public repos
   - ✅ 1GB storage, 100GB/month bandwidth
   - ✅ HTTPS included
   - ✅ Custom domain support
   - ✅ Version controlled
   - **Cost**: $0

2. **Cloudflare Pages**
   - ✅ Free tier: 500 builds/month, unlimited bandwidth
   - ✅ Fast global CDN
   - ✅ HTTPS automatic
   - **Cost**: $0

3. **Netlify**
   - ✅ Free tier: 100GB bandwidth/month
   - ✅ Deploy previews
   - ✅ HTTPS included
   - **Cost**: $0 (may need paid if traffic exceeds)

4. **AWS S3 + CloudFront** (with budget alarm)
   - ✅ Pay-as-you-go
   - ✅ Can set billing alarms at $5
   - ⚠️ Requires AWS account setup
   - **Cost**: ~$1-3/month for estimated traffic

**Recommendation**: Start with **GitHub Pages** for zero cost, zero config, and built-in version control.

### 3.3 Performance Budget

**File Sizes**:
- Total page size: <500KB per page
- Images: <100KB each (optimized/compressed)
- CSS: <50KB (single file)
- JavaScript: <100KB (vanilla JS, no frameworks)

**Loading Targets**:
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Largest Contentful Paint: <2.5s

---

## 4. Content Architecture

### 4.1 Information Hierarchy

```
TIER 1: Always Visible (Core Story)
├─ Mission timeline
├─ Key events (explosion, decisions, splashdown)
└─ Decision prompts

TIER 2: Click to Expand (Details)
├─ Technical explanations
├─ PROS/CONS details
└─ Background information

TIER 3: Optional (Deep Dives)
├─ Crew biographies
├─ Spacecraft schematics
└─ Physics explanations
```

### 4.2 Content Reduction Strategy

From static posters → interactive web:

**Narrative Slides** (6 total):
- Keep: Timeline, key events (3-5 bullets), main image
- Reduce: Detailed timestamps, extended descriptions
- Add: "Learn More" expandable sections

**Decision Slides** (10 total):
- Keep: Situation context, PROS/CONS, decision prompt
- Reduce: Number of bullets (top 3-4 per category)
- Add: Clickable options, reveal historical decision, outcome summary

**Info Slides** (8 total):
- Keep: Main concept, key diagram
- Reduce: Technical depth initially (make expandable)
- Add: Accordion/tabs for different subtopics

**Size Comparison**:
- Poster content: ~500-800 words per slide
- Web content: ~200-300 words visible, 200-300 expandable

---

## 5. Visual Design

### 5.1 Design Principles

1. **Mobile-First**: Design for smallest screen first
2. **Readability**: High contrast, 16px minimum font size
3. **Consistency**: Reuse color palette from posters
4. **Simplicity**: Clean layout, clear CTAs
5. **Speed**: Optimized images, minimal assets

### 5.2 Color Palette (From Static Posters)

```css
/* Primary */
--nasa-blue: #0B3D91;
--mission-white: #FFFFFF;
--apollo-black: #000000;

/* Accent */
--crisis-red: #DC143C;
--success-green: #2E7D32;
--caution-yellow: #FFA000;
--info-cyan: #00ACC1;

/* Backgrounds */
--bg-light: #F5F5F5;
--bg-blue-light: #E3F2FD;
--bg-yellow-light: #FFF9C4;
```

### 5.3 Typography

**Font Stack**:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

**Sizes** (responsive):
- H1: 32px (mobile) → 48px (desktop)
- H2: 24px → 36px
- H3: 20px → 28px
- Body: 16px → 18px
- Small: 14px → 16px

### 5.4 Layout Grid

**Mobile (320px - 767px)**:
- Single column
- Full-width images
- Stacked content

**Tablet (768px - 1023px)**:
- Two columns for decision options
- Sidebar navigation optional

**Desktop (1024px+)**:
- Max content width: 1200px
- Three-column grid for info pages
- Sticky navigation sidebar

---

## 6. Interactive Features

### 6.1 Decision Point Interaction

**Flow**:
1. Display situation context (always visible)
2. Show two option cards (collapsed initially or expanded)
3. User clicks "Choose Option 1" or "Choose Option 2"
4. Reveal historical decision with brief explanation
5. Show outcome and continue button

**Visual States**:
- Default: Both options equal prominence
- Hover: Slight elevation, border highlight
- Selected: Bold border, background color
- Revealed: Show checkmark on historical choice

### 6.2 Navigation Modes

**Linear Mode** (Default):
- "Next Slide" button at bottom
- "Previous Slide" button at top
- Progress indicator (e.g., "5 of 24")
- Auto-suggest next logical slide

**Explore Mode**:
- Timeline view with clickable events
- Category filters (Narrative, Decision, Info)
- Search/filter by keyword (optional v2)

### 6.3 Progressive Enhancement

**Basic Experience** (works everywhere):
- Static HTML pages with hyperlinks
- Works with JavaScript disabled
- All content accessible

**Enhanced Experience** (modern browsers):
- Smooth transitions between slides
- Expandable/collapsible sections
- Progress tracking (localStorage)
- Share functionality

---

## 7. File Structure & Organization

### 7.1 Proposed Directory Structure

```
/apollo-mission/
│
├── assets/                          # Raw source materials
│   ├── content/                     # Original content files
│   │   ├── decision/                # 10 decision text files
│   │   ├── narrative/               # 6 narrative text files
│   │   ├── info/                    # 8 info text files
│   │   └── README.md
│   ├── images/                      # Original high-res images
│   │   └── [slide01-25 images]
│   └── docs/                        # Documentation
│       ├── PRODUCT_REQUIREMENTS.md
│       ├── PLAN.md
│       ├── MISSION_TIMELINE.md
│       └── corrected-materials.md
│
├── static-posters/                  # Print version (36" x 24")
│   ├── templates/                   # HTML templates
│   ├── styles/                      # CSS for large format
│   ├── [24 poster HTML files]
│   └── README.md
│
├── interactive/                     # Web version (QR accessible)
│   ├── index.html                   # Landing page
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css           # Main stylesheet
│   │   │   └── print.css           # Optional print styles
│   │   ├── js/
│   │   │   ├── app.js              # Navigation logic
│   │   │   └── decisions.js        # Decision tracking
│   │   ├── images/                 # Web-optimized images
│   │   │   └── [optimized images]
│   │   └── icons/                  # UI icons, favicon
│   ├── slides/                     # Individual pages
│   │   ├── 01-launch.html
│   │   ├── 02-crew.html
│   │   └── [more slides...]
│   ├── timeline.html               # Timeline navigator
│   ├── completion.html             # Summary/completion
│   └── README.md
│
├── .gitignore
├── INTERACTIVE_REQUIREMENTS.md     # This file
└── README.md                       # Project overview
```

### 7.2 Build Process

**Phase 1: Manual (MVP)**:
- Hand-code HTML pages from content files
- Manually optimize images (ImageOptim, Squoosh)
- Copy files to `/interactive/` directory
- Deploy to GitHub Pages manually

**Phase 2: Automated (Future)**:
- Script to convert content/*.txt → HTML
- Image optimization pipeline
- GitHub Actions for auto-deploy
- Version incrementing

---

## 8. Development Phases

### Phase 1: Foundation (Week 1)
**Goal**: Get basic structure working

- [ ] Reorganize directory structure
- [ ] Create landing page (index.html)
- [ ] Build 3 sample slides (1 narrative, 1 decision, 1 info)
- [ ] Establish CSS/JS foundation
- [ ] Deploy to GitHub Pages
- [ ] Test QR code access
- [ ] Optimize 3 sample images

**Deliverable**: Working prototype with 3 pages accessible via QR code

### Phase 2: Content Migration (Week 2-3)
**Goal**: Build out all 24 slides

- [ ] Create all 6 narrative slides
- [ ] Create all 10 decision slides
- [ ] Create all 8 info slides
- [ ] Build timeline navigator
- [ ] Add completion page
- [ ] Optimize all images
- [ ] Test on mobile devices

**Deliverable**: Complete 24-slide experience

### Phase 3: Polish & Test (Week 4)
**Goal**: Refine UX and verify functionality

- [ ] Add smooth transitions
- [ ] Implement progress tracking
- [ ] Test on various devices/browsers
- [ ] Add share functionality
- [ ] Optimize performance
- [ ] Accessibility audit
- [ ] User testing with scouts

**Deliverable**: Production-ready web experience

### Phase 4: Deployment & Distribution (Week 5)
**Goal**: Make it accessible

- [ ] Final deployment to GitHub Pages
- [ ] Generate QR codes
- [ ] Create handout cards with QR
- [ ] Write usage instructions
- [ ] Set up cost monitoring (if not free tier)
- [ ] Create backup/archive

**Deliverable**: Live site + QR codes + documentation

---

## 9. Success Criteria

### 9.1 Functional Requirements
- ✅ All 24 slides accessible via web
- ✅ Works on mobile (iOS Safari, Android Chrome)
- ✅ Page load <3 seconds on 3G
- ✅ QR code successfully launches site
- ✅ Navigation between slides works smoothly
- ✅ Decision interactions reveal historical choices
- ✅ No JavaScript errors in console

### 9.2 User Experience Goals
- Scout can complete full experience in 20-30 minutes
- Decision points are clear and engaging
- Navigation is intuitive (no instructions needed)
- Content is readable on small screens
- Visual design is consistent and professional

### 9.3 Business/Hosting Goals
- Hosting cost: $0-5/month
- Bandwidth sufficient for 100-500 visits/month
- Site remains accessible for 5+ years
- Can be downloaded and archived offline
- Easy to update content in future

---

## 10. Technical Specifications

### 10.1 Browser Support
- **Tier 1** (full support): Chrome, Safari, Firefox, Edge (last 2 versions)
- **Tier 2** (graceful degradation): IE11, older mobile browsers
- **Works without JS**: Yes (basic navigation via links)

### 10.2 Device Support
- **Mobile**: 320px - 767px (portrait phones)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Orientation**: Portrait and landscape

### 10.3 Image Optimization

**Source Format** → **Web Format**:
- Large photos (>1MB) → WebP, 80% quality, max 1200px wide
- Diagrams (PNG) → PNG optimized, TinyPNG compression
- Icons → SVG where possible

**Sizes**:
- Hero images: 1200px wide (display: 800px CSS)
- Thumbnail images: 400px wide
- Icons: 48px or SVG

### 10.4 Accessibility (WCAG 2.1 AA)
- ✅ Color contrast ratio ≥4.5:1
- ✅ All images have alt text
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Semantic HTML structure
- ✅ ARIA labels where needed

---

## 11. Content Examples

### 11.1 Landing Page (index.html)

**Hero Section**:
```
[Mission Patch Image]

APOLLO 13: A SUCCESSFUL FAILURE

On April 11, 1970, three astronauts launched to the Moon.
56 hours later, an explosion changed everything.

[Start Mission] [Explore Timeline]
```

**Quick Stats**:
- 🚀 Mission Duration: 5 days, 22 hours
- ⚡ Crisis Moment: 200,000 miles from Earth
- 🏆 Outcome: Safe return, zero casualties
- 🎯 Decisions Made: 10 critical choices

### 11.2 Decision Slide Example (Simplified)

```html
<div class="decision-slide">
  <header>
    <span class="badge">Decision #2</span>
    <h1>Freeze or Squeeze?</h1>
    <p class="timestamp">56 hours into mission</p>
  </header>

  <section class="situation">
    <h2>⚠️ The Situation</h2>
    <ul>
      <li>Command Module losing power rapidly</li>
      <li>Temperature will drop to freezing</li>
      <li>Lunar Module designed for 2 people, not 3</li>
    </ul>
  </section>

  <section class="options">
    <div class="option" data-choice="freeze">
      <h3>Stay in Command Module</h3>
      <button>Choose This Option</button>
      <details>
        <summary>See Details</summary>
        <div class="pros">
          <h4>✓ Pros</h4>
          <ul>
            <li>More spacious</li>
            <li>Familiar controls</li>
          </ul>
        </div>
        <div class="cons">
          <h4>✕ Cons</h4>
          <ul>
            <li>No power = no heat</li>
            <li>Won't survive 4 days</li>
          </ul>
        </div>
      </details>
    </div>

    <div class="option" data-choice="squeeze">
      <h3>Move to Lunar Module</h3>
      <button>Choose This Option</button>
      <!-- Similar structure -->
    </div>
  </section>

  <section class="outcome hidden" id="decision-outcome">
    <h2>NASA's Decision</h2>
    <p>The crew moved to the Lunar Module, using it as a lifeboat...</p>
    <a href="03-spacecraft-config.html" class="next-btn">Continue →</a>
  </section>
</div>
```

---

## 12. QR Code Strategy

### 12.1 QR Code Details
- **URL**: `https://[username].github.io/apollo-mission/interactive/`
- **Size**: Minimum 2cm x 2cm for reliable scanning
- **Error Correction**: Level H (30% damage tolerance)
- **Format**: SVG or high-res PNG

### 12.2 Distribution Ideas
1. **Handout Cards**: Business card size, mission patch front, QR back
2. **Poster Corner**: Add QR to bottom of physical posters
3. **Stickers**: Print QR stickers for scout handbooks
4. **Bookmarks**: QR on educational bookmarks

---

## 13. Future Enhancements (v2+)

**Not in MVP, but possible later**:
- [ ] Quiz mode with score tracking
- [ ] "Compare your decisions" stats (anonymous)
- [ ] Multiple language support (Spanish, French)
- [ ] Audio narration option
- [ ] Printable certificate of completion
- [ ] Links to external resources (NASA archives)
- [ ] Progressive Web App (offline mode)
- [ ] Gamification (badges, achievements)

---

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Image files too large | Slow loading | Aggressive compression, WebP format, lazy loading |
| GitHub Pages traffic limit exceeded | Site unavailable | Monitor usage, fallback to Cloudflare Pages |
| Mobile browsers don't support features | Poor UX | Progressive enhancement, test on real devices |
| Content too dense for mobile | Users abandon | Start with less content, use expandable sections |
| QR codes don't scan reliably | Low adoption | Test multiple QR generators, ensure size/contrast |

---

## Appendix A: Comparison Matrix

| Aspect | Static Posters | Interactive Web |
|--------|---------------|-----------------|
| Production Time | 4-5 weeks | 3-4 weeks |
| Production Cost | $600-1,200 (printing) | $0-5/month (hosting) |
| Reach | Scout meetings, jamborees | Unlimited, global |
| Updates | Reprint required | Edit HTML, instant |
| Portability | Physical transport | QR code, URL |
| Interaction | Group discussion | Individual exploration |
| Content Depth | High density | Moderate, expandable |
| Accessibility | In-person only | 24/7, anywhere |
| Archival | Physical storage | Git repository, permanent |

---

**Document Status**: Draft v1.0 - Ready for review and technical planning
**Next Steps**:
1. Review and approve requirements
2. Create detailed technical implementation plan
3. Reorganize directory structure
4. Begin Phase 1 development
