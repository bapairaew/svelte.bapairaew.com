import sharp from 'sharp';

const devMode = import.meta.env.DEV;

let devPlaceholder;
if (devMode) {
	sharp(`./static/photos/001.jpeg`)
		.resize(10)
		.blur(5)
		.jpeg({ mozjpeg: true })
		.toBuffer()
		.then((data) => (devPlaceholder = data));
}

export const getPlaceholder = async (src: string) => {
	if (devMode) return devPlaceholder;
	const pathOrBuffer = src.startsWith('./')
		? src
		: src.startsWith('/')
		? `./static${src}`
		: await fetch(src)
				.then((r) => r.arrayBuffer())
				.then((r) => Buffer.from(r));
	return sharp(pathOrBuffer).resize(10).blur(5).jpeg({ mozjpeg: true }).toBuffer();
};

export const getPlaceholderDataUri = async (src: string) => {
	return getPlaceholder(src).then((r) => `data:image/jpeg;base64,${r.toString('base64')}`);
};
