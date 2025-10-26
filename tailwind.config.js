import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['dark'], // Use dark theme by default
		darkTheme: 'dark',
		base: true,
		styled: true,
		utils: true
	}
};
