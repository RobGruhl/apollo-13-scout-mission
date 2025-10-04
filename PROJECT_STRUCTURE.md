# Apollo 13 Interactive Experience - Project Structure

Clean, organized repository structure for efficient development and deployment.

---

## Root Directory

```
apollo-mission/
│
├── 📄 Website Files (GitHub Pages serves from root)
│   ├── index.html                  # Landing page
│   ├── timeline.html               # Timeline navigator
│   ├── assets/                     # CSS, JavaScript, images
│   └── slides/                     # 24 interactive slides
│
├── 📚 Documentation
│   ├── README.md                   # Project overview, quick start
│   ├── CLAUDE.md                   # Developer guidance for Claude Code
│   ├── DEPLOYMENT_GUIDE.md         # GitHub Pages setup
│   ├── SITEMAP_SPECIFICATION.md    # Navigation structure
│   └── SCORING_SYSTEM_DESIGN.md    # Scoring system details
│
├── 🔧 Development Tools
│   ├── scripts/                    # Testing and verification
│   │   ├── verify-navigation.sh   # Navigation link checker
│   │   ├── verify-button-text.sh  # Button text format checker
│   │   └── README.md              # Script documentation
│   │
│   └── content/                    # Source content (text files)
│       ├── decision/              # Decision slide content
│       ├── narrative/             # Narrative slide content
│       ├── info/                  # Info slide content
│       └── images/                # Content images
│
├── 📦 Source Materials
│   ├── source/                     # Original materials
│   │   ├── original-materials/    # Docx, images, scripts
│   │   └── README.md
│   │
│   ├── source-assets/             # Additional source files
│   └── static-posters/            # Print version materials
│
└── 📁 Archive
    └── docs/archive/              # Historical planning documents
        ├── old-posters/          # Old HTML posters
        └── [12+ planning docs]   # Planning phase documents
```

---

## Directory Purposes

### Website Files (Served by GitHub Pages)

**assets/**
- `css/style.css` - Single stylesheet (~580 lines)
- `js/app.js` - Core interactions (~370 lines)
- `images/` - Web-optimized images (WebP + fallbacks)

**slides/**
- 24 HTML files (01-launch.html through 24-completion.html)
- 6 narrative, 4 decision, 14 info/supporting slides

### Documentation

**Root .md files** - Current, authoritative documentation
- Quick start, architecture, deployment, navigation, scoring

**docs/archive/** - Historical reference only
- Planning documents from development phase
- May contain outdated information

### Development Tools

**scripts/**
- `verify-navigation.sh` - Checks all 24 slides for correct links
- `verify-button-text.sh` - Validates button text format
- Run before deployment to ensure integrity

**content/**
- Source text files organized by slide type
- Used to generate/update slide content
- Includes images and narrative text

### Source Materials

**source/original-materials/**
- Apollo_13_Educational_Materials.docx (22MB) - Original content
- PNG images (patches, covers)
- Python scripts for generation

**source-assets/**
- Additional source files and materials

**static-posters/**
- Print version materials (36" x 24" posters)
- Separate from web version

---

## Important Files

### Website Critical Files (DO NOT MOVE)
- `index.html` - Main entry point
- `timeline.html` - Timeline page
- `assets/` - All website assets
- `slides/` - All slide pages

### Development Critical Files
- `.gitignore` - Ignores venv/, temp files
- `scripts/verify-*.sh` - Pre-deployment checks
- `CLAUDE.md` - Developer quick reference

### Ignored Files (not in git)
- `venv/` - Python virtual environment
- `.DS_Store`, `.claude/` - OS/IDE files
- `*.tmp`, `*.log` - Temporary files

---

## Quick Navigation

**Starting development?** → Read `CLAUDE.md`
**Need to deploy?** → Read `DEPLOYMENT_GUIDE.md`
**Understanding navigation?** → See `SITEMAP_SPECIFICATION.md`
**Understanding scoring?** → See `SCORING_SYSTEM_DESIGN.md`
**Looking for old docs?** → Check `docs/archive/`
**Need to test?** → Run `./scripts/verify-navigation.sh`

---

**Last Updated**: 2025-10-04
**Repository**: https://github.com/RobGruhl/apollo-13-scout-mission
**Live Site**: https://robgruhl.github.io/apollo-13-scout-mission/
