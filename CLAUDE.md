# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apollo 13 Interactive Experience — a mobile-first static web app built for the **2026 Elevate Scout Jamboree** (NASA Tent, Apollo Table, presented by Ed Gruhl). Scouts scan a QR code on the exhibit posters, open the site on their phones, and relive NASA's Apollo 13 rescue by making the same 10 critical decisions the real mission faced.

The repo is also **itself an exhibit**: it's intentionally simple (pure HTML/CSS/JS, one vendored MIT library) so scouts pursuing the Programming, Digital Technology, and Space Exploration merit badges can read, run, and modify it.

**Status**: ✅ Complete (34 slides in true mission chronology, 10 scored decisions, fact-checked against primary sources 2026-07-05)
**Live Site**: https://apollo13.quest/
**Branch**: `main` (auto-deploys to GitHub Pages from root)

---

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript ES6+ (NO frameworks)
- **Vendored**: `assets/js/qrcode.js` — Kazuhiko Arase's MIT qrcode-generator (score-sharing QR); the one allowed vendored file. No CDNs, no external requests at runtime.
- **Offline**: `sw.js` service worker precaches every page + CSS/JS on first visit (jamboree cell coverage is spotty)
- **Hosting**: GitHub Pages (free, auto-deploy from `main` branch root)
- **Storage**: localStorage (`decisions`, `visitedSlides`, `bestScore`) — client-side only

---

## Key Commands

### Local Development

