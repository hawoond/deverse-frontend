import { auth } from '$lib/stores/auth';

const API_BASE_URL = '/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = auth.getToken();
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  get: (url: string) => fetchWithAuth(url),
  post: (url: string, data: any) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url: string, data: any) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' }),

  // Blog specific API calls
  getBlogPosts: () => api.get('/blog/posts'),
  getBlogPost: (id: string) => api.get(`/blog/posts/${id}`),
  createBlogPost: (data: any) => api.post('/blog/posts', data),
  updateBlogPost: (id: string, data: any) => api.put(`/blog/posts/${id}`, data),
  deleteBlogPost: (id: string) => api.delete(`/blog/posts/${id}`),

  // Community specific API calls
  getCommunityPosts: () => api.get('/community/posts'),
  getCommunityPost: (id: string) => api.get(`/community/posts/${id}`),
  createCommunityPost: (data: any) => api.post('/community/posts', data),
  updateCommunityPost: (id: string, data: any) => api.put(`/community/posts/${id}`, data),
  deleteCommunityPost: (id: string) => api.delete(`/community/posts/${id}`),

  // Wiki specific API calls
  getWikiPages: () => api.get('/wiki/pages'),
  getWikiPage: (id: string) => api.get(`/wiki/pages/${id}`),
  createWikiPage: (data: any) => api.post('/wiki/pages', data),
  updateWikiPage: (id: string, data: any) => api.put(`/wiki/pages/${id}`, data),
  deleteWikiPage: (id: string) => api.delete(`/wiki/pages/${id}`),
};