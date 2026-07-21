# 🚀 Apollo 13 Interactive Experience

> **Experience NASA's greatest rescue mission** through interactive storytelling and make the same critical decisions that saved three astronauts 200,000 miles from Earth.

**🌐 Try it now**: https://apollo13.quest/

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

## 🎪 See It at the Jamboree

This website is one half of the project — the other half is a real table at the NASA Tent at the **2026 Elevate Scout Jamboree**, where two big posters and a QR code invite scouts to take command. Scan the code at the table and this site opens right on your phone. Check out the [exhibit guide](exhibit/README.md) to see the posters, invitation cards, and reward cards up close.

![Poster 1: Can YOU bring them home?](exhibit/poster-1-attract-preview.jpg)
![Poster 2: The Computer Rescue Mission](exhibit/poster-2-computer-rescue-preview.jpg)

---

## How It Works

### 📱 34 Interactive Pages
Navigate through the mission timeline from launch to splashdown, plus earn merit badges:
- **10 Narrative Slides** - Experience the story as it happened
- **10 Decision Points** - Make critical choices (will you match NASA's decisions?)
- **8 Info Slides** - Learn the science and engineering behind the rescue
- **4 Merit Badge Resources** - Detailed guides for earning Programming, Digital Technology, and Space Exploration merit badges
- **2 Bonus Pages** - Meet your presenter, then see your final score and rank

### 🎯 Make Real Decisions
Face the same impossible choices NASA did, in the order the mission threw them at the crew:
1. **Freeze or Squeeze?** - Move to the Lunar Module or stay in the Command Module?
2. **Shut Down the Command Module?** - Power down the mothership to save its batteries?
3. **Turn Around or Free-Return?** - Reverse course immediately or use the Moon's gravity?
4. **Stars or Sun/Earth Navigation?** - Navigate by the stars, or by lining up the Sun and Earth?
5. **Speed Up or Coast?** - Fire a risky engine burn to get home faster?
6. **Water Conservation** - Ration water for the crew or for the equipment?
7. **Build the CO₂ Mailbox?** - Improvise a scrubber adapter or risk suffocation?
8. **Comm Power: Loud or Lean?** - Keep the radios at full power or drop to a power-saving whisper?
9. **Recharge for Re-Entry?** - Attempt a never-before-tried battery recharge from the LM to the Command Module?
10. **Service Module Jettison Timing** - When do you cut loose the damaged Service Module?

### 🏆 Earn Your Rank
Compare your decisions to NASA's actual choices:
- 🏆 **Mission Commander** - 10/10 correct (You think like NASA!)
- ⭐ **Flight Director** - 8-9/10 correct
- 🎯 **Flight Controller** - 6-7/10 correct
- 📡 **Ground Crew** - 0-5/10 correct

**Playing at the jamboree?** Score 4 or better at the Apollo table and you take home a real, physical **rank card** matching your score — Ground Crew, Flight Controller, Flight Director, or Mission Commander.

### 📲 Share Your Score
Finish the mission and get a shareable link — plus a QR code right on your screen that a friend can scan to see your score. Challenge your troop or patrol to beat it!

---

## Features

✅ **Works on any device** - Phone, tablet, or computer
✅ **Works offline** - Once it loads, it keeps working with zero signal (handy at camp!)
✅ **No login required** - Just click and start
✅ **Saves your progress** - Come back anytime to continue
✅ **Quick Mission mode** - Short on time? Play just the 10 decisions in about 10 minutes
✅ **Share by QR code** - Your final score becomes a QR code friends can scan
✅ **Fast loading** - Works even on slow connections
✅ **Free forever** - No ads, no cookies, no accounts, no cost
✅ **Private by design** - Your progress stays on your device; nothing about you is collected ([read how, and check for yourself](https://apollo13.quest/privacy.html))
✅ **Educational** - Based on real NASA mission records

### 📚 Sources for Skeptics
Every decision result links to the **real NASA mission documents** — flight journals, mission transcripts, and official reports. Think we got an answer wrong? Follow the link, read the primary source, and make your case. Disputing a claim with evidence is exactly what real engineers do.

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
apollo-13-scout-mission/
├── index.html              # Home page (full mission or Quick Mission)
├── timeline.html           # Timeline navigator
├── privacy.html            # No tracking here — and how tracking actually works
├── explore/                # Merit badge deep dives: hack a URL, airplane-mode test, basketball Moon
├── sw.js                   # Service worker — makes the site work offline
├── slides/                 # 34 HTML files, in true mission chronological order
│   ├── 01-launch.html
│   ├── 02-spacecraft.html
│   ├── 03-explosion.html
│   └── ... 31 more slides, from the crisis to splashdown to merit badges
├── assets/
│   ├── css/style.css      # All the styling (~1,090 lines)
│   ├── js/app.js          # All the JavaScript (~660 lines)
│   ├── js/qrcode.js       # QR code library (the one borrowed file — open source, MIT)
│   └── images/            # Pictures for each slide
├── docs/                   # Guides: deployment, sitemap, scoring
├── exhibit/                # The jamboree table: posters, cards, QR codes (web previews)
├── print-ready/            # The actual print files for the posters & cards (big!)
├── scripts/                # Small scripts that check the site's links
└── README.md               # This file!
```

> **Heads up for cloners**: `print-ready/` holds the full-resolution poster and card
> files (~170 MB), so the repo is bigger than the website itself. The site you run
> locally is still tiny and fast.

**Total size**: About 1,750 lines of CSS and JavaScript make the whole site work — you could read all of it in an afternoon. (The only code we didn't write ourselves is `qrcode.js`, a small open-source MIT-licensed library that draws QR codes.)

### 🎨 Cool Features You Can Learn From

**1. Decision Tracking** - Uses `localStorage` to remember your choices
**2. Score Calculation** - Compares your decisions to NASA's actual choices
**3. URL Sharing** - Encodes your score into a shareable link and QR code
**4. Keyboard Navigation** - Arrow keys work to move between slides
**5. Responsive Design** - Automatically adjusts for phone/tablet/desktop
**6. Progress Indicators** - Shows which slides you've visited
**7. Offline Support** - A service worker (`sw.js`) caches the site so it runs with no signal

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
Visit **https://apollo13.quest/** and start exploring.

### Option 2: Run It Locally 💻

Want to see the code and experiment? Here's how:

**1. Download the code:**
```bash
# If you have Git installed:
git clone https://github.com/RobGruhl/apollo-13-scout-mission.git
cd apollo-13-scout-mission

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

**Ready for real software engineering?**
- 🦴 **[The Walking Skeleton Tutorial](https://walkingskeleton.org/)** - From the same family as this project: build the smallest possible *production-shaped* app (tests, config, logging, health checks, CI) in 21 small steps, with Claude Code as your tutor. This is the craft as it's actually practiced now — great next step after modifying this site.

**For Scouts Working on Merit Badges:**

This project is designed to help with multiple merit badge requirements:

**💻 Programming Merit Badge** (January 2025 requirements):
- **Requirement 4c** - Learn about open source software (this project uses MIT License), understand licensing vs. owning software, and the differences between freeware, open source, and commercial software
- **Requirement 5** - Use this as one of your three programming projects! You can:
  - Modify existing code (add a feature, change styling, fix a bug)
  - Create your own version for a different space mission
  - Study how the decision tracking, scoring system, and localStorage work
  - Demonstrate your modifications to your counselor
- **General Knowledge** - Real-world example of web development with HTML, CSS, and JavaScript
- **Careers** - Explore software engineering and web development career paths

**Project Ideas for Requirement 5:**
- Add audio narration to slides
- Create a timer to track decision-making speed
- Add new decision points or slides
- Translate the content into another language
- Create a similar interactive story for Apollo 11, Mars rovers, or another mission
- Add accessibility features (screen reader support, high-contrast mode)

**🌐 Digital Technology Merit Badge** (2025 requirements):
- **Requirement 3c** - This project is a complete website with 37 HTML pages, text content, images, and navigation - perfect example of creating digital content for an audience
- **Internet safety & privacy requirements** - The site's [privacy explainer](https://apollo13.quest/privacy.html) teaches how cookies, tracking, and fingerprinting work — and how to inspect a live website's cookies and network traffic yourself
- **Requirement 4a** - Discusses intellectual property protections (our MIT License demonstrates copyright and licensing)
- **Requirement 4b** - Learn when it's permissible to use/modify open source software (MIT License allows free use and modification)

**🚀 Space Exploration Merit Badge** (2025 requirements):
- **Requirement 1** - Historical reasons for space exploration (Apollo 13 demonstrates problem-solving and international cooperation)
- **Requirement 2** - Space pioneers (meet the Apollo 13 crew: Jim Lovell, Jack Swigert, Fred Haise, and heroes like John Aaron)
- **Requirement 5a** - Discuss a historic crewed mission - Apollo 13 is one of NASA's most famous missions with major learnings about spacecraft safety and rescue procedures
- **Requirement 7** - Explore careers in space (NASA flight controllers, engineers, astronauts)

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
- 📦 Each page is under ~500KB
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

**Code & Design**: Built in October 2025 by Rob Gruhl with assistance from Claude (Anthropic AI)

**July 2026 Refresh**: Rebuilt with **Claude Fable 5**, Anthropic's Mythos-class AI model — slides reordered into true mission chronology, every fact checked against NASA's primary sources (70 corrections!), real transcript quotes, "Sources for Skeptics" citations on every decision, offline support, and the print pipeline for the jamboree table. A small Apollo program of its own: dozens of AI agents fanned out like flight controllers, each checking the others' work before anything shipped.

**Images**: NASA historical photos (public domain)

---

## Contributing

**Found a bug?** [Open an issue on GitHub](https://github.com/RobGruhl/apollo-13-scout-mission/issues) — there are ready-made templates for bug reports and (our favorite) **factual corrections with sources**.

**Want to contribute code or content?** Start with the [contributing guide](.github/CONTRIBUTING.md) — it explains the ground rules (no frameworks, every fact sourced) and how to test your changes.

**Have an idea?** This is an open source educational project! Contributions welcome:
- Fix typos or improve explanations
- Add more decision points or story slides
- Translate to other languages
- Improve accessibility
- Add audio narration

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You are free to use, modify, distribute, and build upon this project for any purpose (commercial or non-commercial) with no restrictions other than including the original copyright notice.

**NASA Content**: All NASA images and mission data are in the public domain.

---

## Additional Documentation

**For Teachers/Scout Leaders**:
- [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) - How to host your own copy

**For Developers**:
- [CLAUDE.md](CLAUDE.md) - Project architecture and development guide
- [SITEMAP_SPECIFICATION.md](docs/SITEMAP_SPECIFICATION.md) - Complete navigation structure
- [SCORING_SYSTEM_DESIGN.md](docs/SCORING_SYSTEM_DESIGN.md) - How scoring works

---

## Questions?

**For general questions about Apollo 13**: Check out NASA's official resources
**For technical questions about the website**: Open an issue on GitHub
**For scout-specific questions**: Contact Ed Gruhl at scout events

---

**Ready to save Apollo 13?** 🚀
**Start here**: https://apollo13.quest/

---

*"Houston, we've had a problem."* — Jim Lovell, Apollo 13 Commander, April 13, 1970 (the real quote, straight from the mission transcript)
