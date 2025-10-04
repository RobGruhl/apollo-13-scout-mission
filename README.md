# 🚀 Apollo 13 Interactive Experience

> **Experience NASA's greatest rescue mission** through interactive storytelling and make the same critical decisions that saved three astronauts 200,000 miles from Earth.

**🌐 Try it now**: https://robgruhl.github.io/apollo-mission/

---

## What Is This?

On April 13, 1970, an oxygen tank exploded aboard Apollo 13 while traveling to the Moon. Three astronauts—**Jim Lovell**, **Jack Swigert**, and **Fred Haise**—were suddenly fighting for their lives in a crippled spacecraft.

This interactive website lets you experience their story and **make the same critical decisions** that NASA engineers and astronauts faced during the rescue mission.

### Perfect For:

- 🏕️ **Scouts** exploring STEM merit badges
- 🎓 **Students** learning about space exploration
- 👨‍💻 **Young coders** who want to see how websites are built
- 🚀 **Space enthusiasts** of all ages

---

## How It Works

### 📱 24 Interactive Slides
Navigate through the mission timeline from launch to splashdown:
- **6 Narrative Slides** - Experience the story as it happened
- **4 Decision Points** - Make critical choices (will you match NASA's decisions?)
- **14 Info Slides** - Learn the science and engineering behind the rescue

### 🎯 Make Real Decisions
Face the same impossible choices NASA did:
- Move to the Lunar Module or stay in the Command Module?
- Turn around immediately or use the Moon's gravity?
- Build an improvised CO₂ scrubber or risk suffocation?
- Shut down the Command Module to save power for re-entry?

### 🏆 Earn Your Rank
Compare your decisions to NASA's actual choices:
- 🏆 **Mission Commander** - 4/4 correct (You think like NASA!)
- ⭐ **Flight Director** - 3/4 correct
- 🎯 **Flight Controller** - 2/4 correct
- 📡 **Ground Crew** - 0-1/4 correct

### 📲 Share Your Score
Generate a shareable link to challenge your troop or patrol to beat your score!

---

## Features

✅ **Works on any device** - Phone, tablet, or computer
✅ **No login required** - Just click and start
✅ **Saves your progress** - Come back anytime to continue
✅ **Fast loading** - Works even on slow connections
✅ **Free forever** - No ads, no tracking, no cost
✅ **Educational** - Based on real NASA mission records

---

## For Young Coders: How This Website Was Built

**Want to learn how to build something like this?** Great! Here's what makes this website work:

### 🛠️ Technology Stack

This website is built with the **simplest possible tech stack** - perfect for learning:

- **HTML** - Structures the content (the slides, buttons, text)
- **CSS** - Makes it look good (colors, fonts, layout)
- **JavaScript** - Makes it interactive (decisions, scoring, progress tracking)
- **GitHub Pages** - Free hosting (anyone can access it)

**That's it!** No complicated frameworks, no database, no server required.

### 📁 Project Structure

```
apollo-mission/
├── index.html              # Home page
├── timeline.html           # Timeline navigator
├── slides/                 # 24 HTML files (one per slide)
│   ├── 01-launch.html
│   ├── 02-freeze-squeeze.html
│   └── ... 22 more slides
├── assets/
│   ├── css/style.css      # All the styling (580 lines)
│   ├── js/app.js          # All the JavaScript (370 lines)
│   └── images/            # Pictures for each slide
└── README.md              # This file!
```

**Total size**: Less than 1,200 lines of code! You could read all of it in an afternoon.

### 🎨 Cool Features You Can Learn From

**1. Decision Tracking** - Uses `localStorage` to remember your choices
**2. Score Calculation** - Compares your decisions to NASA's actual choices
**3. URL Sharing** - Encodes your score into a shareable link
**4. Keyboard Navigation** - Arrow keys work to move between slides
**5. Responsive Design** - Automatically adjusts for phone/tablet/desktop
**6. Progress Indicators** - Shows which slides you've visited

### 💡 Want to Build Your Own Version?

You could make a similar interactive story about:
- The Wright Brothers' first flight
- The Titanic rescue mission
- Lewis and Clark's expedition
- Mars Rover missions
- Your own troop's camping trip history!

**Start simple:**
1. Pick a story with 10-15 key events
2. Create HTML files for each event (copy the structure from this project)
3. Add images (NASA images are free to use!)
4. Add decision points where choices matter
5. Deploy for free on GitHub Pages

---

## Quick Start Guide

### Option 1: Just Use It! 🌐
Visit **https://robgruhl.github.io/apollo-mission/** and start exploring.

### Option 2: Run It Locally 💻

Want to see the code and experiment? Here's how:

**1. Download the code:**
```bash
# If you have Git installed:
git clone https://github.com/robgruhl/apollo-mission.git
cd apollo-mission

# Or just download the ZIP from GitHub
```

**2. Open it in your browser:**

**Easiest way** (no setup required):
- Just double-click `index.html` and it opens in your browser!

**Better way** (if you have Python installed):
```bash
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

**Pro way** (if you use VS Code):
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**3. Make changes:**
- Edit any `.html` file to change the content
- Edit `assets/css/style.css` to change colors/fonts
- Edit `assets/js/app.js` to change how decisions work
- Refresh your browser to see changes!

---

## Learning Resources

### Want to Learn Web Development?

**For Absolute Beginners:**
- 📚 **freeCodeCamp.org** - Free interactive lessons (start with "Responsive Web Design")
- 🎥 **YouTube: "HTML & CSS Tutorial"** by Traversy Media
- 📖 **MDN Web Docs** - The best reference for HTML/CSS/JavaScript

**For Scouts Working on Merit Badges:**
This project could help with:
- 💻 **Programming Merit Badge** - Requirement 5 (web development)
- 🌐 **Digital Technology Merit Badge** - Requirement 3 (create digital content)
- 🚀 **Space Exploration Merit Badge** - Apollo 13 historical content

### Want to Understand This Code?

Start by reading these files in order:
1. `index.html` - See how the home page is structured
2. `slides/01-launch.html` - See how a slide is built
3. `assets/css/style.css` - See how styling works
4. `assets/js/app.js` - See how JavaScript makes it interactive

**Total reading time**: 2-3 hours to understand everything!

---

## Technical Details

### Browser Support
✅ Works on all modern browsers:
- Chrome, Firefox, Safari, Edge (desktop)
- Safari (iPhone/iPad)
- Chrome (Android)

### Performance
- ⚡ Loads in less than 2 seconds (even on 3G)
- 📦 Each page is only ~300-400KB
- 🎯 Lighthouse score: 95+ (Google's quality standard)

### Accessibility
- ♿ Keyboard navigation (use arrow keys!)
- 🔊 Screen reader compatible
- 📱 Works without JavaScript (basic version)
- 🌈 High contrast text (easy to read)

---

## Credits & Sources

**Created for**: 2026 Elevate Scout Jamboree
**Presented by**: Ed Gruhl, Scout District Commissioner, Glacial Trails District
**Target Audience**: Scouts ages 11-17

**Educational Content Based On**:
- NASA Apollo 13 Flight Journal
- NASA Mission Reports and Transcripts
- Crew debriefings and interviews
- Jim Lovell's book "Lost Moon"

**Code & Design**: Built in October 2024 by Rob Gruhl with assistance from Claude (Anthropic AI)

**Images**: NASA historical photos (public domain)

---

## Contributing

**Found a bug?** [Open an issue on GitHub](https://github.com/robgruhl/apollo-mission/issues)

**Have an idea?** This is an open source educational project! Contributions welcome:
- Fix typos or improve explanations
- Add more decision points (6 more planned!)
- Translate to other languages
- Improve accessibility
- Add audio narration

---

## License

**Educational Content**: Free to use for educational purposes
**NASA Content**: Public domain
**Code**: Open source - check the [GitHub repository](https://github.com/robgruhl/apollo-mission)

---

## Additional Documentation

**For Teachers/Scout Leaders**:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - How to host your own copy

**For Developers**:
- [CLAUDE.md](CLAUDE.md) - Project architecture and development guide
- [SITEMAP_SPECIFICATION.md](SITEMAP_SPECIFICATION.md) - Complete navigation structure
- [SCORING_SYSTEM_DESIGN.md](SCORING_SYSTEM_DESIGN.md) - How scoring works

---

## Questions?

**For general questions about Apollo 13**: Check out NASA's official resources
**For technical questions about the website**: Open an issue on GitHub
**For scout-specific questions**: Contact Ed Gruhl at scout events

---

**Ready to save Apollo 13?** 🚀
**Start here**: https://robgruhl.github.io/apollo-mission/

---

*"Failure is not an option."* - Gene Kranz, Apollo 13 Flight Director
