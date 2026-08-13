---
name: Quiver
tagline: A tiny-app host where an idle app costs zero memory.
summary: >
    A place to drop a small tool - a dashboard, a viewer, a static report, a little
    Python or Go backend with SQLite - and have it served at its own name with
    per-app access control. Apps are socket-activated and idle-stop, so keeping
    dozens of rarely-used tools around is nearly free.
tech: [Python, Go, systemd, Caddy, Cloudflare]
status: active
year: 2026
order: 72
featured: true
accent: '#c98a4a'
blogTag: tools
hero: ./media/quiver-index.png
thumbnail: ./media/quiver-index.png
# Lives inside a private homelab repo - no source link.
source:
    repo: nottingham-cloud
    commit: 4ce9c28
    path: containers/quiver
    captured: 2026-08-12
---

Quiver is the host I built for the pile of small web apps that don't justify a full
Kubernetes deployment - a one-page utility, a report viewer, a 200-line toy. You drop
a directory and it gets a working hostname, HTTPS, and its own access rules. The whole
point is that an app you hit twice a month should cost nothing the rest of the time.

## How it works

- **Socket activation, zero idle RAM.** A systemd `.socket` unit per app owns the
  listening socket; the app process doesn't exist until a request arrives. A shared
  middleware exits the process after an idle window, and the armed socket cold-starts
  a fresh one on the next hit. At rest the whole box is ~35 MB; each awake app adds
  ~19 MB.
- **An app is just a directory.** A manifest picks a Python ASGI callable or any
  binary (a loopback proxy fronts non-cooperating binaries so they get the same
  activation contract), static files are served directly, and one writable `data/`
  path holds SQLite.
- **Per-app access, reconciled to the edge.** Each app declares LAN-only or public-
  behind-SSO in its own `access.yaml`. A root reconciler makes the CDN match it live -
  DNS record, tunnel route, and an SSO application whose policy lists exactly who may
  sign in.
- **Static artifacts and reports.** It also hosts a durable static store with a
  searchable browser, so generated reports and one-off pages have a single findable
  home instead of scattering across ad-hoc servers.

## Notes

The design decision that carries everything is `Restart=no` plus a per-app idle-stop:
an automatic restart would defeat idle-stop and pin memory forever. That single
constraint is what lets the host fit dozens of apps in 1 GB.
