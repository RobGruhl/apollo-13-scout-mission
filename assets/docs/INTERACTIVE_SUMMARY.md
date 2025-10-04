# Apollo 13 Interactive Branch - Planning Summary

**Date**: October 4, 2025
**Branch**: `interactive-game`
**Status**: ✅ Planning Complete → Ready for Implementation

---

## What We're Building

A lightweight, mobile-friendly web version of the Apollo 13 educational experience that scouts can access via QR code. This complements the physical poster system by providing a self-paced, interactive digital walkthrough.

---

## Key Decisions Made

### 1. Hosting: GitHub Pages (Free, Zero Cost)
- **URL**: `https://[username].github.io/apollo-mission/interactive/`
- **Cost**: $0/month (permanent free tier)
- **Bandwidth**: 100GB/month (more than enough)
- **Built-in HTTPS**: ✅
- **Auto-deployment**: Push to branch → live in 2 minutes

### 2. Technology: Pure Static HTML/CSS/JavaScript
- **No frameworks**: React/Vue not needed, adds complexity
- **No build process**: Simple HTML files, edit and push
- **No dependencies**: Won't break over time
- **Fast loading**: <3 seconds on 3G
- **Works offline**: Can download entire site

### 3. Content Strategy: Simplified from Posters
- **Narrative slides**: 40% of poster content, focus on key events
- **Decision slides**: Full PROS/CONS but fewer bullets (top 3-4)
- **Info slides**: Accordion-style expandable sections
- **Images**: Optimized for web (<100KB each vs original 6.5MB)

### 4. User Experience: Self-Guided Navigation
- **Landing page**: Mission overview + "Start Mission" button
- **Linear mode**: Next/Previous navigation (default)
- **Explore mode**: Timeline view, jump to any moment
- **Decision interactions**: Click option → reveal historical choice
- **Progress tracking**: LocalStorage saves progress

---

## Directory Structure (Proposed)

```
/apollo-mission/
│
├── assets/                     # Source materials (raw content)
│   ├── content/               # Text files (decision, narrative, info)
│   ├── images/                # Original high-res images
│   └── docs/                  # All documentation (PRDs, plans, etc.)
│
├── static-posters/            # Print version (36" x 24" posters)
│   ├── templates/
│   ├── styles/
│   └── [24 HTML poster files]
│
├── interactive/               # 🆕 Web version (QR accessible)
│   ├── index.html            # Landing page
│   ├── assets/
│   │   ├── css/              # Styles
│   │   ├── js/               # Interactive features
│   │   └── images/           # Web-optimized images
│   ├── slides/               # 24 HTML pages
│   ├── timeline.html         # Timeline navigator
│   └── completion.html       # Summary page
│
└── README.md
```

**Changes from Current Structure**:
- Move `/content/` → `/assets/content/`
- Move `content/images/` → `/assets/images/`
- Move `/posters/` → `/static-posters/`
- Move `*.md` docs → `/assets/docs/`
- Create new `/interactive/` directory

---

## Documents Created

### 1. INTERACTIVE_REQUIREMENTS.md (14 sections)
Comprehensive product requirements document covering:
- User experience and navigation
- Content architecture and reduction strategy
- Visual design (colors, typography, layouts)
- Interactive features (decision reveals, timeline)
- Hosting requirements and cost constraints
- File structure and organization
- Development phases (4 weeks)
- Success criteria

### 2. INTERACTIVE_TECHNICAL_PLAN.md (16 sections + appendices)
Detailed implementation guide covering:
- Technology stack (HTML/CSS/JS, no frameworks)
- HTML templates (landing, narrative, decision, info, timeline pages)
- CSS architecture (variables, responsive design, components)
- JavaScript functionality (navigation, decisions, progress tracking)
- Image optimization process (WebP, compression, lazy loading)
- GitHub Pages deployment workflow
- QR code generation and placement
- Performance optimization (<500KB per page, <3s load)
- Accessibility (WCAG 2.1 AA compliance)
- Browser/device testing checklist
- Content migration strategy
- Timeline with weekly milestones

---

## What Happens Next

### Option 1: Review Planning Documents (Recommended)
Before reorganizing files, review the two planning docs:
1. Read `INTERACTIVE_REQUIREMENTS.md` - Understand what we're building
2. Read `INTERACTIVE_TECHNICAL_PLAN.md` - See how we'll build it
3. Provide feedback or approve
4. Then proceed with implementation

### Option 2: Start Implementation Now
If planning looks good, we can immediately:
1. Reorganize directory structure
2. Create landing page (`interactive/index.html`)
3. Build 3 sample slides (1 narrative, 1 decision, 1 info)
4. Set up GitHub Pages
5. Generate QR code and test

---

## Key Features of Interactive Version

### 🎯 For Scouts
- **Access**: Scan QR code on phone → instant access
- **Self-paced**: Explore at own speed, pause/resume anytime
- **Interactive**: Make decisions, see outcomes
- **Shareable**: Send link to friends
- **Works offline**: Can download for later

### 📱 Technical Highlights
- **Mobile-first**: Designed for phones, works great on desktop too
- **Fast**: <3 second load on 3G
- **Accessible**: Screen reader compatible, keyboard navigation
- **Reliable**: Static files, no server crashes
- **Permanent**: Will work for years without maintenance

### 💰 Cost Structure
- **Hosting**: $0 (GitHub Pages free tier)
- **Domain**: $0 (use github.io) or ~$12/year (custom domain optional)
- **Development**: Zero dependencies, no ongoing costs
- **Total**: $0/month with no hidden fees or surprise bills

---

## Timeline Estimate

