<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import type { Whisky } from '$lib/whisky/whiskybase';
	import dateformat from 'dateformat';

	export let whisky: Whisky;
</script>

<Card clickable>
	<div class="p-2">
		<Image
			class="aspect-[1/2] rounded-sm"
			src={whisky.photo}
			alt={whisky.title}
			placeholder={whisky.placeholder}
		/>
		<CardOverlayAnchor
			class="after:hidden"
			href={whisky.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 class="font-bold pt-2 leading-tight line-clamp-1">{whisky.title}</h1>
		</CardOverlayAnchor>
		<p class="text-sm text-neutral-500 line-clamp-1">
			{[`${whisky.rating} ★`, dateformat(new Date(whisky.added), 'dd mmm yyyy')]
				.filter((x) => x)
				.join(' · ')}
		</p>
	</div>
</Card>
