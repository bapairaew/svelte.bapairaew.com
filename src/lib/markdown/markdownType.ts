export interface Post {
	slug: string;
	title: string;
	description: string;
	keywords: string;
	publishedTime: string;
	modifiedTime: string;
}

export interface ProjectTag {
	text: string;
	type: string;
}

export interface Project {
	slug: string;
	title: string;
	subtitle: string | null;
	description: string;
	keywords: string;
	year: string | null;
	tags: ProjectTag[];
}

export interface Tool {
	text: string;
	count: number;
}

export interface FrontMatterWithPath {
	data: {
		[key: string]: any;
	};
	path: string;
}
