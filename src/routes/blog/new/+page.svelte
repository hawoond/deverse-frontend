<script lang="ts">
	import { goto } from '$app/navigation';
	import { createBlogPost } from '$lib/utils/api';
	import type { BlogPost } from '$lib/types';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import HTMLEditor from '$lib/components/HTMLEditor.svelte';

	let title = '';
	let content = '';
	let thumbnail: File | null = null;
	let error: string | null = null;
	let editorMode: 'markdown' | 'html' = 'markdown';

	async function handleSubmit() {
		try {
			const newPost = await createBlogPost({ title, content, thumbnail });
			if (newPost) {
				goto(`/blog/${newPost.id}`);
			} else {
				throw new Error('Failed to create blog post');
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'An unknown error occurred';
		}
	}

	function handleThumbnailChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			thumbnail = target.files[0];
		}
	}

	function toggleEditorMode() {
		editorMode = editorMode === 'markdown' ? 'html' : 'markdown';
	}
</script>

<svelte:head>
	<title>Create New Blog Post - Deverse</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8">Create New Blog Post</h1>

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<div class="form-group">
			<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
			<input type="text" id="title" bind:value={title} required class="form-control" />
		</div>

		<div class="form-group">
			<label for="thumbnail" class="block text-sm font-medium text-gray-700">Thumbnail</label>
			<input
				type="file"
				id="thumbnail"
				accept="image/*"
				on:change={handleThumbnailChange}
				class="form-control"
			/>
		</div>

		<div class="form-group">
			<div class="flex justify-between mb-2">
				<button type="button" on:click={toggleEditorMode} class="btn">
					Switch to {editorMode === 'markdown' ? 'HTML' : 'Markdown'} Editor
				</button>
			</div>

			{#if editorMode === 'markdown'}
				<MarkdownEditor bind:value={content} />
			{:else}
				<HTMLEditor bind:value={content} />
			{/if}
		</div>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<button type="submit" class="btn"> Create Post </button>
	</form>
</main>
