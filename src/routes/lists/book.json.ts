import { Book, getBooks } from '$lib/book/goodreads';
import type { RequestHandler } from '@sveltejs/kit';

export interface BookData {
	books: Book[];
}

export const get: RequestHandler = async () => {
	const books = await getBooks();

	return {
		status: 200,
		body: JSON.stringify({ books, time: new Date().toJSON() } as BookData)
	};
};
