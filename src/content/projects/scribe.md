---
name: Scribe
tagline: A writing-first editor for a Pages-CMS-backed blog.
summary: >
    A WYSIWYG publishing client that sits on top of a Git-backed blog repo. It reads the
    site's own schema, gives each content type a real editor instead of a generic form,
    and round-trips markdown losslessly. Also my reference OIDC-secured homelab app.
tech: [Go, React, TipTap, OIDC]
status: active
year: 2026
order: 40
featured: false
accent: '#b8794a'
repo: https://github.com/fisherevans/scribe
source:
    repo: scribe
    commit: f88f821
    captured: 2026-08-12
---

Scribe is a publishing client I built for my own blog. Pages CMS lets you define a site
with arbitrary collections and fields, which is flexible but makes editing through a
generic CMS form a chore. Scribe reads that schema and hands each content type a
first-class editing experience - a real block editor for posts, a tag manager - while
preserving anything it doesn't have a dedicated editor for as raw, editable fields.

## How it works

- **Schema-driven.** It parses the site's `.pages.yml`, auto-detects collections and
  fields, and a setup wizard maps each collection to an editing experience written into
  a config file.
- **Lossless markdown.** The riskiest code is a custom TipTap parser/serializer that
  round-trips markdown byte-stably, including verbatim raw HTML blocks and captioned
  images. It's covered by round-trip fidelity tests.
- **Image upload built in.** Paste or drag an image and it enters a staging state -
  pick a name and destination - before it's shipped to object storage or copied into the
  site's local media dir.
- **Pluggable auth.** Runs open for local dev, or as a full OpenID Connect client
  (Authorization Code + PKCE + refresh, server-side sessions, optional group gate). In
  my homelab it's the reference app secured against a self-hosted Hydra and locked to an
  admin group.

## Notes

Go service over a Git repo checkout plus a private notes store, with a React + Vite +
TipTap front end. Markdown stays the source of truth; the editor is just a view over it.
