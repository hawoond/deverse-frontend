<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
    export let params;
  
    // 임시 데이터, 실제로는 API 호출을 통해 데이터를 가져옵니다.
    let post = {
      title: 'SvelteKit 시작하기',
      author: '홍길동',
      date: '2024-10-01',
      content: `SvelteKit은 Svelte 프레임워크의 강력한 기능을 사용하여 쉽고 빠르게 웹 애플리케이션을 개발할 수 있도록 도와줍니다.
  
      이 가이드에서는 SvelteKit 프로젝트를 설정하고 기본적인 기능을 구현하는 방법을 배웁니다. 먼저 SvelteKit의 특징과 장점을 소개하고, 프로젝트 초기화부터 기본적인 페이지 라우팅, 상태 관리, 스타일링까지 설명합니다.
  
      SvelteKit은 빠르고 간편하며, SSR(Server-Side Rendering)과 CSR(Client-Side Rendering)을 모두 지원하는 최신 웹 프레임워크입니다. 이 글을 통해 SvelteKit을 사용하는 첫 단계를 시작해 보세요.`
    };
  </script>
  
  <main class="container mx-auto px-4 mt-4">
    <h1 class="text-4xl font-bold text-[#ff6f61] mb-4">{post.title}</h1>
    <p class="text-sm text-gray-400 mb-6">{post.author} &middot; {post.date}</p>
    <div class="prose prose-invert text-gray-300">
      {@html post.content}
    </div>
  </main>
  
  <style>
    main {
      min-height: calc(100vh - 8rem); /* Adjust for Navbar and Footer height */
    }
    .prose {
      max-width: 100%;
    }
  </style>