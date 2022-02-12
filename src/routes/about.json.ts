import { getAllPosts, getAllProjects } from '$lib/markdown/markdownData';
import type { Post, Project, Tool } from '$lib/markdown/markdownType';
import { getAllPhotos, Photo } from '$lib/photography/photoData';
import type { RequestHandler } from '@sveltejs/kit';

export interface AboutData {
	posts: Post[];
	projects: Project[];
	tools: Tool[];
	photos: Photo[];
}

export const get: RequestHandler = async () => {
	const [posts, projects, photos] = await Promise.all([
		getAllPosts(),
		getAllProjects(),
		getAllPhotos()
	]);
	const tools = projects
		.reduce((tools, w) => {
			for (const tool of w.tags.filter((t) =>
				['Framework', 'Language', 'Platform', 'Database'].includes(t.type)
			)) {
				const matched = tools.find((t) => t.text === tool.text);
				if (matched) {
					matched.count++;
				} else {
					tools.push({ text: tool.text, count: 1 });
				}
			}
			return tools;
		}, [])
		.sort((a, b) => (a.count > b.count ? -1 : 1));

	return {
		status: 200,
		body: JSON.stringify({
			posts: posts.sort((a, b) => b.slug.localeCompare(a.slug)).slice(0, 4),
			projects: projects.sort((a, b) => b.slug.localeCompare(a.slug)).slice(0, 8),
			tools,
			photos: photos.sort((a, b) => b.slug.localeCompare(a.slug)).slice(0, 8)
		} as AboutData)
	};
};
