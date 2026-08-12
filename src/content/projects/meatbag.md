---
name: Meatbag
tagline: A shared to-do list where an AI agent hands you the steps only a human can do.
summary: >
    A human-in-the-loop task system between an AI agent and a person. The agent
    creates a shared, stateful list and hands off the steps it can't do itself -
    signing in somewhere, generating a key, clicking a console button - as items
    with owners and optional structured input forms. A local CLI plus web UI.
tech: [Go, React, TypeScript, Vite, YAML]
status: active
year: 2026
order: 35
featured: false
accent: '#6f9a8d'
repo: https://github.com/fisherevans/meatbag
source:
    repo: meatbag
    commit: 8fab7a3
    captured: 2026-08-12
---

Meatbag solves a specific annoyance in agent workflows: an agent walks you through
generating a client secret, the instructions get buried in chat history, and now
you're not sure how to hand the secret back safely. Instead, the agent drives a
shared to-do list. It creates items, nests them, and requests structured inputs;
you work through them in a local web UI and check them off. The instructions live
in the list, not in the scrollback.

## How it works

- **Agent-driven, human-completed.** The agent runs `meatbag` from its shell to
  build lists and request inputs. You fill inputs, approve permission-gated steps,
  and mark items done in the web UI.
- **Typed inputs.** Items can ask for text, file uploads, secrets, or approval of a
  gated action, each with its own schema so the form is exactly what the step needs.
- **Event-driven, no polling.** `meatbag wait` lets the agent register listeners
  before it prompts, so it wakes the instant you change something rather than
  polling for updates.
- **Local-first storage.** List state is plain YAML under `~/.meatbag/`, uploads
  are content-addressed blobs on disk, and secrets go to the macOS Keychain or
  `0600` files on headless Linux - the backend is chosen at build time.

## Notes

It ships as a Go binary with an embedded React UI and a background daemon; `make
install` does an atomic swap and restarts the daemon so upgrades are live. Any
agent can pick it up: `meatbag agent snippet` prints a short markdown blurb you
paste into your agent config so it knows the tool exists.
