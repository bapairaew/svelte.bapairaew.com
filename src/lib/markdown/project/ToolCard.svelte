<script lang="ts">
	import Card from '$lib/common/Card.svelte';
	import type { Tool } from '$lib/markdown/markdownType';
	export let tool: Tool;
</script>

<Card>
	<div class="p-2">
		<h1 class="font-black text-center">{tool.text}</h1>
		<p class="truncate text-sm text-neutral-500 text-center">{tool.count} projects</p>
	</div>
</Card>
