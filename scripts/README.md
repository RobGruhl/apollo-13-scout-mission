# Scripts

Utility scripts for testing and verification.

## Navigation Verification

**verify-navigation.sh**
- Checks all 24 slides for correct previous/next links
- Verifies links match SITEMAP_SPECIFICATION.md
- Run before deployment to ensure navigation integrity

```bash
./scripts/verify-navigation.sh
```

**verify-button-text.sh**
- Checks all navigation button text follows standard format
- Verifies `← Previous` / `Next →` format
- Checks special cases (Slide 01: `← Home`, Slide 24: `🏠 Home`)

```bash
./scripts/verify-button-text.sh
```

## Usage

Both scripts should pass (exit 0) before deploying changes:

```bash
./scripts/verify-navigation.sh && ./scripts/verify-button-text.sh
echo "All checks passed! ✅"
```
