# Apollo 13 Scoring & Score-Sharing System - Design Documentation

**Version**: 1.1
**Date**: 2026-07-04
**Status**: ✅ Implemented
**Implementation**: `assets/js/app.js`, `slides/30-completion.html`, `index.html`

---

## Overview

The Apollo 13 Interactive Experience includes a scoring system that tracks user decisions throughout the mission and compares them to NASA's historical choices. Users can share their scores with fellow scouts via URL parameters, creating a competitive and social learning experience.

---

## Core Features

### 1. Decision Tracking
- Automatically tracks all user decisions using `localStorage`
- Stores decision choices with timestamps
- Persists across page refreshes and browser sessions

### 2. Score Calculation
- Compares user choices to NASA's actual historical decisions
- Calculates percentage score (correct decisions / total decisions)
- Assigns rank/title based on performance

### 3. Score Sharing
- Generates shareable URLs with score embedded in hash parameters
- Displays celebratory landing page when users visit shared URLs
- Encourages friendly competition among scouts

---

## Technical Architecture

### Data Storage (localStorage)

**Key: `decisions`**
```javascript
{
  "2": {
    "choice": "squeeze",           // User's selected option
    "timestamp": "2025-10-04T12:34:56.789Z"
  },
  "5": {
    "choice": "freereturn",
    "timestamp": "2025-10-04T12:38:22.123Z"
  },
  "6": {
    "choice": "burn",
    "timestamp": "2025-10-04T12:42:15.456Z"
  }
  // ... one entry per decision made
  // (10 scored decisions: slides 2, 5, 6, 10, 11, 13, 14, 15, 17, 18)
}
```

**Key: `visitedSlides`**
```javascript
["1", "2", "3", "4", "5", "6", ...]
```

### Correct Answers Reference

Defined in `assets/js/app.js`:

```javascript
const CORRECT_ANSWERS = {
    '2': 'squeeze',           // Decision #1: Freeze or Squeeze → SQUEEZE (move to LM)
    '5': 'freereturn',        // Decision #2: Turn Around → FREE-RETURN (use Moon's gravity)
    '6': 'burn',              // Decision #3: PC+2 Burn → PERFORM BURN (speed up return)
    '10': 'buildmailbox',     // Decision #4: CO2 Mailbox → BUILD (improvise adapter)
    '11': 'sunearth',         // Decision #5: Navigation → SUN/EARTH (manual alignment)
    '13': 'shutdown',         // Decision #6: CM Power → SHUTDOWN (preserve batteries)
    '14': 'extreme',          // Decision #7: Water Conservation → EXTREME RATIONING
    '15': 'silence',          // Decision #8: Communication → RADIO SILENCE (save power)
    '17': 'jumpstart',        // Decision #9: Battery Jump-Start → ATTEMPT JUMPSTART
    '18': 'early'             // Decision #10: SM Jettison → EARLY JETTISON (photograph damage)
};

const DECISION_NAMES = {
    '2': 'Freeze or Squeeze',
    '5': 'Turn Around Decision',
    '6': 'PC+2 Burn (Speed Up)',
    '10': 'CO2 Mailbox',
    '11': 'Stars or Sun Navigation',
    '13': 'Power Conservation',
    '14': 'Water Conservation',
    '15': 'Communication Discipline',
    '17': 'Battery Jump-Start',
    '18': 'SM Jettison Timing'
};
```

### Score Calculation Logic

```javascript
function calculateScore() {
    const decisions = getDecisions();
    let correct = 0;
    let total = Object.keys(CORRECT_ANSWERS).length;

    for (const [slideId, correctChoice] of Object.entries(CORRECT_ANSWERS)) {
        if (decisions[slideId] && decisions[slideId].choice === correctChoice) {
            correct++;
        }
    }

    return { correct, total };
}
```

### Rank System

**4 Ranks based on percentage (out of 10 decisions):**

