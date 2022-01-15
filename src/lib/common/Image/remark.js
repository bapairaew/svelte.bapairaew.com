/**
 * @typedef {import('mdast').Root} Root
 */

import path from 'node:path';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

/**
 * HACK: add placeholder image to title attribute used in src/markdown/post/PostImage.svelte
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function addPlaceholderToTitle() {
	return (tree, file, done) => {
		let count = 0;
		const base = file.dirname ? path.resolve(file.cwd, file.dirname) : file.cwd;

		visit(tree, 'image', (node) => {
			count++;
			sharp(path.resolve(base, `./static/${node.url}`))
				.resize(10)
				.blur(5)
				.jpeg({ mozjpeg: true })
				.toBuffer()
				.then((r) => {
					node.title = `data:image/jpeg;base64,${r.toString('base64')}`;
					if (--count === 0) {
						done();
					}
				});
		});

		if (!count) {
			done();
		}
	};
}
