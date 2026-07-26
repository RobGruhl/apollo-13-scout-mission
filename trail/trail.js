/**
 * Apollo Trail — an Oregon Trail-style remake of the Apollo 13 Interactive Experience
 * Style guide: The Oregon Trail (MECC, Apple II, 1985).
 *
 * Same 10 real NASA decisions as the classic slide mission (same correct
 * answers, same rank thresholds, same rank-card scheme) — played as a 1985
 * trail game: scene panel on top, teletype text and numbered menus below,
 * a ticking mission clock, and resource gauges standing in for
 * food/health/oxen.
 *
 * Content comes from trail-data.js, which is condensed from the fact-checked
 * slides. Resource gauges and minigames are flavor — the score is, exactly as
 * in the classic mission, the 10 decisions compared with Mission Control.
 *
 * Storage: trailBestScore (localStorage), trailRun (sessionStorage),
 * trailSound (localStorage). Deliberately separate keys from the classic
 * app's `decisions`/`visitedSlides`/`bestScore` so the two games never
 * clobber each other.
 */

/* ========================================================================
 * Tiny utilities
 * ====================================================================== */

const $ = (sel) => document.querySelector(sel);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// localStorage can throw (private browsing, storage denied) — never let
// score-keeping crash the game
function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function lsSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* keeping score is a bonus */ }
}

/* ========================================================================
 * Sound — Apple II speaker blips, WebAudio, zero assets
 * ====================================================================== */

const Sound = {
    ctx: null,
    on: lsGet('trailSound') === '1',

    ensure() {
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) this.ctx = new AC();
        }
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },

    beep(freq = 880, dur = 0.05, vol = 0.04, type = 'square', when = 0) {
        if (!this.on || !this.ctx) return;
        const t = this.ctx.currentTime + when;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.02);
    },

    tick()    { this.beep(1100 + Math.random() * 300, 0.012, 0.015); },
    select()  { this.beep(660, 0.06); this.beep(880, 0.08, 0.04, 'square', 0.07); },
    override(){ this.beep(220, 0.16, 0.05, 'sawtooth'); this.beep(180, 0.2, 0.05, 'sawtooth', 0.17); },
    alarm()   { for (let i = 0; i < 4; i++) this.beep(i % 2 ? 700 : 950, 0.12, 0.05, 'square', i * 0.14); },
    fanfare() { [523, 659, 784, 1047].forEach((f, i) => this.beep(f, 0.14, 0.05, 'square', i * 0.13)); },
};

/* ========================================================================
 * Game state
 * ====================================================================== */

const state = {
    name: '',
    get: 0,                 // mission clock, hours (Ground Elapsed Time)
    idx: 0,                 // next event index (resume point)
    score: 0,
    decisions: {},          // slideId -> chosen option key
    pwr: 100, h2o: 100, co2: 1,
    rates: { pwr: 0, h2o: 0, co2: 0 },   // change per mission hour, applied while traveling
    done: false,
};
// (best score lives in localStorage 'trailBestScore', read where needed)

function saveRun() {
    try {
        sessionStorage.setItem('trailRun', JSON.stringify({
            name: state.name, get: state.get, idx: state.idx, score: state.score,
            decisions: state.decisions, pwr: state.pwr, h2o: state.h2o, co2: state.co2,
            rates: state.rates,
        }));
    } catch (e) { /* storage full/blocked — resume is a bonus, not a promise */ }
}

function loadRun() {
    try { return JSON.parse(sessionStorage.getItem('trailRun') || 'null'); }
    catch (e) { return null; }
}

function clearRun() {
    try { sessionStorage.removeItem('trailRun'); } catch (e) { /* ignore */ }
}

/* ========================================================================
 * Content wiring (trail-data.js)
 * ====================================================================== */

const DEC = Object.fromEntries(TRAIL_DATA.decisions.map((d) => [d.slide, d]));
const NARR = Object.fromEntries(TRAIL_DATA.narratives.map((n) => [n.slide.slice(0, 2), n]));
const ARC = TRAIL_DATA.arc.beats;

/**
 * Mission timeline in true GET order (slide 16's own timestamp is ~65:00,
 * so the comm-power decision plays between the free-return burn and the
 * sun check — see the slide).  get = mission hours.
 */
const EVENTS = [
    { get: 0.05,   type: 'story', scene: 'launch',     narr: NARR['01'] },
    { get: 3.0,    type: 'story', scene: 'title',      narr: NARR['02'] },
    {
        get: 55.92, type: 'story', scene: 'explosion', narr: NARR['03'], alarm: true,
        // Fuel cells die and the survival clock starts: power margin collapses,
        // water begins draining, three crews' worth of CO2 starts building.
        fx() {
            state.pwr = 45;
            state.rates = { pwr: -0.22, h2o: -0.85, co2: 0.16 };
        },
    },
    { get: 57.68,  type: 'decision', scene: 'crew',      d: '4'  },
    { get: 58.2,   type: 'decision', scene: 'frost',     d: '5'  },
    { get: 61.49,  type: 'decision', scene: 'mcc',       d: '6'  },
    { get: 65.0,   type: 'decision', scene: 'mcc',       d: '16' },
    { get: 73.77,  type: 'decision', scene: 'suncheck',  d: '9'  },
    { get: 77.13,  type: 'story', scene: 'moon',       narr: NARR['10'] },
    { get: 79.46,  type: 'decision', scene: 'burn',      d: '11' },
    { get: 80.8,   type: 'story', scene: null,         narr: NARR['15'] },  // PTC — over the travel view
    { get: 85.0,   type: 'decision', scene: 'crew',      d: '12' },
    { get: 93.0,   type: 'decision', scene: 'mailbox',   d: '13', minigame: 'mailbox' },
    { get: 100.0,  type: 'story', scene: 'frost',      narr: NARR['14'] },
    {
        // MCC-5 is where the hand-flown Earth-terminator technique really lived
        // (slide 09: COAS gunsight, hand-timed 14-second burn, ~GET 105:18)
        get: 105.3, type: 'story', scene: 'burn', minigame: 'burn',
        beat: {
            title: 'MCC-5 — THE 14-SECOND BURN', get: '~105:18',
            text: 'The course has drifted shallow — the LM’s venting nudges it every hour. ' +
                'Houston’s fix, with the computer powered down: a 14-second burn flown by hand. ' +
                'Lovell keeps Earth’s terminator — the day/night line — centered in the COAS gunsight ' +
                'while the crew times the burn. Sun, Earth, eyeballs, and a watch.',
        },
    },
    { get: 112.2,  type: 'decision', scene: 'frost',     d: '17' },
    { get: 137.0,  type: 'story', scene: 'mcc',        beat: ARC[0] },
    { get: 138.03, type: 'decision', scene: 'smadrift',  d: '18' },
    { get: 140.17, type: 'story', scene: 'frost',      beat: ARC[1] },
    { get: 141.5,  type: 'story', scene: 'farewell',   beat: ARC[2] },
    { get: 142.68, type: 'story', scene: 'reentry',    beat: ARC[3] },
    { get: 142.7,  type: 'blackout', scene: 'reentry', beat: ARC[4] },
    { get: 142.81, type: 'story', scene: 'splashdown', beat: ARC[5] },
    { get: 142.91, type: 'story', scene: 'splashdown', beat: ARC[6], fanfare: true },
    { type: 'end' },
];

