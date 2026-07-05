#!/bin/bash
# Button Text Verification Script
# Verifies navigation button labels follow the standards in docs/SITEMAP_SPECIFICATION.md:
#   - Slides 02-29: "← Previous" / "Next →"
#   - Special cases: 01 (← Home), 30 (→ Merit Badges), 31 (hub), 32-34 (named neighbors)

echo "Apollo 13 Button Text Verification"
echo "===================================="
echo ""

# Run from the repo root, wherever this repo was cloned
cd "$(dirname "$0")/.." || exit 1

ERRORS=0

for file in slides/*.html; do
    slide=$(basename "$file")
    num=${slide%%-*}

    prev_text=$(grep 'btn-prev' "$file" | sed 's/.*btn-prev">//;s/<\/a>.*//' | head -1)
    next_text=$(grep 'btn-next' "$file" | sed 's/.*btn-next">//;s/<\/a>.*//' | head -1)

    # Expected labels (standard, with documented special cases)
    expected_prev="← Previous"
    expected_next="Next →"
    case "$num" in
        01) expected_prev="← Home" ;;
        30) expected_next="🏕️ Merit Badges →" ;;
        31) expected_next="🏠 Home" ;;
        32) expected_prev="← Merit Badges Hub"; expected_next="Digital Technology →" ;;
        33) expected_prev="← Programming";      expected_next="Space Exploration →" ;;
        34) expected_prev="← Digital Technology"; expected_next="Merit Badges Hub →" ;;
    esac

    errors=""
    if [[ "$prev_text" != "$expected_prev" ]]; then
        errors="PREV: expected '$expected_prev', got '$prev_text'"
    fi
    if [[ "$next_text" != "$expected_next" ]]; then
        [[ -n "$errors" ]] && errors="$errors | "
        errors="${errors}NEXT: expected '$expected_next', got '$next_text'"
    fi

    if [[ -n "$errors" ]]; then
        echo "❌ $slide: $errors"
        ((ERRORS++))
    else
        echo "✓ $slide"
    fi
done

echo ""
echo "===================================="
if [ "$ERRORS" -eq 0 ]; then
    echo "✅ All button text verified successfully!"
    exit 0
else
    echo "❌ Found $ERRORS error(s) in button text"
    exit 1
fi
