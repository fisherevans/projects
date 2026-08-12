---
name: Log
tagline: A personal blog with self-hosted comments you sign into with Bluesky.
summary: >
    Fisher's blog, built on Astro and deployed on Cloudflare Pages with images on R2.
    The interesting part is a self-hosted comments and email-subscribe system running
    as a Cloudflare Worker, where commenters sign in with their Bluesky handle instead
    of yet another account.
tech: [Astro, Cloudflare Pages, Workers, D1, R2]
status: active
year: 2026
order: 42
featured: false
accent: '#c07a4a'
hero: ./media/log-index.png
thumbnail: ./media/log-index.png
repo: https://github.com/fisherevans/log
links:
    - label: live
      href: https://log.fisher.sh
source:
    repo: log
    commit: 2e5ae14
    captured: 2026-08-12
---

Log is my personal blog. The static-site half is unremarkable in a good way - Astro
content collections, built and served on Cloudflare Pages, images on R2 so egress is
free. The part worth talking about is that the interactive features are self-hosted
rather than bolted on from a third party, which meant building an identity story that
doesn't ask readers to make an account.

## How it works

- **Bluesky-identity comments.** Commenting is a Cloudflare Worker where you sign in
  with your Bluesky handle. That reuses an identity people already have and already
  trust, so there's a real name behind each comment without me running a password
  database or leaning on a comment SaaS.
- **Email subscribe in the same Worker.** Readers can subscribe for new-post
  notifications through the same backend, so the whole interactive layer is one small
  service I control end to end.
- **Full-text search, client side.** Pagefind builds an index at deploy time and
  loads lazily in the browser, so search works with no server and no query backend.
- **A shared design system.** Light and dark themes and a custom typeface are shared
  with my main site, so the two read as one identity rather than two templates.

## Notes

The pattern I keep coming back to here is doing the "dynamic" bits as edge Workers
against a static site, instead of reaching for a full app framework. Comments and
subscriptions are the only stateful parts, and they stay small and isolated.
