import { loadCourses } from '$lib/utils/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const courses = await loadCourses(fetch);

	return {
		courses
	};
};
