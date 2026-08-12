# projects.fisher.sh - agent context

This repo builds **projects.fisher.sh**, a public show-and-tell catalog of things Fisher
builds. It is a static Astro site, a sibling of `fisher.sh` and `log.fisher.sh`, sharing
their typefaces (Marauder / Newsreader / DraftingMono), palette, and link style.

It is **public**. Anyone on the internet can read every word and see every image here.
That single fact drives the two rules below.

## Rule 1: never leak personal information

This is a public page about private software. Describe the **engineering and what a thing
does** - never the personal specifics behind it. Hard "do not include" list:

- Political or values positions, and the *reasons* behind personal decisions (e.g. why a
  relocation tool exists - describe the tool, not the motive).
- Income, salary, net worth, or any financial figures.
- Home address, town/city of residence, or precise location. "USDA zone 5a" or
  "cold-climate northeastern US" is fine; naming the town is not.
- Private family details beyond a generic "my kids" / "my family". No names of family
  members or anyone else.
- Secrets, tokens, internal IPs (`10.10.10.x`), internal hostnames, Proxmox CT/VM IDs,
  LAN-only URLs.
- The contents of any private library (media titles, notes, reading lists).

Fisher's own name is fine. When in doubt, leave it out. If a project is interesting only
because of sensitive context, describe the neutral technical shell and stop there. Some
projects are deliberately **omitted** for this reason (e.g. an opinionated political voter
guide) - do not add them back without Fisher's say-so.

## Rule 2: keep entries current, and be honest about staleness

Each project is one markdown file at `src/content/projects/<slug>.md`. The frontmatter is
the structured data; the markdown body is the "what it is / how it works" write-up. Schema
lives in `src/content.config.ts` (read it before editing frontmatter).

Every entry carries a **freshness contract** in its `source:` block:

```yaml
source:
    repo: otium          # the source repo this entry describes
    commit: 007283c      # the commit its description + screenshots reflect
    changelog: changelog/2026-08-12-daily-use-ux-pass.md   # optional, if that repo has one
    captured: 2026-08-12 # when this snapshot was taken
```

This renders visibly on the detail page. It exists so a reader (and a maintaining agent)
can see how far behind the page might be, and diff the source repo forward from `commit`.

**When you make a feature change in a source repo that materially changes what a project
does or looks like, update its entry here in the same effort:** revise the description,
refresh screenshots if the UI changed, and bump `source.commit` + `source.captured` (and
`source.changelog` to the entry describing the change). Treat "the projects page drifted
from the app" as the same failure mode as any doc drift. The pointer from the source repo
back to here lives in that repo's own `CLAUDE.md`.

## Voice and altitude

This site is public and openly agent-made (there's a standing banner saying so). Write like
Fisher would in a blog post, not like a product landing page:

- **Casual and dry.** Peer-to-peer, matter-of-fact, a little wry. Match the voice in his blog
  posts at `log.fisher.sh` and the reference entries (`quill.md`, `otium.md`). No enthusiasm
  markers, no exclamation points, no em dashes (use a spaced hyphen ` - `).
- **Not braggy, don't oversell.** These are personal projects, not products. Describe what a
  thing does and the one genuinely interesting engineering bit; skip superlatives ("powerful",
  "seamless", "cutting-edge", "revolutionary"), skip growth/impact framing, skip "the only X
  that Y." If a project is a small toy, say so - `status: experiment` and a light touch beat
  inflating it.
- **Honest about being AI-made.** The reader knows a machine wrote this. Don't posture as
  authoritative; a plainly-described project that admits its rough edges reads better than a
  polished oversell. Understate rather than overclaim.
- **Concrete over grand.** "renders each page as a PNG the device polls" beats "a powerful
  rendering engine." Name the real mechanism; drop the adjectives.

Calibration: a good entry could sit inside one of Fisher's blog posts without a tonal seam. If
it reads like marketing copy, it's wrong.

## If you spot a discrepancy, flag it to Fisher

You maintain these pages, but you don't get to quietly paper over problems. If while working
here you notice an entry that's **wrong, stale, or oversold** - a description that no longer
matches the app, a screenshot from an old version, a claim that overstates what the thing does
- fix what you can and **surface it to Fisher** rather than leaving it or silently rewriting
history. A short note in your turn-end summary is enough ("otium's entry described the old
feed model; updated it to the Sections/Topics tree"). He'd rather hear about drift than have it
buried. This is the same "surface friction, don't absorb it" duty as the nottingham-cloud repo.

## Adding or updating a project

1. Copy an existing file in `src/content/projects/` as a template (`quill.md` and
   `otium.md` are the reference tone - peer-to-peer, dry, no marketing voice, no em dashes).
2. Fill the frontmatter. `repo:` is set **only for public GitHub repos** (a private repo
   would 404 for visitors - omit the field). `links:` is for genuinely public demos only;
   never link an SSO'd or token-gated URL.
3. Write the body: a short intro, a `## How it works` list, an optional `## Notes`.
4. Add imagery when you have it (see below). Entries render fine with no images - a tinted
   placeholder tile stands in.
5. `order` sorts the grid (higher = earlier); `featured: true` floats to the top.

## Screenshots and imagery

`hero`, `thumbnail`, and `screenshots[].src` are all optional `image()` fields - put files
under `src/content/projects/media/` (or alongside) and reference them relatively. Each
screenshot takes its own `captured` date and `commit` so the gallery is self-dating.

To capture UI shots, use the devbox tooling against a local dev server of the target app:
`shot <url>` for plain pages, `uidrive` for anything behind an interaction or auth (see
`tools/shot` and `tools/uidrive` in the nottingham-cloud repo). Save the PNG into this repo
and stamp its `captured`/`commit` to match the app version you shot.

## Blog integration

`src/pages/projects.json.ts` emits `/projects.json` - the machine-readable index the blog
(`log.fisher.sh`) fetches at build time to render inline project cards. Keep its field
shape stable; the blog depends on the field names (`slug`, `name`, `tagline`, `summary`,
`tech`, `status`, `url`, `repo`, `thumbnail`).

## Build, run, deploy

- Local: `npm install` then `npm run dev` (needs Node 22 - see `.nvmrc`). `npm run build`
  outputs static files to `dist/`.
- Deploy: **Cloudflare Pages**, git-integrated to this repo, auto-build on push to `main`
  (`npm run build` -> `dist`), same pipeline as `fisher.sh` and `log.fisher.sh`. The domain
  `projects.fisher.sh` is a proxied CNAME to the Pages project. Operational runbook lives in
  the nottingham-cloud repo (`systems/log.md` bootstrap section covers the CF Pages pattern;
  `systems/cloudflare.md` the Pages project table).

## Style / stack notes

- Astro (content collections + `astro:assets`), no UI framework, hand-written CSS with the
  shared design tokens in `src/styles/global.css` (copied from the log repo - keep in sync
  if the shared theme changes).
- No em dashes anywhere (prose, comments, commits) - use a spaced hyphen ` - `.
- Match the existing components; don't introduce a CSS framework or a client-side SPA.
