# Apollo 13 Scoring & Score-Sharing System - Design Documentation

**Version**: 2.0
**Date**: 2026-07-05
**Status**: ✅ Implemented
**Implementation**: `assets/js/app.js`, `slides/30-completion.html`, `assets/js/qrcode.js`, `index.html`

**Changelog**: v2.0 — slides renumbered into mission chronology (10 scored decisions now on slides 4, 5, 6, 9, 11, 12, 13, 16, 17, 18); decisions lock on first tap; running-score tracker badge; new `bestScore` key; score-first completion page with empty state, Apollo-card banner (≥8/10), "Fly the Mission Again" replay, and QR share; Quick Mission mode.

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
- QR code rendered from the share link (vendored `qrcode.js`) so scouts share phone-to-phone

### 4. Decision Locking
- Each decision locks the moment a scout taps a choice — both buttons disable and the pick can't be changed
- Locked state is restored on revisit (choice highlighted, buttons still disabled)
- Keeps on-screen scores honest so they match the physical rank card handed out at the table

### 5. Running Score Tracker
- A `🏆 N/10` badge in the decision tracker updates live as decisions are made
- Lets scouts always see which rank card they're on pace for

### 6. Quick Mission Mode
- `?mode=quick` chains just the 10 decision slides (~10 minutes) for scouts at the table
- Exits automatically at the completion page (or via `?mode=full`)

---

## Technical Architecture

### Data Storage (localStorage)

**Key: `decisions`**
```javascript
{
  "4": {
    "choice": "squeeze",           // User's selected option (locked after first tap)
    "timestamp": "2026-07-05T12:34:56.789Z"
  },
  "5": {
    "choice": "shutdown",
    "timestamp": "2026-07-05T12:38:22.123Z"
  },
  "6": {
    "choice": "freereturn",
    "timestamp": "2026-07-05T12:42:15.456Z"
  }
  // ... one entry per decision made
  // (10 scored decisions: slides 4, 5, 6, 9, 11, 12, 13, 16, 17, 18)
}
```

**Key: `visitedSlides`**
```javascript
["1", "2", "3", "4", "5", "6", ...]
```

**Key: `bestScore`**
```javascript
"8"   // Highest correct-decision count across replays (stored as a string)
```
Written by `flyAgain()` on the completion page just before it clears `decisions` for a replay, and read back on the next completion to show a "Best so far: N/10" line when the current run scores lower. It deliberately survives the replay reset (which clears `decisions` and `visitedSlides`).

### Correct Answers Reference

Defined in `assets/js/app.js`:

