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

## Using it

From the operator side the whole appeal is that standing something up costs almost nothing
in effort or in memory. You drop a directory with a small manifest, run one deploy command,
and the app comes up at its own hostname with HTTPS - no repo, no Dockerfile, no CI
pipeline, no route to wire by hand. Because idle apps stop and hold no memory, you never
have to decide whether a tool earns its keep: a dashboard you check twice a month sits
there costing nothing until the next request, so the host quietly accumulates dozens of
them without you managing capacity. Access is a one-file flip - each app's `access.yaml`
says LAN-only or public-behind-SSO and exactly who may sign in, and a reconciler makes the
edge match - so sharing a tool with one other person is an edit, not a project. Generated
reports and one-off pages get the same home through a searchable artifact browser, which
means the thing you made for someone to read is findable later instead of scattered across
ad-hoc servers you forgot you started.

## Notes

The design decision that carries everything is `Restart=no` plus a per-app idle-stop:
an automatic restart would defeat idle-stop and pin memory forever. That single
constraint is what lets the host fit dozens of apps in 1 GB.