const TOTAL_DECISIONS = TRAIL_DATA.decisions.length;

/** Flavor lines shown while traveling — all drawn from slide content. */
const TICKER = [
    'PASSIVE THERMAL ROLL: ONE TURN EVERY 10-20 MIN',
    'HOUSTON READS UP PROCEDURES, LINE BY LINE',
    'YOU CAN SEE YOUR BREATH IN THE CABIN',
    'CONDENSATION BEADS ON EVERY COLD PANEL',
    'SIMULATORS RUN ALL NIGHT BACK ON EARTH',
    'THE WORLD IS WATCHING. NOBODY SLEEPS.',
    'RCS PULSE. THE STACK WOBBLES, STEADIES.',
    'LOW-BIT-RATE TELEMETRY CRACKLES ON.',
];

/* ========================================================================
 * Scene renderer — 240x160 logical pixels, integer-aligned
 * ====================================================================== */

const canvas = $('#scene');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const CW = 240, CH = 160;

const SPRITE_NAMES = ['title', 'launch', 'explosion', 'moon', 'burn', 'mailbox', 'frost',
    'crew', 'reentry', 'splashdown', 'mcc', 'farewell', 'suncheck', 'smadrift'];
const SPRITES = {};

function loadSprites() {
    return Promise.all(SPRITE_NAMES.map((name) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => { SPRITES[name] = img; resolve(); };
        img.onerror = () => { SPRITES[name] = null; resolve(); };  // fallback renderer takes over
        img.src = 'sprites/' + name + '.png';
    })));
}

/** Deterministic per-pixel hash so procedural planets don't shimmer. */
const phash = (x, y) => ((x * 73856093) ^ (y * 19349663)) >>> 0;

// Two-layer starfield, fixed positions, scrolled during travel
const STARS = [];
for (let i = 0; i < 90; i++) {
    STARS.push({
        x: (i * 53) % CW,
        y: (i * 97) % CH,
        layer: i % 3 === 0 ? 2 : 1,
    });
}

function drawStars(offset) {
    for (const s of STARS) {
        const x = ((s.x - Math.floor(offset * s.layer)) % CW + CW) % CW;
        ctx.fillStyle = s.layer === 2 ? '#e8e8e8' : '#707070';
        ctx.fillRect(x, s.y, 1, 1);
    }
}

function drawPlanet(cx0, cy0, r, kind) {
    const r2 = r * r;
    for (let y = -r; y <= r; y++) {
        for (let x = -r; x <= r; x++) {
            if (x * x + y * y > r2) continue;
            const h = phash(x + 500, y + 500) % 23;
            if (kind === 'earth') {
                ctx.fillStyle = h < 5 ? '#ffffff' : (h < 9 ? '#20c820' : '#3b78ff');
            } else {
                ctx.fillStyle = h < 4 ? '#505050' : '#a0a0a0';
            }
            ctx.fillRect(cx0 + x, cy0 + y, 1, 1);
        }
    }
}

/** The "wagon": CSM+LM docked stack, side view, LM legs forward. ~46x16 px. */
function drawStack(x, y, t) {
    const bob = REDUCED_MOTION ? 0 : Math.round(Math.sin(t / 700) * 2);
    y += bob;
    // Service Module cylinder + engine bell (right)
    ctx.fillStyle = '#a0a0a0'; ctx.fillRect(x + 28, y + 3, 14, 10);
    ctx.fillStyle = '#505050'; ctx.fillRect(x + 28, y + 3, 14, 1);
    ctx.fillRect(x + 28, y + 12, 14, 1);
    ctx.fillRect(x + 42, y + 5, 2, 6); ctx.fillRect(x + 44, y + 4, 2, 8);
    // Command Module cone (stepped, pointing left)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 25, y + 5, 3, 6); ctx.fillRect(x + 22, y + 6, 3, 4); ctx.fillRect(x + 20, y + 7, 2, 2);
    // docking tunnel
    ctx.fillStyle = '#a0a0a0'; ctx.fillRect(x + 18, y + 7, 2, 2);
    // LM ascent stage (boxy) + window
    ctx.fillStyle = '#a0a0a0'; ctx.fillRect(x + 8, y + 4, 10, 8);
    ctx.fillStyle = '#505050'; ctx.fillRect(x + 8, y + 4, 10, 1);
    ctx.fillStyle = '#3b78ff'; ctx.fillRect(x + 10, y + 6, 2, 2);
    // LM descent stage (gold foil) + legs
    ctx.fillStyle = '#f06400'; ctx.fillRect(x + 2, y + 3, 6, 10);
    ctx.fillRect(x, y + 1, 2, 3); ctx.fillRect(x, y + 12, 2, 3);
    // rendezvous antenna
    ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 13, y + 2, 1, 2); ctx.fillRect(x + 12, y + 1, 3, 1);
    // occasional RCS puff
    if (!REDUCED_MOTION && phash(Math.floor(t / 400), 7) % 5 === 0) {
        ctx.fillStyle = '#e8e8e8';
        ctx.fillRect(x + 33, y - 2, 2, 1); ctx.fillRect(x + 35, y - 3, 1, 1);
    }
}

