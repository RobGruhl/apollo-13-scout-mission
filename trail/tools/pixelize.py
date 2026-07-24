#!/usr/bin/env python3
"""Pixel-align + palette-quantize gpt-image renders into game sprites.

gpt-image-2 draws *fake* pixel art: the implied pixel grid isn't aligned to
real pixels, colors drift off-palette, and files are 1536x1024. This makes it
real: downscale to the game's logical 240x160 (BOX filter averages each
implied cell), snap every pixel to an 8-color Apple II-ish palette, and save
a tiny PNG that CSS scales back up with image-rendering: pixelated.

Run from the repo root:  python3 trail/tools/pixelize.py
"""
from pathlib import Path
from PIL import Image

RAW = Path('working/trail-sprites/raw')
OUT = Path('trail/sprites')
W, H = 240, 160

# Apple II hi-res palette (common RGB approximations) + two grays for the
# Moon / capsule scenes — the same license the DOS-era OT panels took.
PALETTE = [
    (0, 0, 0),
    (255, 255, 255),
    (32, 200, 32),     # green
    (191, 82, 255),    # violet
    (240, 100, 0),     # orange
    (59, 120, 255),    # medium blue
    (160, 160, 160),   # light gray
    (80, 80, 80),      # dark gray
]

pal_img = Image.new('P', (1, 1))
flat = [c for rgb in PALETTE for c in rgb]
pal_img.putpalette(flat + flat[:3] * (256 - len(PALETTE)))

OUT.mkdir(parents=True, exist_ok=True)
for src in sorted(RAW.glob('*.png')):
    img = Image.open(src).convert('RGB')
    img = img.resize((W, H), Image.Resampling.BOX)
    img = img.quantize(palette=pal_img, dither=Image.Dither.NONE).convert('P',
        palette=Image.Palette.ADAPTIVE, colors=len(PALETTE))
    out = OUT / src.name
    img.save(out, optimize=True)
    print(f'{src.name}: {out.stat().st_size:,} bytes')
