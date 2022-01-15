<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import ArtistCard from '$lib/music/ArtistCard.svelte';
	import type { Artist, Track } from '$lib/music/spotify';
	import TrackCard from '$lib/music/TrackCard.svelte';
	import type { Load } from '@sveltejs/kit';
	import dateformat from 'dateformat';
	import type { MusicData } from './music.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/lists/music.json');
		if (res.ok) {
			const data: MusicData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /lists/music.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let artists: Artist[];
	export let tracks: Track[];
	export let time: string;
</script>

<Head title="Music | Narudom" description="An engineer's top listened music from Spotify." />

<section class="container mx-auto pt-4 pb-16 px-4">
	<a class="block mt-4 text-neutral-500 pb-6" href="/lists">← List</a>
	<h1 class="text-3xl font-black py-2">Music</h1>
	<p class="text-sm text-neutral-500">
		Automatically curated by <a
			class="text-neutral-900 dark:text-neutral-300"
			href="https://developer.spotify.com/"
			target="_blank"
			rel="noopener noreferrer">Spotify API</a
		>
		on {dateformat(time, 'dd mmm yyyy HH:mm')}.
	</p>
	<hr class="my-2" />
	<h2 class="text-2xl font-black py-4">Artists</h2>
	<ul class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
		{#each artists as artist (artist.id)}
			<li>
				<ArtistCard {artist} />
			</li>
		{/each}
	</ul>
	<h2 class="text-2xl font-black pt-8 pb-4">Tracks</h2>
	<ul class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
		{#each tracks as track (track.id)}
			<li>
				<TrackCard {track} />
			</li>
		{/each}
	</ul>
</section>
