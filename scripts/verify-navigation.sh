#!/bin/bash
# Navigation Verification Script
# Verifies every slide's previous/next links against docs/SITEMAP_SPECIFICATION.md:
#   - Slides 01-30 form a sequential chain (01 ← Home, 30 → 31 Merit Badges)
#   - Slide 31 (Merit Badges Hub) → prev 30, next Home
#   - Slides 32-34 (merit badge details) chain together and loop back to the hub
#   - Every link target must exist on disk

echo "Apollo 13 Navigation Verification"
echo "=================================="
echo ""

# Run from the repo root, wherever this repo was cloned
cd "$(dirname "$0")/.." || exit 1

ERRORS=0

# Look up the slide file for a given number (e.g. 7 -> slides/07-meet-crew.html)
slide_file() {
    ls slides/"$(printf '%02d' "$1")"-*.html 2>/dev/null | head -1
}

# Extract the href of a nav button ($1=file, $2=btn-prev|btn-next)
nav_href() {
    grep "$2" "$1" | grep -o 'href="[^"]*"' | head -1 | sed 's/href="//;s/"//'
}

check_nav() {
    local file=$1 expected_prev=$2 expected_next=$3

    if [ ! -f "$file" ]; then
        echo "❌ ERROR: File not found: $file"
        ((ERRORS++))
        return
    fi

    local prev_link next_link
    prev_link=$(nav_href "$file" btn-prev)
    next_link=$(nav_href "$file" btn-next)

    if [ "$prev_link" != "$expected_prev" ]; then
        echo "❌ $(basename "$file") prev: expected '$expected_prev', got '$prev_link'"
        ((ERRORS++))
    fi
    if [ "$next_link" != "$expected_next" ]; then
        echo "❌ $(basename "$file") next: expected '$expected_next', got '$next_link'"
        ((ERRORS++))
    fi

    # Both targets must exist on disk (relative to slides/)
    for target in "$prev_link" "$next_link"; do
        if [ -n "$target" ] && [ ! -f "slides/$target" ]; then
            echo "❌ $(basename "$file"): link target does not exist: $target"
            ((ERRORS++))
        fi
    done
}

# --- Slide count -------------------------------------------------------------
SLIDE_COUNT=$(ls slides/*.html | wc -l | tr -d ' ')
if [ "$SLIDE_COUNT" -ne 34 ]; then
    echo "❌ Expected 34 slides, found $SLIDE_COUNT"
    ((ERRORS++))
fi

# --- Sequential chain: slides 01-30 ------------------------------------------
for n in $(seq 1 30); do
    file=$(slide_file "$n")
    if [ -z "$file" ]; then
        echo "❌ ERROR: No slide file for number $n"
        ((ERRORS++))
        continue
    fi

    if [ "$n" -eq 1 ]; then
        expected_prev="../index.html"
    else
        expected_prev=$(basename "$(slide_file $((n - 1)))")
    fi
    expected_next=$(basename "$(slide_file $((n + 1)))")

    check_nav "$file" "$expected_prev" "$expected_next"
done

# --- Merit badge section: hub (31) and detail pages (32-34) -------------------
check_nav "$(slide_file 31)" "$(basename "$(slide_file 30)")" "../index.html"
check_nav "$(slide_file 32)" "$(basename "$(slide_file 31)")" "$(basename "$(slide_file 33)")"
check_nav "$(slide_file 33)" "$(basename "$(slide_file 32)")" "$(basename "$(slide_file 34)")"
check_nav "$(slide_file 34)" "$(basename "$(slide_file 33)")" "$(basename "$(slide_file 31)")"

echo ""
echo "=================================="
if [ "$ERRORS" -eq 0 ]; then
    echo "✅ All 34 slides: navigation links verified successfully!"
    exit 0
else
    echo "❌ Found $ERRORS error(s) in navigation links"
    exit 1
fi
