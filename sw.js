/**
 * Apollo 13 Interactive Experience — offline service worker.
 *
 * Jamboree cell coverage is spotty: scanning the QR at the table downloads
 * the whole game up front, so losing signal mid-mission costs nothing.
 * Pages + code are precached; images cache as you browse.
 */
const CACHE_VERSION = 'apollo13-v8';

const PRECACHE = [
    'index.html',
    'timeline.html',
    'privacy.html',
    'explore/programming.html',
    'explore/digital-technology.html',
    'explore/space.html',
    'assets/css/style.css',
    'assets/js/app.js',
    'assets/js/qrcode.js',
    'slides/01-launch.html',
    'slides/02-spacecraft.html',
    'slides/03-explosion.html',
    'slides/04-freeze-squeeze.html',
    'slides/05-power-conservation.html',
    'slides/06-turn-around.html',
    'slides/07-explosion-cause.html',
    'slides/08-meet-crew.html',
    'slides/09-stars-sun-navigation.html',
    'slides/10-lifeboat-moon.html',
    'slides/11-pc2-burn.html',
    'slides/12-water-conservation.html',
    'slides/13-co2-mailbox.html',
    'slides/14-long-journey.html',
    'slides/15-passive-thermal.html',
    'slides/16-communication-discipline.html',
    'slides/17-battery-jumpstart.html',
    'slides/18-sm-jettison-timing.html',
    'slides/19-computer-restart.html',
    'slides/20-reentry-prep.html',
    'slides/21-lm-jettison.html',
    'slides/22-reentry-physics.html',
    'slides/23-the-blackout.html',
    'slides/24-parachutes.html',
    'slides/25-splashdown.html',
    'slides/26-recovery.html',
    'slides/27-heroes.html',
    'slides/28-john-aaron.html',
    'slides/29-ed-gruhl.html',
    'slides/30-completion.html',
    'slides/31-merit-badges.html',
    'slides/32-merit-badge-programming.html',
    'slides/33-merit-badge-digital-technology.html',
    'slides/34-merit-badge-space-exploration.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;
    // Census pings (/ping/view/*, /ping/completion/*) must always reach the
    // network — they're how the site counts reads despite this very cache
    if (url.pathname.includes('/ping/')) return;

    // Cache-first: precached pages/code hit instantly; images cache on first view
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
                }
                return response;
            });
        })
    );
});
