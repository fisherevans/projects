---
name: Ramble
tagline: Dictate rambling voice notes; an agent composes them into a post in your own words.
summary: >
    A voice-first blog drafting tool. You ramble into your phone, an AI agent turns the
    tape into a finished draft made of your own words with full provenance, and you
    review it PR-style until it's a post.
tech: [Go, React, TypeScript, Claude API]
status: active
year: 2026
order: 58
featured: false
accent: '#b06a8a'
hero: ./media/ramble-streams.png
thumbnail: ./media/ramble-streams.png
# Private repo - no source link.
source:
    repo: ramble
    commit: 686ac89
    captured: 2026-08-18
screenshots:
    - src: ./media/ramble-sources.png
      caption: >
          Sources - the composer's second pass over the tape. It pulls out the lines worth
          keeping, verbatim, and groups them into sections with a one-line gloss on what
          each is about. Nothing here is written by the model; it only decides what your
          words are about and what order they go in.
      captured: 2026-08-18
      commit: 686ac89
    - src: ./media/ramble-draft.png
      caption: >
          The draft, with the pipeline across the top (tape, sources, structure, draft) and
          each artifact carrying its own version. The composer leaves a note on what it
          changed, and a panel of questions it wants answered before the next pass - each
          one taps through to the mic with the question attached.
      captured: 2026-08-18
      commit: 686ac89
    - src: ./media/ramble-passage.png
      caption: >
          Tapping any passage opens the inspector: the sentence in context, a word diff
          against what you actually said, and the composer's reason for every change. "From
          the tape" expands to the raw transcript with the matching span highlighted. The
          comment box below is how you push back - dictate at it and the composer picks the
          note up on the next run.
      captured: 2026-08-18
      commit: 686ac89
---

Ramble is a writing tool for people who think out loud. Instead of staring at a blank
page, you dictate rambles from your phone and an AI agent acting as the "composer" reads
the whole tape and works it into a draft. The catch it takes seriously: the draft has to
be *your* words, with a traceable line back to what you actually said, so it reads like
you wrote it rather than like a model paraphrased you.

## How it works

The document moves through four artifacts, each versioned independently and each with its
own tab:

- **Tape.** The raw dictation, exactly as transcribed, never edited. Everything downstream
  has to point back into it.
- **Sources.** Your words, organized: the composer pulls the lines worth keeping out of the
  tape verbatim and groups them into sections. It chooses what matters and what it's about;
  it doesn't write anything.
- **Structure.** The meta layer - document type, thesis, scope, tone, audience. What the
  piece is trying to be, as opposed to what it says. The composer proposes it, you override
  any field, and saving cuts a new version so the understanding of the piece has a history
  too.
- **Draft.** The finished prose. Every passage is tagged verbatim, edited, or composer glue,
  and an edited one carries the exact word diff plus a written reason for the change.

A validation gate runs on every write: a draft whose passages don't resolve to real spans
in the tape is rejected rather than saved. That's the whole trick - provenance isn't a
convention the model is asked to follow, it's checked mechanically, so a hallucinated quote
can't land.

The composer also asks questions back. Where the draft is thin or where two things you said
contradict each other, it files a question against the passage, and answering is a tap to
the mic with the question attached rather than a form to fill in.

## Using it

The whole loop is built for a phone in one hand: hit the mic, talk, save. No blank page, no
keyboard, no formatting decisions while you're still thinking. Dictation is written to a
local durable queue before it goes anywhere, because the one unrecoverable failure in a tool
like this is losing something you said.

Reading the draft works like reviewing a pull request. Passages are tinted by provenance, so
the parts that are yours and the parts the model bridged are visible at a glance. Tap one and
you get the sentence in context, the word diff, the composer's reason, and the raw tape with
the matching span highlighted. From there you either comment - dictate freely, it grows so you
can read it back before sending - or you edit inline, which promotes your typed text to
first-class source material and locks it against the composer.

That's the part worth defending in a design review: you never have to take it on faith that
the thing sounds like you. You can see which words are yours, why every change was made, and
bounce the draft if the provenance doesn't check out. The tool's job is to organize what you
said, not to write for you.

## Notes

One Go binary serves the API and the embedded React PWA; all state is plain JSON files on
disk, no database server. The composer runs as a Claude session on a separate box and writes
against the same file contract, so the web server itself makes no model calls - it just owns
the files and the validation gate. There's a second backend that runs the agent loop
in-process against the API, for deploys that don't have a session platform to hand off to.
