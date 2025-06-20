import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import sampleData from '$lib/sampleData.json';

interface User {
	id: string;
	name: string;
	email: string;
	token: string;
	role: 'author' | 'user';
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		isAuthenticated: false,
		user: null
	});

	return {
		subscribe,
		login: (user: User) => {
			set({ isAuthenticated: true, user });
			if (browser) {
				localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user }));
			}
		},
		logout: () => {
			set({ isAuthenticated: false, user: null });
			if (browser) {
				localStorage.removeItem('auth');
			}
		},
		updateUser: (updatedUser: Partial<User>) => {
			update((state) => {
				if (state.user) {
					const newUser = { ...state.user, ...updatedUser };
					const newState = { ...state, user: newUser };
					if (browser) {
						localStorage.setItem('auth', JSON.stringify(newState));
					}
					return newState;
				}
				return state;
			});
		},
		checkAuth: () => {
			if (browser) {
				const storedAuth = localStorage.getItem('auth');
				if (storedAuth) {
					set(JSON.parse(storedAuth));
				}
			}
		},
		loginWithGoogle: () => {
			const user = sampleData.users[0];
			const token = 'google-token';
			set({ isAuthenticated: true, user: { ...user, token } });
			if (browser) {
				localStorage.setItem(
					'auth',
					JSON.stringify({ isAuthenticated: true, user: { ...user, token } })
				);
			}
		},
		loginWithGitHub: () => {
			const user = sampleData.users[1] || sampleData.users[0];
			const token = 'github-token';
			set({ isAuthenticated: true, user: { ...user, token } });
			if (browser) {
				localStorage.setItem(
					'auth',
					JSON.stringify({ isAuthenticated: true, user: { ...user, token } })
				);
			}
		},
		loginWithPasskey: () => {
			const user = sampleData.users[2] || sampleData.users[0];
			const token = 'passkey-token';
			set({ isAuthenticated: true, user: { ...user, token } });
			if (browser) {
				localStorage.setItem(
					'auth',
					JSON.stringify({ isAuthenticated: true, user: { ...user, token } })
				);
			}
		},
		get: () => {
			let authState: AuthState = { isAuthenticated: false, user: null };
			subscribe((state) => {
				authState = state;
			})();
			return authState;
		}
	};
}

export const auth = createAuthStore();
