<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import { onMount } from 'svelte';
    import '$styles/login.css';

	let email = '';
	let password = '';
	let error: string | null = null;
	let isLoading = false;

	onMount(() => {
		// 이미 로그인된 사용자는 홈페이지로 리다이렉트
		if (auth.get().isAuthenticated) {
			goto('/');
		}
	});

	async function handleSubmit() {
		error = null;
		isLoading = true;

		if (!email || !password) {
			error = '이메일과 비밀번호를 모두 입력해주세요.';
			isLoading = false;
			return;
		}

		try {
			// 실제 API 호출 대신 임시로 더미 데이터 사용
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연

			if (email === 'test@example.com' && password === 'password') {
				auth.login({
					id: '1',
					name: 'Test User',
					email: 'test@example.com',
					token: 'dummy-token',
					role: 'author'
				});
				goto('/');
			} else {
				error = '이메일 또는 비밀번호가 올바르지 않습니다.';
			}
		} catch (e) {
			error = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>로그인 - Deverse</title>
</svelte:head>

<main class="login-container">
	<h1 class="login-title">로그인</h1>

	<form on:submit|preventDefault={handleSubmit} class="login-form">
		<div class="form-group">
			<label for="email">이메일</label>
			<input type="email" id="email" bind:value={email} required />
		</div>

		<div class="form-group">
			<label for="password">비밀번호</label>
			<input type="password" id="password" bind:value={password} required />
		</div>

		{#if error}
			<p class="error-message">{error}</p>
		{/if}

		<button type="submit" class="login-button" disabled={isLoading}>
			{isLoading ? '로그인 중...' : '로그인'}
		</button>
	</form>

	<p class="register-link">
		계정이 없으신가요? <a href="/register">회원가입</a>
	</p>
</main>
