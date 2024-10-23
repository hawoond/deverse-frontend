<script lang="ts">
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
  
    export let content: string;
  
    $: sanitizedHtml = DOMPurify.sanitize(marked(content));
  </script>
  
  <div class="prose max-w-none">
    {@html sanitizedHtml}
  </div>