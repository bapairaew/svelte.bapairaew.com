import { getAllPosts } from '$lib/markdown/markdownData';
import type { Post } from '$lib/markdown/markdownType';
import type { RequestHandler } from '@sveltejs/kit';

export interface PostIndexData {
	posts: Post[];
}

export const get: RequestHandler = async () => {
	const posts = await getAllPosts();

	return {
		status: 200,
		body: JSON.stringify({
			posts: posts.sort((a, b) => b.slug.localeCompare(a.slug))
		} as PostIndexData)
	};
};
