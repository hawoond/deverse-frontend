<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
  import '$styles/editor.css';

	export let value = '';

	let editor: HTMLDivElement;
	let composing = false;

	function handleInput(event: Event) {
		const target = event.target as HTMLDivElement;
		value = target.innerText;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			setTimeout(renderMarkdown, 0);
		}
	}

	function handleCompositionStart() {
		composing = true;
	}

	function handleCompositionEnd() {
		composing = false;
		renderMarkdown();
	}

	async function renderMarkdown() {
		if (editor && !composing) {
			const lines = editor.innerText.split('\n');
			const renderedLines = await Promise.all(
				lines.map(async (line) => (await marked(line)).trim())
			);
			editor.innerHTML = renderedLines.join('<br>');
			placeCursorAtEnd(editor);
		}
	}

	function placeCursorAtEnd(element: HTMLElement) {
		const range = document.createRange();
		const selection = window.getSelection();
		range.selectNodeContents(element);
		range.collapse(false);
		selection?.removeAllRanges();
		selection?.addRange(range);
		element.focus();
	}

	onMount(() => {
		renderMarkdown();
	});
</script>

<div
	bind:this={editor}
	contenteditable="true"
	on:input={handleInput}
	on:keydown={handleKeyDown}
	on:compositionstart={handleCompositionStart}
	on:compositionend={handleCompositionEnd}
	class="markdown-editor"
	role="textbox"
	tabindex="0"
	aria-multiline="true"
></div>