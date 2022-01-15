import type { FrontMatterWithPath, Post, Project } from '$lib/markdown/markdownType';

export const parseProject = (project: FrontMatterWithPath): Project => {
	const frameworks = [
		'.NET',
		'Qt',
		'jQuery',
		'AngularJS',
		'Bootstrap',
		'React',
		'Node.js',
		'Socket.io',
		'Redux',
		'Next.js',
		'GraphQL',
		'Serverless',
		'React Native',
		'React Native Web',
		'Expo',
		'Serverless',
		'SWR',
		'Tailwind'
	];

	const languages = ['C#', 'Java', 'C++', 'Python', 'JavaScript', 'CSS', 'HTML', 'TypeScript'];

	const layers = ['Frontend', 'Backend'];

	const types = ['Mobile app', 'Desktop app', 'Web app'];

	const platforms = ['iOS', 'Android', 'Symbian', 'Windows Phone', 'Windows'];

	const database = ['MongoDB', 'MySQL', 'MSSQL'];

	const companies = [
		'Chulalongkorn University',
		'Microsoft',
		'Nokia',
		'SAMART',
		'M-Active',
		'ZyLab',
		'AnnTac',
		'Staples',
		'Thomson Reuters',
		'LSE',
		'Imperial College London',
		'PwC',
		'Oddle',
		'Argile'
	];

	const others = [
		'Software competition',
		'School project',
		'IEEE',
		'Publication',
		'Design system',
		'Chatbot',
		'Silverlight',
		'AWS'
	];

	const [title, subtitle] = project.data.title.split(' - ');
	const jsonTime =
		typeof project.data.publishedTime === 'string'
			? project.data.publishedTime
			: project.data.publishedTime?.toJSON?.();
	return {
		slug: project.path.split('/').pop().replace('.svx', ''),
		title,
		subtitle,
		description: project.data.description,
		keywords: project.data.keywords,
		year: jsonTime.split('-')[0],
		tags: project.data.keywords.split(', ').map((text: string) => {
			return {
				text,
				type: frameworks.includes(text)
					? 'Framework'
					: languages.includes(text)
					? 'Language'
					: layers.includes(text)
					? 'Layer'
					: types.includes(text)
					? 'App type'
					: platforms.includes(text)
					? 'Platform'
					: companies.includes(text)
					? 'Company'
					: database.includes(text)
					? 'Database'
					: 'Other'
			};
		})
	};
};

export const parsePost = (post: FrontMatterWithPath): Post => {
	return {
		slug: post.path.split('/').pop().replace('.svx', ''),
		title: post.data.title,
		description: post.data.description,
		keywords: post.data.keywords,
		publishedTime: post.data.publishedTime,
		modifiedTime: post.data.modifiedTime
	};
};