/** Distance from Earth (statute miles) as a function of GET hours. */
const DIST_WAYPOINTS = [[0, 0], [55.93, 200000], [77.13, 248655], [142.91, 0]];
function distanceAt(get) {
    for (let i = 1; i < DIST_WAYPOINTS.length; i++) {
        const [g0, d0] = DIST_WAYPOINTS[i - 1];
        const [g1, d1] = DIST_WAYPOINTS[i];
        if (get <= g1) return Math.round(d0 + (d1 - d0) * ((get - g0) / (g1 - g0)));
    }
    return 0;
}

/* View state consumed by the render loop */
const view = { mode: 'boot', sprite: null, burn: null, staticUntil: 0, buildFrac: 1 };

const SCENE_LABELS = {
    title: 'The Apollo spacecraft stack in space between Earth and Moon',
    launch: 'Saturn V lifting off from the pad',
    explosion: 'The Service Module venting oxygen into space',
    moon: 'The cratered far side of the Moon',
    burn: 'The Lunar Module descent engine firing',
    mailbox: 'The improvised CO2 scrubber adapter',
    frost: 'Frost on the window of the dark, cold cabin',
    crew: 'Three astronauts huddled together for warmth',
    reentry: 'The Command Module reentering as a fireball',
    splashdown: 'Odyssey descending under three parachutes',
    mcc: 'The Mission Control room in Houston',
    farewell: 'The Lunar Module drifting away',
    suncheck: 'The Sun centered in the alignment telescope',
    smadrift: 'The damaged Service Module drifting, one side blown out',
};

function setPanel(name) {
    view.mode = 'panel';
    view.sprite = name;
    view.buildFrac = 1;
    canvas.setAttribute('aria-label', SCENE_LABELS[name] || 'Mission scene');
}

function renderFrame(t) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CW, CH);

    if (view.mode === 'panel' || view.mode === 'boot') {
        const img = view.sprite && SPRITES[view.sprite];
        if (img) {
            if (view.buildFrac >= 1) {
                ctx.drawImage(img, 0, 0, CW, CH);
            } else {
                const h = Math.max(1, Math.floor(CH * view.buildFrac));
                ctx.drawImage(img, 0, 0, img.width, img.height * view.buildFrac, 0, 0, CW, h);
            }
        } else {
            drawStars(0);
            if (view.sprite) {
                ctx.fillStyle = '#33ff33';
                ctx.font = '8px monospace';
                ctx.fillText('[ ' + view.sprite.toUpperCase() + ' ]', 8, CH - 8);
            }
        }
    } else if (view.mode === 'travel') {
        const outbound = state.get < 77.13;
        drawStars(REDUCED_MOTION ? 0 : t / 90);
        const dist = distanceAt(state.get);
        const earthR = Math.max(4, Math.round(16 - 12 * (dist / 248655)));
        const moonNear = clamp(1 - Math.abs(state.get - 77.13) / 30, 0, 1);
        const moonR = Math.max(2, Math.round(3 + 12 * moonNear));
        if (outbound) {
            drawPlanet(24, 118, earthR, 'earth');
            drawPlanet(212, 38, moonR, 'moon');
        } else {
            drawPlanet(212, 118, earthR, 'earth');
            drawPlanet(24, 38, moonR, 'moon');
        }
        drawStack(98, 66, t);
    } else if (view.mode === 'burn' && view.burn) {
        const b = view.burn;
        drawStars(0);
        // reticle
        ctx.strokeStyle = '#33ff33';
        ctx.lineWidth = 1;
        ctx.strokeRect(120 - 40 + 0.5, 80 - 40 + 0.5, 80, 80);
        ctx.beginPath();
        ctx.moveTo(120.5, 20); ctx.lineTo(120.5, 140);
        ctx.moveTo(50, 80.5); ctx.lineTo(190, 80.5);
        ctx.stroke();
        // Earth drifting in the crosshair
        drawPlanet(Math.round(120 + b.pos), 80, 14, 'earth');
        // engine flame strip at bottom
        for (let i = 0; i < 24; i++) {
            const fh = 4 + (phash(i, Math.floor(t / 80)) % 7);
            ctx.fillStyle = i % 2 ? '#f06400' : '#ffffff';
            ctx.fillRect(104 + i, CH - fh, 1, fh);
        }
        // progress bar + centering indicator
        ctx.fillStyle = '#33ff33';
        ctx.fillRect(20, 8, Math.floor(200 * b.progress), 4);
        ctx.strokeStyle = '#1c9a1c';
        ctx.strokeRect(19.5, 7.5, 201, 5);
        ctx.fillStyle = Math.abs(b.pos) < 12 ? '#33ff33' : '#ffb000';
        ctx.fillRect(118 + Math.round(b.pos), 148, 5, 3);
    } else if (view.mode === 'static') {
        for (let y = 0; y < CH; y += 2) {
            for (let x = 0; x < CW; x += 2) {
                const v = Math.random();
                ctx.fillStyle = v < 0.06 ? '#33ff33' : (v < 0.5 ? '#0a0a0a' : (v < 0.8 ? '#2a2a2a' : '#4a4a4a'));
                ctx.fillRect(x, y, 2, 2);
            }
        }
    }
    requestAnimationFrame(renderFrame);
}
requestAnimationFrame(renderFrame);

/* ========================================================================
 * Status strip
 * ====================================================================== */

function fmtGET(hours) {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return 'GET ' + String(h).padStart(3, '0') + ':' + String(m).padStart(2, '0');
}

function crewLabel() {
    if (state.done) return 'CREW HOME';
    if (state.get < 55.92) return 'CREW NOMINAL';
    if (state.get < 58) return 'CREW SHAKEN';
    if (state.get < 90) return 'CREW COLD';
    if (state.get < 112) return 'CREW EXHAUSTED';
    if (state.get < 140) return 'CREW FEVERISH';
    return 'CREW GO FOR ENTRY';
}

function setBar(el, frac, warnAt, badAt, invert, srName) {
    const pct = clamp(frac, 0, 1);
    el.style.width = (pct * 100).toFixed(0) + '%';
    const level = invert ? pct : 1 - pct;   // invert: high value is the problem (CO2)
    el.className = level > badAt ? 'bad' : (level > warnAt ? 'warn' : '');
    const gauge = el.closest('.gauge');
    if (gauge) gauge.setAttribute('aria-label', srName + ' ' + (pct * 100).toFixed(0) + ' percent');
}

