<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import Alert from '$lib/components/Alert.svelte';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin() {
		if (!email || !password) {
			error = 'Please enter both email and password';
			return;
		}

		loading = true;
		error = '';

		try {
			await auth.login(email, password);
			// Use full page reload to ensure server-side hooks can read the auth cookie
			window.location.href = '/';
		} catch (err: any) {
			console.error('Login error:', err);
			error = err.message || 'Invalid email or password';
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - Scientific Learning Tool</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[80vh]">
	<div class="card w-full max-w-md bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl justify-center mb-4">Login</h2>

			{#if error}
				<Alert type="error" message={error} />
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-4">
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email or Username</span>
					</label>
					<input
						id="email"
						type="text"
						placeholder="Enter your email or username"
						class="input input-bordered"
						bind:value={email}
						disabled={loading}
						required
					/>
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						class="input input-bordered"
						bind:value={password}
						disabled={loading}
						required
					/>
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary" disabled={loading}>
						{#if loading}
							<span class="loading loading-spinner"></span>
							Logging in...
						{:else}
							Login
						{/if}
					</button>
				</div>
			</form>

			<div class="divider">OR</div>

			<div class="text-center">
				<p class="text-sm">
					Don't have an account?
					<a href="/register" class="link link-primary">Register here</a>
				</p>
			</div>
		</div>
	</div>
</div>
