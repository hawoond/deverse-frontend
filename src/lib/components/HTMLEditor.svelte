<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Editor from '@tinymce/tinymce-svelte';
  
    export let value = '';
  
    let editorConfig = {
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar: 'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    };
  
    function handleEditorChange(event: CustomEvent) {
      value = event.detail.content;
    }
  </script>
  
  <Editor
    apiKey="your-tinymce-api-key"
    {value}
    on:change={handleEditorChange}
    conf={editorConfig}
  />