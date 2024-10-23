<script lang="ts">
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import { api } from '$lib/utils/api';
  
    interface CommunityPost {
      id: string;
      title: string;
      content: string;
      author: string;
      createdAt: string;
    }
  
    let posts: CommunityPost[] = [];
  
    onMount(async () => {
      try {
        posts = await api.getCommunityPosts();
      } catch (error) {
        console.error('Failed to fetch community posts:', error);
      }
    });
  
    async function createPost(event: Event) {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const title = (form.elements.namedItem('title') as HTMLInputElement).value;
      const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
  
      try {
        const newPost = await api.createCommunityPost({ title, content });
        posts = [newPost, ...posts];
        form.reset();
      } catch (error) {
        console.error('Failed to create community post:', error);
      }
    }
  </script>
  
  <svelte:head>
    <title>Community - DevCommunity</title>
  </svelte:head>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Community</h1>
  
    {#if $auth.isAuthenticated}
      <form on:submit={createPost} class="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Create a new post</h2>
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea id="content" name="content" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Post</button>
      </form>
    {/if}
  
    <div class="space-y-6">
      {#each posts as post}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
          <p class="text-gray-600 mb-4">{post.content}</p>
          <div class="text-sm text-gray-500">
            Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      {/each}
    </div>
  </div>