import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One markdown file per project under src/content/projects/<slug>.md.
// Frontmatter is the structured card + detail data; the markdown body is the
// long "what it is / how it works" write-up rendered on the detail page.
//
// CONTENT RULE (enforced in CLAUDE.md): describe the engineering, never leak
// personal specifics - no political/values positions, income, home address,
// or private family details. Fisher's name is fine.
const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: ({ image }) =>
        z
            .object({
                name: z.string(),
                // One-line hook shown on the card and under the detail title.
                tagline: z.string(),
                // The card blurb - a sentence or two. Keep it tight.
                summary: z.string(),
                tech: z.array(z.string()).default([]),
                status: z.enum(['active', 'experiment', 'archived']).default('active'),
                // Loose year/era label, e.g. 2026 or "2015-2018". Display only.
                year: z.union([z.number(), z.string()]).optional(),
                // Manual sort weight; higher floats to the top. Ties break on name.
                order: z.number().default(0),
                featured: z.boolean().default(false),

                // Imagery. All optional so a project can ship description-first
                // and get screenshots added later (agents via shot/uidrive).
                hero: z.optional(image()),
                thumbnail: z.optional(image()),
                // Optional per-project accent (hex) tinting the placeholder tile
                // and the detail hero band when no image is set.
                accent: z.string().optional(),

                // Only PUBLIC repos get a link (private repos would 404 for
                // visitors). Omit for private projects - the description and
                // screenshots still tell the story.
                repo: z.string().url().optional(),
                // Extra links (a public demo, a related blog tag, etc.).
                links: z
                    .array(z.object({ label: z.string(), href: z.string().url() }))
                    .default([]),

                // Cross-link to writing on the blog. Set to an EXISTING log.fisher.sh
                // tag slug (the blog uses topical tags - "gamedev", "tools",
                // "smart-home" - not per-project tags). The detail page renders a
                // "Related on the blog" link to log.fisher.sh/tags/<blogTag>/. Leave
                // unset when no blog tag fits, so the link never 404s.
                blogTag: z.string().optional(),

                // Freshness contract: what commit of the source repo this entry's
                // description + screenshots reflect. Rendered visibly so a human
                // (and an agent) can see how stale the snapshot is, and diff the
                // changelog file forward from `commit`.
                source: z
                    .object({
                        repo: z.string().optional(), // source repo name
                        commit: z.string().optional(), // short SHA the snapshot reflects
                        changelog: z.string().optional(), // path to changelog entry in that repo
                        captured: z.coerce.date().optional(),
                    })
                    .optional(),

                screenshots: z
                    .array(
                        z.object({
                            src: image(),
                            caption: z.string().optional(),
                            captured: z.coerce.date().optional(),
                            commit: z.string().optional(),
                        })
                    )
                    .default([]),

                draft: z.boolean().default(false),
            })
            .strict(),
});

export const collections = { projects };
