<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    import { api } from '$lib/utils/api';
    import { blogPostStore } from '$lib/stores/blogPost';
    import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
    import HTMLEditor from '$lib/components/HTMLEditor.svelte';
  
    let title = '';
    let content = '';
    let editorMode = 'markdown';
  
    $: post = $blogPostStore;
  
    onMount(async () => {
      const slug = $page.params.slug;
      if (slug !== 'new') {
        try {
          const postData = await api.getBlogPost(slug);
          blogPostStore.setPost(postData);
        } catch (error) {
          console.error('Failed to fetch blog post:', error);
        }
      } else {
        blogPostStore.clearPost();
      }
    });
  
    $: if (post) {
      title = post.title;
      content = post.content;
    }
  
    function toggleEditorMode() {
      editorMode = editorMode === 'markdown' ? 'html' : 'markdown';
    }
  
    async function handleSubmit() {
      const slug = $page.params.slug;
      try {
        let updatedPost;
        if (slug === 'new') {
          updatedPost = await api.createBlogPost({ title, content });
        } else {
          updatedPost = await api.updateBlogPost(slug, { title, content });
        }
        blogPostStore.setPost(updatedPost);
        goto(`/blog/${updatedPost.id}`);
      } catch (error) {
        console.error('Failed to save blog post:', error);
      }
    }
  
    function handleTitleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      title = target.value;
      blogPostStore.updatePost({ title });
    }
  
    function handleContentChange(newContent: string) {
      content = newContent;
      blogPostStore.updatePost({ content });
    }
  </script>
  
  <svelte:head>
    <title>{$page.params.slug === 'new' ? 'Create' : 'Edit'} Blog Post - DevCommunity</title>
  </svelte:head>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{$page.params.slug === 'new' ? 'Create' : 'Edit'} Blog Post</h1>
  
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div>
        <label for="title" class="block text-sm  font-medium text-gray-700">Title</label>
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
        {$page.params.slug === 'new' ? 'Create' : 'Save'} Post
      </button>
    </form>
  </div>