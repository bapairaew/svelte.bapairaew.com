import { Artist, getTopArtists, getTopTracks, Track } from '$lib/music/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export interface MusicData {
	artists: Artist[];
	tracks: Track[];
	time: string;
}

export const get: RequestHandler = async () => {
	const [artists, tracks] = await Promise.all([getTopArtists(), getTopTracks()]);

	return {
		status: 200,
		body: JSON.stringify({ artists, tracks, time: new Date().toJSON() } as MusicData)
	};
};
