<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import type { Post, Project, Tool } from '$lib/markdown/markdownType';
	import PostCard from '$lib/markdown/post/PostCard.svelte';
	import ProjectCard from '$lib/markdown/project/ProjectCard.svelte';
	import ToolCard from '$lib/markdown/project/ToolCard.svelte';
	import PhotoCard from '$lib/photography/PhotoCard.svelte';
	import type { Photo } from '$lib/photography/photoData';
	import type { Load } from '@sveltejs/kit';
	import type { AboutData } from './about.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/about.json');
		if (res.ok) {
			const data: AboutData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /about.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let projects: Project[];
	export let posts: Post[];
	export let tools: Tool[];
	export let photos: Photo[];
</script>

<Head title="Narudom" description="A software engineer website." />

<section class="container relative mx-auto px-2 py-32">
	<div class="text-center">
		<h1 class="font-black text-6xl">
			Narudom <br /> Techaval
		</h1>
		<h2 class="text-2xl text-neutral-500 py-6">Software Engineer</h2>
		<ul class="links text-neutral-500 flex justify-center">
			<li>
				<a href="https://github.com/bapairaew" target="_blank" rel="noopener noreferrer">GitHub</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/ntechaval" target="_blank" rel="noopener noreferrer"
					>LinkedIn</a
				>
			</li>
			<li>
				<a href="mailto:iam@bapairaew.com" target="_blank" rel="noopener noreferrer">Email</a>
			</li>
			<li><a href="/cv.pdf" target="_blank">CV</a></li>
		</ul>
	</div>
	<div class="gradient opacity-50 -z-10 absolute top-0 left-0 w-full h-full" />
</section>
<section class="container mx-auto px-4 pb-8 prose lg:prose-md dark:prose-invert">
	<p>
		I am a software engineer who enjoy getting involved in the whole product development life cycle
		from ideating, designing and coding. I have chosen this career path because I want to build
		things that bring values and make impacts to people's life.
	</p>
	<p>
		I consider myself pragmatic, flexibile, and open-minded which pushes me to learn new things
		especially in software engineering area to be able to pick the most suitable tool once
		opportunity arises.
	</p>
	<p>
		I have been moving around a few countries while working and studying. I enjoy experiencing
		different environments and meeting new people which is why I started traveling the world.
	</p>
</section>
<section class="container mx-auto px-2 py-8">
	<h2 class="font-black text-2xl pb-8">Projects</h2>
	<ul class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
		{#each projects as project (project.slug)}
			<li>
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
	<a class="w-full text-center block p-4 mt-4" href="/projects">All projects →</a>
</section>
<section class="container mx-auto px-2 py-8">
	<h2 class="font-black text-2xl pb-8">Tools</h2>
	<ul class="grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-6">
		{#each tools as tool (tool.text)}
			<li>
				<ToolCard {tool} />
			</li>
		{/each}
	</ul>
</section>
<section class="container mx-auto px-2 py-8">
	<h2 class="font-black text-2xl pb-8">Posts</h2>
	<ul class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
		{#each posts as post (post.slug)}
			<li>
				<PostCard {post} />
			</li>
		{/each}
	</ul>
	<a class="w-full text-center block p-4 mt-4" href="/posts">All posts →</a>
</section>
<section class="container mx-auto px-2 py-8">
	<h2 class="font-black text-2xl pb-8">Photography</h2>
	<ul class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
		{#each photos as photo (photo.slug)}
			<li>
				<PhotoCard {photo} />
			</li>
		{/each}
	</ul>
	<a class="w-full text-center block p-4 mt-4" href="/photography">All photography →</a>
</section>

<style lang="postcss">
	.links li:not(:last-child)::after {
		@apply px-2;
		content: '·';
	}
	.gradient {
		background: conic-gradient(
			from 230.29deg at 51.63% 52.16%,
			theme('colors.green.500') 0deg,
			theme('colors.blue.500') 60deg,
			theme('colors.pink.500') 120deg,
			theme('colors.red.500') 180deg,
			theme('colors.orange.500') 240deg,
			theme('colors.purple.500') 300deg
		);
		filter: blur(100px);
		animation: glow 1s linear forwards;
		transform: translateZ(0); /* Fix background does not show up properly in Safari */
	}
	@keyframes glow {
		from {
			opacity: theme('opacity.0');
		}
		to {
			opacity: theme('opacity.50');
		}
	}
</style>
