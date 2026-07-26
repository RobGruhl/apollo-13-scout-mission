# Scripts

Utility scripts for testing and verification. Both work from any clone location
(they find the repo root themselves) and exit non-zero on failure.

## Navigation Verification

**verify-navigation.sh**
- Checks all 34 slides for correct previous/next links
- Verifies the sequential chain (01→30), the Merit Badges Hub (31), and the
  detail-page loop (32→33→34→31) against docs/SITEMAP_SPECIFICATION.md
- Confirms every link target actually exists on disk

```bash
./scripts/verify-navigation.sh
```

**verify-button-text.sh**
- Checks all navigation button labels follow the standard format
- Standard: `← Previous` / `Next →` on slides 02–29
- Special cases: Slide 01 (`← Home`), Slide 30 (`🏕️ Merit Badges →`),
  Slide 31 (`🏠 Home`), and the named-neighbor labels on slides 32–34

```bash
./scripts/verify-button-text.sh
```

## Census / Analytics

**ping-census.sh**
- Reads the anonymous census counts back out of Cloudflare: how many scouts
  opened the site, how many finished a mission (classic vs. Apollo Trail), and
  how many of each **rank card** was earned — the number that decides how many
  of each card to keep in the box at the Apollo Table
- Both games feed the same `/ping/card/<tier>` count, because a Trail winner
  walks up for the same physical card as a classic-mission winner
- Needs `CLOUDFLARE_READ_TOKEN` (Zone → Analytics → Read) in `.env`, which is
  gitignored — never commit it
- Cloudflare's free plan keeps per-path detail for ~24 h and refuses wider
  ranges, so this is a rolling window, not a running total. **Run it at the end
  of each jamboree day** and paste the numbers into
  `docs/telemetry-dashboard.html`

```bash
./scripts/ping-census.sh        # last 24 hours
./scripts/ping-census.sh 6      # last 6 hours
```

## Usage

Both verification scripts should pass (exit 0) before deploying changes:

```bash
./scripts/verify-navigation.sh && ./scripts/verify-button-text.sh && echo "All checks passed! ✅"
```