| Score | Rank | Emoji | Color | Message |
|-------|------|-------|-------|---------|
| 100% (10/10) | Mission Commander | 🏆 | Gold | "Perfect score! You made every decision exactly like NASA!" |
| 80-99% (8-9/10) | Flight Director | ⭐ | Silver | "Excellent work! You have the instincts of a NASA flight director." |
| 60-79% (6-7/10) | Flight Controller | 🎯 | Bronze | "Good decisions! You helped bring the crew home." |
| 0-59% (0-5/10) | Ground Crew | 📡 | Gray | "Review the mission to see what NASA decided and why!" |

**Implementation:**

```javascript
function getScoreRank(correct, total) {
    const percentage = (correct / total) * 100;

    if (percentage === 100) {
        return {
            rank: 'Mission Commander',
            emoji: '🏆',
            message: 'Perfect score! You made every decision exactly like NASA!',
            color: '#FFD700' // Gold
        };
    } else if (percentage >= 80) {
        return {
            rank: 'Flight Director',
            emoji: '⭐',
            message: 'Excellent work! You have the instincts of a NASA flight director.',
            color: '#C0C0C0' // Silver
        };
    } else if (percentage >= 60) {
        return {
            rank: 'Flight Controller',
            emoji: '🎯',
            message: 'Good decisions! You helped bring the crew home.',
            color: '#CD7F32' // Bronze
        };
    } else {
        return {
            rank: 'Ground Crew',
            emoji: '📡',
            message: 'Review the mission to see what NASA decided and why!',
            color: '#666666' // Gray
        };
    }
}
```

---

## URL Sharing System

### URL Structure

**Base URL:**
```
https://robgruhl.github.io/apollo-13-scout-mission/
```

**Shared Score URL:**
```
https://robgruhl.github.io/apollo-13-scout-mission/#name=John&troop=Troop%20123&score=10&total=10&rank=Mission%20Commander
```

**Parameters (in hash fragment):**
- `name` - Scout's first name (URL encoded)
- `troop` - Troop number/name (URL encoded)
- `score` - Number of correct decisions (0-10)
- `total` - Total number of decisions (always 10)
- `rank` - Achieved rank (URL encoded)

### URL Generation

**User Input Form** (on completion page, styling omitted):

```html
<div id="shareForm">
    <label for="scoutName">Scout Name:</label>
    <input type="text" id="scoutName" placeholder="Your name" required>

    <label for="troopNumber">Troop Number:</label>
    <input type="text" id="troopNumber" placeholder="e.g., Troop 123" required>

    <button onclick="generateShareLink()">🔗 Generate Share Link</button>
</div>
```

**JavaScript Function:**

```javascript
function generateShareURL(name, troop) {
    const { correct, total } = calculateScore();
    const rank = getScoreRank(correct, total);

    const params = new URLSearchParams({
        name: name,
        troop: troop,
        score: correct,
        total: total,
        rank: rank.rank
    });

    const baseURL = window.location.origin + window.location.pathname.replace(/slides\/.*/, '');
    return `${baseURL}#${params.toString()}`;
}
```

### URL Parsing

**On Landing Page Load:**

```javascript
function getURLParams() {
    const hash = window.location.hash.substring(1); // Remove #
    if (!hash) return null;

    const params = new URLSearchParams(hash);
    const name = params.get('name');
    const troop = params.get('troop');
    const score = params.get('score');
    const total = params.get('total');
    const rank = params.get('rank');

    if (name && troop && score && total) {
        return {
            name,
            troop,
            score: parseInt(score),
            total: parseInt(total),
            rank
        };
    }

    return null;
}
```

---

## User Experience Flow

### Completion Flow (Slide 30)

**Step 1: User completes the mission slides**
- Reaches `slides/30-completion.html`
- JavaScript runs `calculateScore()` on page load

**Step 2: Score display**
```javascript
// On page load (displayScore() in slides/30-completion.html)
const { correct, total } = calculateScore();
const rank = getScoreRank(correct, total);

// Display score badge
document.getElementById('rankEmoji').textContent = rank.emoji;
document.getElementById('rankTitle').textContent = rank.rank;
document.getElementById('scoreDisplay').textContent = `${correct}/${total}`;
document.getElementById('rankMessage').textContent = rank.message;

