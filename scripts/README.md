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

## Usage

Both scripts should pass (exit 0) before deploying changes:

```bash
./scripts/verify-navigation.sh && ./scripts/verify-button-text.sh && echo "All checks passed! ✅"
```