function renderStatus() {
    $('#st-get').textContent = fmtGET(state.get);
    $('#st-miles').textContent = 'EARTH ' + distanceAt(state.get).toLocaleString('en-US') + ' MI';
    $('#st-score').textContent = 'SCORE ' + state.score + '/' + TOTAL_DECISIONS;
    setBar($('#g-pwr'), state.pwr / 100, 0.5, 0.75, false, 'Power');
    setBar($('#g-h2o'), state.h2o / 100, 0.5, 0.75, false, 'Water');
    setBar($('#g-co2'), state.co2 / 15, 0.45, 0.8, true, 'Carbon dioxide');
    const crew = $('#st-crew');
    crew.textContent = crewLabel();
    crew.className = state.get >= 55.92 && !state.done ? 'warn' : '';
}

/** Advance resources for a span of mission hours (called from travel). */
function applyRates(dh) {
    state.pwr = clamp(state.pwr + state.rates.pwr * dh, 3, 100);
    state.h2o = clamp(state.h2o + state.rates.h2o * dh, 3, 100);
    state.co2 = clamp(state.co2 + state.rates.co2 * dh, 0.5, 14.9);
}

/* ========================================================================
 * Teletype + menus
 * ====================================================================== */

const story = $('#story');
const menuEl = $('#menu');
let skipTyping = false;

/** lines: array of strings or {text, cls}. Types them like a teletype. */
async function type(lines, { instant = false } = {}) {
    story.innerHTML = '';
    story.classList.add('typing');
    skipTyping = instant || REDUCED_MOTION;
    for (const line of lines) {
        const { text, cls } = typeof line === 'string' ? { text: line, cls: '' } : line;
        const p = document.createElement('p');
        if (cls) p.className = cls;
        story.appendChild(p);
        if (skipTyping) {
            p.textContent = text;
            continue;
        }
        for (let i = 0; i < text.length; i++) {
            p.textContent += text[i];
            if (i % 3 === 0) Sound.tick();
            await sleep(text[i] === ' ' ? 8 : 17);
            if (skipTyping) { p.textContent = text; break; }
        }
        p.scrollIntoView({ block: 'nearest' });
        if (!skipTyping) await sleep(140);
    }
    story.classList.remove('typing');
    // announce whole lines to screen readers instead of per-character typing
    const sr = $('#sr-live');
    if (sr) sr.textContent = lines.map((l) => (typeof l === 'string' ? l : l.text)).join(' ');
}

// Tapping the console (or pressing a key) fast-forwards the teletype;
// keys also skip travel/blackout so keyboard players are never stuck waiting
$('#console').addEventListener('click', () => { skipTyping = true; });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipTyping = true;
        skipTravel = true;
    }
});

/**
 * Render a numbered OT-style menu; resolves with the chosen option's value.
 * options: [{label, sub, value, cls}]
 */
function menu(options) {
    return new Promise((resolve) => {
        menuEl.innerHTML = '';
        options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'opt' + (opt.cls ? ' ' + opt.cls : '');
            const num = document.createElement('span');
            num.className = 'num';
            num.textContent = options.length > 1 ? (i + 1) + '.' : '▸';
            btn.appendChild(num);
            btn.appendChild(document.createTextNode(opt.label));
            if (opt.sub) {
                const sub = document.createElement('span');
                sub.className = 'sub';
                sub.textContent = opt.sub;
                btn.appendChild(sub);
            }
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Sound.ensure();
                Sound.select();
                menuEl.innerHTML = '';
                document.removeEventListener('keydown', onKey);
                resolve(opt.value);
            });
            menuEl.appendChild(btn);
        });
        const onKey = (e) => {
            const n = parseInt(e.key, 10);
            const btns = menuEl.querySelectorAll('.opt');
            if (n >= 1 && n <= btns.length) btns[n - 1].click();
            else if ((e.key === 'Enter' || e.key === ' ') && btns.length === 1) btns[0].click();
        };
        document.addEventListener('keydown', onKey);
        const first = menuEl.querySelector('.opt');
        first.focus({ preventScroll: true });   // keep keyboard/AT focus in the flow
        first.scrollIntoView({ block: 'nearest' });
    });
}

const pressOn = (label = 'TAP TO CONTINUE') =>
    menu([{ label, value: 1, cls: 'continue' }]);

/* ========================================================================
 * Travel — the rolling-wagon screen between events
 * ====================================================================== */

let skipTravel = false;
$('#scene-wrap').addEventListener('click', () => { skipTravel = true; skipTyping = true; });

async function travelTo(targetGet, { seconds = 5 } = {}) {
    const from = state.get;
    const span = targetGet - from;
    if (span <= 0.01) { state.get = targetGet; renderStatus(); return; }

    view.mode = 'travel';
    const flavor = TICKER[phash(Math.floor(targetGet), 3) % TICKER.length];
    story.innerHTML = '';
    const loc = document.createElement('p');
    loc.className = 'loc';
    loc.textContent = 'COASTING · ' + (state.get < 77.13 ? 'MOONWARD' : 'HOMEWARD');
    const fl = document.createElement('p');
    fl.className = 'dim';
    fl.textContent = state.get > 55 ? flavor : 'ALL SYSTEMS NOMINAL.';
    const hint = document.createElement('p');
    hint.className = 'dim';
    hint.textContent = '(TAP PICTURE TO SKIP AHEAD)';
    story.append(loc, fl, hint);

    skipTravel = false;
    const ms = REDUCED_MOTION ? 0 : seconds * 1000;
    const t0 = performance.now();
    let last = from;
    while (!skipTravel) {
        const t = performance.now() - t0;
        const frac = ms === 0 ? 1 : clamp(t / ms, 0, 1);
        state.get = from + span * frac;
        applyRates(state.get - last);
        last = state.get;
        renderStatus();
        if (frac >= 1) break;
        await sleep(50);
    }
    if (skipTravel) {
        applyRates(targetGet - last);
        state.get = targetGet;
        renderStatus();
    }
}

/* ========================================================================
 * Decisions — the heart of the game (same answers as the classic mission)
 * ====================================================================== */

