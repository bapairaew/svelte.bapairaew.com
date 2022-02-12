import { getPlaceholderDataUri } from '$lib/common/Image/placeholder';

const { VITE_IMDB_COOKIE: cookie, VITE_IMDB_PAGE_ID: pageId } = import.meta.env;

export interface Movie {
	id: string;
	title: string;
	href: string;
	poster: string;
	rating: number;
	added: string;
	placeholder: string;
}

const getPageData = (page?: number) => {
	const params = new URLSearchParams();
	params.set('sort', 'date_added,desc');
	params.set('view', 'detail');
	params.set('pageId', pageId as string);
	params.set('pageType', 'list');
	params.set('subpageType', 'watchlist');
	params.set('tracking_tag', '');

	if (page) {
		params.set('page', page.toString());
	}

	return fetch(`https://www.imdb.com/list/${pageId}/search?${params.toString()}`, {
		headers: {
			// NOTE: this is make IMDB returns English title instead romanization of the original title
			'accept-language': 'en',
			// NOTE: cookie is needed to get personal rating
			cookie: cookie as string
		}
	}).then((r) => r.json());
};

export const getMovies = async () => {
	const firstPageData = await getPageData();
	const numberOfPages = Math.ceil(firstPageData.list.items.length / 100);
	let titlesMap = firstPageData.titles;
	let starbarsMap = firstPageData.starbars;

	if (numberOfPages > 1) {
		for (let i = 2; i <= numberOfPages; i++) {
			const pageData = await getPageData(i);
			titlesMap = { ...titlesMap, ...pageData.titles };
			starbarsMap = { ...starbarsMap, ...pageData.starbars };
		}
	}

	const movies: Movie[] = [];

	for (const item of firstPageData.list.items) {
		const movie = titlesMap[item.const];
		const rating = starbarsMap[item.const];
		if (movie) {
			const poster = movie.poster.url.replace(
				'._V1_.',
				encodeURIComponent('._UX384_CR0,0,384,568_AL_.') // 384 x 568
			);
			movies.push({
				id: item.const,
				title: movie.primary.title,
				href: `https://www.imdb.com/${movie.primary.href}`,
				// Request smaller poster image to improve speed
				poster,
				rating: rating.rating,
				added: new Date(item.added).toJSON(),
				placeholder: await getPlaceholderDataUri(poster)
			});
		} else {
			console.warn(`Movie not found: ${item.const}`);
		}
	}

	return movies;
};
