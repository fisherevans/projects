# Blog integration

How `log.fisher.sh` renders inline cards for these projects. The projects site is
the single source of truth; the blog reads it at build time.

## Contract

`projects.fisher.sh/projects.json` emits every published project as:

```json
{
  "projects": [
    {
      "slug": "otium",
      "name": "Otium",
      "tagline": "...",
      "summary": "...",
      "tech": ["Go", "React"],
      "status": "active",
      "year": 2026,
      "url": "https://projects.fisher.sh/otium/",
      "repo": "https://github.com/fisherevans/otium",
      "thumbnail": "https://projects.fisher.sh/_astro/....webp"
    }
  ]
}
```

The blog depends on these field names. If you change the endpoint shape in
`src/pages/projects.json.ts`, update the consumer below in the same change.

## Wiring it into the log repo

1. Copy `projects.ts` -> `log/src/lib/projects.ts`.
2. Copy `ProjectCard.astro` -> `log/src/components/ProjectCard.astro`.
3. Use it in any `.mdx` post:

   ```mdx
   import ProjectCard from '../../components/ProjectCard.astro';

   Here's the reader I built for this:

   <ProjectCard slug="otium" />
   ```

`ProjectCard` fetches the catalog once per build (memoized), renders a card that
inherits the blog's own theme tokens (so it's automatically light/dark correct),
and links to the project page. If `projects.fisher.sh` is unreachable at build
time it degrades to a plain link instead of failing the build.

Pass `blurb="..."` to override the card text for a specific post; otherwise it
uses the project's tagline from the catalog.

## Why build-time, not a runtime embed

The blog is static (Cloudflare Pages). Fetching at build keeps the card server-
rendered - no client JS, no layout shift, no runtime dependency on the projects
site being up when a reader loads the post. The trade-off is that a project copy
change only reaches already-built posts on the blog's next deploy; that's fine,
the blog rebuilds on every push.