// Show comparison table (one row per decision)
const comparison = getDecisionComparison();
```

**Step 3: Share form**
- User enters name and troop number
- Clicks "🔗 Generate Share Link"
- URL is generated and displayed in a text field
- User copies the link with the "📋 Copy Link" button

**Step 4: Share options**
```javascript
function generateShareLink() {
    const name = document.getElementById('scoutName').value.trim();
    const troop = document.getElementById('troopNumber').value.trim();

    if (!name || !troop) {
        alert('Please enter both your name and troop number!');
        return;
    }

    const shareURL = generateShareURL(name, troop);
    document.getElementById('shareURL').value = shareURL;
    document.getElementById('shareLinkDisplay').style.display = 'block';
    document.getElementById('shareLinkDisplay').scrollIntoView({ behavior: 'smooth' });
}

async function copyShareLink() {
    const shareURL = document.getElementById('shareURL').value;

    try {
        await navigator.clipboard.writeText(shareURL);
        alert('Link copied! Share it with your fellow scouts!');
    } catch (err) {
        // Fallback: select the text
        document.getElementById('shareURL').select();
        alert('Link selected. Press Ctrl+C (or Cmd+C) to copy!');
    }
}
```

### Shared URL Landing Flow

**Step 1: User clicks shared URL**
```
https://robgruhl.github.io/apollo-13-scout-mission/#name=Sarah&troop=Troop%20456&score=8&total=10&rank=Flight%20Director
```

**Step 2: Landing page detects parameters**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const sharedParams = getURLParams();

    if (sharedParams) {
        // Show shared score card
        displaySharedScore(sharedParams);
        document.getElementById('sharedScoreCard').style.display = 'block';
        document.getElementById('defaultLandingContent').style.display = 'none';
    } else {
        // Show default landing page
        document.getElementById('sharedScoreCard').style.display = 'none';
        document.getElementById('defaultLandingContent').style.display = 'block';
    }
});
```

**Step 3: Display celebration card** (markup simplified, styling omitted)
```html
<section id="sharedScoreCard">
    <div class="celebration-card">
        <div id="sharedRankEmoji">⭐</div>
        <h2><span id="sharedScoutName">Sarah</span> from <span id="sharedTroopNumber">Troop 456</span></h2>
        <p>completed the Apollo 13 mission!</p>

        <div class="score-display">
            <p>Rank Achieved</p>
            <h3 id="sharedRank">Flight Director</h3>
            <p class="score-big"><span id="sharedScore">8</span>/<span id="sharedTotal">10</span></p>
            <p>Correct Decisions</p>
        </div>

        <p class="challenge">Can you match their score?</p>
        <button onclick="startNewMission()">🚀 Start My Mission</button>
    </div>
</section>
```

**Step 4: Start new mission**
```javascript
function startNewMission() {
    localStorage.removeItem('decisions');
    localStorage.removeItem('visitedSlides');
    window.location.hash = ''; // Clear URL params
    window.location.href = 'slides/01-launch.html';
}
```

---

## Decision Comparison Table

### Data Structure

```javascript
function getDecisionComparison() {
    const decisions = getDecisions();
    const comparison = [];

    for (const [slideId, correctChoice] of Object.entries(CORRECT_ANSWERS)) {
        const userDecision = decisions[slideId];
        const userChoice = userDecision ? userDecision.choice : 'not made';

        comparison.push({
            slideId: slideId,
            name: DECISION_NAMES[slideId],
            userChoice: userChoice,
            nasaChoice: correctChoice,
            correct: userChoice === correctChoice
        });
    }

    return comparison;
}
```

### Table Display

Implemented inside `displayScore()` in `slides/30-completion.html` (styling details omitted):

