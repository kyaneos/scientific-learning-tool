<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.course.title} - Scientific Learning Tool</title>
	<meta name="description" content={data.course.description} />
</svelte:head>

<div class="space-y-8">
	<!-- Course Header -->
	<div class="hero bg-base-200 rounded-box p-8">
		<div class="hero-content flex-col lg:flex-row">
			<img
				src="{base}/svg/{data.course.image}"
				alt={data.course.title}
				class="max-w-sm rounded-lg shadow-2xl"
			/>
			<div>
				<h1 class="text-5xl font-bold">{data.course.title}</h1>
				<p class="py-6 text-xl">{data.course.summary}</p>
				<div class="badge badge-primary badge-lg">
					{data.course.lessons.length} Lessons
				</div>
			</div>
		</div>
	</div>

	<!-- Lessons List -->
	<div>
		<h2 class="text-3xl font-bold mb-6">Course Lessons</h2>
		<div class="grid gap-4">
			{#each data.lessons as lesson, index}
				<a href="{base}/lesson/{lesson.id}" class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
					<div class="card-body">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0">
								<div class="bg-primary text-primary-content w-12 h-12 rounded-full flex items-center justify-center">
									<span class="text-xl font-semibold">{index + 1}</span>
								</div>
							</div>
							<div class="flex-1">
								<h3 class="card-title">{lesson.title}</h3>
								<p class="text-base-content/70">{lesson.summary}</p>
								{#if lesson.quiz_id}
									<div class="mt-2">
										<span class="badge badge-secondary badge-sm">Includes Quiz</span>
									</div>
								{/if}
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-base-content/50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Back to Home -->
	<div class="text-center">
		<a href="{base}/" class="btn btn-outline">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to All Courses
		</a>
	</div>
</div>
