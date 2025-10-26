<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { auth } from '$lib/stores/auth.svelte';
	import type { PageData } from './$types';
	import type { QuizQuestion } from '$lib/utils/data';

	let { data }: { data: PageData } = $props();

	// Quiz state
	let shuffledQuestions = $state<QuizQuestion[]>([]);
	let userAnswers = $state<Record<number, number>>({});
	let submitted = $state(false);
	let score = $state(0);
	let loading = $state(false);

	// Shuffle questions on mount
	onMount(() => {
		shuffledQuestions = [...data.quiz.questions].sort(() => Math.random() - 0.5);
	});

	function selectAnswer(questionId: number, optionId: number) {
		if (submitted) return;
		userAnswers[questionId] = optionId;
	}

	async function submitQuiz() {
		// Check all questions are answered
		const allAnswered = shuffledQuestions.every((q) => userAnswers[q.id] !== undefined);
		if (!allAnswered) {
			alert('Please answer all questions before submitting');
			return;
		}

		loading = true;

		// Calculate score
		let correct = 0;
		shuffledQuestions.forEach((question) => {
			const selectedOptionId = userAnswers[question.id];
			const selectedOption = question.answers.find((o) => o.id === selectedOptionId);
			if (selectedOption?.correct) {
				correct++;
			}
		});

		const percentage = (correct / shuffledQuestions.length) * 100;
		score = Math.round(percentage);

		// Save to PocketBase if logged in
		if (auth.isAuthenticated && auth.user) {
			try {
				await pb.collection('smlt_quiz_results').create({
					user: auth.user.id,
					quiz_id: data.quiz.id,
					score: score,
					answers: userAnswers,
					completed_at: new Date().toISOString()
				});
			} catch (err) {
				console.error('Error saving quiz result:', err);
			}
		} else {
			// Save to localStorage for anonymous users
			const anonymousResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
			anonymousResults.push({
				quiz_id: data.quiz.id,
				score: score,
				answers: userAnswers,
				completed_at: new Date().toISOString()
			});
			localStorage.setItem('quiz_results', JSON.stringify(anonymousResults));
		}

		submitted = true;
		loading = false;
	}

	function retryQuiz() {
		userAnswers = {};
		submitted = false;
		score = 0;
		shuffledQuestions = [...data.quiz.questions].sort(() => Math.random() - 0.5);
	}
</script>

<svelte:head>
	<title>{data.quiz.title} - Scientific Learning Tool</title>
	<meta name="description" content={data.quiz.description} />
</svelte:head>

<div class="max-w-4xl mx-auto">
	{#if !submitted}
		<!-- Quiz Form -->
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<h1 class="card-title text-3xl mb-2">{data.quiz.title}</h1>
				<p class="text-lg mb-6">{data.quiz.description}</p>

				<div class="alert alert-info mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current shrink-0 w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 class="font-bold">Quiz Instructions:</h3>
						<p>
							This quiz contains {shuffledQuestions.length} questions. Select your answer for each
							question and click "Submit Quiz" when finished.
						</p>
					</div>
				</div>

				<form
					onsubmit={(e) => {
						e.preventDefault();
						submitQuiz();
					}}
					class="space-y-8"
				>
					{#each shuffledQuestions as question, index}
						<div class="card bg-base-100">
							<div class="card-body">
								<h3 class="font-bold text-lg mb-4">
									Question {index + 1}: {question.text}
								</h3>
								<div class="space-y-2">
									{#each question.answers as option}
										<label class="label cursor-pointer justify-start gap-4 hover:bg-base-200 p-3 rounded-lg transition">
											<input
												type="radio"
												name="question-{question.id}"
												value={option.id}
												class="radio radio-primary"
												checked={userAnswers[question.id] === option.id}
												onchange={() => selectAnswer(question.id, option.id)}
											/>
											<span class="label-text text-base">{option.text}</span>
										</label>
									{/each}
								</div>
							</div>
						</div>
					{/each}

					<div class="card-actions justify-between mt-8">
						<a href="/lesson/{data.quiz.lesson_id}" class="btn btn-outline">
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
							Return to Lesson
						</a>
						<button type="submit" class="btn btn-primary btn-lg" disabled={loading}>
							{#if loading}
								<span class="loading loading-spinner"></span>
								Submitting...
							{:else}
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
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Submit Quiz
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<!-- Quiz Results -->
		<div class="space-y-6">
			<div class="card bg-success text-success-content shadow-xl">
				<div class="card-body text-center">
					<h2 class="card-title text-4xl justify-center mb-4">Quiz Complete!</h2>
					<div class="text-6xl font-bold mb-4">{score}%</div>
					<p class="text-xl">
						You answered {Math.round((score / 100) * shuffledQuestions.length)} out of {shuffledQuestions.length}
						questions correctly
					</p>
					{#if !auth.isAuthenticated}
						<div class="alert alert-warning mt-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span>
								<a href="/register" class="link">Create an account</a> to save your quiz results and track
								your progress!
							</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Answer Review -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Review Your Answers</h3>
					<div class="space-y-6">
						{#each shuffledQuestions as question, index}
							{@const selectedOptionId = userAnswers[question.id]}
							{@const selectedOption = question.answers.find((o) => o.id === selectedOptionId)}
							{@const correctOption = question.answers.find((o) => o.correct)}
							{@const isCorrect = selectedOption?.correct}

							<div class="card bg-base-100 {isCorrect ? 'border-2 border-success' : 'border-2 border-error'}">
								<div class="card-body">
									<h4 class="font-bold text-lg mb-3">
										Question {index + 1}: {question.text}
									</h4>

									<div class="space-y-2">
										{#each question.answers as option}
											{@const isSelected = option.id === selectedOptionId}
											{@const isCorrectAnswer = option.correct}

											<div
												class="p-3 rounded-lg {isSelected && isCorrectAnswer
													? 'bg-success text-success-content'
													: isSelected && !isCorrectAnswer
														? 'bg-error text-error-content'
														: isCorrectAnswer
															? 'bg-success/20'
															: 'bg-base-200'}"
											>
												<div class="flex items-center gap-2">
													{#if isSelected}
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
																d="M13 5l7 7-7 7M5 5l7 7-7 7"
															/>
														</svg>
														<span class="font-semibold">Your answer:</span>
													{/if}
													{#if isCorrectAnswer && !isSelected}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-5 w-5 text-success"
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
														<span class="font-semibold">Correct answer:</span>
													{/if}
													<span>{option.text}</span>
												</div>
											</div>
										{/each}
									</div>

									{#if correctOption?.explanation}
										<div class="alert alert-info mt-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												class="stroke-current shrink-0 w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<div>
												<h4 class="font-bold">Explanation:</h4>
												<p>{correctOption.explanation}</p>
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Actions -->
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<div class="flex flex-wrap gap-4 justify-center">
						<button onclick={retryQuiz} class="btn btn-primary">
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
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							Retry Quiz
						</button>

						{#if data.quiz.next_lesson_id}
							<a href="/lesson/{data.quiz.next_lesson_id}" class="btn btn-secondary">
								Continue to Next Lesson
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
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</a>
						{/if}

						<a href="/" class="btn btn-outline">
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
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							Back to Home
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
