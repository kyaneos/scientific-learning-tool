<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Scientific Learning Tool - Home</title>
	<meta
		name="description"
		content="Learn psychology and scientific principles through interactive lessons and quizzes"
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Hero Section -->
	<div class="hero bg-base-200 rounded-box p-8">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<img src="/svg/dual_processing.svg" alt="Dual Processing Theory" class="max-w-sm rounded-lg" />
			<div>
				<h1 class="text-5xl font-bold">Welcome to the Scientific Learning Tool</h1>
				<p class="py-6 text-xl">
					An interactive journey through psychology and scientific discovery
				</p>
				<p class="pb-4">
					This tool helps you learn about psychology and scientific inquiry using dual processing
					theory - combining visual and verbal learning to enhance understanding and retention.
				</p>
				<div class="flex gap-4">
					<a href="#courses" class="btn btn-primary">
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
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
						Start Learning
					</a>
					{#if !auth.isAuthenticated}
						<a href="/register" class="btn btn-outline">
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
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
							Create Account to Track Progress
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Courses Section -->
	<div id="courses" class="space-y-6">
		<div class="text-center">
			<h2 class="text-4xl font-bold mb-2">Available Courses</h2>
			<p class="text-lg text-base-content/70">Choose a course to begin your learning journey</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each data.courses as course}
				<CourseCard {course} />
			{/each}
		</div>
	</div>

	<!-- Info Cards -->
	<div class="grid md:grid-cols-2 gap-6 mt-8">
		<!-- About Our Learning Platform -->
		<div class="card bg-base-200">
			<div class="card-body">
				<h3 class="card-title">About Our Learning Platform</h3>
				<p>
					Our Scientific Learning Tool offers courses in the scientific method, research methods in
					psychology, and cognitive psychology. Each course provides a structured learning
					experience with quizzes to test your understanding.
				</p>
				<div class="card-actions justify-end mt-4">
					{#if auth.isAuthenticated}
						<a href="/progress" class="btn btn-primary">
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
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							View Your Progress
						</a>
					{:else}
						<a href="/login" class="btn btn-primary">
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
									d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
								/>
							</svg>
							Login to Track Progress
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Why Dual Processing Theory? -->
		<div class="card bg-base-200">
			<div class="card-body">
				<h3 class="card-title">Why Dual Processing Theory?</h3>
				<p>Dual processing theory suggests that humans process information through two parallel systems:</p>
				<ul class="list-disc list-inside space-y-2">
					<li><strong>Visual channel</strong> - processes images, diagrams, and animations</li>
					<li><strong>Verbal channel</strong> - processes written and spoken words</li>
				</ul>
				<p>
					By engaging both channels simultaneously, this learning tool helps you better understand
					and retain scientific concepts.
				</p>
			</div>
		</div>
	</div>
</div>
