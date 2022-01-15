<script context="module">
	import { navigating } from '$app/stores';
	import Footer from '$lib/common/Footer.svelte';
	import Header from '$lib/common/Header.svelte';
	import ProgressBar from '$lib/common/ProgressBar.svelte';
	import { blur } from 'svelte/transition';
	import '../app.css';

	export const load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script>

<script lang="ts">
	export let key: string;
</script>

{#if $navigating}
	<ProgressBar />
{/if}

<Header />
{#key key}
	<main in:blur={{ amount: 50, duration: 300 }}>
		<slot />
	</main>
{/key}
<Footer />
