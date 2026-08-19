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
hero: ./media/otium-hero.png
thumbnail: ./media/otium-hero.png
repo: https://github.com/fisherevans/otium
source:
    repo: otium
    commit: a02a44b
    changelog: changelog/2026-08-19-card-polish-avatars.md
    captured: 2026-08-19
screenshots:
    - src: ./media/otium-card-video.png
      caption: >
          A 9:16 video card from my own feed. The vertical player fills most of the
          card without being cropped, the creator carries their own avatar, and the
          action row still sits above the fold - the case that used to break the layout.
      captured: 2026-08-19
      commit: a02a44b
    - src: ./media/otium-card-wide.png
      caption: >
          The same card shape holds a landscape video: Section and Topic in one quiet
          monospace line, the creator and a relative date beneath the headline, the
          16:9 thumbnail fit to the box rather than cropped, and one identical action row.
      captured: 2026-08-19
      commit: a02a44b
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
- Each card has the same quiet shape whatever it holds: the Section and Topic in one
  monospace line over the headline, the source - carrying its own avatar - and a
  relative date beneath it, the media, and one identical row of actions. A news photo,
  a portrait video, and an audio episode all read the same way, so the layout never
  surprises you between items.
- There's deliberately no timer, unread count, or progress bar during a session. An
  earlier countdown got cut because watching it felt like racing a clock. The only
  persistent control is "End session."
- Every card carries a quiet one-line reason it surfaced, and a "Why this?" tap opens
  the full breakdown - which source, how fresh, how it's weighted. When your time is up
  the reel freezes on the current item and drops in an end-card instead of yanking you
  out, then shows a plain recap of where the time went. No score, no "come back soon."

## The card that solves its own layout

One item per screen is the whole idea, and it only works if the item actually fits. It
did not, for a while. A 9:16 video clamped its headline to one line and shoved its own
action row off the bottom of the card, past where anything could scroll it back. A 4:5
press photo got cropped to a letterbox band. A long headline was cut with an ellipsis.
The card was a fixed-height box being filled by CSS rules that could not see how much
room they had.

So the card stopped guessing and started measuring. Instead of dividing its height with
static styles, it lays the content out, measures what it got, and fits it to the box by
giving things up in a fixed order: the excerpt goes first, then the hero's share of the
card, then the type size steps down a ramp. What it will not give up is spelled out -
it never truncates the headline, never crops the media, and never puts an action out of
reach. Then it centres what is left by measuring the real slack and padding half of it,
rather than the CSS `center` that would push a full card's headline off the top with no
way back.

It has to measure because the right answer depends on the item. A vertical video wants
every pixel of the card; a three-line news item wants almost none of them. Predicting it
kept losing to reality - margins that looked even on paper were not, because each line of
text carries half its leading as empty space and that differs row to row. Every layout
pass now ends by measuring what it just did, against a lab that renders the real card
through the real engine so a preview can't drift from the thing it previews.

## Where it's going

The feed is organized into a Sections and Topics tree, and sessions are moving toward
being genuinely time-based, with calm, descriptive analytics - what you read, not how
long you stared. It runs as a Go API plus a React SPA on my Kubernetes cluster, behind
my own single-sign-on.