```javascript
const CORRECT_ANSWERS = {
    '4': 'squeeze',           // Decision #1: Freeze or Squeeze → SQUEEZE (move to LM)
    '5': 'shutdown',          // Decision #2: CM Power → SHUTDOWN (preserve batteries)
    '6': 'freereturn',        // Decision #3: Turn Around → FREE-RETURN (use Moon's gravity)
    '9': 'sunearth',          // Decision #4: Navigation → SUN/EARTH (manual alignment)
    '11': 'burn',             // Decision #5: PC+2 Burn → PERFORM BURN (speed up return)
    '12': 'extreme',          // Decision #6: Water Conservation → EXTREME RATIONING
    '13': 'buildmailbox',     // Decision #7: CO2 Mailbox → BUILD (improvise adapter)
    '16': 'silence',          // Decision #8: Comm Power → LOW-POWER CONFIG
    '17': 'jumpstart',        // Decision #9: Battery Recharge → ATTEMPT LM-TO-CM CHARGE
    '18': 'early'             // Decision #10: SM Jettison → EARLY JETTISON (photograph damage)
};

const DECISION_NAMES = {
    '4': 'Freeze or Squeeze',
    '5': 'Power Conservation',
    '6': 'Turn Around Decision',
    '9': 'Stars or Sun Navigation',
    '11': 'PC+2 Burn (Speed Up)',
    '12': 'Water Conservation',
    '13': 'CO2 Mailbox',
    '16': 'Comm Power',
    '17': 'Battery Recharge',
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

## Decision Locking

Every scored decision **locks on the first tap**. When a scout chooses an option, `initDecisions()` saves the choice, then calls `lockDecision()`:

```javascript
function lockDecision(options, result, chosenValue) {
    options.forEach(opt => {
        const btn = opt.querySelector('.btn-choose');
        if (opt.dataset.option === chosenValue) {
            opt.classList.add('selected');
            if (btn) {
                btn.textContent = '✅ Your Call — Locked In';
                btn.disabled = true;
            }
        } else {
            opt.classList.remove('selected');
            if (btn) {
                btn.disabled = true;   // every choice button disables
            }
        }
    });
    if (result) {
        result.classList.remove('hidden');
    }
}
```

On revisit, `initDecisions()` reads the stored decision and re-applies the locked state (highlighted choice, buttons disabled, result revealed) before wiring any click handlers — so a scout can re-read a slide but not re-answer it.

**Why lock?** The on-screen `N/10` score is the ticket to a **physical rank card** at the table. If scouts could revise past answers after seeing later feedback, the number on the completion screen would drift away from the calls they actually made. Locking keeps the digital score honest so table staff can trust it when handing out cards. Real mission decisions couldn't be taken back either — neither can these.

---

## Running Score Tracker

`updateDecisionTracker()` runs after every decision and keeps a live `🏆 N/10` badge in the decision tracker up to date, creating the element on first use:

```javascript
// Running score text ("🏆 4/10") so scouts always know if they're on pace
const { correct } = calculateScore();
let scoreText = document.getElementById('trackerScore');
if (!scoreText) {
    scoreText = document.createElement('span');
    scoreText.id = 'trackerScore';
    scoreText.className = 'tracker-score';
    tracker.appendChild(scoreText);
}
scoreText.textContent = `🏆 ${correct}/${Object.keys(CORRECT_ANSWERS).length}`;
```

The tracker itself only appears once the first decision is made (`initDecisionTracker()`), so scouts always know which rank card they're on pace for (cards from 4/10) without waiting for the completion page.

---

## URL Sharing System

### URL Structure

**Base URL:**
```
https://apollo13.quest/
```

**Shared Score URL:**
```
https://apollo13.quest/#name=John&troop=Troop%20123&score=10&total=10&rank=Mission%20Commander
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

The completion page is **score-first**: score badge, Apollo-card banner, and replay button come before the mission recap. `displayScore()` runs on `DOMContentLoaded`.

**Step 1: Empty-state guard (deep-link safe)**
The page is linkable from the timeline, so a scout can arrive without having played. If none of the 10 decision slides has a stored decision, `displayScore()` shows the empty state (a prompt to go make the first decision) rather than a fake 0/10, and returns early.
```javascript
// DECISION_KEYS = ['4', '5', '6', '9', '11', '12', '13', '16', '17', '18'] (defined inline on the page)
const decisions = getDecisions();
const answered = DECISION_KEYS.filter(k => decisions[k]).length;
if (answered === 0) {
    document.getElementById('emptyState').style.display = 'block';
    return;
}
```

**Step 2: Score display**
```javascript
const { correct, total } = calculateScore();
const rank = getScoreRank(correct, total);
const comparison = getDecisionComparison();

document.getElementById('scoreSection').style.display = 'block';
document.getElementById('rankEmoji').textContent = rank.emoji;
document.getElementById('rankTitle').textContent = rank.rank;
document.getElementById('scoreDisplay').textContent = `${correct}/${total}`;
document.getElementById('rankMessage').textContent = rank.message;
```

**Step 3: Personal best**
`bestScore` (see Data Storage) is read back, and if a previous run beat this one, a "Best so far: N/10" line appears:
```javascript
const best = parseInt(localStorage.getItem('bestScore') || '0', 10);
if (best > correct) {
    bestLine.textContent = `Best so far: ${best}/${total}`;
    bestLine.style.display = 'block';
}
```

