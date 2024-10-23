import { writable } from 'svelte/store';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  return {
    subscribe,
    login: async (email: string, password: string) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });

        return data.user;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },
    checkAuth: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const data = await response.json();
        set({
          user: data.user,
          token: token,
          isAuthenticated: true,
        });

        return true;
      } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        return false;
      }
    },
    updateUser: (userData: Partial<User>) => {
      update(state => ({
        ...state,
        user: state.user ? { ...state.user, ...userData } : null,
      }));
    },
    getToken: () => {
      return localStorage.getItem('token');
    },
  };
}

export const auth = createAuthStore();