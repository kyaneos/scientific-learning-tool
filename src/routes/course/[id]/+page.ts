import { loadCourses, getCourseLessons } from '$lib/utils/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const courseId = parseInt(params.id);
	const courses = await loadCourses(fetch);
	const course = courses.find((c) => c.id === courseId);

	if (!course) {
		throw error(404, 'Course not found');
	}

	const lessons = await getCourseLessons(courseId, fetch);

	return {
		course,
		lessons
	};
};