```javascript
// Populate comparison table
const tbody = document.getElementById('comparisonBody');
tbody.innerHTML = '';

comparison.forEach(item => {
    const row = tbody.insertRow();
    row.style.background = item.correct ? 'var(--bg-green-light)' : 'var(--bg-light)';

    row.insertCell(0).textContent = item.name;
    row.insertCell(1).textContent = formatChoice(item.userChoice);
    row.insertCell(2).textContent = formatChoice(item.nasaChoice);
    row.insertCell(3).textContent = item.correct ? '✅' : '❌';
});
```

```javascript
function formatChoice(choice) {
    const labels = {
        'freeze': 'Freeze (Stay in CM)',
        'squeeze': 'Squeeze (Move to LM)',
        'turnaround': 'Turn Around',
        'freereturn': 'Free-Return',
        'donothing': 'Do Nothing',
        'buildmailbox': 'Build Mailbox',
        'keeprunning': 'Keep Running',
        'shutdown': 'Shut Down',
        'not made': '(Not Made)'
    };
    return labels[choice] || choice;
}
```

**Note:** Option values without a label fall back to their raw value. The newer decision options (`burn`/`coast`, `sunearth`/`stars`, `extreme`/`equal`/`drinking`, `silence`/`regular`, `jumpstart`/`reserve`, `early`/`late`) still need friendly labels added here.

---

## Privacy & Data Considerations

### What Data is Stored

**Local (localStorage only):**
- Decision choices (which option selected for each decision)
- Timestamps of decisions
- Visited slides

**Shared via URL:**
- Scout's first name (user-provided)
- Troop number (user-provided)
- Score (calculated, not identifying)
- Rank (calculated, not identifying)

### What is NOT Collected

❌ No server-side tracking
❌ No analytics or cookies
❌ No email addresses
❌ No last names
❌ No location data
❌ No session tracking beyond localStorage
❌ No data sent to third parties

### Data Retention

- localStorage persists until:
  - User clears browser data
  - User clicks the hidden reset button in the footer of the landing page (`index.html`)
  - User manually calls `resetProgress()` from the browser console
- URL parameters are temporary (only in URL, not stored)
- No server-side data storage

### COPPA Compliance

✅ **Compliant** - No personal information is collected server-side
✅ **Parent-friendly** - All data stays on user's device
✅ **Transparent** - Sharing is opt-in and user-controlled
✅ **Safe** - URL shares contain only first name and troop (no identifying info)

---

## Design Decisions & Rationale

### Why URL Hash Parameters?

**Advantages:**
- ✅ No server required (static hosting)
- ✅ Shareable via any channel (text, QR, email)
- ✅ Works with GitHub Pages
- ✅ No database needed
- ✅ Privacy-friendly (no tracking)

**Disadvantages:**
- ⚠️ Limited data (URL length constraints)
- ⚠️ Visible to user (could be manipulated)
- ⚠️ Not encrypted (public data only)

**Alternatives considered:**
- Server-side database → ❌ Cost, complexity, privacy concerns
- QR codes with embedded data → ❌ Limited data, same privacy
- Blockchain/Web3 → ❌ Overkill, complexity
- Local share codes → ❌ Not scalable, manual entry

### Why localStorage?

**Advantages:**
- ✅ Persists across page navigation
- ✅ No server required
- ✅ Fast access
- ✅ Privacy-friendly (never leaves device)
- ✅ ~5-10MB storage available

**Disadvantages:**
- ⚠️ Lost if user clears browser data
- ⚠️ Not synced across devices
- ⚠️ Not accessible to other browsers

**Alternatives considered:**
- Cookies → ❌ Privacy concerns, size limits
- IndexedDB → ❌ Overkill for simple key-value
- URL parameters → ❌ Too long, not persistent
- Server storage → ❌ Cost, complexity

### Why 10 Decision Points?

**Design choice:**
- Cover the **whole rescue arc** — survival, trajectory, life support, resources, and the ride home
- Keep scoring simple and readable (10 questions = score out of 10, no percentage math)
- Every decision is a real choice NASA faced (nothing invented)
- Spread decisions throughout the mission to keep scouts engaged slide after slide