/** Flavor-resource consequences per decision. Score is unaffected. */
function applyDecisionEffects(id, correct) {
    switch (id) {
        case '4': break;                                                    // lifeboat: survival itself
        case '5': state.pwr = clamp(state.pwr + (correct ? 12 : -10), 3, 100); break;
        case '6': break;                                                    // trajectory, not consumables
        case '16': state.rates.pwr = correct ? -0.12 : -0.3;
                   if (!correct) state.pwr = clamp(state.pwr - 8, 3, 100); break;
        case '9': break;
        case '11': break;
        case '12': state.rates.h2o = correct ? -0.5 : -0.75;
                   if (!correct) state.h2o = clamp(state.h2o - 10, 3, 100); break;
        case '13': if (!correct) state.co2 = clamp(state.co2 + 5, 0.5, 14.9);
                   state.rates.co2 = -0.9; break;                           // mailbox gets built either way
        case '17': state.pwr = clamp(state.pwr + (correct ? 12 : -5), 3, 100); break;
        case '18': break;
    }
}

let decisionCounter = 0;

async function runDecision(ev) {
    const d = DEC[ev.d];
    decisionCounter++;
    setPanel(ev.scene);

    const lines = [
        { text: 'DECISION ' + decisionCounter + ' OF ' + TOTAL_DECISIONS + ' · ' + d.get, cls: 'loc' },
        d.situation,
        { text: '⚠ ' + d.stakes, cls: 'warn' },
        { text: 'WHAT DO YOU DO, ' + (state.name || 'ASTRONAUT') + '?', cls: 'good' },
    ];
    await type(lines);

    // Decisions lock on first tap and restore locked on revisit (same rule as
    // the classic app) — a reload mid-outcome must not allow answer-flipping.
    let choice = state.decisions[d.slide];
    const isReplay = choice !== undefined;
    if (!isReplay) {
        choice = await menu(d.options.map((o) => ({ label: o.label, sub: o.blurb, value: o.key })));
        state.decisions[d.slide] = choice;
    }
    const correct = choice === d.correctKey;
    if (!isReplay) {
        if (correct) state.score++;
        else Sound.override();
        applyDecisionEffects(d.slide, correct);
        saveRun();
    }
    renderStatus();

    const outcome = [
        correct
            ? { text: '✔ MATCHES MISSION CONTROL', cls: 'good' }
            : { text: '✖ HOUSTON OVERRIDES YOUR CALL', cls: 'bad' },
        correct ? d.correctOutcome : d.wrongOutcome,
    ];
    if (d.quote) {
        outcome.push({ text: '“' + d.quote + '”', cls: 'quote' });
        outcome.push({ text: '— ' + d.quoteAttribution, cls: 'dim' });
    }
    await type(outcome);
    await pressOn();
}

/* ========================================================================
 * Minigame 1 — the hand-flown MCC-5 course correction
 * (Slide 09: Lovell held Earth's terminator in the COAS gunsight while the
 * crew hand-timed the 14-second burn.)
 * ====================================================================== */

async function burnMinigame() {
    if (REDUCED_MOTION) {
        // no motion game — tell the story instead, with no phantom instructions
        await type([
            { text: 'MANUAL BURN — HANDS ON', cls: 'loc' },
            'No computer. Lovell aims, keeping the Earth centered in the gunsight. Swigert calls the time: 14 seconds.',
            'Houston calls the marks; you hold the attitude steady through all 14 seconds.',
            { text: '✔ BURN COMPLETE. RIGHT DOWN THE PIPE.', cls: 'good' },
        ], { instant: true });
        await pressOn();
        return;
    }

    await type([
        { text: 'MANUAL BURN — HANDS ON', cls: 'loc' },
        'No computer. Lovell aims, keeping the Earth centered in the gunsight. Swigert calls the time: 14 seconds.',
        { text: 'DRAG THE PICTURE TO STEER — HOLD EARTH IN THE CROSSHAIR.', cls: 'warn' },
        { text: '(SIM PRACTICE — DOES NOT AFFECT YOUR SCORE · KEYBOARD: ← →)', cls: 'dim' },
    ]);

    const b = { pos: 0, vel: 0, progress: 0 };
    view.burn = b;
    view.mode = 'burn';

    // Direct manipulation: drag the picture, the Earth follows your finger —
    // no abstract thrust buttons to decode. Arrow keys cover desktop.
    menuEl.innerHTML = '';
    const hint = document.createElement('div');
    hint.style.cssText = 'color:#8a8a8a; text-align:center; padding:0.7rem 0.5rem; font-size:0.8rem; letter-spacing:0.06em;';
    hint.setAttribute('aria-hidden', 'true');   // instructions already typed to the story/live region
    hint.textContent = '☝ DRAG THE PICTURE — HOLD EARTH IN THE CROSSHAIR';
    menuEl.appendChild(hint);

    const wrap = $('#scene-wrap');
    const prevTouchAction = wrap.style.touchAction;
    wrap.style.touchAction = 'none';   // horizontal drags must not become page scrolls
    let activePointer = null, lastX = 0;
    // the canvas can be letterboxed inside the wrap — scale by its rendered width
    const toCanvasX = (dx) => dx * (CW / canvas.getBoundingClientRect().width);
    const onDown = (e) => {
        if (activePointer !== null) return;   // one finger steers; ignore the rest
        activePointer = e.pointerId;
        lastX = e.clientX;
        e.preventDefault();
    };
    const onMove = (e) => {
        if (e.pointerId !== activePointer) return;
        b.pos = clamp(b.pos + toCanvasX(e.clientX - lastX), -60, 60);
        lastX = e.clientX;
    };
    const onUp = (e) => { if (e.pointerId === activePointer) activePointer = null; };
    wrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    let keyDir = 0;
    const onKey = (e) => {
        if (e.key === 'ArrowLeft') keyDir = e.type === 'keydown' ? -1 : 0;
        if (e.key === 'ArrowRight') keyDir = e.type === 'keydown' ? 1 : 0;
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKey);

    const DURATION = 14000;   // the real MCC-5 burn: 14 seconds
    const t0 = performance.now();
    let centered = 0, samples = 0;
    while (true) {
        const t = performance.now() - t0;
        b.progress = clamp(t / DURATION, 0, 1);
        // drift shoves the view; the player drags it back
        b.vel += (Math.random() - 0.5) * 0.4;
        b.vel = clamp(b.vel, -2.5, 2.5);
        b.pos = clamp(b.pos + b.vel * 0.5 + keyDir * 2.2, -60, 60);
        if (Math.abs(b.pos) >= 60) b.vel *= -0.4;
        samples++;
        if (Math.abs(b.pos) < 12) centered++;
        if (b.progress >= 1) break;
        await sleep(40);
    }
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('keyup', onKey);
    wrap.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    wrap.style.touchAction = prevTouchAction;
    menuEl.innerHTML = '';
    view.mode = 'panel';
    view.sprite = 'burn';

    const steadiness = centered / Math.max(1, samples);
    Sound.select();
    const grade = steadiness >= 0.7
        ? '✔ DEAD ON. 14 SECONDS, RIGHT DOWN THE PIPE.'
        : steadiness >= 0.35
            ? '✔ A LITTLE RAGGED — HOUSTON CALLS THE MARKS, YOU CATCH UP. BURN GOOD.'
            : '✔ YOU FIGHT IT ALL THE WAY. HOUSTON TALKS YOU THROUGH. BURN GOOD.';
    await type([
        { text: grade, cls: 'good' },
        { text: 'ATTITUDE HELD ' + Math.round(steadiness * 100) + '% OF THE BURN', cls: 'dim' },
    ], { instant: true });
    await pressOn();
}

