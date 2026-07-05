# Apollo 13 Interactive - GitHub Pages Deployment Guide

**Status**: ✅ Deployed to GitHub Pages with a custom domain
**Branch**: `main`
**Live URL**: `https://apollo13.quest/`
**Underlying Pages URL**: `https://robgruhl.github.io/apollo-13-scout-mission/` (301-redirects to the custom domain — old QR codes keep working)

---

## 🌐 Custom Domain (apollo13.quest)

Registered at Porkbun (2026-07-05). Three pieces make it work:

1. **DNS at Porkbun** (apex + www):
   - Four `A` records on the apex → GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Four `AAAA` records on the apex → `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`
   - `CNAME` record `www` → `robgruhl.github.io`
2. **`CNAME` file** at the repo root containing exactly `apollo13.quest` — GitHub Pages reads it on every deploy. Don't delete it.
3. **Repo Settings → Pages**: Custom domain = `apollo13.quest`, with **Enforce HTTPS** checked (the certificate takes a few minutes to provision after the first setup).

To verify: `dig +short apollo13.quest` should return the four A-record IPs, and the old github.io URL should 301 to `https://apollo13.quest/`.

---

## 🚀 Quick Start - Enable GitHub Pages

### Step 1: Go to Repository Settings

1. Open your browser and go to: https://github.com/RobGruhl/apollo-13-scout-mission
2. Click the **Settings** tab (top right, near the top)
3. In the left sidebar, scroll down and click **Pages**

### Step 2: Configure GitHub Pages

On the Pages settings screen:

1. **Source**:
   - Select: **Deploy from a branch**

2. **Branch**:
   - Select: `main` (from dropdown)
   - Folder: `/` (root)
   - Click **Save**

3. **Wait for deployment** (1-2 minutes)
   - GitHub will show: "Your site is live at https://robgruhl.github.io/apollo-13-scout-mission/"

### Step 3: Test Your Site

After 1-2 minutes, visit:
```
https://apollo13.quest/
```

You should see the Apollo 13 landing page with:
- Mission patch image
- "Apollo 13: A Successful Failure" title
- Mission stats (duration, distance, decisions, lives saved)
- Start Mission button

---

## 📱 Test on Mobile

### Option 1: Direct URL
1. Open your phone browser
2. Type: `apollo13.quest`
3. Bookmark for easy access

### Option 2: QR Code (Recommended)
1. Go to: https://www.qr-code-generator.com/
2. Paste URL: `https://apollo13.quest/`
3. Download QR code (PNG or SVG)
4. Scan with phone camera to test

---

## 🧪 What to Test

### Landing Page
- [ ] Mission patch loads
- [ ] Text is readable
- [ ] "Start Mission" button works
- [ ] "View Timeline" button works

### Navigation
- [ ] Slide 1 (Launch) loads with image
- [ ] "Next" button goes to Slide 2
- [ ] Slide 2 (Decision) shows two options
- [ ] Click "Choose This Option" reveals NASA's decision
- [ ] Slide 3 (Info) accordion sections expand/collapse
- [ ] "Previous" button goes back
- [ ] Home button returns to landing page

### Mobile Responsiveness
- [ ] Works on iPhone Safari
- [ ] Works on Android Chrome
- [ ] Text is readable on small screen
- [ ] Buttons are tappable
- [ ] Images don't overflow
- [ ] Navigation is usable

### Performance
- [ ] Page loads in <3 seconds
- [ ] Images load progressively
- [ ] No JavaScript errors in console
- [ ] Smooth scrolling works

---

## 🔧 Troubleshooting

### "404 - Page Not Found"
**Cause**: GitHub Pages not enabled yet, or still deploying
**Fix**:
1. Wait 2-3 minutes after enabling Pages
2. Check Settings → Pages shows "Your site is live"
3. Make sure branch is `main` and folder is `/`

### Images Don't Load
**Cause**: Path issues or images not pushed
**Fix**:
1. Check images exist in GitHub: https://github.com/RobGruhl/apollo-13-scout-mission/tree/main/assets/images
2. Verify paths in HTML use `assets/images/` or `../assets/images/` (relative paths)

### CSS Not Applying
**Cause**: Path to stylesheet incorrect
**Fix**:
1. Check `<link>` in HTML points to correct CSS path
2. Verify `style.css` exists in repo

### JavaScript Not Working
**Cause**: Browser console showing errors
**Fix**:
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Check Console tab for errors
3. Most common: path to `app.js` incorrect

---

## 🔄 Making Updates

### After Making Changes

```bash
# In your local project
git add .
git commit -m "Update interactive experience"
git push origin main

# GitHub automatically redeploys in 1-2 minutes
# Visit URL to see changes
```

**Tip**: Add `?v=2` to URL to bypass browser cache:
```
https://apollo13.quest/?v=2
```

---

## 📊 Check Deployment Status

### Via GitHub Actions (if enabled)
1. Go to repository main page
2. Click **Actions** tab
3. Look for "pages build and deployment" workflow
4. Green checkmark = successful deployment
5. Red X = failed deployment (click for details)

### Via Settings
1. Go to Settings → Pages
2. See message: "Your site is live at [URL]"
3. Click "Visit site" to open in new tab

---

## 🎯 Generate QR Code for Jamboree

**Already done!** Ready-to-print QR codes for this site live in the `exhibit/` folder (`qr-code.png` for print, `qr-code-small.png` for cards/web). Use the steps below only if you need to regenerate them.

### Recommended Tool: QR Code Generator