```bash
# Simple HTTP server (Python) — required for the service worker; file:// won't register it
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Deployment

```bash
git add . && git commit -m "Description" && git push origin main
# Deploys in 1-2 minutes to https://apollo13.quest/
```

After changing any page or asset list, bump `CACHE_VERSION` in `sw.js` so returning visitors get the update.

### Testing

```bash
./scripts/verify-navigation.sh    # prev/next chain + link targets, all 34 slides
./scripts/verify-button-text.sh   # nav button label standards
```

---

## Repository Layout

```
/
├── index.html              # Landing page (Full/Quick mission CTAs, shared-score celebration)
├── timeline.html           # Chapter map of all slides + decisions
├── privacy.html            # Privacy explainer (no tracking + how tracking works; keep honest about Cloudflare visitor counting)
├── explore/                # 3 merit-badge deep dives (programming, digital-technology, space) — phone-first "in line at the trading post" pages; linked from slides 31–34, NOT in the 34-slide nav chain
├── sw.js                   # Offline service worker (precache list — keep in sync with slides/)
├── slides/                 # 34 slides in TRUE MISSION CHRONOLOGY (see inventory below)
├── assets/
│   ├── css/style.css      # Single stylesheet
│   ├── js/app.js          # All game logic (scoring, locking, tracker, quick mode, SW registration)
│   ├── js/qrcode.js       # Vendored MIT QR generator (score sharing)
│   └── images/            # Web-optimized images (only referenced files)
├── exhibit/               # The physical jamboree table: poster/card previews, QR codes
├── docs/                  # DEPLOYMENT_GUIDE, SITEMAP_SPECIFICATION, SCORING_SYSTEM_DESIGN
├── scripts/               # Verification scripts
├── CLAUDE.md / README.md / LICENSE
```

**Print masters are CANONICAL here** in `print-ready/` — the print files sent to the printer: **2 posters + 4 rank cards + 1 invitation card** (see `print-ready/README.md`). Design drafts, superseded candidates, and planning notes → private local archive `~/Projects/apollo-working-materials/`.

### Slide inventory (chronological)

| # | Slide | Type |
|---|---|---|
| 01 | launch | narrative |
| 02 | spacecraft | info (pre-flight tour, deliberately spoiler-free) |
| 03 | explosion | narrative |
| 04 | freeze-squeeze | **Decision #1** (`squeeze`) |
| 05 | power-conservation | **Decision #2** (`shutdown`) |
| 06 | turn-around | **Decision #3** (`freereturn`) |
| 07 | explosion-cause | info (flashback) |
| 08 | meet-crew | info (canonical crew bios) |
| 09 | stars-sun-navigation | **Decision #4** (`sunearth`) |
| 10 | lifeboat-moon | narrative (defines pericynthion) |
| 11 | pc2-burn | **Decision #5** (`burn`) |
| 12 | water-conservation | **Decision #6** (`extreme`) |
| 13 | co2-mailbox | **Decision #7** (`buildmailbox`) |
| 14 | long-journey | narrative |
| 15 | passive-thermal | info |
| 16 | communication-discipline | **Decision #8** — Comm Power (`silence` = low-power, kept for JS compat) |
| 17 | battery-jumpstart | **Decision #9** — LM→CM recharge at GET 112 (`jumpstart`) |
| 18 | sm-jettison-timing | **Decision #10** (`early`) |
| 19–28 | computer-restart → john-aaron | reentry arc (no decisions) |
| 29 | ed-gruhl | presenter |
| 30 | completion | score, Apollo-card banner, replay, QR share |
| 31–34 | merit badges | hub + 3 detail pages |

---

## Game Rules (implemented in assets/js/app.js + slides/30-completion.html)

- **10 decisions**, keys = slide numbers: `4,5,6,9,11,12,13,16,17,18` in `CORRECT_ANSWERS`
- **Decisions lock on first tap** (`lockDecision`) and restore locked on revisit — no answer-flipping
- **Generous hints are intentional**: pros/cons openly favor NASA's choice; kids who read score well. Do not "balance" options into trick questions. Never let an *image* mark the correct option, though — pictures live in the situation section.
- **Ranks** (`getScoreRank`): 10/10 Mission Commander 🏆, 8–9 Flight Director ⭐, 6–7 Flight Controller 🎯, 0–5 Ground Crew 📡
- **Physical rank cards** (Ed's 2026-07-05 scheme): four take-home cards — Ground Crew (4 🏆) / Flight Controller (6) / Flight Director (8) / Mission Commander (10) — handed out at the Apollo Table to match the scout's score (cards from score 4). They replaced the single "Apollo reward card." The web app completion banner (`correct >= 4` → names the earned rank card) and poster 1 ("Score 4+ trophies. Earn your rank card.") were aligned to this scheme 2026-07-05.
- **Quick Mission**: `?mode=quick` chains only the decision slides (`QUICK_CHAIN`), entered from index.html, exits at completion
- **Running score**: tracker badges + `🏆 N/10` text on every mission slide
- **Progress text**: `Slide N of 30` (JS normalizes); completion page uses custom text

## Content Rules (hard-won — keep them)

1. **Every factual claim must be sourced.** The content was audited against the Apollo 13 Flight Journal, Mission Report MSC-02680, the Cortright report, and NASA SP-350 (70 errors fixed 2026-07-05). Don't reintroduce movie lore ("Failure is not an option" was written for the 1995 film).
2. **Quotes are real or labeled.** Only documented quotes get quotation marks + attribution. A dramatized line must sit under a `🎬 Dramatization — not a documented quote.` note.
3. **Every decision result ends with a "📚 Sources for Skeptics" block** (`.sources-box`) linking primary sources. Disputing the answer is treated as a virtue — that block is the reward for sassy contrarians. Verified link set lives in any decision slide; reuse it.
4. **No spoilers ahead of the story**: slide 02 tours the spacecraft without revealing what breaks; the timeline maps chapters without narrating outcomes.
5. **Chronology is sacred**: slides follow real GET order. If you add a slide, place it by its GET timestamp and renumber consistently (update nav links, data-slide-id, tracker keys, CORRECT_ANSWERS, sw.js precache, timeline, sitemap spec).

---

## Common Development Tasks

### Adding/Modifying a Slide

1. Edit the HTML file in `slides/`; keep `data-slide-id` = slide number
2. Nav: prev/next chain is sequential 01→30, then 31 hub, 32–34 loop (labels: `← Previous` / `Next →`, exceptions on 01/30/31/32–34)
3. Update `sw.js` precache list and bump `CACHE_VERSION` if files were added/renamed
4. Run both verify scripts; test locally over HTTP

### Modifying Decision Logic

`CORRECT_ANSWERS` keys are slide numbers; values must match `data-option` attributes in that slide's HTML. Also keep in sync: `DECISION_NAMES`, the hardcoded key list in `updateDecisionTracker`, tracker badge markup in all slides, `QUICK_CHAIN`, and `formatChoice` labels in `slides/30-completion.html`.

### Updating Styles

All styles in `assets/css/style.css` (CSS variables in `:root`). Components: `.option`, `.sources-box`, `.tracker-score`, `.badge`, `.btn-choose:disabled`.

---

## Important Implementation Notes

- **Progressive enhancement**: content readable without JS; JS adds decisions/scoring/tracking
- **Mobile first**: scouts play on phones at a loud jamboree table — 44px touch targets, lazy images, test Safari iOS on a real device
- **Accessibility**: semantic HTML, alt text, WCAG 2.1 AA contrast, arrow-key navigation
- **Performance**: target <500KB/page, Lighthouse >90; spotty cell coverage is the design constraint the service worker exists for
- **Share URLs use hash params** (`#name=...&troop=...&score=...`) parsed by `getURLParams` — keep PII light (first names)
- **Score census beacon**: on a full 10-decision completion, slide 30 pings `/ping/completion/<score>` once per new score per device (a deliberate 404 — Cloudflare counts it by path; SW never caches it). Anonymous by design and **disclosed on privacy.html — keep that disclosure in sync if the beacon changes**

