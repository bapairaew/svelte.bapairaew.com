<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import type { Project } from '$lib/markdown/markdownType';
	import ProjectCard from '$lib/markdown/project/ProjectCard.svelte';
	import type { Load } from '@sveltejs/kit';
	import type { ProjectIndexData } from './index.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/projects.json');
		if (res.ok) {
			const data: ProjectIndexData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /projects.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let projects: Project[];
</script>

<Head
	title="Projects | Narudom"
	description="(Almost) every Narudom's software engineering projects."
/>

<section class="container mx-auto pt-4 pb-16">
	<h1 class="text-3xl font-black px-4 py-4">Projects</h1>
	<ul class="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-2 lg:grid-cols-4">
		{#each projects as project (project.slug)}
			<li>
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
</section>
