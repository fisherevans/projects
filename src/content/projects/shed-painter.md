---
name: Shed Painter
tagline: Plan a no-two-boards-alike paint job for a shed, then preview it in 3D.
summary: >
    A toy for planning how to paint a shed's vertical boards: generate a balanced-random
    color order where no two touching boards match (corners included), orbit it on a 3D
    shed to sanity-check, and export a numbered paint-by-boards sheet.
tech: [JavaScript, Three.js, Canvas]
status: experiment
year: 2026
order: 30
featured: false
accent: '#6ba3a0'
hero: ./media/shed-painter-planner.png
thumbnail: ./media/shed-painter-planner.png
# Lives inside a private homelab repo, LAN-only - no source or live link.
source:
    repo: nottingham-cloud
    commit: 71ae272
    captured: 2026-08-12
---

Shed Painter solves a genuinely silly problem. We wanted to paint our shed's vertical
boards in a mix of colors, and eyeballing it risked two neighboring boards ending up the
same - especially around the corners, where it's hard to picture. So the tool does the
picking, and lets you check the result before any paint hits wood.

## How it works

- **Balanced-random layout.** Given a palette and board counts, it produces an order where
  each color appears about equally, no two adjacent boards match (corner wraps included),
  and nothing clumps. It's seeded, so a given style and seed reproduce the exact plan.
- **A gallery of styles.** Beyond plain scatter there are a couple dozen patterns - confetti,
  rainbows, gradient and dithered transitions that fade one wall into the next - each a small
  function of counts, colors, and seed.
- **3D preview.** The plan colors a four-sided shed you can orbit, so you can eyeball the
  corners before committing. One button rerolls the layout in place.
- **A sheet to paint from.** It exports a numbered PNG of all four walls with color names and
  a top-down map, plus per-wall images, sized to keep on a phone while painting.

## Notes

The load-bearing trick is a single geometry source of truth that both the 3D scene and the
flat plan derive from, laid out as one continuous loop around the shed - so the no-touching
guarantee holds around corners and the preview can't disagree with the plan. It's a static
page, all client-side, no backend.
