// Source: https://github.com/leerob/leerob.io/blob/main/lib/spotify.js
import { getPlaceholderDataUri } from '$lib/common/Image/placeholder';
import base64 from 'base-64';

const {
	VITE_SPOTIFY_CLIENT_ID: client_id,
	VITE_SPOTIFY_CLIENT_SECRET: client_secret,
	VITE_SPOTIFY_REFRESH_TOKEN: refresh_token
} = import.meta.env;

export interface Artist extends SpotifyApi.ArtistObjectFull {
	placeholder: string;
}

export interface Track extends SpotifyApi.TrackObjectFull {
	placeholder: string;
}

const basic = base64.encode(`${client_id}:${client_secret}`);

const getAccessToken = async () => {
	const params = new URLSearchParams();
	params.set('grant_type', 'refresh_token');
	params.set('refresh_token', refresh_token as string);
	return await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params.toString()
	}).then((r) => r.json());
};

export const getTopTracks = async () => {
	const { access_token } = await getAccessToken();
	const params = new URLSearchParams();
	params.set('time_range', 'short_term');
	params.set('limit', '40');

	const response: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> = await fetch(
		`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}
	).then((r) => r.json());

	const tracks: Track[] = [];

	for (const item of response.items) {
		tracks.push({
			...item,
			placeholder: await getPlaceholderDataUri(item.album.images[0].url)
		});
	}

	return tracks;
};

export const getTopArtists = async () => {
	const { access_token } = await getAccessToken();
	const params = new URLSearchParams();
	params.set('time_range', 'short_term');
	params.set('limit', '8');

	const response: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> = await fetch(
		`https://api.spotify.com/v1/me/top/artists?${params.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}
	).then((r) => r.json());

	const artists: Artist[] = [];

	for (const item of response.items) {
		artists.push({
			...item,
			placeholder: await getPlaceholderDataUri(item.images[0].url)
		});
	}

	return artists;
};
