<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import type { Artist } from './spotify';
	export let artist: Artist;
</script>

<Card clickable>
	<div class="p-4">
		<Image
			class="aspect-square rounded-full"
			src={artist.images[0].url}
			alt={artist.name}
			placeholder={artist.placeholder}
		/>
		<CardOverlayAnchor
			class="after:hidden"
			href={artist.external_urls.spotify}
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 class="text-center font-bold pt-2 line-clamp-1">{artist.name}</h1>
		</CardOverlayAnchor>
	</div>
</Card>
