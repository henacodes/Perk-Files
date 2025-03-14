<script lang="ts">
	import FileView from '$components/FileView.svelte';

	const { data } = $props();
</script>

<div class=" w-full px-9 pt-4">
	<p class="text-secondary-dark dark:text-secondary font-semibold text-2xl">Purchased Files</p>

	<div class=" flex flex-col gap-5 overflow-auto min-h-[90vh] p-3 rounded mt-5">
		{#each data.files as file}
			<FileView {file} download={true} />
		{/each}
	</div>
</div>
