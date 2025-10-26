// Auth store using Svelte 5 runes
import { pb } from '$lib/pocketbase';
import { browser } from '$app/environment';

interface User {
	id: string;
	username: string;
	email: string;
	[key: string]: any;
}

// Wait for PocketBase to restore auth from localStorage before initializing state
let initialUser: User | null = null;
let initialAuth = false;

if (browser) {
	const authData = localStorage.getItem('pocketbase_auth');
	if (authData) {
		try {
			const parsed = JSON.parse(authData);
			initialUser = parsed.model || parsed.record;
			initialAuth = !!parsed.token;
		} catch (e) {
			console.error('Failed to parse stored auth:', e);
		}
	}
}

// Create reactive state from stored auth data
let currentUser = $state<User | null>(initialUser);
let isAuthenticated = $state(initialAuth);

// Update reactive state when PocketBase auth changes
pb.authStore.onChange((token, record) => {
	currentUser = record as User | null;
	isAuthenticated = !!token;
});

export const auth = {
	get user() {
		return currentUser;
	},
	get isAuthenticated() {
		return isAuthenticated;
	},
	login: async (email: string, password: string) => {
		return await pb.collection('smlt_users').authWithPassword(email, password);
	},
	register: async (username: string, email: string, password: string, passwordConfirm: string) => {
		const data = {
			username,
			email,
			password,
			passwordConfirm
		};
		return await pb.collection('smlt_users').create(data);
	},
	logout: () => {
		pb.authStore.clear();
	}
};
