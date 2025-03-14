<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from './Avatar.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { LogIn, LogOut } from 'lucide-svelte';
	import { authClient } from '$lib/auth-client';
	const { user } = $props();
</script>

<div class=" z-50 fixed top-0 left-0 w-full flex bg-red-500">
	<div
		class="    bg-secondary dark:bg-secondary-dark flex items-center justify-between h-[10vh] w-full px-5 border-b-2 border-black"
	>
		<p class=" text-primary text-3xl font-bold rounded">PerkFiles.</p>

		<div class="flex gap-2 items-center">
			<ThemeSwitch />
			{#if user}
				<Avatar image={user.image} alt={user.name} />
				<button
					onclick={async () => {
						try {
							const { data, error } = await authClient.signOut();
							if (data) {
								window.location = '/login';
							}
						} catch (error) {
							console.log(error);
						}
					}}
					class=" flex justify-center items-center rounded shadow-[2px_2px_#000000] hover:translate-[2px] hover:shadow-none transition ease-in-out cursor-pointer p-2 border-[2px] border-dark w-8 h-8"
				>
					<LogOut class="dark:text-secondary" />
				</button>
			{:else}
				<button
					onclick={() => goto('/login')}
					class=" flex justify-center items-center rounded shadow-[2px_2px_#000000] hover:translate-[2px] hover:shadow-none transition ease-in-out cursor-pointer p-2 border-[2px] border-dark w-8 h-8"
				>
					<LogIn class="dark:text-secondary" />
				</button>
			{/if}
		</div>
	</div>
</div>
