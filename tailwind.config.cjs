const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [typography, lineClamp]
};

module.exports = config;
