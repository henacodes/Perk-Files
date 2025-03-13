<script lang="ts">
	import '../app.css';
	import Alert from '$components/Alert.svelte';
	import { getAlert } from '$state/uiState.svelte';
	import Navbar from '$components/Navbar.svelte';
	import { loadTheme } from '$state/uiState.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children, data } = $props();

	onMount(() => {
		if (browser) {
			loadTheme();
		}
	});
</script>

<div class=" ">
	<div
		class=" inset-0 -z-10 h-full w-full bg-white dark:bg-secondary-dark dark:bg-[linear-gradient(to_right,#3f3f3f_1px,transparent_1px),linear-gradient(to_bottom,#3f3f3f_1px,transparent_1px)] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
	>
		<div class="  -z-20 fixed bg-secondary dark:bg-secondary-dark h-[100vh] w-[100vw]"></div>

		<Navbar user={data.user} />

		{@render children()}
	</div>
</div>

{#if getAlert()}
	<Alert />
{/if}
