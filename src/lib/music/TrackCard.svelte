<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import type { Track } from './spotify';
	export let track: Track;
</script>

<Card clickable>
	<div class="p-2">
		<Image
			class="aspect-square rounded-sm"
			src={track.album.images[0].url}
			alt={track.name}
			placeholder={track.placeholder}
		/>
		<CardOverlayAnchor
			class="after:hidden"
			href={track.external_urls.spotify}
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 class="font-bold pt-2 leading-tight line-clamp-1">{track.name}</h1>
		</CardOverlayAnchor>
		<p class="text-sm text-neutral-500  line-clamp-1">
			{track.artists.map((a) => a.name).join(', ')}
		</p>
	</div>
</Card>
