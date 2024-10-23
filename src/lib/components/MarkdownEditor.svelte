<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { marked } from 'marked';
  
    export let value = '';
  
    const dispatch = createEventDispatcher();
  
    function handleInput(event: Event) {
      const target = event.target as HTMLTextAreaElement;
      value = target.value;
      dispatch('input', value);
    }
  
    $: preview = marked(value);
  </script>
  
  <div class="markdown-editor">
    <div class="flex">
      <div class="w-1/2 pr-2">
        <textarea
          bind:value
          on:input={handleInput}
          class="w-full h-64 p-2 border rounded"
          placeholder="Write your Markdown here..."
        ></textarea>
      </div>
      <div class="w-1/2 pl-2">
        <div class="preview prose max-w-none h-64 p-2 border rounded overflow-auto">
          {@html preview}
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .markdown-editor {
      width: 100%;
    }
  </style>