<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { notify } from '$state/uiState.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let formData = {
		email: '',
		password: ''
	};

	const login = async () => {
		const { data, error } = await authClient.signIn.email({
			email: formData.email,
			password: formData.password
		});

		if (error) {
			notify('Login Failed', error.message, 'error');
			return;
		}

		window.location = 'feed';
	};

	onMount(() => {
		if (browser) {
			if (data.user) {
				//window.location = '/feed';
				goto('/feed');
			}
		}
	});
</script>

<div class="p-6 w-full flex flex-col items-center h-[90vh]">
	<p class="text-2xl font-bold text-center text-secondary">Login</p>
	<form
		action=""
		class="flex flex-col w-full bg-primary p-4 rounded-md border border-black shadow-[2px_2px_#000000] mt-5 sm:w-[55vw] md:w-2/3 lg:w-1/2 xl:w-[25vw]"
	>
		<input
			type="email"
			class=" w-full border border-black rounded-md bg-secondary/50 focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
			placeholder="Email"
			bind:value={formData.email}
		/>
		<input
			type="password"
			class=" w-full border border-black rounded-md bg-secondary/50 focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
			placeholder="password"
			bind:value={formData.password}
		/>

		<div class=" flex justify-center">
			<button
				onclick={() => login()}
				class=" py-1 px-4 bg-secondary border-[2px] transition ease-in-out border-black rounded shadow-[2px_2px_#000000] hover:translate-[2px] hover:shadow-none"
				>Login</button
			>
		</div>
	</form>
	<p class="mt-4 text-secondary/60">
		Already have an account? <a
			href="/register"
			class="   bg-primary transition ease-in-out p-1 rounded px-2 shadow-[2px_2px_#000000] border border-black scale-105 hover:scale-100 hover:shadow-none text-black"
			>Register</a
		>
	</p>
</div>
