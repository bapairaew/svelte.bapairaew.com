<script lang="ts">
	import { loadedImages } from '$lib/common/Image/imageStore';
	import IntersectionObserver from '$lib/common/IntersectionObserver.svelte';

	export let src: string;
	export let alt: string;
	export let placeholder: string | undefined = undefined;

	let justLoaded = false;
	let loaded = $loadedImages.includes(src);

	function lazy(node: HTMLElement, data: { src: string }) {
		const img = new Image();
		img.src = data.src;
		img.onload = () => {
			if (!loaded) justLoaded = true;
			loadedImages.update((current) => [...current, data.src]);
			node.setAttribute('src', data.src);
		};
		return {
			destroy() {}
		};
	}
</script>

<div class={`overflow-hidden flex items-center ${$$props.class}`}>
	<IntersectionObserver let:intersecting once>
		{#if intersecting}
			<img
				class="min-h-full object-cover w-full"
				class:unblur={justLoaded}
				loading="lazy"
				use:lazy={{ src }}
				src={placeholder || src}
				{alt}
			/>
		{:else}
			<img loading="lazy" class="min-h-full object-cover w-full" src={placeholder} {alt} />
		{/if}
	</IntersectionObserver>
</div>
<!-- NOTE: Make SvelteKit prerender original source route -->
<img loading="lazy" class="hidden" {src} {alt} />
<img loading="lazy" class="hidden" src={placeholder} {alt} />

<style lang="postcss">
	.unblur {
		animation: unblur 300ms linear;
	}
	@keyframes unblur {
		from {
			filter: blur(100px);
		}
		to {
			filter: blur(0);
		}
	}
</style>
