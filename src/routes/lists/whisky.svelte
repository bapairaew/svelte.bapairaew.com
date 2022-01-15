<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import type { Whisky } from '$lib/whisky/whiskybase';
	import WhiskyCard from '$lib/whisky/WhiskyCard.svelte';
	import type { Load } from '@sveltejs/kit';
	import dateformat from 'dateformat';
	import type { WhiskyData } from './whisky.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/lists/whisky.json');
		if (res.ok) {
			const data: WhiskyData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /lists/whisky.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let whiskies: Whisky[];
	export let time: string;
</script>

<Head title="Whisky | Narudom" description="A few of whiskies an engineer bought and drank." />

<section class="container mx-auto pt-4 pb-16 px-4">
	<a class="block mt-4 text-neutral-500 pb-6" href="/lists">← List</a>
	<h1 class="text-3xl font-black py-2">Whisky</h1>
	<p class="text-sm text-neutral-500">
		Automatically curated by <a
			class="text-neutral-900 dark:text-neutral-300"
			href="https://www.whiskybase.com/profile/bapairaew/lists"
			target="_blank"
			rel="noopener noreferrer">Whiskybase</a
		>
		on {dateformat(time, 'dd mmm yyyy HH:mm')}.
	</p>
	<hr class="my-2" />
	<ul class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
		{#each whiskies as whisky (whisky.id)}
			<li>
				<WhiskyCard {whisky} />
			</li>
		{/each}
	</ul>
</section>
