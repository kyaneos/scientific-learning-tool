// Utility functions for loading JSON data files

export interface Course {
	id: number;
	title: string;
	description: string;
	image: string;
	summary: string;
	lessons: number[];
}

export interface Lesson {
	id: number;
	title: string;
	summary: string;
	intro: string;
	image: string;
	quiz_id: number;
	sections: LessonSection[];
	key_takeaways: string[];
	connection_to_scientific_method?: string;
	glossary?: GlossaryTerm[];
}

export interface LessonSection {
	title: string;
	content: string;
	image?: string;
	key_points?: string[];
	example?: string;
}

export interface GlossaryTerm {
	term: string;
	definition: string;
}

export interface Quiz {
	id: number;
	title: string;
	description: string;
	lesson_id: number;
	next_lesson_id?: number;
	questions: QuizQuestion[];
}

export interface QuizQuestion {
	id: number;
	text: string; // Changed from "question" to match JSON
	answers: QuizAnswer[]; // Changed from "options" to match JSON
}

export interface QuizAnswer {
	id: number;
	text: string;
	correct: boolean;
	explanation?: string;
}

// Load courses from JSON file
export async function loadCourses(fetchFn: typeof fetch = fetch): Promise<Course[]> {
	const response = await fetchFn('/data/courses.json');
	return await response.json();
}

// Load all lessons from JSON file
export async function loadLessons(fetchFn: typeof fetch = fetch): Promise<Lesson[]> {
	const response = await fetchFn('/data/lessons.json');
	return await response.json();
}

// Load single lesson by ID
export async function loadLesson(id: number, fetchFn: typeof fetch = fetch): Promise<Lesson | null> {
	const lessons = await loadLessons(fetchFn);
	return lessons.find((l) => l.id === id) || null;
}

// Load all quizzes from JSON file
export async function loadQuizzes(fetchFn: typeof fetch = fetch): Promise<Quiz[]> {
	const response = await fetchFn('/data/quizzes.json');
	return await response.json();
}

// Load single quiz by ID
export async function loadQuiz(id: number, fetchFn: typeof fetch = fetch): Promise<Quiz | null> {
	const quizzes = await loadQuizzes(fetchFn);
	return quizzes.find((q) => q.id === id) || null;
}

// Get lessons for a specific course
export async function getCourseLessons(courseId: number, fetchFn: typeof fetch = fetch): Promise<Lesson[]> {
	const courses = await loadCourses(fetchFn);
	const lessons = await loadLessons(fetchFn);
	const course = courses.find((c) => c.id === courseId);

	if (!course) return [];

	return lessons.filter((l) => course.lessons.includes(l.id));
}
