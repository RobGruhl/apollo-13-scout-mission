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

    // Update progress indicator
    const total = 24;
    const current = parseInt(slideId) || 1;
    const progressText = document.querySelector('.nav-progress');
    if (progressText) {
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
