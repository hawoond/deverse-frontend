<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth';
  import { api } from '$lib/utils/api';

  interface BlogPost {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    author: string;
  }

  let posts: BlogPost[] = [];
  let viewMode = writable('grid');

  onMount(async () => {
    try {
      posts = await api.getBlogPosts();
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    }
  });

  function toggleViewMode() {
    viewMode.update(mode => mode === 'grid' ? 'list' : 'grid');
  }

  function createNewPost() {
    goto('/blog/new');
  }
</script>

<svelte:head>
  <title>Blog - DevCommunity</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold">Blog Posts</h1>
    <div>
      <button on:click={toggleViewMode} class="mr-4 px-4 py-2 bg-gray-200 rounded">
        {$viewMode === 'grid' ? 'List View' : 'Grid View'}
      </button>
      {#if $auth.isAuthenticated && $auth.user?.roles.includes('author')}
        <button on:click={createNewPost} class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create New Post
        </button>
      {/if}
    </div>
  </div>

  <div class={$viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
    {#each posts as post}
      <div class={$viewMode === 'grid' ? 'bg-white rounded-lg shadow-md overflow-hidden' : 'bg-white rounded-lg shadow-md overflow-hidden flex'}>
        <img src={post.thumbnail} alt={post.title} class={$viewMode === 'grid' ? 'w-full h-48 object-cover' : 'w-1/3 h-48 object-cover'}>
        <div class={$viewMode === 'grid' ? 'p-4' : 'p-4 w-2/3'}>
          <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
          <p class="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
          <a href={`/blog/${post.id}`} class="text-blue-600 hover:underline">Read more</a>
        </div>
      </div>
    {/each}
  </div>
</div>