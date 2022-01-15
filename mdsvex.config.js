import image from './src/lib/common/Image/remark.js';

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [image],
	rehypePlugins: [],

	layout: {
		post: './src/lib/markdown/post/PostLayout.svelte',
		project: './src/lib/markdown/project/ProjectLayout.svelte'
	}
};

export default config;
