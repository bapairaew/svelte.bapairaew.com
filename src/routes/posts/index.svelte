<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import type { Post } from '$lib/markdown/markdownType';
	import PostCard from '$lib/markdown/post/PostCard.svelte';
	import type { Load } from '@sveltejs/kit';
	import type { PostIndexData } from './index.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/posts.json');
		if (res.ok) {
			const data: PostIndexData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /posts.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let posts: Post[];
</script>

<Head title="Posts | Narudom" description="An engineer's (random) thoughts on things." />

<section class="container mx-auto pt-4 pb-16">
	<h1 class="text-3xl font-black px-4 py-4">Posts</h1>
	<ul class="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post (post.slug)}
			<li>
				<PostCard {post} />
			</li>
		{/each}
	</ul>
</section>
