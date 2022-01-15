import { parsePost, parseProject } from '$lib/markdown/markdownParser';
import fs from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';

const getMarkdownFiles = async (pattern) => {
	const data = await Promise.all(
		(
			await globby(pattern)
		).map((path) =>
			fs.promises.readFile(path, 'utf-8').then((source) => ({
				...matter(source),
				path
			}))
		)
	);

	return data;
};

export const getAllProjects = async () => {
	const projects = (await getMarkdownFiles('src/routes/projects/*.svx')).map(parseProject);
	return projects;
};

export const getAllPosts = async () => {
	const posts = (await getMarkdownFiles('src/routes/posts/*.svx'))
		.map(parsePost)
		.filter((x) => x.publishedTime);
	return posts;
};