---

## Git Workflow

**Main branch = live site.** Use github noreply email. Include co-authoring footer:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Keep binary churn out of history**: the canonical print masters in `print-ready/` (2 posters + 4 rank cards + 1 invitation) are the deliberate exception (added 2026-07-05 at Rob's direction). Never commit drafts, superseded candidates, or other large binaries — those belong in `~/Projects/apollo-working-materials/`. If a print master changes, replace it in ONE commit — iterate in the archive, commit only the winner.

**⚠️ GitHub hard-rejects files >100 MB** — a push with an oversized poster master fails at the pre-receive hook and **silently stalls deploys of everything behind it** (this bit us 2026-07-05: two poster commits blocked the live site until history was rewritten). Before committing a print master, run `oxipng -o 4 --strip safe <file>` (lossless, ~20% smaller) and confirm it is under 100 MB. If a rejected commit already exists, squash the unpushed range so the oversized blob never reaches the remote.

---

## Testing Checklist

- [ ] `./scripts/verify-navigation.sh` and `./scripts/verify-button-text.sh` pass
- [ ] Chrome + Safari iOS (real device)
- [ ] A full decision run: lock behavior, running score, rank-card banner at 4+ (names the matching card), replay, QR renders
- [ ] Quick Mission chains correctly and exits at completion
- [ ] Offline: load index over HTTP, go airplane-mode, navigate slides
- [ ] Lighthouse >90

---

## Contact & Presentation

**Presenter**: Ed Gruhl, Scout District Commissioner, Glacial Trails District
**Event**: 2026 Elevate Scout Jamboree — NASA Tent, Apollo Table
**Audience**: Scouts ages 11–17

## Quick Reference

**Live Site**: https://apollo13.quest/
**Pages**: 40 (index + timeline + privacy + 34 slides + 3 explore deep-dives) | **Decisions**: 10 (slides 4,5,6,9,11,12,13,16,17,18)
**Rank cards**: from 4 correct (tiers 4/6/8/10) | **Ranks**: 4 tiers | **Dependencies**: zero runtime, one vendored MIT file