**The 10 Critical Decisions:**
1. **Freeze or Squeeze** (Slide 02) - Lifeboat decision
2. **Turn Around** (Slide 05) - Trajectory choice
3. **PC+2 Burn** (Slide 06) - Speeding up the return
4. **CO2 Mailbox** (Slide 10) - Life support improvisation
5. **Stars or Sun Navigation** (Slide 11) - Manual alignment check
6. **Power Conservation** (Slide 13) - Battery management
7. **Water Conservation** (Slide 14) - Rationing for the crew
8. **Communication Discipline** (Slide 15) - Radio silence to save power
9. **Battery Jump-Start** (Slide 17) - Reviving the command module
10. **SM Jettison Timing** (Slide 18) - Photographing the damage

### Why Ranks Instead of Raw Scores?

**Advantages:**
- ✅ More engaging ("Mission Commander" > "10/10")
- ✅ Gamification (encourages replayability)
- ✅ Scout-friendly (aligns with scout ranking system)
- ✅ Social sharing appeal (people share titles, not numbers)

**Design:**
- 4 tiers create meaningful progression
- 100% is achievable (not discouraging)
- Bronze tier (60%) is encouraging ("you helped!")
- Even 0-59% gets positive message (growth mindset)

---

## Future Enhancements

### Potential v2 Features

**Leaderboard System:**
- Anonymous aggregate stats ("Most people chose...")
- Weekly/monthly high scores
- Troop leaderboards
- Requires server-side component

**Achievement Badges:**
- "Speed Run" - Complete in <15 minutes
- "Perfectionist" - 100% on first try
- "Explorer" - Visit all slides
- "Researcher" - Expand all "Learn More" sections

**Advanced Sharing:**
- QR code generation from share URL
- Social media cards (Open Graph meta tags)
- Print certificate with score
- Email share option

**Analytics (Privacy-Friendly):**
- Most common wrong answers
- Average completion time
- Drop-off points
- Decision distribution (anonymized)

**Multiplayer Comparison:**
- Side-by-side score comparison
- "Challenge a friend" mode
- Team scores (patrol/troop level)

---

## Testing Scenarios

### Test Case 1: Perfect Score

**Steps:**
1. Start fresh (clear localStorage)
2. Make all 10 decisions correctly:
   - Slide 02: Choose "squeeze"
   - Slide 05: Choose "freereturn"
   - Slide 06: Choose "burn"
   - Slide 10: Choose "buildmailbox"
   - Slide 11: Choose "sunearth"
   - Slide 13: Choose "shutdown"
   - Slide 14: Choose "extreme"
   - Slide 15: Choose "silence"
   - Slide 17: Choose "jumpstart"
   - Slide 18: Choose "early"
3. Complete to slide 30

**Expected:**
- Score: 10/10 (100%)
- Rank: Mission Commander 🏆
- All 10 rows in comparison table show ✅
- Share URL contains `score=10&total=10&rank=Mission%20Commander`

### Test Case 2: Partial Score

**Steps:**
1. Make 6 correct, 4 incorrect:
   - Slide 02: ✅ squeeze
   - Slide 05: ❌ turnaround (wrong)
   - Slide 06: ✅ burn
   - Slide 10: ✅ buildmailbox
   - Slide 11: ❌ stars (wrong)
   - Slide 13: ✅ shutdown
   - Slide 14: ❌ equal (wrong)
   - Slide 15: ✅ silence
   - Slide 17: ✅ jumpstart
   - Slide 18: ❌ late (wrong)
2. Complete to slide 30

**Expected:**
- Score: 6/10 (60%)
- Rank: Flight Controller 🎯
- 6 green rows, 4 red rows in table
- Share URL contains `score=6&total=10&rank=Flight%20Controller`

### Test Case 3: Shared URL Landing

**Steps:**
1. Visit: `https://robgruhl.github.io/apollo-13-scout-mission/#name=Test&troop=Troop%20999&score=8&total=10&rank=Flight%20Director`
2. Observe landing page

