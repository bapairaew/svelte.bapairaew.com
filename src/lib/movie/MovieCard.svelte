<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import type { Movie } from '$lib/movie/imdb';
	import dateformat from 'dateformat';

	export let movie: Movie;
</script>

<Card clickable>
	<div class="p-2">
		<Image
			class="aspect-[7/10] rounded-sm"
			src={movie.poster}
			alt={movie.title}
			placeholder={movie.placeholder}
		/>
		<CardOverlayAnchor
			class="after:hidden"
			href={movie.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 class="font-bold pt-2 leading-tight line-clamp-1">{movie.title}</h1>
		</CardOverlayAnchor>
		<p class="text-sm text-neutral-500 line-clamp-1">
			{[`${movie.rating} ★`, dateformat(new Date(movie.added), 'dd mmm yyyy')]
				.filter((x) => x)
				.join(' · ')}
		</p>
	</div>
</Card>
