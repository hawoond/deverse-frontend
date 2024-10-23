<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let isMenuOpen = false;
  let isMobile = false;

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
    }
  }

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });
</script>

<header class="header">
  <div class="header-container">
    <a href="/" class="header-logo">Deverse</a>
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      {#if isMenuOpen}
        ✕
      {:else}
        ☰
      {/if}
    </button>
    <nav class="header-nav" class:open={isMenuOpen || !isMobile}>
      <ul>
        {#each ['Blog', 'Community', 'Wiki', 'News'] as item}
          <li>
            <a
              href={`/${item.toLowerCase()}`}
              class:active={$page.url.pathname.startsWith(`/${item.toLowerCase()}`)}
            >
              {item}
            </a>
          </li>
        {/each}
        {#if $auth.isAuthenticated}
          <li><button on:click={logout}>Logout</button></li>
        {:else}
          <li><a href="/login">Login</a></li>
        {/if}
      </ul>
    </nav>
  </div>
</header>

<style>
  .header {
    background-color: var(--primary-color);
    color: var(--primary-foreground-color);
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .header-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-foreground-color);
    text-decoration: none;
  }

  .header-nav ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .header-nav a, .header-nav button {
    color: var(--primary-foreground-color);
    text-decoration: none;
    font-weight: 500;
  }

  .header-nav a:hover, .header-nav button:hover {
    opacity: 0.8;
  }

  .header-nav .active {
    font-weight: bold;
    text-decoration: underline;
  }

  .menu-toggle {
    display: none;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
      background: none;
      border: none;
      color: var(--primary-foreground-color);
      font-size: 1.5rem;
      cursor: pointer;
    }

    .header-nav {
      display: none;
    }

    .header-nav.open {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--primary-color);
      padding: 1rem;
    }

    .header-nav ul {
      flex-direction: column;
    }

    .header-nav li {
      margin-bottom: 0.5rem;
    }
  }
</style>