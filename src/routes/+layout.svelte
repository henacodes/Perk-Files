<script lang="ts">
	import '../app.css';
	import Alert from '$components/Alert.svelte';
	import { getAlert } from '$state/uiState.svelte';
	import Navbar from '$components/Navbar.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	import { loadTheme } from '$state/uiState.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { setCart } from '$state/cart.svelte';

	let { children, data } = $props();

	onMount(() => {
		if (browser) {
			const cartItems = localStorage.getItem('file-cart');

			if (Array.isArray(cartItems)) {
				setCart(cartItems);
			}

			loadTheme();
		}
	});
</script>

<div class=" ">
	<div
		class=" pt-16 inset-0 -z-10 h-full w-full bg-white dark:bg-secondary-dark dark:bg-[linear-gradient(to_right,#3f3f3f_1px,transparent_1px),linear-gradient(to_bottom,#3f3f3f_1px,transparent_1px)] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] transition ease-in-out"
	>
		{#if data}
			<Navbar user={data.user} />
			<div class=" ">
				{@render children()}
			</div>
		{:else}
			<LoaderCircle />
		{/if}
	</div>
</div>

{#if getAlert()}
	<Alert />
{/if}
