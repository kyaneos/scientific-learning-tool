<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Chart, registerables } from 'chart.js';
	import { auth } from '$lib/stores/auth.svelte';
	import { pb } from '$lib/pocketbase';
	import { loadLessons, loadQuizzes } from '$lib/utils/data';

	Chart.register(...registerables);

	let loading = $state(true);
	let progress = $state<any[]>([]);
	let quizResults = $state<any[]>([]);
	let lessonsData = $state<any[]>([]);
	let quizzesData = $state<any[]>([]);
	let chartCanvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(async () => {
		// Check authentication
		if (!auth.isAuthenticated || !auth.user) {
			goto('/login');
			return;
		}

		try {
			// Load static data
			[lessonsData, quizzesData] = await Promise.all([loadLessons(), loadQuizzes()]);

			// Fetch user's progress and quiz results from PocketBase
			[progress, quizResults] = await Promise.all([
				pb.collection('smlt_progress').getFullList({
					filter: `user="${auth.user.id}"`,
					sort: '-last_accessed'
				}),
				pb.collection('smlt_quiz_results').getFullList({
					filter: `user="${auth.user.id}"`,
					sort: '-completed_at'
				})
			]);
		} catch (err) {
			console.error('Error loading progress:', err);
		} finally {
			loading = false;
		}
	});

	// Create chart after DOM is rendered (when loading becomes false)
	$effect(() => {
		if (!loading && chartCanvas && quizResults.length > 0 && !chart) {
			const ctx = chartCanvas.getContext('2d');
			if (ctx) {
				const labels = quizResults.map((r: any) => {
					const quiz = quizzesData.find((q) => q.id === r.quiz_id);
					return quiz ? quiz.title : `Quiz ${r.quiz_id}`;
				});

				const scores = quizResults.map((r: any) => r.score);

				chart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: labels.reverse(),
						datasets: [
							{
								label: 'Quiz Scores (%)',
								data: scores.reverse(),
								backgroundColor: 'rgba(59, 130, 246, 0.5)',
								borderColor: 'rgb(59, 130, 246)',
								borderWidth: 1
							}
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							y: {
								beginAtZero: true,
								max: 100,
								ticks: {
									callback: function (value) {
										return value + '%';
									}
								}
							}
						}
					}
				});
			}
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});

	const totalLessons = $derived(lessonsData.length);
	const progressPercentage = $derived(
		totalLessons > 0 ? Math.round((progress.length / totalLessons) * 100) : 0
	);
	const averageQuizScore = $derived(
		quizResults.length > 0
			? Math.round(quizResults.reduce((sum: number, r: any) => sum + r.score, 0) / quizResults.length)
			: 0
	);
</script>

<svelte:head>
	<title>My Progress - Scientific Learning Tool</title>
</svelte:head>

{#if loading}
	<div class="flex items-center justify-center min-h-[60vh]">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{:else}
	<div class="space-y-8">
		<h1 class="text-4xl font-bold">My Progress</h1>

		<!-- Stats Overview -->
		<div class="stats stats-vertical lg:stats-horizontal shadow w-full">
			<div class="stat">
				<div class="stat-figure text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						/>
					</svg>
				</div>
				<div class="stat-title">Lessons Viewed</div>
				<div class="stat-value text-primary">{progress.length}</div>
				<div class="stat-desc">Out of {totalLessons} total lessons</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<div class="stat-title">Quizzes Taken</div>
				<div class="stat-value text-secondary">{quizResults.length}</div>
				<div class="stat-desc">Average score: {averageQuizScore}%</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-accent">
					<div class="radial-progress text-accent" style="--value:{progressPercentage};">
						{progressPercentage}%
					</div>
				</div>
				<div class="stat-title">Overall Progress</div>
				<div class="stat-value text-accent">{progressPercentage}%</div>
				<div class="stat-desc">Keep up the great work!</div>
			</div>
		</div>

		<!-- Quiz Results Chart -->
		{#if quizResults.length > 0}
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-2xl">Quiz Performance</h2>
					<div class="h-96">
						<canvas bind:this={chartCanvas}></canvas>
					</div>
				</div>
			</div>
		{/if}

		<!-- Recent Activity -->
		<div class="grid md:grid-cols-2 gap-6">
			<!-- Recent Lessons -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-2xl mb-4">Recent Lessons</h2>
					{#if progress.length > 0}
						<div class="space-y-2">
							{#each progress.slice(0, 5) as prog}
								{@const lesson = lessonsData.find((l) => l.id === prog.lesson_id)}
								{#if lesson}
									<a href="{base}/lesson/{lesson.id}" class="block p-3 hover:bg-base-300 rounded-lg transition">
										<div class="flex items-center justify-between">
											<div>
												<h3 class="font-semibold">{lesson.title}</h3>
												<p class="text-sm text-base-content/70">
													Last viewed: {new Date(prog.last_accessed).toLocaleDateString()}
												</p>
											</div>
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
										</div>
									</a>
								{/if}
							{/each}
						</div>
					{:else}
						<p class="text-base-content/70">No lessons viewed yet. Start learning!</p>
						<a href="{base}/" class="btn btn-primary mt-4">Browse Courses</a>
					{/if}
				</div>
			</div>

			<!-- Recent Quizzes -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-2xl mb-4">Recent Quiz Results</h2>
					{#if quizResults.length > 0}
						<div class="space-y-2">
							{#each quizResults.slice(0, 5) as result}
								{@const quiz = quizzesData.find((q) => q.id === result.quiz_id)}
								{#if quiz}
									<div class="p-3 bg-base-300 rounded-lg">
										<div class="flex items-center justify-between">
											<div class="flex-1">
												<h3 class="font-semibold">{quiz.title}</h3>
												<p class="text-sm text-base-content/70">
													{new Date(result.completed_at).toLocaleDateString()}
												</p>
											</div>
											<div class="text-right">
												<div
													class="text-2xl font-bold {result.score >= 70
														? 'text-success'
														: result.score >= 50
															? 'text-warning'
															: 'text-error'}"
												>
													{result.score}%
												</div>
											</div>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					{:else}
						<p class="text-base-content/70">No quizzes taken yet. Test your knowledge!</p>
						<a href="{base}/" class="btn btn-secondary mt-4">Start a Quiz</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
