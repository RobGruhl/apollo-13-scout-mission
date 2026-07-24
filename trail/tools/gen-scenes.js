/**
 * Generate Oregon Trail (Apple II, 1985) style scene panels for Apollo Trail
 * using gpt-image-2 via the hello-gpt-image client library.
 *
 * Run:  cd ~/Projects/hello-gpt-image && bun ~/Projects/apollo-mission/trail/tools/gen-scenes.js
 * Raw output lands in working/trail-sprites/raw/ (gitignored).
 * Then pixel-align + palette-quantize with:  python3 trail/tools/pixelize.py
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
  title:
    'Apollo command/service module docked nose-to-nose with the lunar module (four-legged ' +
    'lander), flying through black space with white star pixels, small blue-and-white Earth ' +
    'at lower left, small gray-white Moon at upper right.',
  launch:
    'Saturn V rocket (white with black roll-pattern markings) lifting off past its launch ' +
    'tower on a bright day, huge orange flame plume and white smoke clouds below, blue sky.',
  explosion:
    'Apollo command/service module with lunar module attached, in black space; a side panel ' +
    'of the cylindrical service module is blown open, jagged hole, white and green gas ' +
    'venting out in a spray of pixels; white star pixels around.',
  moon:
    'Close pass over the gray cratered far side of the Moon filling the bottom half of the ' +
    'frame, black starfield above, tiny distant blue Earth dot near the horizon.',
  burn:
    'Four-legged lunar module with a dark command module attached above, its single descent ' +
    'engine firing a bright orange and white flame cone downward, black starfield, small ' +
    'blue Earth far away.',
  mailbox:
    'Interior close-up of an improvised cube-shaped air scrubber canister connected to a ' +
    'ridged round hose, held together with wide gray tape strips, floating in a dim ' +
    'spacecraft cabin with instrument panels behind.',
  frost:
    'Dark freezing spacecraft cabin interior, silhouetted instrument panels, a round window ' +
    'covered in white frost crystals and water droplets, faint cold blue light.',
  crew:
    'Three astronauts huddled shoulder to shoulder for warmth inside a cramped dim ' +
    'spacecraft cabin, visible breath fog, cold blue light, white spacesuit garments.',
  reentry:
    'Cone-shaped Apollo command module plunging through the atmosphere as a fireball, blunt ' +
    'heat shield leading, long orange and white plasma trail behind, curve of blue Earth below.',
  splashdown:
    'Cone-shaped gray Apollo command module descending under three huge orange and white ' +
    'striped parachutes toward a blue ocean with white wave pixels, light blue sky.',
  mcc:
    'NASA mission control room, rows of green-glowing consoles with operator silhouettes ' +
    'seen from behind, one huge wall screen showing a curved flight path around the Moon.',
  farewell:
    'The four-legged lunar module drifting away alone into black starry space, seen small ' +
    'and forlorn through the edge of a spacecraft window frame.',
};

const entries = Object.entries(SCENES);
for (let i = 0; i < entries.length; i += 4) {
  const batch = entries.slice(i, i + 4);
  await Promise.all(
    batch.map(async ([name, scene]) => {
      try {
        const { images } = await generate(STYLE + scene, { size: '1536x1024', quality: 'medium' });
        fs.writeFileSync(`${OUT}/${name}.png`, images[0]);
        console.log('OK  ', name);
      } catch (e) {
        console.error('FAIL', name, e.message);
      }
    })
  );
}
console.log('DONE');
