<script lang="ts">
	const { VITE_CANON_ROOT: root, VITE_PLAUSIBLE_DOMAIN: plausibleDomain } = import.meta.env;

	export let title: string;
	export let description: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={`${root}/og-image.png`} />
	<meta property="og:site_name" content="Narudom" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@bapairaew" />
	<meta name="twitter:creator" content="@bapairaew" />

	<script
		src="/stats/js/script.js"
		data-api="/stats/api/event"
		data-domain={plausibleDomain}></script>
</svelte:head>
