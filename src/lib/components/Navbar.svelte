<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { auth } from '$lib/stores/auth.svelte';
</script>

<div class="navbar bg-base-300 shadow-lg">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
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
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li><a href="{base}/">Home</a></li>
				<li>
					<details>
						<summary>Courses</summary>
						<ul class="p-2">
							<li><a href="{base}/course/1">Scientific Method</a></li>
							<li><a href="{base}/course/2">Research Methods in Psychology</a></li>
							<li><a href="{base}/course/3">Introduction to Cognitive Psychology</a></li>
						</ul>
					</details>
				</li>
				{#if auth.isAuthenticated}
					<li><a href="{base}/progress">My Progress</a></li>
				{/if}
				<li><a href="{base}/about">About</a></li>
				<li><a href="{base}/references">References</a></li>
			</ul>
		</div>
		<a href="{base}/" class="btn btn-ghost text-xl">
			<img src="{base}/svg/brain_logo_side.svg" alt="Brain Logo" class="h-8 w-8" />
			Scientific Learning Tool
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="{base}/">Home</a></li>
			<li class="dropdown dropdown-hover">
				<div tabindex="0" role="button" class="btn btn-ghost">Courses</div>
				<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-64">
					<li><a href="{base}/course/1">Scientific Method</a></li>
					<li><a href="{base}/course/2">Research Methods in Psychology</a></li>
					<li><a href="{base}/course/3">Introduction to Cognitive Psychology</a></li>
				</ul>
			</li>
			{#if auth.isAuthenticated}
				<li><a href="{base}/progress">My Progress</a></li>
			{/if}
			<li><a href="{base}/about">About</a></li>
			<li><a href="{base}/references">References</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		{#if auth.isAuthenticated}
			<div class="dropdown dropdown-end dropdown-hover">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<div class="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
						<span class="text-lg font-semibold">{auth.user?.username?.[0]?.toUpperCase() || 'U'}</span>
					</div>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li class="menu-title">
						<span>{auth.user?.username}</span>
					</li>
					<li><a href="{base}/progress">My Progress</a></li>
					<li>
						<button
							type="button"
							class="w-full text-left"
							onclick={() => {
								auth.logout();
								window.location.href = `${base}/`;
							}}
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		{:else}
			<a href="{base}/login" class="btn btn-ghost">Login</a>
			<a href="{base}/register" class="btn btn-primary">Register</a>
		{/if}
	</div>
</div>
