import { getPlaceholderDataUri } from '$lib/common/Image/placeholder';
import csvtojson from 'csvtojson';

const { VITE_WHISKYBASE_COOKIE: cookie, VITE_WHISKYBASE_ID: id } = import.meta.env;

export interface Whisky {
	id: string;
	title: string;
	photo: string;
	href: string;
	rating: number;
	added: string;
	placeholder: string;
}

export const getWhiskies = async () => {
	const list = await fetch(`https://www.whiskybase.com/profile/${id}/downloadlist/collection/csv`, {
		headers: {
			'user-agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36',
			cookie: cookie as string
		}
	})
		.then((r) => r.text())
		.then((csv) => csvtojson().fromString(csv))
		.then((d) => d.sort((a, b) => b['Added on'].localeCompare(a['Added on'])));

	const whiskies: Whisky[] = [];

	for (const data of list) {
		const photo = `https://static.whiskybase.com/storage/whiskies/${data['ID'][0]}/${
			data['ID'][1]
		}/${data['ID'].slice(2)}/${data['Photo']}-big.jpg`;
		whiskies.push({
			id: data['ID'],
			title: [data['Brand'], data['Name']].filter((x) => x).join(' '),
			photo,
			href: `https://www.whiskybase.com/whiskies/whisky/${data['ID']}`,
			rating: Math.ceil(+data['My rating'] / 20), // Make it 0 - 5 range
			added: data['Added on'].split(' ')[0],
			placeholder: await getPlaceholderDataUri(photo)
		});
	}

	return whiskies;
};
