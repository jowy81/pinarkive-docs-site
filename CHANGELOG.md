# Changelog

## 2026-11-16

- Add Concepts overview at `/concepts` (index page) linking to gateways, clusters, environments, and timelocks.
- Sitemap: include `/concepts` and `/concepts/timelocks`; generator skips routes with no matching MDX.
- Sitemap generator resolves `index.mdx` under route folders.

## 2026-11-10

- Light mode: fenced code blocks keep the dark teal panel and use dark-theme Shiki token colors so syntax, copy controls, and line highlights stay readable (matches playground).
- Brand alignment (Arkive Teal / A1): local logo, favicon, and OG assets; Nextra theme tokens, navbar links, footer, and prose/code styles matching pinarkive.com and app.pinarkive.com.
- Sandbox example pages: 48-hour `timelock` (ISO 8601) and DEV API curl sample in API Playground docs.
- Environments page clarifies demo expiry after 48 hours.

## 2026-11-09

- Gateways and clusters docs: DEV gateway hosts, no ipfs.io fallback in sandbox.
- Plans and rate-limits pages: real pricing and limits (taxes not included; binary GB).
- New Environments page (production API vs DEV sandbox for demos).
- GA4: `content_group=docs`, `docs_copy_code` on Nextra copy buttons (consent-gated).
- Nextra: edit/feedback links → `jowy81/pinarkive-docs-site`; og:image → landing A1 asset URL.
- Example naming: Upload demo (sample1), API Playground, Secure Share (sample2); signup links → app.pinarkive.com.
