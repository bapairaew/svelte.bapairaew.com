<script context="module" lang="ts">
	import BookCard from '$lib/book/BookCard.svelte';
	import type { Book } from '$lib/book/goodreads';
	import Head from '$lib/common/head/Head.svelte';
	import type { Load } from '@sveltejs/kit';
	import dateformat from 'dateformat';
	import type { BookData } from './book.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/lists/book.json');
		if (res.ok) {
			const data: BookData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: 'Could not load /lists/book.json'
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let books: Book[];
	export let time: string;
</script>

<Head title="Book | Narudom" description="List of books read by an engineer." />

<section class="container mx-auto pt-4 pb-16 px-4">
	<a class="block mt-4 text-neutral-500 pb-6" href="/lists">← List</a>
	<h1 class="text-3xl font-black py-2">Book</h1>
	<p class="text-sm text-neutral-500">
		Automatically curated by <a
			class="text-neutral-900 dark:text-neutral-300"
			href="https://www.whiskybase.com/profile/bapairaew/lists"
			target="_blank"
			rel="noopener noreferrer">Goodreads RSS</a
		>
		on {dateformat(time, 'dd mmm yyyy HH:mm')}.
	</p>
	<hr class="my-2" />
	<ul class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
		{#each books as book (book.id)}
			<li>
				<BookCard {book} />
			</li>
		{/each}
	</ul>
</section>
