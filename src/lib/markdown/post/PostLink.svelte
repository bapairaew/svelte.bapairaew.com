<script>
	export let href;
	export let isExternal = !$$props.href?.startsWith('/');
</script>

<a {href} target={isExternal ? '_blank' : undefined}>
	<slot />
</a>
