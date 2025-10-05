/**
 * Apollo 13 Interactive Experience - Main JavaScript
 * 2026 Elevate Scout Jamboree - NASA Tent, Apollo Table
 * Presented by Ed Gruhl, Scout District Commissioner, Glacial Trails District
 */

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDecisions();
    initProgressTracking();
    initKeyboardNav();
    initExpandables();
    initDecisionTracker();
});

/**
 * Navigation initialization
 */
function initNavigation() {
    // Smooth scroll to top on page load
    window.scrollTo(0, 0);

    // Store previous page for back navigation
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.setItem('previousPage', window.location.pathname);
        });
    });
}

/**
 * Decision slide interaction
 */
function initDecisions() {
    const options = document.querySelectorAll('.option');
    const result = document.getElementById('result');

    if (!options.length) return; // Not a decision page

    options.forEach(option => {
        const button = option.querySelector('.btn-choose');
        if (!button) return;

        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Mark selected
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // Show result
            if (result) {
                result.classList.remove('hidden');
                result.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Track decision (localStorage)
            const slideId = document.body.dataset.slideId;
            const choice = option.dataset.option;
            if (slideId && choice) {
                saveDecision(slideId, choice);

                // Show alignment indicator
                showAlignmentFeedback(slideId, choice);

                // Update decision tracker
                updateDecisionTracker();
            }
        });
    });
}

/**
 * Progress tracking
 */
function initProgressTracking() {
    const slideId = document.body.dataset.slideId;
    if (!slideId) return;

    // Get or create visited slides set
    let visited = [];
    try {
        visited = JSON.parse(localStorage.getItem('visitedSlides') || '[]');
    } catch (e) {
        visited = [];
    }

    if (!visited.includes(slideId)) {
        visited.push(slideId);
        localStorage.setItem('visitedSlides', JSON.stringify(visited));
    }

    // Update progress indicator (only for mission slides 1-29)
    const current = parseInt(slideId) || 1;
    const progressText = document.querySelector('.nav-progress');

    // Only update progress for mission slides (1-29)
    // Merit badge pages (30-33) use custom progress text
    if (progressText && current >= 1 && current <= 29) {
        const total = 29;
        progressText.textContent = `Slide ${current} of ${total}`;
    }
}

/**
 * Keyboard navigation (arrow keys)
 */
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Don't interfere if user is typing
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const prevLink = document.querySelector('.btn-prev');
        const nextLink = document.querySelector('.btn-next');

        if (e.key === 'ArrowLeft' && prevLink) {
            prevLink.click();
        } else if (e.key === 'ArrowRight' && nextLink) {
            nextLink.click();
        }
    });
}

/**
 * Expandable sections (details/summary)
 */
function initExpandables() {
    const details = document.querySelectorAll('details');

    details.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                // Scroll into view when opened
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
}

/**
 * Save decision to localStorage
 */
function saveDecision(slideId, choice) {
    let decisions = {};
    try {
        decisions = JSON.parse(localStorage.getItem('decisions') || '{}');
    } catch (e) {
        decisions = {};
    }

    decisions[slideId] = {
        choice: choice,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('decisions', JSON.stringify(decisions));
}

/**
 * Get all decisions (for completion page)
 */
function getDecisions() {
    try {
        return JSON.parse(localStorage.getItem('decisions') || '{}');
    } catch (e) {
        return {};
    }
}

/**
 * Get visited slides (for completion page)
 */
function getVisitedSlides() {
    try {
        return JSON.parse(localStorage.getItem('visitedSlides') || '[]');
    } catch (e) {
        return [];
    }
}

/**
 * Reset progress (for completion page)
 */
function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This will clear all your decisions.')) {
        localStorage.removeItem('decisions');
        localStorage.removeItem('visitedSlides');
        alert('Progress reset! Starting fresh.');
        window.location.href = '../index.html';
    }
}

/**
 * SCORING SYSTEM
 */

// Correct NASA decisions (10 total)
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

/**
 * Calculate score based on decisions
 */
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

/**
 * Get score rank/title (based on 10 decisions)
 */
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

/**
 * Get decision comparison (your choice vs NASA)
 */
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

/**
 * Generate shareable URL with score
 */
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

/**
 * Parse URL hash parameters
 */
function getURLParams() {
    const hash = window.location.hash.substring(1);
    if (!hash) return null;

    const params = new URLSearchParams(hash);
    const name = params.get('name');
    const troop = params.get('troop');
    const score = params.get('score');
    const total = params.get('total');
    const rank = params.get('rank');

    if (name && troop && score && total) {
        return { name, troop, score: parseInt(score), total: parseInt(total), rank };
    }

    return null;
}

/**
 * Start new mission (clear progress)
 */
function startNewMission() {
    localStorage.removeItem('decisions');
    localStorage.removeItem('visitedSlides');
    // Clear URL hash
    window.location.hash = '';
    window.location.href = 'slides/01-launch.html';
}

/**
 * PROGRESSIVE FEEDBACK SYSTEM
 */

/**
 * Show alignment feedback after decision is made
 */
