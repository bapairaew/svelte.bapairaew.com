import { getPlaceholderDataUri } from '$lib/common/Image/placeholder';
import exifr from 'exifr';
import fs from 'fs';
import { globby } from 'globby';

export interface Photo {
	slug: string;
	place: string;
	date: string | null;
	camera: string | null;
	fnumber: number;
	iso: number;
	focalLength: number;
	exposureTime: number;
	width: string;
	height: string;
	placeholder: string;
}

export const getAllPhotosData = async (pattern: string) => {
	const slugs = await globby(pattern);
	const data = Promise.all(slugs.map(getPhotoData));
	return data;
};

const getPhotoData = async (path: string) => {
	const exif = await fs.promises.readFile(path).then(exifr.parse);
	const slug = path.split('/').pop().replace('.jpeg', '');
	const placeParts = exif.ImageDescription?.split(', ');
	return {
		slug,
		place: [placeParts[0], placeParts.pop()].join(', '),
		date: exif.DateTimeOriginal?.toJSON() || exif.CreateDate?.toJSON() || null,
		camera: exif.Model ? exif.Model : null,
		fnumber: exif.FNumber,
		iso: exif.ISO,
		focalLength: exif.FocalLength,
		exposureTime: exif.ExposureTime,
		width: exif.ExifImageWidth, // Does not provide correct dimension
		height: exif.ExifImageHeight, // Does not provide correct dimension
		placeholder: await getPlaceholderDataUri(path)
	} as Photo;
};

export const getAllPhotos = async () => {
	const photos = await getAllPhotosData('./static/photos/*.jpeg');
	return photos;
};

export const getPhoto = async (slug: string) => {
	const photos = await getPhotoData(`./static/photos/${slug}.jpeg`);
	return photos;
};
