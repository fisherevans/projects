import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { listProjects, projectHref } from '../lib/projects';
import { SITE_URL } from '../consts';

// Machine-readable index of every published project. This is the single source
// of truth the blog (log.fisher.sh) fetches at build time to render inline
// project cards - see the ProjectCard integration in the log repo. Keep the
// shape stable; the blog depends on these field names.
//
// URLs are absolute so a cross-origin consumer can use them directly.
export const GET: APIRoute = async () => {
    const projects = await listProjects();

    const items = await Promise.all(
        projects.map(async (p) => {
            let thumbnail: string | undefined;
            if (p.data.thumbnail) {
                const img = await getImage({ src: p.data.thumbnail, width: 640, height: 400 });
                thumbnail = new URL(img.src, SITE_URL).toString();
            }
            return {
                slug: p.id,
                name: p.data.name,
                tagline: p.data.tagline,
                summary: p.data.summary,
                tech: p.data.tech,
                status: p.data.status,
                year: p.data.year ?? null,
                url: new URL(projectHref(p), SITE_URL).toString(),
                repo: p.data.repo ?? null,
                thumbnail: thumbnail ?? null,
            };
        })
    );

    return new Response(JSON.stringify({ projects: items }, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // Let the blog's build (and browsers) cache briefly.
            'Cache-Control': 'public, max-age=300',
        },
    });
};
