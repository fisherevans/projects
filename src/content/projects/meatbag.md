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
blogTag: tools
hero: ./media/meatbag-list.png
thumbnail: ./media/meatbag-list.png
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

## Using it

The difference from an agent just typing steps at you is that the work has a home.
Instead of scrolling back through chat to find which step you were on and what the
agent needed, you open the list in a browser and it's all laid out: the items in
order, what's done, what's blocked on you. Each thing you have to do is a typed
input - a text field, a file upload, a secret box that stores to the keychain
instead of getting pasted into chat, or a plain approve/deny for a gated action -
so the form is exactly the shape of the step. Because it's event-driven, checking
an item off or submitting an input wakes the agent immediately; it isn't sitting
there polling, and you don't have to go back to the chat and say "done, keep
going." The instructions live in the list, so if you walk away and come back an
hour later you pick up exactly where you left off.

## Notes

It ships as a Go binary with an embedded React UI and a background daemon; `make
install` does an atomic swap and restarts the daemon so upgrades are live. Any
agent can pick it up: `meatbag agent snippet` prints a short markdown blurb you
paste into your agent config so it knows the tool exists.