**Step 4: Rank-card banner (≥ 4/10)**
Matching NASA on **4 of 10** calls earns a physical rank card matching the score — Ground Crew (4–5), Flight Controller (6–7), Flight Director (8–9), Mission Commander (10) (Ed's 2026-07-05 four-card scheme, trophy counts 4/6/8/10). At 4+ the banner shows the big score, names the earned rank card, and directs the scout to the table (with a climb-toward-Mission-Commander nudge below 10/10); below 4 it's an encouraging "go for it" prompt.
```javascript
if (correct >= 4) {
    card.className = 'card-banner earned';
    card.innerHTML =
        '<div class="card-score">' + correct + '/10</div>' +
        '<h3>🎖️ You earned the ' + rank.rank + ' card!</h3>' +
        '<p>Show this screen at the <strong>Apollo Table in the NASA Tent</strong> to pick up your rank card. ' + climb + '</p>';
} else {
    card.className = 'card-banner tryagain';
    // ... "Go for a rank card!" — match NASA on 4 of 10 to earn one
}
```

**Step 5: Comparison table**
One row per decision (`getDecisionComparison()`), green for matches, red for misses.

**Step 6: Fly the Mission Again (replay loop)**
The "🔁 Fly the Mission Again" button calls `flyAgain()`, which records the personal best, clears progress, and restarts from slide 01. It intentionally mirrors `startNewMission()` rather than calling it — `startNewMission()` hardcodes the root-relative `slides/01-launch.html`, which would 404 from inside `slides/`.
```javascript
function flyAgain() {
    const { correct } = calculateScore();
    const stored = parseInt(localStorage.getItem('bestScore') || '0', 10);
    const best = Math.max(correct, isNaN(stored) ? 0 : stored);
    localStorage.setItem('bestScore', String(best));   // personal best survives the reset

    localStorage.removeItem('decisions');
    localStorage.removeItem('visitedSlides');
    window.location.hash = '';
    window.location.href = '01-launch.html';
}
```

**Step 7: Share form + QR**
The scout enters name and troop, clicks "🔗 Generate Share Link", and the URL appears in a text field (copyable with "📋 Copy Link"). `generateShareLink()` also renders the link as a QR code via `renderShareQR()` (vendored `assets/js/qrcode.js`) so scouts share phone-to-phone at the table.
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

    renderShareQR(shareURL);   // QR is a bonus; the copyable link still works if it fails
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
https://apollo13.quest/#name=Sarah&troop=Troop%20456&score=8&total=10&rank=Flight%20Director
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

## Quick Mission Mode

For scouts at the table with ~10 minutes, **Quick Mission mode** chains just the 10 decision slides and skips the narrative/info slides between them.

**Entry:** any link with `?mode=quick`. `initQuickMode()` sets a `quickMode` flag in `sessionStorage`:
```javascript
if (params.get('mode') === 'quick') sessionStorage.setItem('quickMode', '1');
if (params.get('mode') === 'full') sessionStorage.removeItem('quickMode');
```

**While active:** on each decision slide the prev/next buttons are rewritten to walk `QUICK_CHAIN` (the 10 decision slides plus the completion page), and the nav progress reads `⚡ Decision N of 10`:
```javascript
const QUICK_CHAIN = [
    '04-freeze-squeeze.html', '05-power-conservation.html', '06-turn-around.html',
    '09-stars-sun-navigation.html', '11-pc2-burn.html', '12-water-conservation.html',
    '13-co2-mailbox.html', '16-communication-discipline.html', '17-battery-jumpstart.html',
    '18-sm-jettison-timing.html', '30-completion.html'
];
```
The first slide's "prev" points back to `../index.html`; scoring, locking, and the running tracker behave exactly as in the full mission.

**Exit:** reaching `30-completion.html` clears the `quickMode` flag (the mission is over, so the full site returns). `?mode=full` clears it too, and because the flag lives in `sessionStorage` it also ends when the tab closes.

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
        'burn': 'Perform PC+2 Burn',
        'coast': 'Coast on Free-Return',
        'donothing': 'Do Nothing',
        'buildmailbox': 'Build Mailbox',
        'sunearth': 'Sun/Earth Terminator',
        'stars': 'Star Sighting',
        'keeprunning': 'Keep Running',
        'shutdown': 'Shut Down',
        'extreme': 'Extreme Rationing',
        'equal': 'Equal Rationing',
        'drinking': 'Prioritize Drinking Water',
        'silence': 'Low-Power Comms',
        'regular': 'Full-Power Comms',
        'jumpstart': 'Jump-Start from LM',
        'reserve': 'CM Reserve Batteries Only',
        'early': 'Early Jettison',
        'late': 'Late Jettison',
        'not made': '(Not Made)'
    };
    return labels[choice] || choice;
}
```

**Note:** Every option value across the 10 decisions now has a friendly label; any unmapped value falls back to its raw string.

---

## Privacy & Data Considerations

### What Data is Stored

**Local (localStorage only):**
- Decision choices (which option selected for each decision)
- Timestamps of decisions
- Visited slides
- Personal best score (`bestScore` — highest correct count across replays)

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

**The 10 Critical Decisions** (in mission chronology):
1. **Freeze or Squeeze** (Slide 04) - Lifeboat decision
2. **Power Conservation** (Slide 05) - Shut the CM down to preserve batteries
3. **Turn Around Decision** (Slide 06) - Free-return trajectory choice
4. **Stars or Sun Navigation** (Slide 09) - Manual alignment check
5. **PC+2 Burn** (Slide 11) - Speeding up the return
6. **Water Conservation** (Slide 12) - Rationing for the crew
7. **CO2 Mailbox** (Slide 13) - Life support improvisation
8. **Comm Power** (Slide 16) - Low-power comms to save power
9. **Battery Recharge** (Slide 17) - Reviving the command module
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
- Social media cards (Open Graph meta tags)
- Print certificate with score
- Email share option

_(QR code generation from the share URL shipped in v2.0 — see the completion flow.)_

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
2. Make all 10 decisions correctly (each locks on the first tap):
   - Slide 04: Choose "squeeze"
   - Slide 05: Choose "shutdown"
   - Slide 06: Choose "freereturn"
   - Slide 09: Choose "sunearth"
   - Slide 11: Choose "burn"
   - Slide 12: Choose "extreme"
   - Slide 13: Choose "buildmailbox"
   - Slide 16: Choose "silence"
   - Slide 17: Choose "jumpstart"
   - Slide 18: Choose "early"
3. Complete to slide 30

**Expected:**
- Score: 10/10 (100%)
- Rank: Mission Commander 🏆
- Apollo-card banner in "earned" state (10 ≥ 8): "Show this screen at the Apollo Table"
- All 10 rows in comparison table show ✅
- Share URL contains `score=10&total=10&rank=Mission%20Commander`

### Test Case 2: Partial Score

**Steps:**
1. Make 6 correct, 4 incorrect:
   - Slide 04: ✅ squeeze
   - Slide 05: ❌ keeprunning (wrong)
   - Slide 06: ✅ freereturn
   - Slide 09: ❌ stars (wrong)
   - Slide 11: ✅ burn
   - Slide 12: ❌ equal (wrong)
   - Slide 13: ✅ buildmailbox
   - Slide 16: ✅ silence
   - Slide 17: ✅ jumpstart
   - Slide 18: ❌ late (wrong)
2. Complete to slide 30

**Expected:**
- Score: 6/10 (60%)
- Rank: Flight Controller 🎯
- Rank-card banner in "earned" state (6 ≥ 4): "You earned the Flight Controller card!"
- 6 green rows, 4 red rows in table
- Share URL contains `score=6&total=10&rank=Flight%20Controller`

### Test Case 3: Shared URL Landing

**Steps:**
1. Visit: `https://apollo13.quest/#name=Test&troop=Troop%20999&score=8&total=10&rank=Flight%20Director`
2. Observe landing page

