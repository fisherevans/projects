---
name: Otium
tagline: A reading app that respects your time instead of eating it.
summary: >
    An intentional media-consumption app. It builds time-boxed reading sessions from
    your own weighted feeds, tells you why each item surfaced, and deliberately skips
    the engagement metrics and infinite scroll that other readers lean on.
tech: [Go, React, k3s, OIDC, RSS]
status: active
year: 2026
order: 90
featured: true
accent: '#5f8f7a'
hero: ./media/otium-welcome.png
thumbnail: ./media/otium-welcome.png
repo: https://github.com/fisherevans/otium
source:
    repo: otium
    commit: 007283c
    changelog: changelog/2026-08-12-daily-use-ux-pass.md
    captured: 2026-08-12
---

Otium is a reader for people who want to read *less*, on purpose. Most feed apps are
built to maximize time-on-app; Otium is built to give you a bounded, explainable
reading session and then let you leave. You tell it how much time you have, it assembles
a session from your sources, and it shows its work on why each item made the cut.

## How it works

- **Weighted feeds, not an algorithm.** You subscribe to RSS and YouTube sources and
  give them weights. The mix you get reflects the weights you set, not an opaque model
  optimizing for retention.
- **Time-boxed sessions.** Instead of an endless list, a session is sized to the minutes
  you have. When it's done, it's done.
- **Explainable surfacing.** Every item can tell you why it's here - which source,
  which weighting, how fresh - so the queue never feels arbitrary.
- **Anti-analytics by design.** There's no "time spent" score to climb, no streaks, no
  dark patterns. The app "remembers" what you've seen so it doesn't re-serve it, and
  otherwise stays out of the way.

## Using it

- A session starts by answering "how much time do you have," picking a scope, and
  tapping Begin - three screens that each fit without scrolling and mostly advance on a
  single tap. Nothing loads until you've said how long you want to read.
- You move through one card at a time on a locked scroll-snap. Advancing past something
  you didn't open *is* the skip, so there's no separate skip button and no stack to blur
  through.
- There's deliberately no timer, unread count, or progress bar during a session. An
  earlier countdown got cut because watching it felt like racing a clock. The only
  persistent control is "End session."
- Every card carries a quiet one-line reason it surfaced, and a "Why this?" tap opens
  the full breakdown - which source, how fresh, how it's weighted. When your time is up
  the reel freezes on the current item and drops in an end-card instead of yanking you
  out, then shows a plain recap of where the time went. No score, no "come back soon."

## Where it's going

It's mid-way through a v2 redesign that reorganizes everything into a Sections and Topics
tree, moves to genuinely time-based sessions, and adds calm, descriptive analytics (what
you read, not how long you stared). It runs as a Go API plus a React SPA on my Kubernetes
cluster, behind my own single-sign-on.
