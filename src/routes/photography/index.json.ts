import { getAllPhotos, Photo } from '$lib/photography/photoData';
import type { RequestHandler } from '@sveltejs/kit';

export interface PhotoIndexData {
	photos: Photo[];
}

export const get: RequestHandler = async () => {
	const photos = await getAllPhotos();

	return {
		status: 200,
		body: JSON.stringify({
			photos: photos.sort((a, b) => b.slug.localeCompare(a.slug))
		} as PhotoIndexData)
	};
};
