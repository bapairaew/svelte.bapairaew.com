import { getWhiskies, Whisky } from '$lib/whisky/whiskybase';
import type { RequestHandler } from '@sveltejs/kit';

export interface WhiskyData {
	whiskies: Whisky[];
}

export const get: RequestHandler = async () => {
	const whiskies = await getWhiskies();

	return {
		status: 200,
		body: JSON.stringify({ whiskies, time: new Date().toJSON() } as WhiskyData)
	};
};