/* ========================================================================
 * Minigame 2 — build the CO2 mailbox
 * ====================================================================== */

async function mailboxMinigame() {
    // materials the slide lists as aboard: plastic bags, cardboard, duct tape,
    // hoses, flight manual covers — plus the CM's square canisters themselves
    const parts = [
        'CM SQUARE LIOH CANISTER',
        'PLASTIC BAG',
        'CARDBOARD FLIGHT MANUAL COVER',
        'GRAY TAPE — LOTS OF IT',
        'HOSE',
    ];
    await type([
        { text: 'BUILD THE MAILBOX', cls: 'loc' },
        'CAPCOM reads the steps up from Houston. Gather each item and tape the rig together — exactly like the ground-tested copy.',
        { text: '(TAP EVERY PART TO ASSEMBLE)', cls: 'dim' },
    ]);

    setPanel('mailbox');
    view.buildFrac = 0.12;

    await new Promise((resolve) => {
        menuEl.innerHTML = '';
        let added = 0;
        parts.forEach((label) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'opt';
            const num = document.createElement('span');
            num.className = 'num';
            num.textContent = '□';
            btn.appendChild(num);
            btn.appendChild(document.createTextNode(label));
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                btn.disabled = true;
                num.textContent = '☑';
                btn.style.color = '#33ff33';
                Sound.ensure();
                Sound.beep(500 + added * 90, 0.07);
                added++;
                view.buildFrac = 0.12 + 0.88 * (added / parts.length);
                if (added === parts.length) setTimeout(resolve, 350);
            });
            menuEl.appendChild(btn);
        });
    });

    menuEl.innerHTML = '';
    Sound.fanfare();
    await type([
        { text: '✔ THE MAILBOX HOLDS.', cls: 'good' },
        'Within an hour, CO2 readings start falling. The cabin air clears.',
    ], { instant: true });
    renderStatus();
    await pressOn();
}

/* ========================================================================
 * Story beats, blackout, ending
 * ====================================================================== */

async function runStory(ev) {
    if (ev.scene) setPanel(ev.scene);
    else view.mode = 'travel';
    if (ev.alarm) Sound.alarm();
    if (ev.fx) { ev.fx(); renderStatus(); }
    const src = ev.narr || ev.beat;
    const heading = ev.narr
        ? src.title.toUpperCase() + (src.get ? ' · ' + src.get : '')
        : src.title.toUpperCase() + ' · GET ' + src.get.replace(/^GET\s*/i, '');
    await type([
        { text: heading, cls: 'loc' },
        src.text,
    ]);
    if (ev.fanfare) Sound.fanfare();
    await pressOn();
}

async function runBlackout(ev) {
    setPanel(ev.scene);
    await type([
        { text: 'ENTERING BLACKOUT · GET 142:40', cls: 'loc' },
        { text: 'RADIO: STATIC. NOTHING TO DO BUT WAIT.', cls: 'warn' },
    ]);
    if (!REDUCED_MOTION) {
        view.mode = 'static';
        skipTravel = false;
        for (let i = 0; i < 90 && !skipTravel; i++) await sleep(50);  // ~4.5 s of snow
        view.mode = 'panel';
    }
    await type([
        { text: ev.beat.title.toUpperCase(), cls: 'loc' },
        ev.beat.text,
    ]);
    await pressOn();
}

/** Rank thresholds and names — identical to the classic app (app.js getScoreRank). */
function getRank(correct, total) {
    const pct = (correct / total) * 100;
    if (pct === 100) return { rank: 'MISSION COMMANDER', emoji: '🏆' };
    if (pct >= 80) return { rank: 'FLIGHT DIRECTOR', emoji: '⭐' };
    if (pct >= 60) return { rank: 'FLIGHT CONTROLLER', emoji: '🎯' };
    return { rank: 'GROUND CREW', emoji: '📡' };
}

/** Physical rank-card tiers handed out at the Apollo Table (cards from 4). */
function cardName(correct) {
    if (correct >= 10) return 'MISSION COMMANDER';
    if (correct >= 8) return 'FLIGHT DIRECTOR';
    if (correct >= 6) return 'FLIGHT CONTROLLER';
    if (correct >= 4) return 'GROUND CREW';
    return null;
}

