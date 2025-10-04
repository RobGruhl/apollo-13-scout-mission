# Apollo 13 Poster System - Technical Solution (One-Pager)

## **The Challenge**
Create 24 large-format posters (3' x 2') with consistent design for Boy Scout interactive Apollo 13 mission presentation.

---

## **Recommended Solution: HTML/CSS + Inline SVG**

### **Why This Stack?**

| Technology | Benefits | Use Case |
|------------|----------|----------|
| **HTML/CSS** | Rapid layout, consistent styling, preview in browser | Text layout, structure, responsive panels |
| **SVG** | Vector graphics (infinite scaling), crisp at any size | Diagrams, icons, timelines, technical drawings |
| **Playwright** | Built into Claude Code, screenshot capability | Export to high-res PNG images |
| **Browser Print** | Native PDF export, vector preservation | Professional print-ready files |

### **Quality Guarantee**
- ✅ **Vector-first**: Text and graphics stay sharp at 36" x 24"
- ✅ **300 DPI capable**: Can export PNG at 10,800 x 7,200 pixels if needed
- ✅ **Print-ready PDFs**: Export directly from browser with zero quality loss
- ✅ **Consistent styling**: Single CSS file controls all 24 posters

---

## **Production Workflow**

```
┌──────────────────┐
│ 1. CODE IN HTML  │  Claude Code generates HTML file
│    + CSS + SVG   │  - Viewport: 3600x2400px (36" x 24" @ 100 DPI base)
└────────┬─────────┘  - All styles in <style> or external CSS
         │            - SVG graphics inline or linked
         ↓
┌──────────────────┐
│ 2. PREVIEW       │  Open in browser (Chrome recommended)
│    IN BROWSER    │  - View at 100%, 50%, 25% zoom
└────────┬─────────┘  - Test from 6-10 feet away
         │            - Verify font sizes, contrast
         ↓
┌──────────────────┐
│ 3. EXPORT        │  OPTION A: Browser Print → PDF (vector, best)
│    TO PRINT      │  OPTION B: Playwright screenshot → PNG
└────────┬─────────┘  OPTION C: Extract SVG → Inkscape → PDF
         │
         ↓
┌──────────────────┐
│ 4. PRINT         │  Send PDF to print shop
│    @ 36" x 24"   │  - FedEx Office: ~$25-35 per poster
└──────────────────┘  - Optional: foam core mount, laminate
```

---

## **Design Specifications**

### **Canvas**
- **Dimensions**: 3600px x 2400px (3:2 aspect ratio)
- **Margins**: 120px all sides
- **Grid**: 12-column flexible layout

### **Typography** (readable from 10 feet)
| Element | Size | Example |
|---------|------|---------|
| Main Heading | 72-96pt | "DECISION POINT #2" |
| Section Heading | 48-60pt | "The Crisis" |
| Body Text | 32-36pt | Bullet points, descriptions |
| Small Text | 24-28pt | Captions, timestamps |

### **Color Palette**
- **Primary**: NASA Blue (#0B3D91), White (#FFFFFF), Black (#000000)
- **Accents**: Crisis Red (#DC143C), Success Green (#2E7D32), Caution Yellow (#FFA000)
- **Contrast**: 7:1 minimum (WCAG AAA)

### **File Structure**
```
posters/
├── templates/
│   ├── narrative-template.html
│   ├── info-template.html
│   └── decision-template.html
├── styles/
│   └── common.css
├── [01-24 individual poster HTML files]
└── exports/
    └── [01-24 PDF/PNG exports]
```

---

## **Three Poster Types**

### **1️⃣ NARRATIVE** (6 slides)
- Timeline progression
- 3-5 key events per slide
- Visual timeline bar
- Photos/illustrations
- Storytelling focus

### **2️⃣ INFORMATION** (8 slides)
- Technical deep dives
- Diagrams & schematics
- 60/40 visual/text ratio
- "How it works" explanations
- Background context

### **3️⃣ CRISIS DECISION** (10 slides)
- Crisis statement (large, bold)
- Context bullets
- 2-3 options in equal columns
- PRO/CON bullets for each
- No answer revealed (leader-guided)

---

## **Sample HTML Template**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=3600, height=2400">
    <title>Apollo 13 - Slide Title</title>
    <link rel="stylesheet" href="styles/common.css">
</head>
<body>
    <div class="poster" style="width: 3600px; height: 2400px;">
        <!-- Content: HTML divs for text, SVG for graphics -->
        <svg width="3600" height="2400" xmlns="http://www.w3.org/2000/svg">
            <!-- Vector graphics here -->
        </svg>
        <div class="content">
            <h1 style="font-size: 96px;">Slide Title</h1>
            <!-- More content -->
        </div>
    </div>
</body>
</html>
```

---

## **Export Methods**

### **Method 1: Browser Print to PDF** ⭐ RECOMMENDED
1. Open HTML in Chrome
2. Print (Cmd+P / Ctrl+P)
3. Destination: Save as PDF
4. More settings:
   - Paper size: Custom (36 x 24 inches)
   - Margins: None
   - Scale: 100%
   - Background graphics: ✓ ON
5. Save PDF → send to print shop

**Pros**: Vector quality, true colors, fast
**Cons**: Requires browser print settings

### **Method 2: Playwright Screenshot**
```javascript
// Using Claude Code's Playwright MCP
await page.setViewportSize({ width: 3600, height: 2400 });
await page.screenshot({
    path: 'poster.png',
    fullPage: true
});
```

**Pros**: Automated, batch export possible
**Cons**: PNG format (raster), larger files

### **Method 3: SVG Extract → Inkscape**
1. Right-click SVG in browser → Inspect
2. Copy outer `<svg>` element
3. Save as .svg file
4. Open in Inkscape (free)
5. Export → PDF or high-res PNG

**Pros**: Maximum quality control
**Cons**: Manual process per poster

---

## **Print Specifications**

**For Print Shop**:
- File format: PDF (preferred) or PNG @ 300 DPI
- Color mode: RGB (digital print) or CMYK (offset)
- Fonts: Embedded in PDF
- Resolution: Vector (PDF) or 10,800 x 7,200px (PNG)

**Cost Estimate**:
- Printing: $25-35 per 36"x24" poster
- Foam core mount: +$10-15
- Lamination: +$15-20
- **Total per poster**: $25-70 depending on options
- **Full set (24 posters)**: $600-1,680

---

## **Advantages of This Approach**

✅ **Claude Code native**: Can generate complete HTML/CSS/SVG in one go
✅ **Scalable**: Vector graphics ensure quality at any size
✅ **Consistent**: Single CSS file = unified visual system across 24 posters
✅ **Editable**: Easy to update text, colors, layouts
✅ **Previewable**: See exactly what prints before exporting
✅ **Professional**: Print-shop ready PDFs with embedded fonts
✅ **Cost-effective**: No expensive design software required
✅ **Future-proof**: Can be updated for future scout troops

---

## **Next Step: Prototype**

**Recommend prototyping**: **"Decision: Freeze or Squeeze?"** (Decision Point #2)

**Why this slide?**
- Iconic decision from Ed's original program
- Simple 2-option choice (clear layout test)
- Good mix of text and potential diagrams
- Emotionally engaging ("freeze" vs "squeeze" is vivid)

**Prototype deliverables**:
1. Complete HTML file
2. Browser preview screenshot
3. Exported PDF (sample)
4. Feedback & iteration

---

**Ready to build the first prototype poster!** 🚀
