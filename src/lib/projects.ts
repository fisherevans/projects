import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

// Published projects, sorted for the index: featured first, then by descending
// `order`, then alphabetically by name. Drafts are excluded in production.
export async function listProjects(): Promise<Project[]> {
    const all = await getCollection('projects', ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true;
    });
    return all.sort((a, b) => {
        if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
        if (a.data.order !== b.data.order) return b.data.order - a.data.order;
        return a.data.name.localeCompare(b.data.name);
    });
}

export function projectHref(entry: Project): string {
    return `/${entry.id}/`;
}

const STATUS_LABEL: Record<Project['data']['status'], string> = {
    active: 'active',
    experiment: 'experiment',
    archived: 'archived',
};

export function statusLabel(status: Project['data']['status']): string {
    return STATUS_LABEL[status];
}
