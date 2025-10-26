<script lang="ts">
	import type { Course } from '$lib/utils/data';
	import { auth } from '$lib/stores/auth.svelte';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let { course }: { course: Course } = $props();
	let completionPercentage = $state(0);

	onMount(async () => {
		if (auth.isAuthenticated && auth.user) {
			try {
				// Get all progress records for this user
				const progressRecords = await pb.collection('smlt_progress').getFullList({
					filter: `user = "${auth.user.id}"`
				});

				// Get lesson IDs for this course
				const courseLessonIds = course.lessons.map((l) => l.id);

				// Count how many lessons in this course have been viewed
				const viewedLessons = progressRecords.filter((p) => courseLessonIds.includes(p.lesson_id));

				// Calculate percentage
				completionPercentage = Math.round((viewedLessons.length / courseLessonIds.length) * 100);
			} catch (error) {
				console.error('Error fetching progress:', error);
			}
		}
	});
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full">
	<figure class="px-10 pt-10">
		<img src="/svg/{course.image}" alt={course.title} class="rounded-xl h-32" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{course.title}</h2>
		<p>{course.description}</p>

		{#if auth.isAuthenticated && completionPercentage > 0}
			<div class="mt-4">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Progress</span>
					<span class="text-sm font-bold">{completionPercentage}%</span>
				</div>
				<progress class="progress progress-primary w-full" value={completionPercentage} max="100"></progress>
			</div>
		{/if}

		<div class="card-actions justify-end mt-4">
			<a href="/course/{course.id}" class="btn btn-primary">
				View Course
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
		<div class="text-sm text-base-content/70 mt-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 inline"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
				/>
			</svg>
			{course.lessons.length} lessons
		</div>
	</div>
</div>
