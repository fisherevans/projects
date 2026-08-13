import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../consts';

// Sync manifest: per project, the source commit + capture date its content
// reflects. The drift checker (nottingham-cloud scripts/projects-drift/) reads
// this, compares each source repo against its pinned commit, and publishes the
// projects.showcase.drift.* Datadog metrics. Only entries with a pinned commit
// are included (you can't measure drift without a baseline).
//
// This exposes only repo name + short commit + a capture date - the same
// provenance already rendered publicly on each detail page. No secrets.
export const GET: APIRoute = async () => {
    const all = await getCollection('projects', ({ data }) => data.draft !== true);

    const items = all
        .filter((p) => p.data.source?.repo && p.data.source?.commit)
        .map((p) => ({
            slug: p.id,
            name: p.data.name,
            repo: p.data.source!.repo,
            commit: p.data.source!.commit,
            path: p.data.source!.path ?? null,
            captured: p.data.source!.captured
                ? p.data.source!.captured.toISOString().slice(0, 10)
                : null,
            url: new URL(`/${p.id}/`, SITE_URL).toString(),
        }))
        .sort((a, b) => a.slug.localeCompare(b.slug));

    return new Response(JSON.stringify({ projects: items }, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
        },
    });
};
