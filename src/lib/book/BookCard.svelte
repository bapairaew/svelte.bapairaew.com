<script lang="ts">
	import type { Book } from '$lib/book/goodreads';
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import dateformat from 'dateformat';

	export let book: Book;
</script>

<Card clickable>
	<div class="p-2">
		<Image
			class="aspect-[2/3] rounded-sm"
			src={book.cover}
			alt={book.title}
			placeholder={book.placeholder}
		/>
		<CardOverlayAnchor
			class="after:hidden"
			href={book.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 class="font-bold pt-2 leading-tight line-clamp-1">{book.title}</h1>
		</CardOverlayAnchor>
		<p class="text-sm line-clamp-1">{book.author}</p>
		<p class="text-sm text-neutral-500 line-clamp-1">
			{[`${book.rating} ★`, dateformat(new Date(book.added), 'dd mmm yyyy')]
				.filter((x) => x)
				.join(' · ')}
		</p>
	</div>
</Card>
