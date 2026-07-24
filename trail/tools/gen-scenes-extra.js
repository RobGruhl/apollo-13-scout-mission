/**
 * Two follow-up scene panels for Apollo Trail (see gen-scenes.js for the pipeline).
 * Run:  cd ~/Projects/hello-gpt-image && bun ~/Projects/apollo-mission/trail/tools/gen-scenes-extra.js
 */
import fs from 'node:fs';
import { generate } from '/Users/robgruhl/Projects/hello-gpt-image/lib/gpt-image.js';

const OUT = '/Users/robgruhl/Projects/apollo-mission/working/trail-sprites/raw';
fs.mkdirSync(OUT, { recursive: true });

const STYLE =
  'Retro 1985 Apple II "Oregon Trail" style pixel art game scene. Chunky low-resolution ' +
  'pixel art, as if drawn on a 280x192 screen and enlarged: hard-edged square pixels, flat ' +
  'solid colors, no anti-aliasing, no gradients, at most simple checkerboard dithering. ' +
  'STRICT limited palette: pure black background, white, bright green, violet purple, ' +
  'orange, medium blue only. Clean silhouettes, minimal detail, iconic composition. ' +
  'No text, no letters, no numbers, no UI elements, no border, no frame. Scene: ';

const SCENES = {
  suncheck:
    'View through a spacecraft alignment telescope: circular eyepiece with thin white ' +
    'crosshair reticle lines, and a blazing white-and-orange pixelated Sun sitting right ' +
    'at the crosshair center, black space around, a few faint debris sparkle pixels.',
  smadrift:
    'A cylindrical Apollo service module drifting alone in black starry space, seen from ' +
    'a distance, one entire side panel missing, torn open with jagged edges showing dark ' +
    'wrecked innards and dangling debris, silver hull, small orange glints.',
};

await Promise.all(
  Object.entries(SCENES).map(async ([name, scene]) => {
    try {
      const { images } = await generate(STYLE + scene, { size: '1536x1024', quality: 'medium' });
      fs.writeFileSync(`${OUT}/${name}.png`, images[0]);
      console.log('OK  ', name);
    } catch (e) {
      console.error('FAIL', name, e.message);
    }
  })
);
console.log('DONE');
