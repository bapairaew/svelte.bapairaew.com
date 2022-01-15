<script lang="ts">
	export let href: string;
</script>

<a
	{...$$props}
	class={`before:content-[''] before:top-0 before:left-0 before:z-0 before:h-full before:w-full before:absolute no-underline ${$$props.class}`}
	{href}
>
	<slot />
</a>
