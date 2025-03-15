<script lang="ts">
	const { data } = $props();

	console.log(data);
</script>

<div class="h-[91.5vh] flex justify-center items-center">
	{#if data.status == 'success'}
		<div>
			<p class=" bg-primary/30 border border-primary p-3 rounded dark:text-secondary">
				Transaction successfull!
				<a
					class="block bg-secondary-dark dark:bg-secondary border border-black rounded mt-3 max-w-36 p-1 shadow-[2px_2px_#000] text-secondary dark:text-secondary-dark pl-2"
					href="/my-files">See your files</a
				>
			</p>
		</div>
	{:else}
		<div>
			<p class=" bg-red-400/30 border border-red-400 p-3 rounded dark:text-secondary">
				sorry, this transaction number is invalid
			</p>
		</div>
	{/if}
</div>
