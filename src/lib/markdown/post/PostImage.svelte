<script>
	import Image from '$lib/common/Image/Image.svelte';

	export let src;
	export let alt;
	// HACK: placeholder image injected from the custom remark plugin in src/lib/common/Image/remark.js
	export let title;
</script>

<figure>
	<!-- NOTE: prerender does not work here for unknown reason -->
	<Image class="aspect-[4/3]" {src} {alt} placeholder={title} />
	<figcaption class="text-center">{alt}</figcaption>
</figure>
