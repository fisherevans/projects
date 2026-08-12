# projects.fisher.sh

A public show-and-tell of things Fisher Evans builds - apps, tools, and experiments.
Sibling site to [fisher.sh](https://fisher.sh) and [log.fisher.sh](https://log.fisher.sh),
sharing their typefaces, palette, and link style.

Static [Astro](https://astro.build) site, deployed on Cloudflare Pages.

## Layout

| Path | What |
|---|---|
| `src/content/projects/*.md` | One file per project - frontmatter is the data, body is the write-up. |
| `src/content.config.ts` | The project schema (frontmatter fields + meaning). |
| `src/pages/index.astro` | The project grid. |
| `src/pages/[slug].astro` | A project detail page. |
| `src/pages/projects.json.ts` | Machine-readable index the blog consumes for inline cards. |
| `src/styles/global.css` | The shared design tokens (kept in sync with the log repo). |
| `CLAUDE.md` | The maintenance contract - **read this before editing content.** |

## Develop

```sh
nvm use          # Node 22 (see .nvmrc)
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Two rules

1. **This page is public - never leak personal information.** Describe the engineering,
   not the personal specifics. Full list in [`CLAUDE.md`](CLAUDE.md).
2. **Keep entries current and honest about staleness.** Each entry pins the source commit
   its description + screenshots reflect; bump it when the project changes.

## Deploy

Cloudflare Pages, git-integrated, auto-build on push to `main` (`npm run build` -> `dist`).
The `projects.fisher.sh` domain is a proxied CNAME to the Pages project. Same pipeline as
the blog; runbook in the nottingham-cloud repo.
