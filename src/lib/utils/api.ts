// src/lib/utils/api.ts

import { auth } from '$lib/stores/auth';
import sampleData from '$lib/sampleData.json';

const API_BASE_URL = 'http://localhost:8080/api'; // 실제 API URL로 변경해야 합니다.

interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostSummary {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  authorId: string;
  createdAt: string;
}

interface UpdateBlogPostData {
  title?: string;
  content?: string;
  thumbnail?: File | null;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'author' | 'user';
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  
  const authState = auth.get();
  if (authState.isAuthenticated && authState.user) {
    headers.set('Authorization', `Bearer ${authState.user.token}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    // API 호출 실패 시 샘플 데이터 반환
    return new Response(JSON.stringify(sampleData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function checkUserPermission(userId: string, action: 'create' | 'edit'): boolean {
  const user = sampleData.users.find(u => u.id === userId);
  if (!user) return false;
  if (action === 'create') return user.role === 'author';
  if (action === 'edit') return user.role === 'author';
  return false;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchWithAuth('/blog');
  const data = await response.json();
  return data.blogPosts || [];
}

export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  const response = await fetchWithAuth(`/blog/${id}`);
  const data = await response.json();
  return data.blogPosts?.find((post: BlogPost) => post.id === id) || null;
}

export async function createBlogPost(postData: { title: string; content: string; thumbnail: File | null }): Promise<BlogPost | null> {
  const authState = auth.get();
  if (!authState.isAuthenticated || !authState.user) {
    throw new Error('User not authenticated');
  }

  if (!checkUserPermission(authState.user.id, 'create')) {
    throw new Error('User does not have permission to create blog posts');
  }

  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  if (postData.thumbnail) {
    formData.append('thumbnail', postData.thumbnail);
  }

  const response = await fetchWithAuth('/blog', {
    method: 'POST',
    body: formData
  });

  return response.json();
}

export async function updateBlogPost(id: string, postData: UpdateBlogPostData): Promise<BlogPost | null> {
  const authState = auth.get();
  if (!authState.isAuthenticated || !authState.user) {
    throw new Error('User not authenticated');
  }

  if (!checkUserPermission(authState.user.id, 'edit')) {
    throw new Error('User does not have permission to edit blog posts');
  }

  const formData = new FormData();
  
  if (postData.title !== undefined) {
    formData.append('title', postData.title);
  }
  if (postData.content !== undefined) {
    formData.append('content', postData.content);
  }
  if (postData.thumbnail !== undefined) {
    if (postData.thumbnail === null) {
      formData.append('remove_thumbnail', 'true');
    } else {
      formData.append('thumbnail', postData.thumbnail);
    }
  }

  const response = await fetchWithAuth(`/blog/${id}`, {
    method: 'PUT',
    body: formData
  });

  return response.json();
}

export async function fetchRecentPosts(limit: number = 5): Promise<BlogPostSummary[]> {
  const response = await fetchWithAuth(`/blog/recent?limit=${limit}`);
  const data = await response.json();
  return (data.blogPosts || []).slice(0, limit).map((post: BlogPost) => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.substring(0, 100) + '...',
    thumbnail: post.thumbnail,
    authorId: post.authorId,
    createdAt: post.createdAt
  }));
}

export async function fetchRecentNews(limit: number = 5): Promise<NewsItem[]> {
  const response = await fetchWithAuth(`/news/recent?limit=${limit}`);
  const data = await response.json();
  return (data.recentNews || []).slice(0, limit);
}

export async function getCurrentUser(): Promise<User | null> {
  const authState = auth.get();
  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }

  const user = authState.user ? sampleData.users.find(u => u.id === authState.user?.id) : null;
  if (user) {
    return {
      ...user,
      role: user.role as 'author' | 'user'
    };
  }
  return null;
}