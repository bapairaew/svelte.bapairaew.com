<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import type { Project } from '$lib/markdown/markdownType';
	export let project: Project;
</script>

<Card clickable>
	<div class="p-4">
		<CardOverlayAnchor href={`/projects/${project.slug}`}>
			<h1 class="text-xl font-black pb-2">{project.title}</h1>
		</CardOverlayAnchor>
		<p class="pb-2 text-sm text-neutral-500">{project.subtitle || ''}</p>
		<p class="truncate text-sm text-neutral-500">{project.tags.map((t) => t.text).join(' · ')}</p>
	</div>
</Card>
