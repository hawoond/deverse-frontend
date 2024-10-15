<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
    let posts = [
      {
        title: 'SvelteKit 시작하기',
        author: '홍길동',
        date: '2024-10-01',
        excerpt: 'SvelteKit을 사용하여 웹 애플리케이션을 빠르게 시작하는 방법에 대해 알아봅니다.',
        link: '/blog/sveltekit-start',
        thumbnail: '/images/sveltekit-thumbnail.jpg'
      },
      {
        title: 'Go 언어로 REST API 만들기',
        author: '김철수',
        date: '2024-10-05',
        excerpt: 'Go 언어와 Fiber를 사용하여 간단한 REST API를 만드는 과정을 설명합니다.',
        link: '/blog/go-rest-api',
        thumbnail: '/images/go-thumbnail.jpg'
      },
      {
        title: 'JavaScript 비동기 프로그래밍 이해하기',
        author: '이영희',
        date: '2024-10-10',
        excerpt: 'JavaScript의 비동기 프로그래밍 개념과 Promise, async/await 사용법을 다룹니다.',
        link: '/blog/js-async',
        thumbnail: '/images/js-async-thumbnail.jpg'
      }
    ];
  
    let isCardView = true;
    let gridCols = 6;
  
    function toggleView() {
      isCardView = !isCardView;
    }

    function handleGridColsChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      changeGridCols(Number(target.value));
    }

    function changeGridCols(cols: number) {
      gridCols = cols;
    }
  </script>
  
  <main class="container mx-auto px-4 mt-4">
    <h1 class="text-3xl font-bold mb-6">블로그</h1>
    <div class="flex justify-end mb-4">
      <a href="/blog/create" class="px-4 py-2 bg-[#ff6f61] text-white rounded hover:bg-[#e65c50]">블로그 등록</a>
    </div>
    <div class="flex items-center mb-6 space-x-4">
        <button on:click={toggleView} class="px-4 py-2 bg-[#ff6f61] text-white rounded">
            {isCardView ? '리스트 보기' : '카드 보기'}
          </button>
      {#if isCardView}
        <label for="grid-cols-select" class="text-white">그리드 크기:</label>
        <select id="grid-cols-select" on:change={handleGridColsChange} class="px-4 py-2 rounded bg-[#1a1a1a] text-white">
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6" selected>6x6</option>
        </select>
      {/if}
    </div>
    
    {#if isCardView}
      <div class="grid gap-6" style="grid-template-columns: repeat({gridCols}, minmax(0, 1fr));">
        {#each posts as post}
          <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={post.thumbnail} alt="{post.title}" class="w-full h-48 object-cover rounded mb-4">
            <h2 class="text-xl font-semibold mb-2 text-[#ff6f61]">
              <a href={post.link}>{post.title}</a>
            </h2>
            <p class="text-sm text-gray-400 mb-2">{post.author} &middot; {post.date}</p>
            <p class="mb-4 text-sm text-gray-300">{post.excerpt}</p>
            <a href={post.link} class="text-[#ff6f61] hover:underline">더 보기</a>
          </div>
        {/each}
      </div>
    {:else}
      <div class="space-y-4">
        {#each posts as post}
          <div class="flex items-center bg-[#1a1a1a] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={post.thumbnail} alt="{post.title}" class="w-32 h-32 object-cover rounded mr-6 self-start">
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-[#ff6f61]">
                <a href={post.link}>{post.title}</a>
              </h2>
              <p class="text-sm text-gray-400 mb-2">{post.author} &middot; {post.date}</p>
              <p class="mb-2 text-sm text-gray-300">{post.excerpt}</p>
              <a href={post.link} class="text-[#ff6f61] hover:underline">더 보기</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>
  
  <style>
    main {
      min-height: calc(100vh - 8rem); /* Adjust for Navbar and Footer height */
    }
    button {
      @apply px-4 py-2 bg-[#ff6f61] text-white rounded;
    }
    select {
      @apply px-4 py-2 rounded bg-[#1a1a1a] text-white;
    }
    img {
      @apply rounded; /* Consistent rounded corners for images */
    }
    .grid {
      display: grid;
    }
  </style>