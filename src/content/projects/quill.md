---
name: Quill
tagline: A studio that turns a one-line idea into a finished picture book.
summary: >
    A personal AI picture-book studio. Describe the book you want and it writes the
    story, illustrates every page in a consistent style, lays out the text, and hands
    back a portrait book you can read on a phone.
tech: [Go, React, SQLite, Claude API, k3s]
status: active
year: 2026
order: 100
featured: true
accent: '#c98a2b'
hero: ./media/quill-workshop.png
thumbnail: ./media/quill-workshop.png
# Private repo - no source link.
source:
    repo: quill
    commit: 8f1ae85
    changelog: changelog/2026-08-12-subject-diversity-guard.md
    captured: 2026-08-12
---

Quill is a picture-book studio I built for my own kids. You give it a premise - a
character, a mood, a lesson, whatever - and it produces a complete, illustrated book:
a written story broken into pages, original art for each spread in a single coherent
style, and text placed onto the illustrations so the finished thing reads like a real
book rather than a slideshow.

## How it works

The generation runs as a pipeline, not a single prompt:

- **Story first.** A language model drafts the narrative and splits it into page-sized
  beats, with an art brief for each page describing what should be illustrated.
- **Art with continuity.** Each page is illustrated from its brief, with the style and
  recurring characters held consistent across the whole book rather than drifting page
  to page - the hard part of AI illustration.
- **Text placement.** A layout engine positions the words on each illustration,
  choosing regions that don't fight the art and keeping type legible against a busy
  background. This is the piece I've iterated on most.
- **A reader built for the couch.** Books render in 9:16 portrait so they read
  naturally held upright on a phone, which is how they actually get used at bedtime.

## Using it

- Making a book is one text box - describe what you want - plus a few taps to pick a
  style and a reading length. Length is set in minutes ("bedtime standard" is the
  default), not page count, because minutes is how you actually decide at bedtime.
- The words come first, and free. It drafts the whole story and shows you every page's
  text, the title, and an estimated read-aloud time before anything is drawn - with a
  plain "nothing has been drawn yet." Illustrating is a separate button that shows the
  dollar cost, so you never pay for art on a story you didn't want.
- Reading is full-screen 9:16 with tap zones (left half back, right half forward) and a
  soft crossfade between pages. It's built to be held upright in one hand in a dark
  room, not clicked through like a slideshow.
- Text sits directly on the art. When the auto-placement fights the picture you can drag
  the block, nudge individual lines, or recolor the ink per page - and hand edits are
  kept, never silently recomputed.

## Notes

It's a single-user app - a Go backend with an embedded SPA and SQLite, running on my
homelab's Kubernetes cluster, locked to just me. It isn't a product and isn't for
sale; it exists so I can make my kids a specific book on a specific evening.
