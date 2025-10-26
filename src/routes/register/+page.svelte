<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { auth } from '$lib/stores/auth.svelte';
	import Alert from '$lib/components/Alert.svelte';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleRegister() {
		// Validation
		if (!username || !email || !password || !passwordConfirm) {
			error = 'Please fill in all fields';
			return;
		}

		if (password !== passwordConfirm) {
			error = 'Passwords do not match';
			return;
		}

		if (password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}

		loading = true;
		error = '';

		try {
			// Create the user
			await auth.register(username, email, password, passwordConfirm);

			// Auto-login after registration
			await auth.login(email, password);

			// Use full page reload to ensure server-side hooks can read the auth cookie
			window.location.href = `${base}/`;
		} catch (err: any) {
			console.error('Registration error:', err);
			if (err.data?.data) {
				// PocketBase validation errors
				const errors = err.data.data;
				const errorMessages = Object.entries(errors)
					.map(([field, data]: [string, any]) => `${field}: ${data.message}`)
					.join(', ');
				error = errorMessages || 'Registration failed';
			} else {
				error = err.message || 'Registration failed. Please try again.';
			}
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Register - Scientific Learning Tool</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[80vh]">
	<div class="card w-full max-w-md bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl justify-center mb-4">Create Account</h2>

			{#if error}
				<Alert type="error" message={error} />
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); handleRegister(); }} class="space-y-4">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						id="username"
						type="text"
						placeholder="Choose a username"
						class="input input-bordered"
						bind:value={username}
						disabled={loading}
						required
						minlength="3"
					/>
				</div>

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						id="email"
						type="email"
						placeholder="Enter your email"
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
						placeholder="Enter a password (min 8 characters)"
						class="input input-bordered"
						bind:value={password}
						disabled={loading}
						required
						minlength="8"
					/>
				</div>

				<div class="form-control">
					<label class="label" for="passwordConfirm">
						<span class="label-text">Confirm Password</span>
					</label>
					<input
						id="passwordConfirm"
						type="password"
						placeholder="Confirm your password"
						class="input input-bordered"
						bind:value={passwordConfirm}
						disabled={loading}
						required
						minlength="8"
					/>
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary" disabled={loading}>
						{#if loading}
							<span class="loading loading-spinner"></span>
							Creating account...
						{:else}
							Register
						{/if}
					</button>
				</div>
			</form>

			<div class="divider">OR</div>

			<div class="text-center">
				<p class="text-sm">
					Already have an account?
					<a href="/login" class="link link-primary">Login here</a>
				</p>
			</div>
		</div>
	</div>
</div>
