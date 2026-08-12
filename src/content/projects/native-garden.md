---
name: Native Garden
tagline: A photo-first browser for planning a native-plant garden on a specific site.
summary: >
    A self-hosted native-plant garden planner. Browse a curated catalog photo-first,
    filter by the traits that matter for a cold-climate site, and file favorites into
    collections - built so my family can curate together.
tech: [Go, React, TypeScript, Vite, SQLite]
status: active
year: 2026
order: 52
featured: false
accent: '#8faa55'
# Private repo - no source link.
source:
    repo: native-garden
    commit: 41c03ad
    captured: 2026-08-12
---

Native Garden is a tool for planning what to plant when you're replacing lawn with dense
native plantings. The catalog is a curated set of ~50 species chosen for one specific
site - USDA zone 5a, sandy and dry soil in the northeastern US - so every plant on screen
is already a plausible fit. It's less a plant encyclopedia and more "a spreadsheet you'd
actually enjoy using," with the visual front-end doing the work a spreadsheet can't.

## How it works

- **Photo-first browse.** A firehose of every plant with a big hero image, plus a 2D
  shape glyph that draws each plant's height, spread, and growth habit against a human
  figure for scale - so you can eyeball an ankle-high mat vs. a shoulder-high grass at a
  glance.
- **Filter on what matters.** Bloom month and color, sun and moisture tolerance, deer
  and pollinator value, lifecycle, site fit, or "no aggressive spreaders."
- **Collections.** Pinterest-style boards a plant can belong to many of, each with a
  bloom-coverage chart across the season so gaps in a "blooms all summer" planting are
  obvious.
- **Compare.** Put a handful of candidates side by side with the trait meters aligned so
  differences read instantly.

## Notes

One Go binary serves the built React SPA and a small JSON API. The ~50-record catalog is
generated, disposable data read at startup; app state - collections, hidden flags, and
light-edit overlays - lives in SQLite keyed by a stable plant id, so regenerating the
catalog never wipes what you've curated. Filtering, compare, and the bloom timeline are
all client-side.
