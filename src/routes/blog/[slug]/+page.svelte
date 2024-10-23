<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { api } from '$lib/utils/api';
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';

  let post: any = null;
  let isAuthor = false;

  onMount(async () => {
    const slug = $page.params.slug;
    try {
      post = await api.getBlogPost(slug);
      isAuthor = $auth.isAuthenticated && $auth.user?.id === post.authorId;
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    }
  });

  function editPost() {
    goto(`/blog/${post.id}/edit`);
  }
</script>

<svelte:head>
  {#if post}
    <title>{post.title} - DevCommunity Blog</title>
  {/if}
</svelte:head>

{#if post}
  <article class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
    <div class="mb-8">
      <img src={post.thumbnail} alt={post.title} class="w-full h-64 object-cover rounded-lg">
    </div>
    <MarkdownRenderer content={post.content} />
    {#if isAuthor}
      <div class="mt-8">
        <button on:click={editPost} class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Post
        </button>
      </div>
    {/if}
  </article>
{:else}
  <div class="container mx-auto px-4 py-8">
    <p>Loading...</p>
  </div>
{/if}