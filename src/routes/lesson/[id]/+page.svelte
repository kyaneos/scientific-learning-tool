<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { pb } from '$lib/pocketbase';
	import { auth } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Track progress on lesson view
	onMount(async () => {
		if (auth.isAuthenticated && auth.user) {
			try {
				// Check if progress record exists
				const existing = await pb.collection('smlt_progress').getList(1, 1, {
					filter: `user="${auth.user.id}" && lesson_id=${data.lesson.id}`
				});

				if (existing.items.length === 0) {
					// Create new progress record
					await pb.collection('smlt_progress').create({
						user: auth.user.id,
						lesson_id: data.lesson.id,
						completed: false,
						last_accessed: new Date().toISOString()
					});
				} else {
					// Update existing progress record
					await pb.collection('smlt_progress').update(existing.items[0].id, {
						last_accessed: new Date().toISOString()
					});
				}
			} catch (err) {
				console.error('Error tracking progress:', err);
			}
		}
	});
</script>

<svelte:head>
	<title>{data.lesson.title} - Scientific Learning Tool</title>
	<meta name="description" content={data.lesson.summary} />
</svelte:head>

<article class="prose prose-lg max-w-none">
	<!-- Lesson Header -->
	<div class="not-prose mb-8">
		<div class="hero bg-base-200 rounded-box p-8">
			<div class="hero-content text-center">
				<div class="max-w-3xl">
					<h1 class="text-4xl font-bold mb-4">{data.lesson.title}</h1>
					<p class="text-xl text-base-content/80">{data.lesson.intro}</p>
					{#if data.lesson.image}
						<div class="mt-6">
							<img
								src="{base}/svg/{data.lesson.image}"
								alt={data.lesson.title}
								class="mx-auto max-h-64"
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Lesson Sections -->
	{#each data.lesson.sections as section}
		<section class="mb-8">
			<h2>{section.title}</h2>
			<p>{section.content}</p>

			{#if section.image}
				<div class="not-prose my-6">
					<img
						src="{base}/svg/{section.image}"
						alt={section.title}
						class="mx-auto max-h-80 rounded-lg"
					/>
				</div>
			{/if}

			{#if section.key_points && section.key_points.length > 0}
				<div class="alert alert-info my-4">
					<div>
						<h4 class="font-bold mb-2">Key Points:</h4>
						<ul>
							{#each section.key_points as point}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			{#if section.example}
				<div class="alert alert-success my-4">
					<div>
						<h4 class="font-bold mb-2">Example:</h4>
						<p class="mb-0">{section.example}</p>
					</div>
				</div>
			{/if}
		</section>
	{/each}

	<!-- Key Takeaways -->
	{#if data.lesson.key_takeaways && data.lesson.key_takeaways.length > 0}
		<div class="not-prose my-8">
			<div class="card bg-primary text-primary-content">
				<div class="card-body">
					<h3 class="card-title text-2xl">Key Takeaways</h3>
					<ul class="space-y-2">
						{#each data.lesson.key_takeaways as takeaway}
							<li class="flex items-start gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 flex-shrink-0 mt-0.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{takeaway}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/if}

	<!-- Glossary -->
	{#if data.lesson.glossary && data.lesson.glossary.length > 0}
		<div class="not-prose my-8">
			<h3 class="text-2xl font-bold mb-4">Glossary</h3>
			<div class="grid gap-4">
				{#each data.lesson.glossary as term}
					<div class="card bg-base-200">
						<div class="card-body p-4">
							<h4 class="font-bold text-lg">{term.term}</h4>
							<p class="text-base-content/80">{term.definition}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Navigation -->
	<div class="not-prose mt-12">
		<div class="flex justify-between items-center gap-4">
			<div>
				{#if data.prevLesson}
					<a href="{base}/lesson/{data.prevLesson.id}" class="btn btn-outline">
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Previous Lesson
					</a>
				{/if}
			</div>

			<div class="flex gap-2">
				{#if data.lesson.quiz_id}
					<a href="{base}/quiz/{data.lesson.quiz_id}" class="btn btn-secondary">
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
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Take Quiz
					</a>
				{/if}
			</div>

			<div>
				{#if data.nextLesson}
					<a href="{base}/lesson/{data.nextLesson.id}" class="btn btn-primary">
						Next Lesson
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
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				{:else}
					<a href="{base}/" class="btn btn-outline">
						Back to Home
					</a>
				{/if}
			</div>
		</div>
	</div>
</article>
