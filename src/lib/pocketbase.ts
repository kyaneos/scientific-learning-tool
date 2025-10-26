import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

// Initialize PocketBase client
export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || 'https://sciminds.cloud');

// Disable auto-cancellation for better UX
pb.autoCancellation(false);

// Load auth from localStorage on client side
if (browser) {
	const authData = localStorage.getItem('pocketbase_auth');
	if (authData) {
		try {
			const parsed = JSON.parse(authData);
			pb.authStore.save(parsed.token, parsed.model);
		} catch (e) {
			console.error('Failed to restore auth:', e);
			localStorage.removeItem('pocketbase_auth');
		}
	}

	// Save auth to localStorage whenever it changes
	pb.authStore.onChange((token, model) => {
		if (token && model) {
			localStorage.setItem('pocketbase_auth', JSON.stringify({ token, model }));
		} else {
			localStorage.removeItem('pocketbase_auth');
		}
	});
}
