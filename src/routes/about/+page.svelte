<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>About Us - Scientific Learning Tool</title>
</svelte:head>

<div class="max-w-4xl mx-auto space-y-8">
	<!-- Brain Image -->
	<div class="flex justify-center">
		<img
			src="{base}/brain.jpg"
			alt="Brain illustration"
			class="rounded-lg shadow-xl max-w-md w-full object-cover"
		/>
	</div>

	<!-- Main Description -->
	<div class="space-y-4">
		<h1 class="text-4xl font-bold">About Us</h1>
		<p class="text-lg leading-relaxed">
			The Scientific Learning Tool was developed by Justin Moran and Philip Johnson as a simple
			way for users to engage with psychology and scientific principles. It utilizes the dual
			process theory of cognitive load to present learning materials.
		</p>
	</div>

	<!-- Team Members -->
	<div class="space-y-8">
		<!-- Justin Moran -->
		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<h2 class="text-2xl font-bold">Justin Moran</h2>
				<div class="flex gap-2">
					<a
						href="https://kyaneos.github.io/"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-circle btn-sm btn-ghost"
						aria-label="Justin's Portfolio"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
							></path>
							<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
							<line x1="12" y1="22.08" x2="12" y2="12"></line>
						</svg>
					</a>
					<a
						href="https://github.com/kyaneos"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-circle btn-sm btn-ghost"
						aria-label="Justin's GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/thisisjustinmoran/"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-circle btn-sm btn-ghost"
						aria-label="Justin's LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
							/>
						</svg>
					</a>
				</div>
			</div>
			<p class="text-base-content/90">
				Researcher passionate about applying cognitive, educational, and social psychology to
				improve learning experiences and technologies. Currently a Research Scientist in Dr. Eshin
				Jolly's
				<a
					href="https://sciminds.ucsd.edu/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-primary">Sciminds Research Studio</a
				>
				at UCSD, exploring ways to blend user experience, web design, and video games with experimental
				methods and education technology, and a Research Assistant in the
				<a
					href="https://www.lime-lab-ucsd.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-primary">LIME Lab</a
				>, investigating cognition and learning across different mediums.
			</p>
		</div>

		<!-- Philip Johnson -->
		<div class="space-y-3">
			<div class="flex items-center gap-3">
				<h2 class="text-2xl font-bold">Philip Johnson</h2>
				<div class="flex gap-2">
					<a
						href="https://github.com/philip-johnson36"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-circle btn-sm btn-ghost"
						aria-label="Philip's GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/philip-johnson-7a45bb35a/"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-circle btn-sm btn-ghost"
						aria-label="Philip's LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
							/>
						</svg>
					</a>
				</div>
			</div>
			<p class="text-base-content/90">
				Philip Johnson is a code monkey (software engineer) at Roblox who also graduated from UC
				San Diego. He enjoys solving difficult problems in elegant fashion (this does not happen
				very often) and building well structured and scalable solutions.
			</p>
		</div>
	</div>

	<!-- Closing Message -->
	<div class="text-center space-y-2 pt-4">
		<p class="text-base-content/80 italic">
			Clearly we know who was serious about this and who wasn't. It's how we cope.
		</p>
		<p class="text-lg font-semibold">Enjoy the lessons!</p>
	</div>
</div>