### Week 1: Foundation (5 days)
- Reorganize directory structure
- Create landing page + basic styles
- Build 3 sample slides
- Deploy to GitHub Pages
- Generate QR code and test

**Deliverable**: Working prototype with 3 pages

### Week 2-3: Content (10 days)
- Convert all 24 slides from text to HTML
- Optimize images for web
- Build timeline navigator
- Create completion page

**Deliverable**: Complete 24-slide experience

### Week 4: Polish (5 days)
- Performance optimization
- Accessibility audit
- Device testing
- User testing with scouts

**Deliverable**: Production-ready site

### Week 5: Launch (2-3 days)
- Final deployment
- Print QR codes
- Create handout materials
- Documentation

**Deliverable**: Live site + QR codes

**Total**: 4-5 weeks from start to launch

---

## Questions to Resolve

Before we proceed with reorganization and implementation:

1. **GitHub Account**: What's your GitHub username for Pages URL?
   - Will be: `https://[username].github.io/apollo-mission/interactive/`

2. **Custom Domain** (Optional): Want a custom URL like `apollo13.scoutproject.org`?
   - Not required, GitHub Pages URL works fine
   - Costs ~$12/year if you want one

3. **QR Code Placement**: Where should QR codes go?
   - Handout cards?
   - Bottom corner of physical posters?
   - Both?

4. **Content Reduction**: Comfortable with simplifying poster content for web?
   - Decision slides: Keep all PROS/CONS but reduce to top 3-4 bullets?
   - Narrative slides: ~40% of poster content?
   - Info slides: Expandable accordion sections?

5. **Testing**: Can we get 2-3 scouts to test before full launch?
   - Helps validate UX and find issues

---

## Comparison: Static Posters vs Interactive Web

| Feature | Static Posters | Interactive Web |
|---------|---------------|-----------------|
| **Audience** | Groups of 15, leader-led | Individual, self-guided |
| **Access** | Scout meetings only | Anywhere, anytime via QR |
| **Cost** | $600-1,200 (printing) | $0/month (hosting) |
| **Updates** | Reprint required ($$$) | Edit HTML, instant |
| **Reach** | Limited to physical events | Unlimited, global |
| **Content** | High density, 10-foot viewing | Moderate, screen optimized |
| **Interaction** | Group discussion/voting | Click-through, reveals |
| **Portability** | Transport posters | QR code, URL |
| **Lifespan** | Years (physical degradation) | Permanent (digital archive) |

**Recommendation**: Build both! They complement each other:
- Posters for in-person scout meetings (high engagement)
- Web version for follow-up, sharing, and broader reach

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Images too large (slow loading) | Medium | High | Aggressive compression, WebP format, lazy loading |
| Content too dense for mobile | Low | Medium | Tested responsive design, expandable sections |
| GitHub Pages traffic exceeded | Very Low | Medium | Free tier is 100GB/month (plenty for use case) |
| QR codes don't scan | Low | Medium | Test multiple generators, ensure size/contrast |
| Browser compatibility issues | Low | Low | Use standard HTML/CSS, progressive enhancement |

**Overall Risk**: Low - Static sites are simple, reliable, and well-tested technology

---

## Success Criteria

### Technical (Launch)
- [ ] All 24 slides accessible
- [ ] <3 second page load on 3G
- [ ] Works on mobile (iOS + Android)
- [ ] Lighthouse score >90
- [ ] QR code successfully launches site
- [ ] Zero console errors

### User Experience (Post-Launch)
- [ ] Scouts complete experience in 20-30 min
- [ ] Decision points are engaging
- [ ] Navigation is intuitive
- [ ] Positive feedback from test users

### Business
- [ ] Hosting cost: $0/month
- [ ] Site accessible for 5+ years
- [ ] Easy to update content
- [ ] Can be archived offline

---

## What's Different from Original Plan

Your original request emphasized:
1. ✅ **Inexpensive hosting with price cap** → GitHub Pages is $0, no cap needed
2. ✅ **Securely hosted** → GitHub HTTPS, static files (no attack surface)
3. ✅ **Read-only static pages** → Pure HTML, no backend
4. ✅ **QR code accessible** → Primary access method
5. ✅ **Less content or clickable details** → Simplified + expandable sections
6. ✅ **Organized structure** → Clear separation: assets, static-posters, interactive

**We've delivered** exactly what you asked for, with detailed implementation plans.

---

## Next Steps (Your Choice)

### Path A: Review First (Recommended)
1. Read `INTERACTIVE_REQUIREMENTS.md` (~15 min)
2. Read `INTERACTIVE_TECHNICAL_PLAN.md` (~20 min)
3. Provide feedback or questions
4. Approve direction
5. Then start implementation

### Path B: Start Building Now
1. Approve planning documents
2. Reorganize directory structure
3. Create landing page
4. Build first 3 slides
5. Deploy and test

**Recommended**: Path A - Review planning, provide feedback, then build with confidence.

---

## Files Created in This Session

1. **INTERACTIVE_REQUIREMENTS.md** (23KB)
   - Product requirements document
   - User experience design
   - Content strategy
   - Development phases

2. **INTERACTIVE_TECHNICAL_PLAN.md** (53KB)
   - Technical implementation guide
   - Code examples and templates
   - Deployment workflow
   - Testing checklists

3. **INTERACTIVE_SUMMARY.md** (This file, 10KB)
   - Executive summary
   - Key decisions
   - Next steps

**Total**: ~86KB of comprehensive planning documentation

---

## Questions?

I'm ready to:
- Answer questions about the plan
- Adjust strategy based on your feedback
- Start implementation when you're ready
- Create the first prototype pages

**What would you like to do next?**

---

*Planning completed in interactive-game branch. Ready to proceed with implementation when approved.*
