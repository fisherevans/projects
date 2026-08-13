---
name: RSVP
tagline: Code-gated event pages with a shared host portal.
summary: >
    A self-hosted RSVP and event-management app. Anyone with the invite link and
    per-event code can respond; hosts run everything from a shared password-gated
    management portal. Single Go binary, embedded React SPA, SQLite - no external DB.
tech: [Go, React, SQLite, chi, k3s]
status: active
year: 2026
order: 45
featured: false
accent: '#c25b5b'
hero: ./media/rsvp-event.png
thumbnail: ./media/rsvp-event.png
repo: https://github.com/fisherevans/rsvp
source:
    repo: rsvp
    commit: abd0094
    captured: 2026-08-12
---

RSVP is an event-management app I built to run the gatherings we throw. Each
event gets its own code-gated page: share the link and the code, and anyone
can add themselves and respond. Hosts work from a separate `/manage` side behind a
shared password - creating events, tracking attendees, and reading the audit log.
Because it's designed to be handed out, it's the least sensitive thing I self-host.

## How it works

- **Single binary, no moving parts.** A Go server serves the API and an embedded
  React SPA, backed by SQLite and an uploads directory on one volume. No external
  database, no object storage.
- **Two access tiers.** The public side is gated per-event by a code in a header or
  query param; the management side is gated by a session cookie behind a shared
  password. Mutating routes lock once an event ends.
- **Calendar and sharing built in.** Events produce `.ics` files and Google
  Calendar deep links, QR codes for sharing, and Open Graph link previews rendered
  server-side so a pasted link unfurls properly.
- **Full audit log.** Every public mutation writes a before/after JSON snapshot with
  source IP, readable from the management portal.

## Using it

There are two very different jobs here. A guest gets a link and a code, taps in,
types their name, and picks yes or no - no account, no password, no app install.
That's the whole point: nobody signs up for a login to answer a party invite, and
the moment you make them, a chunk of people just don't respond. The event page is
loud on purpose - hard offset shadows, 2px borders, heavy uppercase type - and each
event can override the accent color and fonts, so a kid's birthday and a dinner
don't render as the same beige form. The host lives on the other side at `/manage`
behind one shared password: create events, watch responses land, read the audit
log. Frictionless for the people you invite, controlled for the one or two running
it.

## Notes

It runs on my homelab Kubernetes cluster as a single replica with a `Recreate`
strategy, since SQLite is single-writer. The frontend is deliberately
neobrutalist - hard offset shadows, 2px borders, heavy uppercase type - with
per-event theming that lets each event override the accent color and fonts.