**Expected:**
- Shared score card visible
- Default landing content hidden
- Shows "Test from Troop 999"
- Shows "Flight Director" rank
- Shows "8/10" score
- Shows ⭐ emoji
- "Start My Mission" button clears params and goes to slide 01

### Test Case 4: No Decisions Made (Empty State)

**Steps:**
1. Navigate directly to slide 30 without making any decisions (deep link from the timeline)
2. Observe the completion page

**Expected:**
- Empty state shown: "You haven't made your decisions yet, astronaut! 🚀"
- Score section, card banner, and comparison table stay hidden (no fake 0/10 score)
- "Make Your First Decision" links to slide 04; "Mission Home" links to `index.html`

### Test Case 5: localStorage Persistence

**Steps:**
1. Make 2 decisions
2. Close browser
3. Reopen and navigate to completion page

**Expected:**
- Decisions are remembered
- Score reflects only decisions made
- Missing decisions show "not made"

### Test Case 6: Decision Locks on First Tap

**Steps:**
1. Start fresh; open slide 04
2. Tap "Squeeze", then try to tap "Freeze"
3. Navigate away and return to slide 04

**Expected:**
- After the first tap, both choice buttons are disabled; the chosen button reads "✅ Your Call — Locked In"
- The result / alignment feedback reveals; the choice cannot be changed
- On return, the locked state is restored (choice highlighted, buttons disabled) — no second answer possible

