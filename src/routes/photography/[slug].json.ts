import { getPhoto, Photo } from '$lib/photography/photoData';
import type { RequestHandler } from '@sveltejs/kit';

export interface PhotoData {
	photo: Photo;
}

export const get: RequestHandler = async (request) => {
	const photo = await getPhoto(request.params.slug);

	return {
		status: 200,
		body: JSON.stringify({
			photo
		} as PhotoData)
	};
};