async function runEnd() {
    state.done = true;
    clearRun();
    setPanel('splashdown');
    renderStatus();

    const best = parseInt(lsGet('trailBestScore') || '-1', 10);
    if (state.score > best) lsSet('trailBestScore', String(state.score));

    // Anonymous score census: one ping per new trail score per device —
    // same pattern as the classic completion page (disclosed on privacy.html)
    sendTrailScorePing(state.score);
    // ...plus the shared rank-card count, so a card earned out here shows up in
    // the same tally as one earned in the classic mission
    sendCardPing(state.score);

    const { rank, emoji } = getRank(state.score, TOTAL_DECISIONS);
    const card = cardName(state.score);
    const who = state.name ? state.name : 'ASTRONAUT';

    // renders the summary + recap; called again after SOURCES so the rank
    // screen is never lost
    async function renderSummary(instant) {
        const lines = [
            { text: 'MISSION COMPLETE · GET 142:54:41', cls: 'loc' },
            { text: 'THE CREW OF APOLLO 13 IS HOME.', cls: 'good' },
            who + ', you called ' + state.score + ' of ' + TOTAL_DECISIONS + ' decisions the way Mission Control did.',
            { text: emoji + ' RANK: ' + rank, cls: 'title-big' },
        ];
        if (card) {
            // The claim screen Ed reads at the table — same deal as the classic
            // mission's rank-card banner, boxed so it's unmistakable across a
            // crowded table on a phone held up at arm's length.
            lines.push({ text: '🎖️ YOU EARNED THE ' + card + ' RANK CARD', cls: 'claim' });
            lines.push({ text: 'SHOW THIS SCREEN AT THE APOLLO TABLE (NASA TENT) TO PICK IT UP.', cls: 'claim-sub' });
        } else {
            lines.push({ text: 'REPLAY THE MISSION TO SEE WHAT NASA CHOSE AND WHY — RANK CARDS START AT 4.', cls: 'dim' });
        }
        if (state.score > best && best >= 0) lines.push({ text: 'NEW PERSONAL BEST!', cls: 'good' });
        await type(lines, { instant });

        // recap list, classic-tracker style
        const ul = document.createElement('ul');
        ul.className = 'recap';
        for (const d of TRAIL_DATA.decisions) {
            const li = document.createElement('li');
            const ok = state.decisions[d.slide] === d.correctKey;
            li.className = ok ? 'ok' : 'miss';
            li.textContent = (ok ? '🏆 ' : '⚠ ') + d.title.toUpperCase();
            ul.appendChild(li);
        }
        story.appendChild(ul);
    }

    await renderSummary(false);

    while (true) {
        const pick = await menu([
            { label: 'FLY AGAIN', value: 'again' },
            { label: 'SOURCES FOR SKEPTICS', value: 'sources', sub: 'Think NASA got one wrong? Check the record and argue your case.' },
            { label: 'PLAY THE CLASSIC MISSION', value: 'classic', sub: 'The full 34-slide Apollo 13 experience' },
        ]);
        if (pick === 'again') { window.location.reload(); return; }
        if (pick === 'classic') { window.location.href = '../index.html'; return; }
        await showSources();
        await renderSummary(true);   // bring the rank screen back after BACK
        story.scrollIntoView({ block: 'start' });
    }
}

async function showSources() {
    const seen = new Set();
    const list = [];
    for (const d of TRAIL_DATA.decisions) {
        for (const s of d.sources) {
            if (!seen.has(s.url)) { seen.add(s.url); list.push(s); }
        }
    }
    await type([
        { text: 'SOURCES FOR SKEPTICS', cls: 'loc' },
        'Every decision in this game is the real one, checked against the mission record. Disputing the answer is a virtue — start here:',
    ], { instant: true });
    const ul = document.createElement('ul');
    ul.className = 'sources';
    for (const s of list) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = s.title;
        li.appendChild(a);
        ul.appendChild(li);
    }
    story.appendChild(ul);
    await pressOn('BACK');
}

/* ========================================================================
 * Production wiring: offline cache + anonymous view census
 * (same mechanisms as the classic app — disclosed on ../privacy.html;
 * keep that page in sync if these change)
 * ====================================================================== */

function initOfflineCache() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('../sw.js').catch(() => {
        // offline caching is a bonus, never a blocker
    });
}

/**
 * Census pings only make sense with working storage — without it there's no
 * "once per device" dedupe, and a privacy-mode browser would over-count on
 * every visit. Fail closed, exactly like the classic app does.
 */
function storageWorks() {
    lsSet('trailStorageProbe', '1');
    return lsGet('trailStorageProbe') === '1';
}

/**
 * One anonymous "someone opened the trail" ping per device — same queue and
 * localStorage key as the classic app's view census, so offline pings retry
 * on any later page load, classic or trail.
 */
function initViewCensus() {
    if (!storageWorks()) return;
    let census;
    try { census = JSON.parse(lsGet('viewPings')) || {}; } catch (e) { census = {}; }
    if (!Array.isArray(census.sent) || !Array.isArray(census.queued)) census = { sent: [], queued: [] };
    // 'trail' = someone opened the trail at all. 'trail-tap' additionally means
    // they got here through the five-tap secret door on the landing page
    // (index.html sends them to /trail/#tap) — that's how we learn whether the
    // secret is actually spreading at the table, or only by typed URL.
    const pages = ['trail'];
    if (window.location.hash === '#tap') pages.push('trail-tap');
    for (const page of pages) {
        if (!census.sent.includes(page) && !census.queued.includes(page)) {
            census.queued.push(page);
            lsSet('viewPings', JSON.stringify(census));
        }
    }
    (function flush() {
        const next = census.queued[0];
        if (!next) return;
        fetch('../ping/view/' + next, { cache: 'no-store' })
            .then(() => {
                census.queued.shift();
                census.sent.push(next);
                lsSet('viewPings', JSON.stringify(census));
                flush();
            })
            .catch(() => {}); // no signal? counting is never worth blocking a scout
    })();
}

/**
 * Anonymous score census with an offline retry: a finish with no bars queues
 * the score (trailScorePending) and the next trail visit sends it — keeping
 * privacy.html's "pings simply wait and try again" promise true here too.
 */
function sendTrailScorePing(score) {
    if (!storageWorks()) return;
    if (lsGet('trailScorePinged') === String(score)) return;
    lsSet('trailScorePending', String(score));
    fetch('../ping/trail-completion/' + score, { cache: 'no-store' })
        .then(() => {
            lsSet('trailScorePinged', String(score));
            lsSet('trailScorePending', '');
        })
        .catch(() => {}); // stays pending; retried on the next trail visit
}

function flushPendingScorePing() {
    const pending = lsGet('trailScorePending');
    if (pending) sendTrailScorePing(pending);
}

/**
 * Rank-card census — mirrors sendCardPing in ../assets/js/app.js and shares its
 * `cardPings` queue on purpose: both games hand out the SAME four physical
 * cards, so /ping/card/<tier> counts cards to stock at the Apollo Table, not
 * which game a scout played. One ping per tier per device; a queued card left
 * over from a no-signal finish goes out on the next visit to either game.
 * Anonymous (tier only, no name, no score, no choices) and disclosed on
 * ../privacy.html — keep that page in sync if this changes.
 */
const CARD_TIER_PINGS = [
    { min: 10, slug: 'mission-commander' },
    { min: 8,  slug: 'flight-director' },
    { min: 6,  slug: 'flight-controller' },
    { min: 4,  slug: 'ground-crew' },
];

