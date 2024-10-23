<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let isMenuOpen = false;
  let isMobile = false;
  let activeMenuItem = '';

  function logout() {
    auth.logout();
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function checkMobile() {
    isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      isMenuOpen = false;
    } else {
      activeMenuItem = '';
    }
  }

  function handleMenuClick(menuItem: string) {
    if (!isMobile) {
      activeMenuItem = activeMenuItem === menuItem ? '' : menuItem;
    } else {
      isMenuOpen = false;
    }
  }

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });
</script>

<header class="header" class:active={!isMobile && activeMenuItem}>
  <div class="header-container">
    <div class="header-logo-container">
      <a href="/" class="header-logo">Deverse</a>
      {#if !isMobile && activeMenuItem}
        <div class="active-menu-item" transition:slide>
          {activeMenuItem}
        </div>
      {/if}
    </div>
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      {#if isMenuOpen}
        ✕
      {:else}
        ☰
      {/if}
    </button>
    <nav class="header-nav" class:open={isMenuOpen || !isMobile}>
      <ul>
        <li><a href="/blog" class:active={$page.url.pathname.startsWith('/blog')} on:click={() => handleMenuClick('Blog')}>Blog</a></li>
        <li>
          <a href="/community" class:active={$page.url.pathname.startsWith('/community')} on:click={() => handleMenuClick('Community')}>Community</a>
        </li>
        <li><a href="/wiki" class:active={$page.url.pathname.startsWith('/wiki')} on:click={() => handleMenuClick('Wiki')}>Wiki</a></li>
        <li><a href="/news" class:active={$page.url.pathname.startsWith('/news')} on:click={() => handleMenuClick('News')}>News</a></li>
        {#if $auth.isAuthenticated}
          <li><button on:click={() => { logout(); handleMenuClick(''); }}>Logout</button></li>
        {:else}
          <li><a href="/login" on:click={() => handleMenuClick('Login')}>Login</a></li>
        {/if}
      </ul>
    </nav>
  </div>
</header>