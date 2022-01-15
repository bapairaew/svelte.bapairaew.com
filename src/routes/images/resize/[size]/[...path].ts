import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import sharp from 'sharp';

const devMode = import.meta.env.DEV;

export const get: RequestHandler = async (request) => {
	const [widthString, heightString] = request.params.size.split('x');
	const width = isNaN(+widthString) || widthString === '' ? undefined : +widthString;
	const height = isNaN(+heightString) || heightString === '' ? undefined : +heightString;
	const image = devMode
		? await fs.promises.readFile(`./static/${request.params.path}`)
		: await sharp(`./static/${request.params.path}`)
				.resize({ width, height })
				.jpeg({ mozjpeg: true })
				.toBuffer();
	return {
		status: 200,
		headers: {
			'Content-Type': 'image/jpeg'
		},
		body: image
	};
};
