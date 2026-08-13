---
name: Jellybean
tagline: A kid-safe front end for a family Jellyfin library.
summary: >
    A curation layer on top of Jellyfin: a simple streaming client my kids use and a
    parent admin app where I decide what they're allowed to see. Curation state lives
    in its own database and Jellyfin stays untouched.
tech: [Go, React, SQLite, Jellyfin, Docker]
status: active
year: 2026
order: 55
featured: false
accent: '#7c6fd0'
repo: https://github.com/fisherevans/jellybean
source:
    repo: jellybean
    commit: cff9bb8
    captured: 2026-08-12
---

Jellybean sits in front of a family Jellyfin server and splits it into two experiences:
a stripped-down streaming client for the kids that only shows what's been approved, and
an admin web app where a parent curates that list. The catalog, artwork, and actual
video streaming all still come from Jellyfin - Jellybean just decides what's visible and
gets out of the way.

## How it works

- **One Go service, two embedded apps.** A single Go binary serves the parent curation
  UI at `/` and the kids client at `/kids`, both React SPAs compiled in. It runs as a
  sibling container to Jellyfin, not a proxy in front of it.
- **Read-only against Jellyfin.** Jellybean never writes tags, collections, or metadata
  back. Curation is the app's own state.
- **SQLite is the source of truth.** Visibility decisions live in a local SQLite
  database, deliberately kept separate from Jellyfin's own metadata.
- **Split auth.** Parents authenticate through Jellyfin and need an admin role; each kid
  profile gets a per-device API key stored on the TV and mapped server-side to a
  Jellyfin user.

## Using it

Two audiences, two deliberately different front ends. The kids client is stripped to almost
nothing: it shows only what's been approved, and each kid's TV holds a per-device key so a
child never meets a login screen - power on, pick something, watch. No passwords, no browsing
past the fence, nothing to get lost in. The parent side is the opposite - a full admin app for
working through the real Jellyfin catalog and deciding what's visible, where the friction of
authenticating and curating actually belongs. The split is the whole point: the person doing
the gatekeeping gets the controls, and the kid gets a remote that can't do the wrong thing.

## Notes

It's a personal home-server project - Go backend, distroless multi-arch image, built to
sit alongside an existing Jellyfin plus *arr setup. Not a product, just a saner way to
hand my kids a remote.