function readCardCensus() {
    let census;
    try { census = JSON.parse(lsGet('cardPings')) || {}; } catch (e) { census = {}; }
    if (!Array.isArray(census.sent) || !Array.isArray(census.queued)) census = { sent: [], queued: [] };
    return census;
}

function sendCardPing(correct) {
    if (!storageWorks()) return;
    const tier = CARD_TIER_PINGS.find((t) => correct >= t.min);
    if (!tier) return;   // under 4 of 10 — no card, nothing to count
    const census = readCardCensus();
    if (!census.sent.includes(tier.slug) && !census.queued.includes(tier.slug)) {
        census.queued.push(tier.slug);
        lsSet('cardPings', JSON.stringify(census));
    }
    flushCardPings();
}

let cardFlushRunning = false;   // one drain at a time, or a tier queued from an
                                // offline finish could go out twice on one load
function flushCardPings() {
    if (cardFlushRunning) return;
    const census = readCardCensus();
    cardFlushRunning = true;
    (function flush() {
        const next = census.queued[0];
        if (!next) { cardFlushRunning = false; return; }
        fetch('../ping/card/' + next, { cache: 'no-store' })
            .then(() => {
                census.queued.shift();
                census.sent.push(next);
                lsSet('cardPings', JSON.stringify(census));
                flush();
            })
            .catch(() => { cardFlushRunning = false; }); // stays queued for a later visit
    })();
}

/* ========================================================================
 * Title screen + main loop
 * ====================================================================== */

async function titleScreen() {
    setPanel('title');
    const best = parseInt(lsGet('trailBestScore') || '-1', 10);
    const lines = [
        { text: 'APOLLO TRAIL', cls: 'title-big' },
        { text: 'THE APOLLO 13 RESCUE · APRIL 1970', cls: 'title-sub' },
        { text: 'IN THE STYLE OF THE OREGON TRAIL (MECC · APPLE II · 1985)', cls: 'dim center' },
        { text: 'EVERY DECISION IS THE REAL ONE.', cls: 'center' },
    ];
    if (best >= 0) lines.push({ text: 'BEST SCORE: ' + best + '/' + TOTAL_DECISIONS, cls: 'good center' });
    await type(lines, { instant: true });

    const saved = loadRun();
    const opts = [];
    if (saved && saved.idx > 0) opts.push({ label: 'RESUME MISSION', sub: 'Continue from ' + fmtGET(saved.get), value: 'resume' });
    opts.push({ label: 'BEGIN MISSION', value: 'begin' });
    opts.push({ label: 'HOW IT WORKS', value: 'how' });

    while (true) {
        const pick = await menu(opts);
        if (pick === 'resume') {
            Object.assign(state, saved);
            state.rates = saved.rates || state.rates;
            // recount score + decision counter from the restored decisions
            decisionCounter = 0;
            for (let i = 0; i < state.idx; i++) if (EVENTS[i].type === 'decision') decisionCounter++;
            return;
        }
        if (pick === 'begin') break;
        await type([
            { text: 'HOW IT WORKS', cls: 'loc' },
            'You fly Apollo 13, April 1970. At 10 points the mission hangs on a decision the crew and Mission Control really faced. Make your call — it locks in, just like the real thing.',
            'Match Mission Control on 4+ decisions and you earn a rank card at the Apollo Table: 4=GROUND CREW, 6=FLIGHT CONTROLLER, 8=FLIGHT DIRECTOR, 10=MISSION COMMANDER.',
            'Gauges, travel and minigames are flavor. The decisions are history — see SOURCES at the end, and argue with us if you dare.',
        ], { instant: true });
        await pressOn('BACK');
        await type(lines, { instant: true });
    }

    // call sign entry (optional, first-name-light like the classic share flow)
    await type([
        { text: 'FLIGHT SURGEON NEEDS A NAME FOR THE ROSTER.', cls: 'good' },
        { text: '(FIRST NAME OR NICKNAME — OR JUST LAUNCH)', cls: 'dim' },
    ], { instant: true });
    await new Promise((resolve) => {
        menuEl.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'name-row';
        const label = document.createElement('span');
        label.textContent = 'CALL SIGN:';
        const input = document.createElement('input');
        input.maxLength = 12;
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.setAttribute('aria-label', 'Call sign');
        row.append(label, input);
        const go = document.createElement('button');
        go.type = 'button';
        go.className = 'opt continue';
        go.textContent = '🚀 LAUNCH';
        go.addEventListener('click', () => {
            state.name = input.value.trim().toUpperCase().slice(0, 12);
            Sound.ensure();
            Sound.select();
            menuEl.innerHTML = '';
            resolve();
        });
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go.click(); });
        menuEl.append(row, go);
    });
}

async function main() {
    view.mode = 'boot';
    story.innerHTML = '<p class="loc">LOADING TAPE ▌</p>';
    initOfflineCache();
    initViewCensus();
    flushPendingScorePing();
    flushCardPings();   // retry a rank card earned with no bars in the tent
    await loadSprites();

    await titleScreen();
    $('#status').hidden = false;
    renderStatus();

    while (state.idx < EVENTS.length) {
        const ev = EVENTS[state.idx];
        if (ev.get !== undefined && ev.get > state.get) {
            // long hops get a longer roll, tiny hops barely pause
            const secs = clamp((ev.get - state.get) / 12, 1.2, 7);
            await travelTo(ev.get, { seconds: secs });
        }
        if (ev.type === 'story') await runStory(ev);
        else if (ev.type === 'decision') await runDecision(ev);
        else if (ev.type === 'blackout') await runBlackout(ev);
        else if (ev.type === 'end') { await runEnd(); return; }
        if (ev.minigame === 'burn') await burnMinigame();
        if (ev.minigame === 'mailbox') await mailboxMinigame();
        state.idx++;
        saveRun();
        renderStatus();
    }
}

/* ========================================================================
 * Chrome: sound toggle
 * ====================================================================== */

const soundBtn = $('#btn-sound');
function renderSoundBtn() {
    soundBtn.textContent = Sound.on ? 'SOUND ON' : 'SOUND OFF';
    soundBtn.setAttribute('aria-pressed', String(Sound.on));
}
soundBtn.addEventListener('click', () => {
    Sound.on = !Sound.on;
    lsSet('trailSound', Sound.on ? '1' : '0');
    Sound.ensure();
    if (Sound.on) Sound.select();
    renderSoundBtn();
});
renderSoundBtn();

main();