### Test Case 7: Replay Loop and Personal Best

**Steps:**
1. Complete a run scoring 8/10; on the completion page click "🔁 Fly the Mission Again"
2. Play again scoring 6/10; reach the completion page

**Expected:**
- `bestScore` = `"8"` persists across the reset; `decisions` and `visitedSlides` are cleared
- Second completion shows 6/10 plus a "Best so far: 8/10" line
- Replay restarts from slide 01 (resolves to `01-launch.html` from inside `slides/` — no 404)

### Test Case 8: Quick Mission Mode

**Steps:**
1. Open a decision slide with `?mode=quick` (e.g. `slides/04-freeze-squeeze.html?mode=quick`)
2. Advance with Next through the chain

**Expected:**
- Nav progress reads "⚡ Decision N of 10"; Next/Prev chain only the 10 decision slides (`QUICK_CHAIN`)
- Reaching slide 30 clears the `quickMode` sessionStorage flag (mode ends); `?mode=full` also clears it

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

// Decision Flow (app.js)
lockDecision(options, result, chosenValue) → void   // disables both buttons, restores locked state

// Progressive Feedback (app.js)
showAlignmentFeedback(slideId, userChoice) → void
initDecisionTracker() → void
updateDecisionTracker() → void                       // also maintains the "🏆 N/10" #trackerScore badge
toggleScoreSummary() → void
updateScoreSummary() → void
closeSummary() → void

// Mode & Offline (app.js)
initQuickMode() → void                               // ?mode=quick chains QUICK_CHAIN via sessionStorage
initOfflineCache() → void                            // registers the service worker

// Page Helpers (slides/30-completion.html)
displayScore() → void                                // score-first; empty-state guard; card banner; best score
formatChoice(choice) → string
flyAgain() → void                                    // saves bestScore, clears progress, restarts at 01
generateShareLink() → void
renderShareQR(url) → void                            // qrcode.js; QR of the share link
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
3. Update the hardcoded slide-ID lists in `updateDecisionTracker()` and `updateScoreSummary()` in `app.js`, and `DECISION_KEYS` in `slides/30-completion.html`
4. If a decision slide's filename changes, update `QUICK_CHAIN` in `app.js` (the Quick Mission slide order)
5. Add friendly labels for any new option values to `formatChoice()` in `slides/30-completion.html`
6. Test all score percentages still make sense

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
**Last Updated**: 2026-07-05
