---
name: Metamorph
tagline: Chain text and data transforms in the browser, bookmark the pipeline.
summary: >
    A client-side webapp for building repeatable text and data transformations.
    Stack decode, parse, pretty-print and regex steps into a pipeline that runs
    entirely in the browser - nothing is uploaded - and the whole config lives in
    the URL so you can bookmark it.
tech: [TypeScript, React, Protocol Buffers]
status: active
year: 2026
order: 50
featured: false
accent: '#5f8fb0'
hero: ./media/metamorph-transform.png
thumbnail: ./media/metamorph-transform.png
repo: https://github.com/fisherevans/metamorph
links:
    - label: live
      href: https://metamorph.fisher.sh
blogTag: tools
source:
    repo: metamorph
    commit: 805d511
    captured: 2026-08-12
draft: false
---

Metamorph is a small client-side tool for the debugging chore where you fetch a
payload, pretty-print it, decode one field, unescape another, and pretty-print
again - over and over. It lets you define that sequence once as a pipeline of
transformation steps, then rerun it on any input. Everything happens in the
browser; no data leaves the page.

## How it works

- **Composable steps.** You build an ordered list of processing actions - Base64
  decode, JSON/YAML pretty-print, regex, escape/unescape, URL parse, zstd
  decompress - and the input flows through them top to bottom.
- **All client-side.** Every transform runs locally in the browser. Nothing is
  sent to a server, so it's safe to paste sensitive payloads.
- **Config in the URL.** The pipeline is encoded into the URL itself, so a
  configured transform is just a bookmark you can save and reshare.
- **Compact config via Protobuf.** The step config is serialized with Protocol
  Buffers before being stuffed into the URL, keeping that blob small even for
  multi-step pipelines.

## Using it

You stack steps and watch the output change as you go - the input flows down the pipeline
live, so building a transform is just adding a step and seeing what falls out the bottom.
The real payoff is define-once, rerun-on-anything: the moment a pipeline does what you
want, its config is already in the URL, so a working transform is a bookmark. Save the
"decode our log format" chain once and next week you paste a fresh payload into it instead
of reconstructing six steps from memory. And because nothing leaves the browser, it's fine
to paste something sensitive - the URL carries the steps, never the data, so a saved
pipeline is safe to reshare while whatever you ran through it stays yours.

## Notes

Extending it is a matter of adding an `ActionCode` to the protobuf model,
regenerating, and dropping a processor component alongside the existing ones.
It's deployed as a static site on Cloudflare Pages.