1. **Visit**: https://www.qr-code-generator.com/

2. **Settings**:
   - Content Type: URL
   - URL: `https://apollo13.quest/`
   - Error Correction: High (30%)
   - Size: 1000×1000 px minimum

3. **Download**:
   - Format: SVG (vector, scalable) or PNG (high-res)
   - Save as: `apollo-13-qr-code.svg` or `.png`

4. **Test**:
   - Print on paper (small test)
   - Scan with iPhone camera
   - Scan with Android camera
   - Ensure it opens the correct URL

### QR Code Placement Ideas

**Option 1: Handout Card** (Business card size)
```
Front: "Experience Apollo 13"
       Mission patch image
       "Scan to start your mission →"

Back:  Large QR code (2" × 2")
       URL underneath: apollo13.quest
```

**Option 2: Table Sign** (8.5" × 11")
```
NASA TENT - APOLLO 13 TABLE

[Large QR Code - 4" × 4"]

SCAN TO EXPERIENCE THE MISSION
Presented by Ed Gruhl
Scout District Commissioner, Glacial Trails District

2026 Elevate Scout Jamboree
```

**Option 3: Poster Corner** (Add to physical posters)
```
Bottom right corner: 2" × 2" QR code
Caption: "Continue online →"
```

---

## 📈 Monitor Usage (Optional)

### Free Analytics Options

**Option 1: GitHub Traffic (built-in)**
- Go to repository → Insights → Traffic
- See: Views, Unique visitors, Referring sites
- Limited to 14 days of data

**Option 2: Simple Analytics** (privacy-friendly)
- Add simple analytics code to HTML (optional)
- Respects privacy, no cookies
- ~$9/month for basic plan

**Option 3: No Analytics**
- Perfectly fine! Just know scouts are using it.
- Can ask for feedback manually

---

## 💰 Cost & Limits

### GitHub Pages Free Tier
- **Cost**: $0/month (forever)
- **Bandwidth**: 100GB/month
- **Storage**: 1GB
- **Build Time**: 10 minutes/build

### Estimated Usage (Scout Jamboree)
- **Visits**: 100-500/month (scout troops)
- **Bandwidth**: ~2GB/month (with images)
- **Well within free tier**: ✅

### If You Exceed Limits (unlikely)
- GitHub sends email warning
- Can upgrade to paid plan (~$4/month)
- Or switch to Cloudflare Pages (also free)

---

## 🎉 Success Checklist

Once deployed, verify:

- [ ] Site loads at: https://apollo13.quest/
- [ ] Landing page displays correctly
- [ ] All 34 slides load (narrative, decision, and info pages)
- [ ] Timeline page loads and links to slides
- [ ] Navigation buttons work (Next, Previous, Home)
- [ ] Decision slide interaction works (click option → reveal)
- [ ] Info slide accordions expand/collapse
- [ ] Mobile responsive (test on phone)
- [ ] QR code generated and tested
- [ ] No console errors in browser DevTools

---

## 📞 Next Steps After Deployment

1. **Test thoroughly**:
   - Desktop browser
   - iPhone Safari
   - Android Chrome
   - Tablet (if available)

2. **Share with Ed**:
   - Send URL: https://apollo13.quest/
   - Get feedback on the full 34-slide experience
   - Walk through the exhibit table plan (`exhibit/README.md`)

3. **User testing** (optional):
   - Show to 2-3 scouts
   - Observe them using it
   - Note any confusion or issues
   - Gather feedback

4. **Prepare exhibit materials**:
   - Web previews of the 2 posters and 2 handout cards are in `exhibit/`
   - Print-ready source files live in the local `apollo-working-materials` archive (kept outside this repo)

5. **Print QR codes**:
   - Ready-made codes: `exhibit/qr-code.png` (print) and `exhibit/qr-code-small.png` (cards/web)
   - Handout cards for scouts
   - Table sign for NASA tent
   - Optional: add to physical posters

---

## 🆘 Need Help?

### Common Issues

**Issue**: CSS not loading
**Check**: View page source, click CSS link, verify it loads

**Issue**: Images broken
**Check**: Right-click broken image → Inspect → see 404 error → fix path

**Issue**: JavaScript not working
**Check**: Browser Console (F12) → see error message → fix path/syntax

### Resources

- GitHub Pages Docs: https://docs.github.com/en/pages
- Browser DevTools: F12 (Windows) or Cmd+Option+I (Mac)
- QR Code Generator: https://www.qr-code-generator.com/

---

## 📝 Repository Structure (After Deployment)

```
apollo-13-scout-mission/
└── branch: main  ← GitHub Pages serves from root of this branch
    ├── index.html           # https://robgruhl.github.io/apollo-13-scout-mission/
    ├── timeline.html        # https://robgruhl.github.io/apollo-13-scout-mission/timeline.html
    ├── slides/              # 34 HTML slide files
    │   ├── 01-launch.html
    │   ├── 02-freeze-squeeze.html
    │   └── ... (32 more slides)
    ├── assets/
    │   ├── css/style.css
    │   ├── js/app.js
    │   └── images/
    ├── exhibit/             # Poster/card previews + QR codes for the jamboree table
    ├── scripts/             # Testing scripts
    └── docs/                # Documentation (this guide, sitemap, scoring design)
```

---

**Last Updated**: July 4, 2026
**Status**: ✅ Live on GitHub Pages

**Need to check or re-enable Pages?**
Go to https://github.com/RobGruhl/apollo-13-scout-mission/settings/pages and confirm the settings above.

🚀 **You're live!**
