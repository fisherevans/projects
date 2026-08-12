---
name: Bloom
tagline: A reading library plus a Discord bot that interrogates an article with you.
summary: >
    A personal note-taking and reading app, plus @bloom - a Discord bot that breaks a live
    article down one node at a time under the reader's steering. A Go API, a React web client,
    and the bot.
tech: [Go, React, Discord, k3s, OIDC]
status: active
year: 2026
order: 70
featured: false
accent: '#4a86b8'
repo: https://github.com/fisherevans/bloom
source:
    repo: bloom
    commit: 5953ff1
    captured: 2026-08-12
draft: false
---

Bloom started as a tool that turns an article into a navigable knowledge tree - summary nodes
in the author's voice that expand into the actual passages, with concept terms indexed and
cross-linked. It's grown into two things sharing a repo: a web app where you subscribe to feeds
and "bloom" articles into a reading library, and `@bloom`, a Discord bot that reads an article
with you a piece at a time.

## How it works

- **Three services.** A Go API (Postgres via pgx, no ORM), a React and Vite web client, and a
  separate Discord bot module, all built as their own images.
- **Article to tree.** The core path fetches an article, extracts the text, and asks a language
  model to structure it as a tree of summary and passage nodes, rendered in a self-contained
  viewer.
- **@bloom, live and steered.** Mention the bot with a link and it opens a thread, posts a short
  read plus labeled buttons - go deeper, tangent, outside context - and branches from whichever
  button you tap. Old buttons never expire; clicking one branches from its node with everything
  since folded in.
- **Disposable agent compute.** The bot leans on my session platform for authenticated,
  concurrency-limited agent turns, and owns the durable record of each read itself so a lost
  session just rehydrates.
- **Runs on my cluster.** The web service is deployed on Kubernetes behind my own single
  sign-on.

## Notes

The bot is a deliberate re-think of the original: instead of precomputing one fixed analysis
tree, it's a small forum interrogating a chatbot about an article, together.
