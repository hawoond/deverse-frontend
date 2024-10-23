<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/utils/api';
  import { blogPostStore } from '$lib/stores/blogPost';
  import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
  import HTMLEditor from '$lib/components/HTMLEditor.svelte';

  let title = '';
  let content = '';
  let editorMode = 'markdown';

  onMount(() => {
    blogPostStore.clearPost();
  });

  function toggleEditorMode() {
    editorMode = editorMode === 'markdown' ? 'html' : 'markdown';
  }

  async function handleSubmit() {
    try {
      const newPost = await api.createBlogPost({ title, content });
      blogPostStore.setPost(newPost);
      goto(`/blog/${newPost.id}`);
    } catch (error) {
      console.error('Failed to create blog post:', error);
    }
  }

  function handleTitleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    title = target.value;
  }

  function handleContentChange(newContent: string) {
    content = newContent;
  }
</script>

<svelte:head>
  <title>Create New Blog Post - DevCommunity</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Create New Blog Post</h1>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        id="title"
        bind:value={title}
        on:input={handleTitleChange}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>

    <div>
      <button type="button" on:click={toggleEditorMode} class="mb-2 px-4 py-2 bg-gray-200 rounded">
        Switch to {editorMode === 'markdown' ? 'HTML' : 'Markdown'} Editor
      </button>
      {#if editorMode === 'markdown'}
        <MarkdownEditor bind:value={content} on:input={() => handleContentChange(content)} />
      {:else}
        <HTMLEditor bind:value={content} on:change={(e) => handleContentChange(e.detail.content)} />
      {/if}
    </div>

    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Create Post
    </button>
  </form>
</div>