# Apollo 13 Scoring & Score-Sharing System - Design Documentation

**Version**: 1.0
**Date**: 2025-10-04
**Status**: ✅ Implemented
**Implementation**: `assets/js/app.js`, `slides/24-completion.html`, `index.html`

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
  "9": {
    "choice": "buildmailbox",
    "timestamp": "2025-10-04T12:42:15.456Z"
  },
  "12": {
    "choice": "shutdown",
    "timestamp": "2025-10-04T12:45:33.789Z"
  }
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
    '2': 'squeeze',      // Freeze or Squeeze → SQUEEZE (move to LM)
    '5': 'freereturn',   // Turn Around → FREE-RETURN (use Moon's gravity)
    '9': 'buildmailbox', // CO2 Mailbox → BUILD (improvise adapter)
    '12': 'shutdown'     // CM Power → SHUTDOWN (preserve batteries)
};

const DECISION_NAMES = {
    '2': 'Freeze or Squeeze',
    '5': 'Turn Around Decision',
    '9': 'CO2 Mailbox',
    '12': 'Power Conservation'
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

**4 Ranks based on percentage:**

| Score | Rank | Emoji | Color | Message |
|-------|------|-------|-------|---------|
| 100% (4/4) | Mission Commander | 🏆 | Gold | "Perfect score! You made every decision exactly like NASA!" |
| 75-99% (3/4) | Flight Director | ⭐ | Silver | "Excellent work! You have the instincts of a NASA flight director." |
| 50-74% (2/4) | Flight Controller | 🎯 | Bronze | "Good decisions! You helped bring the crew home." |
| 0-49% (0-1/4) | Ground Crew | 📡 | Gray | "Review the mission to see what NASA decided and why!" |

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
    } else if (percentage >= 75) {
        return {
            rank: 'Flight Director',
            emoji: '⭐',
            message: 'Excellent work! You have the instincts of a NASA flight director.',
            color: '#C0C0C0' // Silver
        };
    } else if (percentage >= 50) {
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
https://robgruhl.github.io/apollo-mission/
```

**Shared Score URL:**
```
https://robgruhl.github.io/apollo-mission/#name=John&troop=Troop%20123&score=4&total=4&rank=Mission%20Commander
```

**Parameters (in hash fragment):**
- `name` - Scout's first name (URL encoded)
- `troop` - Troop number/name (URL encoded)
- `score` - Number of correct decisions (0-4)
- `total` - Total number of decisions (always 4)
- `rank` - Achieved rank (URL encoded)

### URL Generation

**User Input Form** (on completion page):

```html
<div class="share-form">
    <label for="scoutName">Your Name:</label>
    <input type="text" id="scoutName" placeholder="John" maxlength="50">

    <label for="troopNumber">Your Troop:</label>
    <input type="text" id="troopNumber" placeholder="Troop 123" maxlength="50">

    <button onclick="generateShare()">Generate Share Link</button>
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

### Completion Flow (Slide 24)

**Step 1: User completes all 24 slides**
- Reaches `slides/24-completion.html`
- JavaScript runs `calculateScore()` on page load

**Step 2: Score display**
```javascript
// On page load
const { correct, total } = calculateScore();
const rankDetails = getScoreRank(correct, total);

// Display score badge
document.getElementById('rankEmoji').textContent = rankDetails.emoji;
document.getElementById('rankTitle').textContent = rankDetails.rank;
document.getElementById('scoreDisplay').textContent = `${correct}/${total}`;
document.getElementById('rankMessage').textContent = rankDetails.message;

// Show comparison table
const comparison = getDecisionComparison();
displayComparisonTable(comparison);
```

**Step 3: Share form**
- User enters name and troop number
- Clicks "Generate Share Link"
- URL is generated and displayed in a text field
- User can copy the link or use native share API

**Step 4: Share options**
```javascript
async function shareScore() {
    const name = document.getElementById('scoutName').value;
    const troop = document.getElementById('troopNumber').value;

    if (!name || !troop) {
        alert('Please enter your name and troop number!');
        return;
    }

    const shareURL = generateShareURL(name, troop);

    // Try native share API (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Apollo 13 Mission - My Score!',
                text: `I scored ${correct}/${total} on the Apollo 13 mission! Can you beat my score?`,
                url: shareURL
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(shareURL);
            }
        }
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(shareURL);
    }
}
```

### Shared URL Landing Flow

**Step 1: User clicks shared URL**
```
https://robgruhl.github.io/apollo-mission/#name=Sarah&troop=Troop%20456&score=3&total=4&rank=Flight%20Director
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

**Step 3: Display celebration card**
```html
<section id="sharedScoreCard">
    <div class="celebration-card">
        <div class="rank-emoji">⭐</div>
        <h2>Sarah from Troop 456</h2>
        <p>completed the Apollo 13 mission!</p>

        <div class="score-display">
            <p>Rank Achieved</p>
            <h3>Flight Director</h3>
            <p class="score-big">3/4</p>
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

```javascript
function displayComparisonTable(comparison) {
    const tbody = document.getElementById('comparisonBody');
    tbody.innerHTML = '';

    comparison.forEach(item => {
        const row = document.createElement('tr');
        row.style.background = item.correct ? '#E8F5E9' : '#FFEBEE';

        row.innerHTML = `
            <td style="padding: 0.75rem;">${item.name}</td>
            <td style="padding: 0.75rem; text-align: center;">${formatChoice(item.userChoice)}</td>
            <td style="padding: 0.75rem; text-align: center;">${formatChoice(item.nasaChoice)}</td>
            <td style="padding: 0.75rem; text-align: center;">
                ${item.correct ? '✅ Correct' : '❌ Different'}
            </td>
        `;

        tbody.appendChild(row);
    });
}

function formatChoice(choice) {
    const choiceNames = {
        'squeeze': 'Move to LM',
        'freeze': 'Stay in CM',
        'freereturn': 'Free-Return Trajectory',
        'turnaround': 'Direct Abort',
        'buildmailbox': 'Build Mailbox',
        'conserveco2': 'Conserve CO2',
        'shutdown': 'Shutdown CM',
        'keeprunning': 'Keep Running',
        'not made': '⚠️ Not Made'
    };
    return choiceNames[choice] || choice;
}
```

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
  - User clicks "Start Over" on completion page
  - User manually calls `resetProgress()`
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

### Why 4 Decision Points?

**Design choice:**
- Focus on **most critical** decisions (mission-defining moments)
- Keep scoring simple and achievable (4 questions = clear %)
- Avoid decision fatigue (10 decisions would be exhausting)
- Enable quick gameplay (20-30 minute experience)

**The 4 Critical Decisions:**
1. **Freeze or Squeeze** (Slide 02) - Lifeboat decision
2. **Turn Around** (Slide 05) - Trajectory choice
3. **CO2 Mailbox** (Slide 09) - Life support improvisation
4. **Power Conservation** (Slide 12) - Battery management

### Why Ranks Instead of Raw Scores?

**Advantages:**
- ✅ More engaging ("Mission Commander" > "4/4")
- ✅ Gamification (encourages replayability)
- ✅ Scout-friendly (aligns with scout ranking system)
- ✅ Social sharing appeal (people share titles, not numbers)

**Design:**
- 4 tiers create meaningful progression
- 100% is achievable (not discouraging)
- Bronze tier (50%) is encouraging ("you helped!")
- Even 0-49% gets positive message (growth mindset)

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
2. Make all 4 decisions correctly:
   - Slide 02: Choose "squeeze"
   - Slide 05: Choose "freereturn"
   - Slide 09: Choose "buildmailbox"
   - Slide 12: Choose "shutdown"
3. Complete to slide 24

**Expected:**
- Score: 4/4 (100%)
- Rank: Mission Commander 🏆
- All 4 rows in comparison table show ✅
- Share URL contains `score=4&total=4&rank=Mission%20Commander`

### Test Case 2: Partial Score

**Steps:**
1. Make 2 correct, 2 incorrect:
   - Slide 02: ✅ squeeze
   - Slide 05: ❌ turnaround (wrong)
   - Slide 09: ✅ buildmailbox
   - Slide 12: ❌ keeprunning (wrong)
3. Complete to slide 24

**Expected:**
- Score: 2/4 (50%)
- Rank: Flight Controller 🎯
- 2 green rows, 2 red rows in table
- Share URL contains `score=2&total=4&rank=Flight%20Controller`

### Test Case 3: Shared URL Landing

**Steps:**
1. Visit: `https://robgruhl.github.io/apollo-mission/#name=Test&troop=Troop%20999&score=3&total=4&rank=Flight%20Director`
2. Observe landing page

**Expected:**
- Shared score card visible
- Default landing content hidden
- Shows "Test from Troop 999"
- Shows "Flight Director" rank
- Shows "3/4" score
- Shows ⭐ emoji
- "Start My Mission" button clears params and goes to slide 01

### Test Case 4: No Decisions Made

**Steps:**
1. Navigate directly to slide 24 without making decisions
2. Observe score display

**Expected:**
- Score: 0/4 (0%)
- Rank: Ground Crew 📡
- All 4 rows show "⚠️ Not Made" for user choice
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
- [x] Handle share via native API or clipboard

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
- [x] Handle browser without share API

**Testing:**
- [x] All 4 scores (0/4, 2/4, 3/4, 4/4) display correctly
- [x] URL generation works
- [x] URL parsing works
- [x] Share API fallback to clipboard
- [x] Mobile responsive
- [x] Cross-browser compatible

---

## API Reference

### Public Functions (app.js)

```javascript
// Score Calculation
calculateScore() → { correct: number, total: number }
getScoreRank(correct, total) → { rank: string, emoji: string, message: string, color: string }
getDecisionComparison() → Array<{slideId, name, userChoice, nasaChoice, correct}>

// URL Sharing
generateShareURL(name, troop) → string
getURLParams() → { name, troop, score, total, rank } | null

// Data Management
saveDecision(slideId, choice) → void
getDecisions() → Object
resetProgress() → void
startNewMission() → void

// Utilities
formatChoice(choice) → string
displayComparisonTable(comparison) → void
```

---

## Maintenance Notes

### Updating Correct Answers

To add/modify decision answers:

1. Edit `CORRECT_ANSWERS` object in `app.js`
2. Update `DECISION_NAMES` object
3. Update total count (currently hardcoded as 4)
4. Test all score percentages still make sense

### Changing Rank Thresholds

To adjust rank requirements:

1. Edit `getScoreRank()` function
2. Update percentage thresholds
3. Test edge cases (e.g., exactly 75%)
4. Update documentation

### Adding New Sharing Methods

To add new share channels:

1. Extend `shareScore()` function
2. Add new button/link in UI
3. Test on target platform
4. Update documentation

---

**Document Status**: ✅ Complete
**Implementation Status**: ✅ Fully Implemented
**Last Updated**: 2025-10-04
