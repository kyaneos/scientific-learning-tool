import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-static configuration for GitHub Pages
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		paths: {
			// Base path for GitHub Pages (username.github.io/repo-name)
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH || ''
		},
		prerender: {
			handleMissingId: 'warn',
			entries: [
				'*',
				'/course/1',
				'/course/2',
				'/course/3',
				'/lesson/1',
				'/lesson/2',
				'/lesson/3',
				'/lesson/4',
				'/lesson/5',
				'/lesson/6',
				'/lesson/7',
				'/quiz/1',
				'/quiz/2',
				'/quiz/3',
				'/quiz/4',
				'/quiz/5',
				'/quiz/6',
				'/quiz/7'
			]
		}
	}
};

export default config;
