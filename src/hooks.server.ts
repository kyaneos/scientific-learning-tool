import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	// Initialize PocketBase instance for this request
	event.locals.pb = new PocketBase('https://sciminds.cloud');

	// Load the auth store from the cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// Get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('smlt_users').authRefresh();
		}
	} catch (_) {
		// Clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	// Store the user in locals for easy access
	event.locals.user = structuredClone(event.locals.pb.authStore.record);

	const response = await resolve(event);

	// Send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
