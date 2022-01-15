<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import dateformat from 'dateformat';
	import type { Photo } from './photoData';
	export let photo: Photo;
</script>

<Card clickable>
	<Image
		class="aspect-[4/3]"
		alt={photo.place}
		src={`/images/resize/600x/photos/${photo.slug}.jpeg`}
		placeholder={photo.placeholder}
	/>
	<div class="p-2">
		<CardOverlayAnchor href={`/photography/${photo.slug}`}>
			<h1 class="font-black">{photo.place}</h1>
		</CardOverlayAnchor>
		<p class="text-neutral-500 text-sm">
			{[dateformat(new Date(photo.date), 'dd mmm yyyy'), photo.camera].filter((x) => x).join(' · ')}
		</p>
	</div>
</Card>
