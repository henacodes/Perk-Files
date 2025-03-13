<script lang="ts">
	import '../app.css';
	import Alert from '$components/Alert.svelte';
	import { getAlert } from '$state/uiState.svelte';
	import Navbar from '$components/Navbar.svelte';
	let { children } = $props();
</script>

<div class=" ">
	<div
		class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
	></div>

	<Navbar />

	{@render children()}
</div>

{#if getAlert()}
	<Alert />
{/if}