**Expected:**
- Shared score card visible
- Default landing content hidden
- Shows "Test from Troop 999"
- Shows "Flight Director" rank
- Shows "8/10" score
- Shows ⭐ emoji
- "Start My Mission" button clears params and goes to slide 01

### Test Case 4: No Decisions Made

**Steps:**
1. Navigate directly to slide 30 without making decisions
2. Observe score display

**Expected:**
- Score: 0/10 (0%)
- Rank: Ground Crew 📡
- All 10 rows show "(Not Made)" for user choice
- Encouraging message to review

### Test Case 5: localStorage Persistence

**Steps:**
1. Make 2 decisions
2. Close browser
3. Reopen and navigate to completion page

**Expected:**
- Decisions are remembered
- Score reflects only decisions made
- Missing decisions show "not made"

---

## Implementation Checklist

**Core Functionality:**
- [x] Track decisions in localStorage
- [x] Calculate score on completion
- [x] Assign rank based on percentage
- [x] Generate shareable URL
- [x] Parse URL parameters on landing page
- [x] Display score badge on completion
- [x] Show decision comparison table
- [x] Copy shareable link to clipboard

**UI/UX:**
- [x] Score badge with rank emoji and color
- [x] Comparison table with color coding
- [x] Share form with name/troop inputs
- [x] Celebration card on shared URL landing
- [x] "Start My Mission" button clears state
- [x] Responsive design for all score components

**Edge Cases:**
- [x] Handle no decisions made
- [x] Handle partial completion
- [x] Handle invalid URL parameters
- [x] Handle missing localStorage
- [x] Handle browser without clipboard API (text-select fallback)

**Testing:**
- [x] All 4 rank tiers (e.g., 0/10, 6/10, 8/10, 10/10) display correctly
- [x] URL generation works
- [x] URL parsing works
- [x] Clipboard copy with text-select fallback
- [x] Mobile responsive
- [x] Cross-browser compatible

---

## API Reference

### Public Functions

```javascript
// Score Calculation (app.js)
calculateScore() → { correct: number, total: number }
getScoreRank(correct, total) → { rank: string, emoji: string, message: string, color: string }
getDecisionComparison() → Array<{slideId, name, userChoice, nasaChoice, correct}>

// URL Sharing (app.js)
generateShareURL(name, troop) → string
getURLParams() → { name, troop, score, total, rank } | null

// Data Management (app.js)
saveDecision(slideId, choice) → void
getDecisions() → Object
getVisitedSlides() → Array<string>
resetProgress() → void
startNewMission() → void

// Progressive Feedback (app.js)
showAlignmentFeedback(slideId, userChoice) → void
updateDecisionTracker() → void
toggleScoreSummary() → void

// Page Helpers (slides/30-completion.html)
displayScore() → void
formatChoice(choice) → string
generateShareLink() → void
copyShareLink() → Promise<void>

// Page Helpers (index.html)
displaySharedScore(params) → void
```

---

## Maintenance Notes

### Updating Correct Answers

To add/modify decision answers:

1. Edit `CORRECT_ANSWERS` object in `app.js` (the total is derived from this object in `calculateScore()`)
2. Update `DECISION_NAMES` object
3. Update the hardcoded slide-ID lists in `updateDecisionTracker()` and `updateScoreSummary()` in `app.js`
4. Add friendly labels for any new option values to `formatChoice()` in `slides/30-completion.html`
5. Test all score percentages still make sense

### Changing Rank Thresholds

To adjust rank requirements:

1. Edit `getScoreRank()` function
2. Update percentage thresholds
3. Test edge cases at the boundaries (exactly 80% = 8/10, exactly 60% = 6/10)
4. Update documentation

### Adding New Sharing Methods

To add new share channels:

1. Extend `generateShareLink()` / `copyShareLink()` in `slides/30-completion.html`
2. Add new button/link in UI
3. Test on target platform
4. Update documentation

---

**Document Status**: ✅ Complete
**Implementation Status**: ✅ Fully Implemented
**Last Updated**: 2026-07-04
