---
name: Ramble
tagline: Dictate rambling voice notes; an agent composes them into a post in your own words.
summary: >
    A voice-first blog drafting tool. You ramble into your phone, an AI agent turns the
    tape into a finished draft made of your own words with full provenance, and you
    review it PR-style until it's a post.
tech: [Go, React, TypeScript, SQLite, Claude API]
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
    captured: 2026-08-14
---

Ramble is a writing tool for people who think out loud. Instead of staring at a blank
page, you dictate rambles from your phone - pauses in your speech become chunk breaks -
and an AI agent acting as the "composer" reads the whole tape and writes the next draft.
The catch it takes seriously: the draft has to be *your* words, with a traceable line
back to what you actually said, so it reads like you wrote it rather than like a model
paraphrased you.

## How it works

- **Dictate from your phone.** The frontend is a mobile PWA - hit the mic, ramble, save.
  Speech pauses are recorded as breaks so the composer can see the shape of your thought.
- **An agent composes.** Submitting a review (or tapping "compose") spawns a headless
  agent session that reads the tape and writes a new draft version. Draft versions and
  reviews are append-only, so nothing you said is ever destroyed.
- **Provenance for every passage.** Tints show whether text is verbatim, lightly edited,
  or composer glue. Tap a passage for the word diff and the source tape in context. A
  validation gate rejects any draft whose passages don't trace back to the tape.
- **Review it like a pull request.** Comment on passages, submit a general note, and the
  composer processes it immediately. You can also edit directly, which promotes your
  typed text to first-class, locked source material.

## Using it

The whole loop is built for a phone in one hand. You hit the mic and talk - no blank page, no
keyboard - and the pauses in your speech become the chunk breaks, so the shape of how you
thought lands in the tape without you formatting anything. When you want a draft, the composer
runs and you read the result like a pull request: passages are tinted by provenance (verbatim,
lightly edited, or composer glue), and tapping one shows the word diff and the source tape in
context. You comment on a passage or leave a general note and the composer reworks it, or you
edit inline, which promotes your typed text to locked first-class source. Reviewing it like
code is the deliberate part - you never have to take on faith that it sounds like you, you can
see exactly which words are yours and which the model bridged, and bounce the draft if the
provenance doesn't check out.

## Notes

A Go binary serves the API and the embedded React UI; all state is JSON files on disk,
no database server. The composer runs on a separate agent-session platform, so the web
server itself makes no model calls - it just owns the file contract the composer writes
against.
