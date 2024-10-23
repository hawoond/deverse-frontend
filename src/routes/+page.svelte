<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchRecentPosts, fetchRecentNews } from '$lib/utils/api';
    import BlogPost from '$lib/components/BlogPost.svelte';
  
    let recentPosts = [];
    let recentNews = [];
  
    onMount(async () => {
      recentPosts = await fetchRecentPosts();
      recentNews = await fetchRecentNews();
    });
  </script>
  
  <svelte:head>
    <title>DevCommunity - Home</title>
  </svelte:head>
  
  <h1 class="text-4xl font-bold mb-8">Welcome to DevCommunity</h1>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Recent Blog Posts</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each recentPosts as post}
        <BlogPost {post} />
      {/each}
    </div>
  </section>
  
  <section>
    <h2 class="text-2xl font-semibold mb-4">Latest News</h2>
    <ul class="space-y-4">
      {#each recentNews as news}
        <li>
          <a href="/news/{news.id}" class="text-blue-600 hover:underline">{news.title}</a>
          <p class="text-sm text-gray-600">{news.summary}</p>
        </li>
      {/each}
    </ul>
  </section>