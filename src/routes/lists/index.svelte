<script>
	import Card from '$lib/common/Card.svelte';
	import CardOverlayAnchor from '$lib/common/CardOverlayAnchor.svelte';
	import Head from '$lib/common/head/Head.svelte';
</script>

<Head
	title="Lists | Narudom"
	description="Lists of random things that an software engineer enjoy."
/>

<section class="container mx-auto pt-4 pb-16">
	<h1 class="text-3xl font-black px-4 py-4">Lists</h1>
	<ul class="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-2">
		<li>
			<Card clickable>
				<div class="no-underline p-4 flex justify-between items-center font-black text-2xl">
					<CardOverlayAnchor href="/lists/music">
						<h1>Music</h1>
					</CardOverlayAnchor>
					<span class="not-sr-only">→</span>
				</div>
			</Card>
		</li>
		<li>
			<Card clickable>
				<div class="no-underline p-4 flex justify-between items-center font-black text-2xl">
					<CardOverlayAnchor href="/lists/movie">
						<h1>Movie</h1>
					</CardOverlayAnchor>
					<span class="not-sr-only">→</span>
				</div>
			</Card>
		</li>
		<li>
			<Card clickable>
				<div class="no-underline p-4 flex justify-between items-center font-black text-2xl">
					<CardOverlayAnchor href="/lists/whisky">
						<h1>Whisky</h1>
					</CardOverlayAnchor>
					<span class="not-sr-only">→</span>
				</div>
			</Card>
		</li>
		<li>
			<Card clickable>
				<div class="no-underline p-4 flex justify-between items-center font-black text-2xl">
					<CardOverlayAnchor href="/lists/book">
						<h1>Book</h1>
					</CardOverlayAnchor>
					<span class="not-sr-only">→</span>
				</div>
			</Card>
		</li>
	</ul>
</section>
