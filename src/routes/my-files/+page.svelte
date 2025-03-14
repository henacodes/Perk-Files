<script lang="ts">
	import FileView from '$components/FileView.svelte';

	const { data } = $props();
</script>

<div class=" w-full px-9 pt-4 min-h-[90vh]">
	<p class="text-secondary-dark dark:text-secondary font-semibold text-2xl">Purchased Files</p>

	<div class=" flex flex-col gap-5 p-3 rounded mt-5">
		{#each data.purchasedFiles as file}
			<FileView {file} download={true} />
		{/each}
	</div>

	<p class="text-secondary-dark dark:text-secondary font-semibold text-2xl mt-5">Your own files</p>

	<div class=" flex flex-col gap-5 overflow-auto min-h-[90vh] p-3 rounded mt-5">
		{#each data.postedFiles as file}
			<FileView {file} download={true} />
		{/each}
	</div>
</div>
