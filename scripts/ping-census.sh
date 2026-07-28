#!/usr/bin/env bash
#
# ping-census.sh — read the anonymous census counts back out of Cloudflare.
#
# The site is static, so the "pings" it sends (/ping/view/*, /ping/completion/*,
# /ping/trail-completion/*, /ping/card/*) are deliberate 404s: nothing serves
# them, Cloudflare just counts the path at the edge. This script asks Cloudflare
# how many of each it saw, and prints the three numbers the Apollo Table cares
# about — how many scouts, how many finished, how many of each rank card.
#
# Needs a Cloudflare API token with Zone → Analytics → Read in .env
# (CLOUDFLARE_READ_TOKEN). .env is gitignored — never commit it.
#
# Note: on Cloudflare's free plan, per-path detail is kept for 8 days, but a
# single query may span at most 24 h — so this script reads one rolling window,
# not a running total. (A running total means walking the 8-day history one
# 24 h window at a time; that's how docs/telemetry-dashboard.html is refreshed.)
#
# Usage: ./scripts/ping-census.sh [hours]     (default 24, max 24)

set -euo pipefail
cd "$(dirname "$0")/.."

HOURS="${1:-24}"
[ -f .env ] || { echo "No .env — need CLOUDFLARE_READ_TOKEN" >&2; exit 1; }
set -a; . ./.env; set +a
: "${CLOUDFLARE_READ_TOKEN:?CLOUDFLARE_READ_TOKEN not set in .env}"

ZONE=$(curl -sf -H "Authorization: Bearer $CLOUDFLARE_READ_TOKEN" \
    "https://api.cloudflare.com/client/v4/zones?name=apollo13.quest" |
    python3 -c "import json,sys; print(json.load(sys.stdin)['result'][0]['id'])")

python3 - "$ZONE" "$HOURS" <<'PY'
import datetime, json, os, subprocess, sys, urllib.request

zone, hours = sys.argv[1], min(int(sys.argv[2]), 24)
end = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None, microsecond=0)
start = end - datetime.timedelta(hours=hours)

query = """{ viewer { zones(filter: {zoneTag: "%s"}) {
  httpRequestsAdaptiveGroups(limit: 500,
    filter: {datetime_geq: "%sZ", datetime_leq: "%sZ"},
    orderBy: [count_DESC]) { count dimensions { clientRequestPath } } } } }""" % (
    zone, start.isoformat(), end.isoformat())

req = urllib.request.Request(
    "https://api.cloudflare.com/client/v4/graphql",
    data=json.dumps({"query": query}).encode(),
    headers={"Authorization": "Bearer " + os.environ["CLOUDFLARE_READ_TOKEN"],
             "Content-Type": "application/json"})
body = json.load(urllib.request.urlopen(req))
if body.get("errors"):
    sys.exit("Cloudflare said: " + json.dumps(body["errors"], indent=2))

rows = body["data"]["viewer"]["zones"][0]["httpRequestsAdaptiveGroups"]
counts = {r["dimensions"]["clientRequestPath"]: r["count"] for r in rows}
total = lambda prefix: sum(v for k, v in counts.items() if k.startswith(prefix))

print(f"\nApollo 13 census · last {hours} h (UTC {start:%m-%d %H:%M} → {end:%m-%d %H:%M})\n")

print(f"  Scouts who opened the site      {counts.get('/ping/view/index', 0):>5}   /ping/view/index")
print(f"  ...who found the Apollo Trail   {counts.get('/ping/view/trail', 0):>5}   /ping/view/trail")
print(f"     of those, via the 5-tap door {counts.get('/ping/view/trail-tap', 0):>5}   /ping/view/trail-tap")

classic, trail = total("/ping/completion/"), total("/ping/trail-completion/")
print(f"\n  Missions finished               {classic + trail:>5}   ({classic} classic + {trail} trail)")
for score in range(10, -1, -1):
    c = counts.get(f"/ping/completion/{score}", 0) + counts.get(f"/ping/trail-completion/{score}", 0)
    if c:
        print(f"     scored {score:>2}/10                  {c:>5}")

print("\n  Rank cards earned (both games — same physical card):")
for slug, name in [("mission-commander", "Mission Commander"),
                   ("flight-director", "Flight Director"),
                   ("flight-controller", "Flight Controller"),
                   ("ground-crew", "Ground Crew")]:
    print(f"     {name:<24}{counts.get('/ping/card/' + slug, 0):>5}   /ping/card/{slug}")
print(f"     {'TOTAL CARDS':<24}{total('/ping/card/'):>5}\n")
PY
