<script lang="ts">
	import { page } from '$app/stores';
	import BottomSheet from '$lib/common/BottomSheet.svelte';
	let open = false;
	let y;
</script>

<svelte:window bind:scrollY={y} />
<nav class:backdrop-blur-md={y > 0} class="p-4 sticky top-0 z-10">
	<div
		class:opacity-0={y == 0}
		class:opacity-80={y > 0}
		class="absolute top-0 left-0 w-full h-full transition-opacity opacity-0 bg-white dark:bg-black"
	/>
	<div class="flex container mx-auto sticky">
		<div>
			<div class=" text-2xl font-bold not-sr-only"><a class="no-underline" href="/">N.</a></div>
			<div class="sr-only"><a class="no-underline" href="/">Narudom's website</a></div>
		</div>
		<ul class="flex-1 hidden justify-end items-center md:flex gap-4 no-underline text-neutral-500">
			<li>
				<a href="/lists" class:active={$page.url.pathname.startsWith('/lists')}>Lists</a>
			</li>
			<li>
				<a href="/photography" class:active={$page.url.pathname.startsWith('/photography')}
					>Photography</a
				>
			</li>
			<li>
				<a href="/posts" class:active={$page.url.pathname.startsWith('/posts')}>Posts</a>
			</li>
			<li>
				<a href="/projects" class:active={$page.url.pathname.startsWith('/projects')}>Projects</a>
			</li>
			<li>
				<a href="/" class:active={$page.url.pathname === '/'}>About</a>
			</li>
		</ul>
		<div class="flex-1 flex justify-end md:hidden">
			<button on:click={() => (open = true)} aria-label="Open menu">
				<svg aria-hidden="true" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
					<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
				</svg>
			</button>
		</div>
	</div>
</nav>
<BottomSheet bind:open>
	<div>
		<ul
			class="px-4 py-6 flex flex-col gap-4 text-lg  no-underline text-neutral-500"
			on:click={() => (open = false)}
		>
			<li>
				<a class="block" class:active={$page.url.pathname === '/'} href="/">About</a>
			</li>
			<li>
				<a class="block" class:active={$page.url.pathname.startsWith('/projects')} href="/projects"
					>Projects</a
				>
			</li>
			<li>
				<a class="block" class:active={$page.url.pathname.startsWith('/posts')} href="/posts"
					>Posts</a
				>
			</li>
			<li>
				<a
					class="block"
					class:active={$page.url.pathname.startsWith('/photography')}
					href="/photography">Photography</a
				>
			</li>
			<li>
				<a class="block" class:active={$page.url.pathname.startsWith('/lists')} href="/lists"
					>Lists</a
				>
			</li>
		</ul>
	</div>
</BottomSheet>

<style lang="postcss">
	.active {
		@apply no-underline text-neutral-900 dark:text-white;
	}
</style>
