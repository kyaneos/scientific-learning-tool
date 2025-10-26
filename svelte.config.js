import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';

// Dynamically load courses, lessons, and quizzes to generate prerender entries
const courses = JSON.parse(readFileSync('static/data/courses.json', 'utf-8'));
const lessons = JSON.parse(readFileSync('static/data/lessons.json', 'utf-8'));
const quizzes = JSON.parse(readFileSync('static/data/quizzes.json', 'utf-8'));

const prerenderEntries = [
	'*',
	...courses.map((c) => `/course/${c.id}`),
	...lessons.map((l) => `/lesson/${l.id}`),
	...quizzes.map((q) => `/quiz/${q.id}`)
];

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
			entries: prerenderEntries
		}
	}
};

export default config;