function showAlignmentFeedback(slideId, userChoice) {
    const alignmentIndicator = document.getElementById('alignmentIndicator');
    if (!alignmentIndicator) return;

    const correctChoice = CORRECT_ANSWERS[slideId];
    const isMatch = userChoice === correctChoice;

    // Show the appropriate feedback
    if (isMatch) {
        alignmentIndicator.innerHTML = `
            <div class="alignment-badge">
                ✅ <strong>Your choice matches NASA!</strong>
            </div>
            <p>You and Mission Control are thinking alike. This was the decision that helped bring the crew home safely.</p>
        `;
        alignmentIndicator.className = 'alignment-indicator matched';
    } else {
        const decisionName = DECISION_NAMES[slideId];
        alignmentIndicator.innerHTML = `
            <div class="alignment-badge">
                ⚠️ <strong>NASA chose differently</strong>
            </div>
            <p>While your choice had merit, NASA's actual decision on "${decisionName}" was different. You'll see the comparison at mission completion.</p>
        `;
        alignmentIndicator.className = 'alignment-indicator different';
    }

    alignmentIndicator.style.display = 'block';
}

/**
 * Initialize decision tracker in navigation
 */
function initDecisionTracker() {
    const tracker = document.getElementById('decisionTracker');
    if (!tracker) return;

    // Check if any decisions have been made
    const decisions = getDecisions();
    const hasDecisions = Object.keys(decisions).length > 0;

    if (hasDecisions) {
        tracker.style.display = 'flex';
        updateDecisionTracker();
    }
}

/**
 * Update decision tracker badges
 */
function updateDecisionTracker() {
    const tracker = document.getElementById('decisionTracker');
    if (!tracker) return;

    const decisions = getDecisions();

    // Show tracker once first decision is made
    if (Object.keys(decisions).length > 0) {
        tracker.style.display = 'flex';
    }

    // Update each badge (all 10 decisions)
    for (const slideId of ['2', '5', '6', '10', '11', '13', '14', '15', '17', '18']) {
        const badge = document.querySelector(`[data-decision="${slideId}"]`);
        if (!badge) continue;

        const decision = decisions[slideId];
        const decisionName = DECISION_NAMES[slideId];

        if (decision) {
            const correctChoice = CORRECT_ANSWERS[slideId];
            const isMatch = decision.choice === correctChoice;

            if (isMatch) {
                badge.textContent = '🏆';
                badge.className = 'badge matched';
                badge.title = `${decisionName}: Matched NASA ✅`;
            } else {
                badge.textContent = '📊';
                badge.className = 'badge different';
                badge.title = `${decisionName}: Different choice ⚠️`;
            }
        } else {
            // Check if this decision is in the future or not yet reached
            const currentSlide = parseInt(document.body.dataset.slideId) || 1;
            const decisionSlide = parseInt(slideId);

            if (currentSlide >= decisionSlide) {
                badge.textContent = '⚪';
                badge.className = 'badge pending';
                badge.title = `${decisionName}: Not completed`;
            } else {
                badge.textContent = '⚪';
                badge.className = 'badge pending';
                badge.title = `${decisionName}: Coming soon`;
            }
        }
    }
}

/**
 * Toggle score summary modal
 */
function toggleScoreSummary() {
    const modal = document.getElementById('scoreSummary');
    if (!modal) return;

    const isVisible = modal.style.display === 'flex';

    if (isVisible) {
        modal.style.display = 'none';
    } else {
        // Update summary content
        updateScoreSummary();
        modal.style.display = 'flex';
    }
}

/**
 * Update score summary modal content
 */
function updateScoreSummary() {
    const decisions = getDecisions();
    const decisionCount = Object.keys(decisions).length;
    let matchCount = 0;

    for (const [slideId, decision] of Object.entries(decisions)) {
        const correctChoice = CORRECT_ANSWERS[slideId];
        if (decision.choice === correctChoice) {
            matchCount++;
        }
    }

    // Update stats
    const matchedStat = document.querySelector('.summary-stats .stat-value');
    if (matchedStat) {
        matchedStat.textContent = `${matchCount}/${decisionCount}`;
    }

    const totalStat = document.querySelectorAll('.summary-stats .stat-value')[1];
    if (totalStat) {
        totalStat.textContent = `${decisionCount}/4`;
    }

    // Update decision list
    const decisionsList = document.querySelector('.decisions-list');
    if (!decisionsList) return;

    decisionsList.innerHTML = '';

    // Show all 10 decisions
    for (const slideId of ['2', '5', '6', '10', '11', '13', '14', '15', '17', '18']) {
        const decision = decisions[slideId];
        const decisionName = DECISION_NAMES[slideId];
        const item = document.createElement('div');

        if (decision) {
            const correctChoice = CORRECT_ANSWERS[slideId];
            const isMatch = decision.choice === correctChoice;

            item.className = `decision-item ${isMatch ? 'matched' : 'different'}`;
            item.innerHTML = `
                <span class="icon">${isMatch ? '✅' : '⚠️'}</span>
                <span class="name">${decisionName}</span>
            `;
        } else {
            item.className = 'decision-item pending';
            item.innerHTML = `
                <span class="icon">⚪</span>
                <span class="name">${decisionName}</span>
            `;
        }

        decisionsList.appendChild(item);
    }
}

/**
 * Close score summary modal
 */
function closeSummary() {
    const modal = document.getElementById('scoreSummary');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Share functionality (for completion page)
 */
async function shareExperience() {
    const url = window.location.origin + '/apollo-mission/interactive/';
    const title = 'Apollo 13 Interactive Experience';
    const text = 'I just completed the Apollo 13 mission! Experience NASA\'s greatest rescue mission.';

    // Try native share API (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: text,
                url: url
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
            }
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard! Share it with your fellow scouts.');
        } catch (err) {
            // Final fallback: Show URL
            prompt('Copy this link to share:', url);
        }
    }
}
