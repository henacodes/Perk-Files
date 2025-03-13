<script>
	import { browser } from '$app/environment';
	import PostCard from '$components/PostCard.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		if (browser) {
			if (data.files) {
				localStorage.setItem('file-cart', JSON.stringify(data.files));
			}
		}
	});
</script>

<div class=" bg-primary/10 dark:bg-secondary-dark">
	<div class=" w-full grid md:grid-cols-2 lg:grid-cols-3 gap-1">
		{#each data.files as file}
			<PostCard {file} />
		{/each}
	</div>
</div>
