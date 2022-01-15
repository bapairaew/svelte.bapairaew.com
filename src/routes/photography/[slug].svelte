<script context="module" lang="ts">
	import Head from '$lib/common/head/Head.svelte';
	import Image from '$lib/common/Image/Image.svelte';
	import type { Photo } from '$lib/photography/photoData';
	import type { Load } from '@sveltejs/kit';
	import dateformat from 'dateformat';
	import type { PhotoIndexData } from './index.json';

	export const load: Load = async ({ fetch, params }) => {
		const res = await fetch(`/photography/${params.slug}.json`);
		if (res.ok) {
			const data: PhotoIndexData = await res.json();
			return {
				props: data
			};
		}
		return {
			error: `Could not load /photography/${params.slug}.json`
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	export let photo: Photo;
	let description = [photo.place, dateformat(new Date(photo.date), 'dd mmm yyyy'), photo.camera]
		.filter((x) => x)
		.join(' · ');
</script>

<Head title={`${photo.place} | Narudom`} {description} />

<section class="container mx-auto px-4 pt-4 pb-16 max-w-4xl">
	<a class="block mt-4 text-neutral-500" href="/photography">← Photography</a>
	<Image
		class="mt-8 overflow-auto"
		alt={photo.place}
		src={`/photos/${photo.slug}.jpeg`}
		placeholder={photo.placeholder}
	/>
	<h1 class="pt-8 text-xl font-black">{photo.place}</h1>
	<dl class="grid grid-cols-2 gap-2 mt-4">
		<div>
			<dt class="text-sm text-neutral-500">Date</dt>
			<dd>{dateformat(new Date(photo.date), 'dd mmm yyyy')}</dd>
		</div>
		<div>
			<dt class="text-sm text-neutral-500">Camera</dt>
			<dd>{photo.camera}</dd>
		</div>
		<div>
			<dt class="text-sm text-neutral-500">Aperture</dt>
			<dd>ƒ / {photo.fnumber}</dd>
		</div>
		<div>
			<dt class="text-sm text-neutral-500">Exposure Time</dt>
			<dd>1 / {(1 / photo.exposureTime).toFixed(0)}</dd>
		</div>
		<div>
			<dt class="text-sm text-neutral-500">Focal Length</dt>
			<dd>{photo.focalLength.toFixed(1)} mm</dd>
		</div>
		<div>
			<dt class="text-sm text-neutral-500">ISO</dt>
			<dd>{photo.iso}</dd>
		</div>
	</dl>
</section>
