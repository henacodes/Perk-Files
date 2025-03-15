<script>
	import { browser } from '$app/environment';
	import PostCard from '$components/PostCard.svelte';
	import { getFeedFiles, setFiles } from '$state/files.svelte.js';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		setFiles(data.files);
	});
</script>

<div class=" bg-primary/10">
	<div class=" w-full grid md:grid-cols-2 lg:grid-cols-3 gap-1">
		{#each getFeedFiles() as file}
			<PostCard {file} />
		{/each}
	</div>
</div>
