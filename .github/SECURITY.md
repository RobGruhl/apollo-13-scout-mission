# Security Policy

## Scope

This is a static website (pure HTML/CSS/JS on GitHub Pages) with no server, no
database, no user accounts, and no secrets in the repository. Game progress is
stored only in the visitor's own browser (localStorage). The attack surface is
deliberately tiny — but if you find something, we want to know.

Things that would qualify: XSS via the score-sharing URL parameters, a flaw in
the vendored QR library (`assets/js/qrcode.js`), service-worker cache poisoning,
or anything that could affect the scouts who use the site.

## Reporting a vulnerability

Please email **rob.gruhl@gmail.com** with:

- What you found and where (file/line or URL)
- Steps to reproduce
- What you think the impact is

You'll get a reply within a few days. Please don't open a public issue for
anything sensitive until we've had a chance to fix it — the site's audience is
kids at a scout jamboree.

## Supported versions

Only the live site (the `main` branch) is supported.
