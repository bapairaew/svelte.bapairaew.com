<script lang="ts">
	export let clickable = false;
</script>

<section
	class="relative flex flex-col justify-start h-full border rounded-sm dark:bg-neutral-800 border-gre"
	class:border-b-4={clickable}
	class:border-neutral-900={clickable}
	class:border-neutral-300={!clickable}
	class:dark:border-neutral-900={clickable}
	class:dark:border-transparent={!clickable}
>
	<slot />
</section>
