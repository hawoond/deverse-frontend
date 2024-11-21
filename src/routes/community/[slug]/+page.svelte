<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import '$styles/community.css';
  
    interface Post {
      id: string;
      title: string;
      author: string;
      createdAt: string;
      commentCount: number;
    }
  
    let boardName = '';
    let posts: Post[] = [];
    let isLoading = true;
    let error: string | null = null;
  
    $: boardId = $page.params.slug;
  
    onMount(async () => {
      try {
        const [boardResponse, postsResponse] = await Promise.all([
          fetch(`/api/boards/${boardId}`),
          fetch(`/api/boards/${boardId}/posts`)
        ]);
  
        if (!boardResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to fetch board data');
        }
  
        const boardData = await boardResponse.json();
        boardName = boardData.name;
        posts = await postsResponse.json();
      } catch (e) {
        error = (e as Error).message;
      } finally {
        isLoading = false;
      }
    });
  
    function formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  </script>
  
  <svelte:head>
    <title>{boardName || '게시판'} - Deverse</title>
  </svelte:head>
  
  <div class="board-container">
    <h1>{boardName || '게시판'}</h1>
  
    {#if isLoading}
      <p>게시글을 불러오는 중...</p>
    {:else if error}
      <p class="error">오류 발생: {error}</p>
    {:else}
      <table class="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>댓글</th>
          </tr>
        </thead>
        <tbody>
          {#each posts as post (post.id)}
            <tr class="post-item">
              <td class="post-title">{post.title}</td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>{post.commentCount}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>