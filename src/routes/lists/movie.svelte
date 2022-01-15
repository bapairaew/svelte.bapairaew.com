<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import type { Movie } from '$lib/movie/imdb';
	import MovieCard from '$lib/movie/MovieCard.svelte';
	import type { Load } from '@sveltejs/kit';
	import dateformat from 'dateformat';
	import type { MovieData } from './movie.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/lists/movie.json');
		if (res.ok) {
			const data: MovieData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /lists/movie.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let movies: Movie[];
	export let time: string;
</script>

<Head title="Movie | Narudom" description="An engineer's top watched movies from IMDB." />

<section class="container mx-auto pt-4 pb-16 px-4">
	<a class="block mt-4 text-neutral-500 pb-6" href="/lists">← List</a>
	<h1 class="text-3xl font-black py-2">Movie</h1>
	<p class="text-sm text-neutral-500">
		Automatically curated by <a
			class="text-neutral-900 dark:text-neutral-300"
			href="https://www.imdb.com/user/ur129926199/watchlist"
			target="_blank"
			rel="noopener noreferrer">IMDB Watchlist</a
		>
		on {dateformat(time, 'dd mmm yyyy HH:mm')}.
	</p>
	<hr class="my-2" />
	<ul class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
		{#each movies as movie (movie.id)}
			<li>
				<MovieCard {movie} />
			</li>
		{/each}
	</ul>
</section>
