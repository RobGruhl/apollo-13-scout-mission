#!/bin/bash
# Button Text Verification Script
# Verifies all navigation button text follows standard format

echo "Apollo 13 Button Text Verification"
echo "===================================="
echo ""

ERRORS=0

cd /Users/robgruhl/Projects/apollo-mission

for file in slides/*.html; do
    slide=$(basename "$file")

    # Extract button text
    prev_text=$(grep 'btn-prev' "$file" | sed 's/.*btn-prev">//;s/<\/a>.*//' | head -1)
    next_text=$(grep 'btn-next' "$file" | sed 's/.*btn-next">//;s/<\/a>.*//' | head -1)

    # Determine expected text
    if [[ "$slide" == "01-launch.html" ]]; then
        expected_prev="← Home"
    else
        expected_prev="← Previous"
    fi

    if [[ "$slide" == "24-completion.html" ]]; then
        expected_next="🏠 Home"
    else
        expected_next="Next →"
    fi

    # Check and report
    errors=""

    if [[ "$prev_text" != "$expected_prev" ]]; then
        errors="PREV: expected '$expected_prev', got '$prev_text'"
    fi

    if [[ "$next_text" != "$expected_next" ]]; then
        if [[ -n "$errors" ]]; then
            errors="$errors | "
        fi
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
if [ $ERRORS -eq 0 ]; then
    echo "✅ All button text verified successfully!"
    exit 0
else
    echo "❌ Found $ERRORS error(s) in button text"
    exit 1
fi
