<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import Navbar from './components/Navbar.svelte';
    import Footer from './components/Footer.svelte';
  </script>
  
  <Navbar />
  
  <main class="container mx-auto px-4 mt-4 bg-black text-white">
    <slot />
  </main>
  
  <Footer />
  
  <style>
    main {
      min-height: calc(100vh - 8rem); /* Adjust for Navbar and Footer height */
      @apply px-4; /* Padding for consistent spacing */
      background-color: #000; /* Set main background to black */
      color: #f5f5f5; /* Set text color to light grey for contrast */
    }
    nav {
      background-color: #111; /* Darker shade for Navbar */
      color: #f5f5f5; /* Light grey text for contrast */
      padding: 1rem; /* Add padding for better spacing */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
    }
    nav a {
      color: #f5f5f5; /* Set link color to light grey */
      margin-right: 1rem; /* Space out navigation links */
      text-decoration: none;
      transition: color 0.3s ease;
    }
    nav a:hover {
      color: #ff6f61; /* Light red color for hover effect */
    }
    @media (min-width: 768px) {
      main {
        @apply px-8; /* Increase padding for larger screens */
      }
    }
  </style>