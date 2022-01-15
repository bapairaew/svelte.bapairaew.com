import { getMovies, Movie } from '$lib/movie/imdb';
import type { RequestHandler } from '@sveltejs/kit';

export interface MovieData {
	movies: Movie[];
}

export const get: RequestHandler = async () => {
	const movies = await getMovies();

	return {
		status: 200,
		body: JSON.stringify({ movies, time: new Date().toJSON() } as MovieData)
	};
};
