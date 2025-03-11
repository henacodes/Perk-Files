<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Alert from '../components/Alert.svelte';
	import { getAlert, changeAlert } from '../state/uiState.svelte';

	let { children } = $props();

	let value = $state(13);

	onMount(() => {
		const timer = setTimeout(() => {
			changeAlert('Heyyyyyyyyyyyyyyy');

			setTimeout(() => {
				changeAlert(null);
			}, 3000);
		}, 500);

		return () => clearTimeout(timer);
	});
</script>

<div class=" bg-secondary">
	{@render children()}
</div>

{#if getAlert()}
	<Alert />
{/if}
