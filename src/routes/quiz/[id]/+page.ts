import { loadQuiz } from '$lib/utils/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const quizId = parseInt(params.id);
	const quiz = await loadQuiz(quizId, fetch);

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	return {
		quiz
	};
};
