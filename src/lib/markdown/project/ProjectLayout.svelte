<!-- No TypeScript support yet: https://github.com/pngwn/MDsveX/issues/116 -->
<script context="module">
	import Head from '$lib/common/head/Head.svelte';
	import { parseProject } from '$lib/markdown/markdownParser';
	import img from '$lib/markdown/post/PostImage.svelte';
	import a from '$lib/markdown/post/PostLink.svelte';
	export { img, a };
</script>

<script>
	export const project = parseProject({ data: $$props, path: '' });

	export const tagsMap = project.tags.reduce((map, tag) => {
		return { ...map, [tag.type]: [...(map[tag.type] || []), tag.text] };
	}, {});

	export const techStack = [
		tagsMap['App type']?.join(' · '),
		tagsMap['Layer']?.join(' · '),
		[...(tagsMap['Framework'] || []), ...(tagsMap['Database'] || [])].join(' · '),
		tagsMap['Platform']?.join(' · '),
		tagsMap['Language']?.join(' · '),
		tagsMap['Other']?.join(' · ')
	]
		.filter((x) => x)
		.join(' / ');
</script>

<Head title={`${project.title} | Narudom`} description={project.description} />

<section class="container mx-auto px-4 pt-4 pb-16 prose lg:prose-md dark:prose-invert">
	<a class="block mt-4 text-neutral-500" href="/projects">← Projects</a>
	<span class="block pt-8 text-sm text-neutral-500 font-normal">
		{[project.year, tagsMap['Company']?.[0]].filter((x) => x).join(' · ')}
	</span>
	<h1 class="pt-4 m-0">{project.title}</h1>
	<span class="block pt-2 text-lg">{project.subtitle || ''}</span>
	<span class="block pt-4 text-sm text-neutral-500 font-normal">{techStack}</span>
	<div class="pt-4">
		<slot />
	</div>
</section>
