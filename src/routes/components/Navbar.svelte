<!-- src/components/Navbar.svelte -->
<script>
    let isMenuOpen = false;
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  </script>
  
  <nav class="bg-[#111] text-[#f5f5f5] shadow-md py-4 px-6">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">
        <a href="/">DeVerse</a>
      </div>
      <button class="lg:hidden text-white" on:click={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div class="hidden lg:flex space-x-6">
        <a href="/blog" class="hover:text-[#ff6f61]">블로그</a>
        <a href="/programs" class="hover:text-[#ff6f61]">프로그램</a>
        <a href="/community" class="hover:text-[#ff6f61]">커뮤니티</a>
        <a href="/promotions" class="hover:text-[#ff6f61]">홍보</a>
        <a href="/wiki" class="hover:text-[#ff6f61]">위키</a>
        <a href="/news" class="hover:text-[#ff6f61]">뉴스</a>
      </div>
    </div>
    {#if isMenuOpen}
      <div class="lg:hidden mt-4 space-y-2">
        <a href="/blog" class="block hover:text-[#ff6f61]">블로그</a>
        <a href="/programs" class="block hover:text-[#ff6f61]">프로그램</a>
        <a href="/community" class="block hover:text-[#ff6f61]">커뮤니티</a>
        <a href="/promotions" class="block hover:text-[#ff6f61]">홍보</a>
        <a href="/wiki" class="block hover:text-[#ff6f61]">위키</a>
        <a href="/news" class="block hover:text-[#ff6f61]">뉴스</a>
      </div>
    {/if}
  </nav>