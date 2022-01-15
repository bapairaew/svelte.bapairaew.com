import { getAllProjects } from '$lib/markdown/markdownData';
import type { Project } from '$lib/markdown/markdownType';
import type { RequestHandler } from '@sveltejs/kit';

export interface ProjectIndexData {
	projects: Project[];
}

export const get: RequestHandler = async () => {
	const projects = await getAllProjects();

	return {
		status: 200,
		body: JSON.stringify({
			projects: projects.sort((a, b) => b.slug.localeCompare(a.slug))
		} as ProjectIndexData)
	};
};
