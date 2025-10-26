import { loadLesson, loadLessons } from '$lib/utils/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const lessonId = parseInt(params.id);
	const lesson = await loadLesson(lessonId, fetch);

	if (!lesson) {
		throw error(404, 'Lesson not found');
	}

	// Find prev/next lessons
	const allLessons = await loadLessons(fetch);
	const lessonIds = allLessons.map((l) => l.id);
	const currentIndex = lessonIds.indexOf(lessonId);

	const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
	const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

	return {
		lesson,
		prevLesson,
		nextLesson
	};
};
