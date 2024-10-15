<!-- src/routes/blog/create/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import { tick } from 'svelte';
    import './blog-editor.css';
  
    let title = '';
    let author = ''; // 로그인 유저의 아이디로 자동 설정될 예정
    let content = '';
    let thumbnail: string | null = null;
    let images: string[] = [];
    let contentEditableDiv: HTMLDivElement;
    let resizeGridElement: HTMLDivElement;
    let isHtmlMode = false;
  
    function handleFileUpload(event: Event) {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.files) {
        for (let i = 0; i < target.files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
              images.push(e.target.result);
            }
          };
          reader.readAsDataURL(target.files[i]);
        }
      }
    }
  
    function selectThumbnail(image: string) {
      thumbnail = image;
    }
  
    function submitPost() {
      // 실제로는 API를 호출하여 게시글을 서버에 저장합니다.
      console.log({ title, author, content, thumbnail });
      alert('게시글이 등록되었습니다.');
    }
  
    async function setGridRatio(inputRatio: number, previewRatio: number) {
      await tick();
      resizeGridElement.style.gridTemplateColumns = `${inputRatio}fr ${previewRatio}fr`;
    }
  
    function toggleHtmlMode() {
      isHtmlMode = !isHtmlMode;
    }
  </script>
  
  <main class="container mx-auto px-8 mt-4">
    <h1 class="text-3xl font-bold mb-6 text-[#ff6f61]">블로그 게시글 등록</h1>
    <form on:submit|preventDefault={submitPost} class="space-y-4">
      <div>
        <label for="title" class="block text-white mb-2">제목</label>
        <input type="text" id="title" bind:value={title} class="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]" required />
      </div>
      <div>
        <label for="author" class="block text-white mb-2">작성자</label>
        <input type="text" id="author" bind:value={author} class="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]" readonly />
      </div>
      <div>
        <label for="thumbnail" class="block text-white mb-2">썸네일 선택</label>
        <input type="file" accept="image/*" on:change={handleFileUpload} class="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]" />
        <div class="mt-4 flex space-x-4">
          {#each images as image}
            <button type="button" class="w-32 h-32 bg-gray-800 rounded overflow-hidden cursor-pointer border-4 {thumbnail === image ? 'border-[#ff6f61]' : 'border-transparent'}" on:click={() => selectThumbnail(image)} aria-label="썸네일 선택">
              <img src={image} alt="썸네일 선택" class="object-cover w-full h-full" />
            </button>
          {/each}
        </div>
      </div>
      <div>
        <label for="content" class="block text-white mb-2">내용 (Markdown 및 HTML 지원)</label>
        <button type="button" on:click={toggleHtmlMode} class="px-4 py-2 mb-4 bg-[#ff6f61] rounded hover:bg-[#e65c50]">{isHtmlMode ? 'Markdown 모드' : 'HTML 모드'}</button>
        {#if !isHtmlMode}
          <div class="w-full grid resize-grid" bind:this={resizeGridElement}>
            <div class="content-input h-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]" contenteditable="true" bind:this={contentEditableDiv} on:input={(e) => { content = e.currentTarget.innerText; }}></div>
            <div class="content-preview prose prose-invert text-white border border-gray-700 rounded p-4 bg-[#1a1a1a] overflow-auto">
              {@html marked(content)}
            </div>
          </div>
        {:else}
        <div class="w-full">
          <textarea id="html-editor" bind:value={content} class="w-full h-full px-4 py-2 rounded bg-dark text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"></textarea>
        </div>
        {/if}
        </div>
    
      <div class="flex space-x-4 mt-4">
        <button type="button" on:click={() => setGridRatio(1, 1)} class="px-4 py-2 bg-[#ff6f61] rounded hover:bg-[#e65c50]">1:1 보기</button>
        <button type="button" on:click={() => setGridRatio(1, 0)} class="px-4 py-2 bg-[#ff6f61] rounded hover:bg-[#e65c50]">입력만 보기</button>
        <button type="button" on:click={() => setGridRatio(0, 1)} class="px-4 py-2 bg-[#ff6f61] rounded hover:bg-[#e65c50]">미리보기만 보기</button>
      </div>
      <button type="submit" class="px-6 py-2 bg-[#ff6f61] rounded hover:bg-[#e65c50]">등록</button>
    </form>
  </main>