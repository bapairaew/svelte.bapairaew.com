<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import PhotoCard from '$lib/photography/PhotoCard.svelte';
	import type { Photo } from '$lib/photography/photoData';
	import type { Load } from '@sveltejs/kit';
	import type { PhotoIndexData } from './index.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/photography.json');
		if (res.ok) {
			const data: PhotoIndexData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /photography.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let photos: Photo[];
</script>

<Head
	title="Photography | Narudom"
	description="Some photos (badly) taken by a software engineer."
/>

<section class="container mx-auto pt-4 pb-16">
	<h1 class="text-3xl font-black px-4 py-4">Photography</h1>
	<ul class="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-2 lg:grid-cols-4">
		{#each photos as photo (photo.slug)}
			<li>
				<PhotoCard {photo} />
			</li>
		{/each}
	</ul>
</section>
