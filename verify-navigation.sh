#!/bin/bash
# Navigation Verification Script
# Verifies all navigation links match the sitemap specification

echo "Apollo 13 Navigation Verification"
echo "=================================="
echo ""

ERRORS=0

# Function to check if file exists
check_file() {
    if [ ! -f "$1" ]; then
        echo "❌ ERROR: File not found: $1"
        ((ERRORS++))
        return 1
    fi
    return 0
}

# Function to check navigation link
check_nav() {
    local file=$1
    local expected_prev=$2
    local expected_next=$3
    local slide_name=$4

    echo "Checking: $slide_name"

    if ! check_file "$file"; then
        return
    fi

    # Extract navigation links
    local prev_link=$(grep 'btn-prev' "$file" | grep -o 'href="[^"]*"' | head -1 | sed 's/href="//;s/"//')
    local next_link=$(grep 'btn-next' "$file" | grep -o 'href="[^"]*"' | head -1 | sed 's/href="//;s/"//')

    # Check previous link
    if [ "$prev_link" != "$expected_prev" ]; then
        echo "  ❌ Previous link: Expected '$expected_prev', Got '$prev_link'"
        ((ERRORS++))
    else
        echo "  ✓ Previous link correct"
    fi

    # Check next link
    if [ "$next_link" != "$expected_next" ]; then
        echo "  ❌ Next link: Expected '$expected_next', Got '$next_link'"
        ((ERRORS++))
    else
        echo "  ✓ Next link correct"
    fi

    echo ""
}

cd /Users/robgruhl/Projects/apollo-mission

# Check all slides
check_nav "slides/01-launch.html" "../index.html" "02-freeze-squeeze.html" "Slide 01: Launch"
check_nav "slides/02-freeze-squeeze.html" "01-launch.html" "03-spacecraft.html" "Slide 02: Freeze or Squeeze"
check_nav "slides/03-spacecraft.html" "02-freeze-squeeze.html" "04-explosion.html" "Slide 03: Spacecraft"
check_nav "slides/04-explosion.html" "03-spacecraft.html" "05-turn-around.html" "Slide 04: Explosion"
check_nav "slides/05-turn-around.html" "04-explosion.html" "06-meet-crew.html" "Slide 05: Turn Around"
check_nav "slides/06-meet-crew.html" "05-turn-around.html" "07-explosion-cause.html" "Slide 06: Meet Crew"
check_nav "slides/07-explosion-cause.html" "06-meet-crew.html" "08-lifeboat-moon.html" "Slide 07: Explosion Cause"
check_nav "slides/08-lifeboat-moon.html" "07-explosion-cause.html" "09-co2-mailbox.html" "Slide 08: Lifeboat Moon"
check_nav "slides/09-co2-mailbox.html" "08-lifeboat-moon.html" "10-navigation.html" "Slide 09: CO2 Mailbox"
check_nav "slides/10-navigation.html" "09-co2-mailbox.html" "11-long-journey.html" "Slide 10: Navigation"
check_nav "slides/11-long-journey.html" "10-navigation.html" "12-power-conservation.html" "Slide 11: Long Journey"
check_nav "slides/12-power-conservation.html" "11-long-journey.html" "13-passive-thermal.html" "Slide 12: Power Conservation"
check_nav "slides/13-passive-thermal.html" "12-power-conservation.html" "14-service-module-jettison.html" "Slide 13: Passive Thermal"
check_nav "slides/14-service-module-jettison.html" "13-passive-thermal.html" "15-lm-jettison.html" "Slide 14: Service Module Jettison"
check_nav "slides/15-lm-jettison.html" "14-service-module-jettison.html" "16-computer-restart.html" "Slide 15: LM Jettison"
check_nav "slides/16-computer-restart.html" "15-lm-jettison.html" "17-reentry-prep.html" "Slide 16: Computer Restart"
check_nav "slides/17-reentry-prep.html" "16-computer-restart.html" "18-the-blackout.html" "Slide 17: Reentry Prep"
check_nav "slides/18-the-blackout.html" "17-reentry-prep.html" "19-parachutes.html" "Slide 18: The Blackout"
check_nav "slides/19-parachutes.html" "18-the-blackout.html" "20-recovery.html" "Slide 19: Parachutes"
check_nav "slides/20-recovery.html" "19-parachutes.html" "21-heroes.html" "Slide 20: Recovery"
check_nav "slides/21-heroes.html" "20-recovery.html" "22-reentry-physics.html" "Slide 21: Heroes"
check_nav "slides/22-reentry-physics.html" "21-heroes.html" "23-splashdown.html" "Slide 22: Reentry Physics"
check_nav "slides/23-splashdown.html" "22-reentry-physics.html" "24-completion.html" "Slide 23: Splashdown"
check_nav "slides/24-completion.html" "23-splashdown.html" "../index.html" "Slide 24: Completion"

echo "=================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All navigation links verified successfully!"
    exit 0
else
    echo "❌ Found $ERRORS error(s) in navigation links"
    exit 1
fi
