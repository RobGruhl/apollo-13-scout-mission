# Contributing to the Apollo 13 Interactive Experience

Thanks for your interest! This repo is both a live website ([apollo13.quest](https://apollo13.quest/))
and a teaching exhibit for the 2026 Elevate Scout Jamboree. Scouts working on the
Programming, Digital Technology, and Space Exploration merit badges are especially
welcome to read, run, and modify it — that's what it's for.

## Ground rules

The project is deliberately simple: pure HTML, CSS, and vanilla JavaScript, with
exactly one vendored library (the MIT-licensed QR generator). Please keep it that way:

- **No frameworks, no build steps, no CDNs, no runtime external requests.**
- **Every factual claim must be sourced.** The content is audited against primary
  sources (Apollo 13 Flight Journal, Mission Report MSC-02680, the Cortright
  report, NASA SP-350). If you change mission content, cite your source — and no
  movie lore ("Failure is not an option" was written for the 1995 film).
- **Quotes are real or labeled.** Only documented quotes get quotation marks and
  attribution; dramatized lines are marked as dramatizations.
- **Chronology is sacred.** Slides follow real Ground Elapsed Time order.

See `CLAUDE.md` for the full content rules and slide inventory.

## Getting started

```bash
git clone https://github.com/RobGruhl/apollo-13-scout-mission.git
cd apollo-13-scout-mission
python3 -m http.server 8000   # then visit http://localhost:8000
```

The HTTP server matters — the offline service worker won't register from `file://`.

## Before you open a pull request

1. Run the verification scripts:
   ```bash
   ./scripts/verify-navigation.sh
   ./scripts/verify-button-text.sh
   ```
2. If you added or renamed pages, update the precache list in `sw.js` and bump
   `CACHE_VERSION`.
3. Test on a phone if you can — scouts play this on phones at a loud jamboree table.
4. Keep pull requests focused: one fix or improvement at a time.

## Found a factual error?

Wonderful — disputing the content is a virtue here. Open an issue with the claim,
what you believe is correct, and a primary source. The "📚 Sources for Skeptics"
blocks on every decision slide show the kind of sourcing we aim for.
