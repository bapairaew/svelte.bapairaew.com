import { getPlaceholderDataUri } from '$lib/common/Image/placeholder';
import RSSParser from 'rss-parser';

const { VITE_GOODREADS_ID: id } = import.meta.env;

export interface Book {
	id: string;
	title: string;
	cover: string;
	author: string;
	href: string;
	rating: number;
	added: string;
	placeholder: string;
}

const rssParser = new RSSParser({
	customFields: {
		item: ['author_name', 'book_large_image_url', 'user_date_added', 'user_rating']
	}
});

export const getBooks = async () => {
	const feed = await rssParser.parseURL(`https://www.goodreads.com/review/list_rss/${id}`);
	const books: Book[] = [];
	for (const item of feed.items) {
		books.push({
			id: item.guid,
			title: item.title,
			cover: item['book_large_image_url'],
			author: item['author_name'],
			href: item.link,
			rating: item['user_rating'],
			added: new Date(item['user_date_added']).toJSON(),
			placeholder: await getPlaceholderDataUri(item['book_large_image_url'])
		});
	}
	return books;
};
