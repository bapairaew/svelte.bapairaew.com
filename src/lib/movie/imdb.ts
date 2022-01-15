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

export const getMovies = async () => {
	const params = new URLSearchParams();
	params.set('sort', 'date_added,desc');
	params.set('view', 'detail');
	params.set('pageId', pageId as string);
	params.set('pageType', 'list');
	params.set('subpageType', 'watchlist');
	params.set('tracking_tag', '');

	const data = await fetch(`https://www.imdb.com/list/${pageId}/search?${params.toString()}`, {
		headers: {
			// NOTE: this is make IMDB returns English title instead romanization of the original title
			'accept-language': 'en',
			// NOTE: cookie is needed to get personal rating
			cookie: cookie as string
		}
	}).then((r) => r.json());

	const movies: Movie[] = [];

	for (const item of data.list.items) {
		const poster = data.titles[item.const].poster.url.replace(
			'._V1_.',
			encodeURIComponent('._UX384_CR0,0,384,568_AL_.') // 384 x 568
		);
		movies.push({
			id: item.const,
			title: data.titles[item.const].primary.title,
			href: `https://www.imdb.com/${data.titles[item.const].primary.href}`,
			// Request smaller poster image to improve speed
			poster,
			rating: data.starbars[item.const].rating,
			added: new Date(item.added).toJSON(),
			placeholder: await getPlaceholderDataUri(poster)
		});
	}

	return movies;
};
